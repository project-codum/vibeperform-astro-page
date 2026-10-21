/** User-driven before/after carousel. No timers, autoplay or scroll loop. */
export function mountCaseStudy(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-hcs-stage]')!;
  const cards = [...root.querySelectorAll<HTMLElement>('[data-hcs-card]')];
  const switches = [...root.querySelectorAll<HTMLButtonElement>('[data-hcs-switch]')];
  const choices = [...root.querySelectorAll<HTMLButtonElement>('[data-hcs-go]')];
  const status = root.querySelector<HTMLElement>('[data-hcs-status]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width:700px)');
  let front = root.dataset.front === 'before' ? 'before' : 'after';
  let pending = 0, busy = false, disposed = false;
  let running: Animation[] = [];
  let stageWidth = stage.getBoundingClientRect().width;
  root.dataset.enhanced = 'true';

  function sync() {
    choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.hcsGo === front)));
    switches.forEach(button => {
      const label = front === 'after' ? button.dataset.beforeLabel : button.dataset.afterLabel;
      if (label) button.setAttribute('aria-label', label);
    });
  }
  async function rotate() {
    if (disposed || busy || !pending) return;
    busy = true;
    pending--;
    const from = cards.map(card => card.getBoundingClientRect());
    front = front === 'after' ? 'before' : 'after';
    root.dataset.front = front;
    sync();
    const to = cards.map(card => card.getBoundingClientRect());
    const animate = !reduced.matches && !mobile.matches && !document.hidden && cards.every(card => typeof card.animate === 'function');
    if (animate) {
      root.setAttribute('aria-busy', 'true');
      running = cards.map((card, index) => {
        const incoming = card.dataset.hcsCard === front;
        const dx = from[index].left - to[index].left;
        const dy = from[index].top - to[index].top;
        const sx = from[index].width / Math.max(1, to[index].width);
        const sy = from[index].height / Math.max(1, to[index].height);
        const arc = Math.min(78, stageWidth * .07) * (incoming ? -1 : 1);
        const frames = [0, .16, .33, .5, .66, .83, 1].map(t => {
          const orbit = Math.sin(t * Math.PI);
          const x = dx * (1 - t), y = dy * (1 - t) + arc * orbit;
          const depth = (incoming ? 75 : -75) * orbit;
          const angle = (incoming ? -11 : 11) * orbit;
          return { offset: t, transform: `translate3d(${x}px,${y}px,${depth}px) scale(${sx + (1 - sx) * t},${sy + (1 - sy) * t}) rotateY(${angle}deg)` };
        });
        card.style.zIndex = incoming ? '3' : '2';
        card.style.willChange = 'transform';
        return card.animate(frames, { duration: 880, easing: 'cubic-bezier(.22,.65,.2,1)', fill: 'both' });
      });
      await Promise.allSettled(running.map(animation => animation.finished));
    }
    running.forEach(animation => animation.cancel());
    running = [];
    cards.forEach(card => { card.style.removeProperty('z-index'); card.style.removeProperty('will-change'); });
    root.removeAttribute('aria-busy');
    status.textContent = front === 'before' ? status.dataset.before! : status.dataset.after!;
    busy = false;
    // Each accepted click gets its own turn, including clicks during a turn.
    if (pending && !disposed) void rotate();
  }
  const turn = () => { pending++; void rotate(); };
  const choose = (event: Event) => {
    const choice = (event.currentTarget as HTMLButtonElement).dataset.hcsGo;
    if (choice !== front) turn();
  };
  switches.forEach(button => button.addEventListener('click', turn));
  choices.forEach(button => button.addEventListener('click', choose));
  const finish = () => running.forEach(animation => animation.finish());
  const onVisibility = () => { if (document.hidden) finish(); };
  reduced.addEventListener('change', finish);
  document.addEventListener('visibilitychange', onVisibility);
  const resize = new ResizeObserver(entries => {
    const width = entries[0].contentRect.width;
    if (Math.abs(width - stageWidth) > 1) { stageWidth = width; finish(); }
  });
  resize.observe(stage);
  sync();

  const dialog = root.querySelector<HTMLDialogElement>('[data-hcs-dialog]')!;
  const openers = [...root.querySelectorAll<HTMLButtonElement>('[data-hcs-contact]')];
  const closeButton = dialog.querySelector<HTMLButtonElement>('.hcs-close')!;
  let opener: HTMLButtonElement | null = null;
  const open = (event: Event) => {
    opener = event.currentTarget as HTMLButtonElement;
    dialog.showModal();
    document.documentElement.classList.add('hcs-dialog-open');
  };
  const close = () => dialog.close();
  const closed = () => {
    document.documentElement.classList.remove('hcs-dialog-open');
    opener?.focus({ preventScroll: true });
  };
  const outside = (event: MouseEvent) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
  };
  openers.forEach(button => button.addEventListener('click', open));
  closeButton.addEventListener('click', close);
  dialog.addEventListener('close', closed);
  dialog.addEventListener('click', outside);
  return {
    destroy() {
      disposed = true; pending = 0; finish(); resize.disconnect();
      switches.forEach(button => button.removeEventListener('click', turn));
      choices.forEach(button => button.removeEventListener('click', choose));
      reduced.removeEventListener('change', finish);
      document.removeEventListener('visibilitychange', onVisibility);
      openers.forEach(button => button.removeEventListener('click', open));
      closeButton.removeEventListener('click', close);
      dialog.removeEventListener('close', closed);
      dialog.removeEventListener('click', outside);
      if (dialog.open) dialog.close();
      document.documentElement.classList.remove('hcs-dialog-open');
    },
  };
}
