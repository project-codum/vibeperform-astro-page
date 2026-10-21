/** Start the calendar request and its opening animation together, without delaying readiness. */
export function mountBookingCalendar(root: HTMLElement) {
  const load = root.querySelector<HTMLButtonElement>('[data-booking-load]')!;
  const fallback = root.querySelector<HTMLElement>('[data-booking-fallback]')!;
  const hide = root.querySelector<HTMLButtonElement>('[data-booking-hide]')!;
  const placeholder = root.querySelector<HTMLElement>('[data-booking-placeholder]')!;
  const panel = root.querySelector<HTMLElement>('[data-booking-panel]')!;
  const frame = root.querySelector<HTMLIFrameElement>('[data-booking-frame]')!;
  const status = root.querySelector<HTMLElement>('[data-booking-status]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let opening: Animation | undefined;
  load.hidden = false;
  fallback.hidden = true;
  const loaded = () => {
    if (!frame.hasAttribute('src')) return;
    root.dataset.phase = 'ready';
    panel.setAttribute('aria-busy', 'false');
    status.hidden = true;
  };
  const stopOpening = () => { opening?.cancel(); opening = undefined; };
  const open = () => {
    if (root.dataset.phase !== 'closed') return;
    root.dataset.phase = 'loading';
    placeholder.hidden = true;
    panel.hidden = false;
    status.hidden = false;
    panel.setAttribute('aria-busy', 'true');
    load.setAttribute('aria-expanded', 'true');
    frame.src = frame.dataset.src!;
    if (!reduced.matches && typeof panel.animate === 'function') {
      stopOpening();
      opening = panel.animate([
        { opacity: .3, clipPath: 'inset(0 0 98% 0 round 16px)', transform: 'translateY(14px) scale(.985)' },
        { opacity: 1, clipPath: 'inset(0 0 0 0 round 16px)', transform: 'translateY(0) scale(1)' },
      ], { duration: 760, easing: 'cubic-bezier(.22,.7,.2,1)' });
    }
    frame.focus({ preventScroll: true });
  };
  const close = () => {
    stopOpening();
    frame.removeAttribute('src');
    root.dataset.phase = 'closed';
    panel.setAttribute('aria-busy', 'false');
    panel.hidden = true;
    placeholder.hidden = false;
    load.setAttribute('aria-expanded', 'false');
    load.focus({ preventScroll: true });
  };
  reduced.addEventListener('change', stopOpening);
  frame.addEventListener('load', loaded);
  load.addEventListener('click', open);
  hide.addEventListener('click', close);
  return { destroy() { close(); reduced.removeEventListener('change', stopOpening); frame.removeEventListener('load', loaded); load.removeEventListener('click', open); hide.removeEventListener('click', close); } };
}
