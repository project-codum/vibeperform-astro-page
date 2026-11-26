// A single scroll-driven pass by default. The About page can use the audio clock instead.
const heading = document.querySelector<HTMLElement>('[data-caption-reveal]');
const stage = document.querySelector<HTMLElement>('[data-purpose-stage]');
const pin = stage?.querySelector<HTMLElement>('[data-purpose-pin]');
const mission = pin?.querySelector<HTMLElement>('[data-purpose-mission]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (heading && stage && pin && !reducedMotion.matches) {
  const words = Array.from(heading.querySelectorAll<HTMLElement>('.hp-caption-word'));
  const events = new AbortController();
  let frame = 0;
  const leadIn = 64; // Let the pinned statement arrive before its first word.
  let distance = 1;
  let lastProgress = Number.NaN;
  let done = false;

  const showComplete = () => {
    words.forEach(word => {
      word.style.removeProperty('opacity');
      word.style.removeProperty('transform');
    });
    mission?.style.removeProperty('opacity');
    mission?.style.removeProperty('transform');
    heading.dataset.captionState = 'complete';
    heading.dataset.captionProgress = '1';
  };

  const stopManual = () => {
    done = true;
    cancelAnimationFrame(frame);
    events.abort();
  };

  const finish = () => {
    if (done) return;
    stopManual();
    showComplete();
    // Keep the reserved scroll distance after completion so the page does not jump.
  };

  const paint = (progress: number, mode: 'audio' | 'scrolling') => {
    if (progress >= 1) { showComplete(); return; }
    const waiting = progress < 0 || (progress === 0 && mode === 'scrolling');
    heading.dataset.captionState = waiting ? 'waiting' : mode;
    heading.dataset.captionProgress = Math.max(0, progress).toFixed(4);
    words.forEach((word, index) => {
      const local = progress * words.length - index;
      const settle = Math.max(0, Math.min(1, local / .8));
      const ease = settle * settle * (3 - 2 * settle);
      // Same opaque pop-in/settle style, but every state comes from distance.
      word.style.opacity = local >= 0 ? '1' : '0';
      word.style.transform = `scale(${1 + .2 * (1 - ease)})`;
    });
    if (mission) {
      const arrival = Math.max(0, 1 - (1 - progress) * words.length / 2);
      mission.style.opacity = String(arrival);
      mission.style.transform = `translateY(${(1 - arrival) * 16}px)`;
    }
  };
  const render = () => {
    frame = 0;
    if (done) return;
    const progress = Math.max(-1, Math.min(1, (-stage.getBoundingClientRect().top - leadIn) / distance));
    if (progress >= 1) { finish(); return; }
    if (progress === lastProgress) return;
    lastProgress = progress;
    paint(progress, 'scrolling');
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
  // Audio can replay the reveal even after the manual scroll pass has finished.
  stage.addEventListener('purpose:audio-progress', event => {
    if (!done) stopManual();
    paint((event as CustomEvent<number>).detail, 'audio');
  });
  measure();
  cancelAnimationFrame(frame);
  render();
}
