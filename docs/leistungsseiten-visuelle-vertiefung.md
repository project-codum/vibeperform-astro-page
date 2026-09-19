# Visuelle Vertiefung der Leistungsseiten

## Ziel und bestehende Struktur
Die gemeinsame Reihenfolge bleibt: Einstieg → Ausgangslage → Leistung und Ergebnis → Zusammenarbeit → passende Ergänzungen → FAQ → Kontakt. Die neue Visualisierung steht jeweils im Leistungsumfang, vor den unveränderten Lieferbestandteilen. Die kleinen Hero-Beispiele dieser drei Seiten entfallen, damit sich Motive nicht wiederholen.

## Website überarbeiten
- Besucherziel: verstehen, welche konkrete Verbesserung ein Relaunch bringt.
- Struktur des Beispiels: bisherige Website → überarbeitete Website → Orientierung, Lesbarkeit, Kontaktweg.
- Erwartete Frage: „Muss alles neu?“ Die Darstellung behält Unternehmensname und Leistungsgegenstand bei und verändert deren Aufbereitung.
- Darstellung: große bedienbare Vorher/Nachher-Umschaltung. Beide Zustände ohne JavaScript untereinander. Kein erfundenes Kundenprojekt.

## Website-Betreuung
- Besucherziel: laufende Weiterentwicklung an greifbaren Änderungen erkennen.
- Struktur: neue Leistung → aktuelle Projektbilder → klarer Kontaktweg. Ein Beispielbetrieb bleibt über alle drei Zustände gleich.
- Erwartete Frage: „Was passiert für mein Geld?“ Konkrete Änderungen beschreiben; Umfang und Abstimmung bleiben den vorhandenen Leistungstexten vorbehalten.
- Darstellung: kurze Folge mit drei Textschritten und einer auf Desktop stehenbleibenden Websitevorschau. Mobile, reduzierte Bewegung und JavaScript-Ausfall zeigen alle Beispiele direkt bei den Texten. Keine erzwungene Scrollbewegung, keine Erfolgszahlen.

## Texte & Grafiken
- Besucherziel: Zusammenhang von Fakten, Sprache und Gestaltung sehen.
- Struktur: Ausgangsfakten → Headline und Fließtext → Typografie, Farben, Bildwelt als zusammenhängende Komposition.
- Erwartete Frage: „Passt das zu meinem Unternehmen?“ Beispiel klar kennzeichnen, individuelle Abstimmung erläutern. Die dargestellte Palette ist keine zusätzliche Zusage zur Logo-/Markenentwicklung.
- Darstellung: statische redaktionelle Fläche mit bestehenden generierten Motiven, großer Typografie und Farbmustern mit Hexwerten.

## Hintergrund und Prüfung
Die dunklen Anschlussabschnitte der gemeinsamen ServiceDetail-Komponente erhalten eine statische angeschnittene Lavendelform am Rand. Text bleibt auf ruhiger dunkler Fläche. Kein weiterer animierter Hero.
Prüfen: DE/EN, Desktop und 320px, kein horizontaler Überlauf, Umschaltung per Tastatur, Scrollzustände, reduzierte Bewegung, alle Beispiele ohne JS, bestehende Tests und Build.

## Umgesetzt und geprüft
- Gemeinsame Komponenten `ServiceShowcase.astro` und `ServiceExample.astro`, Stile in `service-showcase.css`; DE und EN.
- Vorher/Nachher mit nativen Buttons, `aria-pressed`, zugehörigen Panels und sichtbarem Tastaturfokus. Umschaltung in beide Richtungen mit Enter im Browser geprüft.
- Betreuung: drei Scrollzustände auf Desktop im Browser geprüft. Sticky-Darstellung nur ab 960px Breite, 720px Höhe und ohne reduzierte Bewegung. Kurze Fenster, Tablet und Mobil erhalten die direkt zugeordneten Bilder. Kein Scroll-Hijacking.
- Typografie-/Bildkomposition und Hintergrund am Desktop visuell geprüft; englische Gestaltungsfläche mobil visuell geprüft.
- Alle sechs betroffenen Sprachvarianten bei 320px ohne horizontalen Dokumentüberlauf. Betreuung bei 900px mit drei sichtbaren Inline-Beispielen geprüft.
- Build und 56 bestehende Tests erfolgreich. Betroffene Layoutprüfung an die Verlagerung der Grafiken aus dem Hero in den Leistungsumfang angepasst.
- Server-HTML: beide Vergleichszustände und alle drei Betreuungsbilder ohne anfängliches Verbergen vorhanden. Reduced-Motion-Fallback im Code berücksichtigt; keine separate OS-Emulation im Browser durchgeführt.
- Keine Browser-Konsolenfehler im Prüf-Tab beobachtet. Generierte Bilder sind als Gestaltungsbeispiele gekennzeichnet.
- Lokal auf `develop`; nicht veröffentlicht.


## Überarbeitung des Relaunch-Vergleichs nach Nutzerfeedback
Ziel: Ein echter Wechsel von einer alten zur neu aufgebauten Website soll erkennbar sein. Das bisherige Motiv veränderte überwiegend den Einstieg und vermittelte zu wenig strukturellen Unterschied.

- Vorher: fiktiver Schreinerbetrieb in Holzoptik, klassisches Seitenmenü, allgemeine Begrüßung, Fließtext mit kleinem Foto, separate Aktuelles-/Kontaktspalte.
- Nachher: gleicher Betrieb und gleiche Leistungen; klare Navigation, großzügiger Einstieg, drei getrennte Leistungsangebote, großer visueller Einblick und direkter Anfrageabschnitt. Eigenständige, ruhige Grün-/Naturpalette für den Beispielbetrieb.
- Erwartete Besucherfrage: „Was verändert sich außer den Farben?“ Beide Zustände erhalten eine ausgeschriebene Abfolge des Seitenaufbaus und drei konkrete Hinweise zu den Änderungen.
- Der Vergleich beginnt bei „Vorher“. „Nachher“ zeigt die vollständige neue Seite mit kurzem Übergang; reduzierte Bewegung deaktiviert diesen.
- Eigene Komponente RelaunchExample; das bestätigte Betreuungsbeispiel bleibt eigenständig. Kein konkreter Mitbewerber wurde kopiert oder als Negativbeispiel bezeichnet. Fiktiver Betrieb und generierte Motive werden gekennzeichnet.
- Prüfung des überarbeiteten Vergleichs: alte Desktopseite, neuer Einstieg und unterer Gestaltungs-/Kontaktabschnitt visuell kontrolliert. Beide Sprachfassungen und beide Zustände bei 320px ohne horizontalen Überlauf; Wechsel per Enter bestätigt. Keine Konsolenfehler im Prüf-Tab. Build und 56 Tests erfolgreich.
