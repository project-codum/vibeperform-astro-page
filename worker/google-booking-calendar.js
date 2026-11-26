import { timeZone } from './booking-slots.js';

const api = 'https://www.googleapis.com/calendar/v3';
const tokens = new WeakMap();

export class CalendarError extends Error {
  constructor(status) {
    super('Google Calendar request failed');
    this.status = status;
  }
}

async function jsonRequest(url, options) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw new CalendarError(response.status);
  return response.json();
}

async function accessToken(env) {
  const current = tokens.get(env);
  if (current && current.expiresAt > Date.now()) return current.token;
  const value = await jsonRequest('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: env.BOOKING_GOOGLE_CLIENT_ID,
      client_secret: env.BOOKING_GOOGLE_CLIENT_SECRET,
      refresh_token: env.BOOKING_GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  if (!value.access_token) throw new Error('Google credential unavailable');
  const expiresAt = Date.now() + Math.max(0, value.expires_in - 60) * 1000;
  tokens.set(env, { token: value.access_token, expiresAt });
  return value.access_token;
}

export function googleCalendar(env) {
  const calendarPath = `/calendars/${encodeURIComponent(env.BOOKING_CALENDAR_ID)}/events`;
  const availabilityId = env.BOOKING_AVAILABILITY_CALENDAR_ID || env.BOOKING_CALENDAR_ID;
  const availabilityPath = `/calendars/${encodeURIComponent(availabilityId)}/events`;
  const extras = (env.BOOKING_BUSY_CALENDAR_IDS ?? '').split(',').map(id => id.trim()).filter(Boolean);
  const calendarIds = [...new Set([availabilityId, env.BOOKING_CALENDAR_ID, ...extras])];

  async function request(path, body) {
    const token = await accessToken(env);
    try {
      return await jsonRequest(api + path, {
        method: body ? 'POST' : 'GET',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (error) {
      if (error.status === 401) tokens.delete(env);
      throw error;
    }
  }

  return {
    async windows(start, end) {
      const query = new URLSearchParams({
        timeMin: new Date(start).toISOString(),
        timeMax: new Date(end).toISOString(),
        timeZone,
        singleEvents: 'true',
        showDeleted: 'false',
        q: 'Buchbar',
        maxResults: '250',
        fields: 'nextPageToken,items(summary,status,transparency,start(dateTime),end(dateTime))',
      });
      const windows = [];
      for (let page = 0; page < 20; page++) {
        const response = await request(`${availabilityPath}?${query}`);
        const events = response.items ?? [];
        if (!Array.isArray(events)) throw new Error('Calendar events unavailable');
        for (const event of events) {
          if (event.summary?.trim().toLowerCase() !== 'buchbar' || event.status === 'cancelled'
            || event.transparency !== 'transparent' || !event.start?.dateTime || !event.end?.dateTime) continue;
          const start = Date.parse(event.start.dateTime);
          const end = Date.parse(event.end.dateTime);
          if (start < end) windows.push({ start, end });
        }
        if (!response.nextPageToken) return windows;
        query.set('pageToken', response.nextPageToken);
      }
      throw new Error('Too many Calendar event pages');
    },
    async busy(start, end) {
      const response = await request('/freeBusy', {
        timeMin: new Date(start).toISOString(),
        timeMax: new Date(end).toISOString(),
        timeZone,
        items: calendarIds.map(id => ({ id })),
      });
      return calendarIds.flatMap(id => {
        const calendar = response.calendars?.[id];
        if (!Array.isArray(calendar?.busy) || calendar.errors?.length) throw new Error('Calendar availability unavailable');
        return calendar.busy.map(interval => {
          const start = Date.parse(interval.start);
          const end = Date.parse(interval.end);
          if (!(start < end)) throw new Error('Invalid busy interval');
          return { start, end };
        });
      });
    },
    get(id) {
      return request(`${calendarPath}/${id}?fields=id,status,hangoutLink,conferenceData(createRequest/status/statusCode)`);
    },
    insert(id, slot, booking) {
      return request(`${calendarPath}?sendUpdates=all&conferenceDataVersion=1`, {
        id,
        summary: booking.locale === 'de' ? 'Kennenlerngespräch mit VibePerform' : 'Introductory call with VibePerform',
        start: { dateTime: new Date(slot.start).toISOString(), timeZone },
        end: { dateTime: new Date(slot.end).toISOString(), timeZone },
        visibility: 'private',
        transparency: 'opaque',
        guestsCanInviteOthers: false,
        attendees: [{ email: booking.email }],
        conferenceData: {
          createRequest: { requestId: id, conferenceSolutionKey: { type: 'hangoutsMeet' } },
        },
      });
    },
  };
}
