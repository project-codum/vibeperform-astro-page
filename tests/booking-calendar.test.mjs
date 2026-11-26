import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const dist = new URL('../dist/', import.meta.url);

function assertNativeWidget(html, file, locale) {
  const widget = html.match(/<div class="booking-calendar"[\s\S]*?<\/form>/)?.[0];
  assert.ok(widget, file);
  assert.match(widget, /data-auto-open="true"/, file);
  assert.match(widget, /data-booking-slots/, file);
  assert.match(widget, /<form[^>]+action="\/api\/booking\/reservations"[^>]+method="post"/, file);
  assert.match(widget, /data-booking-details hidden/, file);
  assert.match(widget, /data-booking-email-field hidden/, file);
  assert.match(widget, /data-booking-submit disabled hidden/, file);
  assert.ok(widget.includes(locale === 'de' ? 'Wann passt es?' : 'What time works for you?'), file);
  assert.match(widget, /name="name"[^>]+autocomplete="name"/, file);
  assert.match(widget, /name="email"[^>]+autocomplete="email"/, file);
  assert.match(widget, /data-booking-fallback href="mailto:contact@vibeperform\.com"/, file);
  assert.doesNotMatch(widget, /<iframe\b|calendar\.google\.com|Wir laden die freien Termine|Loading available times/, file);
  assert.ok(widget.includes(locale === 'de' ? 'Termin finden' : 'Find a time'), file);
}

test('home, service and case study pages render the shared first-party booking form', () => {
  const files = readdirSync(dist, { recursive: true }).filter(file => /^(de|en)\/.*\.html$/.test(file));
  let checked = 0;
  for (const file of files) {
    const html = readFileSync(new URL(file, dist), 'utf8');
    if (!html.includes('data-booking-calendar')) continue;
    assertNativeWidget(html, file, file.slice(0, 2));
    checked++;
  }
  assert.ok(checked >= 20, `coverage: ${checked} booking pages`);
  for (const file of ['de/index.html', 'en/index.html', 'de/fallstudien/wunderwelt-kids/index.html']) {
    assertNativeWidget(readFileSync(new URL(file, dist), 'utf8'), file, file.slice(0, 2));
  }
});
