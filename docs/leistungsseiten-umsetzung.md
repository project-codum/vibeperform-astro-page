# Leistungsseiten – Umsetzung und Prüfung

Stand: 19.09.2026 · develop · lokale Vorschau, keine Veröffentlichung.

## Vorgehen

Vor der Umsetzung wurden [Ziele, Textstrukturen, Nutzerhypothesen und visuelle Anforderungen](leistungsseiten-textkonzepte.md) nach dem [gemeinsamen Leitfaden](learnings-website-scrollytelling.md) aufgeschrieben. Die neuen Seiten verwenden ein gemeinsames Gerüst und je Leistung ein eigenes statisches Beispiel. Für diesen Umfang war keine zusätzliche Scrollytelling-Interaktion nötig.

## Seiten

| Leistung | Deutsch | Englisch |
|---|---|---|
| Website erstellen lassen, bereits angenommen | `/de/website-erstellen-lassen/` | `/en/website-design/` |
| Website überarbeiten, neu | `/de/website-ueberarbeiten/` | `/en/website-redesign/` |
| Website-Betreuung, neu | `/de/website-betreuung/` | `/en/website-support/` |
| Suchmaschinenoptimierung, neu | `/de/suchmaschinenoptimierung/` | `/en/search-engine-optimisation/` |
| Google-Unternehmensprofil, neu | `/de/google-unternehmensprofil/` | `/en/google-business-profile/` |
| Texte & Grafiken, neu | `/de/texte-grafiken/` | `/en/copy-graphics/` |
| Ergänzende KI-Beratung, neu gestaltet | `/de/ki-strategie/` | `/en/ai-strategy/` |

Einstieg: http://127.0.0.1:4322/de/leistungen/

## Integration

- Menü, Leistungsübersicht und passende Startseitenkarten führen direkt zu den Detailseiten.
- Die Website-Erstellung verlinkt direkt zur neuen Betreuung.
- Jede neue Seite enthält Hero, Kundenprobleme, Leistungsumfang, Zusammenarbeit/Mitwirkung, passende nächste Schritte, fünf Entscheidungsfragen und Kontakt.
- Die bestehende Handwerks-Landingpage und vertiefende KI-Angebote bleiben verlinkte eigene Angebote. KI-Beratung bleibt ergänzend.
- Metadaten, hreflang, Service-/Breadcrumb-Strukturdaten, Sitemap, Markdown pro Seite und llms-Dateien sind konsistent ergänzt.
- Original-Logo, Farb-/Schriftregeln und bestehende Kontaktwege werden wiederverwendet. Keine neuen Formulare oder externen Dienste eingebaut.
- Inhalte in `src/data/serviceDetails.ts`, gemeinsames Gerüst in `src/components/ServiceDetail.astro`, Beispiele in `ServiceVisual.astro`, Gestaltung in `src/styles/service-detail.css`.

## Prüfung

- `npm test`: 56 Tests erfolgreich. Neue Tests decken alle zwölf bearbeiteten DE/EN-Routen, gemeinsames Gerüst, Überschriften, aktuelle Menümarkierung, interne Links/Anker, Sprachwechsel, strukturierte Daten, Sitemap und Markdown-Inhaltsgleichheit ab.
- Desktop: alle sechs neuen/überarbeiteten deutschen Hero-Gestaltungen visuell geprüft, gemeinsamer Leistungsabschnitt geprüft.
- 320 px: alle zwölf DE/EN-Seiten auf Seitenüberlauf geprüft. Zu breite Anschlussleistungsnamen korrigiert und betroffene Seiten erneut geprüft. Ein abgeschnittener Bestandteil im kleinen Seitenvergleich erhielt mehr Platz.
- 760 px: mittlere Bildschirmbreite und Mobilmenü geprüft. Google-Unternehmensprofil über das Leistungsmenü erfolgreich geöffnet; Menü schließt nach Auswahl.
- FAQ mit Enter geöffnet; Abschnittslink springt zum gewünschten Ziel.
- Dies sind technische und visuelle Prüfungen. Antizipiertes Nutzerfeedback aus dem Textkonzept ist kein durchgeführter Nutzertest und keine gemessene Conversion-Verbesserung.

## Inhaltliche Grenzen

Angebotsfelder konkret beschrieben, ohne neue verbindliche Preise, Reaktionszeiten, Budgets, Vertragslaufzeiten oder Zusatzleistungen festzulegen. Beispiele bleiben als solche gekennzeichnet. PIM-Status und offene kommerzielle Details wurden nicht verändert. Veröffentlichung ist ein eigener Schritt.
