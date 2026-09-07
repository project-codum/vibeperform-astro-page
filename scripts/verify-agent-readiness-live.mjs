import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { REDIRECTS } from '../worker/accept-markdown.js';

const baseUrl = new URL(process.argv[2] ?? 'https://www.vibeperform.com');
const dist = new URL('../dist/', import.meta.url);
const results = [];

const assert = (condition, message) => {
	if (!condition) throw new Error(message);
};

const fetchPage = async (pathname, accept) => {
	const response = await fetch(new URL(pathname, baseUrl), {
		headers: accept ? { Accept: accept } : {},
	});
	const body = await response.text();
	return { response, body };
};

const visibleText = (html) =>
	html
		.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
		.replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

for (const pathname of ['/', '/de/', '/de/ki-potenzialanalyse/', '/en/ai-potential-analysis/']) {
	const { response, body } = await fetchPage(pathname, 'text/html');
	const text = visibleText(body);
	assert(response.status === 200, `${pathname} returned ${response.status}`);
	assert(response.headers.get('content-type')?.includes('text/html'), `${pathname} did not return HTML`);
	assert(/<h1\b/i.test(body), `${pathname} has no H1`);
	assert(text.length >= 500, `${pathname} has only ${text.length} visible text characters`);
	assert(!/http-equiv=["']refresh/i.test(body), `${pathname} contains a meta refresh`);
	assert(body.includes('application/ld+json'), `${pathname} has no JSON-LD`);
	for (const match of body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
	results.push({
		pathname,
		status: response.status,
		contentType: response.headers.get('content-type'),
		vary: response.headers.get('vary'),
		visibleCharacters: text.length,
		bytes: Buffer.byteLength(body),
	});
}

const markdown = await fetchPage('/de/', 'text/markdown');
assert(markdown.response.status === 200, `Markdown returned ${markdown.response.status}`);
assert(markdown.response.headers.get('content-type')?.startsWith('text/markdown'), 'Markdown has the wrong content type');
assert(markdown.response.headers.get('vary')?.toLowerCase().split(',').map(s => s.trim()).includes('accept'), 'Markdown response is missing Vary: Accept');
assert(markdown.body.startsWith('# Vibeperform'), 'Markdown body does not start with the expected heading');
results.push({
	pathname: '/de/ [markdown]',
	status: markdown.response.status,
	contentType: markdown.response.headers.get('content-type'),
	vary: markdown.response.headers.get('vary'),
	bytes: Buffer.byteLength(markdown.body),
});

const html = await fetchPage('/de/', 'text/html');
assert(html.response.headers.get('link')?.includes('text/markdown'), 'HTML response has no Markdown alternate Link');
results.push({
	pathname: '/de/ [html]',
	status: html.response.status,
	link: html.response.headers.get('link'),
	vary: html.response.headers.get('vary'),
});

const weighted = await fetchPage('/de/', 'text/markdown;q=0.2, text/html;q=0.9');
assert(weighted.response.headers.get('content-type')?.includes('text/html'), 'q-value negotiation did not prefer HTML');
results.push({
	pathname: '/de/ [q-values]',
	status: weighted.response.status,
	contentType: weighted.response.headers.get('content-type'),
});

const unsupported = await fetchPage('/de/', 'application/pdf');
assert(unsupported.response.status === 406, `Unsupported representation returned ${unsupported.response.status}`);
results.push({
	pathname: '/de/ [unsupported]',
	status: unsupported.response.status,
	vary: unsupported.response.headers.get('vary'),
});

const missing = await fetchPage('/missing-agent-path-20260826', 'text/html');
assert(missing.response.status === 404, `Missing path returned ${missing.response.status}`);
assert(missing.body.includes('/llms.txt') && missing.body.includes('/sitemap.xml'), '404 body has no recovery links');
results.push({
	pathname: '/missing-agent-path-20260826',
	status: missing.response.status,
	contentType: missing.response.headers.get('content-type'),
	bytes: Buffer.byteLength(missing.body),
});

const missingMarkdown = await fetchPage('/missing-agent-path-20260826', 'text/markdown');
assert(missingMarkdown.response.status === 404, 'Missing Markdown URL must return 404');
assert(missingMarkdown.response.headers.get('content-type')?.startsWith('text/markdown'), '404 must negotiate Markdown');
assert(missingMarkdown.body.includes('[Sitemap](/sitemap.xml)'), 'Markdown 404 lacks recovery links');

for (const [from, to] of Object.entries(REDIRECTS)) {
	const response = await fetch(new URL(`${from}?utm_source=verification`, baseUrl), { redirect: 'manual' });
	assert(response.status === 301, `${from} must return HTTP 301`);
	assert(response.headers.get('location') === new URL(`${to}?utm_source=verification`, baseUrl).href, `${from} redirect lost its destination or query`);
	await response.arrayBuffer();
}

for (const locale of ['de', 'en']) {
	const response = await fetch(new URL(`/${locale}?utm_source=verification`, baseUrl), { redirect: 'manual' });
	assert(response.status === 301, `/${locale} must permanently redirect to its canonical URL`);
	assert(response.headers.get('location') === new URL(`/${locale}/?utm_source=verification`, baseUrl).href, 'Locale redirect lost path or query');
	await response.arrayBuffer();
}

if (['vibeperform.com', 'www.vibeperform.com'].includes(baseUrl.hostname)) {
	const insecure = new URL('/de?utm_source=verification', baseUrl);
	insecure.protocol = 'http:';
	const response = await fetch(insecure, { redirect: 'manual' });
	assert(response.status === 301, 'Production HTTP must redirect to HTTPS');
	assert(response.headers.get('location') === `https://${baseUrl.host}/de/?utm_source=verification`, 'HTTPS redirect lost path or query');
	await response.arrayBuffer();
}

for (const pathname of ['/robots.txt', '/llms.txt', '/llms-full.txt', '/sitemap.xml', '/favicon.png']) {
	const response = await fetch(new URL(pathname, baseUrl));
	assert(response.status === 200, `${pathname} returned ${response.status}`);
	await response.arrayBuffer();
	results.push({
		pathname,
		status: response.status,
		contentType: response.headers.get('content-type'),
	});
}

const sitemap = await (await fetch(new URL('/sitemap.xml', baseUrl))).text();
const sitemapPaths = [...sitemap.matchAll(/<loc>https:\/\/www\.vibeperform\.com([^<]+)<\/loc>/g)].map((match) => match[1]);
assert(sitemap === await readFile(new URL('sitemap.xml', dist), 'utf8'), 'Deployed sitemap differs from this build');
const sitemapChecks = await Promise.all(
	sitemapPaths.map(async (pathname) => {
		const response = await fetch(new URL(pathname, baseUrl), { headers: { Accept: 'text/html' } });
		await response.arrayBuffer();
		return { pathname, status: response.status };
	}),
);
const failedSitemapUrls = sitemapChecks.filter(({ status }) => status !== 200);
assert(failedSitemapUrls.length === 0, `sitemap failures: ${JSON.stringify(failedSitemapUrls)}`);
results.push({ sitemapEndpoints: `${sitemapChecks.length}/${sitemapChecks.length}`, status: 200 });

// Inspect every built public endpoint, including URLs excluded from the sitemap.
const files = await readdir(dist, { recursive: true, withFileTypes: true });
const publicFiles = files.filter(entry => entry.isFile());
let publicFilesChecked = 0;
for (const entry of publicFiles) {
	const relative = path.relative(fileURLToPath(dist), path.join(entry.parentPath, entry.name));
	if (['_headers', '_redirects', '.assetsignore'].includes(relative)) continue;
	const pathname = `/${relative}`.replace(/index\.html$/, '');
	if (REDIRECTS[pathname.replace(/\/$/, '')]) continue;
	const response = await fetch(new URL(pathname, baseUrl), { headers: { Accept: 'text/html' } });
	assert(response.status === 200, `${pathname}: ${response.status}`);
	publicFilesChecked += 1;
	if (/\.(md|txt|xml|json)$/.test(relative)) {
		assert(await response.text() === await readFile(new URL(relative, dist), 'utf8'), `${pathname} content differs from build`);
	} else {
		// Drain downloads so Node can release connections and the verification job can exit.
		await response.arrayBuffer();
	}
	if (relative.endsWith('/index.md') || relative === 'index.md') {
		const page = `/${relative}`.replace(/index\.md$/, '');
		if (page.startsWith('/agent/')) continue;
		const negotiated = await fetchPage(page, 'text/markdown');
		assert(negotiated.response.status === 200, `${page} Markdown negotiation failed`);
		assert(negotiated.response.headers.get('content-type')?.startsWith('text/markdown'), `${page} wrong Markdown type`);
		assert(negotiated.body === await readFile(new URL(relative, dist), 'utf8'), `${page} negotiated wrong content`);
	}
}
results.push({ publicFilesChecked, legacyRedirects: Object.keys(REDIRECTS).length, markdown404: 404 });

console.log(JSON.stringify({ baseUrl: baseUrl.toString(), results }, null, 2));
