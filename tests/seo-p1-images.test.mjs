import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';
import sharp from 'sharp';

const cases = [
  { stem: 'ki-agenten-geschaeftsnutzen-roi', routes: ['de/blog/ki-agenten-geschaeftsnutzen-roi', 'en/blog/ai-agents-business-roi'], width: 1774, height: 887, widths: [480, 800, 1200, 1600] },
  { stem: 'ai-reasoning-advantage', routes: ['de/blog/ki-denkfaehigkeit-wettbewerbsvorteil', 'en/blog/ai-reasoning-competitive-advantage'], width: 1024, height: 1024, widths: [480, 800, 1024] },
  { stem: 'ki-erfolg-muenchner-mittelstand-4-phasen', routes: ['de/blog/ki-erfolg-muenchner-mittelstand-4-phasen', 'en/blog/ai-success-munich-smes-4-phase-guide'], width: 1774, height: 887, widths: [480, 800, 1200, 1600] },
];
const load = route => readFile(new URL(`../dist/${route}/index.html`, import.meta.url), 'utf8');
const pictureFor = (html, stem) => [...html.matchAll(/<picture\b[^>]*>([\s\S]*?)<\/picture>/g)].map(match => match[1]).find(picture => picture.includes(`/blog/${stem}-480.avif`));

for (const entry of cases) {
  test(`${entry.stem} preserves the original ratio and provides substantially smaller real image variants`, async () => {
    const originalBytes = (await stat(new URL(`../public/blog/${entry.stem}.png`, import.meta.url))).size;
    for (const width of entry.widths) {
      for (const format of ['avif', 'webp']) {
        const file = new URL(`../public/blog/${entry.stem}-${width}.${format}`, import.meta.url);
        const metadata = await sharp(await readFile(file)).metadata();
        assert.equal(metadata.width, width);
        assert.ok(Math.abs(metadata.height / width - entry.height / entry.width) < 0.002);
        assert.ok((await stat(file)).size < originalBytes * 0.2, `${width} ${format} should save at least 80%`);
      }
    }
  });
  for (const route of entry.routes) {
    test(`${route} exposes responsive modern formats, true dimensions and one priority cover`, async () => {
      const html = await load(route);
      const picture = pictureFor(html, entry.stem);
      assert.ok(picture, 'the article has its responsive cover');
      for (const format of ['avif', 'webp']) {
        const source = [...picture.matchAll(/<source\b[^>]+>/g)].map(match => match[0]).find(source => source.includes(`type="image/${format}"`));
        assert.ok(source, `${format} source exists`);
        assert.match(source, /sizes="[^\"]+"/);
        for (const width of entry.widths) assert.ok(source.includes(`${entry.stem}-${width}.${format} ${width}w`));
      }
      assert.match(picture, new RegExp(`width="${entry.width}" height="${entry.height}"`));
      assert.match(picture, /loading="eager" fetchpriority="high"/);
      assert.equal((html.match(/fetchpriority="high"/g) || []).length, 1);
      assert.ok(html.includes(`property="og:image" content="https://www.vibeperform.com/blog/${entry.stem}.png"`), 'social metadata keeps its original image');
      assert.ok(html.includes(`src="/blog/${entry.stem}.png"`), 'unsupported formats retain a working fallback');
    });
  }
}
for (const locale of ['de', 'en']) {
  test(`${locale} knowledge listing uses lazy responsive cover images`, async () => {
    const html = await load(`${locale}/blog`);
    for (const { stem } of cases) {
      const picture = pictureFor(html, stem);
      assert.ok(picture, `${stem} remains discoverable with an efficient cover`);
      assert.match(picture, /type="image\/avif"/);
      assert.match(picture, /type="image\/webp"/);
      assert.match(picture, /sizes="[^\"]+"/);
      assert.match(picture, /loading="lazy"/);
      assert.doesNotMatch(picture, /fetchpriority="high"/);
    }
  });
}
