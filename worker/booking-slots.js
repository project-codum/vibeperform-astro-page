export const timeZone = 'Europe/Berlin';
export const minute = 60_000;
const day = 24 * 60 * minute;

export function bookingRules(env) {
  const rules = {
    duration: Number(env.BOOKING_DURATION_MINUTES ?? 45),
    buffer: Number(env.BOOKING_BUFFER_MINUTES ?? 15),
    lead: Number(env.BOOKING_LEAD_HOURS ?? 0),
    days: Number(env.BOOKING_DAYS_AHEAD ?? 21),
  };
  const { duration, buffer, lead, days } = rules;
  if (!Object.values(rules).every(Number.isInteger)
    || duration < 15 || duration > 180 || buffer < 0 || buffer > 60 || lead < 0
    || days < 1 || days > 31 || lead >= days * 24) {
    throw new Error('Invalid booking rules');
  }
  return rules;
}

export function bookingRange(rules, now) {
  return { start: now + rules.lead * 60 * minute, end: now + rules.days * day };
}

export function bookingSlots(rules, now, windows) {
  const range = bookingRange(rules, now);
  const duration = rules.duration * minute;
  const step = duration + rules.buffer * minute;
  const starts = new Set();

  for (const window of windows) {
    const stepsToStart = Math.max(0, Math.ceil((range.start - window.start) / step));
    const latestEnd = Math.min(window.end, range.end);
    for (let start = window.start + stepsToStart * step; start + duration <= latestEnd; start += step) {
      starts.add(start);
    }
  }

  return [...starts].sort((a, b) => a - b).map(start => ({ start, end: start + duration }));
}

export function isFree(slot, busy, buffer) {
  const padding = buffer * minute;
  return !busy.some(({ start, end }) => slot.start - padding < end && slot.end + padding > start);
}
