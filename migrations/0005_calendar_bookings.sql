CREATE TABLE IF NOT EXISTS calendar_bookings (
  request_id TEXT PRIMARY KEY NOT NULL,
  starts_at INTEGER NOT NULL,
  ends_at INTEGER NOT NULL CHECK (ends_at > starts_at),
  payload_hash TEXT NOT NULL,
  confirmed_at INTEGER
);

CREATE INDEX IF NOT EXISTS calendar_bookings_starts_at ON calendar_bookings (starts_at);
