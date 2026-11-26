const wordDurations = [880, 1080, 1120, 900];
const flightDuration = wordDurations.reduce((sum, duration) => sum + duration, 0);
const fadeDuration = 420;
const starColors = ['#fff', '#d4e9ff', '#a6b8ff', '#d7afff'];

// The radial trails take their visual cue from https://codepen.io/ybensira/pen/byYNBZ.
export function mountInternetIntro(intro: HTMLDialogElement) {
  const canvas = intro.querySelector('canvas')!;
  const context = canvas.getContext('2d');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const words = intro.querySelectorAll<HTMLElement>('.ag-internet-stage > *');
  const events = new AbortController();
  const stars = Array.from({ length: 220 }, (_, index) => {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle),
      distance: Math.sqrt(Math.random()),
      alpha: 0.25 + Math.random() * 0.65,
      size: 0.65 + Math.random() * 1.3,
      color: starColors[index % starColors.length],
    };
  });
  let width = 0;
  let height = 0;
  let frame = 0;
  const startedAt = performance.now();
  const animations: Animation[] = [];

  function drawStars(progress = 0) {
    if (!context || !width || !height) return;
    context.clearRect(0, 0, width, height);
    const travel = progress * (0.58 + progress * 1.85);
    const warp = 0.12 + progress * 0.88;
    const radius = Math.hypot(width, height) * 0.54;
    const count = Math.min(stars.length, Math.round(92 + width / 9));
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    for (let index = 0; index < count; index++) {
      const star = stars[index];
      const distance = ((star.distance + travel * (0.55 + star.size * 0.3)) % 1) * radius;
      const tail = Math.max(0, distance - 0.9 - distance * warp * 0.28);
      context.globalAlpha = star.alpha * Math.min(1, distance / (radius * 0.18)) * (0.72 + warp * 0.28);
      context.lineWidth = star.size * (0.7 + 0.4 * warp);
      context.strokeStyle = warp > 0.25 ? star.color : '#f6f0ff';
      context.beginPath();
      context.moveTo(centerX + star.x * tail, centerY + star.y * tail);
      context.lineTo(centerX + star.x * distance, centerY + star.y * distance);
      context.stroke();
    }
    context.globalAlpha = 1;
  }

  const resize = () => {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    if (!context || width === 0 || height === 0) return;
    const ratio = Math.min(devicePixelRatio, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.lineCap = 'round';
    drawStars(Math.min(1, (performance.now() - startedAt) / flightDuration));
  };

  const resizeObserver = new ResizeObserver(resize);
  const close = () => {
    if (intro.open) intro.close();
  };

  intro.addEventListener('close', () => {
    cancelAnimationFrame(frame);
    animations.forEach(animation => animation.cancel());
    resizeObserver.disconnect();
    events.abort();
    delete intro.dataset.introPhase;
  }, { once: true });
  motion.addEventListener('change', () => {
    if (motion.matches) close();
  }, { signal: events.signal });
  window.addEventListener('pagehide', close, { signal: events.signal });

  function tick(now: number) {
    if (!intro.open) return;
    const elapsed = now - startedAt;
    drawStars(Math.max(0, Math.min(1, elapsed / flightDuration)));

    if (elapsed >= flightDuration) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      intro.dataset.introPhase = 'landing';
      const fade = intro.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: fadeDuration, easing: 'ease-out', fill: 'forwards',
      });
      animations.push(fade);
      void fade.finished.then(close, close);
      return;
    }
    frame = requestAnimationFrame(tick);
  }

  try {
    intro.dataset.introPhase = 'playing';
    resizeObserver.observe(intro);
    resize();
    let delay = 0;
    words.forEach((word, index) => {
      const duration = wordDurations[index];
      const animation = word.animate([
        { transform: 'translateZ(-1600px)', opacity: 0, offset: 0, easing: 'ease-out' },
        { transform: 'translateZ(-260px)', opacity: 1, offset: 0.24 },
        { transform: 'translateZ(42px)', opacity: 1, offset: 0.67, easing: 'cubic-bezier(.6,0,1,.65)' },
        { transform: 'translateZ(810px)', opacity: 1, offset: 0.92 },
        { transform: 'translateZ(855px)', opacity: 0, offset: 1 },
      ], { delay, duration });
      animations.push(animation);
      delay += duration;
    });
    frame = requestAnimationFrame(tick);
  } catch {
    close();
  }
}
