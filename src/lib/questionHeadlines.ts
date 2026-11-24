/** The cards keep their grid slots while their visual surfaces move into the headline stack. */
class QuestionHeadlines extends HTMLElement {
  private stop?: () => void;

  connectedCallback() {
    const grid = this.querySelector<HTMLElement>('.question-cards');
    const stage = this.querySelector<HTMLElement>('.question-stage');
    const heading = stage?.querySelector('h2');
    if (!grid || !stage || !heading) return;

    const cards = [...grid.querySelectorAll<HTMLElement>('.scene-mini')];
    const captions = [...grid.querySelectorAll<HTMLElement>('article > p')];
    const motion = matchMedia('(prefers-reduced-motion: no-preference)');
    const events = new AbortController();
    const animations: Animation[] = [];
    let frame = 0;
    let pinTop = 0;
    let travel = 0;
    let lastTime = -1;

    const update = () => {
      frame = 0;
      if (!animations.length) return;
      const progress = Math.max(0, Math.min(1, (pinTop - this.getBoundingClientRect().top) / travel));
      const time = 1000 * progress;
      if (time === lastTime) return;
      lastTime = time;
      for (const animation of animations) animation.currentTime = time;
      grid.style.setProperty('--rule-color', `color-mix(in srgb, var(--hp-line) ${100 * Math.max(0, (progress - .78) / .22)}%, transparent)`);
    };
    const schedule = () => { if (!frame && animations.length) frame = requestAnimationFrame(update); };

    const measure = () => {
      for (const animation of animations.splice(0)) animation.cancel();
      this.toggleAttribute('data-motion', motion.matches);
      if (!motion.matches) return;
      pinTop = parseFloat(getComputedStyle(stage).top);
      travel = Math.max(1, this.offsetHeight - stage.offsetHeight);
      const origin = stage.getBoundingClientRect();
      const headingBottom = pinTop + heading.getBoundingClientRect().bottom - origin.top;
      const freeHeight = Math.max(1, innerHeight - headingBottom);
      const animate = (element: HTMLElement, frames: Keyframe[]) => {
        const animation = element.animate(frames, { duration: 1000, fill: 'both' });
        animation.pause();
        animations.push(animation);
      };

      cards.forEach((card, index) => {
        const box = card.getBoundingClientRect();
        const x = innerWidth / 2 - (box.left + box.width / 2);
        const size = Math.min(2.25, innerWidth * .92 / box.width, freeHeight * .55 / box.height);
        const lift = Math.min(32, freeHeight * .045);
        // Leave room for the tilted, oversized entrance, even on short screens.
        const entranceHalfHeight = size * 1.22 * (box.height + box.width * .14) / 2;
        const centerY = Math.max(innerHeight / 2, headingBottom + entranceHalfHeight + lift + 8);
        const y = centerY - pinTop - (box.top - origin.top + box.height / 2);
        const angle = [-2.5, 2, -1][index];
        const centered = (scale: number, tilt: number, lift = 0) =>
          `translate(${x}px, ${y + lift}px) rotate(${tilt}deg) scale(${scale})`;
        const landed = centered(size, angle);
        const entrance = index * .24;
        const frames: Keyframe[] = [
          { offset: entrance, opacity: 0, transform: centered(size * 1.22, angle * 3, -lift), easing: 'cubic-bezier(.15,.8,.2,1)' },
          { offset: entrance + .055, opacity: 1, transform: centered(size * .98, angle * .85) },
          { offset: entrance + .08, opacity: 1, transform: landed },
          { offset: .74, opacity: 1, transform: landed, easing: 'cubic-bezier(.3,0,.2,1)' },
          { offset: .96, opacity: 1, transform: 'none' },
        ];
        if (index > 0) frames.unshift({ ...frames[0], offset: 0 });
        animate(card, frames);
        animate(captions[index], [{ offset: 0, opacity: 0 }, { offset: .82, opacity: 0 }, { offset: .98, opacity: 1 }]);
      });
      lastTime = -1;
      update();
    };

    const resize = new ResizeObserver(measure);
    resize.observe(stage);
    motion.addEventListener('change', measure, { signal: events.signal });
    window.addEventListener('resize', measure, { signal: events.signal });
    window.addEventListener('scroll', schedule, { passive: true, signal: events.signal });
    measure();
    this.stop = () => {
      events.abort();
      resize.disconnect();
      cancelAnimationFrame(frame);
      for (const animation of animations) animation.cancel();
      this.removeAttribute('data-motion');
    };
  }

  disconnectedCallback() { this.stop?.(); }
}

if (!customElements.get('question-headlines')) customElements.define('question-headlines', QuestionHeadlines);
