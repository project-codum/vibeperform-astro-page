import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import { createJiti } from 'jiti';

const { groupKnowledgePosts } = await createJiti(import.meta.url).import('../src/data/knowledgeContent.ts');

test('the newest article leads every category and guide priority', () => {
  const posts = [
    { date: '2026-09-20', category: 'website', guideOrder: 1 },
    { date: '2026-10-11', category: 'website', guideOrder: 4 },
    { date: '2026-10-12', category: 'ai' },
    { date: '2026-09-30', category: 'website', guideOrder: 2 },
  ];
  const original = [...posts];
  const result = groupKnowledgePosts(posts, p => p);
  assert.equal(result.featured, posts[2]);
  assert.deepEqual(result.website.map(p => p.date), ['2026-10-11', '2026-09-30', '2026-09-20']);
  assert.deepEqual(posts, original);
});

test('the newest source article leads HTML and Markdown in both languages', async () => {
  for (const locale of ['de', 'en']) {
    const directory = new URL(`../src/pages/${locale}/blog/`, import.meta.url);
    const files = (await readdir(directory)).filter(file => file.endsWith('.md')).sort();
    const posts = await Promise.all(files.map(async file => {
      const source = await readFile(new URL(file, directory), 'utf8');
      return { slug: file.slice(0, -3), date: source.match(/^date: ["']?(\d{4}-\d{2}-\d{2})/m)?.[1] };
    }));
    assert.ok(posts.every(post => post.date), 'every article has a publication date');
    const newest = posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))[0];
    const route = `/${locale}/blog/${newest.slug}/`;
    const html = await readFile(new URL(`../dist/${locale}/blog/index.html`, import.meta.url), 'utf8');
    const featured = html.match(/<article class="kn-featured[^>]*>([\s\S]*?)<\/article>/)?.[1];
    assert.ok(featured?.includes(`href="${route}"`));
    const md = await readFile(new URL(`../dist/${locale}/blog/index.md`, import.meta.url), 'utf8');
    assert.ok(md.match(/^### .*$/m)?.[0].includes(route));
  }
});

test('the new post omits its image badge while other disclosures remain visible', async () => {
  const index = await readFile(new URL('../dist/de/blog/index.html', import.meta.url), 'utf8');
  const card = [...index.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)].find(match => match[1].includes('/de/blog/beste-loesung-neue-webseite/'))?.[1];
  assert.ok(card);
  assert.doesNotMatch(card, /<span class="ai-image-frame__badge"/);
  const article = await readFile(new URL('../dist/de/blog/beste-loesung-neue-webseite/index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(article, /<span class="ai-image-frame__badge"|Redaktionelles KI-Motiv:/);
  const other = await readFile(new URL('../dist/de/blog/ki-agenten-geschaeftsnutzen-roi/index.html', import.meta.url), 'utf8');
  assert.match(other, /<span class="ai-image-frame__badge"/);
});
