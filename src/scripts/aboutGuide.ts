import { mountStoryControls } from './storyControls';

type GuideCue = {
  start: number;
  chapter: number;
  anchor?: string;
  caption?: { words: number[]; end: number };
};

export function mountAboutGuide(hero: HTMLElement) {
  const audio = hero.querySelector<HTMLAudioElement>('[data-about-guide]')!;
  const bar = hero.querySelector<HTMLElement>('[data-story-controls]')!;
  const play = bar.querySelector<HTMLButtonElement>('[data-play]')!;
  const sound = bar.querySelector<HTMLButtonElement>('[data-sound]')!;
  const meter = bar.querySelector<HTMLElement>('[data-meter]')!;
  const feedback = bar.querySelector<HTMLElement>('[data-feedback]')!;
  const names = Array.from(bar.querySelectorAll('[data-choice]'), choice => choice.children[1].textContent!);
  const cues: GuideCue[] = JSON.parse(audio.dataset.cues!);
  const caption = cues.find(cue => cue.caption)?.caption;
  const german = audio.lang === 'de';
  const listen = play.textContent!;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const purposeStage = document.querySelector<HTMLElement>('#vision [data-purpose-stage]');
  let started = false;
  let chapter = 0;
  let cueIndex = -1;
  let scrollFrame = 0;
  let captionFrame = 0;
  let lastCaptionProgress = Number.NaN;
  let readingManually = false;
  let activeText: HTMLElement | undefined;

  const controls = mountStoryControls(hero, names, () => started || scrollY > 2, position => {
    readingManually = false;
    const index = cues.findIndex(cue => cue.chapter === position);
    audio.currentTime = cues[index].start;
    followCue(index, true, true);
    sync();
  });

  function stopScroll() {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
  }

  function updateCaption() {
    if (!caption || !purposeStage?.hasAttribute('data-guided-purpose')) return;
    const time = audio.currentTime;
    const word = caption.words.findLastIndex(start => start <= time);
    // Stop just before the next word until its own onset. The shared reveal
    // settles a word within the first 0.8 of its progress interval.
    const fraction = word < 0 ? 0 : Math.min(0.95, (time - caption.words[word]) / 0.16);
    const progress = readingManually || motion.matches || time >= caption.end ? 1 : (word + fraction) / caption.words.length;
    if (progress === lastCaptionProgress) return;
    lastCaptionProgress = progress;
    purposeStage.dispatchEvent(new CustomEvent('purpose:audio-progress', { detail: progress }));
  }

  function scheduleCaption() {
    if (captionFrame || audio.paused || !caption || audio.currentTime >= caption.end || motion.matches || readingManually) return;
    captionFrame = requestAnimationFrame(() => {
      captionFrame = 0;
      updateCaption();
      scheduleCaption();
    });
  }

  function stopCaption() {
    cancelAnimationFrame(captionFrame);
    captionFrame = 0;
  }

  function scrollToText(target: HTMLElement) {
    stopScroll();
    const rect = target.getBoundingClientRect();
    const from = scrollY;
    const to = hero.contains(target) ? 0 : Math.max(0, from + rect.top - 68);
    if (motion.matches) {
      window.scrollTo({ top: to, behavior: 'instant' });
      return;
    }
    if (Math.abs(to - from) < 1) return;
    const duration = Math.min(850, 350 + Math.abs(to - from) * 0.32);
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.max(0, Math.min(1, (now - start) / duration));
      const eased = progress * progress * (3 - 2 * progress);
      window.scrollTo({ top: from + (to - from) * eased, behavior: 'instant' });
      scrollFrame = progress < 1 ? requestAnimationFrame(step) : 0;
    };
    scrollFrame = requestAnimationFrame(step);
  }

  function followCue(index: number, follow: boolean, reposition = false) {
    const changed = cueIndex !== index;
    cueIndex = index;
    const cue = cues[index];
    const chapterChanged = cue.chapter !== chapter;
    if (chapterChanged) {
      chapter = cue.chapter;
      controls.showChapter(chapter);
    }
    if (!follow || !cue.anchor) return;
    const target = document.getElementById(cue.anchor);
    if (!target) return;

    if (purposeStage && !purposeStage.hasAttribute('data-guided-purpose')) {
      purposeStage.removeAttribute('data-caption-scroll');
      purposeStage.setAttribute('data-guided-purpose', '');
      updateCaption();
    }
    if (changed || activeText !== target) {
      activeText?.removeAttribute('data-guide-current');
      target.setAttribute('data-guide-current', '');
      activeText = target;
    }
    if (chapterChanged || reposition) {
      const anchor = cues.find(entry => entry.chapter === chapter)?.anchor;
      const chapterTarget = anchor && document.getElementById(anchor);
      if (chapterTarget) scrollToText(chapterTarget);
    }
  }

  function sync(reposition = false) {
    const { currentTime, duration, ended, muted, paused } = audio;
    play.textContent = !paused ? 'Pause'
      : ended ? (german ? 'Noch einmal' : 'Play again')
      : currentTime > 0 ? (german ? 'Weiter' : 'Resume') : listen;
    sound.textContent = muted ? (german ? 'Ton an' : 'Unmute') : (german ? 'Ton aus' : 'Mute');
    meter.style.transform = 'scaleX(' + (Number.isFinite(duration) && duration > 0 ? currentTime / duration : 0) + ')';
    const index = Math.max(0, cues.findLastIndex(cue => cue.start <= currentTime + 0.04));
    if (reposition || index !== cueIndex) followCue(index, reposition || !paused, reposition);
    updateCaption();
    scheduleCaption();
  }

  function reportError() {
    feedback.textContent = german ? 'Die Aufnahme konnte nicht abgespielt werden.' : 'The recording could not be played.';
    feedback.hidden = false;
    stopScroll();
    sync();
  }

  play.addEventListener('click', () => {
    feedback.hidden = true;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    if (audio.error) audio.load();
    if (audio.ended) audio.currentTime = 0;
    void audio.play().catch(reportError);
  });
  sound.addEventListener('click', () => { audio.muted = !audio.muted; });
  audio.addEventListener('play', () => {
    started = true;
    readingManually = false;
    controls.place();
    sync(true);
  });
  audio.addEventListener('pause', () => {
    stopScroll();
    stopCaption();
    sync();
  });
  for (const event of ['timeupdate', 'ended', 'loadedmetadata', 'volumechange', 'seeked']) {
    audio.addEventListener(event, () => sync());
  }
  audio.addEventListener('error', reportError);
  motion.addEventListener('change', () => {
    updateCaption();
    scheduleCaption();
  });

  if (cues.some(cue => cue.anchor)) {
    const takeOver = (event: Event) => {
      if (bar.contains(event.target as Node)) return;
      stopScroll();
      readingManually = true;
      if (!audio.paused) audio.pause();
      updateCaption();
    };
    const passive = { capture: true, passive: true };
    window.addEventListener('wheel', takeOver, passive);
    window.addEventListener('touchmove', takeOver, passive);
    window.addEventListener('keydown', event => {
      if (event.defaultPrevented || !['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) return;
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, button, a, summary, [contenteditable]')) return;
      takeOver(event);
    });
  }
  window.addEventListener('scroll', () => {
    if (!started) controls.place();
  }, { passive: true });
  window.addEventListener('pagehide', () => {
    stopScroll();
    stopCaption();
    audio.pause();
  });
}
