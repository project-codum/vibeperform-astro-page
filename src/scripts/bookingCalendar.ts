interface Availability {
  timeZone: string;
  duration: number;
  slots: string[];
}

interface BookingResult {
  ok?: boolean;
  error?: string;
  meetUrl?: string;
}

const slotsEndpoint = '/api/booking/slots';
const bookingEndpoint = '/api/booking/reservations';

export function mountBookingCalendar(root: HTMLElement) {
  function find<T extends HTMLElement>(name: string) {
    return root.querySelector<T>(`[data-booking-${name}]`)!;
  }

  const copy = JSON.parse(root.dataset.copy!) as Record<string, string>;
  const locale = root.lang === 'de' ? 'de-DE' : 'en-GB';
  const load = find<HTMLButtonElement>('load');
  const fallback = find('fallback');
  const hide = find<HTMLButtonElement>('hide');
  const placeholder = find('placeholder');
  const panel = find('panel');
  const form = find<HTMLFormElement>('form');
  const picker = find('picker');
  const skeleton = find('skeleton');
  const availability = find('availability');
  const alternative = find('alternative');
  const dayOptions = find('days');
  const slots = find('slots');
  const details = find('details');
  const emailField = find('email-field');
  const privacy = find('privacy');
  const submit = find<HTMLButtonElement>('submit');
  const message = find('message');
  const success = find('success');
  const meet = find<HTMLAnchorElement>('meet');
  const nameInput = form.elements.namedItem('name') as HTMLInputElement;
  const emailInput = form.elements.namedItem('email') as HTMLInputElement;
  const contactNote = form.elements.namedItem('contactNote') as HTMLInputElement;
  const submitText = submit.firstChild!;

  let days: string[][] = [];
  let selectedDay = 0;
  let selectedSlot = '';
  let requestId = '';
  let opened = false;
  let busy = false;
  let needsConfirmation = false;
  let loadController: AbortController | undefined;
  let dayLabel: Intl.DateTimeFormat;
  let timeLabel: Intl.DateTimeFormat;

  function describe(slot: string) {
    const date = new Date(slot);
    return `${dayLabel.format(date)} · ${timeLabel.format(date)}${locale === 'de-DE' ? ' Uhr' : ''}`;
  }

  function notify(node: HTMLElement, text = '') {
    node.textContent = text;
    node.hidden = !text;
  }

  function syncControls() {
    const hasSlot = Boolean(selectedSlot);
    const hasName = hasSlot && Boolean(nameInput.value.trim());
    details.hidden = !hasSlot;
    nameInput.disabled = !hasSlot;
    emailField.hidden = !hasName;
    emailInput.disabled = !hasName;
    const complete = hasName && emailInput.validity.valid;
    submit.hidden = !complete;
    privacy.hidden = !complete;
    submit.disabled = busy || !complete;
    const selectionDisabled = busy || needsConfirmation;
    dayOptions.querySelectorAll('button').forEach((button, index) => {
      button.disabled = selectionDisabled;
      button.setAttribute('aria-pressed', String(index === selectedDay));
    });
    slots.querySelectorAll('button').forEach(button => {
      button.disabled = selectionDisabled;
      button.setAttribute('aria-pressed', String(button.value === selectedSlot));
    });
    nameInput.readOnly = busy || needsConfirmation;
    emailInput.readOnly = busy || needsConfirmation;
    if (hide) hide.disabled = busy || needsConfirmation;
    panel.setAttribute('aria-busy', String(busy || root.dataset.phase === 'loading'));
    submitText.textContent = busy ? copy.booking : needsConfirmation ? copy.retry : copy.book;
  }

  function select(slot: string) {
    if (selectedSlot !== slot) requestId = '';
    selectedSlot = slot;
    syncControls();
  }

  function showDay(index: number) {
    const times = days[index];
    if (!times) return;
    selectedDay = index;
    slots.replaceChildren(...times.map(slot => {
      const button = document.createElement('button');
      button.type = 'button';
      button.value = slot;
      button.textContent = timeLabel.format(new Date(slot));
      return button;
    }));
    select('');
  }

  async function loadSlots(refresh = false) {
    loadController?.abort();
    const controller = new AbortController();
    loadController = controller;
    root.dataset.phase = 'loading';
    picker.hidden = true;
    skeleton.hidden = false;
    alternative.hidden = true;
    notify(availability);
    select('');

    try {
      const response = await fetch(slotsEndpoint, {
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(12_000)]),
        cache: refresh ? 'reload' : 'default',
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Availability unavailable');
      const data = await response.json() as Availability;
      if (controller.signal.aborted) return;
      if (!Array.isArray(data.slots) || !data.slots.every(slot => Number.isFinite(Date.parse(slot)))
        || !Number.isInteger(data.duration) || data.timeZone !== 'Europe/Berlin') throw new Error('Invalid availability');

      const timeZone = data.timeZone;
      const dateKey = new Intl.DateTimeFormat('en-CA', { timeZone, dateStyle: 'short' });
      dayLabel = new Intl.DateTimeFormat(locale, { timeZone, weekday: 'short', day: 'numeric', month: 'short' });
      timeLabel = new Intl.DateTimeFormat(locale, { timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
      const grouped = new Map<string, string[]>();
      for (const slot of data.slots) {
        const day = dateKey.format(new Date(slot));
        if (!grouped.has(day)) grouped.set(day, []);
        grouped.get(day)!.push(slot);
      }
      days = [...grouped.values()];

      find('duration').textContent = `${data.duration} ${locale === 'de-DE' ? 'Min.' : 'min'}`;
      find('zone').hidden = false;

      if (!days.length) {
        notify(availability, copy.empty);
        alternative.hidden = false;
        root.dataset.phase = 'empty';
        return;
      }
      const weekdayLabel = new Intl.DateTimeFormat(locale, { timeZone, weekday: 'short' });
      const dateLabel = new Intl.DateTimeFormat(locale, { timeZone, day: 'numeric', month: 'short' });
      dayOptions.replaceChildren(...days.map(([slot], index) => {
        const date = new Date(slot);
        const button = document.createElement('button');
        const weekday = document.createElement('span');
        const calendarDate = document.createElement('span');
        button.type = 'button';
        button.value = String(index);
        button.setAttribute('aria-label', dayLabel.format(date));
        weekday.textContent = weekdayLabel.format(date);
        calendarDate.textContent = dateLabel.format(date);
        button.append(weekday, calendarDate);
        return button;
      }));
      picker.hidden = false;
      showDay(0);
      root.dataset.phase = 'ready';
      if (refresh) slots.querySelector('button')?.focus({ preventScroll: true });
    } catch {
      if (controller.signal.aborted) return;
      notify(availability, copy.unavailable);
      alternative.hidden = false;
      root.dataset.phase = 'unavailable';
    } finally {
      if (!controller.signal.aborted) {
        skeleton.hidden = true;
        syncControls();
      }
    }
  }

  function open(moveFocus: boolean) {
    if (opened) return;
    opened = true;
    placeholder.hidden = true;
    panel.hidden = false;
    load.setAttribute('aria-expanded', 'true');
    if (moveFocus) {
      panel.tabIndex = -1;
      panel.focus({ preventScroll: true });
    }
    if (success.hidden) void loadSlots();
  }

  load.hidden = false;
  fallback.hidden = true;
  load.addEventListener('click', () => open(true));
  hide?.addEventListener('click', () => {
    opened = false;
    loadController?.abort();
    root.dataset.phase = 'closed';
    panel.hidden = true;
    placeholder.hidden = false;
    load.setAttribute('aria-expanded', 'false');
    load.focus({ preventScroll: true });
  });

  dayOptions.addEventListener('click', event => {
    const button = (event.target as Element).closest('button');
    if (!button || button.disabled) return;
    const index = Number(button.value);
    if (index !== selectedDay) showDay(index);
  });
  slots.addEventListener('click', event => {
    if (!(event.target instanceof HTMLButtonElement) || event.target.disabled) return;
    select(event.target.value);
    notify(message);
    nameInput.focus();
  });

  function updateContactDetails() {
    requestId = '';
    syncControls();
  }
  for (const input of [nameInput, emailInput]) {
    input.addEventListener('input', updateContactDetails);
    input.addEventListener('change', syncControls);
  }
  nameInput.addEventListener('keydown', event => {
    if (event.key !== 'Enter' || event.isComposing || emailInput.disabled || nameInput.readOnly) return;
    event.preventDefault();
    emailInput.focus();
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submit.disabled || !form.reportValidity()) return;
    busy = true;
    syncControls();
    notify(message);

    try {
      requestId ||= crypto.randomUUID();
      const response = await fetch(bookingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          requestId, start: selectedSlot, locale: root.lang,
          name: nameInput.value, email: emailInput.value, contactNote: contactNote.value,
        }),
        signal: AbortSignal.timeout(24_000),
      });
      const result = await response.json() as BookingResult;
      if (response.ok && result.ok) {
        find('confirmed-time').textContent = describe(selectedSlot);
        if (result.meetUrl && /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/.test(result.meetUrl)) {
          meet.href = result.meetUrl;
          meet.hidden = false;
        }
        root.dataset.phase = 'booked';
        form.reset();
        form.hidden = true;
        success.hidden = false;
        success.focus({ preventScroll: true });
      } else if (result.error === 'slot_taken') {
        needsConfirmation = false;
        notify(message, copy.taken);
        void loadSlots(true);
      } else if (result.error === 'booking_unconfirmed') {
        needsConfirmation = true;
        notify(message, copy.unconfirmed);
      } else {
        notify(message, response.status === 429 ? copy.limited : response.status === 422 ? copy.invalid : copy.failed);
      }
    } catch {
      needsConfirmation = true;
      notify(message, copy.unconfirmed);
    } finally {
      busy = false;
      syncControls();
    }
  });

  if (root.dataset.autoOpen === 'true') open(false);
}
