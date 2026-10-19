# Nachher-Beispiel: Leistungsbilder · 19.10.2026

Status: Gestaltung einschließlich Innenausbau-Close-up am 19.10.2026 von Marlon freigegeben. Commit, Merge und Veröffentlichung ausdrücklich beauftragt; Auslieferungsnachweis wird nach dem Deployment in der Vorgangsakte ergänzt.

## Änderung

Die drei abstrakten CSS-Möbel wurden durch fotografische Beispielmotive ersetzt. Desktop: drei gleich große Bildflächen im Verhältnis 4:3; Mobil: eine Spalte und 3:2. Überschriften und Abstände wurden angepasst, die Linkzeilen sind auf Desktop ausgerichtet. Texte, Vorher-Ansicht und übrige Seite bleiben im bisherigen Stand. Die geteilte Komponente gilt für DE und EN.

Lokale Vorschau: http://127.0.0.1:4325/de/website-ueberarbeiten/#umfang — „Nachher“ wählen. Im geöffneten Vorschautab ist diese Auswahl bereits aktiv.

## Medienregister

| Datei in src/assets/website-service/ | Herkunft | Einsatz und Bearbeitung | Status |
|---|---|---|---|
| bespoke-sideboard-v1.png | Neues Motiv mit eingebautem image_gen am 19.10.2026; Original exec-c65ea14b-641e-44f2-9b30-0a7eb1b47871.png | Möbel nach Maß; responsive WebP durch Astro, CSS-Bildausschnitt | KI-generiertes Motiv für fiktives Gestaltungsbeispiel; lokale Durchsicht |
| fitted-wardrobe-v1.png | Neues Motiv mit eingebautem image_gen am 19.10.2026; Original exec-e536c49c-b26a-4dda-a375-d21b128e1707.png | Einbauschränke; responsive WebP durch Astro, CSS-Bildausschnitt | KI-generiertes Motiv für fiktives Gestaltungsbeispiel; lokale Durchsicht |
| interior.png | Vorhandenes generiertes Motiv im Projekt, unverändert weiterverwendet | Großes Aufmacherbild der Nachher-Ansicht und kleines Vorher-Bild; aus der Leistungskarte entfernt | Bestehende Kennzeichnung als KI-Motiv bleibt erhalten |
| interior-joinery-closeup-v1.png | Mit eingebautem image_gen aus interior.png als Referenz am 19.10.2026 erzeugte Detailansicht; Original exec-dc73c887-5e6f-4c9e-ad06-8e3fc4478e9b.png | Innenausbau; Close-up von Eichen-Regalanschluss und Holzmaserung statt wiederholter Raumszene; responsive WebP durch Astro | Generativ abgeleitetes Motiv, kein reiner Bildbeschnitt; lokale Durchsicht |

Die Originale der drei neuen Motive liegen außerdem unter /Users/marlondietrich/.codex/generated_images/01a15383-3be5-7ca2-b1da-8482a7ebd628/. Keine realen Kundenprojekte oder Personen dargestellt. Die sichtbare Kennzeichnung des fiktiven Schreinerbetriebs und der KI-Motive unter dem Vergleich bleibt bestehen. Marlon hat die finale Gestaltung samt Close-up und ihre Veröffentlichung am 19.10.2026 freigegeben.

## Prüfung

- Produktions-Build: 61 Seiten erfolgreich erstellt.
- Bestehende Service-Tests: 20/20 erfolgreich.
- Gerenderte DE-Ansicht bei 1440, 768, 390 und 320 Pixeln: alle drei Bilder geladen; keine horizontalen Seiten- oder Kartenüberläufe.
- Vorher/Nachher in beide Richtungen geprüft.
- Desktop- und Mobil-Screenshots visuell geprüft. Für die Bereichsaufnahmen wurden nur Astro-Entwicklerleiste und die außerhalb des Ausschnitts liegende Sticky-Position der Vergleichsleiste in der Screenshot-Aufnahme ausgeblendet.

## Prompts (eingebautes image_gen)

### Sideboard

Use case: photorealistic-natural. Asset type: landscape service-card photograph for an explicitly fictional joinery website design demo. Primary request: refined architectural interior editorial photograph of one beautiful bespoke solid oak sideboard in a warm minimal contemporary home. Low cabinet with three perfectly aligned doors, elegant recessed dark plinth, realistic oak grain and detailed joinery; a handmade off-white ceramic vase with two slim branches on top, one small dark ceramic bowl. Matte warm ivory plaster wall, subtle sage green textile on far left, natural travertine floor. Composition: eye-level slightly angled view, entire sideboard visible with generous breathing room, cabinet is main subject, landscape 3:2 composition. Soft natural daylight from left, convincing gentle shadows, restrained warm oak, ivory and muted olive palette, premium European interiors magazine quality, crisp but natural materials. No people, no letters, no logos, no text, no graphic elements, no collages, no watermark.

### Einbauschrank

Use case: photorealistic-natural. Asset type: landscape service-card photograph for an explicitly fictional joinery website design demo. Primary request: refined architectural interior editorial photograph of a beautifully tailored floor-to-ceiling fitted wardrobe in a quiet modern bedroom. Four flush warm natural oak doors with clean realistic vertical seams and small discreet bronze pulls, seamlessly fitted between ivory plaster walls; one narrow open niche on the right with warm concealed light and a neatly folded linen throw. Only a small portion of a cream upholstered bench in foreground, pale oak floor. Composition: straight architectural verticals, eye-level almost frontal view with slight angle, wardrobe clearly readable as fitted furniture, full height visible, landscape 3:2. Gentle natural daylight, restrained warm oak, ivory and muted olive palette, premium European interiors magazine quality, realistic wood texture and construction. No people, no text, no logos, no watermarks, no collage, no graphic elements.


### Innenausbau: Close-up · Feedbackrunde 2

Marlon wünschte eine Detailansicht, da die wiederholte Raumaufnahme besonders mobil auffiel. Das dritte Kartenmotiv wurde durch ein generativ abgeleitetes Close-up ersetzt; das große Aufmacherbild bleibt erhalten. Produktions-Build erneut erfolgreich (61 Seiten). Browserprüfung bei 1440, 390 und 320 Pixeln: alle Motive geladen, keine horizontalen Überläufe, Close-up visuell kontrolliert.

Edit target: the supplied generated living-room image. Use case: precise-object-edit. Create a tight architectural editorial close-up taken from this SAME room, focusing on the left built-in oak shelving, the solid oak shelf edge and its precise junction with the vertical oak window reveal. Reframe/zoom in strongly so the image reads as a tactile craftsmanship detail rather than another room overview: show one thick horizontal oak shelf meeting the vertical oak side panel, visible end grain, subtle natural grain and immaculate joinery. Include a small section of the existing stoneware bowl and blurred leafy plant for continuity, and a narrow edge of the window on the far left with soft daylight. Maintain the original warm oak material, ivory, muted olive palette, natural lighting and understated premium photographic style. The oak joinery must dominate at thumbnail size. No whole-room view, no sofa, no lounge chair, no fireplace, no coffee table, no new furniture design, no tools or hands. Landscape 3:2 composition, realistic straight construction, no text, no labels, no logos or watermark. Preserve continuity with the original room but deliver a substantially tighter camera framing for the third service card of a joinery website.


