import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const agentDir = path.join(publicDir, 'agent');
const agentBlogDir = path.join(agentDir, 'blog');
const siteUrl = 'https://www.vibeperform.com';
const calendarUrl = 'https://calendar.app.google/utFQgw33PwJTiDk56';
const contactEmail = 'contact@vibeperform.com';

const jiti = createJiti(import.meta.url);

const [{ homeContent }, { workshopsContent }, { aboutContent }, { exploreWorkshopContent }, { landingHighlightsContent }] =
	await Promise.all([
		jiti.import('../src/data/homeContent.ts'),
		jiti.import('../src/data/workshopsContent.ts'),
		jiti.import('../src/data/aboutContent.ts'),
		jiti.import('../src/data/exploreWorkshopContent.ts'),
		jiti.import('../src/data/landingHighlights.ts'),
	]);

const deHome = homeContent.de;
const deWorkshops = workshopsContent.de;
const deAbout = aboutContent.de;
const deExplore = exploreWorkshopContent.de;
const deHighlights = landingHighlightsContent.de;

const absoluteUrl = (pathname) => new URL(pathname, siteUrl).toString();
const stripHtml = (value) => String(value).replace(/<[^>]*>/g, '');
const normalizeBlankLines = (value) => value.replace(/\n{3,}/g, '\n\n').trim() + '\n';
const bulletList = (items) => items.map((item) => `- ${stripHtml(item)}`).join('\n');
const section = (title, body) => `## ${title}\n\n${body.trim()}`;

function frontmatterAndBody(source) {
	const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) {
		return { data: {}, body: source.trim() };
	}

	const data = {};
	for (const line of match[1].split('\n')) {
		const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
		if (!pair) {
			continue;
		}
		const [, key, rawValue] = pair;
		data[key] = rawValue.trim().replace(/^["']|["']$/g, '');
	}

	return { data, body: match[2].trim() };
}

async function readGermanBlogPosts() {
	const blogDir = path.join(rootDir, 'src/pages/de/blog');
	const files = (await fs.readdir(blogDir)).filter((file) => file.endsWith('.md')).sort();

	return Promise.all(
		files.map(async (file) => {
			const source = await fs.readFile(path.join(blogDir, file), 'utf8');
			const { data, body } = frontmatterAndBody(source);
			const slug = file.replace(/\.md$/, '');
			return {
				slug,
				agentPath: `/agent/blog/${slug}.md`,
				canonicalPath: `/de/blog/${slug}`,
				...data,
				body,
			};
		}),
	);
}

function pageHeader({ title, canonicalPath, description, alternatePath }) {
	const lines = [
		`# ${title}`,
		'',
		`Canonical URL: ${absoluteUrl(canonicalPath)}`,
		alternatePath ? `English alternate: ${absoluteUrl(alternatePath)}` : '',
		description ? `Summary: ${stripHtml(description)}` : '',
	].filter(Boolean);

	return `${lines.join('\n')}\n\n`;
}

function renderHomeAgentPage() {
	const applications = deHighlights.applications.cards
		.map(
			(card) =>
				`### ${card.title}\n\n${card.description}\n\n${card.highlight}\n\n${bulletList(card.examples)}`,
		)
		.join('\n\n');

	const useCases = deHome.useCases.cards
		.map(
			(card) =>
				`### ${card.title}\n\nKategorie: ${card.category}\n\n${card.description}\n\n${bulletList(card.highlights)}`,
		)
		.join('\n\n');

	return normalizeBlankLines(`${pageHeader({
		title: 'Vibeperform',
		canonicalPath: '/de/',
		description: deHome.hero.subtitle,
		alternatePath: '/en/',
	})}${section('Positionierung', `${deHome.hero.kicker}\n\n${deHome.hero.subtitle}`)}

${section('Zentrale Versprechen', bulletList(deHome.hero.callouts.map((item) => `${item.label}: ${item.description}`)))}

${section('Für wen das Angebot gemacht ist', `${deHome.audience.subheading}\n\n${bulletList(deHome.audience.cards.map((card) => card.copy))}`)}

${section(deHome.useCases.heading, `${deHome.useCases.subheading}\n\n${useCases}`)}

${section(deHighlights.applications.heading, `${deHighlights.applications.description}\n\n${applications}`)}

${section(deHighlights.security.heading, `${deHighlights.security.body.join('\n\n')}\n\n${deHighlights.security.highlight}`)}

${section('Kontakt', `E-Mail: ${contactEmail}\n\nErstgespräch buchen: ${calendarUrl}`)}`);
}

function renderWorkshopsAgentPage() {
	const offerings = deWorkshops.offerings
		.map(
			(offer) =>
				`### ${offer.title}\n\n${offer.meta}\n\n${offer.description}\n\nErgebnisse:\n${bulletList(offer.outcomes)}`,
		)
		.join('\n\n');

	const proof = deWorkshops.proof.items.map((item) => `${item.stat}: ${item.body}`).join('\n');

	return normalizeBlankLines(`${pageHeader({
		title: deWorkshops.hero.title,
		canonicalPath: '/de/workshops',
		description: deWorkshops.hero.intro,
		alternatePath: '/en/workshops',
	})}${section(deWorkshops.valueSection.heading, bulletList(deWorkshops.valueSection.bullets.map((item) => `${item.title} ${item.body}`)))}

${section(deWorkshops.offeringsIntro.heading, `${deWorkshops.offeringsIntro.body}\n\n${offerings}`)}

${section(deWorkshops.proof.heading, proof)}

${section(deWorkshops.team.heading, deWorkshops.team.body)}

${section('Kontakt', `${deWorkshops.finalCta.heading}\n\n${deWorkshops.finalCta.body}\n\n${deWorkshops.finalCta.button.label}: ${deWorkshops.finalCta.button.href}`)}`);
}

function renderExploreAgentPage() {
	const proofItems = deExplore.proofItems.map((item) => `${item.stat}: ${item.copy}`).join('\n');
	const framework = deExplore.frameworkSteps.map((item) => `${item.title}: ${item.copy}`).join('\n');
	const deliverables = deExplore.deliverables.map((item) => `${item.title}: ${item.copy}`).join('\n');

	return normalizeBlankLines(`${pageHeader({
		title: deExplore.title,
		canonicalPath: '/de/workshop/explore-workshop',
		description: deExplore.intro,
		alternatePath: '/en/workshop/explore-workshop',
	})}${section(deExplore.introTitle, deExplore.introBody)}

${section('Kennzahlen und Ergebnisrahmen', proofItems)}

${section(deExplore.experienceTitle, deExplore.experienceBody.join('\n\n'))}

${section(deExplore.frameworkTitle, `${deExplore.frameworkBody}\n\n${framework}`)}

${section(deExplore.priorityTitle, `${deExplore.priorityBody}\n\n${deExplore.useCasesLabel}:\n${bulletList(deExplore.useCases)}`)}

${section(deExplore.outcomeTitle, `${deExplore.outcomeBody}\n\n${deliverables}`)}

${section('Kontakt', `${deExplore.finalTitle}\n\n${deExplore.finalBody}\n\nE-Mail: ${contactEmail}\n\nErstgespräch buchen: ${calendarUrl}`)}`);
}

function renderAboutAgentPage() {
	const team = deAbout.team.members
		.map((member) => `### ${member.name}\n\n${member.tagline}\n\n${member.paragraphs.join('\n\n')}`)
		.join('\n\n');

	return normalizeBlankLines(`${pageHeader({
		title: deAbout.hero.title,
		canonicalPath: '/de/ueber-uns',
		description: deAbout.hero.intro,
		alternatePath: '/en/about-us',
	})}${section('Versprechen', `${deAbout.hero.intro}\n\n${deAbout.hero.promise}`)}

${section(deAbout.team.title, team)}

${section(deAbout.approach.title, `${deAbout.approach.intro}\n\n${bulletList(deAbout.approach.steps)}\n\n${deAbout.approach.closing}`)}

${section('Kontakt', `${deAbout.connect.title}\n\n${deAbout.connect.body}\n\n${deAbout.connect.button.label}: ${deAbout.connect.button.href}`)}`);
}

function renderBlogAgentPage(post) {
	return normalizeBlankLines(`${pageHeader({
		title: post.title,
		canonicalPath: post.canonicalPath,
		description: post.excerpt,
		alternatePath: post.alternateLocaleHref,
	})}Kicker: ${post.kicker}
Datum: ${post.date}
Autor: ${post.author}
Lesezeit: ${post.readTime}

${post.body}`);
}

function renderLlmsTxt(blogPosts) {
	const blogLinks = blogPosts
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map((post) => `- [${post.title}](${absoluteUrl(post.agentPath)}) — ${post.excerpt}`)
		.join('\n');

	return normalizeBlankLines(`# Vibeperform

Vibeperform ist ein KI-Beratungs- und Umsetzungspartner für kleine und mittlere Unternehmen. Die kanonische agentenlesbare Sprache ist Deutsch. Englische Webseiten bleiben als Alternativen verlinkt.

## Wichtige Agentenressourcen

- [Vollständiger Agenten-Kontext](${absoluteUrl('/llms-full.txt')}) — Ein Markdown-Bundle der wichtigsten deutschen Inhalte.
- [Startseite](${absoluteUrl('/agent/index.md')}) — Positionierung, Zielgruppen, Use Cases und Kontakt.
- [Workshops](${absoluteUrl('/agent/workshops.md')}) — Workshop-Formate, Ergebnisse und Anschlussfähigkeit.
- [Strategischer Explore Workshop](${absoluteUrl('/agent/explore-workshop.md')}) — Phase-1-Angebot, Roadmap-Ergebnis und Priorisierung.
- [Über Vibeperform](${absoluteUrl('/agent/about.md')}) — Team, Arbeitsweise und Kontakt.

## Blog

${blogLinks}

## Kontakt und Aktionen

- E-Mail: ${contactEmail}
- Erstgespräch buchen: ${calendarUrl}
- Website: ${absoluteUrl('/de/')}

## Hinweise für Agenten

- Verwende die Dateien unter /agent/ für kompakten Inhalt ohne Navigation, Layout, JavaScript oder Styling.
- Verwende /de/ als kanonische Website-Sprache für Zusammenfassungen und Zitate.
- Verwende die englischen Alternativ-URLs nur, wenn ein Nutzer explizit englische Inhalte benötigt.`);
}

function renderLlmsFull(pages, blogPosts) {
	const intro = `# Vibeperform vollständiger Agenten-Kontext

Quelle: ${absoluteUrl('/llms-full.txt')}
Kanonische Sprache: Deutsch`;
	const chunks = [
		intro,
		...pages.map((page) => page.content),
		...blogPosts.map(renderBlogAgentPage),
	];

	return normalizeBlankLines(chunks.join('\n\n---\n\n'));
}

function renderRobotsTxt() {
	return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}

# Agent-readable content:
# LLM-Content: ${absoluteUrl('/llms.txt')}
# LLM-Full-Content: ${absoluteUrl('/llms-full.txt')}
`;
}

function renderSitemapXml(blogPosts) {
	const urls = [
		'/de/',
		'/en/',
		'/de/workshops',
		'/en/workshops',
		'/de/workshop/explore-workshop',
		'/en/workshop/explore-workshop',
		'/de/ueber-uns',
		'/en/about-us',
		'/de/impressum',
		'/en/legal-notice',
		'/de/datenschutz',
		'/en/privacy',
		'/de/blog',
		'/en/blog',
		'/llms.txt',
		'/llms-full.txt',
		'/agent/index.md',
		'/agent/workshops.md',
		'/agent/explore-workshop.md',
		'/agent/about.md',
		...blogPosts.map((post) => post.canonicalPath),
		...blogPosts.map((post) => post.agentPath),
	];

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `	<url>
		<loc>${absoluteUrl(url)}</loc>
	</url>`,
	)
	.join('\n')}
</urlset>
`;
}

async function writeFile(relativePath, content) {
	await fs.writeFile(path.join(publicDir, relativePath), content, 'utf8');
}

await fs.mkdir(agentBlogDir, { recursive: true });

const blogPosts = await readGermanBlogPosts();
const pages = [
	{ relativePath: 'agent/index.md', content: renderHomeAgentPage() },
	{ relativePath: 'agent/workshops.md', content: renderWorkshopsAgentPage() },
	{ relativePath: 'agent/explore-workshop.md', content: renderExploreAgentPage() },
	{ relativePath: 'agent/about.md', content: renderAboutAgentPage() },
];

await Promise.all([
	...pages.map((page) => writeFile(page.relativePath, page.content)),
	...blogPosts.map((post) => writeFile(`agent/blog/${post.slug}.md`, renderBlogAgentPage(post))),
	writeFile('llms.txt', renderLlmsTxt(blogPosts)),
	writeFile('llms-full.txt', renderLlmsFull(pages, blogPosts)),
	writeFile('robots.txt', renderRobotsTxt()),
	writeFile('sitemap.xml', renderSitemapXml(blogPosts)),
]);

console.log(`Generated ${pages.length + blogPosts.length} agent Markdown files, llms.txt, llms-full.txt, robots.txt, and sitemap.xml.`);
