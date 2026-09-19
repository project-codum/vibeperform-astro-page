# Leistungen und Website-Erstellung im V2-Stil

Stand: 19.09.2026. Lokale Umsetzung auf `develop`, keine Veröffentlichung.

## Umgesetzt

- Gemeinsames Leistungsmenü auf Startseite und neuen Leistungsseiten: drei Gruppen, kurze Beschreibungen, aktuelle Seite hervorgehoben.
- Desktop: breites Menü. Mobil: aufklappbare Navigation mit scrollbarer Leistungsauswahl.
- Native `details`/`summary` für die Leistungsauswahl; auch ohne JavaScript erreichbar. Mit JavaScript: Escape, Schließen bei Auswahl, Außenklick und Fokuswechsel sowie mobile Umschaltung.
- Leistungsübersicht: Erstellung, Überarbeitung, Betreuung, SEO, Google-Unternehmensprofil sowie Texte/Grafiken. KI-Beratung ergänzend.
- Erstellungsseite: Hero mit gekennzeichnetem Gestaltungsbeispiel, Kundenfragen, Leistungsbausteine, Ablauf, anschließende Betreuung, Handwerksangebot, FAQ und Kontakt.
- Original-Logo und Favicon, dunkle Hero-Flächen, warme Inhaltsflächen, Lavendel, Arial und Georgia aus der gewählten V2-Stilbasis.
- DE/EN, Canonical/Hreflang, strukturierte Daten, Sitemap und generierte Markdown-Fassungen.
- Startseiten-Leistungskarten und gemeinsamer Footer verlinken die neuen Ziele.

## Routen

| Seite | Deutsch | Englisch |
|---|---|---|
| Alle Leistungen | `/de/leistungen/` | `/en/services/` |
| Website erstellen lassen | `/de/website-erstellen-lassen/` | `/en/website-design/` |

Vorschau: `http://127.0.0.1:4322/de/leistungen/` und `http://127.0.0.1:4322/de/website-erstellen-lassen/`.

## Inhaltliche Grenzen

- Keine neuen Paketpreise, Mengen, Lieferfristen oder Erfolgsgarantien. Umfang und Betreuung werden passend zum Vorhaben vereinbart.
- Bestehende Handwerks-Landingpage inklusive Anfrageformular und `noindex, follow` bleibt eigenständiger Zielgruppeneinstieg.
- Noch nicht separat ausgearbeitete Leistungen führen zu konkreten Abschnitten der Übersicht.
- „Pakete & Preise“ und „Projekte“ erhalten erst mit passenden fertigen Inhalten eigene Menüziele. Agentur und Wissen führen zu den bestehenden Über-uns-/Blogseiten; deren Neuausrichtung folgt separat.
- PIM-Katalog am 19.09. geprüft: kein fertiges Website-Erstellungsprodukt vorhanden. Die lokalen Textentwürfe beschreiben die vom Nutzer festgelegten Leistungsfelder und die Arbeitsfassung aus `ap1/leistungsblaetter.md`; sie ändern keine PIM-Stammdaten.

## Prüfung

- `npm test`: Build und 39 Tests bestanden.
- Neue Prüfungen: vier Routen, Sprachverweise, Canonical, strukturierte Daten, eindeutige IDs, interne Links einschließlich Seitenanker, Kontaktziele, Sitemap und Textfassungen. Handwerks-Landingpage bleibt getrennt.
- Browser: Desktop-Menü, Enter/Escape und Fokusrückgabe; mobile Navigation und Schließen nach Auswahl; Sprung zum Google-Profil-Abschnitt; Sprachwechsel zur passenden EN-Seite; FAQ.
- Layout: 1280 px Desktop, 390 und 320 px Mobil geprüft. Bei 320 px gefundener Überlauf langer deutscher Leistungsnamen durch flexible Spalten und Textumbruch behoben. Beide Seiten in DE/EN anschließend ohne horizontalen Überlauf.
- Keine Kontaktanfrage versendet, keine Buchung vorgenommen, nichts gepusht oder veröffentlicht.

## Nächster Schritt

Visuelles Feedback zu Menü und beiden Seiten einarbeiten. Danach „Pakete & Preise“ mit dem tatsächlich vereinbarten Umfang ausarbeiten oder die nächsten Leistungsbereiche vertiefen.
