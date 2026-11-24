# VibePerform: Architektur und Betrieb

Stand: 09.09.2026. Zentrale technische Übersicht für `vibeperform-astro-page`.

## Zuständigkeiten

| Baustein | Aufgabe | Wo Änderungen erfolgen |
| --- | --- | --- |
| Namecheap | Domainregistrierung und Verlängerung; Delegation an Nameserver | Namecheap-Domainverwaltung |
| Cloudflare DNS | Autoritative DNS-Zone für `vibeperform.com` | Cloudflare → Domain → DNS |
| Astro | Erzeugt DE/EN-HTML, optimierte Bilder und statische Dateien | `src/`, `astro.config.mjs` |
| Cloudflare Worker | Liefert die Website aus; HTTPS, Weiterleitungen, HTML/Markdown-Aushandlung und Formular-API | `worker/`, `wrangler.jsonc` |
| Cloudflare D1 | Speichert Website-Anfragen und den Versandstatus | `migrations/`, Binding `INQUIRIES_DB` |
| Cloudflare Email Routing | Versendet Formularbenachrichtigungen an den bestätigten Empfänger | Subdomain `notifications.vibeperform.com`, Binding `INQUIRY_EMAIL` |
| Google Workspace | Bestehender normaler Mail-Eingang, einschließlich `contact@vibeperform.com` | Google Workspace; MX-Einträge in Cloudflare DNS |
| GitHub | Quellcode, Branches, Pull Requests und automatisierte Prüfungen/Deployments | Repository `project-codum/vibeperform-astro-page` |
| GitHub Pages | Zusätzliche statische Veröffentlichung als eingeschränkter Rückfallweg | `.github/workflows/deploy.yml` |

Namecheap ist der dokumentierte Registrar. Die Registrar-Vertragsdaten und Verlängerung wurden in diesem Dokumentationsschritt nicht erneut im Konto geprüft. Die aktuell abgefragten autoritativen Nameserver sind `chad.ns.cloudflare.com` und `zainab.ns.cloudflare.com`.

## Zusammenspiel

```mermaid
flowchart TD
  N[Namecheap: Domain und Nameserver-Delegation] --> D[Cloudflare DNS]
  V[Besucher oder KI-System] --> D
  D --> W[Cloudflare Worker: vibeperform-site]
  W --> A[Astro-Dateien: HTML, Bilder, Markdown]
  W --> F[POST /api/website-inquiries]
  F --> DB[(D1: Anfrage und Versandstatus)]
  DB --> E[Cloudflare Email Routing]
  E --> G[contact@vibeperform.com bei Google Workspace]
  C[Quellcode und Pull Request] --> T[GitHub Actions: Tests]
  T --> M[Merge nach master]
  M --> B[Build und Tests]
  B --> Q[D1-Migrationen]
  Q --> P[Worker und Assets deployen]
  P --> L[Öffentliche Endpunkte prüfen]
  M --> GP[Separater GitHub-Pages-Build]
```

Produktionsziel: `https://www.vibeperform.com`, mit `/de/` und `/en/`. Die Worker-Routen gelten für `vibeperform.com/*` und `www.vibeperform.com/*`. Assets stammen aus `dist/`; `run_worker_first: true` lässt zunächst den Worker die Anfrage behandeln. Markdown wird nur für vorhandene generierte Gegenstücke ausgehandelt. Cloudflare führt dadurch noch keinen KI-Agenten oder automatischen Optimierungsprozess aus.

## DNS und E-Mail

Die DNS-Verwaltung liegt nach Delegation bei Cloudflare. Neue DNS-Einträge gehören deshalb in diese Zone; Änderungen im alten Namecheap-DNS werden dadurch nicht automatisch produktiv.

Die fünf Google-MX-Ziele der Hauptdomain bleiben erhalten:

- Priorität 1: `aspmx.l.google.com`
- Priorität 5: `alt1.aspmx.l.google.com`, `alt2.aspmx.l.google.com`
- Priorität 10: `alt3.aspmx.l.google.com`, `alt4.aspmx.l.google.com`

Für Formularbenachrichtigungen ist separat `notifications.vibeperform.com` mit Cloudflare-MX und SPF eingerichtet. Absender: `website@notifications.vibeperform.com`. Fester Empfänger: `contact@vibeperform.com`, bei Cloudflare bestätigt. Reply-To enthält die E-Mail-Adresse des Interessenten. Kein Workers-Paid-Tarif wurde dafür aktiviert. Die kostenlose Ausnahme gilt für bestätigte Zieladressen; sie ist keine Freigabe für beliebigen Kundenmailversand. Details und Anbieterquelle: [Formularzustellung](website-inquiry-email.md).

Vor DNS- oder Nameserveränderungen die vollständige bestehende Zone sichern und Google-Verifikation, MX, SPF, DKIM sowie DMARC berücksichtigen. Root-MX nicht auf Cloudflare umstellen, um lediglich Formularmails zu senden. Vor einem Nameserver-Rollback muss auch die alte DNS-Zone vollständig und aktuell sein.

## CI/CD und Arbeitsablauf

| Workflow | Auslöser | Wirkung |
| --- | --- | --- |
| [`test.yml`](../.github/workflows/test.yml) | Pull Request nach `master` | Node 24, `npm ci`, `npm test`; kein Deployment |
| [`cloudflare.yml`](../.github/workflows/cloudflare.yml) | Push nach `master` oder manueller Start | Build/Tests, D1-Migrationen, Worker/Assets veröffentlichen, Live-Prüfung |
| [`deploy.yml`](../.github/workflows/deploy.yml) | Push nach `master` oder manueller Start | Separater Astro-Build und Veröffentlichung auf GitHub Pages |

`npm test` baut die Website einschließlich der generierten Agentendateien und führt die Node-Tests aus. Nur bei Erfolg werden die Remote-Migrationen angewandt. Erst danach veröffentlicht Wrangler den Worker und die statischen Assets. Die Live-Prüfung kontrolliert öffentliche Dateien, Sitemap-Ziele, Weiterleitungen, Markdown und Fehlerseiten. Sie wird bei Fehlern höchstens dreimal mit je 15 Sekunden Pause ausgeführt.

Wichtig: Ein Fehler der abschließenden Live-Prüfung nimmt ein bereits erfolgtes Deployment nicht automatisch zurück. Auch eine erfolgreiche Datenbankmigration bleibt bestehen, wenn der spätere Worker-Deploy fehlschlägt. Deshalb Migrationen zu laufendem und vorherigem Worker kompatibel halten.

Neue Änderungen auf einem Branch vom aktuellen `master` erarbeiten, prüfen und als PR bereitstellen. Ein Merge nach `master` löst beide Veröffentlichungen aus. Ein manueller Start des Cloudflare-Workflows veröffentlicht ebenfalls in Produktion, auch wenn ein anderer Branch ausgewählt wurde; er ist kein isoliertes Preview-Deployment. `concurrency: cloudflare-production` verhindert parallel fortgesetzte Produktionsläufe und bricht ältere laufende Deployments ab. Der Workflow deklariert das Environment `production`; eine zusätzliche manuelle Schutzregel ist damit allein nicht nachgewiesen.

## Zugänge und Konfiguration

GitHub-Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`. Keine Tokens, privaten Schlüssel oder Wrangler-OAuth-Dateien ins Repository übernehmen.

Der bestehende Token `GitHub Actions - vibeperform-site` besitzt für das vorgesehene Konto Workers Scripts Write, Account Settings Read und das ausdrücklich freigegebene D1 Write; für `vibeperform.com` Zone Read und Workers Routes Write. D1 Write gilt auf Kontoebene und ist nicht nur auf eine Tabelle beschränkt.

Nicht geheime Ressourcenkennungen stehen in [`wrangler.jsonc`](../wrangler.jsonc): Worker `vibeperform-site`, Datenbank `vibeperform-website-inquiries`, Bindings `ASSETS`, `INQUIRIES_DB`, `INQUIRY_RATE_LIMITER`, `INQUIRY_EMAIL`. Die erneute Zustellung offener Benachrichtigungen läuft alle fünf Minuten. Die Datenbank ist ein Website-Eingang, keine automatische CRM-Übernahme.

## Lokale Entwicklung und Prüfung

```sh
npm ci
npm run dev
```

Astro bietet die schnelle Website-Vorschau. Für den vollständigen Formularweg mit lokalem Worker und lokaler D1:

```sh
npm test
npm run db:migrate:local
npm run preview:worker
```

Danach in einem zweiten Terminal:

```sh
npm run verify:live -- http://127.0.0.1:8787
```

Lokale Tests beweisen keinen echten E-Mail-Eingang. Live-Testanfragen sind echte gespeicherte Anfragen und müssen eindeutig als Test gekennzeichnet sein. Der Zustellstatus steht in D1; der tatsächliche Posteingang wird getrennt geprüft. Ein erfolgreicher Formularabschluss bestätigt zunächst die Speicherung.

## Betrieb, Fehler und Rückfall

- **Deployment rot:** Fehlgeschlagenen Schritt in Actions prüfen. Fehler 7403 bei D1 kann an fehlender Token-Berechtigung liegen. Ein direkt nach Deployment fehlender neuer Pfad kann eine kurze Verteilungsverzögerung sein; die begrenzte Wiederholung berücksichtigt dies.
- **Formular gespeichert, E-Mail fehlt:** `email_sent_at`, `email_attempts`, `email_last_error` und die Sperrfrist in D1 prüfen. Offene Benachrichtigungen werden erneut versucht. Kein öffentliches Abruf-API für Anfragen vorhanden; Inhalte nicht in Logs kopieren.
- **Worker zurückrollen:** Frühere tatsächlich bekannte Worker-Version in Cloudflare auswählen bzw. `wrangler rollback` mit deren ID nutzen; danach öffentliche Seiten und Formular prüfen. Dies rollt D1-Migrationen oder gespeicherte Anfragen nicht zurück.
- **GitHub Pages als Rückfall:** Nur für statische Inhalte. Formular-API, E-Mail-Versand und dynamische Markdown-Aushandlung werden dort nicht ausgeführt. Vor Entfernen der Worker-Routen die aktuellen DNS-Ursprünge und den Pages-Stand prüfen; andernfalls ist der Rückfall nicht gesichert. Bei Nutzung dieses Rückfalls muss der Anfrageweg separat funktionsfähig gemacht werden.
- **Datenbankwiederherstellung:** Eine getestete Wiederherstellungsprozedur, feste Aufbewahrungs-/Löschfristen und ein automatischer Alarm für dauerhaft offene Mails sind noch nicht dokumentiert bzw. implementiert. Diese Übersicht behauptet dafür keine Absicherung.
- **Kosten:** Es wurde kein kostenpflichtiger Tarif gebucht. Worker, D1 und weitere Dienste haben eigene Freikontingente; diese Architektur bedeutet keine unbegrenzte Gratisnutzung. Aktuelle Nutzung und Grenzen vor Wachstum im Anbieter-Konto prüfen.

## Aktueller Nachweis und offene Aktivierungen

PR [#33](https://github.com/project-codum/vibeperform-astro-page/pull/33) wurde nach `master` gemergt. Der [Produktionslauf](https://github.com/project-codum/vibeperform-astro-page/actions/runs/34353859947) für Commit `b021b38` ist erfolgreich: 29 Tests, Migrationen, Deployment und Live-Prüfung. Im Veröffentlichungsdurchlauf wurden 128 öffentliche Dateien und 24/24 Sitemap-Ziele geprüft. Eine ausdrücklich freigegebene Testanfrage erreichte contact@vibeperform.com im Google-Posteingang; Details stehen im Zustelldokument.

Die Handwerk-Landingpage bleibt öffentlich erreichbar, aber `noindex, follow`. Für Suchfreigabe Metadaten, `public/_headers` und Discovery-Generator gemeinsam anpassen. Clarity-Code ist veröffentlicht, bleibt ohne Projekt-ID und passende Einwilligung deaktiviert. Die gezeigte Heatmap ist eine Illustration. Ein produktiver agentischer Optimierungs-Loop ist noch nicht angebunden.

Weiterführend: [Landingpage](website-service-landingpage.md), [Formularzustellung](website-inquiry-email.md), [Clarity](microsoft-clarity.md), [SEO-Prüfung](website-service-seo-review.md).
