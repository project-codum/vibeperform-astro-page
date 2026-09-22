# Wissen: Ziel, Struktur und Gestaltung

## Ziel
Besucher erhalten Orientierung für ihren digitalen Firmenauftritt und finden vorhandene Fachartikel. Wissen ergänzt die Leistungen; der Einstieg soll Website, Auffindbarkeit und laufende Entwicklung verbinden. Bestehende vier Beiträge je Sprache bleiben als KI-/Automatisierungswissen erkennbar, mit ihren ursprünglichen Daten und Inhalten.

## Erste Struktur
1. Dunkler Einstieg: „Gute Entscheidungen beginnen mit Verständnis.“ Kurze Einordnung und Sprung zu den Beiträgen.
2. Drei Themenwege: Website planen, gefunden werden, aktuell bleiben. Als Einstiege zu den vorhandenen Leistungsseiten benennen, nicht als neue Artikel ausgeben.
3. Artikelübersicht: „KI & Automatisierung verstehen.“ Neuester Beitrag hervorgehoben, weitere Beiträge als ruhige redaktionelle Liste mit eigenem Artikelbild. Datum, Lesezeit und tatsächliche Bildkennzeichnung sichtbar.
4. Kontakt: Fragen zum eigenen Auftritt besprechen.

Artikel: gemeinsame Navigation; Rückweg zu Wissen; Titel, Kurzbeschreibung, Autor, Datum und Lesezeit; Titelbild; Inhaltsverzeichnis aus tatsächlichen Überschriften; gut lesbarer Artikel; passender nächster Schritt; gemeinsamer Footer.

## Erwartetes Nutzerfeedback → Anforderungen
- „Wo finde ich etwas zu meiner Website?“ → Drei konkret benannte Themenwege führen zu bestehenden Leistungsinformationen. Keine leeren Kategorien.
- „Das sind doch KI-Artikel?“ → Vorhandenen Bestand ausdrücklich als ergänzende Beiträge zu KI und Automatisierung einordnen. Keine neuen Fachinhalte oder aktuelle Prüfung vortäuschen.
- „Ich suche nur einen Teil des Artikels.“ → Verlinktes Inhaltsverzeichnis mit gültigen Überschriften-IDs; auf Mobilgeräten platzsparend aufklappbar.
- „Der Text ist schwer zu lesen.“ → Begrenzte Zeilenlänge, 18px Fließtext, ruhiger Papierhintergrund, deutliche Zwischenüberschriften, sichtbare Quellenlinks. Tabellen dürfen innerhalb ihres Containers scrollen.
- „Bin ich noch auf derselben Website?“ → Original-Logo, geteiltes Leistungsmenü, Papier/Plum/Lavendel und Serifenkursiv. Keine zusätzliche Animation.

## Umfang und Grenzen
DE/EN-Übersichten und alle acht vorhandenen Artikel über die gemeinsame Vorlage angleichen. URLs, Originalartikel, Veröffentlichungsdaten, Quellen und individuelle Artikel-CTA erhalten. Metadaten und Markdown-Ausgaben mitziehen. Keine Veröffentlichung, keine neuen Referenzen oder Themenbeiträge. Redaktionelle Faktenprüfung der bestehenden Artikel ist eine spätere Aufgabe.

## Umsetzung und Prüfung
- DE/EN-Übersicht und gemeinsame Vorlage aller acht Artikel im neuen Stil umgesetzt. Bestehende Artikeltexte und URLs erhalten.
- Drei Themenwege führen zu vorhandenen Leistungsseiten. Artikelbestand als KI-/Automatisierungswissen eingeordnet.
- Inhaltsverzeichnis zeigt die Hauptabschnitte (H2, ersatzweise H3), läuft ohne JavaScript und ist aufklappbar. Titelbilder bleiben unbeschnitten.
- Neue Markdown-Ausgaben für beide Übersichten und englische Artikel; bestehende deutsche Artikel-Ausgaben weiterhin generiert.
- Vollständiger Build und 62 Tests erfolgreich; nach visueller Feinabstimmung erneuter Build und betroffene Seitentests.
- Browser: deutsche Übersicht und Artikel auf Desktop sowie 390 px visuell geprüft; DE/EN-Übersicht und englischer Artikel bei 320 px ohne horizontalen Überlauf. Mobiles Menü, Sprachwechsel und Abschnittssprung im Artikel erfolgreich geprüft.
- Lokal auf develop; keine Veröffentlichung.

Nutzerkorrektur: Jeder Beitrag erhält auch auf der Übersicht sein vorhandenes Titelbild, inklusive Bildkennzeichnung und Artikelverlinkung. Auf Mobilgeräten steht das Bild über dem Text.
