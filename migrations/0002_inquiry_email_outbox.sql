ALTER TABLE website_inquiries ADD COLUMN email_sent_at INTEGER;
ALTER TABLE website_inquiries ADD COLUMN email_message_id TEXT;
ALTER TABLE website_inquiries ADD COLUMN email_claimed_until INTEGER NOT NULL DEFAULT 0;
ALTER TABLE website_inquiries ADD COLUMN email_attempts INTEGER NOT NULL DEFAULT 0;
ALTER TABLE website_inquiries ADD COLUMN email_last_error TEXT;
CREATE INDEX website_inquiries_email_pending ON website_inquiries(email_sent_at, email_claimed_until);
