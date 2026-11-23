import type { Lang } from './index';
import type { OfferSlug } from './offers';

/**
 * Anonymised case studies under /work/cases/<slug>/.
 * Every case follows the same template: problem → approach → result (with numbers) → stack.
 * Only use facts and numbers that are known; leave a stat out rather than estimate it.
 */
export const caseLabels = {
  en: {
    tag: 'Case study',
    list: 'Case studies',
    read: 'Read the case study',
    problem: 'The problem',
    approach: 'The approach',
    result: 'The result',
    stack: 'Stack',
    article: 'Read the full write-up',
    offer: 'Want the same for your setup?',
    noOffer: 'Need something similar built?',
    anonymised: 'Client details are anonymised.',
    facts: { client: 'For', role: 'My role', duration: 'Timeline' },
  },
  nl: {
    tag: 'Case study',
    list: 'Case studies',
    read: 'Lees de case study',
    problem: 'Het probleem',
    approach: 'De aanpak',
    result: 'Het resultaat',
    stack: 'Stack',
    article: 'Lees het hele verhaal',
    offer: 'Wil je dit ook voor jouw omgeving?',
    noOffer: 'Iets vergelijkbaars laten bouwen?',
    anonymised: 'Klantgegevens zijn geanonimiseerd.',
    facts: { client: 'Voor', role: 'Mijn rol', duration: 'Doorlooptijd' },
  },
};

export type CaseSlug = 'api-integration-platform' | 'linux-server-fleet' | 'php2shell-response' | 'aws-cost-management';

export interface CaseStudy {
  slug: CaseSlug;
  tone: string;
  title: string;
  heading: string;
  summary: string;
  client: string;
  role?: string;
  duration?: string;
  problem: string;
  approach: string[];
  results: { value: string; label: string }[];
  resultBody: string;
  stack: string[];
  /** Knowledge article slug with the longer story. */
  article?: string;
  /** Related fixed-scope offer. Leave out when none fits; the CTA then points to the general intake. */
  offer?: OfferSlug;
}

export const cases: Record<Lang, CaseStudy[]> = {
  en: [
    {
      slug: 'api-integration-platform',
      tone: 'tone-1',
      title: 'API integration platform',
      heading: 'More than 50 external APIs, combined and managed from one dashboard.',
      summary: 'One dashboard environment for 50+ external APIs, used by more than 20 companies, built so that a single failing provider never takes the rest down.',
      client: 'More than 20 companies so far',
      role: 'Lead architect and developer',
      duration: '3 to 4 months to the first release, still in active development',
      problem:
        'The companies using it each depend on a long list of outside systems: property management systems, AWS servers, Docker hosts, payment providers, WordPress sites and more. Every one has its own API and its own dashboard, and every one can fail in its own way: slow responses, expired tokens, changed formats or rate limits. They needed one place to see and manage all of it.',
      approach: [
        'A Laravel core with every integration in its own module and settings, so a new API can be added without touching the others.',
        'Started with a small feature set, released after 3 to 4 months, and extended with new features since.',
        'Timeouts on every outgoing call, and retries that are limited, spaced out and safe to repeat.',
        'Outgoing requests throttled through a queue, so large imports never use up the rate limit live users need.',
        'Each response validated at the edge before it can reach the database.',
        'Monitoring per integration: success rate, response time and time since the last successful call, with alerts on silence.',
      ],
      results: [
        { value: '50+', label: 'external APIs in one dashboard' },
        { value: '20+', label: 'companies using it so far' },
        { value: '3–4 mo', label: 'from start to the first release' },
      ],
      resultBody:
        'Work that used to mean logging in to a dozen different systems happens in one place. The platform is still growing: new integrations and features keep being released on the same foundation.',
      stack: ['PHP', 'Laravel', 'MySQL', 'PostgreSQL', 'MongoDB'],
      article: 'software-that-keeps-working',
      // A new build, not a rescue: no fixed-scope offer fits, so the CTA goes to the general intake.
    },
    {
      slug: 'linux-server-fleet',
      tone: 'tone-2',
      title: 'Secure management of 25+ Linux servers',
      heading: 'From servers nobody patched to security updates within hours.',
      summary: 'More than 25 Linux production servers across several companies, brought under management with one central view.',
      client: 'Several companies',
      role: 'Management, patching and security',
      duration: 'Up to 3 years per server, ongoing',
      problem:
        'The servers had hardly ever been patched and nobody managed them. Each one had been set up differently and ran its own mix of software, so there was no single way to look after them.',
      approach: [
        'Brought every server under management, with tooling chosen per server instead of forcing one setup on all of them.',
        'Patching ordered by how critical an update is: critical security patches are applied within hours of release.',
        'Patch rounds planned so that downtime stays at minutes at most.',
        'One central view of logs and metrics for all servers, in Elasticsearch and Kibana, with monitoring and alerting in Zabbix.',
        'Hardening and intrusion detection to reduce what an attacker can reach.',
      ],
      results: [
        { value: '25+', label: 'production servers managed' },
        { value: 'Hours', label: 'from a critical security release to patched' },
        { value: 'Minutes', label: 'of downtime per patch, at most' },
      ],
      resultBody:
        'Servers that used to go unpatched for long stretches now receive critical security updates within hours, and problems show up in one central view before users notice them.',
      stack: ['Linux', 'Elasticsearch', 'Kibana', 'Zabbix'],
      offer: 'care',
    },
    {
      slug: 'php2shell-response',
      tone: 'tone-3',
      title: 'PHP2Shell response for 100+ sites',
      heading: 'Two critical PHP flaws, more than 100 sites, not a single compromise.',
      summary: 'Identifying, patching and monitoring more than 100 PHP sites at a hosting company during PHP2Shell, with every site safe within an hour of the fix.',
      client: 'A hosting company',
      role: 'The whole response: identify, patch and monitor',
      duration: 'October 2026',
      problem:
        'In October 2026, PHP disclosed two critical remote code execution flaws in the interpreter itself, known together as PHP2Shell. Exploitation in the wild was reported from the day of release. More than 100 PHP sites were potentially exposed, and a few critical systems could not be taken offline.',
      approach: [
        'Identified which PHP version each site ran, and how PHP was run.',
        'Patched in order of risk: internet-facing first, the riskiest setups first, sensitive data before brochure sites.',
        'Checked that the fix was active in the running PHP process, not just installed on disk.',
        'Gave site owners an honest choice to go offline until patched.',
        'Monitored the critical systems that had to stay up with custom scripts that parse the logs and pass them to AI agents for review, with a person deciding on every action.',
        'Afterwards, moved several sites to a PHP version that still receives security fixes, and gave the client a clear list of remaining actions.',
      ],
      results: [
        { value: '100+', label: 'sites protected' },
        { value: '0', label: 'domains compromised' },
        { value: '< 1 hour', label: 'from fix available to patched or closed off' },
      ],
      resultBody:
        'Every site was patched or safely closed off within an hour of the fix becoming available, and none was compromised. Several sites now run a supported PHP version, so the next flaw like this will have an official patch.',
      stack: ['PHP', 'Linux', 'Custom log-parsing scripts', 'AI agents for log review'],
      article: 'php2shell-response',
      offer: 'security-check',
    },
    {
      slug: 'aws-cost-management',
      tone: 'tone-4',
      title: 'AWS cost management',
      heading: 'About a quarter off the AWS bill, and tooling to keep it there.',
      summary: 'Rightsizing, cleaning up and automating cost tracking for a software company running multiple services on AWS.',
      client: 'A software company running multiple services',
      problem:
        'A software company running multiple services on AWS paid for more than it used, without an easy way to see what each part cost.',
      approach: [
        'Analysed spending per service to see where the money went.',
        'Resized resources that were larger than they needed to be.',
        'Removed resources that were no longer used.',
        'Built automated cost tooling on the AWS SDK, so spending is tracked continuously instead of checked once.',
      ],
      results: [{ value: '~25%', label: 'lower AWS costs' }],
      resultBody: 'The AWS bill dropped by around 25%, and the automated tooling keeps costs visible so that it does not quietly grow back.',
      stack: ['AWS', 'AWS SDK', 'Custom scripts'],
      offer: 'aws-review',
    },
  ],
  nl: [
    {
      slug: 'api-integration-platform',
      tone: 'tone-1',
      title: 'API-integratieplatform',
      heading: 'Meer dan 50 externe API’s, samengebracht en beheerd in één dashboard.',
      summary: 'Eén dashboardomgeving voor meer dan 50 externe API’s, in gebruik bij ruim 20 bedrijven, zo gebouwd dat één haperende leverancier nooit de rest meesleept.',
      client: 'Ruim 20 bedrijven tot nu toe',
      role: 'Lead architect en ontwikkelaar',
      duration: '3 à 4 maanden tot de eerste release, nog volop in ontwikkeling',
      problem:
        'De bedrijven die het gebruiken zijn elk afhankelijk van een lange lijst externe systemen: property management systems, AWS-servers, Docker-hosts, betaalproviders, WordPress-sites en meer. Elk systeem heeft een eigen API en een eigen dashboard, en elk kan op zijn eigen manier falen: trage antwoorden, verlopen tokens, gewijzigde formaten of rate limits. Ze hadden één plek nodig om dat allemaal te zien en te beheren.',
      approach: [
        'Een Laravel-kern met elke koppeling in een eigen module met eigen instellingen, zodat een nieuwe API erbij kan zonder de rest te raken.',
        'Begonnen met een kleine set functies, na 3 à 4 maanden uitgebracht en sindsdien steeds uitgebreid.',
        'Een timeout op elke uitgaande aanroep, en retries die beperkt, gespreid en veilig te herhalen zijn.',
        'Uitgaande verzoeken via een wachtrij afgeremd, zodat grote imports nooit de rate limit opmaken die live gebruikers nodig hebben.',
        'Elk antwoord aan de rand gevalideerd voordat het de database kan bereiken.',
        'Monitoring per koppeling: slagingspercentage, responstijd en tijd sinds de laatste geslaagde aanroep, met alerts bij stilte.',
      ],
      results: [
        { value: '50+', label: 'externe API’s in één dashboard' },
        { value: '20+', label: 'bedrijven die het tot nu toe gebruiken' },
        { value: '3–4 mnd', label: 'van start tot eerste release' },
      ],
      resultBody:
        'Werk waarvoor je vroeger in een tiental systemen moest inloggen, gebeurt nu op één plek. Het platform groeit nog steeds: er komen nieuwe koppelingen en functies bij op hetzelfde fundament.',
      stack: ['PHP', 'Laravel', 'MySQL', 'PostgreSQL', 'MongoDB'],
      article: 'software-that-keeps-working',
      // A new build, not a rescue: no fixed-scope offer fits, so the CTA goes to the general intake.
    },
    {
      slug: 'linux-server-fleet',
      tone: 'tone-2',
      title: 'Veilig beheer van 25+ Linux-servers',
      heading: 'Van servers die nooit werden gepatcht naar beveiligingsupdates binnen enkele uren.',
      summary: 'Meer dan 25 Linux-productieservers bij verschillende bedrijven, onder beheer gebracht met één centraal overzicht.',
      client: 'Verschillende bedrijven',
      role: 'Beheer, patching en security',
      duration: 'Tot 3 jaar per server, doorlopend',
      problem:
        'De servers waren nauwelijks ooit gepatcht en niemand beheerde ze. Elke server was anders ingericht en draaide zijn eigen mix van software, dus er was geen eenduidige manier om ze te onderhouden.',
      approach: [
        'Elke server onder beheer gebracht, met tooling die per server is gekozen in plaats van één opzet voor alles.',
        'Patchen op volgorde van urgentie: kritieke beveiligingsupdates worden binnen enkele uren na verschijnen doorgevoerd.',
        'Patchrondes zo gepland dat de downtime hooguit een paar minuten is.',
        'Eén centraal overzicht van logs en metrics van alle servers in Elasticsearch en Kibana, met monitoring en alerting in Zabbix.',
        'Hardening en inbraakdetectie, zodat een aanvaller minder kan bereiken.',
      ],
      results: [
        { value: '25+', label: 'productieservers in beheer' },
        { value: 'Uren', label: 'van kritieke security-release tot gepatcht' },
        { value: 'Minuten', label: 'downtime per patch, hooguit' },
      ],
      resultBody:
        'Servers die vroeger lang ongepatcht bleven, krijgen kritieke beveiligingsupdates nu binnen enkele uren, en problemen zijn in één centraal overzicht te zien voordat gebruikers ze merken.',
      stack: ['Linux', 'Elasticsearch', 'Kibana', 'Zabbix'],
      offer: 'care',
    },
    {
      slug: 'php2shell-response',
      tone: 'tone-3',
      title: 'PHP2Shell-afhandeling voor 100+ sites',
      heading: 'Twee kritieke PHP-lekken, ruim 100 sites, geen enkele inbraak.',
      summary: 'Ruim 100 PHP-sites bij een hostingbedrijf in kaart gebracht, gepatcht en gemonitord tijdens PHP2Shell, met elke site veilig binnen een uur na de fix.',
      client: 'Een hostingbedrijf',
      role: 'De hele afhandeling: in kaart brengen, patchen en monitoren',
      duration: 'Oktober 2026',
      problem:
        'In oktober 2026 maakte PHP twee kritieke kwetsbaarheden bekend in de interpreter zelf, samen PHP2Shell genoemd. Vanaf de dag van publicatie werd misbruik gemeld. Ruim 100 PHP-sites waren mogelijk kwetsbaar, en een paar kritieke systemen konden niet offline.',
      approach: [
        'In kaart gebracht welke PHP-versie elke site draaide, en op welke manier.',
        'Gepatcht in volgorde van risico: eerst wat aan internet hangt, eerst de riskantste opstellingen, gevoelige data vóór visitekaartjessites.',
        'Gecontroleerd dat de fix actief was in het draaiende PHP-proces, niet alleen geïnstalleerd op schijf.',
        'Site-eigenaren een eerlijke keuze gegeven om offline te gaan tot de patch er was.',
        'De kritieke systemen die online moesten blijven gemonitord met eigen scripts die de logs verwerken en ter beoordeling aan AI-agents doorgeven, met een mens die over elke actie besliste.',
        'Daarna een aantal sites overgezet naar een PHP-versie die nog beveiligingsupdates krijgt, en de klant een duidelijke lijst met resterende acties gegeven.',
      ],
      results: [
        { value: '100+', label: 'sites beschermd' },
        { value: '0', label: 'domeinen gecompromitteerd' },
        { value: '< 1 uur', label: 'van beschikbare fix tot gepatcht of afgesloten' },
      ],
      resultBody:
        'Elke site was binnen een uur nadat de fix beschikbaar kwam gepatcht of veilig afgesloten, en geen enkele werd gecompromitteerd. Een aantal sites draait nu op een ondersteunde PHP-versie, zodat er bij het volgende lek van dit soort wel een officiële patch is.',
      stack: ['PHP', 'Linux', 'Eigen scripts voor logverwerking', 'AI-agents voor logreview'],
      article: 'php2shell-response',
      offer: 'security-check',
    },
    {
      slug: 'aws-cost-management',
      tone: 'tone-4',
      title: 'AWS-kostenbeheer',
      heading: 'Zo’n kwart van de AWS-rekening af, en tooling die dat zo houdt.',
      summary: 'Rightsizing, opruimen en automatische kostenbewaking voor een softwarebedrijf met meerdere diensten op AWS.',
      client: 'Een softwarebedrijf met meerdere diensten',
      problem:
        'Een softwarebedrijf met meerdere diensten op AWS betaalde voor meer dan het gebruikte, zonder makkelijke manier om te zien wat elk onderdeel kostte.',
      approach: [
        'De uitgaven per dienst geanalyseerd, zodat duidelijk was waar het geld heen ging.',
        'Resources verkleind die groter waren dan nodig.',
        'Resources opgeruimd die niet meer werden gebruikt.',
        'Automatische kostentooling gebouwd op de AWS SDK, zodat de uitgaven doorlopend worden gevolgd in plaats van één keer gecontroleerd.',
      ],
      results: [{ value: '~25%', label: 'lagere AWS-kosten' }],
      resultBody: 'De AWS-rekening daalde met zo’n 25%, en de automatische tooling houdt de kosten zichtbaar, zodat ze niet ongemerkt weer oplopen.',
      stack: ['AWS', 'AWS SDK', 'Eigen scripts'],
      offer: 'aws-review',
    },
  ],
};
