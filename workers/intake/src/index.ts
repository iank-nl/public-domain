/**
 * Intake form backend for /contact/ on iank.nl.
 *
 *   GET  /token  → { token }  signed timestamp, fetched when the form loads (minimum fill time)
 *   POST /       → { ok: true } | { ok: false, error }
 *
 * Every submission passes, in this order: origin check, Turnstile siteverify, honeypot,
 * minimum fill time, rate limit, validation. Only then is exactly one email sent, always to
 * TO_EMAIL. The visitor's address is only ever used as Reply-To.
 */
import { EmailMessage } from 'cloudflare:email';

export interface Env {
  /** Comma-separated list of origins allowed to post, e.g. "https://iank.nl,http://localhost:4321". */
  ALLOWED_ORIGINS: string;
  /** The only recipient. Never taken from the request. */
  TO_EMAIL: string;
  /** Sender address on a domain set up for Email Routing (or verified in Resend). */
  FROM_EMAIL: string;
  /** Secret: Turnstile secret key. */
  TURNSTILE_SECRET: string;
  /** Secret: random string used to sign fill-time tokens and hash IPs for rate limiting. */
  FORM_SIGNING_KEY: string;
  /** Secret, optional: when set, mail goes out through Resend instead of the send_email binding. */
  RESEND_API_KEY?: string;
  RATE_LIMIT: KVNamespace;
  SEND_EMAIL?: SendEmail;
}

const MIN_FILL_MS = 3_000;
const MAX_TOKEN_AGE_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT = 5;
const RATE_WINDOW_S = 60 * 60;
const MAX_BODY_BYTES = 32 * 1024;
const MAX_LINKS = 3;

// Keep these in sync with src/i18n/offers.ts and the contact dictionaries in src/i18n/en.ts.
const NEEDS: Record<string, string> = {
  'security-check': 'Laravel/PHP Security & Health Check',
  'aws-review': 'AWS Cost & Reliability Review',
  care: 'Server & App Care retainer',
  'ai-sprint': 'AI Feature Sprint',
  takeover: 'Code takeover / rescue',
  other: 'Something else',
};
const TIMELINES: Record<string, string> = {
  asap: 'As soon as possible',
  month: 'Within a month',
  quarter: 'In 1 to 3 months',
  open: 'No fixed date yet',
};
const BUDGETS: Record<string, string> = {
  'under-2500': 'Under €2,500',
  '2500-10000': '€2,500 to €10,000',
  'over-10000': 'Over €10,000',
  unsure: 'Not sure yet',
};
const LANGS = ['en', 'nl'];

// Deliberately strict: no quotes, commas, spaces or angle brackets, so it is safe inside a header.
const EMAIL_RE =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin');
    const allowed = env.ALLOWED_ORIGINS.split(',').map((value) => value.trim());
    if (!origin || !allowed.includes(origin)) return new Response('Forbidden', { status: 403 });

    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    };
    const json = (body: unknown, status = 200) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });

    const { pathname } = new URL(request.url);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    if (request.method === 'GET' && pathname === '/token') {
      return json({ token: await signTimestamp(env, Date.now()) });
    }

    if (request.method !== 'POST' || pathname !== '/') return json({ ok: false, error: 'not_found' }, 404);

    try {
      return await handleSubmission(request, env, json);
    } catch (error) {
      console.error('intake failed', error);
      return json({ ok: false, error: 'server' }, 500);
    }
  },
} satisfies ExportedHandler<Env>;

async function handleSubmission(
  request: Request,
  env: Env,
  json: (body: unknown, status?: number) => Response,
): Promise<Response> {
  const length = Number(request.headers.get('Content-Length') ?? 0);
  if (length > MAX_BODY_BYTES) return json({ ok: false, error: 'invalid' }, 413);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'invalid' }, 400);
  }
  // Every field except the free-text details is single-line, so line breaks are collapsed.
  const field = (name: string) => {
    const value = form.get(name);
    if (typeof value !== 'string') return '';
    return name === 'details' ? value.trim() : oneLine(value);
  };
  const ip = request.headers.get('CF-Connecting-IP') ?? '';

  // 1. Turnstile, before anything else looks at the submission.
  if (!(await verifyTurnstile(env, field('cf-turnstile-response'), ip))) {
    return json({ ok: false, error: 'verification' }, 403);
  }

  // 2. Honeypot: people never see this field. Pretend it worked so bots learn nothing.
  if (field('referral_code') !== '') return json({ ok: true });

  // 3. Minimum fill time, from a timestamp this Worker signed when the form loaded.
  const issued = await verifyTimestamp(env, field('t'));
  if (issued === null) return json({ ok: false, error: 'expired' }, 400);
  const age = Date.now() - issued;
  if (age > MAX_TOKEN_AGE_MS) return json({ ok: false, error: 'expired' }, 400);
  if (age < MIN_FILL_MS) return json({ ok: true });

  // 4. Rate limit per IP (hashed, so no raw IPs end up in KV).
  if (await isRateLimited(env, ip)) return json({ ok: false, error: 'rate_limited' }, 429);

  // 5. Validation.
  const data = {
    lang: field('lang'),
    name: field('name'),
    email: field('email'),
    company: field('company'),
    need: field('need'),
    details: field('details'),
    stack: field('stack'),
    timeline: field('timeline'),
    budget: field('budget'),
  };
  const errors = validate(data);
  if (errors.length) return json({ ok: false, error: 'invalid', fields: errors }, 400);

  // 6. Exactly one email, to TO_EMAIL only.
  const subject = oneLine(`Project enquiry: ${NEEDS[data.need]} (${data.name})`);
  const summary = [
    ['Name', data.name],
    ['Email', data.email],
    ['Company', data.company],
    ['Need', NEEDS[data.need]],
    ['Stack', data.stack],
    ['Timeline', TIMELINES[data.timeline]],
    ['Budget', BUDGETS[data.budget]],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);
  const text = [
    `New enquiry via the intake form (${data.lang.toUpperCase()}).`,
    summary.join('\n'),
    `Details:\n${data.details}`,
  ].join('\n\n');

  try {
    await sendMail(env, { subject, text, replyTo: data.email });
  } catch (error) {
    console.error('sending failed', error);
    return json({ ok: false, error: 'server' }, 502);
  }
  return json({ ok: true });
}

type Submission = Record<'lang' | 'name' | 'email' | 'company' | 'need' | 'details' | 'stack' | 'timeline' | 'budget', string>;

function validate(data: Submission): string[] {
  const errors: string[] = [];
  const check = (name: keyof Submission, ok: boolean) => ok || errors.push(name);

  check('lang', LANGS.includes(data.lang));
  check('name', data.name.length > 0 && data.name.length <= 100);
  check('email', data.email.length <= 200 && EMAIL_RE.test(data.email));
  check('company', data.company.length <= 200);
  check('need', Object.hasOwn(NEEDS, data.need));
  check('details', data.details.length > 0 && data.details.length <= 4000);
  check('stack', data.stack.length <= 200);
  check('timeline', data.timeline === '' || Object.hasOwn(TIMELINES, data.timeline));
  check('budget', data.budget === '' || Object.hasOwn(BUDGETS, data.budget));

  const links = `${data.details} ${data.company} ${data.stack} ${data.name}`.match(/https?:\/\/|www\./gi)?.length ?? 0;
  check('details', links <= MAX_LINKS);

  return [...new Set(errors)];
}

async function verifyTurnstile(env: Env, token: string, ip: string): Promise<boolean> {
  if (!token || token.length > 2048) return false;
  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  if (!response.ok) return false;
  const result = await response.json<{ success: boolean }>();
  return result.success === true;
}

async function isRateLimited(env: Env, ip: string): Promise<boolean> {
  const window = Math.floor(Date.now() / (RATE_WINDOW_S * 1000));
  const key = `rl:${(await hmac(env, `ip:${ip}`)).slice(0, 32)}:${window}`;
  // KV is eventually consistent, so this is approximate. That is fine for ~5 per hour.
  const count = Number((await env.RATE_LIMIT.get(key)) ?? 0);
  if (count >= RATE_LIMIT) return true;
  await env.RATE_LIMIT.put(key, String(count + 1), { expirationTtl: RATE_WINDOW_S });
  return false;
}

/* ---------- Signed timestamps ---------- */

async function signingKey(env: Env) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(env.FORM_SIGNING_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

async function hmac(env: Env, message: string): Promise<string> {
  const signature = await crypto.subtle.sign('HMAC', await signingKey(env), new TextEncoder().encode(message));
  return toBase64Url(new Uint8Array(signature));
}

async function signTimestamp(env: Env, time: number): Promise<string> {
  return `${time}.${await hmac(env, `t:${time}`)}`;
}

/** Returns the signed time, or null when the token is missing or tampered with. */
async function verifyTimestamp(env: Env, token: string): Promise<number | null> {
  const match = /^(\d{13})\.([A-Za-z0-9_-]{43})$/.exec(token);
  if (!match) return null;
  const valid = await crypto.subtle.verify(
    'HMAC',
    await signingKey(env),
    fromBase64Url(match[2]),
    new TextEncoder().encode(`t:${match[1]}`),
  );
  return valid ? Number(match[1]) : null;
}

/* ---------- Sending ---------- */

interface Mail {
  subject: string;
  text: string;
  replyTo: string;
}

async function sendMail(env: Env, mail: Mail) {
  const from = oneLine(env.FROM_EMAIL);
  const to = oneLine(env.TO_EMAIL);
  const replyTo = oneLine(mail.replyTo);

  if (env.RESEND_API_KEY) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: `iank.nl intake <${from}>`, to: [to], reply_to: replyTo, subject: mail.subject, text: mail.text }),
    });
    if (!response.ok) throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
    return;
  }

  if (!env.SEND_EMAIL) throw new Error('No mail transport: set RESEND_API_KEY or add the send_email binding.');
  const domain = from.split('@')[1];
  const raw = [
    `From: iank.nl intake <${from}>`,
    `To: <${to}>`,
    `Reply-To: <${replyTo}>`,
    `Subject: ${encodeHeader(mail.subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    wrap(toBase64(new TextEncoder().encode(mail.text.replace(/\r?\n/g, '\r\n')))),
  ].join('\r\n');
  await env.SEND_EMAIL.send(new EmailMessage(from, to, raw));
}

/* ---------- Helpers ---------- */

/** Strips CR, LF and other control characters from anything that ends up in a header. */
function oneLine(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim();
}

/** RFC 2047 encoded-word, so non-ASCII subjects survive. */
function encodeHeader(value: string): string {
  return /^[\x20-\x7e]*$/.test(value) ? value : `=?utf-8?B?${toBase64(new TextEncoder().encode(value))}?=`;
}

function toBase64(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function toBase64Url(bytes: Uint8Array): string {
  return toBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(value: string): Uint8Array {
  const binary = atob(value.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function wrap(value: string, width = 76): string {
  return value.match(new RegExp(`.{1,${width}}`, 'g'))?.join('\r\n') ?? '';
}
