# Beispiel-E-Mail für den Input-Schritt

Erzeugt mit dem integrierten Imagegen-Werkzeug. Referenz war die vom Nutzer gezeigte E-Mail-Ansicht mit separatem Anhangsbereich. Die Grafik ist eine fiktive Illustration: keine echte Kundenmail, keine Kundendaten und kein Beleg tatsächlich gelieferter Bilder. Der Vorher-Nachher-Vergleich im nachfolgenden Umsetzungsschritt verwendet hingegen die vorhandenen Originalfotos von HMS Loistl.

Assets:
- src/assets/collaboration/input-email-de-documents.png
- src/assets/collaboration/input-email-en-documents.png

Generierungsprompt:

Use case: ui-mockup. Create a polished fictional email-with-attachments illustration for the VibePerform agency website. Landscape 4:3, front-facing flat UI, no perspective. Inspired by a Gmail message layout: circular sender avatar at top left, subject and sender rows, a short message, separator, two attachment thumbnails side by side below. It must be a DUMMY, not a reproduction of real customer correspondence. Replace all personal names, email addresses, dates, and private correspondence with neutral sample content. Large readable subject "Projektbilder", sender "Ihr Betrieb", short body "Anbei die neuen Bilder.", attachment labels "vorher.jpg" and "nachher.jpg". Both thumbnails show a small beige apartment building and lawn, first with autumn leaves, second with tidy green lawn. Cream-white email panel on very pale lavender #eee6f3, muted plum #745188 details, small peach #ffb194 accent, crisp dark text, subtle border, ample spacing. Minimal clean editorial illustration with sufficiently bold UI elements to remain understandable as a small website image. No real brand logos, no timestamps, no real addresses, no device frame, no watermark. Only the quoted German text, no other text.

Lokalisierungsprompt:

Localize this fictional email illustration into English. Keep the entire composition, colors, images, typography and layout unchanged. Replace only these strings: "Projektbilder" with "Project photos"; "Ihr Betrieb" with "Your business"; "Anbei die neuen Bilder." with "Here are the new photos."; "vorher.jpg" with "before.jpg"; "nachher.jpg" with "after.jpg". Add nothing else.

## Gültige Korrektur: reine Dateianhänge

Nach Nutzerfeedback ersetzt die gültige Fassung die Fotovorschauen durch zwei Dokument-Symbole mit Büroklammer und den Dateinamen vorher.jpg/nachher.jpg bzw. before.jpg/after.jpg. Keine Bildvorschauen. Die Dateien an den oben genannten Asset-Pfaden enthalten diese korrigierte Version.

Edit-Prompt (Built-in Imagegen):

Edit this email illustration. Keep the heading "Projektbilder", sender "Ihr Betrieb", message "Anbei die neuen Bilder.", colors and crisp flat email UI style. Completely remove BOTH photograph previews. Replace the entire lower attachments area with TWO simple compact document attachment tiles side by side. Each tile has only a neutral folded-paper document icon with a paperclip and the filename: "vorher.jpg" and "nachher.jpg". No photos, no landscapes, no thumbnails, no picture icons, no decorative imagery inside attachments. Make these clearly look like downloadable files with no preview. Use cream tiles, thin pale lavender borders, plum icons. Rebalance whitespace for a compact 4:3 composition. No new text, no real personal data.

Englische Lokalisierung: gleicher Austausch der fünf Texte wie oben, mit zusätzlicher Vorgabe "The attachments must remain simple documents, no image previews or photographs."
