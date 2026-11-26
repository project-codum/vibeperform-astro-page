CREATE TABLE IF NOT EXISTS web_check_requests (
  request_id TEXT PRIMARY KEY,
  payload_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  locale TEXT NOT NULL CHECK (locale IN ('de', 'en')),
  website TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  email_sent_at INTEGER,
  email_message_id TEXT,
  email_claimed_until INTEGER NOT NULL DEFAULT 0,
  email_attempts INTEGER NOT NULL DEFAULT 0,
  email_last_error TEXT
);

CREATE INDEX IF NOT EXISTS web_check_email_pending ON web_check_requests(email_sent_at, email_claimed_until);
