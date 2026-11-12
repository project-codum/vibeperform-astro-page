# Lokale Integration zur Freigabe – 12. November 2026

Status: lokal integriert und geprüft; noch nicht gepusht oder veröffentlicht.
Produktionsbasis: `a25558f` (PR #59). Vorschau: http://127.0.0.1:4330/de/
Integrationszweig: `codex/local-integration-20261112`.

## Reihenfolge und Umfang

1. `7d6bc5f` / Merge `71bb681`: offene Startseitenkorrekturen aus dem Repositionierungs-Arbeitsstand. Ansprechpartnerlink im Hero entfernt, Überschriften über den Zusammenarbeitsbeispielen, responsive E-Mail-Illustration als HTML/CSS statt Rasterbild, angepasste DE/EN-Kontaktüberschrift und mobile Schriftgröße. Generierte Markdown-Gegenstücke aktualisiert.
2. `b07b770` / Merge `3e303cd`: gemeinsame Kontaktbuttons, Kalenderbeschriftungen ohne Pfeil und mit korrektem Analytics-Ort, Lenis 1.3.27 aus dem älteren lokalen Entwurf. Die Integration verwendet einen bedarfsgesteuerten RAF statt einer permanent laufenden Schleife. Native Touch-Bewegung, Tastatur, Fragment/Fokus, Dialogsperre, Seitenwechsel und reduzierte Bewegung bleiben berücksichtigt.
3. `a5b8cfc` / Merge `078dba0`: acht ungenutzte frühere Landingpage-/React-Module entfernt; React, React-DOM und die ungenutzten Astro-React-/MDX-Abhängigkeiten entfernt. npm entfernte 66 installierte Pakete. Vorhandene Betriebsdokumentation übernommen und neue Cache-Konfiguration bewahrt.

Neuere veröffentlichte Entscheidungen haben Vorrang vor widersprechenden älteren Entwürfen: aktueller dreistufiger Aufbau der Webseitenerstellung, Preise, Kontakttexte mit Erstbewertung, automatisch geöffneter Kalender, runde Buttons und aktuelles Favicon bleiben bestehen. Alte Änderungen an der ersetzten WebsiteStory-Darstellung werden nicht zurückgespielt. Die zuletzt veröffentlichte mobile Fallstudie, Portraitreaktion und scrollgesteuerte Wortanimation bleiben erhalten.

## Aufräumen und zurückgestellte Arbeit

Die lokalen Zweige `codex/h1-keywords-2026-10-15`, `codex/favicon-spark-20261026` und `codex/favicon-maximum-size` wurden wie beauftragt gelöscht. Die beiden separaten sauberen H1-/Favicon-Worktrees wurden entfernt. Der Haupt-Checkout steht sauber auf der Produktionsbasis. Seine separat übernommenen technischen Änderungen wurden vor dem Wechsel zusätzlich im Git-Stash `1bb06034ab013f40db4136f8b07937d2566f9f13` gesichert. Das aktuelle Live-Favicon wurde nicht entfernt.

Der Webinar-Arbeitsstand bleibt unverändert und wird nicht integriert.

## Prüfung

- Abschließender Produktionsbuild und alle 121 Node-Tests erfolgreich, ohne ausgelassene Tests.
- Deutsche und englische Startseite bei 320, 374, 541 und 1440 CSS-Pixeln ohne horizontalen Überlauf, genau eine H1, E-Mail-Illustration und automatisch öffnender Kalender vorhanden.
- Webseitenerstellung, Betreuung, Über uns und Blog zusätzlich mobil geprüft; gemeinsame Kontaktbuttons vorhanden. Keine JavaScript-Laufzeitfehler oder fehlerhaften lokalen Ressourcen bei den geprüften Seiten.
- Lenis: kein eigener RAF im Ruhezustand, aktive Mausradinterpolation und Ende des RAF nach Stillstand geprüft. Das gemeinsame komprimierte Script einschließlich Lenis beträgt lokal 6.387 Bytes gzip (unkomprimiert 21.813 Bytes).
- Wortanimation bleibt ohne Scrollbewegung stehen; geht per Mausrad und nativer Touch-Geste weiter. Fertiger Text bleibt beim späteren Ankern vollständig sichtbar.
- Kontaktanker aktualisiert Fragment und Tastaturfokus. Kalender schließen und wieder öffnen geprüft.
- Mobile Vorher-/Nachher-Schalter sowie Kontaktdialog geprüft; Hintergrund während des Dialogs gesperrt, Scrollen nach Escape wieder möglich.
- Reduzierte Bewegung beim Laden und beim Wechsel der Systemeinstellung geprüft. Ohne JavaScript bleibt der externe Kalenderlink sichtbar.

Keine produktive Anfrage und keine E-Mail gesendet. Der Merge nach `master` würde automatisch veröffentlichen und wartet deshalb auf die ausdrücklich verlangte Freigabe dieser Vorschau.
