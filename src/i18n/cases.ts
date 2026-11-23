import type { Lang } from './index';
import type { OfferSlug } from './offers';

/**
 * Anonymised case studies under /work/cases/<slug>/.
 * Every case follows the same template: problem → approach → result (with numbers) → stack.
 * [TODO] values are placeholders that still need real details.
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
    anonymised: 'Client details are anonymised.',
    facts: { client: 'Client', role: 'My role', duration: 'Duration' },
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
    anonymised: 'Klantgegevens zijn geanonimiseerd.',
    facts: { client: 'Klant', role: 'Mijn rol', duration: 'Looptijd' },
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
  role: string;
  duration: string;
  problem: string;
  approach: string[];
  results: { value: string; label: string }[];
  resultBody: string;
  stack: string[];
  /** Knowledge article slug with the longer story. */
  article?: string;
  offer: OfferSlug;
}

export const cases: Record<Lang, CaseStudy[]> = {
  en: [
    {
      slug: 'api-integration-platform',
      tone: 'tone-1',
      title: 'API integration platform',
      heading: 'More than 50 external APIs, managed from one place.',
      summary: 'One dashboard environment for 50+ external APIs, built so that a single failing provider never takes the rest down.',
      client: '[TODO: sector and size, e.g. “e-commerce company, ~40 employees”]',
      role: '[TODO: e.g. lead developer]',
      duration: '[TODO]',
      problem:
        'The business relied on more than 50 external APIs [TODO: what for, e.g. orders, stock, payments]. Every one of them could fail in its own way: slow responses, expired tokens, changed formats or rate limits. [TODO: what went wrong before, e.g. silent sync failures or manual re-entry of data.]',
      approach: [
        'Every integration in its own module with its own settings, and slow work moved to background queues.',
        'Timeouts on every outgoing call, and retries that are limited, spaced out and safe to repeat.',
        'Outgoing requests throttled through a queue, so large imports never use up the rate limit live users need.',
        'Each response validated at the edge before it can reach the database.',
        'Monitoring per integration: success rate, response time and time since the last successful call, with alerts on silence.',
        'Credentials in a secrets manager, one key per integration with only the permissions it needs.',
      ],
      results: [
        { value: '50+', label: 'APIs managed in one place' },
        { value: '[TODO]', label: 'uptime or error rate after launch' },
        { value: '[TODO]', label: 'hours of manual work saved per week' },
      ],
      resultBody: '[TODO: one or two sentences on what changed for the business.]',
      stack: ['[TODO: e.g. PHP / Laravel]', '[TODO: queue]', '[TODO: database]', '[TODO: monitoring]'],
      article: 'software-that-keeps-working',
      offer: 'takeover',
    },
    {
      slug: 'linux-server-fleet',
      tone: 'tone-2',
      title: 'Secure management of 25+ Linux servers',
      heading: 'More than 25 production servers, patched and hardened without relying on memory.',
      summary: 'A fleet of Linux production servers kept up to date and watched automatically, instead of by hand.',
      client: '[TODO: sector and size]',
      role: '[TODO: e.g. responsible for server management and security]',
      duration: '[TODO]',
      problem:
        'More than 25 Linux servers ran production workloads. [TODO: the starting point, e.g. manual patching, servers configured differently, no clear view of who had access.]',
      approach: [
        'Automated patching, so security updates no longer depend on someone remembering them.',
        'Hardening of every server to reduce what an attacker can reach.',
        'Intrusion detection and automated security compliance checks.',
        'Real-time monitoring and alerting, so problems show up before users notice.',
        '[TODO: anything else, e.g. configuration management or access reviews]',
      ],
      results: [
        { value: '25+', label: 'production servers managed' },
        { value: '[TODO]', label: 'time from security release to patched' },
        { value: '[TODO]', label: 'security incidents or unplanned outages' },
      ],
      resultBody: '[TODO: one or two sentences on what changed, e.g. for audits or for the team.]',
      stack: ['Linux', '[TODO: distribution]', '[TODO: automation tooling]', '[TODO: monitoring / IDS]'],
      offer: 'care',
    },
    {
      slug: 'php2shell-response',
      tone: 'tone-3',
      title: 'PHP2Shell response for 100+ sites',
      heading: 'Two critical PHP flaws, more than 100 sites, not a single compromise.',
      summary: 'Patching over 100 PHP sites in order of risk during PHP2Shell, while watching the ones that could not go offline.',
      client: '[TODO: e.g. “hosting and maintenance portfolio of ~100 client sites”]',
      role: '[TODO: e.g. led the incident response]',
      duration: '[TODO: e.g. October 2026, X days]',
      problem:
        'In October 2026, PHP disclosed two critical remote code execution flaws in the interpreter itself, known together as PHP2Shell. Exploitation in the wild was reported from the day of release. More than 100 PHP sites were potentially exposed, and a few critical systems could not be taken offline.',
      approach: [
        'Took stock of which PHP version each site ran, and how PHP was run.',
        'Patched in order of risk: internet-facing first, the riskiest setups first, sensitive data before brochure sites.',
        'Checked that the fix was active in the running PHP process, not just installed on disk.',
        'Applied interim measures in php.ini and the FPM pools where updating had to wait.',
        'Gave site owners an honest choice to go offline until patched.',
        'Kept critical systems running under close, AI-assisted monitoring of their logs, with a person deciding on every action.',
        'Checked exposed systems afterwards for signs of compromise.',
      ],
      results: [
        { value: '100+', label: 'sites protected' },
        { value: '0', label: 'domains compromised' },
        { value: '[TODO]', label: 'time to patch every site' },
      ],
      resultBody:
        'Every site was patched or kept safely offline, and none was compromised. [TODO: anything that changed afterwards, e.g. a planned upgrade away from PHP 8.2.]',
      stack: ['PHP', 'Linux', 'AI-assisted log monitoring', '[TODO: other tools]'],
      article: 'php2shell-response',
      offer: 'security-check',
    },
    {
      slug: 'aws-cost-management',
      tone: 'tone-4',
      title: 'AWS cost management',
      heading: 'An AWS bill that someone can explain, and predict.',
      summary: 'Tracking and forecasting cloud spending, with budget alerts and concrete savings.',
      client: '[TODO: sector and size]',
      role: '[TODO]',
      duration: '[TODO]',
      problem: 'Cloud spending kept rising and nobody could say exactly why. [TODO: the starting point, e.g. monthly bill, number of accounts.]',
      approach: [
        'Tracked spending per service so it was clear where the money went.',
        'Forecast spending ahead of the bill.',
        'Budget alerts, so unexpected growth is spotted within days instead of at the end of the month.',
        'Concrete savings recommendations, such as rightsizing resources. [TODO: which ones were applied]',
      ],
      results: [
        { value: '[TODO: %]', label: 'lower monthly AWS spend' },
        { value: '[TODO]', label: 'saved per year' },
        { value: '[TODO]', label: 'AWS accounts or services covered' },
      ],
      resultBody: '[TODO: one or two sentences on the result.]',
      stack: ['AWS', '[TODO: e.g. Cost Explorer, Budgets]', '[TODO]'],
      offer: 'aws-review',
    },
  ],
  nl: [
    {
      slug: 'api-integration-platform',
      tone: 'tone-1',
      title: 'API-integratieplatform',
      heading: 'Meer dan 50 externe API’s, beheerd vanaf één plek.',
      summary: 'Eén dashboardomgeving voor meer dan 50 externe API’s, zo gebouwd dat één haperende leverancier nooit de rest meesleept.',
      client: '[TODO: sector en omvang, bijv. “webwinkel, ~40 medewerkers”]',
      role: '[TODO: bijv. lead developer]',
      duration: '[TODO]',
      problem:
        'Het bedrijf was afhankelijk van meer dan 50 externe API’s [TODO: waarvoor, bijv. bestellingen, voorraad, betalingen]. Elke API kon op zijn eigen manier falen: trage antwoorden, verlopen tokens, gewijzigde formaten of rate limits. [TODO: wat er eerder misging, bijv. synchronisaties die stil faalden of data die met de hand werd overgetikt.]',
      approach: [
        'Elke koppeling in een eigen module met eigen instellingen, en traag werk naar achtergrondwachtrijen.',
        'Een timeout op elke uitgaande aanroep, en retries die beperkt, gespreid en veilig te herhalen zijn.',
        'Uitgaande verzoeken via een wachtrij afgeremd, zodat grote imports nooit de rate limit opmaken die live gebruikers nodig hebben.',
        'Elk antwoord aan de rand gevalideerd voordat het de database kan bereiken.',
        'Monitoring per koppeling: slagingspercentage, responstijd en tijd sinds de laatste geslaagde aanroep, met alerts bij stilte.',
        'Inloggegevens in een secrets manager, één sleutel per koppeling met alleen de rechten die nodig zijn.',
      ],
      results: [
        { value: '50+', label: 'API’s op één plek beheerd' },
        { value: '[TODO]', label: 'uptime of foutpercentage na livegang' },
        { value: '[TODO]', label: 'uur handwerk per week bespaard' },
      ],
      resultBody: '[TODO: een of twee zinnen over wat er voor het bedrijf veranderde.]',
      stack: ['[TODO: bijv. PHP / Laravel]', '[TODO: wachtrij]', '[TODO: database]', '[TODO: monitoring]'],
      article: 'software-that-keeps-working',
      offer: 'takeover',
    },
    {
      slug: 'linux-server-fleet',
      tone: 'tone-2',
      title: 'Veilig beheer van 25+ Linux-servers',
      heading: 'Meer dan 25 productieservers, gepatcht en gehard zonder dat het van iemands geheugen afhangt.',
      summary: 'Een park Linux-productieservers dat automatisch up-to-date en in de gaten wordt gehouden, in plaats van met de hand.',
      client: '[TODO: sector en omvang]',
      role: '[TODO: bijv. verantwoordelijk voor serverbeheer en security]',
      duration: '[TODO]',
      problem:
        'Meer dan 25 Linux-servers draaiden productiewerk. [TODO: de beginsituatie, bijv. handmatig patchen, servers die elk anders waren ingericht, geen duidelijk beeld van wie toegang had.]',
      approach: [
        'Automatisch patchen, zodat beveiligingsupdates niet meer afhangen van iemand die eraan denkt.',
        'Elke server gehard, zodat een aanvaller minder kan bereiken.',
        'Inbraakdetectie en geautomatiseerde compliancecontroles.',
        'Realtime monitoring en alerting, zodat problemen opvallen voordat gebruikers ze merken.',
        '[TODO: verder nog iets, bijv. configuratiebeheer of toegangsreviews]',
      ],
      results: [
        { value: '25+', label: 'productieservers in beheer' },
        { value: '[TODO]', label: 'tijd van security-release tot gepatcht' },
        { value: '[TODO]', label: 'beveiligingsincidenten of ongeplande storingen' },
      ],
      resultBody: '[TODO: een of twee zinnen over wat er veranderde, bijv. bij audits of voor het team.]',
      stack: ['Linux', '[TODO: distributie]', '[TODO: automatiseringstools]', '[TODO: monitoring / IDS]'],
      offer: 'care',
    },
    {
      slug: 'php2shell-response',
      tone: 'tone-3',
      title: 'PHP2Shell-afhandeling voor 100+ sites',
      heading: 'Twee kritieke PHP-lekken, ruim 100 sites, geen enkele inbraak.',
      summary: 'Ruim 100 PHP-sites gepatcht in volgorde van risico tijdens PHP2Shell, terwijl de sites die online moesten blijven scherp in de gaten werden gehouden.',
      client: '[TODO: bijv. “hosting- en onderhoudsportfolio van ~100 klantsites”]',
      role: '[TODO: bijv. leidde de incidentafhandeling]',
      duration: '[TODO: bijv. oktober 2026, X dagen]',
      problem:
        'In oktober 2026 maakte PHP twee kritieke kwetsbaarheden bekend in de interpreter zelf, samen PHP2Shell genoemd. Vanaf de dag van publicatie werd misbruik gemeld. Ruim 100 PHP-sites waren mogelijk kwetsbaar, en een paar kritieke systemen konden niet offline.',
      approach: [
        'In kaart gebracht welke PHP-versie elke site draaide, en op welke manier.',
        'Gepatcht in volgorde van risico: eerst wat aan internet hangt, eerst de riskantste opstellingen, gevoelige data vóór visitekaartjessites.',
        'Gecontroleerd dat de fix actief was in het draaiende PHP-proces, niet alleen geïnstalleerd op schijf.',
        'Tijdelijke maatregelen in php.ini en de FPM-pools waar updaten moest wachten.',
        'Site-eigenaren een eerlijke keuze gegeven om offline te gaan tot de patch er was.',
        'Kritieke systemen draaiende gehouden onder nauwlettende, door AI ondersteunde monitoring van hun logs, met een mens die over elke actie besliste.',
        'Achteraf de blootgestelde systemen gecontroleerd op sporen van een inbraak.',
      ],
      results: [
        { value: '100+', label: 'sites beschermd' },
        { value: '0', label: 'domeinen gecompromitteerd' },
        { value: '[TODO]', label: 'tijd tot alle sites gepatcht waren' },
      ],
      resultBody:
        'Elke site werd gepatcht of bleef veilig offline, en geen enkele werd gecompromitteerd. [TODO: wat er daarna veranderde, bijv. een geplande upgrade weg van PHP 8.2.]',
      stack: ['PHP', 'Linux', 'Logmonitoring met AI', '[TODO: andere tools]'],
      article: 'php2shell-response',
      offer: 'security-check',
    },
    {
      slug: 'aws-cost-management',
      tone: 'tone-4',
      title: 'AWS-kostenbeheer',
      heading: 'Een AWS-rekening die iemand kan uitleggen, en voorspellen.',
      summary: 'Cloudkosten volgen en voorspellen, met budgetalerts en concrete besparingen.',
      client: '[TODO: sector en omvang]',
      role: '[TODO]',
      duration: '[TODO]',
      problem: 'De cloudkosten bleven stijgen en niemand kon precies zeggen waarom. [TODO: de beginsituatie, bijv. maandbedrag, aantal accounts.]',
      approach: [
        'De uitgaven per dienst gevolgd, zodat duidelijk was waar het geld heen ging.',
        'De uitgaven vooraf voorspeld, in plaats van achteraf verrast te worden door de rekening.',
        'Budgetalerts, zodat onverwachte groei binnen dagen opvalt in plaats van aan het eind van de maand.',
        'Concrete besparingsadviezen, zoals rightsizing van resources. [TODO: welke zijn doorgevoerd]',
      ],
      results: [
        { value: '[TODO: %]', label: 'lagere maandelijkse AWS-kosten' },
        { value: '[TODO]', label: 'bespaard per jaar' },
        { value: '[TODO]', label: 'AWS-accounts of -diensten in beeld' },
      ],
      resultBody: '[TODO: een of twee zinnen over het resultaat.]',
      stack: ['AWS', '[TODO: bijv. Cost Explorer, Budgets]', '[TODO]'],
      offer: 'aws-review',
    },
  ],
};
