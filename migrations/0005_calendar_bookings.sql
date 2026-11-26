CREATE TABLE IF NOT EXISTS calendar_bookings (
  starts_at INTEGER PRIMARY KEY,
  request_id TEXT NOT NULL UNIQUE,
  payload_hash TEXT NOT NULL
);
