import test from 'node:test';
import assert from 'node:assert/strict';

let generation = 0;
async function fixture(t, reduced = false) {
  const frames = new Map();
  let frameId = 0;
  const style = () => ({ removeProperty(key) { delete this[key]; }, setProperty(key, value) { this[key] = value; } });
  const words = Array.from({ length: 9 }, () => ({ style: style() }));
  const heading = { dataset: {}, querySelectorAll: () => words };
  const window = new EventTarget();
  window.scrollY = 0;
  const motion = new EventTarget();
  motion.matches = reduced;
  window.matchMedia = () => motion;
  const pin = { getBoundingClientRect: () => ({ height: 865 }) };
  const stage = {
    style: style(), dataset: {}, querySelector: () => pin,
    getBoundingClientRect: () => ({ top: 2000 - window.scrollY }),
  };
  const values = {
    window,
    document: { querySelector: selector => selector === '[data-caption-reveal]' ? heading : stage },
    requestAnimationFrame: fn => { frames.set(++frameId, fn); return frameId; },
    cancelAnimationFrame: id => frames.delete(id),
  };
  const saved = new Map(Object.keys(values).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  for (const [key, value] of Object.entries(values)) Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
  t.after(() => {
    window.dispatchEvent(new Event('pagehide'));
    for (const [key, descriptor] of saved) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  });
  await import(`../src/scripts/purposeCaption.ts?test=${generation++}`);
  const flush = () => {
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach(fn => fn());
  };
  const scroll = offset => {
    window.scrollY = 2000 + offset;
    window.dispatchEvent(new Event('scroll'));
    flush();
  };
  return { window, words, heading, stage, motion, frames, flush, scroll };
}

test('first word waits for 120px and subsequent words require 150px each', async t => {
  const f = await fixture(t);
  assert.equal(f.stage.style['--purpose-scroll-distance'], '1470px');
  f.scroll(100);
  assert(f.words.every(word => word.style.opacity === '0'));
  f.scroll(120);
  assert.equal(f.words[0].style.opacity, '1');
  assert.equal(f.words[0].style.transform, 'scale(1.2)');
  assert.equal(f.words[1].style.opacity, '0');
  f.scroll(271);
  assert.equal(f.words[1].style.opacity, '1');
  assert.equal(f.words[2].style.opacity, '0');
});

test('scroll events coalesce, stop without autoplay, and reverse until completion', async t => {
  const f = await fixture(t);
  assert.equal(f.frames.size, 0, 'initial render leaves no background frame running');
  f.window.scrollY = 2000 + 650;
  for (let i = 0; i < 20; i++) f.window.dispatchEvent(new Event('scroll'));
  assert.equal(f.frames.size, 1);
  f.flush();
  assert.equal(f.frames.size, 0, 'no self-scheduling playback loop');
  f.scroll(120);
  assert.equal(f.words[1].style.opacity, '0');
  f.scroll(1470);
  assert.equal(f.heading.dataset.captionState, 'complete');
  assert(f.words.every(word => word.style.opacity === undefined && word.style.transform === undefined));
  f.scroll(0);
  assert.equal(f.heading.dataset.captionState, 'complete');
  assert.equal(f.frames.size, 0);
});

test('reduced motion keeps the complete text static without a scroll stage', async t => {
  const f = await fixture(t, true);
  assert.equal(f.stage.dataset.captionScroll, undefined);
  assert(f.words.every(word => word.style.opacity === undefined));
  assert.equal(f.frames.size, 0);
});
