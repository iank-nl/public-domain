import type { OfferSlug } from './offers';

/**
 * Content of the service pages under /work/<slug>/. `group` points at the matching list in work.selected.
 * A page without a group shows its proof (articles and the Relic Sweeper case) instead.
 */
export const serviceLabels = {
  en: { help: 'What I can help with', signs: 'You might need this when', past: 'Past work', proof: 'In practice', back: 'Work' },
  nl: { help: 'Waarmee ik kan helpen', signs: 'Dit is iets voor jou als', past: 'Eerder werk', proof: 'In de praktijk', back: 'Werk' },
};

export interface ServicePage {
  slug: string;
  offers: OfferSlug[];
  group?: number;
  tone: string;
  name: string;
  seoTitle: string;
  description: string;
  heading: string;
  lede: string;
  help: { title: string; body: string }[];
  signs: string[];
}

export const servicePages: Record<'en' | 'nl', ServicePage[]> = {
  en: [
    {
      slug: 'software',
      offers: ['takeover', 'security-check'],
      group: 0,
      tone: 'tone-1',
      name: 'Software development',
      seoTitle: 'Freelance Laravel developer for web applications and APIs',
      description:
        'Hire a freelance Laravel developer in the Netherlands: web applications, APIs, integrations and databases in PHP/Laravel and TypeScript, including taking over existing code.',
      heading: 'Software development that keeps working after launch.',
      lede: 'I build and take over web applications, APIs and integrations, mainly in PHP/Laravel and TypeScript. The goal is software your team can keep changing without fear.',
      help: [
        { title: 'Web applications', body: 'From a first version to a full product, including dashboards and internal tools.' },
        { title: 'APIs and integrations', body: 'Connecting your systems to each other and to outside services, with error handling and monitoring included.' },
        { title: 'Databases and data', body: 'Data models that hold up, imports with validation, and queries that stay fast as you grow.' },
        { title: 'Taking over existing code', body: 'Getting to know an application, making it safe to change, and improving it step by step.' },
      ],
      signs: [
        'Every change to your application seems to break something else.',
        'Your systems do not talk to each other and people copy data by hand.',
        'The developer who built it has left, and nobody dares to touch it.',
        'You need a new product and one person who can own it from start to finish.',
      ],
    },
    {
      slug: 'servers',
      offers: ['care', 'aws-review'],
      group: 1,
      tone: 'tone-2',
      name: 'Server management & cloud',
      seoTitle: 'Linux server management and AWS cost optimisation, freelance',
      description:
        'Outsource Linux server management and AWS to a freelancer: patching, hardening, monitoring, automated deployments and AWS cost optimisation for SMEs and agencies.',
      heading: 'Servers and cloud you do not have to think about.',
      lede: 'I set up and look after Linux servers and AWS environments, with patching, monitoring and deployments automated so that they do not depend on anyone remembering them.',
      help: [
        { title: 'Linux server management', body: 'Setup, automated patching and hardening, for a single server or a whole fleet.' },
        { title: 'AWS architecture', body: 'Environments designed to be reliable and scalable, without more moving parts than you need.' },
        { title: 'Automated deployments', body: 'Docker and CI/CD pipelines with automated tests and rollback, so that releasing is a non-event.' },
        { title: 'Monitoring and alerting', body: 'Real-time alerts and dashboards, so that you hear about problems before your customers do.' },
        { title: 'Cloud costs', body: 'Tracking and predicting your spending, with budget alerts and concrete savings.' },
      ],
      signs: [
        'Nobody is quite sure when your servers were last patched.',
        'Deploying is a stressful, manual job that only one person can do.',
        'You find out about outages from your customers.',
        'Your cloud bill keeps growing and nobody can explain why.',
      ],
    },
    {
      slug: 'security',
      offers: ['security-check', 'care'],
      group: 2,
      tone: 'tone-3',
      name: 'Cyber security',
      seoTitle: 'Laravel security audit and secure code review, freelance',
      description:
        'Laravel and PHP security audits by a freelance specialist: secure code reviews, API security, server hardening and encryption, with clear findings and help fixing them.',
      heading: 'Find the weak spots before someone else does.',
      lede: 'I review code and infrastructure for security problems, explain what I find in plain language, and help get the fixes done. A report on its own does not make anything safer.',
      help: [
        { title: 'Secure code reviews', body: 'A close look at your code for vulnerabilities, with findings ranked by real risk and concrete steps to fix them.' },
        { title: 'Application and API security', body: 'Authentication, access control, input handling and rate limiting, based on OWASP best practices.' },
        { title: 'Server hardening', body: 'Reducing what an attacker can reach, with automated patching, intrusion detection and compliance checks.' },
        { title: 'Encryption', body: 'Protecting sensitive data across your application, including managing the keys properly.' },
      ],
      signs: [
        'A customer or auditor has asked how you handle security.',
        'You process personal or otherwise sensitive data.',
        'You are about to launch and want a second pair of eyes first.',
        'Nobody has looked at the security of your application in a while.',
      ],
    },
    {
      slug: 'ai',
      offers: ['ai-sprint'],
      tone: 'tone-4',
      name: 'AI & apps',
      seoTitle: 'Practical AI features for existing software, freelance',
      description:
        'Freelance AI integration in the Netherlands: practical AI features added to your existing software, such as classification, summarisation, smart search and report generation. Only when it is the right tool.',
      heading: 'Practical AI, inside the software you already have.',
      lede: 'I add AI to existing applications where it saves real time: usually one small, well-guarded model step inside an otherwise ordinary process. And when plain code is the better tool, I will tell you.',
      help: [
        { title: 'Classification', body: 'Sorting tickets, emails or documents into the right category, with a person checking the cases the model is unsure about.' },
        { title: 'Summarisation', body: 'Long threads, reports or call notes turned into short summaries that people actually read.' },
        { title: 'Smart search', body: 'Search that understands what people mean, across your own documents and data.' },
        { title: 'Report generation', body: 'Readable reports from your own data, with the figures calculated by code and the wording drafted by the model.' },
        { title: 'Agent-assisted development', body: 'Coding agents such as Claude Code, with written tasks, tests and review as guardrails, to ship faster without lowering the bar.' },
      ],
      signs: [
        'Someone spends hours every month copying information out of documents or emails.',
        'Your team reads through piles of text to find the few items that matter.',
        'People cannot find things in your own system, even though the information is there.',
        'You want to use AI, but only where it pays off and without putting customer data at risk.',
      ],
    },
  ],
  nl: [
    {
      slug: 'software',
      offers: ['takeover', 'security-check'],
      group: 0,
      tone: 'tone-1',
      name: 'Softwareontwikkeling',
      seoTitle: 'Laravel-developer inhuren voor webapplicaties en API’s',
      description:
        'Laravel-developer inhuren: webapplicaties, API’s, koppelingen en databases in PHP/Laravel en TypeScript, ook het overnemen van bestaande code. Freelance, vanuit Nederland.',
      heading: 'Softwareontwikkeling die ook na de oplevering blijft werken.',
      lede: 'Ik bouw webapplicaties, API’s en koppelingen, en neem ze ook over, vooral in PHP/Laravel en TypeScript. Het doel is software die je team zonder angst kan blijven aanpassen.',
      help: [
        { title: 'Webapplicaties', body: 'Van een eerste versie tot een volledig product, inclusief dashboards en interne tools.' },
        { title: 'API’s en koppelingen', body: 'Je systemen met elkaar en met externe diensten verbinden, inclusief foutafhandeling en monitoring.' },
        { title: 'Databases en data', body: 'Datamodellen die standhouden, imports met validatie en queries die snel blijven als je groeit.' },
        { title: 'Bestaande code overnemen', body: 'Een applicatie leren kennen, veilig aanpasbaar maken en stap voor stap verbeteren.' },
      ],
      signs: [
        'Elke wijziging aan je applicatie lijkt iets anders kapot te maken.',
        'Je systemen praten niet met elkaar en mensen tikken data over.',
        'De ontwikkelaar die het bouwde is weg, en niemand durft eraan te komen.',
        'Je hebt een nieuw product nodig en één persoon die het van begin tot eind oppakt.',
      ],
    },
    {
      slug: 'servers',
      offers: ['care', 'aws-review'],
      group: 1,
      tone: 'tone-2',
      name: 'Serverbeheer & cloud',
      seoTitle: 'Serverbeheer uitbesteden: Linux en AWS',
      description:
        'Serverbeheer uitbesteden aan een freelancer: Linux- en AWS-beheer met patching, hardening, monitoring, automatische deployments en lagere cloudkosten.',
      heading: 'Servers en cloud waar je niet aan hoeft te denken.',
      lede: 'Ik richt Linux-servers en AWS-omgevingen in en beheer ze, met geautomatiseerde patches, monitoring en deployments, zodat niets afhangt van iemands geheugen.',
      help: [
        { title: 'Linux-serverbeheer', body: 'Inrichting, automatische patches en hardening, voor één server of een heel park.' },
        { title: 'AWS-architectuur', body: 'Betrouwbare en schaalbare omgevingen, zonder meer onderdelen dan nodig.' },
        { title: 'Automatische deployments', body: 'Docker en CI/CD-pipelines met automatische tests en rollback, zodat een release geen gebeurtenis meer is.' },
        { title: 'Monitoring en alerting', body: 'Realtime alerts en dashboards, zodat jij problemen eerder ziet dan je klanten.' },
        { title: 'Cloudkosten', body: 'Je uitgaven volgen en voorspellen, met budgetalerts en concrete besparingen.' },
      ],
      signs: [
        'Niemand weet precies wanneer je servers voor het laatst zijn gepatcht.',
        'Uitrollen is een stressvol, handmatig klusje dat maar één persoon kan.',
        'Je hoort van je klanten dat er een storing is.',
        'Je cloudrekening blijft groeien en niemand kan uitleggen waarom.',
      ],
    },
    {
      slug: 'security',
      offers: ['security-check', 'care'],
      group: 2,
      tone: 'tone-3',
      name: 'Cybersecurity',
      seoTitle: 'Security-audit van je webapplicatie en code review',
      description:
        'Security-audit van je Laravel- of PHP-webapplicatie: secure code review, API-beveiliging, serverhardening en encryptie, met duidelijke bevindingen en hulp bij het oplossen.',
      heading: 'De zwakke plekken vinden voordat iemand anders dat doet.',
      lede: 'Ik controleer code en infrastructuur op beveiligingsproblemen, leg in gewone taal uit wat ik vind en help de oplossingen door te voeren. Van alleen een rapport wordt niets veiliger.',
      help: [
        { title: 'Secure code reviews', body: 'Je code grondig nagekeken op kwetsbaarheden, met bevindingen op volgorde van echt risico en concrete herstelstappen.' },
        { title: 'Applicatie- en API-beveiliging', body: 'Authenticatie, toegangsbeheer, invoerverwerking en rate limiting, op basis van OWASP best practices.' },
        { title: 'Serverhardening', body: 'Minder ingangen voor aanvallers, met automatische patches, inbraakdetectie en compliancecontroles.' },
        { title: 'Encryptie', body: 'Gevoelige data in je hele applicatie beschermen, inclusief goed sleutelbeheer.' },
      ],
      signs: [
        'Een klant of auditor heeft gevraagd hoe je met security omgaat.',
        'Je verwerkt persoonsgegevens of andere gevoelige data.',
        'Je gaat binnenkort live en wilt eerst een tweede paar ogen.',
        'Niemand heeft al een tijd naar de beveiliging van je applicatie gekeken.',
      ],
    },
    {
      slug: 'ai',
      offers: ['ai-sprint'],
      tone: 'tone-4',
      name: 'AI & apps',
      seoTitle: 'Praktische AI-functies in bestaande software, freelance',
      description:
        'Freelance AI-integratie in Nederland: praktische AI-functies in je bestaande software, zoals classificatie, samenvatten, slim zoeken en rapportages maken. Alleen als het het juiste gereedschap is.',
      heading: 'Praktische AI, in de software die je al hebt.',
      lede: 'Ik voeg AI toe aan bestaande applicaties waar het echt tijd bespaart: meestal één kleine, goed bewaakte modelstap in een verder gewoon proces. En als gewone code beter werkt, zeg ik dat ook.',
      help: [
        { title: 'Classificatie', body: 'Tickets, e-mails of documenten in de juiste categorie, waarbij een mens de twijfelgevallen van het model controleert.' },
        { title: 'Samenvatten', body: 'Lange threads, rapporten of gespreksnotities omgezet in korte samenvattingen die mensen echt lezen.' },
        { title: 'Slim zoeken', body: 'Zoeken dat begrijpt wat mensen bedoelen, in je eigen documenten en data.' },
        { title: 'Rapportages maken', body: 'Leesbare rapportages uit je eigen data, waarbij code de cijfers berekent en het model de tekst opstelt.' },
        { title: 'Ontwikkelen met agents', body: 'Coding agents zoals Claude Code, met geschreven taken, tests en reviews als vangrails, zodat je sneller oplevert zonder dat de lat lager komt te liggen.' },
      ],
      signs: [
        'Iemand is elke maand uren bezig met informatie uit documenten of e-mails overtikken.',
        'Je team leest stapels tekst door om de paar dingen te vinden die ertoe doen.',
        'Mensen vinden dingen niet terug in je eigen systeem, terwijl de informatie er wel in staat.',
        'Je wilt AI inzetten, maar alleen waar het iets oplevert en zonder klantdata in gevaar te brengen.',
      ],
    },
  ],
};
