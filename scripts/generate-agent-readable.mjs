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

const { aboutContent } = await jiti.import('../src/data/aboutContent.ts');

const { knowledgeContent, groupKnowledgePosts } = await jiti.import('../src/data/knowledgeContent.ts');
const { tradePageContent } = await jiti.import('../src/data/tradePageContent.ts');
const { homePageContent } = await jiti.import('../src/data/homePageContent.ts');
const { homeIntroContent } = await jiti.import('../src/data/homeIntroContent.ts');
const { homeStoryContent } = await jiti.import('../src/data/homeStoryContent.ts');
const { serviceNarratives } = await jiti.import('../src/data/serviceNarratives.ts');
const { websiteCreationContent } = await jiti.import('../src/data/websiteCreationContent.ts');
const { serviceDetails, detailPaths, serviceKeys } = await jiti.import('../src/data/serviceDetails.ts');
const { serviceContent, servicePaths } = await jiti.import('../src/data/serviceContent.ts');
const { supplementalContent } = await jiti.import('../src/data/supplementalContent.ts');
const { overviewSituations } = await jiti.import('../src/data/overviewSituations.ts');
const { potentialAnalysisContent } = await jiti.import('../src/data/potentialAnalysisContent.ts');
const potentialPaths = { de: '/de/ki-potenzialanalyse/', en: '/en/ai-potential-analysis/' };

function renderAssessment(locale) {
 const c=supplementalContent[locale].report;
 return section(c.label, `${c.title}\n\n${c.intro}\n\n${c.rows.map(([title,body])=>`### ${title}\n\n${body}`).join('\n\n')}\n\n${c.next}`);
}
function renderPotentialAnalysis(locale) {
 const c=potentialAnalysisContent[locale], t=supplementalContent[locale];
 return normalizeBlankLines([
 pageHeader({title:`${t.analysisTitle} ${t.analysisEmphasis}`,canonicalPath:potentialPaths[locale],description:c.hero.intro}),
 section(c.review.title,`${c.review.intro}\n\n${bulletList(c.review.items)}\n\n${c.review.decisionBody}`),
 renderAssessment(locale),
 section(c.process.title,c.process.items.map(x=>`### ${x.title}\n\n${x.body}`).join('\n\n')),
 section(c.faq.kicker,c.faq.items.map(x=>`### ${x.question}\n\n${x.answer}`).join('\n\n')),
 section(`${t.analysisContactTitle} ${t.analysisContactEmphasis}`,`${c.finalCta.body}\n\n${t.analysisBoundary}\n\n[${t.analysisRequest}](${c.finalCta.button.href})\n\n[${t.introCall}](${calendarUrl})`)
 ].join('\n\n'));
}

const hasFileExtension = (pathname) => /\/[^/]+\.[^/]+$/.test(pathname);
const absoluteUrl = (pathname) => {
	const url = new URL(pathname, siteUrl);
	if (url.origin === siteUrl && !url.pathname.endsWith('/') && !hasFileExtension(url.pathname)) {
		url.pathname = `${url.pathname}/`;
	}
	return url.toString();
};
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

async function readBlogPosts(locale = 'de') {
	const blogDir = path.join(rootDir, `src/pages/${locale}/blog`);
	const files = (await fs.readdir(blogDir)).filter((file) => file.endsWith('.md')).sort();

	return Promise.all(
		files.map(async (file) => {
			const source = await fs.readFile(path.join(blogDir, file), 'utf8');
			const { data, body } = frontmatterAndBody(source);
			const slug = file.replace(/\.md$/, '');
			return {
				slug,
				agentPath: `/agent/blog/${slug}.md`,
				canonicalPath: `/${locale}/blog/${slug}/`,
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
		alternatePath ? `${canonicalPath.startsWith('/en/') ? 'German' : 'English'} alternate: ${absoluteUrl(alternatePath)}` : '',
		description ? `Summary: ${stripHtml(description)}` : '',
	].filter(Boolean);

	return `${lines.join('\n')}\n\n`;
}

function renderHomeAgentPage() {
 const c = homePageContent.de;
 const intro = homeIntroContent.de;
 const articles = items => items.map(item => `### ${item.title}\n\n${item.body}`).join('\n\n');
 return normalizeBlankLines(`${pageHeader({title:'Vibeperform',canonicalPath:'/de/',description:intro.description,alternatePath:'/en/'})}
${section('Positionierung', `${intro.headline.replaceAll('\n', ' ')} ${intro.emphasis}\n\n${intro.intro.join(' ')}\n\n${intro.audience}`)}
${section('HMS Loistl: Gute Arbeit. Endlich sichtbar.', '[Webseite besuchen](https://www.hms-loistl.de/) – Vorher-Nachher-Vergleich des Webseitenauftritts.')}
${section(`${homeStoryContent.de.collaboration.title} ${homeStoryContent.de.collaboration.emphasis}`, articles(homeStoryContent.de.collaboration.items))}
${section(`${c.purpose.title} ${c.purpose.middle} ${c.purpose.emphasis}`, `${c.purpose.mission}\n\n### ${c.purpose.visionLabel}\n\n${c.purpose.vision}`)}
${section(`${c.services.title} ${c.services.emphasis}`, `${c.services.items.map(item=>`### ${item.title}\n\n${item.body}\n\n[${item.link}](${absoluteUrl(item.href.startsWith('#')?'/de/'+item.href:item.href)})`).join('\n\n')}`)}
${section('Häufige Fragen', c.faq.items.map(item=>`### ${item.question}\n\n${item.answer}`).join('\n\n'))}
${section(`${c.contact.title} ${c.contact.emphasis}`, `${c.contact.body}\n\n${c.contact.detail}\n\nE-Mail: ${contactEmail}\n\n${c.contact.booking}: ${calendarUrl}`)}`);
}

function renderWorkshopsAgentPage(locale='de') {
 const c=supplementalContent[locale].workshops;
 return normalizeBlankLines([
 pageHeader({title:`${c.title} ${c.emphasis}`,canonicalPath:`/${locale}/workshops/`,description:c.intro}),
 ...c.formats.map((f,i)=>section(f.title,`${f.question}\n\n${f.body}\n\n${f.outcome}\n\n[${f.link}](${i===0?absoluteUrl(`/${locale}/workshop/explore-workshop/`):calendarUrl})`)),
 section(`${c.closingTitle} ${c.closingEmphasis}`,`${c.closingBody}\n\n${calendarUrl}`)
 ].join('\n\n'));
}
function renderExploreAgentPage(locale='de') {
 const c=supplementalContent[locale].explore;
 return normalizeBlankLines([
 pageHeader({title:`${c.title} ${c.emphasis}`,canonicalPath:`/${locale}/workshop/explore-workshop/`,description:c.intro}),
 section(`${c.resultTitle} ${c.resultEmphasis}`,c.resultBody),renderAssessment(locale),
 ...c.fields.map(([a,b])=>section(a,b)),
 section(`${c.closingTitle} ${c.closingEmphasis}`,`${c.closingBody}\n\n${calendarUrl}`)
 ].join('\n\n'));
}

function renderTradePage(locale) {
 const c=tradePageContent[locale];
 const route=locale==='de'?'/de/websites-fuer-handwerksbetriebe/':'/en/websites-for-trade-businesses/';
 const list=items=>items.map(([title,body])=>`### ${title}\n\n${body}`).join('\n\n');
 return normalizeBlankLines([
 pageHeader({title:`${c.title} ${c.emphasis}`,canonicalPath:route,description:c.intro}),
 c.kicker,c.note,
 section(`${c.problemsTitle} ${c.problemsEmphasis}`,list(c.problems)),
 section(locale==='de'?'Ein paar Angaben. Ein besserer Einstieg.':'A few details. A better starting point.',locale==='de'?'Vorhaben: Was soll gemacht werden?\n\nProjektort: Wo ist die Arbeit geplant?\n\nEinblick: Welche Fotos oder Maße liegen schon vor?\n\nDie Webseite sammelt Kontext. Die fachliche Einschätzung bleibt bei Ihrem Betrieb.':'Project: What needs to be done?\n\nLocation: Where is the work planned?\n\nContext: Which photos or measurements are available?\n\nThe website gathers context. Your business makes the professional assessment.'),
 section(`${c.processTitle} ${c.processEmphasis}`,`${c.processNote ? `${c.processNote.before}[${c.processNote.label}](${absoluteUrl(c.processNote.href)})${c.processNote.after}\n\n` : ''}${list(c.steps)}`),
 section(`${c.careTitle} ${c.careEmphasis}`,`[${c.careLink}](${absoluteUrl(c.careHref)})`),
 section(`${c.faqTitle} ${c.faqEmphasis}`,list(c.faq)),
 section(`${c.contactTitle} ${c.contactEmphasis}`,`${c.contactBody}\n\n[${c.cta}](${absoluteUrl(route)}#anfrage)\n\n${contactEmail}`),
 ].join('\n\n'));
}

function renderAboutAgentPage(locale = 'de') {
  const c = aboutContent[locale];
  const canonicalPath = locale === 'de' ? '/de/ueber-uns/' : '/en/about-us/';
  const alternatePath = locale === 'de' ? '/en/about-us/' : '/de/ueber-uns/';
  return normalizeBlankLines([
    pageHeader({ title: `${c.hero.title} ${c.hero.emphasis}`, canonicalPath, description: c.metaDescription, alternatePath }),
    c.hero.intro,
    section(`${c.vision.title} ${c.vision.emphasis}`, `${c.vision.body}\n\n${c.vision.mission}\n\n[${c.vision.link}](${absoluteUrl(c.vision.href)})`),
    section(`${c.journey.title} ${c.journey.emphasis}`, c.journey.paragraphs.join('\n\n')),
    section(`${c.future.title} ${c.future.emphasis}`, `${c.future.body}\n\n${c.future.extra}\n\n[${c.future.link}](${absoluteUrl(c.future.href)})`),
    section(`${c.contact.title} ${c.contact.emphasis}`, `${c.contact.body}\n\n[${c.contact.action}](${calendarUrl})\n\n${contactEmail}`),
  ].join('\n\n'));
}

function renderKnowledgeIndex(locale, posts) {
 const c = knowledgeContent[locale];
 const { featured, website: websitePosts, supplemental: supplementalPosts } = groupKnowledgePosts(posts, post => post);
 const renderPosts = list => list.map(p=>`### [${p.title}](${absoluteUrl(p.canonicalPath)})\n\n${p.date} · ${p.readTime}\n\n${p.excerpt}`).join('\n\n');
 return normalizeBlankLines([
  pageHeader({title:`${c.headline} ${c.emphasis}`, canonicalPath:`/${locale}/blog/`, description:c.intro, alternatePath:`/${locale==='de'?'en':'de'}/blog/`}),
  `${c.headline} ${c.emphasis}`, c.intro,
  ...(featured ? [section(c.latest, renderPosts([featured]))] : []),
  section(`${c.articlesTitle} ${c.articlesEmphasis}`, `${c.articlesIntro}\n\n${renderPosts(websitePosts)}`),
  section(`${c.supplementaryTitle} ${c.supplementaryEmphasis}`, `${c.supplementaryIntro}\n\n${renderPosts(supplementalPosts)}`),
  section(`${c.contact.title} ${c.contact.emphasis}`, `${c.contact.body}\n\n${contactEmail}\n\n${calendarUrl}`),
 ].join('\n\n'));
}

function renderBlogAgentPage(post) {
	return normalizeBlankLines(`${pageHeader({
		title: post.title,
		canonicalPath: post.canonicalPath,
		description: post.excerpt,
		alternatePath: post.alternateLocaleHref,
	})}${post.lang === 'en' ? 'Topic' : 'Thema'}: ${post.kicker}
${post.lang === 'en' ? 'Published' : 'Datum'}: ${post.date}
${post.lastModified ? `${post.lang === 'en' ? 'Updated' : 'Aktualisiert'}: ${post.lastModified}\n` : ''}${post.lang === 'en' ? 'Author' : 'Autor'}: ${post.author}${post.authorRole ? ` — ${post.authorRole}` : ''}
${post.lang === 'en' ? 'Reading time' : 'Lesezeit'}: ${post.readTime}

${post.body}`);
}



function renderServicePage(locale, kind) {
  const c = serviceContent[locale][kind];
  const path = servicePaths[locale][kind];
  const parts = [pageHeader({ title: `${c.headline} ${c.emphasis}`, canonicalPath: path, description: c.description, alternatePath: servicePaths[locale === 'de' ? 'en' : 'de'][kind] }), c.intro];
  if (kind === 'overview') {
    parts[0]=pageHeader({title:locale==='de'?'Wo steht Ihr Auftritt? Hier geht es weiter.':'Where is your business online? Find your next step.',canonicalPath:path,description:c.description});
    parts[1]=locale==='de'?'Sie möchten neu starten, Ihren bestehenden Auftritt verbessern oder die laufende Arbeit abgeben? Finden Sie den passenden Einstieg für Ihren Betrieb.':'Would you like to start fresh, improve an existing website or hand over its upkeep? Find the right starting point for your business.';
    overviewSituations[locale].forEach((item,i)=>parts.push(section(item.title,`${item.body}\n\n[${item.link}](${absoluteUrl(c.items[i].href)})`)));
    for(const item of c.items.slice(3)) parts.push(section(item.title,`${item.body}\n\n[${item.link}](${absoluteUrl(item.href)})`));
    parts.push(section(c.additional.title,`[${c.additional.link}](${absoluteUrl(c.additional.href)})`));
  } else {
    const story = websiteCreationContent[locale];
    parts[0] = pageHeader({ title: `${story.headline} ${story.emphasis}`, canonicalPath: path, description: c.description, alternatePath: servicePaths[locale === 'de' ? 'en' : 'de'][kind] });
    parts[1] = story.intro;
    parts.push(section(story.exampleTitle, `${story.exampleBody}\n\n[${story.exampleLink}](https://www.hms-loistl.de/)`));
    parts.push(section(`${story.processTitle} ${story.processEmphasis}`, story.steps.map(item => `### ${item.title}\n\n${item.body}\n\n${story.yourPart}: ${item.contribution}\n\n${story.result}: ${item.result}\n\n${item.detail}`).join('\n\n')));
    parts.push(section(`${story.investmentTitle} ${story.investmentEmphasis}`, `${story.price} — ${story.priceNote}\n\n${story.investmentBody}`));
    parts.push(section(locale === 'de' ? 'Häufige Fragen' : 'Common questions', c.faq.items.map(item => `### ${item.question}\n\n${item.answer}`).join('\n\n')));
    parts.push(section(`${story.contact.title} ${story.contact.emphasis}`, `${story.contact.body}\n\n[${story.primary}](${calendarUrl})`));
  }
  parts.push(section(locale === 'de' ? 'Kontakt' : 'Contact', `[${locale === 'de' ? 'Vorhaben besprechen' : 'Discuss your project'}](${calendarUrl})\n\n${contactEmail}`));
  return normalizeBlankLines(parts.join('\n\n'));
}

function renderServiceDetail(locale, key) {
  const t = serviceDetails[locale][key];
  const route = detailPaths[locale][key];
  const parts = [pageHeader({title: t.title.join(' '), canonicalPath:route, description:t.description, alternatePath:detailPaths[locale === 'de' ? 'en' : 'de'][key]}), `${t.title.join(' ')}\n\n${t.intro}`];
  const pairs = items => items.map(([title, body]) => `### ${title}\n\n${body}`).join('\n\n');
  const narrative = serviceNarratives[locale][key];
  parts.push(section(`${narrative.title} ${narrative.emphasis}`, `${narrative.label}\n\n${narrative.body}\n\n${pairs(narrative.notes)}`));
  parts.push(section(t.scopeTitle.join(' '), `${t.scopeIntro}\n\n${pairs(t.scope)}\n\n${t.boundary}${t.boundaryLink ? ` ${t.boundaryLink.before}[${t.boundaryLink.label}](${absoluteUrl(t.boundaryLink.href)})${t.boundaryLink.after}` : ''}`));
  parts.push(section(locale === 'de' ? 'Zusammenarbeit' : 'Working together', `${pairs(t.process)}\n\n${t.contribution}`));
  const related = key === 'ai' ? [
    [locale === 'de' ? 'KI-Potenzialanalyse' : 'AI potential analysis', potentialPaths[locale]],
    [locale === 'de' ? 'Alle Leistungen' : 'All services', servicePaths[locale].overview],
  ] : t.related.map(k => [serviceDetails[locale][k].name, detailPaths[locale][k]]);
  parts.push(section(locale === 'de' ? 'Passende nächste Schritte' : 'Related services', related.map(([name, path]) => `[${name}](${absoluteUrl(path)})`).join('\n\n')));
  parts.push(section(locale === 'de' ? 'Häufige Fragen' : 'Common questions', pairs(t.faq)));
  parts.push(section(locale === 'de' ? 'Kontakt' : 'Contact', `${t.contact}\n\n[${locale === 'de' ? 'Vorhaben besprechen' : 'Discuss your project'}](${calendarUrl})\n\n${contactEmail}`));
  return normalizeBlankLines(parts.join('\n\n'));
}

function renderLlmsTxt(blogPosts) {
	const blogLinks = blogPosts
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map((post) => `- [${post.title}](${absoluteUrl(post.agentPath)}) — ${post.excerpt}`)
		.join('\n');

	return normalizeBlankLines(`# Vibeperform

VibePerform erstellt und betreut Websites und Unternehmensprofile für Handwerksbetriebe und kleine Unternehmen. SEO, Texte und Grafiken unterstützen die laufende Weiterentwicklung; KI-Beratung ergänzt das Angebot. Die kanonische agentenlesbare Sprache ist Deutsch. Englische Webseiten bleiben als Alternativen verlinkt.

## Wichtige Agentenressourcen

- [Vollständiger Agenten-Kontext](${absoluteUrl('/llms-full.txt')}) — Ein Markdown-Bundle der wichtigsten deutschen Inhalte.
- [Startseite](${absoluteUrl('/agent/index.md')}) — Websites, Unternehmensprofile, Weiterentwicklung und Kontakt.
- [Alle Leistungen](${absoluteUrl('/de/leistungen/index.md')}) — Websites, Betreuung, SEO, Unternehmensprofile, Texte und Grafiken.
${serviceKeys.map(key => `- [${serviceDetails.de[key].name}](${absoluteUrl(detailPaths.de[key] + 'index.md')}) — ${serviceDetails.de[key].description}`).join('\n')}
- [Website erstellen lassen](${absoluteUrl('/de/website-erstellen-lassen/index.md')}) — Erstellung, Ablauf und laufende Weiterentwicklung.
- [Websites für Handwerksbetriebe](${absoluteUrl('/de/websites-fuer-handwerksbetriebe/index.md')}) — Website und Kontaktanfragen für Handwerksbetriebe.
- [KI-Potenzialanalyse](${absoluteUrl(`${potentialPaths.de}index.md`)}) — Strukturierte Analyse passender KI-Anwendungsfälle.
- [Workshops](${absoluteUrl('/agent/workshops.md')}) — Workshop-Formate, Ergebnisse und Anschlussfähigkeit.
- [Strategischer Explore Workshop](${absoluteUrl('/agent/explore-workshop.md')}) — Phase-1-Angebot, Roadmap-Ergebnis und Priorisierung.
- [Über Vibeperform](${absoluteUrl('/agent/about.md')}) — Marlon Dietrich, Vision, Werdegang und Kontakt.

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
        ...['overview', 'website'].map(kind => renderServicePage('de', kind)),
        ...serviceKeys.map(key => renderServiceDetail('de', key)),
		renderTradePage('de'),
		renderPotentialAnalysis('de'),
		...blogPosts.map(renderBlogAgentPage),
	];

	return normalizeBlankLines(chunks.join('\n\n---\n\n'));
}

function renderRobotsTxt() {
	return `# Search and answer-engine crawlers may access the public site.
User-agent: OAI-SearchBot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Googlebot
Allow: /

# Google-Extended controls Gemini grounding and model use, not Google Search indexing.
User-agent: Google-Extended
Allow: /

User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}

# Agent-readable content:
# LLM-Content: ${absoluteUrl('/llms.txt')}
# LLM-Full-Content: ${absoluteUrl('/llms-full.txt')}
`;
}

function renderSitemapXml(blogPosts) {
	const staticUrls = [
        ...Object.values(servicePaths).flatMap(paths => Object.values(paths)),
        ...Object.values(detailPaths).flatMap(paths => Object.values(paths)),
		'/de/',
		'/en/',
		'/de/workshops/',
		'/en/workshops/',
		'/de/workshop/explore-workshop/',
		'/en/workshop/explore-workshop/',
		'/de/ki-strategie/',
		'/en/ai-strategy/',
		...Object.values(potentialPaths),
		'/de/websites-fuer-handwerksbetriebe/',
		'/en/websites-for-trade-businesses/',
		'/de/ueber-uns/',
		'/en/about-us/',
		'/de/impressum/',
		'/en/legal-notice/',
		'/de/datenschutz/',
		'/en/privacy/',
		'/de/blog/',
		'/en/blog/',
	];
	const urls = [
		...staticUrls.map((pathname) => ({ pathname })),
		...blogPosts.flatMap((post) => {
			const lastmod = post.lastModified || post.date;
			return [
				{ pathname: post.canonicalPath, lastmod },
				...(post.alternateLocaleHref ? [{ pathname: post.alternateLocaleHref, lastmod }] : []),
			];
		}),
	];
	const uniqueUrls = [...new Map(urls.map((entry) => [entry.pathname, entry])).values()];

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls
	.map(
		({ pathname, lastmod }) => `	<url>
		<loc>${absoluteUrl(pathname)}</loc>${lastmod ? `
		<lastmod>${lastmod}</lastmod>` : ''}
	</url>`,
	)
	.join('\n')}
</urlset>
`;
}

async function writeFile(relativePath, content) {
	const targetPath = path.join(publicDir, relativePath);
	await fs.mkdir(path.dirname(targetPath), { recursive: true });
	await fs.writeFile(targetPath, content, 'utf8');
}

await fs.mkdir(agentBlogDir, { recursive: true });

const blogPosts = (await readBlogPosts()).filter(post => post.draft !== 'true');
const englishBlogPosts = await readBlogPosts('en');
const pages = [
	{ relativePath: 'agent/index.md', content: renderHomeAgentPage() },
	{ relativePath: 'agent/workshops.md', content: renderWorkshopsAgentPage() },
	{ relativePath: 'agent/explore-workshop.md', content: renderExploreAgentPage() },
	{ relativePath: 'agent/about.md', content: renderAboutAgentPage() },
];
const pageByPath = new Map(pages.map((page) => [page.relativePath, page.content]));
const negotiatedPages = [
 {relativePath:'de/blog/index.md',content:renderKnowledgeIndex('de',blogPosts)},
 {relativePath:'en/blog/index.md',content:renderKnowledgeIndex('en',englishBlogPosts)},
 ...englishBlogPosts.map(post=>({relativePath:`en/blog/${post.slug}/index.md`,content:renderBlogAgentPage(post)})),
 {relativePath:'de/websites-fuer-handwerksbetriebe/index.md',content:renderTradePage('de')},
 {relativePath:'en/websites-for-trade-businesses/index.md',content:renderTradePage('en')},
    ...['de','en'].flatMap(locale => serviceKeys.map(key => ({relativePath:`${detailPaths[locale][key].slice(1)}index.md`,content:renderServiceDetail(locale,key)}))),
    ...['de', 'en'].flatMap(locale => ['overview', 'website'].map(kind => ({ relativePath: `${servicePaths[locale][kind].slice(1)}index.md`, content: renderServicePage(locale, kind) }))),
	...Object.keys(potentialPaths).map(locale => ({ relativePath: `${potentialPaths[locale].slice(1)}index.md`, content: renderPotentialAnalysis(locale) })),
	{ relativePath: 'index.md', content: pageByPath.get('agent/index.md') },
	{ relativePath: 'de/index.md', content: pageByPath.get('agent/index.md') },
	{ relativePath: 'en/workshops/index.md', content: renderWorkshopsAgentPage('en') },
	{ relativePath: 'en/workshop/explore-workshop/index.md', content: renderExploreAgentPage('en') },
	{ relativePath: 'de/workshops/index.md', content: pageByPath.get('agent/workshops.md') },
	{ relativePath: 'de/workshop/explore-workshop/index.md', content: pageByPath.get('agent/explore-workshop.md') },
	{ relativePath: 'de/ueber-uns/index.md', content: pageByPath.get('agent/about.md') },
	{ relativePath: 'en/about-us/index.md', content: renderAboutAgentPage('en') },
];

await Promise.all([
	...pages.map((page) => writeFile(page.relativePath, page.content)),
	...negotiatedPages.map((page) => writeFile(page.relativePath, page.content)),
	...blogPosts.map((post) => writeFile(`agent/blog/${post.slug}.md`, renderBlogAgentPage(post))),
	...blogPosts.map((post) => writeFile(`de/blog/${post.slug}/index.md`, renderBlogAgentPage(post))),
	writeFile('llms.txt', renderLlmsTxt(blogPosts)),
	writeFile('llms-full.txt', renderLlmsFull(pages, blogPosts)),
	writeFile('robots.txt', renderRobotsTxt()),
	writeFile('sitemap.xml', renderSitemapXml(blogPosts)),
]);

console.log(`Generated ${pages.length + negotiatedPages.length + blogPosts.length * 2} agent Markdown files, llms.txt, llms-full.txt, robots.txt, and sitemap.xml.`);
