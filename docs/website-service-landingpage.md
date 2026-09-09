# Website-Angebot für Handwerksbetriebe

Die freigegebene HTML-Vorschau ist als gemeinsame Astro-Komponente in Deutsch und Englisch integriert. Ausgangspunkt ist `origin/master` bei `5d1ad63` mit Cloudflare Worker und GitHub Actions. Arbeitsbranch: `codex/website-service-landingpage`.

## Seiten und Pflege

- DE: `/de/websites-fuer-handwerksbetriebe/`
- EN: `/en/websites-for-trade-businesses/`
- Texte: `src/data/websiteServiceContent.ts`
- Formulartexte: `src/data/websiteInquiryContent.ts`
- Seitenaufbau: `src/components/WebsiteServicePage.astro`
- Metaangaben, hreflang und Service-JSON-LD: `WebsiteServiceDocument.astro`
- Bestehende Navigation wird über eine optionale Website-Variante ergänzt.
- Die fünf freigegebenen Illustrationen werden durch Astro als responsive WebP-Bilder ausgeliefert. KI-Beispiele sind gekennzeichnet. Die Referenzsektion ist vorerst ausgeblendet und im Code als TODO hinterlegt.
- Die Seiten bleiben wegen der Platzhalter `noindex, follow` und außerhalb der Discovery-Dateien. Zur Suchfreigabe `websiteServiceIndexable` und die Regeln in `public/_headers` gemeinsam ändern und Seiten in den Discovery-Generator aufnehmen.

## Formular und tatsächlicher Eingang

Fünf Ansichten: Vorhaben → Betriebsart → Schwerpunkt → optionale Website-Adresse → Abschluss. Im Abschluss stehen optionale freie Ergänzung und danach die erforderliche E-Mail-Adresse. Frühere Angaben können aufgeklappt und geändert werden. Keine zusätzliche Pflicht für Name, Telefon oder Budget.

`POST /api/website-inquiries` läuft im bestehenden Worker. Erfolgreiche Antworten bestätigen eine gespeicherte Anfrage in D1 mit einer UUID. Der Client verwendet dieselbe UUID für unveränderte Wiederholungen. Gleiche ID mit anderem Inhalt wird abgewiesen. Origin-Prüfung, serverseitige Feldprüfung, begrenzte Anfragegröße, Honeypot und ein Rate-Limit schützen den Eingang. Das Rate-Limit gilt pro IP und Cloudflare-Standort (10 Versuche je 60 Sekunden), nicht als globales Kontingent.

Es gibt keine Weiterleitung in ein E-Mail-Programm, keinen öffentlichen Abruf der gespeicherten Anfragen und keine Übertragung der Formularwerte an Analytics. Bei einem Fehler bleiben die Eingaben innerhalb der geöffneten Seite erhalten. Neuladen oder Sprachwechsel setzt das Formular zurück.

Anfragen liegen zunächst unter **Cloudflare → Workers & Pages → D1 → vibeperform-website-inquiries → website_inquiries**. Das Feld `status` beginnt mit `new`. Die Tabelle ist der Website-Eingang, kein Ersatz für das CRM. Die E-Mail-Benachrichtigung an contact@vibeperform.com ist implementiert; Aktivierung und tatsächlicher Posteingang stehen noch aus (siehe `docs/website-inquiry-email.md`). Eine CRM-Übernahme ist nicht implementiert. Die Antwortkopie verspricht deshalb nur eine persönliche Rückmeldung, keine automatisch versendete Empfangsmail.

## Cloudflare und GitHub Actions

Die Datenbank `vibeperform-website-inquiries` wurde im vorhandenen Konto angelegt (Standort-Hinweis WEUR), die Migration `0001_website_inquiries.sql` ist remote und lokal angewendet. Es wurden keine Testanfragen in der entfernten Datenbank angelegt. WEUR ist ein Standort-Hinweis, keine zugesicherte Datenresidenz.

Die bestehende Cloudflare-Workflowdatei führt künftig vor dem Worker-Deployment die D1-Migrationen aus. Der bestehende GitHub-Deployment-Token benötigt dafür zusätzlich **Account → D1 → Edit**. Die Berechtigungen dieses in GitHub gespeicherten Tokens konnten lokal nicht eingesehen werden; vor dem ersten Produktionslauf prüfen. Worker-Routen, Produktions-HTTPS und bisherige Markdown-Aushandlung bleiben erhalten.

Lokale vollständige Vorschau:

```sh
npm ci
npm test
npm run db:migrate:local
npm run preview:worker
```

Diese Vorschau verwendet lokale D1-Daten. `npm run dev` bietet Astro-Hot-Reload, aber keinen Worker-Eingang. Für Formularversand daher die Worker-Vorschau verwenden.

Prüfung der vorhandenen öffentlichen Dateipfade, Redirects und Markdown-Aushandlung gegen die lokale Vorschau:

```sh
npm run verify:live -- http://127.0.0.1:8787
```

Noch kein Push und kein Website-Deployment aus diesem Arbeitsstand.

## Forschungsgrundlage

Der explizit beauftragte Luna-Research liegt im Strategieprojekt unter `outputs/strategie-digitaler-erstkontakt-2026-09-08/formular-best-practices.md`. Übernommen: wenige notwendige Felder, erkennbare optionale Angaben, bearbeitbare Zusammenfassung, Autofill, verständliche Fehlermeldungen und bestätigter Eingang. Eine bestimmte Conversion-Rate ist damit nicht belegt.

- [GOV.UK: Question pages](https://design-system.service.gov.uk/patterns/question-pages/)
- [GOV.UK: Check answers](https://design-system.service.gov.uk/patterns/check-answers/)
- [W3C: Forms](https://www.w3.org/WAI/tutorials/forms/)
- [Cloudflare: Rate limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)
- [Cloudflare: D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/)

## Prüfung am 9. September 2026

- Produktionsbuild: erfolgreich, einschließlich WebP-Generierung.
- Node-Tests: 22/22 bestanden; vorhandene Agenten-Tests plus Datenbank-/API- und DE/EN-Metadaten-Tests.
- TypeScript: Formularscript und Contentmodule im strikten Modus geprüft.
- Chromium: DE und EN jeweils bei 360, 390, 768 und 1440 CSS-Pixeln; kein horizontales Überlaufen, keine JavaScript-Laufzeitfehler. Auswahl, optionale Website, fehlerhafte Eingaben, Ändern und Zurücksetzen geprüft.
- Vollständiger Formularweg in beiden Sprachen gegen den echten lokalen Worker und lokale D1. Nach Speicherung wurde die erste Antwort absichtlich verworfen; der erneute Klick verwendete dieselbe ID. Datenbankabfrage bestätigt genau eine lokale Anfrage je Sprache. Remote-Eingang: 0 Anfragen.
- Lokale HTTP-Prüfung: 117 öffentliche Dateien, 24 Sitemap-Ziele, acht bestehende Weiterleitungen und Markdown-Aushandlung/404 erfolgreich.
- Zunächst IAB-Desktopprüfung. Die lokale Worker-Vorschau blieb dort nach einer zuvor korrigierten Weiterleitung in einer Fehleransicht; responsive Screenshot-Prüfung daher mit lokalem Playwright Chromium. Die Ursache im lokalen Wrangler-Host wurde im Vorschaukommando behoben, ohne die Produktions-HTTPS-Regel zu verändern. Abschließend wurde die fertige Worker-Vorschau erfolgreich in einem frischen sichtbaren IAB-Tab geöffnet.

### Visueller Abgleich

Maßgeblich ist die vom Nutzer bestätigte `visualisierung/vibeperform-vorschau.html` im Strategieprojekt. Die dortigen `konzepte/concept-{hero,process,monthly,contact}.png` sind ergänzende visuelle Referenzen; die bewusst vereinfachte und bestätigte HTML-Gestaltung bleibt maßgeblich. Freigegebene HTML-Vorschau und aktuelle Chromium-Aufnahmen wurden mit `view_image` direkt verglichen; Hero und Prozess bei 1440 CSS-Pixeln, Abschluss bei 390 CSS-Pixeln.

| Vergleichspunkt | Referenz, Umsetzung und Entscheidung |
| --- | --- |
| Hero und Text | Bestätigte Überschrift, CTA, KMU-Zeile und monatliche Verbesserung unverändert. Zweispaltiges Mockup mit überlagerter Anfragekarte erhalten. |
| Typografie und Farben | Schriftfamilie, Überschriftengrößen, schwarzer Text, Violett, Lavendel und dunkler Betreuungsabschnitt aus der HTML-Fassung übernommen. |
| Bilder | Dieselben fünf Bildmotive und das reale Portrait; WebP statt eingebetteter PNGs. Alle vier Prozessbilder nach tatsächlichem Laden sichtbar. Eine zunächst leere Screenshot-Fläche war ein Dekodierungs-/Aufnahmezeitpunkt, kein fehlendes Asset. |
| Vertrauen und Inhalte | Drei interaktive Vertrauenspunkte sowie aufklappbare Inhalts-, Prozess- und Betreuungsdetails bleiben erhalten. |
| Navigation und Fußzeile | Bewusste Ergänzung um Sprachwechsel und vorhandene rechtliche Seiten für die produktnahe Integration. |
| Anfrageabschluss | Bewusste Nutzeränderung: fünf Ansichten, freie Ergänzung und E-Mail zuletzt, echter gespeicherter Eingang mit Fehler- und Wiederholungszustand. |
| Mobil | Inhalt untereinander, Prozess in zwei Spalten, bedienbare Buttons und Eingaben ohne Überlauf bei 360/390 Pixeln. |

Die Integration ist gegen die freigegebene HTML-Gestaltung visuell geprüft. Keine unbeabsichtigte wesentliche Abweichung festgestellt. Die Tests belegen die Funktion, keine gemessene Steigerung der Abschlussrate. Temporäre Screenshotdateien werden nach der Prüfung entfernt.


## Überarbeitung nach Browserkommentaren

- Texte zu Leistungen, Projektbeginn und Anfrageeinstieg in DE und EN angepasst.
- Eigene Bildmotive für „Arbeit sehen“ und „Nächsten Schritt kennen“; Bildfläche bleibt beim Wechsel gleich groß, Übergang per Überblendung. Originale und vollständige Prompts stehen in `docs/website-service-image-prompts.md`.
- Referenzen werden mit `showReferences = false` nicht gerendert. TODO in `WebsiteServicePage.astro`: echte freigegebene Projekte ergänzen und Sektion wieder aktivieren. Die Suchfreigabe bleibt unverändert ausstehend.
- Alle nativen Aufklappelemente erhalten eine 280-ms-Animation für Öffnen und Schließen, einschließlich der erst im Formular erzeugten Zusammenfassung. Schnelles erneutes Klicken kann die Bewegung umkehren. Bei reduzierter Bewegung erfolgt der Wechsel sofort.
- Monatsgrafik und Bild neben der Inhaltserarbeitung sind am oberen Rand ausgerichtet. Damit verschieben sie sich auf Desktop nicht, wenn die Textspalte länger wird. Auf Mobilgeräten folgt der darunterliegende Inhalt fließend der animierten Höhe.

Prüfung: Build und 22 bestehende Tests erfolgreich; TypeScript strikt geprüft. DE/EN jeweils bei 390 und 1528 Pixeln im Chromium: alle 13 statischen Aufklappelemente plus dynamische Formularzusammenfassung geöffnet und geschlossen, Tastatur und schnelles Umkehren geprüft, reduzierte Bewegung ohne Animation bestätigt. Bildpositionen auf Desktop vor/nach Öffnen mit weniger als 1 Pixel Abweichung; alle drei unterschiedlichen Vertrauensbilder geladen; Referenzsektion fehlt im DOM; kein horizontaler Überlauf und keine JavaScript-Laufzeitfehler. Neue Bildmotive und ihre Desktop-/Mobilansichten wurden mit `view_image` geprüft. Die aktualisierte deutsche Seite wurde zusätzlich im vorhandenen IAB-Tab geöffnet.

## Weiterentwicklung am 9. September: sichtbarer Optimierungskreislauf

Der bisherige Monatsbericht-Abschnitt wurde durch `WebsiteOptimizationLoop.astro` ersetzt, in DE und EN. Drei per Maus und Tastatur bedienbare Stationen zeigen eine illustrative Heatmap, einen konkreten Monatsvorschlag und die Umsetzung nach Freigabe. Die ursprüngliche Station „Suche verstehen“ wurde auf Wunsch entfernt. Das Schreiner-Beispiel bleibt über alle Stationen konsistent. Keine erfundenen Kundenergebnisse oder Conversion-Zahlen.

Alle Panels belegen dieselbe Grid-Zelle, sodass ihre gemeinsame Höhe beim Wechsel erhalten bleibt. Inaktive Panels sind inert und für assistive Technik ausgeblendet. Reduzierte Bewegung wird respektiert. Die vorhandene Animation der aufklappbaren Erläuterungen bleibt erhalten.

Clarity wurde parallel zentral vorbereitet; Konfiguration, verbleibende Aktivierungsschritte und Quellen: `docs/microsoft-clarity.md`.
