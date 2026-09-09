# Formularzustellung an contact@vibeperform.com

Stand 09.09.2026: Auf Cloudflare deployt. Kostenloser Versand an die bestätigte Zieladresse durch eine echte, ausdrücklich freigegebene Testanfrage bis in den Posteingang verifiziert.

## Weg einer Anfrage

Browser → `POST /api/website-inquiries` → Prüfung und Speicherung in D1 → Cloudflare-E-Mail-Binding `INQUIRY_EMAIL` → **contact@vibeperform.com**.

Absender ist `website@notifications.vibeperform.com` (VibePerform Website). Reply-To ist die E-Mail-Adresse der anfragenden Person. Die Nachricht enthält Vorhaben, Betriebsart, Schwerpunkt, Website, Freitext, Kontaktdaten, Sprache und Anfragenummer. Der Empfänger ist serverseitig festgelegt und zusätzlich in Wrangler auf contact@vibeperform.com beschränkt; Besucher können ihn nicht überschreiben.

## Gesicherter Versand

Migration `0002_inquiry_email_outbox.sql` ergänzt die gespeicherte Anfrage um Versandstatus, Anbieter-Nachrichten-ID, Versuchszähler und eine zeitliche Sperre. Ein erfolgreicher Formularabschluss bestätigt die Speicherung, nicht den Posteingang einer E-Mail. Fehlgeschlagener Mailversand löscht keine Anfrage. Der Worker versucht offene Benachrichtigungen alle fünf Minuten erneut (bis zu zehn pro Lauf, steigender Abstand bei Fehlern). Parallelversuche werden mit einer atomaren Datenbanksperre vermieden.

Eine unklare Providerantwort oder ein Prozessabbruch nach erfolgreichem Versand vor Speicherung der Nachrichten-ID kann beim erneuten Versuch eine doppelte E-Mail erzeugen. Die eindeutige Anfragenummer bleibt gleich. Anbieterannahme ist keine Garantie für Zustellung in den Posteingang; Bounces und unerledigte Anfragen müssen beim Betrieb geprüft werden. Es werden keine Mailinhalte in Anwendungslogs ausgegeben.

## Verifizierter Konfigurationsstand und Aktivierung

- Cloudflare-Konto: `78865fc42c053030981981fb6feb742e`.
- contact@vibeperform.com wurde am 09.09.2026 bestätigt. Destination: `30365c1296264353b134cbee52e87a13`.
- Kostenloses Email Routing ausschließlich für `notifications.vibeperform.com` aktiviert; API bestätigt `enabled: true`, `status: ready`. Routing-ID: `daf6c3bc59f04a0c89c7e9d7fbd17c1a`.
- Die Google-MX-Einträge der Hauptdomain werden nicht geändert. Versand erfolgt nur an die bestätigte Empfängeradresse. Dafür ist laut Cloudflare kein Workers-Paid-Tarif notwendig.
- Migration 0002 wurde lokal angewandt. Remote übernimmt die bestehende GitHub-Actions-Pipeline die Migration vor Deployment.
- GitHub-Actions-Token `GitHub Actions - vibeperform-site` erhielt nach ausdrücklicher Freigabe zusätzlich D1 Write; übrige Rechte unverändert.
- Migration 0002 und Worker-Deployment am 09.09.2026 über GitHub Actions erfolgreich. Die erste sofortige Live-Prüfung traf noch eine nicht verfügbare neue EN-Route; die anschließende vollständige Prüfung bestätigte 128 öffentliche Dateien und 24/24 Sitemap-Seiten. Die Pipeline wiederholt die Prüfung künftig höchstens dreimal mit je 15 Sekunden Pause.
- Echte Testanfrage `0ccf94ad-cd10-4ce4-8191-d0fe28913fa7`, 09.09.2026 12:52 UTC: HTTP 200, Erfolgsansicht, D1 gespeichert, ein Versandversuch, Anbieter-Nachrichten-ID gespeichert, kein Versandfehler. E-Mail an contact@vibeperform.com im angeschlossenen Google-Posteingang angekommen (INBOX). Testdatensatz ist als Test gekennzeichnet und bleibt zur Nachvollziehbarkeit gespeichert.

## Validierung

29 Tests inklusive DE/EN-Speicherung, festem Empfänger, allen Antworten, Reply-To, Versandfehlern, Wiederholungen und konkurrierenden Zustellversuchen. Wrangler dry-run bestätigt das Send-Email-Binding. Separater Live-Test mit ausdrücklich freigegebenen Testdaten bestätigt die tatsächliche Zustellung.

## Quellen

- [Cloudflare: Workers-E-Mail-API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/)
- [Cloudflare: Empfängerbeschränkung](https://developers.cloudflare.com/email-service/configuration/send-bindings/)
- [Cloudflare: Domainkonfiguration für Senden und Empfangen](https://developers.cloudflare.com/email-service/configuration/domains/)

- [Cloudflare: Kostenloser Versand an bestätigte Empfänger](https://developers.cloudflare.com/email-service/platform/pricing/)
