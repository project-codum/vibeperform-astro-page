export const INQUIRY_RECIPIENT = 'contact@vibeperform.com';
const labels = {
 project_type: {new:'Neue Website',improve:'Bestehende Website verbessern',unsure:'Noch nicht sicher'},
 business_type: {'property-maintenance':'Hausmeisterservice',joinery:'Schreinerei',carpentry:'Zimmerei',construction:'Bauunternehmen',other:'Anderes Handwerk'},
 priority: {services:'Leistungen verständlich erklären',portfolio:'Eigene Arbeiten zeigen',enquiries:'Passendere Projektanfragen',hiring:'Mitarbeiter gewinnen',appearance:'Außenwirkung professionell aufbauen',unsure:'Noch nicht sicher'},
};
export function inquiryEmail(row) {
 return {
  from: {email:'website@notifications.vibeperform.com',name:'VibePerform Website'},
  to: INQUIRY_RECIPIENT,
  replyTo: row.email,
  subject: `Neue Website-Anfrage · ${row.request_id}`,
  text: [
   'Neue Anfrage über die VibePerform-Website',
   `Anfragenummer: ${row.request_id}`, `Eingang: ${row.created_at} (UTC)`, `Sprache: ${row.locale.toUpperCase()}`,
   '', `E-Mail: ${row.email}`, `Vorhaben: ${labels.project_type[row.project_type] || row.project_type}`,
   `Betrieb: ${labels.business_type[row.business_type] || row.business_type}${row.other_trade ? ' – '+row.other_trade : ''}`,
   `Schwerpunkt: ${labels.priority[row.priority] || row.priority}`, `Vorhandene Website: ${row.website || 'Keine Angabe'}`,
   '', 'Nachricht:', row.message || 'Keine Ergänzung', '', 'Antworten auf diese E-Mail erreicht die anfragende Person.',
  ].join('\n'),
 };
}

// Durable outbox in the enquiry row; never include customer contents in logs.
export async function notifyInquiry(env, requestId, now = Math.floor(Date.now()/1000)) {
 if (!env.INQUIRY_EMAIL?.send) return false;
 let row;
 try {
  row = await env.INQUIRIES_DB.prepare(`UPDATE website_inquiries
   SET email_claimed_until = ?, email_attempts = email_attempts + 1
   WHERE request_id = ? AND email_sent_at IS NULL AND email_claimed_until <= ?
   RETURNING *`).bind(now+300, requestId, now).first();
  if (!row) return false;
  const result = await env.INQUIRY_EMAIL.send(inquiryEmail(row));
  if (!result?.messageId) throw new Error('unconfirmed');
  await env.INQUIRIES_DB.prepare(`UPDATE website_inquiries SET email_sent_at = ?, email_message_id = ?, email_last_error = NULL WHERE request_id = ?`)
   .bind(now,result.messageId,requestId).run();
  return true;
 } catch {
  if (row) {
   // An uncertain provider response can lead to a duplicate on retry; request ID remains stable.
   try { await env.INQUIRIES_DB.prepare(`UPDATE website_inquiries SET email_claimed_until = ?, email_last_error = 'send_unconfirmed' WHERE request_id = ? AND email_sent_at IS NULL`)
    .bind(now+Math.min(3600,60*2**Math.min(row.email_attempts,6)),requestId).run(); } catch { /* Lease expires for retry even if bookkeeping fails. */ }
  }
  return false;
 }
}
export async function retryInquiryEmails(env) {
 if (!env.INQUIRIES_DB || !env.INQUIRY_EMAIL?.send) return;
 const now=Math.floor(Date.now()/1000);
 const pending=await env.INQUIRIES_DB.prepare(`SELECT request_id FROM website_inquiries WHERE email_sent_at IS NULL AND email_claimed_until <= ? ORDER BY created_at LIMIT 10`).bind(now).all();
 for (const row of pending.results) await notifyInquiry(env,row.request_id,now);
}
