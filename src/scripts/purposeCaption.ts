// One scroll-driven reading pass per page visit. No playback clock, scroll
// alignment, wheel interception or touch lock. Plain text is the default.
const heading = document.querySelector<HTMLElement>('[data-caption-reveal]');
const stage = document.querySelector<HTMLElement>('[data-purpose-stage]');
const pin = stage?.querySelector<HTMLElement>('[data-purpose-pin]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (heading && stage && pin && !reducedMotion.matches) {
  const words = Array.from(heading.querySelectorAll<HTMLElement>('.hp-caption-word'));
  const events = new AbortController();
  let frame = 0;
  const leadIn = 120; // Let the pinned statement arrive before its first word.
  let distance = 1;
  let lastProgress = Number.NaN;
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    cancelAnimationFrame(frame);
    words.forEach(word => {
      word.style.removeProperty('opacity');
      word.style.removeProperty('transform');
    });
    heading.dataset.captionState = 'complete';
    heading.dataset.captionProgress = '1';
    events.abort();
    // Keep the reserved scroll distance after completion so the page does not
    // jump. Scrolling back shows the full text and never restarts the reveal.
  };

  const render = () => {
    frame = 0;
    if (done) return;
    const progress = Math.max(-1, Math.min(1, (-stage.getBoundingClientRect().top - leadIn) / distance));
    if (progress >= 1) { finish(); return; }
    if (progress === lastProgress) return;
    lastProgress = progress;
    heading.dataset.captionState = progress > 0 ? 'scrolling' : 'waiting';
    heading.dataset.captionProgress = Math.max(0, progress).toFixed(4);
    words.forEach((word, index) => {
      const local = progress * words.length - index;
      const settle = Math.max(0, Math.min(1, local / .8));
      const ease = settle * settle * (3 - 2 * settle);
      // Same opaque pop-in/settle style, but every state comes from distance.
      word.style.opacity = local >= 0 ? '1' : '0';
      word.style.transform = `scale(${1 + .2 * (1 - ease)})`;
    });
  };
  const schedule = () => {
    if (!done && !frame) frame = requestAnimationFrame(render);
  };
  const measure = () => {
    if (done) return;
    distance = words.length * 150;
    stage.style.setProperty('--purpose-scroll-distance', `${leadIn + distance}px`);
    stage.style.setProperty('--purpose-pin-height', `${pin.getBoundingClientRect().height}px`);
    lastProgress = Number.NaN;
    schedule();
  };

  stage.dataset.captionScroll = 'active';
  const options = { passive: true, signal: events.signal };
  window.addEventListener('scroll', schedule, options);
  window.addEventListener('resize', measure, options);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) finish();
  }, { signal: events.signal });
  window.addEventListener('pagehide', finish, { signal: events.signal });
  measure();
  cancelAnimationFrame(frame);
  render();
}
