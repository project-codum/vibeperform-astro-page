import test from 'node:test';
import assert from 'node:assert/strict';
import { portraitReaction } from '../src/lib/homeFluid.js';

test('portrait stays neutral for light deformation and absent pointer', () => {
  assert.equal(portraitReaction(.46, 1), 0);
  assert.equal(portraitReaction(.8, 1), 0);
  assert.equal(portraitReaction(.1, 0), 0);
});

test('stronger deformation reveals the startled portrait and easing away restores it', () => {
  assert.equal(portraitReaction(.28, 1), 1);
  const transition = portraitReaction(.39, 1);
  assert(transition > 0 && transition < 1);
  assert.equal(portraitReaction(.28, .1), 0);
  let previous = 1;
  for (let distance = .16; distance < .6; distance += .005) {
    const reaction = portraitReaction(distance, 1);
    assert(reaction <= previous);
    previous = reaction;
  }
});
