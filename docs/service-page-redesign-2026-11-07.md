# Leistungsseiten: redaktionelle und grafische Überarbeitung

Stand: 7. November 2026. Umsetzung im lokalen Checkout `vibeperform-astro-page-repositioning`, Vorschau auf Port 4345. Prüfstand vor Veröffentlichung. Am 7. November 2026 hat der Nutzer Commit, Merge und Veröffentlichung dieses Stands ausdrücklich beauftragt. Bereits vorhandene Startseitenänderungen wurden erhalten.

## Gestalterische und redaktionelle Entscheidung

Die Startseite führt über Entlastung, sichtbare Arbeit, verständliche Zusammenarbeit, Haltung, Leistungen und Gespräch. Die Leistungsseiten übernehmen ihre Typografie, Farben, runden Aktionen und ruhigen Abschnittswechsel. Jede Leistung beginnt jedoch mit einem eigenen Kundenanlass und einem dazu passenden Beispiel. Umfang, Kundenbeitrag, Freigabe und nächster Schritt sind ausdrücklich benannt.

Die ausführlichen wiederholten Problemkarten und allgemeinen Schlussabschnitte wurden gekürzt. Der Kontaktabschluss bleibt auf die jeweilige Leistung bezogen. Verwandte Leistungen erscheinen als kompakte Weiterführung.

## Seiten und ihre Geschichte

| Seite | Neuer Schwerpunkt |
| --- | --- |
| Webseite erstellen | Drei Phasen: Betrieb verstehen, Inhalte und Gestaltung entwickeln, prüfen und freigeben. Reales HMS-Projekt, Seitenplan, Bildentscheidung und Ansichten auf verschiedenen Geräten. Bestehende Preisorientierung von 1.800 Euro brutto erhalten. |
| Webseite überarbeiten | Bestehenden Auftritt prüfen und gezielt verändern. Echter HMS-Vergleich; nachvollziehbare Entscheidungen zu Zielgruppe, Bildern und eigenen Leistungsseiten. |
| Laufende Betreuung | Nachricht mit Dateianhängen wird zu einem gestalteten Projektabschnitt. Fachlicher Input, redaktionelle Bearbeitung und Kundenfreigabe sind getrennt erkennbar. |
| Google-Unternehmensprofil | Angaben, Einblicke und Kontaktmöglichkeiten. Schematische Profilansicht mit realem Arbeitsbild; Einrichtung und laufende Pflege unterschieden. |
| Suchmaschinenoptimierung | Konkrete Kundenfrage führt zu einer passenden lokalen Leistungsseite. Suchfrage, Inhalt und Kontakt bilden einen sichtbaren Zusammenhang. Keine erfundenen Ranking-Ergebnisse. |
| Texte und Grafiken | Fachliches Ausgangsmaterial wird zu einem verständlichen Text-Bild-Abschnitt. Aussage, Bildauswahl und Gestaltung werden am vorhandenen Projekt erklärt. |
| Leistungsübersicht | Einstieg über drei Situationen: neu aufbauen, Bestand verbessern, Betreuung abgeben. SEO, Profil und Inhalte bleiben direkt auffindbar. |
| Handwerksbetriebe | Wunschaufträge, Einsatzgebiet und brauchbare Angaben zur Projektanfrage. Schriftlicher kostenloser Check bleibt eine ausdrücklich erkennbare Alternative zum Gespräch. |
| KI-Beratung | Ergänzende Beratung für einen konkreten Arbeitsablauf. Eingabe, mögliche Vorarbeit, Voraussetzungen und menschliche Entscheidung werden als Auswertung dargestellt. |
| KI-Potenzialanalyse | Im aktuellen Agenturdesign. Ein Vorgang, 60 Minuten und schriftliche Einschätzung; Ablauf nur einmal erklärt. Eigenständige Analyse klar vom Kennenlerngespräch getrennt. |
| Workshops | Zwei verständlich unterschiedene Formate: Explore und Design. Fragen und Arbeitsergebnisse statt großer allgemeiner Versprechen. |
| Explore Workshop | Gemeinsame Entscheidungsgrundlage, fünf Leitfragen und beispielhafte Auswertung. Anschluss zur Umsetzung wird gesondert vereinbart. |

Alle zwölf Seiten wurden auf Deutsch und Englisch überarbeitet. URLs und bestehende Kontaktendpunkte bleiben erhalten. Generierte Markdown-Fassungen und deutscher vollständiger Agentenkontext wurden angeglichen. Englische Markdown-Fassungen für Workshops und Explore ergänzt.

## Kleine Klarstellungen auf der Startseite

- Verlinkte Namenszeile: Marlon Dietrich als Ansprechpartner.
- Kontaktaktion im Kundenbeispiel benennt VibePerform ausdrücklich.
- Beim kostenlosen Statuscheck werden Gestaltung, Verständlichkeit und Kontaktwege genannt. Besucher ohne bestehende Webseite erhalten einen klaren Einstieg.
- Reihenfolge, Haupttexte, Bildmaterial und grundlegendes Erscheinungsbild erhalten.

## Prüfung

- `npm test`: Build mit 62 Seiten, 115 Tests bestanden, keine fehlgeschlagenen Tests. Letzter Lauf: `/tmp/vp-final-tests-3.log`.
- Alle 24 Angebotsrouten: HTTP 200, eine H1, keine doppelten IDs und keine fehlenden Ziele für interne Sprunglinks bei 320 Pixeln.
- Alle 24 Routen bei 1440 und 390 Pixeln: kein horizontaler Überlauf oder abgeschnittener Text, alle Bilder dekodiert, keine JavaScript-Laufzeitfehler.
- Zusätzliche visuelle Prüfung der Hero-, Beispiel-, Ablauf- und Ergebnisdarstellungen, darunter Erstellung, Relaunch, Betreuung, Profil, SEO, Übersicht, Handwerk und Workshops.
- Bei 320 Pixeln gefundene abgeschnittene Überschrift der Potenzialanalyse korrigiert und erneut geprüft.
- 24 interne Linkziele aus den Angebotsseiten geprüft: alle HTTP 200.
- DE/EN-Anfrageformular: Pflichtauswahl, vier Fragen, Überspringen der optionalen URL, Zusammenfassung und Zurück-Navigation mit Werterhalt geprüft. Keine echte Anfrage versendet.
- Stichproben ohne JavaScript: Startseite, Erstellung, Betreuung, Potenzialanalyse und Handwerk; Inhalte, native FAQ und E-Mail-/Buchungsalternativen zugänglich.
- Startseite DE/EN bei 1440, 390 und 320 Pixeln mit reduzierter Bewegung: kein horizontaler Überlauf, Leitgedanke vollständig sichtbar ohne Wortanimation.
- `git diff --check`: ohne Befund.
- Lokale Astro-Toolbar meldete nach parallelem Build einen veralteten Dependency-Cache (504). Vite-Cache reversibel beiseitegelegt und neu erzeugt; Toolbar-Endpunkt anschließend HTTP 200. Kein Fehler der Seitenlogik.

## Offene inhaltliche Grundlagen vor einer Veröffentlichung

- Das ausdrücklich gewünschte Badge „90% starten hier“ ist erhalten. Eine statistische Bezugsgröße ist in der ausgewerteten Grundlage nicht dokumentiert. Vor Veröffentlichung belastbar zuordnen oder qualitativ formulieren.
- Die PIM-Grundlage der KI-Potenzialanalyse enthält noch keinen final bestätigten Preis. Deshalb wird keine Zahl genannt; Preis und Konditionen werden vor einer Beauftragung geklärt. Die Seite ist keine kommerzielle Freigabe des Angebots.
- Keine neuen Termin-, Ranking-, Umsatz- oder Anfragegarantien eingeführt. Kein Nachweis tatsächlicher Buchungen oder Live-Veröffentlichung.
