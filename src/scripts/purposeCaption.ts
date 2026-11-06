import { gsap } from 'gsap';

// Each word appears at full opacity, slightly enlarged, then settles once.
// The website keeps the sentence on screen instead of killing the caption group.
const heading = document.querySelector<HTMLElement>('[data-caption-reveal]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (heading && 'IntersectionObserver' in window && !reducedMotion.matches) {
  const words = Array.from(heading.querySelectorAll<HTMLElement>('.hp-caption-word'));
  let timeline: gsap.core.Timeline | undefined;
  const revealAll = () => {
    timeline?.kill();
    gsap.set(words, { clearProps: 'all' });
    heading.dataset.captionState = 'complete';
  };
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    heading.dataset.captionState = 'playing';
    timeline = gsap.timeline({ onComplete: revealAll });
    let start = 0;
    words.forEach(word => {
      timeline!.set(word, { opacity: 1, scale: 1.12 }, start);
      timeline!.to(word, { scale: 1, duration: 0.32, ease: 'power2.out' }, start);
      // Reading rhythm replaces speech timestamps; give long words more room.
      start += Math.min(0.52, Math.max(0.32, (word.textContent?.length ?? 0) * 0.035));
    });
  }, { threshold: 0.5 });
  gsap.set(words, { opacity: 0 });
  heading.dataset.captionState = 'waiting';
  observer.observe(heading);
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { observer.disconnect(); revealAll(); }
  });
}
