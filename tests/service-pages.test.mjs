import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const load = pathname => readFile(path.join(dist, pathname.replace(/^\//, ''), 'index.html'), 'utf8');
const pages = [
  { route: '/de/websites-fuer-handwerksbetriebe/', alternate: '/en/websites-for-trade-businesses/', locale: 'de', type: 'Service' },
  { route: '/en/websites-for-trade-businesses/', alternate: '/de/websites-fuer-handwerksbetriebe/', locale: 'en', type: 'Service' },
  { route: '/de/leistungen/', alternate: '/en/services/', locale: 'de', type: 'CollectionPage' },
  { route: '/en/services/', alternate: '/de/leistungen/', locale: 'en', type: 'CollectionPage' },
  { route: '/de/website-erstellen-lassen/', alternate: '/en/website-design/', locale: 'de', type: 'Service' },
  { route: '/en/website-design/', alternate: '/de/website-erstellen-lassen/', locale: 'en', type: 'Service' },
];

for (const page of pages) {
  test(`${page.route}: discoverable service content with valid navigation and contact paths`, async () => {
    const html = await load(page.route);
    assert.match(html, new RegExp(`<html lang="${page.locale}"`));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(html.includes(`rel="canonical" href="https://www.vibeperform.com${page.route}"`));
    assert.ok(html.includes(`href="https://www.vibeperform.com${page.alternate}"`));
    assert.ok(html.includes(`href="${page.alternate}"`), 'language switch stays on the equivalent page');
    const schemas = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.ok(schemas.some(item => item['@type'] === page.type));
    assert.ok(schemas.some(item => item['@type'] === 'BreadcrumbList'));
    assert.ok(schemas.every(item => !item.aggregateRating && !item.offers), 'no fabricated ratings or price offers');
    assert.match(html, /mailto:contact@vibeperform.com/);
    assert.match(html, /calendar.app.google\/utFQgw33PwJTiDk56/);
    assert.match(html, /<details class="home-services-menu"/);
    assert.doesNotMatch(html, /href="(?:#|javascript:[^"]*)"/);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(new Set(ids).size, ids.length, 'unique IDs');
    for (const [, target] of html.matchAll(/href="([^" ]+)"/g)) {
      if (!target.startsWith('/') && !target.startsWith('#')) continue;
      const url = new URL(target, `https://www.vibeperform.com${page.route}`);
      if (!url.pathname.endsWith('/')) continue;
      const destination = url.pathname === page.route ? html : await load(url.pathname);
      if (url.hash) assert.ok(destination.includes(`id="${url.hash.slice(1)}"`), `${target} has an existing anchor`);
    }
    const markdown = await readFile(path.join(dist, page.route.slice(1), 'index.md'), 'utf8');
    assert.ok(markdown.length > 1000);
    assert.ok(markdown.includes(`https://www.vibeperform.com${page.route}`));
    const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
    assert.ok(sitemap.includes(`<loc>https://www.vibeperform.com${page.route}</loc>`));
    assert.doesNotMatch(html, /name="robots" content="noindex/);
    if (page.route.includes('handwerksbetriebe') || page.route.includes('trade-businesses')) assert.match(html, /data-inquiry-endpoint="\/api\/website-inquiries"/);
  });
}

test('website design and trade offer remain distinct pages', async () => {
  const general = await load('/de/website-erstellen-lassen/');
  const trade = await load('/de/websites-fuer-handwerksbetriebe/');
  assert.match(general, /Gestaltungsbeispiel/);
  assert.match(general, /href="\/de\/websites-fuer-handwerksbetriebe\/"/);
  assert.doesNotMatch(trade, /name="robots" content="noindex/);
  assert.equal((general.match(/<main[\s\S]*<\/main>/)[0].match(/<details\b/g) || []).length, 5);
});
