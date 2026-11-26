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
  const mission = { style: style() };
  const pin = { getBoundingClientRect: () => ({ height: 865 }), querySelector: () => mission };
  const stage = Object.assign(new EventTarget(), {
    style: style(), dataset: {}, querySelector: () => pin,
    getBoundingClientRect: () => ({ top: 2000 - window.scrollY }),
  });
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
  return { window, words, heading, mission, stage, motion, frames, flush, scroll };
}

test('first word waits for 64px and subsequent words require 150px each', async t => {
  const f = await fixture(t);
  assert.equal(f.stage.style['--purpose-scroll-distance'], '1414px');
  f.scroll(63);
  assert(f.words.every(word => word.style.opacity === '0'));
  f.scroll(64);
  assert.equal(f.words[0].style.opacity, '1');
  assert.equal(f.words[0].style.transform, 'scale(1.2)');
  assert.equal(f.words[1].style.opacity, '0');
  f.scroll(215);
  assert.equal(f.words[1].style.opacity, '1');
  assert.equal(f.words[2].style.opacity, '0');
  assert.equal(f.mission.style.opacity, '0');
  f.scroll(1264);
  assert.ok(Math.abs(Number(f.mission.style.opacity) - 0.5) < 1e-9);
});

test('scroll events coalesce, stop without autoplay, and reverse until completion', async t => {
  const f = await fixture(t);
  assert.equal(f.frames.size, 0, 'initial render leaves no background frame running');
  f.window.scrollY = 2000 + 650;
  for (let i = 0; i < 20; i++) f.window.dispatchEvent(new Event('scroll'));
  assert.equal(f.frames.size, 1);
  f.flush();
  assert.equal(f.frames.size, 0, 'no self-scheduling playback loop');
  f.scroll(64);
  assert.equal(f.words[1].style.opacity, '0');
  f.scroll(1414);
  assert.equal(f.heading.dataset.captionState, 'complete');
  assert(f.words.every(word => word.style.opacity === undefined && word.style.transform === undefined));
  assert.equal(f.mission.style.opacity, undefined);
  assert.equal(f.mission.style.transform, undefined);
  f.scroll(0);
  assert.equal(f.heading.dataset.captionState, 'complete');
  assert.equal(f.frames.size, 0);
});

test('reduced motion keeps the complete text static without a scroll stage', async t => {
  const f = await fixture(t, true);
  assert.equal(f.stage.dataset.captionScroll, undefined);
  assert(f.words.every(word => word.style.opacity === undefined));
  assert.equal(f.mission.style.opacity, undefined);
  assert.equal(f.frames.size, 0);
});

test('audio takes over the word reveal and can replay it after manual completion', async t => {
  const f = await fixture(t);
  f.scroll(2000);
  assert.equal(f.heading.dataset.captionState, 'complete');
  const audioProgress = detail => f.stage.dispatchEvent(new CustomEvent('purpose:audio-progress', { detail }));
  audioProgress(-1);
  assert(f.words.every(word => word.style.opacity === '0'));
  audioProgress(2.5 / 9);
  assert.equal(f.heading.dataset.captionState, 'audio');
  assert.equal(f.words.filter(word => word.style.opacity === '1').length, 3);
  f.scroll(0);
  assert.equal(f.words.filter(word => word.style.opacity === '1').length, 3);
  audioProgress(1);
  assert.equal(f.heading.dataset.captionState, 'complete');
  assert(f.words.every(word => word.style.opacity === undefined));
  assert.equal(f.mission.style.opacity, undefined);
});
