# Marlon Dietrich: Agenturseiten-Porträt

## Interaktive erschrockene Mimik · 12.11.2026

`marlon-studio-portrait-surprised-v1.png` ist eine mit dem integrierten Bildwerkzeug generativ bearbeitete Ableitung von `marlon-studio-portrait-v1.png`: geweitete Augen und runder offener Mund bei erhaltenem Ausschnitt, Hintergrund und Kleidung. Marlon hat die Fassung, den späteren Wechsel bei stärkerer Verzerrung sowie Commit, Merge und Veröffentlichung am 12.11.2026 bestätigt.

Einsatz: ausschließlich als interaktive zweite Textur in der Homepage-Bubble (DE/EN). Astro erzeugt eine 512 × 640 Pixel große WebP-Datei (23.646 Bytes im geprüften Build). Sie lädt mit niedriger Priorität nach dem normalen Porträt, nicht auf Touch-Geräten oder bei reduzierter Bewegung. Der Shader nutzt den pro Frame berechneten Verzerrungswert; beide Texturen werden nur während des Übergangs abgefragt. Bei Ladefehler bleibt das Original aktiv. Die 30-fps-Begrenzung, Sichtbarkeitspausen und GPU-Aufräumlogik bleiben erhalten.

Bild und vollständiger Prompt: [Mediennachweis in Drive](https://drive.google.com/file/d/1Zorl0wNxJLJG4bJ8qHth7Mo-kE1souKu/view).

Quelle: vom Nutzer bereitgestelltes Foto `PXL_20260917_144523587~2.jpg`.
Bildbearbeitung: KI-bearbeitetes Studioporträt, Version 1 vom 19.09.2026; vom Nutzer mit „top“ für die Agenturseite bestätigt.
Original des freigegebenen Ergebnisses: `KI-Beratung/outputs/marlon-portrait-2026-09-19/marlon-studio-portrait-v1.png`.
Der Build erzeugt responsive WebP-Varianten. Das ältere Foto unter `public/marlondietrich.webp` bleibt für andere bestehende Verwendungen unverändert.

## Porträt über dem Rahmen · 13.10.2026

`marlon-studio-portrait-outside-frame-v1.png` ist die von Marlon bestätigte Variante für den Hero auf `/de/ueber-uns/` und `/en/about-us/` sowie deren Open-Graph-, Twitter- und Person-Bildmetadaten. Kopf und Haare ragen über den warmen Hintergrund mit abgerundeter rechter oberer Ecke hinaus. Das Bild enthält den dunklen Außenhintergrund und ist nicht transparent; es wird vollständig ohne zusätzlichen Beschnitt angezeigt. Der Build erzeugt responsive WebP-Ableitungen.

Quelle: bereitgestellte Freistellung `marlon-studio-portrait-transparent.png`, generativ bearbeitet mit dem integrierten Bildwerkzeug. Bestätigtes Ergebnis im Agenturprojekt: `outputs/marlon-portrait-frame-2026-10-13/marlon-studio-portrait-outside-frame-v1.png`; dort liegt auch der verwendete Prompt. Marlon hat am 13.10.2026 Push, Merge und Veröffentlichung einschließlich DE/EN und Metadaten ausdrücklich beauftragt. Das ursprüngliche Studioporträt bleibt für den runden Kontaktbereich erhalten.
