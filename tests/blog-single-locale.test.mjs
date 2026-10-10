import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const load = route => readFile(new URL(`../dist/${route}/index.html`, import.meta.url), 'utf8');

test('a German article without a translation has only truthful language metadata', async () => {
	const html = await load('de/blog/beste-loesung-neue-webseite');
	assert.match(html, /<html lang="de"/);
	assert.match(html, /rel="canonical" href="https:\/\/www\.vibeperform\.com\/de\/blog\/beste-loesung-neue-webseite\/"/);
	assert.match(html, /rel="alternate" hreflang="de" href="https:\/\/www\.vibeperform\.com\/de\/blog\/beste-loesung-neue-webseite\/"/);
	assert.match(html, /rel="alternate" hreflang="x-default" href="https:\/\/www\.vibeperform\.com\/de\/blog\/beste-loesung-neue-webseite\/"/);
	assert.doesNotMatch(html, /hreflang="en"/);
	assert.doesNotMatch(html, /property="og:locale:alternate"/);
	assert.match(html, /class="home-language" href="\/en\/blog\/"/);
});

test('an existing bilingual article keeps both language alternates', async () => {
	const html = await load('de/blog/handwerker-website-inhalte-checkliste');
	assert.match(html, /rel="alternate" hreflang="de" href="https:\/\/www\.vibeperform\.com\/de\/blog\/handwerker-website-inhalte-checkliste\/"/);
	assert.match(html, /rel="alternate" hreflang="en" href="https:\/\/www\.vibeperform\.com\/en\/blog\/trade-business-website-content-checklist\/"/);
	assert.match(html, /rel="alternate" hreflang="x-default" href="https:\/\/www\.vibeperform\.com\/de\/blog\/handwerker-website-inhalte-checkliste\/"/);
	assert.match(html, /property="og:locale:alternate" content="en_US"/);
	assert.match(html, /class="home-language" href="\/en\/blog\/trade-business-website-content-checklist\/"/);
});
