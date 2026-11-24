/** Scroll is the default reading mode. The guide only takes over after Play. */
export function mountAboutStory(root: HTMLElement) {
  const chapters = Array.from(root.querySelectorAll<HTMLElement>('[data-about-chapter]'));
  const footer = document.querySelector<HTMLElement>('[data-guide-footer]')!;
  const origin = footer.querySelector<HTMLElement>('[data-controls-origin]')!;
  const controls = origin.querySelector<HTMLElement>('[data-story-controls]')!;
  const play = controls.querySelector<HTMLButtonElement>('[data-play]')!;
  const sound = controls.querySelector<HTMLButtonElement>('[data-sound]')!;
  const index = controls.querySelector<HTMLButtonElement>('[data-index]')!;
  const chapterCount = controls.querySelector<HTMLElement>('[data-chapter-count]')!;
  const currentChapter = controls.querySelector<HTMLElement>('[data-current-chapter]')!;
  const menu = controls.querySelector<HTMLElement>('[data-chapter-menu]')!;
  const choices = Array.from(menu.querySelectorAll<HTMLButtonElement>('[data-choice]'));
  const meter = controls.querySelector<HTMLElement>('[data-meter]')!;
  const feedback = controls.querySelector<HTMLElement>('[data-feedback]')!;
  const audio = root.querySelector<HTMLAudioElement>('[data-guide]')!;
  const durations = chapters.map(chapter => Number(chapter.dataset.duration));
  const totalDuration = durations.reduce((sum, length) => sum + length, 0);
  const passages = chapters.map(chapter => Array.from(chapter.querySelectorAll<HTMLElement>('[data-cue]')));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let highlighted: HTMLElement | undefined;
  let current = 0;
  let playing = false;
  let complete = false;
  let frame = 0;
  let playRequest = 0;
  let pausedAt = -1;
  let docking: Animation | undefined;

  function placeControls(animate = true) {
    const bounds = root.getBoundingClientRect();
    const originTop = origin.getBoundingClientRect().top;
    const dock = originTop < Math.min(240, innerHeight * .45);
    const wasHidden = controls.hidden;
    controls.hidden = bounds.bottom <= innerHeight * .22;
    if (controls.hidden) {
      setMenu(false);
      return;
    }
    const moving = controls.hasAttribute('data-docked') !== dock;
    const before = controls.getBoundingClientRect();
    if (!dock) controls.style.setProperty('--hero-top', originTop + 'px');
    if (!moving) return;
    docking?.cancel();
    controls.toggleAttribute('data-docked', dock);
    if (animate && !wasHidden && !reducedMotion.matches) {
      const after = controls.getBoundingClientRect();
      const offset = `translate(${before.left - after.left}px, ${before.top - after.top}px)`;
      docking = controls.animate([{transform:offset},{transform:'none'}], {
        duration:400, easing:'cubic-bezier(.22,.68,.22,1)',
      });
    }
  }

  function setMenu(open: boolean) {
    controls.toggleAttribute('data-menu-open', open);
    index.setAttribute('aria-expanded', String(open));
    menu.inert = !open;
  }

  function render() {
    root.toggleAttribute('data-listening', playing);
    chapterCount.textContent = (current + 1) + ' / ' + chapters.length;
    currentChapter.textContent = chapters[current].dataset.name!;
    choices.forEach((button, i) => {
      if (i === current) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    const labels = controls.dataset;
    play.textContent = playing ? labels.pauseLabel! : complete ? labels.replayLabel! :
      pausedAt === current ? labels.resumeLabel! : labels.playLabel!;
    sound.textContent = audio.muted ? labels.unmuteLabel! : labels.muteLabel!;
    updateMeter();
  }

  function updateMeter() {
    const sourceMatches = audio.getAttribute('src') === chapters[current].dataset.audio;
    const elapsedBefore = durations.slice(0, current).reduce((sum, length) => sum + length, 0);
    const elapsedHere = sourceMatches ? Math.min(audio.currentTime, durations[current]) : 0;
    const fraction = complete ? 1 : (elapsedBefore + elapsedHere) / totalDuration;
    meter.style.transform = 'scaleX(' + fraction + ')';
  }

  function clearPassage() {
    highlighted?.removeAttribute('data-narrated');
    highlighted = undefined;
  }

  function readFrom(number: number) {
    if (number !== current) {
      audio.pause();
      pausedAt = -1;
      current = number;
      complete = false;
      clearPassage();
      if (audio.getAttribute('src') === chapters[current].dataset.audio) audio.currentTime = 0;
      feedback.hidden = true;
    }
    render();
  }

  function stop() {
    ++playRequest;
    if (playing && !complete) pausedAt = current;
    playing = false;
    clearPassage();
    audio.pause();
    render();
  }

  function start() {
    const request = ++playRequest;
    const src = chapters[current].dataset.audio!;
    if (audio.getAttribute('src') !== src) audio.src = src;
    placeControls();
    playing = true;
    feedback.hidden = true;
    render();
    audio.play().catch(() => {
      if (request !== playRequest) return;
      stop();
      feedback.hidden = false;
    });
  }

  function go(number: number) {
    readFrom(number);
    chapters[number].scrollIntoView({ behavior: 'instant', block: 'start' });
    if (playing) start();
  }

  play.addEventListener('click', () => {
    if (playing) { stop(); return; }
    if (complete) {
      complete = false;
      go(0);
    }
    if (!controls.hasAttribute('data-docked')) go(current);
    start();
  });
  sound.addEventListener('click', () => { audio.muted = !audio.muted; render(); });
  index.addEventListener('click', () => setMenu(menu.inert));
  controls.addEventListener('keydown', event => {
    const at = choices.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === 'Escape' && !menu.inert) {
      setMenu(false);
      index.focus({preventScroll:true});
    } else if ((at >= 0 || event.target === index) && ['ArrowUp','ArrowDown','Home','End'].includes(event.key)) {
      event.preventDefault();
      setMenu(true);
      let next = current;
      if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = choices.length-1;
      else if (at >= 0) next = (at + (event.key === 'ArrowUp' ? -1 : 1) + choices.length) % choices.length;
      choices[next].focus({preventScroll:true});
    }
  });
  document.addEventListener('pointerdown', event => {
    if (!controls.contains(event.target as Node)) setMenu(false);
  });
  controls.addEventListener('focusout', event => {
    if (!controls.contains(event.relatedTarget as Node)) setMenu(false);
  });
  menu.addEventListener('wheel', event => event.stopPropagation(), {passive:true});
  menu.addEventListener('touchmove', event => event.stopPropagation(), {passive:true});
  choices.forEach((button,position) => button.addEventListener('click', () => {
    index.focus({preventScroll:true});
    setMenu(false);
    if (audio.getAttribute('src') === chapters[position].dataset.audio) audio.currentTime = 0;
    complete = false;
    pausedAt = -1;
    go(position);
  }));

  audio.addEventListener('ended', () => {
    if (!playing) return;
    if (current + 1 < chapters.length) go(current + 1);
    else { complete = true; stop(); }
  });
  audio.addEventListener('error', () => {
    stop();
    feedback.hidden = false;
  });
  audio.addEventListener('timeupdate', () => {
    updateMeter();
    if (!playing || audio.getAttribute('src') !== chapters[current].dataset.audio) return;
    const passage = passages[current].filter(p => Number(p.dataset.cue) <= audio.currentTime).at(-1);
    if (!passage || passage === highlighted) return;
    clearPassage();
    highlighted = passage;
    passage.setAttribute('data-narrated', '');
    if (passage.matches('.ag-enclosure')) passage.setAttribute('data-revealed', '');
    const rect = passage.getBoundingClientRect();
    if (rect.bottom > innerHeight - controls.offsetHeight - 24 || rect.top < 0) {
      passage.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
    }
  });

  function syncScroll() {
    frame = 0;
    placeControls();
    const rect = chapters[current].getBoundingClientRect();
    if (playing && (rect.bottom < 0 || rect.top > innerHeight)) stop();
    if (playing) return;
    const readingLine = Math.min(innerHeight * .34, 160);
    let visible = 0;
    for (let i = 1; i < chapters.length; i++) {
      if (chapters[i].getBoundingClientRect().top > readingLine) break;
      visible = i;
    }
    if (visible !== current) readFrom(visible);
  }
  window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(syncScroll); }, { passive: true });
  function takeOver() { if (playing) stop(); }
  window.addEventListener('wheel', takeOver, { passive: true });
  window.addEventListener('touchmove', takeOver, { passive: true });
  document.addEventListener('keydown', event => {
    if (!(event.target instanceof Element) || controls.contains(event.target)) return;
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) takeOver();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) takeOver(); });
  window.addEventListener('pagehide', stop);
  const photo = root.querySelector<HTMLElement>('.ag-enclosure');
  if (photo) {
    const reveal = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting) && !playing) {
        photo.setAttribute('data-revealed', '');
        reveal.disconnect();
      }
    }, { threshold: .42 });
    reveal.observe(photo);
  }
  footer.hidden = false;
  root.dataset.enhanced = '';
  syncScroll();
  render();
  const sizes = new ResizeObserver(() => placeControls(false));
  sizes.observe(root);
  sizes.observe(chapters[0]);
  window.addEventListener('resize', () => placeControls(false));
}
