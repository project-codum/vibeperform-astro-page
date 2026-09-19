import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const load = route => readFile(path.join(dist, route, 'index.html'), 'utf8');
for (const [locale, route, alternate, role] of [
  ['de', 'de/ueber-uns', 'en/about-us', 'Geschäftsführer'],
  ['en', 'en/about-us', 'de/ueber-uns', 'Managing Director'],
]) {
  test(`${locale}: agency identity, metadata and machine-readable version agree`, async () => {
    const html = await load(route);
    const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
    const md = await readFile(path.join(dist, route, 'index.md'), 'utf8');
    assert.equal((main.match(/<h1\b/g) || []).length, 1);
    assert.doesNotMatch(main, /ag-collaboration|ag-expectations/);
    for (const source of [main, md]) {
      assert.ok(source.includes('Marlon Dietrich'));
      assert.ok(source.includes(role));
      assert.doesNotMatch(source, /Isabella|certified RAG|zertifizierter RAG|CAPTRON|dcarbonize/);
    }
    assert.ok(html.includes(`rel="canonical" href="https://www.vibeperform.com/${route}/"`));
    assert.ok(html.includes(`href="/${alternate}/"`));
    assert.ok(html.includes(`type="text/markdown" href="https://www.vibeperform.com/${route}/index.md"`));
    assert.ok(md.includes(`${locale === 'en' ? 'German' : 'English'} alternate:`));
    const schemas = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const about = schemas.find(s => s['@type'] === 'AboutPage');
    assert.equal(about.mainEntity['@type'], 'Person');
    assert.equal(about.mainEntity.name, 'Marlon Dietrich');
    const portrait = main.match(/<img[^>]+alt="Marlon Dietrich"[^>]*>/)[0];
    assert.ok(portrait.includes('fetchpriority="high"'));
    assert.ok(portrait.includes('srcset='));
    const imageUrl = portrait.match(/ src="([^"]+)"/)[1];
    await access(path.join(dist, imageUrl));
    for (const [, href] of html.matchAll(/href="([^" ]+)"/g)) {
      if (!href.startsWith('/') && !href.startsWith('#')) continue;
      const url = new URL(href, `https://www.vibeperform.com/${route}/`);
      if (!url.pathname.endsWith('/')) continue;
      const dest = await load(url.pathname);
      if (url.hash) assert.ok(dest.includes(`id="${url.hash.slice(1)}"`), href);
    }
    assert.ok(main.includes('mailto:contact@vibeperform.com'));
    assert.ok(main.includes('https://calendar.app.google/utFQgw33PwJTiDk56'));
  });
}
