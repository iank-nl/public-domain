/** Content of the service pages under /work/<slug>/. `group` points at the matching list in work.selected. */
export const serviceLabels = {
  en: { help: 'What I can help with', signs: 'You might need this when', past: 'Past work', back: 'Work' },
  nl: { help: 'Waarmee ik kan helpen', signs: 'Dit is iets voor jou als', past: 'Eerder werk', back: 'Werk' },
};

export const servicePages = {
  en: [
    {
      slug: 'software',
      group: 0,
      tone: 'tone-1',
      name: 'Software development',
      seoTitle: 'Freelance software developer for web applications and APIs',
      description:
        'Freelance software development in the Netherlands: web applications, APIs, integrations and databases, mainly in PHP/Laravel and TypeScript.',
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
      group: 1,
      tone: 'tone-2',
      name: 'Server management & cloud',
      seoTitle: 'Linux server management and AWS, freelance',
      description:
        'Freelance Linux server management and AWS in the Netherlands: patching, hardening, monitoring, automated deployments and cloud cost control.',
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
      group: 2,
      tone: 'tone-3',
      name: 'Cyber security',
      seoTitle: 'Freelance cyber security specialist for code reviews and hardening',
      description:
        'Freelance cyber security in the Netherlands: secure code reviews, application and API security, server hardening and encryption, with clear findings and help fixing them.',
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
  ],
  nl: [
    {
      slug: 'software',
      group: 0,
      tone: 'tone-1',
      name: 'Softwareontwikkeling',
      seoTitle: 'Freelance softwareontwikkelaar voor webapplicaties en API’s',
      description:
        'Freelance softwareontwikkeling in Nederland: webapplicaties, API’s, koppelingen en databases, vooral in PHP/Laravel en TypeScript.',
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
      group: 1,
      tone: 'tone-2',
      name: 'Serverbeheer & cloud',
      seoTitle: 'Linux-serverbeheer en AWS, freelance',
      description:
        'Freelance Linux-serverbeheer en AWS in Nederland: patching, hardening, monitoring, automatische deployments en grip op cloudkosten.',
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
      group: 2,
      tone: 'tone-3',
      name: 'Cybersecurity',
      seoTitle: 'Freelance cybersecurity-specialist voor code reviews en hardening',
      description:
        'Freelance cybersecurity in Nederland: secure code reviews, applicatie- en API-beveiliging, serverhardening en encryptie, met duidelijke bevindingen en hulp bij het oplossen.',
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
  ],
};
