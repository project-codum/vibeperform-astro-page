# Blog-Anfragen: Backend-Übergabe

Stand: 23.10.2026. Quellimplementierung in der lokalen Artikelvorschau; kein Deployment, keine produktiven Datenbankänderungen und keine tatsächlichen Benachrichtigungen ausgeführt. Tests verwenden SQLite im Arbeitsspeicher und eine simulierte E-Mail-Bindung.

## API-Vertrag

`POST /api/blog-inquiries`, gleicher Origin, `Content-Type: application/json`, höchstens 8 KiB einschließlich tatsächlich gelesener Bytes.

```json
{
  "requestId": "UUID v4, pro Anfrage stabil auch bei Wiederholungsversuchen",
  "updateFrequency": "weekly | monthly | rarely | never",
  "contentOwner": "self | team | external | nobody",
  "updateObstacle": "time | ideas | technology | none",
  "email": "name@example.com",
  "companyWebsite": ""
}
```

`companyWebsite` ist ausschließlich eine leere Spamfalle. `source` wird serverseitig auf `php2shell` gesetzt. Zusätzliche Clientfelder beeinflussen weder Herkunft noch Empfänger. `never` bedeutet **nie aktualisiert**. `contentOwner` erfasst die Zuständigkeit für neue Inhalte: Ich selbst, Unser Team, Externe Betreuung oder Niemand. `updateObstacle` erfasst Zu wenig Zeit, Fehlende Ideen, Umständliche Technik oder Nichts, läuft gut. Daraus wird kein Interesse an einer neuen Webseite abgeleitet. Alte Felder und Antwortwerte werden abgewiesen; es gibt keine Umdeutung historischer Antworten.

Erfolg: HTTP 200 mit `{ "ok": true, "reference": "requestId" }`, erst nach bestätigtem Lesen der gespeicherten Anfrage. Identische Wiederholung gibt dieselbe Referenz; andere Daten unter derselben Referenz ergeben 409. Fehler: JSON `{ "error": "code" }`, kein `ok: true`. 400 ungültiges JSON, 403 Origin, 405 Methode, 413 Größe, 415 Medientyp, 422 Felder, 429 Rate-Limit, 503 Bindung/Speicherung nicht bestätigt. Antworten sind nicht cachebar. Das Frontend zeigt sichere allgemeine Fehlermeldungen.

## Speicherung und Benachrichtigung

Die neue Tabelle `blog_inquiries` speichert die drei Antworten, E-Mail, feste Herkunft, Empfangszeit, Referenz, Payload-Hash und Zustellstatus. Keine erfundene Betriebsart oder Priorität im alten Websiteformular. Neue Migration: `migrations/0003_blog_inquiries.sql`.

Bestehende Bindungen werden wiederverwendet: `INQUIRIES_DB`, `INQUIRY_RATE_LIMITER`, `INQUIRY_EMAIL`. Empfänger bleibt fest `contact@vibeperform.com`, validierte Besucheradresse ist Reply-To. Nachricht ist reiner Text und enthält alle drei Fragen mit den tatsächlich ausgewählten Antworttexten. Es wird kein HTML aus Eingaben erzeugt; Steuerzeichen in E-Mail/Referenz werden verworfen. Keine personenbezogenen Daten oder Datenbankdetails in Logs.

Eine nachweislich gespeicherte Anfrage bleibt angenommen, wenn E-Mail vorübergehend scheitert. Die Zustellung ist über eine atomare Fünf-Minuten-Lease und den vorhandenen Cron dauerhaft nachholbar; Fehlversuche bekommen einen ansteigenden Abstand bis maximal einer Stunde. Blog- und bisherige Website-Outbox werden unabhängig versucht. Ein unklarer Providerzustand kann eine doppelte E-Mail erzeugen; dieselbe Anfragenummer erlaubt die Zuordnung. Es wird keine Exactly-once-E-Mail-Zusage gemacht.

## Inbetriebnahme nach Veröffentlichungserlaubnis

1. Migration 0003 auf der bestätigten D1-Zieldatenbank anwenden, bevor das echte Formular freigeschaltet wird. Hier wurde keine Migration auf ein persistentes lokales oder produktives D1 ausgeführt.
2. Bestehende DB-, Rate-Limit- und E-Mail-Bindungen sowie Cron kontrollieren.
3. Aktuelles Websitepaket mit Worker ausliefern. Im Entwurf sendet die Oberfläche bewusst keinen Netzwerkrequest; eine reine Astro-Vorschau führt den Worker nicht aus.
4. Reale Speicherung und Benachrichtigung separat anhand einer autorisierten Testanfrage bestätigen. Eine erfolgreiche Build-/Mock-Prüfung ist kein Nachweis produktiver Zustellung.

Die bestehenden Datenschutztexte wurden in DE und EN lediglich um die tatsächlich verarbeiteten Blogfelder und den Hinweis ohne Newsletter-Anmeldung ergänzt. Rechtsgrundlagen, Empfänger, Löschregeln und Identitäten blieben unverändert.

## Verifikation

`node --test tests/blog-inquiries.test.mjs tests/website-inquiries.test.mjs`

22 Tests bestanden: echte lokale SQLite-Speicherung durch Workerroute, alle drei Antworten, feste Herkunft/Empfänger, parallele Wiederholungen und Konflikte, Feld-/Header-/Body-Schranken, Ausfälle und unbestätigte Speicherung, E-Mail-Ausfall sowie unbestätigte E-Mail und Cron-Wiederholung, Unabhängigkeit zur alten Outbox, bisheriger Websiteformularweg sowie Speicherung und Benachrichtigung aller 16 Kombinationen aus Zuständigkeit und Pflegehindernis. Die bisher nie angewandte Migration 0003 enthält bereits die erweiterten CHECK-Werte; keine produktive Tabelle wurde verändert.
