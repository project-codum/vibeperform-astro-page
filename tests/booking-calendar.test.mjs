import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { bookingEmbedUrl, bookingUrl } from '../src/lib/siteMetadata.ts';
import { mountBookingCalendar } from '../src/scripts/bookingCalendar.ts';

const dist = new URL('../dist/', import.meta.url);

function assertBookingSchedule(html, file, locale) {
  const widget = html.match(/<div class="booking-calendar"[\s\S]*?<\/iframe>/)?.[0];
  assert.ok(widget, file);
  const frame = widget.match(/<iframe\b[^>]*>/)?.[0];
  assert.ok(frame, file);
  assert.ok(frame.includes(`data-src="${bookingEmbedUrl}&amp;hl=${locale}"`), file);
  assert.doesNotMatch(frame, /\ssrc=/, file);
  assert.match(frame, /referrerpolicy="no-referrer"/, file);
  assert.ok(widget.includes(`data-booking-fallback href="${bookingUrl}"`), file);
  assert.doesNotMatch(widget, /\/api\/booking\/|Wir laden die freien Termine|Loading available times/, file);
}

test('booking pages share the verified Google schedule and connect only after an action', () => {
  const files = readdirSync(dist, { recursive: true }).filter(file => /^(de|en)\/.*\.html$/.test(file));
  let checked = 0;
  for (const file of files) {
    const html = readFileSync(new URL(file, dist), 'utf8');
    if (!html.includes('data-booking-calendar')) continue;
    assert.equal((html.match(/id="terminbuchung"/g) ?? []).length, 1, file);
    assertBookingSchedule(html, file, file.slice(0, 2));
    checked++;
  }
  assert.ok(checked >= 20, `coverage: ${checked} booking pages`);
  for (const file of ['de/index.html', 'en/index.html', 'de/fallstudien/wunderwelt-kids/index.html']) {
    assertBookingSchedule(readFileSync(new URL(file, dist), 'utf8'), file, file.slice(0, 2));
  }
});

test('calendar opens on click and releases the frame when closed', t => {
  class Control extends EventTarget {
    hidden = true;
    dataset = {};
    setAttribute(key, value) { this[key] = value; }
    removeAttribute(key) { delete this[key]; }
    focus() { this.focused = true; }
  }
  const controls = ['open', 'fallback', 'panel', 'frame', 'close'].map(() => new Control());
  const [open, fallback, panel, frame, close] = controls;
  const selectors = new Map(['open','fallback','panel','frame','close'].map((name, i) => [`[data-booking-${name}]`, controls[i]]));
  const entry = new Control();
  const root = { id: 'terminbuchung', dataset: {}, querySelector: key => selectors.get(key) };
  frame.dataset.src = bookingEmbedUrl;
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { querySelectorAll: () => [entry] } });
  t.after(() => { delete globalThis.document; });

  mountBookingCalendar(root);
  assert.equal(frame.src, undefined);
  assert.equal(open.hidden, false);
  assert.equal(fallback.hidden, true);
  assert.equal(entry.href, '#terminbuchung');
  open.dispatchEvent(new Event('click'));
  assert.equal(frame.src, bookingEmbedUrl);
  assert.equal(panel.hidden, false);
  assert.equal(panel.focused, true);
  assert.equal(open['aria-expanded'], 'true');
  close.dispatchEvent(new Event('click'));
  assert.equal(frame.src, undefined);
  assert.equal(panel.hidden, true);
  assert.equal(open.focused, true);
  assert.equal(open['aria-expanded'], 'false');

  entry.dispatchEvent(Object.assign(new Event('click'), { button: 0 }));
  assert.equal(frame.src, bookingEmbedUrl);
});
