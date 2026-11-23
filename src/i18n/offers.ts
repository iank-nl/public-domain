import type { Lang } from './index';

/**
 * Fixed-scope offers, shown on /work/offers/ and linked from service pages and articles.
 * Prices are deliberately not shown: every offer ends in a quote request.
 */
export type OfferSlug = 'security-check' | 'aws-review' | 'care' | 'ai-sprint' | 'takeover';

export const offerLabels = {
  en: {
    tag: 'Offers',
    title: 'Fixed-scope offers',
    seoTitle: 'Laravel security audit, AWS cost optimisation and server care',
    description:
      'Fixed-scope offers from a freelance Laravel developer: Laravel/PHP security audit, AWS cost and reliability review, server care retainer, AI feature sprint and code takeover.',
    heading: 'A clear scope and a quote, before anything starts.',
    lede: 'Five ways to work together where you know exactly what you get. You receive a fixed quote up front, so there are no open-ended hours.',
    includes: 'What’s included',
    price: 'Fixed price, quoted up front',
    cta: 'Ask for a quote',
    teaser: 'Prefer a fixed scope?',
    teaserBody: 'Most first projects start as one of these offers, with a fixed quote before any work begins.',
    all: 'See all offers',
    related: 'Fixed-scope offers for this',
    other: 'Something else in mind?',
    otherBody: 'Plenty of work does not fit in a box. Tell me what you need and I will suggest a scope.',
  },
  nl: {
    tag: 'Aanbod',
    title: 'Vaste pakketten',
    seoTitle: 'Security-audit webapplicatie, serverbeheer uitbesteden en meer',
    description:
      'Vaste pakketten van een freelance Laravel-developer: security-audit van je Laravel/PHP-webapplicatie, AWS-kostenreview, serverbeheer uitbesteden, AI-feature-sprint en code overnemen.',
    heading: 'Een duidelijke afbakening en een offerte, voordat er iets begint.',
    lede: 'Vijf manieren om samen te werken waarbij je precies weet wat je krijgt. Je ontvangt vooraf een vaste offerte, dus geen uren die blijven doortikken.',
    includes: 'Wat je krijgt',
    price: 'Vaste prijs, vooraf geoffreerd',
    cta: 'Vraag een offerte aan',
    teaser: 'Liever een vaste afbakening?',
    teaserBody: 'De meeste eerste opdrachten beginnen als een van deze pakketten, met een vaste offerte voordat het werk start.',
    all: 'Bekijk alle pakketten',
    related: 'Vaste pakketten hiervoor',
    other: 'Iets anders in gedachten?',
    otherBody: 'Veel werk past niet in een hokje. Vertel wat je nodig hebt, dan stel ik een afbakening voor.',
  },
};

interface Offer {
  slug: OfferSlug;
  tone: string;
  name: string;
  summary: string;
  includes: string[];
  /** Overrides the default price line, e.g. for a monthly retainer. */
  price?: string;
}

export const offers: Record<Lang, Offer[]> = {
  en: [
    {
      slug: 'security-check',
      tone: 'tone-3',
      name: 'Laravel/PHP Security & Health Check',
      summary: 'Find out where your Laravel or PHP application is vulnerable, and what to fix first.',
      includes: [
        'Code review against the OWASP Top 10',
        'Dependency audit for known vulnerabilities (Composer and npm)',
        'Server hardening check: patching, exposed services, access and TLS',
        'A written report with findings ranked by real risk',
        'A walkthrough call to go through the findings with your team',
      ],
    },
    {
      slug: 'aws-review',
      tone: 'tone-2',
      name: 'AWS Cost & Reliability Review',
      summary: 'See what your AWS bill is paying for, and where a failure would hurt.',
      includes: [
        'Billing analysis: where the money goes, service by service',
        'Rightsizing of instances, storage and databases',
        'Gaps in backups, monitoring and alerting',
        'A concrete list of savings, ordered by effort and impact',
      ],
    },
    {
      slug: 'care',
      tone: 'tone-1',
      name: 'Server & App Care retainer',
      summary: 'Your servers and application looked after every month, without hiring someone for it.',
      includes: [
        'Security patching of servers and dependencies',
        'Monitoring and alerts, with someone who acts on them',
        'Backups that are tested, not just configured',
        '[TODO: number] hours per month for small changes and fixes',
      ],
      price: 'Fixed monthly fee, quoted up front',
    },
    {
      slug: 'ai-sprint',
      tone: 'tone-4',
      name: 'AI Feature Sprint',
      summary: 'One practical AI feature added to the software you already have, ready for production.',
      includes: [
        'A short session to pick the feature with the clearest payoff',
        'Built into your existing application, not a separate demo',
        'Guardrails: validation, fallbacks and logging of what the model does',
        'Tested against real examples from your own data before launch',
        'Handover with documentation',
      ],
    },
    {
      slug: 'takeover',
      tone: 'tone-3',
      name: 'Code takeover / rescue',
      summary: 'An existing Laravel codebase that nobody dares to touch, made safe to change again.',
      includes: [
        'Assessment of architecture, code quality, security and deployment',
        'A written plan with the risks and what to fix first',
        'Stabilisation: tests around critical paths, fixes and safer deployments',
        'Documentation, so the next developer does not start from zero',
      ],
      price: 'Starts with a fixed-price assessment',
    },
  ],
  nl: [
    {
      slug: 'security-check',
      tone: 'tone-3',
      name: 'Security-audit & health check (Laravel/PHP)',
      summary: 'Ontdek waar je Laravel- of PHP-applicatie kwetsbaar is, en wat je als eerste moet oplossen.',
      includes: [
        'Code review op basis van de OWASP Top 10',
        'Controle van dependencies op bekende kwetsbaarheden (Composer en npm)',
        'Check van de serverhardening: patches, open services, toegang en TLS',
        'Een schriftelijk rapport met bevindingen op volgorde van echt risico',
        'Een call waarin we de bevindingen samen met je team doorlopen',
      ],
    },
    {
      slug: 'aws-review',
      tone: 'tone-2',
      name: 'AWS-kosten- en betrouwbaarheidsreview',
      summary: 'Zie waar je AWS-rekening voor betaalt, en waar een storing pijn zou doen.',
      includes: [
        'Analyse van de rekening: waar het geld heen gaat, per dienst',
        'Rightsizing van instances, opslag en databases',
        'Gaten in back-ups, monitoring en alerting',
        'Een concrete lijst met besparingen, op volgorde van moeite en effect',
      ],
    },
    {
      slug: 'care',
      tone: 'tone-1',
      name: 'Server- en applicatiebeheer (abonnement)',
      summary: 'Je servers en applicatie elke maand onderhouden, zonder dat je daar iemand voor hoeft aan te nemen.',
      includes: [
        'Beveiligingsupdates voor servers en dependencies',
        'Monitoring en alerts, met iemand die er ook op reageert',
        'Back-ups die getest worden, niet alleen ingesteld',
        '[TODO: aantal] uur per maand voor kleine wijzigingen en fixes',
      ],
      price: 'Vast bedrag per maand, vooraf geoffreerd',
    },
    {
      slug: 'ai-sprint',
      tone: 'tone-4',
      name: 'AI-featuresprint',
      summary: 'Eén praktische AI-functie toegevoegd aan de software die je al hebt, klaar voor productie.',
      includes: [
        'Een korte sessie om de functie met de duidelijkste opbrengst te kiezen',
        'Ingebouwd in je bestaande applicatie, geen losse demo',
        'Vangrails: validatie, terugvalopties en logging van wat het model doet',
        'Getest op echte voorbeelden uit je eigen data, voordat het live gaat',
        'Overdracht met documentatie',
      ],
    },
    {
      slug: 'takeover',
      tone: 'tone-3',
      name: 'Bestaande code overnemen of redden',
      summary: 'Een bestaande Laravel-codebase waar niemand meer aan durft te komen, weer veilig aanpasbaar gemaakt.',
      includes: [
        'Beoordeling van architectuur, codekwaliteit, security en deployment',
        'Een schriftelijk plan met de risico’s en wat als eerste moet',
        'Stabiliseren: tests rond kritieke onderdelen, fixes en veiligere deployments',
        'Documentatie, zodat de volgende ontwikkelaar niet bij nul begint',
      ],
      price: 'Begint met een beoordeling tegen een vaste prijs',
    },
  ],
};

export function offerBySlug(lang: Lang, slug: OfferSlug) {
  return offers[lang].find((offer) => offer.slug === slug)!;
}
