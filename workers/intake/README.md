# Intake Worker

Backend for the project intake form on `/contact/` (EN and NL). The form posts here, and the Worker
sends **one** plain-text email to you. Nothing is stored apart from a rate-limit counter: a hashed IP
with a one-hour TTL.

```
GET  /token   → { "token": "<ms>.<hmac>" }   signed timestamp, fetched when the form loads
POST /        → { "ok": true }  or  { "ok": false, "error": "verification" | "expired" | "rate_limited" | "invalid" | "server" }
```

## What it checks, in order

1. **Origin**: only origins listed in `ALLOWED_ORIGINS` (`https://iank.nl`, `http://localhost:4321`). Anything else gets a 403 with no CORS headers.
2. **Turnstile**: the token is verified server-side with `siteverify` before anything else looks at the submission.
3. **Honeypot**: an off-screen `referral_code` field. If it's filled in, the Worker answers `ok` and drops the submission.
4. **Minimum fill time**: `t` is a timestamp this Worker signed (HMAC with `FORM_SIGNING_KEY`). Submissions under 3 seconds get `ok` and are dropped. Tokens that are tampered with or older than 24 hours get `expired`, and the form fetches a new one.
5. **Rate limit**: 5 submissions per IP per hour (a fixed window in KV, keyed by an HMAC of the IP). KV is eventually consistent, so this is approximate. The Workers Rate Limiting binding only supports 10- or 60-second periods, which is why KV is used.
6. **Validation**: required name, email and details. Max lengths: name 100, email 200, company 200, stack 200, details 4,000. Strict email format. Allow-lists for `need`, `timeline`, `budget` and `lang`. No more than 3 links.
7. **Send**: exactly one email to `TO_EMAIL`. The visitor's address only appears in `Reply-To`. Line breaks and control characters are stripped from every header value, and all single-line fields are collapsed to one line. No auto-replies, no copies to the visitor. With the `send_email` binding, `destination_address` also locks delivery to your address at the platform level.

The allow-lists in `src/index.ts` must match `src/i18n/offers.ts` (offer slugs) and the `timelines` / `budgets` values in `src/i18n/en.ts` / `nl.ts`.

## Setup (one-time, you do this)

All commands run from `workers/intake/`.

```sh
npm install
npx wrangler login
```

### 1. Turnstile

1. Cloudflare dashboard → **Turnstile** → **Add widget**. Hostname: `iank.nl` (add `localhost` only if you want to test the real widget locally). Widget mode: **Managed**.
2. Put the **site key** in `src/site.config.ts` → `intake.turnstileSiteKey` (in the site root, not this folder).
3. Store the **secret key**:
   ```sh
   npx wrangler secret put TURNSTILE_SECRET
   ```

### 2. Signing key

Any long random string:

```sh
openssl rand -base64 32        # or: node -e "console.log(crypto.randomBytes(32).toString('base64'))"
npx wrangler secret put FORM_SIGNING_KEY
```

### 3. KV namespace for the rate limit

```sh
npx wrangler kv namespace create RATE_LIMIT
```

Copy the printed `id` into `wrangler.toml` → `[[kv_namespaces]]` → `id`.

### 4. Email: choose one

**Option A: Cloudflare Email Routing (`send_email` binding, the default)**

1. Dashboard → `iank.nl` → **Email** → **Email Routing**: enable it if it isn't already.
2. Under **Destination addresses**, add your inbox and click the verification link.
3. In `wrangler.toml`, set `TO_EMAIL` **and** `destination_address` to that verified address, and set `FROM_EMAIL` to any address on `iank.nl` (e.g. `intake@iank.nl`). It doesn't need to exist as a mailbox.

**Option B: Resend**

1. Verify `iank.nl` (or a subdomain) in Resend and create an API key with sending access.
2. Set `FROM_EMAIL` in `wrangler.toml` to an address on the verified domain, and `TO_EMAIL` to your inbox.
3. Store the key:
   ```sh
   npx wrangler secret put RESEND_API_KEY
   ```
4. As soon as `RESEND_API_KEY` is set, the Worker uses Resend. You can remove the `[[send_email]]` block. If you keep it, `destination_address` must still be a verified Email Routing address, or the deploy fails. Note that Resend keeps message logs on its side, while Email Routing passes mail straight through.

To switch back to Email Routing, run `npx wrangler secret delete RESEND_API_KEY`.

### 5. Deploy

```sh
npx wrangler deploy
```

Copy the Worker URL from the output (`https://iank-intake.<your-subdomain>.workers.dev`), or add a custom domain under **Workers → iank-intake → Settings → Domains & Routes**.

### 6. Point the site at it

In `src/site.config.ts` (site root):

```ts
intake: {
  endpoint: 'https://iank-intake.<your-subdomain>.workers.dev',
  turnstileSiteKey: '0x4AAAA…',
},
```

Then `npm run build` in the site root, commit `docs/` and push. Send yourself a test enquiry from https://iank.nl/contact/.

## Local testing with `wrangler dev`

```sh
cp .dev.vars.example .dev.vars   # Turnstile test secret that always passes, dummy addresses
npm run dev                      # http://127.0.0.1:8787
```

- Locally, `send_email` doesn't deliver anything. It writes each message as an `.eml` file under `.wrangler/tmp/email/` and logs the path.
- The local binding still enforces `destination_address`. Set it in `wrangler.toml` to the same address as `TO_EMAIL` in `.dev.vars`, or you'll get `email to … not allowed` (a useful check that the lock works). Don't commit that change.
- To test from the site, temporarily set `intake.endpoint` to `http://127.0.0.1:8787` and `intake.turnstileSiteKey` to Cloudflare's always-pass test key `1x00000000000000000000AA` in `src/site.config.ts`, then run `npm run dev` in the site root (port 4321 is in `ALLOWED_ORIGINS`).

From the command line (the test secret accepts any token, and the token must be at least 3 seconds old):

```sh
T=$(curl -s -H "Origin: https://iank.nl" http://127.0.0.1:8787/token | sed 's/.*"token":"\([^"]*\)".*/\1/')
sleep 4
curl -i -H "Origin: https://iank.nl" http://127.0.0.1:8787/ \
  --form-string cf-turnstile-response=XXXX.DUMMY.TOKEN.XXXX --form-string lang=en \
  --form-string name=Test --form-string email=test@example.com --form-string need=care \
  --form-string "details=Testing the intake form" --form-string "t=$T"
```

Type-check with `npm run check`.
