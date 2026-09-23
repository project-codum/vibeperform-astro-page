import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const load = route => readFile(path.join(dist, route, 'index.html'), 'utf8');
for (const [locale, route, alternate, role] of [
  ['de', 'de/ueber-uns', 'en/about-us', 'Inhaber von VibePerform'],
  ['en', 'en/about-us', 'de/ueber-uns', 'Owner of VibePerform'],
]) {
  test(`${locale}: agency identity, metadata and machine-readable version agree`, async () => {
    const html = await load(route);
    const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
    const md = await readFile(path.join(dist, route, 'index.md'), 'utf8');
    assert.equal((main.match(/<h1\b/g) || []).length, 1);
    assert.doesNotMatch(main, /ag-collaboration|ag-expectations/);
    for (const source of [main, md]) {
      assert.ok(source.includes('Marlon Dietrich'));
      assert.ok(source.toLowerCase().includes(role.toLowerCase()));
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
    assert.equal((main.match(/data-about-slide-in/g) || []).length, 2);
    assert.ok(main.includes(locale === 'de' ? 'Und für KI verständlich.' : 'And understandable to AI.'));
    const removedCopy = locale === 'de'
      ? ['Marlon Dietrich · Inhaber von VibePerform', 'Persönlich verantwortlich. Von der ersten Idee an.', 'Mein Weg zu VibePerform', 'Mit Blick nach vorne', 'Sie sprechen direkt mit mir. Ich freue mich auf Ihr Vorhaben.', 'Lernen wir uns kennen']
      : ['Marlon Dietrich · Owner of VibePerform', 'Personally responsible. From the first idea onwards.', 'My path to VibePerform', 'Looking ahead', 'You’ll speak directly with me. I look forward to hearing about your project.', 'Let’s meet'];
    for (const phrase of removedCopy) {
      assert.ok(!main.includes(phrase), `visible page still includes removed copy: ${phrase}`);
      assert.ok(!md.includes(phrase), `machine-readable page still includes removed copy: ${phrase}`);
    }
  });
}

test('about-page emphasis lines reveal from the right on scroll and respect reduced motion', async () => {
  const component = await readFile(new URL('../src/components/AboutPage.astro', import.meta.url), 'utf8');
  const styles = await readFile(new URL('../src/styles/about-page.css', import.meta.url), 'utf8');
  assert.equal((component.match(/<em data-about-slide-in>/g) || []).length, 2);
  assert.match(component, /rootMargin: '0px 0px -18% 0px', threshold: 0\.2/);
  assert.match(component, /prefers-reduced-motion: reduce/);
  assert.match(styles, /@media\(prefers-reduced-motion:no-preference\)/);
  assert.match(styles, /translateX\(54px\)/);
  assert.match(styles, /@keyframes ag-slide-in-from-right/);
});
