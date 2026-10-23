import { INQUIRY_RECIPIENT } from './website-inquiry-email.js';

const labels = {
  update_frequency: { weekly: 'Jede Woche', monthly: 'Jeden Monat', rarely: 'Selten', never: 'Nie' },
  content_owner: { self: 'Ich selbst', team: 'Unser Team', external: 'Externe Betreuung', nobody: 'Niemand' },
  update_obstacle: { time: 'Zu wenig Zeit', ideas: 'Fehlende Ideen', technology: 'Umständliche Technik', none: 'Nichts, läuft gut' },
};

export function blogInquiryEmail(row) {
  // Plain text only: no user content is interpolated into HTML. Email validation
  // excludes control characters, and subject/recipient are fixed server-side.
  return {
    from: { email: 'website@notifications.vibeperform.com', name: 'VibePerform Website' },
    to: INQUIRY_RECIPIENT,
    replyTo: row.email,
    subject: `Neue Blog-Anfrage · ${row.request_id}`,
    text: [
      'Neue Anfrage zum PHP2Shell-Blogbeitrag',
      `Anfragenummer: ${row.request_id}`, `Eingang: ${row.created_at} (UTC)`,
      'Quelle: PHP2Shell · /de/blog/php2shell-sicherheitsluecke-webseite/',
      '', `E-Mail: ${row.email}`,
      `Wie oft aktualisieren Sie Ihre Webseite mit neuen Inhalten? ${labels.update_frequency[row.update_frequency]}`,
      `Wer kümmert sich bei Ihnen um neue Inhalte? ${labels.content_owner[row.content_owner]}`,
      `Was erschwert Ihnen die Pflege Ihrer Webseite? ${labels.update_obstacle[row.update_obstacle]}`,
      '', 'Die Antworten sind Selbstauskünfte, keine technische Prüfung oder Beauftragung.',
      'Antworten auf diese E-Mail erreicht die anfragende Person.',
    ].join('\n'),
  };
}

export async function notifyBlogInquiry(env, requestId, now = Math.floor(Date.now() / 1000)) {
  if (!env.INQUIRY_EMAIL?.send) return false;
  let row;
  try {
    row = await env.INQUIRIES_DB.prepare(`UPDATE blog_inquiries
      SET email_claimed_until = ?, email_attempts = email_attempts + 1
      WHERE request_id = ? AND email_sent_at IS NULL AND email_claimed_until <= ?
      RETURNING *`).bind(now + 300, requestId, now).first();
    if (!row) return false;
    const result = await env.INQUIRY_EMAIL.send(blogInquiryEmail(row));
    if (!result?.messageId) throw new Error('unconfirmed');
    await env.INQUIRIES_DB.prepare(`UPDATE blog_inquiries SET email_sent_at = ?, email_message_id = ?, email_last_error = NULL WHERE request_id = ?`)
      .bind(now, result.messageId, requestId).run();
    return true;
  } catch {
    if (row) {
      // Uncertain provider acknowledgement can cause a duplicate on retry; the
      // stable reference lets the receiver identify it. No false exactly-once claim.
      try { await env.INQUIRIES_DB.prepare(`UPDATE blog_inquiries SET email_claimed_until = ?, email_last_error = 'send_unconfirmed' WHERE request_id = ? AND email_sent_at IS NULL`)
        .bind(now + Math.min(3600, 60 * 2 ** Math.min(row.email_attempts, 6)), requestId).run(); }
      catch { /* Existing lease expires, so bookkeeping failure does not lose retry. */ }
    }
    return false;
  }
}

export async function retryBlogInquiryEmails(env) {
  if (!env.INQUIRIES_DB || !env.INQUIRY_EMAIL?.send) return;
  const now = Math.floor(Date.now() / 1000);
  const pending = await env.INQUIRIES_DB.prepare(`SELECT request_id FROM blog_inquiries WHERE email_sent_at IS NULL AND email_claimed_until <= ? ORDER BY created_at LIMIT 10`).bind(now).all();
  for (const row of pending.results) await notifyBlogInquiry(env, row.request_id, now);
}
