CREATE TABLE IF NOT EXISTS blog_inquiries (
  request_id TEXT PRIMARY KEY,
  payload_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  source TEXT NOT NULL CHECK (source = 'php2shell'),
  update_frequency TEXT NOT NULL CHECK (update_frequency IN ('weekly', 'monthly', 'rarely', 'never')),
  content_owner TEXT NOT NULL CHECK (content_owner IN ('self', 'team', 'external', 'nobody')),
  update_obstacle TEXT NOT NULL CHECK (update_obstacle IN ('time', 'ideas', 'technology', 'none')),
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  email_sent_at INTEGER,
  email_message_id TEXT,
  email_claimed_until INTEGER NOT NULL DEFAULT 0,
  email_attempts INTEGER NOT NULL DEFAULT 0,
  email_last_error TEXT
);
CREATE INDEX IF NOT EXISTS blog_inquiries_created_at ON blog_inquiries(created_at);
CREATE INDEX IF NOT EXISTS blog_inquiries_email_pending ON blog_inquiries(email_sent_at, email_claimed_until);
