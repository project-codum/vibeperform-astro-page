export function mountBookingCalendar(root: HTMLElement) {
  const trigger = root.querySelector<HTMLButtonElement>('[data-booking-open]')!;
  const fallback = root.querySelector<HTMLAnchorElement>('[data-booking-fallback]')!;
  const panel = root.querySelector<HTMLElement>('[data-booking-panel]')!;
  const frame = root.querySelector<HTMLIFrameElement>('[data-booking-frame]')!;
  const close = root.querySelector<HTMLButtonElement>('[data-booking-close]')!;

  function open() {
    if (panel.hidden) {
      panel.hidden = false;
      frame.src = frame.dataset.src!;
      root.dataset.phase = 'open';
      trigger.setAttribute('aria-expanded', 'true');
      trigger.hidden = true;
    }
  }

  trigger.hidden = false;
  fallback.hidden = true;
  trigger.addEventListener('click', () => {
    open();
    panel.focus({ preventScroll: true });
  });
  close.addEventListener('click', () => {
    frame.removeAttribute('src');
    panel.hidden = true;
    root.dataset.phase = 'closed';
    trigger.hidden = false;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus({ preventScroll: true });
  });

  // A booking CTA on a page with the calendar opens the schedule before scrolling to it.
  document.querySelectorAll<HTMLAnchorElement>('[data-booking-entry]').forEach(link => {
    link.setAttribute('href', `#${root.id}`);
    link.addEventListener('click', event => {
      if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey) open();
    });
  });
}
