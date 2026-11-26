import { createInquiryEmailOutbox } from './inquiry-email-outbox.js';
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

export const { notify: notifyBlogInquiry, retry: retryBlogInquiryEmails } =
  createInquiryEmailOutbox('blog_inquiries', blogInquiryEmail);
