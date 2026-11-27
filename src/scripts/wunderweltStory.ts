import { chapters, storyCues } from '../data/wunderweltStory';
import { mountStoryControls } from './storyControls';

export function mountWunderweltStory(root: HTMLElement) {
  const guide = root.querySelector<HTMLVideoElement>('[data-narration]')!;
  const comparison = root.querySelector<HTMLElement>('[data-comparison]')!;
  const controls = root.querySelector<HTMLElement>('[data-story-controls]')!;
  const play = root.querySelector<HTMLButtonElement>('[data-play]')!;
  const sound = root.querySelector<HTMLButtonElement>('[data-sound]')!;
  const meter = root.querySelector<HTMLElement>('[data-meter]')!;
  const feedback = root.querySelector<HTMLElement>('[data-feedback]')!;
  const scenes = chapters.map(c => document.getElementById(c.id)!);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const clips = Array.from(root.querySelectorAll<HTMLVideoElement>('video:not([data-narration])'));
  const book = scenes[2];
  const formats = root.querySelector<HTMLElement>('[data-formats-stage]')!;
  const formatsOverview = root.querySelector<HTMLElement>('[data-formats-overview]')!;
  book.setAttribute('data-book-ready','');
  const processHeading = root.querySelector<HTMLElement>('[data-process-heading]')!;
  const processStage = processHeading.parentElement!;
  const processList = root.querySelector<HTMLOListElement>('[data-process-stack]')!;
  const cards = Array.from(processList.querySelectorAll<HTMLElement>('[data-process-card]'));
  const spreads = Array.from(root.querySelectorAll<HTMLElement>('[data-spread]'));
  const spreadCaptions = Array.from(root.querySelectorAll<HTMLElement>('[data-spread-caption]'));
  const editions = Array.from(root.querySelectorAll<HTMLElement>('[data-edition]'));
  const visible = new Set<HTMLVideoElement>();
  let current = 0;
  let pausedAt = -1;
  let following = false;
  let frame = 0;
  let request = 0;
  let guideFrame = 0;
  let chapterEntry: { anchor: HTMLElement; from: number; start: number } | undefined;

  let started = false;
  let onCover = false;
  const { place: placeControls, setMenu, showChapter: showControlsChapter } = mountStoryControls(
    root,
    chapters.map(chapter => chapter.name),
    () => started || scrollY > 2,
    position => {
      if (following) void run(position, false);
      else {
        releaseGuide();
        pausedAt = -1;
        showChapter(position);
        scrollToChapter(position);
        paint();
      }
    },
  );

  // Scroll the actual sticky cards in both modes. Only the guide supplies a scroll position.
  let stepOffsets: number[] = [];
  function layoutSteps() {
    const canStack = !reducedMotion.matches;
    processList.toggleAttribute('data-stacked', canStack);
    const headingHeight = processHeading.offsetHeight;
    const tallestHeader = Math.max(...cards.map(card => card.querySelector('header')!.offsetHeight));
    const cardStyle = getComputedStyle(cards[0]);
    const cardHeight = tallestHeader + parseFloat(cardStyle.borderTopWidth) + parseFloat(cardStyle.paddingBottom);
    const fits = canStack && headingHeight + cardHeight <= innerHeight - controls.offsetHeight - 28;
    processStage.style.setProperty('--process-lead-height', headingHeight+'px');
    processStage.style.setProperty('--process-card-height', cardHeight+'px');
    processList.toggleAttribute('data-stacked', fits);
    const gap = parseFloat(getComputedStyle(processList).rowGap) || 0;
    let offset = 0;
    stepOffsets = cards.map(card => {
      const target = offset - (fits ? headingHeight : 12);
      offset += card.offsetHeight + gap;
      return target;
    });
  }

  function scrollProcess(time: number) {
    if (chapterEntry) return;
    const listTop = processList.getBoundingClientRect().top + scrollY;
    const duration = storyCues.processScroll;
    let target = scenes[4].getBoundingClientRect().top + scrollY;
    for (const [i, cue] of storyCues.process.entries()) {
      const progress = cueProgress(time, cue, duration, duration);
      target += (listTop + stepOffsets[i] - target) * progress;
    }
    scrollGuideTo(target);
  }

  const clampTurn = (value: number) => Math.max(0, Math.min(1, value));
  function cueProgress(time: number, cue: number, duration: number, lead = duration / 2) {
    if (reducedMotion.matches) return Number(time >= cue);
    return ease(clampTurn((time - cue + lead) / duration));
  }

  function scrollGuideTo(target: number) {
    if (Math.abs(scrollY - target) > 1) window.scrollTo({top:target, behavior:'instant'});
  }

  let bookProgress = -1;
  let pageDistance = 1;
  let editionDistance = 1;
  let activeEdition = -1;
  let formatProgress = -1;
  const overviewStart = 2.22;
  const overviewEnd = 2.82;
  const ease = (progress: number) => progress * progress * (3 - 2 * progress);

  function measureStages() {
    pageDistance = parseFloat(getComputedStyle(book,'::after').height) / (spreads.length-1);
    formats.toggleAttribute('data-editions-ready', !reducedMotion.matches);
    if (reducedMotion.matches) {
      formatProgress = -1;
      editions.forEach(figure => figure.removeAttribute('aria-hidden'));
      return;
    }

    editionDistance = parseFloat(getComputedStyle(formats,'::after').height) / editions.length;
    const width = formatsOverview.clientWidth;
    const imageWidth = Math.min(width, innerHeight * (innerHeight < 720 ? .34 : .44) * 10 / 7);
    const imageHeight = imageWidth * 7 / 10;
    formatsOverview.style.setProperty('--formats-feature-height', (imageHeight + 155) + 'px');

    editions.forEach(figure => {
      const image = figure.querySelector('img')!;
      const left = figure.offsetLeft;
      figure.style.setProperty('--feature-image-x', ((width - imageWidth) / 2 - left) + 'px');
      figure.style.setProperty('--feature-image-scale', String(imageWidth / image.offsetWidth - 1));
      figure.style.setProperty('--feature-caption-extra', (width - figure.offsetWidth) + 'px');
      figure.style.setProperty('--feature-caption-x', -left + 'px');
      figure.style.setProperty('--feature-caption-y', (imageHeight - image.offsetHeight) + 'px');
    });
  }

  function showEditions(units: number) {
    const edition = Math.max(0, Math.min(editions.length - 1, Math.round(units)));
    const progress = ease(clampTurn((units - overviewStart) / (overviewEnd - overviewStart)));
    if (reducedMotion.matches || (activeEdition === edition && formatProgress === progress)) return;
    activeEdition = edition;
    formatProgress = progress;
    if (progress < 1 && formats.hasAttribute('data-overview')) formatsOverview.scrollLeft = 0;
    formats.toggleAttribute('data-overview', progress === 1);
    formatsOverview.style.setProperty('--format-expand', String(1 - progress));
    formatsOverview.style.setProperty('--format-overview', (progress * 100) + '%');
    editions.forEach((figure, i) => {
      const featured = i === activeEdition;
      figure.toggleAttribute('data-active', featured);
      figure.style.setProperty('--card-opacity', String(featured ? 1 : progress));
      if (!featured && progress === 0) figure.setAttribute('aria-hidden', 'true');
      else figure.removeAttribute('aria-hidden');
    });
  }

  function narrateEditions(guideTime: number) {
    const localTime = guideTime - chapters[3].start;
    const formatUnits = storyCues.editions.slice(1).reduce((units, cue) =>
      units + cueProgress(localTime, cue, storyCues.editionScroll), 0);
    if (reducedMotion.matches) {
      activeEdition = Math.round(formatUnits);
      return;
    }
    const overview = cueProgress(localTime, storyCues.editionsOverview, storyCues.overviewScroll, 0);
    const units = formatUnits + (overviewEnd - (editions.length - 1)) * overview;
    showEditions(units);
    if (following && !chapterEntry && units > 0) {
      scrollGuideTo(scrollY + formats.getBoundingClientRect().top + units * editionDistance);
    }
  }

  function drawBook(progress: number) {
    if (reducedMotion.matches) progress = Math.round(progress);
    if (progress === bookProgress) return;
    bookProgress = progress;
    const active = Math.round(progress);
    spreads.forEach((spread,i) => {
      const turn = clampTurn(progress-i);
      spread.style.setProperty('--turn', String(turn));
      spread.style.setProperty('--arc', String(Math.sin(turn*Math.PI)));
      spread.style.zIndex = String(spreads.length-i);
      spread.toggleAttribute('data-past', turn === 1);
      spread.setAttribute('aria-hidden', String(i !== active));
      spreadCaptions[i].toggleAttribute('data-active', i === active);
    });
  }

  function drawBookAtScroll(units: number) {
    const page = Math.floor(units);
    drawBook(page + clampTurn((units - page - .2) / .55));
  }

  function readManualStages() {
    const units = Math.max(0, Math.min(spreads.length - 1, -book.getBoundingClientRect().top / pageDistance));
    drawBookAtScroll(units);
    showEditions(-formats.getBoundingClientRect().top / editionDistance);
  }

  function narrateBook(time: number) {
    const units = storyCues.spreads.slice(1).reduce((position, cue) =>
      position + cueProgress(time, cue, storyCues.pageTurn), 0);
    drawBookAtScroll(units);
    if (following && !chapterEntry && units > 0) {
      scrollGuideTo(scrollY + book.getBoundingClientRect().top + units * pageDistance);
    }
  }

  function visualCue() {
    const time = guide.currentTime;
    comparison.toggleAttribute('data-drawing', time >= chapters[1].start + storyCues.illustration);
    if (current === 3) narrateEditions(time);
    if (current === 2) narrateBook(time - chapters[2].start);
    if (current === 4 && following) scrollProcess(time - chapters[4].start);
  }

  function releaseGuide() {
    root.removeAttribute('data-guided');
    comparison.removeAttribute('data-cinema');
  }

  function syncClips() {
    for (const clip of clips) {
      const show = !comparison.contains(clip) || (current === 1 && !comparison.hasAttribute('data-cinema'));
      if (show && visible.has(clip) && !reducedMotion.matches && !document.hidden) void clip.play().catch(() => {});
      else clip.pause();
    }
  }

  function showChapter(position: number) {
    current = position;
    showControlsChapter(position);
    comparison.dataset.phase = position === 0 ? 'before' : 'after';
    syncClips();
  }

  function chapterAnchor(position: number) {
    // The first two narrated chapters share one screen and one film.
    const target = following && position < 2 ? scenes[0] : scenes[position];
    return target === scenes[0] ? comparison : target;
  }

  function scrollToChapter(position: number) {
    chapterAnchor(position).scrollIntoView({block:'start', behavior:'instant'});
  }

  function enterChapter(position: number, start: number) {
    chapterEntry = {anchor:chapterAnchor(position), from:scrollY, start};
  }

  function scrollChapterEntry(time: number) {
    if (!chapterEntry) return;
    const {anchor, from, start} = chapterEntry;
    const progress = cueProgress(time, start, storyCues.chapterScroll, 0);
    const destination = anchor.getBoundingClientRect().top + scrollY;
    scrollGuideTo(from + (destination - from) * progress);
    if (progress === 1) {
      chapterEntry = undefined;
      if (current >= 2) comparison.removeAttribute('data-cinema');
    }
  }

  function paint() {
    const useTime = following || pausedAt === current;
    const progress = useTime && guide.duration ? guide.currentTime / guide.duration : current / chapters.length;
    meter.style.transform = 'scaleX(' + Math.min(1, progress) + ')';
    play.textContent = following ? 'Pause' : !guide.ended && pausedAt === current ? 'Weiter' : 'Projekt anschauen';
    sound.textContent = guide.muted ? 'Ton an' : 'Ton aus';
  }

  function pause() {
    ++request;
    if (!following) return;
    following = false;
    pausedAt = current;
    guide.pause();
    cancelAnimationFrame(guideFrame);
    chapterEntry = undefined;
    paint();
  }

  function manual() {
    const wasComparing = comparison.hasAttribute('data-cinema') && current === 1;
    pause();
    releaseGuide();
    if (wasComparing) {
      // Hand off at the same phase of the comparison when the visitor takes the wheel.
      scenes[1].scrollIntoView({block:'start',behavior:'instant'});
    }
    syncClips();
  }

  function offerRetry(blockedSound: boolean) {
    feedback.hidden = false;
    feedback.textContent = blockedSound ? 'Bitte tippen Sie zum Freigeben des Tons erneut auf die Wiedergabetaste.' : 'Die Aufnahme konnte nicht geladen werden. Bitte starten Sie sie erneut.';
  }

  async function run(position: number, resume: boolean, enableSound = false, offset = 0) {
    const token = ++request;
    feedback.hidden = true;
    chapterEntry = undefined;
    if (enableSound) guide.muted = false;
    if (!resume) guide.currentTime = chapters[position].start + offset;
    // Keep play() on the original click/tap, before scrolling or awaiting anything.
    const playback = guide.play();
    started = true;
    placeControls();
    setMenu(false);
    onCover = position === 0 && guide.currentTime < draftEntryStart();
    following = true;
    root.setAttribute('data-guided','');
    comparison.toggleAttribute('data-cinema', position < 2);
    showChapter(position);
    visualCue();
    cancelAnimationFrame(guideFrame);
    guideFrame=requestAnimationFrame(tick);
    const alreadyInStack = position === 4 && guide.currentTime - chapters[4].start >= storyCues.process[0]-storyCues.processScroll;
    const alreadyInBook = position === 2 && guide.currentTime-chapters[2].start >= storyCues.spreads[1]-storyCues.pageTurn/2;
    const alreadyInEditions = position === 3 && activeEdition > 0;
    if (!onCover && !alreadyInStack && !alreadyInBook && !alreadyInEditions) scrollToChapter(position);
    else if (onCover && comparison.getBoundingClientRect().top <= 0) {
      scrollGuideTo(0);
    }
    paint();
    try {
      await playback;
    } catch (e) {
      if (token !== request) return;
      pause();
      offerRetry(e instanceof DOMException && e.name === 'NotAllowedError');
    }
  }

  function draftEntryStart() {
    return storyCues.firstDraft - (reducedMotion.matches ? 0 : storyCues.chapterScroll);
  }

  function tick() {
    if (!following) return;
    const time = guide.currentTime;
    let position = 0;
    for (let i=1; i<chapters.length && time >= chapters[i].start; i++) position=i;
    if (onCover && time >= draftEntryStart()) {
      onCover = false;
      if (position < 2) enterChapter(position, draftEntryStart());
    }
    if (position !== current) {
      const sameScreen = position < 2 && current < 2;
      if (position < 2) comparison.setAttribute('data-cinema','');
      showChapter(position);
      paint();
      if (!sameScreen) enterChapter(position, chapters[position].start);
    }
    scrollChapterEntry(time);
    visualCue();
    guideFrame=requestAnimationFrame(tick);
  }
  guide.addEventListener('timeupdate', () => { if(following && guide.duration) meter.style.transform='scaleX('+guide.currentTime/guide.duration+')'; });
  guide.addEventListener('ended', () => { following=false; pausedAt=current; paint(); });
  guide.addEventListener('error', () => { pause(); offerRetry(false); });
  play.addEventListener('click', () => {
    if (following) return pause();
    if (guide.error) guide.load();
    const restart = guide.ended && current === chapters.length-1;
    let resume = !restart && !guide.ended && pausedAt === current;
    let offset = 0;
    if ((current === 2 || current === 3) && !root.hasAttribute('data-guided')) {
      const cues = current === 2 ? storyCues.spreads : storyCues.editions;
      const page = current === 2 ? Math.round(bookProgress) : activeEdition;
      offset = cues[page];
      const localTime = guide.currentTime-chapters[current].start;
      resume = resume && localTime >= offset && localTime < (cues[page+1] ?? Infinity);
    }
    void run(restart ? 0 : current, resume, false, offset);
  });
  sound.addEventListener('click', () => {
    if (following && guide.muted) { void run(current,true,true); return; }
    guide.muted = !guide.muted;
    paint();
  });
  function trackManualPosition() {
    frame=0;
    if (!started) placeControls();
    if (following) return;
    if (root.hasAttribute('data-guided')) return;
    readManualStages();
    const threshold=Math.min(innerHeight*.36,240);
    let position=0;
    for (let i=1; i<scenes.length && scenes[i].getBoundingClientRect().top <= threshold; i++) position=i;
    showChapter(position);
    paint();
  }
  window.addEventListener('scroll', () => { if (!following && !frame) frame=requestAnimationFrame(trackManualPosition); },{passive:true});
  window.addEventListener('wheel', manual,{passive:true});
  window.addEventListener('touchmove', manual,{passive:true});
  window.addEventListener('pointerdown', e=>{ if (e.clientX>=document.documentElement.clientWidth) manual(); });
  window.addEventListener('keydown', e=>{
    if (e.defaultPrevented || !(e.target instanceof HTMLElement) || e.target.closest('input,select,textarea')) return;
    if (e.key === ' ' && e.target.closest('button,summary')) return;
    if (['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key)) manual();
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden) pause(); syncClips();});
  window.addEventListener('pagehide',pause);
  const heroClip = comparison.querySelector<HTMLVideoElement>('.manual-hero')!;
  for (const video of [heroClip, guide]) {
    let frameRequest: number | undefined;
    const showFrame = () => {
      frameRequest = undefined;
      video.setAttribute('data-frame-ready', '');
    };
    video.addEventListener('playing', () => {
      if (video.hasAttribute('data-frame-ready') || frameRequest !== undefined) return;
      if (typeof video.requestVideoFrameCallback === 'function') {
        frameRequest = video.requestVideoFrameCallback(showFrame);
      } else showFrame();
    });
    const resetFrame = () => {
      if (frameRequest !== undefined) video.cancelVideoFrameCallback(frameRequest);
      frameRequest = undefined;
      video.removeAttribute('data-frame-ready');
    };
    video.addEventListener('emptied', resetFrame);
    video.addEventListener('error', resetFrame);
  }

  const observer = new IntersectionObserver(entries=>{
    for (const entry of entries) {
      const clip=entry.target as HTMLVideoElement;
      if (entry.isIntersecting) visible.add(clip); else visible.delete(clip);
    }
    syncClips();
  },{threshold:.15});
  clips.forEach(clip=>observer.observe(clip));
  reducedMotion.addEventListener('change',()=>{layoutSteps();measureStages();if(root.hasAttribute('data-guided')) visualCue();else readManualStages();syncClips();});
  layoutSteps();
  const stepObserver = new ResizeObserver(layoutSteps);
  stepObserver.observe(processHeading);
  cards.forEach(card => stepObserver.observe(card.querySelector('header')!));
  measureStages();
  window.addEventListener('resize',()=>{layoutSteps();measureStages();if (!root.hasAttribute('data-guided')) readManualStages();});
  trackManualPosition();
}
