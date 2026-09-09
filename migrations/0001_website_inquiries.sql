CREATE TABLE IF NOT EXISTS website_inquiries (
  request_id TEXT PRIMARY KEY,
  payload_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  locale TEXT NOT NULL CHECK (locale IN ('de', 'en')),
  project_type TEXT NOT NULL,
  business_type TEXT NOT NULL,
  other_trade TEXT NOT NULL DEFAULT '',
  priority TEXT NOT NULL,
  website TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
);
CREATE INDEX IF NOT EXISTS website_inquiries_created_at ON website_inquiries(created_at);
