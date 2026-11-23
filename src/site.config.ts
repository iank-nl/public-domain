/**
 * Everything that identifies the site lives here.
 * To rebrand, change `name`. It flows into the header, footer, page titles, etc,
 * feeds and the social preview image.
 */
export const site = {
  name: 'IanCSS',
  /** The person behind the site. Shown as author and on the about page. */
  owner: 'Ian Ketelings',
  linkedin: 'https://www.linkedin.com/in/ian-ketelings-76112611b/',
  /** The registered business name. Used in the footer; the privacy policy text refers to it too. */
  legalName: 'Ian Cyber Security & Software',
  /** Dutch Chamber of Commerce number. */
  kvk: '86493329',
  /** Dutch VAT number (btw-id). */
  vatId: 'NL004258223B87',
  /** Province the business is based in, used in structured data. The footer text is in the dictionaries. */
  region: 'Limburg',
  /** Professional liability insurance (beroepsaansprakelijkheidsverzekering). Shows a footer line when true. */
  insured: false,
  url: 'https://iank.nl',
  email: 'hello@iank.nl',
  /** Scheduling page for the free intro call. */
  bookingUrl: 'https://cal.com/ian-ketelings-icss/20min',
  /** Intake form backend (workers/intake). Both values are public; see workers/intake/README.md. */
  intake: {
    /** URL of the deployed intake Worker, without a trailing slash. */
    endpoint: 'https://iank-intake.calm-hill-35b5.workers.dev',
    /** Cloudflare Turnstile site key (not the secret). */
    turnstileSiteKey: '0x4AAAAAAGOyIi8FTBr50Pk8',
  },
  /**
   * Umami Cloud: cookieless page views and custom events, so no consent banner is needed.
   * The script only loads when `websiteId` is filled in, and only counts visits on the domain of `url`.
   */
  analytics: {
    /** [TODO] Website ID from Umami Cloud: Settings → Websites → Edit → Website ID. */
    websiteId: '[TODO: Umami website ID]',
    src: 'https://cloud.umami.is/script.js',
  },
};

/** True once a real Umami website ID is set. */
export const analyticsEnabled = site.analytics.websiteId !== '' && !site.analytics.websiteId.startsWith('[TODO');
