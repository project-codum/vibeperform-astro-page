export function mountStoryControls(
  root: HTMLElement,
  chapterNames: readonly string[],
  shouldDock: () => boolean,
  selectChapter: (position: number) => void,
) {
  const controls = root.querySelector<HTMLElement>('[data-story-controls]')!;
  const origin = root.querySelector<HTMLElement>('[data-controls-origin]')!;
  const index = controls.querySelector<HTMLButtonElement>('[data-index]')!;
  const chapterCount = controls.querySelector<HTMLElement>('[data-chapter-count]')!;
  const currentChapter = controls.querySelector<HTMLElement>('[data-current-chapter]')!;
  const menu = controls.querySelector<HTMLElement>('[data-chapter-menu]')!;
  const choices = Array.from(menu.querySelectorAll<HTMLButtonElement>('[data-choice]'));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let docking: Animation | undefined;

  function place(animate = true) {
    const dock = shouldDock();
    const moving = controls.hasAttribute('data-docked') !== dock;
    const previousTop = controls.getBoundingClientRect().top;
    if (!dock) controls.style.setProperty('--hero-top', origin.getBoundingClientRect().top + 'px');
    if (!moving) return;
    docking?.cancel();
    controls.toggleAttribute('data-docked', dock);
    if (animate && !reducedMotion.matches) {
      const distance = previousTop - controls.getBoundingClientRect().top;
      docking = controls.animate([{ transform: 'translateY(' + distance + 'px)' }, { transform: 'none' }], {
        duration: 400, easing: 'cubic-bezier(.22,.68,.22,1)',
      });
    }
  }

  function setMenu(open: boolean) {
    controls.toggleAttribute('data-menu-open', open);
    index.setAttribute('aria-expanded', String(open));
    menu.inert = !open;
  }

  function showChapter(position: number) {
    current = position;
    chapterCount.textContent = (position + 1) + ' / ' + chapterNames.length;
    currentChapter.textContent = chapterNames[position];
    choices.forEach((button, i) => {
      if (i === position) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
  }

  index.addEventListener('click', () => setMenu(menu.inert));
  controls.addEventListener('keydown', event => {
    const at = choices.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === 'Escape' && !menu.inert) {
      setMenu(false);
      index.focus({ preventScroll: true });
    } else if ((at >= 0 || event.target === index) && ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      setMenu(true);
      let next = current;
      if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = choices.length - 1;
      else if (at >= 0) next = (at + (event.key === 'ArrowUp' ? -1 : 1) + choices.length) % choices.length;
      choices[next].focus({ preventScroll: true });
    }
  });
  document.addEventListener('pointerdown', event => {
    if (!controls.contains(event.target as Node)) setMenu(false);
  });
  controls.addEventListener('focusout', event => {
    if (!controls.contains(event.relatedTarget as Node)) setMenu(false);
  });
  menu.addEventListener('wheel', event => event.stopPropagation(), { passive: true });
  menu.addEventListener('touchmove', event => event.stopPropagation(), { passive: true });
  choices.forEach((button, position) => button.addEventListener('click', () => {
    index.focus({ preventScroll: true });
    setMenu(false);
    selectChapter(position);
  }));

  controls.hidden = false;
  place(false);
  const reposition = () => place(false);
  // Observe the origin and the section containing it for responsive layout changes.
  const observer = new ResizeObserver(reposition);
  observer.observe(origin.parentElement!);
  window.addEventListener('resize', reposition);
  window.addEventListener('pageshow', reposition);

  return { place, setMenu, showChapter };
}
