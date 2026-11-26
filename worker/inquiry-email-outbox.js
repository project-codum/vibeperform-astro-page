// Table identifiers and message builders are supplied by Worker modules.
export function createInquiryEmailOutbox(table, message) {
  async function notify(env, requestId, now = Math.floor(Date.now() / 1000)) {
    if (!env.INQUIRY_EMAIL?.send) return false;
    let row;
    try {
      row = await env.INQUIRIES_DB.prepare(`UPDATE ${table}
        SET email_claimed_until = ?, email_attempts = email_attempts + 1
        WHERE request_id = ? AND email_sent_at IS NULL AND email_claimed_until <= ?
        RETURNING *`).bind(now + 300, requestId, now).first();
      if (!row) return false;
      const result = await env.INQUIRY_EMAIL.send(message(row));
      if (!result?.messageId) throw new Error('unconfirmed');
      await env.INQUIRIES_DB.prepare(`UPDATE ${table} SET email_sent_at = ?, email_message_id = ?, email_last_error = NULL WHERE request_id = ?`)
        .bind(now, result.messageId, requestId).run();
      return true;
    } catch {
      if (row) {
        // Uncertain provider acknowledgement can cause a duplicate on retry; the
        // stable reference lets the receiver identify it. No false exactly-once claim.
        try { await env.INQUIRIES_DB.prepare(`UPDATE ${table} SET email_claimed_until = ?, email_last_error = 'send_unconfirmed' WHERE request_id = ? AND email_sent_at IS NULL`)
          .bind(now + Math.min(3600, 60 * 2 ** Math.min(row.email_attempts, 6)), requestId).run(); }
        catch { /* Existing lease expires, so bookkeeping failure does not lose retry. */ }
      }
      return false;
    }
  }

  async function retry(env) {
    if (!env.INQUIRIES_DB || !env.INQUIRY_EMAIL?.send) return;
    const now = Math.floor(Date.now() / 1000);
    const pending = await env.INQUIRIES_DB.prepare(`SELECT request_id FROM ${table} WHERE email_sent_at IS NULL AND email_claimed_until <= ? ORDER BY created_at LIMIT 10`).bind(now).all();
    for (const row of pending.results) await notify(env, row.request_id, now);
  }
  return { notify, retry };
}
