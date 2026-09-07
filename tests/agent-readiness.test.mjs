import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { handleRequest, markdownPath, preferredType, REDIRECTS } from '../worker/accept-markdown.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const load = (relativePath) => readFile(path.join(dist, relativePath), 'utf8');
const textContent = (html) =>
	html
		.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
		.replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/&[a-zA-Z0-9#]+;/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

function contentType(pathname) {
	if (pathname.endsWith('.md')) return 'text/markdown; charset=utf-8';
	if (pathname.endsWith('.xml')) return 'application/xml; charset=utf-8';
	return 'text/html; charset=utf-8';
}

function assetPath(pathname) {
	if (pathname === '/') return 'index.html';
	if (pathname.endsWith('/')) return `${pathname.slice(1)}index.html`;
	if (path.extname(pathname)) return pathname.slice(1);
	return `${pathname.slice(1)}/index.html`;
}

function mockAssets() {
	return {
		async fetch(request) {
			const url = new URL(request.url);
			let relativePath = assetPath(url.pathname);
			let status = 200;
			let body;

			try {
				body = await load(relativePath);
			} catch {
				relativePath = '404.html';
				body = await load(relativePath);
				status = 404;
			}

			return new Response(request.method === 'HEAD' ? null : body, {
				status,
				headers: {
					'Content-Type': contentType(relativePath),
					Vary: 'Accept-Encoding',
				},
			});
		},
	};
}

test('root and German homepage contain substantial no-JavaScript content', async () => {
	for (const relativePath of ['index.html', 'de/index.html']) {
		const html = await load(relativePath);
		assert.match(html, /<h1\b[^>]*>/i);
		assert.ok(textContent(html).length >= 500, `${relativePath} has at least 500 text characters`);
		assert.doesNotMatch(html, /http-equiv=["']refresh["']/i);
		assert.doesNotMatch(html, /window\.location\.replace|window\.location\.href\s*=/i);
		assert.match(html, /<link rel="canonical" href="https:\/\/www\.vibeperform\.com\/de\/">/);
	}
});

test('homepage exposes valid Organization and WebSite JSON-LD', async () => {
	const html = await load('de/index.html');
	const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
	assert.ok(match, 'JSON-LD script exists');
	const schemas = JSON.parse(match[1]);
	const organization = schemas.find((schema) => schema['@type'] === 'Organization');
	const website = schemas.find((schema) => schema['@type'] === 'WebSite');
	assert.equal(organization.name, 'Vibeperform');
	assert.match(organization.description, /KI-Beratung/);
	assert.equal(organization.url, 'https://www.vibeperform.com/de/');
	assert.equal(website.url, 'https://www.vibeperform.com/de/');
});

test('custom 404 gives agents machine-readable recovery links', async () => {
	const html = await load('404.html');
	assert.match(html, /<meta name="robots" content="noindex, follow">/);
	for (const target of ['/sitemap.xml', '/llms.txt', '/agent/index.md']) {
		assert.match(html, new RegExp(`href="${target.replace('.', '\\.')}"`));
	}
	assert.match(textContent(html), /404 Not Found/);
});

test('both potential-analysis pages expose matching HTML, Service data, Markdown and contact actions', async () => {
	for (const pathname of ['de/ki-potenzialanalyse/', 'en/ai-potential-analysis/']) {
		const html = await load(`${pathname}index.html`);
		assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
		assert.ok(textContent(html).length > 500);
		assert.match(html, /mailto:contact@vibeperform.com/);
		assert.match(html, /name="robots" content="noindex, nofollow"/);
		assert.ok(!(await load('sitemap.xml')).includes(pathname));
		assert.match(html, /application\/ld\+json/);
		const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
		assert.equal(schema['@type'], 'Service');
		assert.equal(schema.url, `https://www.vibeperform.com/${pathname}`);
		const response = await handleRequest(new Request(`https://www.vibeperform.com/${pathname}`, { headers: { Accept: 'text/markdown' } }), { ASSETS: mockAssets() });
		assert.equal(response.status, 200);
		assert.match(response.headers.get('Content-Type'), /^text\/markdown/);
		const markdown = await response.text();
		assert.ok(markdown.length > 500);
		assert.ok(markdown.includes(schema.url));
		assert.match(markdown, /mailto:contact@vibeperform.com/);
	}
	const headers = await load('_headers');
	assert.match(headers, /\/de\/ki-potenzialanalyse\/\*\s+X-Robots-Tag: noindex, nofollow/);
	assert.match(headers, /\/en\/ai-potential-analysis\/\*\s+X-Robots-Tag: noindex, nofollow/);
});

test('legacy redirects use HTTP 301 and retain campaign queries', async () => {
	for (const [from, to] of Object.entries(REDIRECTS)) {
		for (const suffix of ['', '/']) {
			const response = await handleRequest(new Request(`https://www.vibeperform.com${from}${suffix}?utm_source=test`), { ASSETS: mockAssets() });
			assert.equal(response.status, 301);
			assert.equal(response.headers.get('Location'), `https://www.vibeperform.com${to}?utm_source=test`);
		}
	}
});

test('missing URLs return Markdown recovery with 404 and HEAD has no body', async () => {
	for (const method of ['GET', 'HEAD']) {
		const response = await handleRequest(new Request('https://www.vibeperform.com/no-such-page', { method, headers: { Accept: 'text/markdown' } }), { ASSETS: mockAssets() });
		assert.equal(response.status, 404);
		assert.match(response.headers.get('Content-Type'), /^text\/markdown/);
		assert.equal(response.headers.get('Vary'), 'Accept');
		if (method === 'HEAD') assert.equal(await response.text(), '');
		else assert.match(await response.text(), /\[Sitemap\]\(\/sitemap.xml\)/);
	}
});

test('build emits a substantial Markdown representation beside the homepage', async () => {
	const markdown = await load('de/index.md');
	assert.match(markdown, /^# Vibeperform\n/);
	assert.ok(markdown.length >= 500);
	assert.match(markdown, /Canonical URL: https:\/\/www\.vibeperform\.com\/de\//);
	assert.equal(markdown, await load('index.md'));
});

test('Accept parser respects q-values, specificity, and explicit rejection', () => {
	assert.equal(preferredType('text/markdown, text/html;q=0.5'), 'text/markdown');
	assert.equal(preferredType('text/markdown;q=0.2, text/html;q=0.9'), 'text/html');
	assert.equal(preferredType('text/html;q=0, */*;q=1'), 'text/markdown');
	assert.equal(preferredType('application/pdf'), null);
	assert.equal(markdownPath('/de/'), '/de/index.md');
});

test('edge handler negotiates Markdown and preserves cache variation', async () => {
	const response = await handleRequest(
		new Request('https://www.vibeperform.com/de/', { headers: { Accept: 'text/markdown' } }),
		{ ASSETS: mockAssets() },
	);
	assert.equal(response.status, 200);
	assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
	assert.equal(response.headers.get('Vary'), 'Accept-Encoding, Accept');
	assert.match(await response.text(), /^# Vibeperform/);
});

test('edge handler serves HTML by default and advertises its Markdown alternate', async () => {
	const response = await handleRequest(
		new Request('https://www.vibeperform.com/de/', { headers: { Accept: 'text/html' } }),
		{ ASSETS: mockAssets() },
	);
	assert.equal(response.status, 200);
	assert.match(response.headers.get('Content-Type'), /^text\/html/);
	assert.equal(response.headers.get('Vary'), 'Accept-Encoding, Accept');
	assert.equal(response.headers.get('Link'), '</de/index.md>; rel="alternate"; type="text/markdown"');
});

test('edge handler returns 404 recovery content and 406 for unsupported representations', async () => {
	const assets = mockAssets();
	const missing = await handleRequest(
		new Request('https://www.vibeperform.com/missing-agent-page', { headers: { Accept: 'text/html' } }),
		{ ASSETS: assets },
	);
	assert.equal(missing.status, 404);
	assert.match(await missing.text(), /llms\.txt/);

	const unsupported = await handleRequest(
		new Request('https://www.vibeperform.com/de/', { headers: { Accept: 'application/pdf' } }),
		{ ASSETS: assets },
	);
	assert.equal(unsupported.status, 406);
	assert.equal(unsupported.headers.get('Vary'), 'Accept');
});

test('edge deployment configuration runs negotiation first and serves the custom 404', async () => {
	const config = JSON.parse(await readFile(path.join(root, 'wrangler.jsonc'), 'utf8'));
	assert.equal(config.workers_dev, true);
	assert.deepEqual(
		config.routes.map(({ pattern, zone_name }) => ({ pattern, zone_name })),
		[
			{ pattern: 'vibeperform.com/*', zone_name: 'vibeperform.com' },
			{ pattern: 'www.vibeperform.com/*', zone_name: 'vibeperform.com' },
		],
	);
	assert.equal(config.assets.directory, './dist');
	assert.equal(config.assets.run_worker_first, true);
	assert.equal(config.assets.html_handling, 'auto-trailing-slash');
	assert.equal(config.assets.not_found_handling, '404-page');
});

test('sitemap URLs and machine-readable discovery files exist in the build', async () => {
	const sitemap = await load('sitemap.xml');
	assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
	const urls = [...sitemap.matchAll(/<loc>https:\/\/www\.vibeperform\.com([^<]+)<\/loc>/g)].map((match) => match[1]);
	assert.ok(urls.length >= 20);

	for (const pathname of urls) {
		const relativePath = pathname.endsWith('/') ? `${pathname.slice(1)}index.html` : pathname.slice(1);
		await assert.doesNotReject(access(path.join(dist, relativePath)), `built endpoint exists for ${pathname}`);
	}

	const robots = await load('robots.txt');
	assert.match(robots, /Sitemap: https:\/\/www\.vibeperform\.com\/sitemap\.xml/);
	assert.match(robots, /LLM-Content: https:\/\/www\.vibeperform\.com\/llms\.txt/);
	assert.match(await load('llms.txt'), /^# Vibeperform\n/);
	assert.match(await load('llms-full.txt'), /^# Vibeperform vollständiger Agenten-Kontext\n/);
});
