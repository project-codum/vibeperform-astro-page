# Website-Erstellung: Scrollytelling V2

Am 19.09.2026 vom Nutzer gestalterisch angenommen („V2 ist perfekt. das übernehmen wir.“). V2 ist jetzt die reguläre Leistungsseite auf `develop`. Keine Veröffentlichung erfolgt.

- DE: `/de/website-erstellen-lassen/v2/#umfang`
- EN: `/en/website-design/v2/#umfang`
- Regulär DE: `/de/website-erstellen-lassen/#umfang`
- Regulär EN: `/en/website-design/#umfang`
- Frühere V1 im Git-Stand `8c7dd67` erhalten.

## Gestaltung

Auftrag: den Leistungsumfang bildlich erzählen, in der Reihenfolge des neuen Brandbooks. Markenkern → Sprache → Logo → Farben → Typografie → Bildsprache → Layout/Struktur → Anwendung. SEO schließt als Website-spezifisches Kapitel an. Verwaltungsabschnitte des Brandbooks (Start/Dateien/Status) sind kein Leistungsinhalt.

Desktop/Tablet: angeheftete Bühne, weiche Kapitelwechsel, Fortschritt, Website-Vorschau wird beim Scrollen von breit zu schmal. Desktop/Mobil können außerdem direkt gewählt werden. Normales Scrollen und Kapitelanker, kein Scroll-Hijacking.

Kleine/kurze Viewports und reduzierte Bewegung: vollständige bebilderte Schrittfolge. Ohne JavaScript bleiben alle Kapitel und Grafiken zugänglich. Die Bedienknöpfe erscheinen erst mit funktionierendem Script. Druck zeigt die statischen Kapitel.

## Quellen und Grenzen

- Brandbook: `KI-Beratung/outputs/vibeperform-brandbook-2026-09-18/Uebergabe/Brandbook.html`, Version 2.1, einschließlich Original-Logo/Favicon, Farben und Schriftpaar Arial/Georgia.
- Bildwelt: bestehende generierte `src/assets/website-service/interior.png` und `materials.png`; für die Seite als WebP optimiert. Moodboard und Website sind als Gestaltungsbeispiele gekennzeichnet.
- Das vom Nutzer erwähnte Google-Suchvorschlagsbild wurde in den untersuchten Projektassets nicht gefunden. Stattdessen zeigt V2 vorläufig eine HTML/CSS-Suchvorschlagsgrafik mit beispielhaften Begriffen. Keine Live-Google-Daten und keine Ranking-Aussage. Originalmotiv kann später eingesetzt werden.
- Keine neue Logoentwicklung pauschal zugesagt, keine neuen Preise oder verbindlichen Leistungsumfänge definiert.
- Die reguläre Seite verwendet die vorhandenen Canonical-/Sitemap-Einträge; ihre generierte Markdown-Fassung enthält nun ebenfalls die neun Kapitel. Die weiter erreichbare `/v2/`-Vorschau bleibt `noindex, follow`, Canonical/Markdown auf die reguläre Seite; nicht in Sitemap/Leistungsmenü aufgenommen. Sprachwechsel bleibt innerhalb V2.

## Prüfung

Build und bestehende Tests plus V2-Prüfungen: Vorschau-Metadaten, V1-Erhalt, Kapitelreihenfolge, serverseitige Grafiken, interne Anker und Sprache.
Browserprüfung: Kapitelwechsel, angeheftete Bühne, 760px-Darstellung sowie Desktop/Mobil-Umschaltung und kleine Viewports. Geprüft bei 1280 × 720, 760 × 783, 390 × 844 und 320 × 740. Kein horizontaler Seitenüberlauf; alle Suchvorschläge sichtbar. Desktop/Mobil per Scrollen, Klick und Enter geprüft. DE/EN: neun Kapitel, Bilder geladen, keine Browser-Konsolenfehler beobachtet. `npm test`: 43/43 erfolgreich; `git diff --check`: erfolgreich. Reduzierte Bewegung und JavaScript-Ausfall sind im Code als statische Ausgabe abgesichert; kein separater Browserlauf mit deaktiviertem JavaScript bzw. emulierter Bewegungspräferenz.

## Learnings

[Allgemeiner Leitfaden für die nächsten Leistungsseiten](learnings-website-scrollytelling.md).
