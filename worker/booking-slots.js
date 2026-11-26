export const timeZone = 'Europe/Berlin';
export const minute = 60_000;
export const day = 24 * 60 * minute;

const localClock = new Intl.DateTimeFormat('en-GB', {
  timeZone,
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});

function localParts(time) {
  const parts = localClock.formatToParts(time);
  const numbers = Object.fromEntries(parts.map(({ type, value }) => [type, Number(value)]));
  return Date.UTC(numbers.year, numbers.month - 1, numbers.day, numbers.hour, numbers.minute);
}

export function bookingRules(env) {
  const rules = {
    duration: Number(env.BOOKING_DURATION_MINUTES ?? 45),
    buffer: Number(env.BOOKING_BUFFER_MINUTES ?? 15),
    lead: Number(env.BOOKING_LEAD_HOURS ?? 24),
    days: Number(env.BOOKING_DAYS_AHEAD ?? 21),
    startHour: Number(env.BOOKING_START_HOUR ?? 9),
    endHour: Number(env.BOOKING_END_HOUR ?? 17),
  };
  const { duration, buffer, lead, days, startHour, endHour } = rules;
  if (!Object.values(rules).every(Number.isInteger)
    || duration < 15 || buffer < 0 || buffer > 60 || lead < 1 || lead > 168
    || days < 1 || days > 31 || lead >= days * 24
    || startHour < 6 || endHour > 23 || (endHour - startHour) * 60 < duration + buffer) {
    throw new Error('Invalid booking rules');
  }
  return rules;
}

export function bookingSlots(rules, now) {
  const slots = [];
  const firstDay = Math.floor(localParts(now) / day) * day;
  const earliest = now + rules.lead * 60 * minute;
  const latest = now + rules.days * day;
  const duration = rules.duration * minute;
  const step = duration + rules.buffer * minute;

  for (let localDay = firstDay; localDay <= localParts(latest); localDay += day) {
    const weekday = new Date(localDay).getUTCDay();
    if (weekday === 0 || weekday === 6) continue;
    const localStart = localDay + rules.startHour * 60 * minute;
    const localEnd = localDay + rules.endHour * 60 * minute;
    // Working hours come after the overnight DST change in Berlin.
    const offset = localParts(localStart) - localStart;
    for (let start = localStart - offset; start + step <= localEnd - offset; start += step) {
      if (start >= earliest && start + duration <= latest) slots.push({ start, end: start + duration });
    }
  }
  return slots;
}

export function isFree(slot, busy, buffer) {
  const padding = buffer * minute;
  return !busy.some(({ start, end }) => slot.start - padding < end && slot.end + padding > start);
}
