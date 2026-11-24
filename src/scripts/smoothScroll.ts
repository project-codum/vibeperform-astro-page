import Lenis from 'lenis';

/** Keep the document's native scroll position, sticky elements and scroll events. */
export function mountSmoothScroll() {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let lenis: Lenis | undefined;
  let frame = 0;
  let lastFrameTime = 0;
  let animationTime = 0;

  // Advance only while easing a gesture or anchor navigation, never while idle.
  const tick = (time: number) => {
    frame = 0;
    if (!lenis || document.hidden) { lastFrameTime = 0; return; }
    animationTime += lastFrameTime ? Math.min(time - lastFrameTime, 64) : 1000 / 60;
    lastFrameTime = time;
    lenis.raf(animationTime);
    if (lenis.isScrolling === 'smooth') frame = requestAnimationFrame(tick);
    else lastFrameTime = 0;
  };
  const wake = () => {
    if (!frame && !document.hidden) frame = requestAnimationFrame(tick);
  };
  const pause = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrameTime = 0;
  };

  const syncLock = () => {
    if (!lenis) return;
    const root = document.documentElement;
    const locked = root.classList.contains('hcs-dialog-open') ||
      !!document.querySelector('dialog:modal') ||
      root.style.overflow === 'hidden' || root.style.overflowY === 'hidden' ||
      document.body.style.overflow === 'hidden' || document.body.style.overflowY === 'hidden';
    if (locked) lenis.stop();
    else lenis.start();
  };

  const syncMotion = () => {
    if (reducedMotion.matches) {
      pause();
      lenis?.destroy();
      lenis = undefined;
    } else if (!lenis) {
      lenis = new Lenis({
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        allowNestedScroll: true,
        // The handler below also preserves URL history and keyboard focus.
        anchors: false,
        stopInertiaOnNavigate: true,
        prevent: node => node.matches('dialog, [data-booking-calendar]'),
      });
      lenis.on('virtual-scroll', ({ event }) => {
        if (event.type === 'wheel') wake();
      });
      syncLock();
    }
  };

  const cancelInertia = () => lenis?.scrollTo(window.scrollY, { immediate: true });
  const onKeyDown = (event: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) cancelInertia();
  };

  const onAnchor = (event: MouseEvent) => {
    if (!lenis || lenis.isStopped || event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.composedPath().find(node => node instanceof HTMLAnchorElement) as HTMLAnchorElement | undefined;
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname ||
      url.search !== location.search || !url.hash) return;
    let id: string;
    try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    if (location.hash !== url.hash) history.pushState(null, '', url);
    // A focus change may have scrolled natively while wheel inertia was active.
    cancelInertia();
    lenis.scrollTo(target, {
      onStart: wake,
      duration: 1,
      lerp: 0,
      onComplete: () => {
        // Match native fragment navigation for skip links and keyboard users.
        const temporaryTabindex = !target.hasAttribute('tabindex');
        if (temporaryTabindex) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        if (temporaryTabindex) {
          if (document.activeElement === target) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
          else target.removeAttribute('tabindex');
        }
      },
    });
  };

  const onVisibility = () => {
    if (document.hidden) { cancelInertia(); pause(); }
  };
  document.addEventListener('visibilitychange', onVisibility);
  const locks = new MutationObserver(syncLock);
  locks.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
  locks.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });
  // Native dialogs may be added dynamically, or closed with Escape.
  const dialogs = new MutationObserver(syncLock);
  dialogs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });
  document.addEventListener('click', onAnchor);
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('focusin', cancelInertia);
  window.addEventListener('popstate', cancelInertia);
  reducedMotion.addEventListener('change', syncMotion);
  syncMotion();

  return () => {
    pause();
    document.removeEventListener('visibilitychange', onVisibility);
    locks.disconnect();
    dialogs.disconnect();
    document.removeEventListener('click', onAnchor);
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('focusin', cancelInertia);
    window.removeEventListener('popstate', cancelInertia);
    reducedMotion.removeEventListener('change', syncMotion);
    lenis?.destroy();
  };
}
