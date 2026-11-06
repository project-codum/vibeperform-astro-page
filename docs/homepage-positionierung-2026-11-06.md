# Startseite: Projektbeleg und Zusammenarbeit

Quelle: Marlons vier Annotationen vom 6. November 2026 im laufenden Webseitenchat. Lokale Umsetzung, keine Veröffentlichung.

- HMS Loistl: bisherige Stockfotos zeigten weder betreute noch gewünschte Gebäudetypen. Ziel sind große Mehrfamilienhäuser; der Eingang wurde als Motiv bewusst in den Vordergrund gestellt. Alle Servicegebiete und einzelne Leistungen wurden auf eigenen Seiten beschrieben.
- Bildmaterial kam vom Kunden nach Motivvorschlägen von VibePerform, darunter viele Vorher-Nachher-Vergleiche. Regelmäßige Google-Profilbeiträge sollen laufende Arbeit und Verlässlichkeit vermitteln; keine gemessene Wirkung behauptet.
- Erstgespräch: aktuellen Auftritt gemeinsam durchgehen, Positionierung und Vertriebsrichtung aus Unternehmenszielen und Bereitschaft zum Außenauftritt entwickeln. Kein pauschales Ergebnis, Zeit- oder Kostenversprechen ergänzt.
- Deutsche Startseite: Sie-Ansprache und Webseite/Webseiten. Keine globale Änderung von Company-Regeln oder anderen Angeboten.

Die Motivbegründung ist kein Herkunftsnachweis des neuen Hero-Bildes; es wird nicht als Foto eines tatsächlich betreuten Objekts bezeichnet.

## Bildliche Darstellung und Kalender

Drei visuelle Karten: vorhandene Webseitenaufnahmen zur Motivwahl; schematischer Auszug der Leistungs- und Gebietsseiten; echtes Bildpaar rasen-vorher.jpg / rasen-nachher.jpg aus dem bestehenden Loistl-Projekt (outputs/loistl-webseiten-update-2026-10-27/website/src/assets/loistl). Unveränderte Originalkopien in src/assets/case-studies/loistl; Astro erzeugt WebP-Ausgaben. Paarzuordnung visuell und über servicePages.ts geprüft. Kundenseitig geliefertes Material gemäß Marlon; diese lokale Vorschau ist keine neue Publikationsfreigabe. Kein Google-Post oder Ergebnis fingiert.

Kalender auf beiden Startseiten automatisch geöffnet, iframe mit nativem Lazy-Loading und ohne Fokusübernahme. Andere Seiten behalten Klick-zum-Laden. Schließen/Wiederöffnen und externer Buchungslink bleiben verfügbar. Beschreibung der technischen Einbettung in DE/EN entsprechend angepasst.

## Redaktionelle Vereinfachung

Weitere Browserkorrekturen: Nummern, drei Kartenüberschriften und Zusatzbeschriftungen entfernt; Vorher/Nachher als hervorgehobene Absätze. Prozess mit Vorschläge, Liefern, Umsetzen. Solln ersetzt Pullach ausschließlich im dargestellten Seitenauszug. Zusammenarbeit rechts mit schematischem Fotovorschlag, bestehendem Kundenbildpaar und Originalaufnahme der umgesetzten Webseite illustriert. Der Fotovorschlag ist eine Ablaufillustration, kein historisches Projektdokument.

## Englische Startseite synchronisiert

Die aktuelle deutsche Fassung wurde nach Englisch übertragen: Hero ohne Kicker, kursiver Schwerpunkt, Intro unter den Buttons; vollständige Projektkarten mit Before/After und Suggest/Supply/Create; gleicher bebilderter Ablauf; aktualisierte Leistungslinks, FAQ-Antwort zum Bildmaterial und Erstgespräch. Gemeinsame Komponenten verwenden lokalisierte Inhalte einschließlich Bildbeschreibungen. Originalaufnahmen der deutschen Kundenwebseite bleiben unverändert.

Prüfung: Produktionsbuild mit 62 Seiten erfolgreich; 19 relevante Homepage-, Bildvergleich- und Kalender-Tests bestanden; git diff --check ohne Befund. Beide Sprachfassungen bei 1440, 850, 390 und 320 Pixel Breite geprüft: kein horizontaler Seitenüberlauf, keine überlaufenden geprüften Karten-/Buttontexte, keine defekten geladenen Projektbilder. EN-Hero, Projektkarten, Ablauf und Kalender zusätzlich visuell geprüft. Projektanker, zentrierter Pfeil, mobiler Vorher/Nachher-Wechsel und Kontaktfenster geprüft. Kalender automatisch sichtbar, englische Google-Bedienoberfläche geladen, Schließen/Wiederöffnen funktioniert. Keine Buchung ausgelöst.

Verbleibende externe Sprachgrenze: Google liefert den hinterlegten Termintitel „Kennenlerngespräch“ und die Agenda weiterhin auf Deutsch aus, auch mit hl=en. Diese Inhalte gehören zur Google-Buchungsseite und wurden nicht geändert. Lokal umgesetzt, nicht veröffentlicht.

## Verbundene Seitenstruktur und Caption-Bewegung

Browserkorrekturen vom 6. November: Verbindungen vom HMS-Loistl-Knoten über beide Kategorien bis zu jeder Unterseite geschlossen. Die senkrechten Linien hängen an den tatsächlichen Kachelhöhen und enden mittig an der letzten Kachel; beide Sprachen und schmale Ansichten berücksichtigt.

Der Leitgedanke baut sich beim ersten Eintritt der Überschrift in den sichtbaren Bereich Wort für Wort auf. Bewegungsquelle: Mareike Marketing Content Generator, assets/templates/hyperframes/vibeperform-caption-edit/caption-engine.js (kurzer Pop, violette Aktivfarbe, back.out, anschließend 0,12 Sekunden Zurückfedern). Für die Webseite ersetzt ein Lesetakt die Sprachzeitstempel; der vollständige Satz bleibt stehen. Die bestehende Schriftgestaltung und drei Zeilen bleiben erhalten. Ohne JavaScript, ohne IntersectionObserver und bei reduzierter Bewegung ist der Satz unmittelbar lesbar. Bei nachträglich aktivierter Bewegungsreduktion wird die Animation beendet und alles sichtbar.

Prüfung: Build mit 62 Seiten und 10 Homepage-Tests bestanden. DE/EN bei 320, 390, 1145 und 1920 Pixeln ohne horizontalen Seitenüberlauf oder überlaufende Kacheltexte. Scrollstart, sukzessive Wort-Sichtbarkeit und Abschluss beider Sprachen im Browser überprüft; zusätzlich reduzierte Bewegung und JavaScript-deaktivierter Kontext. Verbindungslinien auf Desktop und Mobil sowie mobile Enddarstellung visuell geprüft. Lokal umgesetzt, nicht veröffentlicht.

### Korrektur der Wortanimation

Nach Nutzerfeedback zum Flackern ersetzt: Jedes Wort erscheint sofort mit voller Deckkraft bei 112 % Größe und schrumpft in 0,32 Sekunden auf 100 %. Kein Farbwechsel, keine Helligkeits-/Unschärfefilter, keine vertikale Bewegung und kein Zurückfedern. Wortabstand mindestens 0,32 Sekunden. DE/Desktop und EN/Mobil im Browser über Zeitproben geprüft: konstante Farben, ausschließlich volle Deckkraft sichtbarer Wörter und monoton abnehmende Größe. Build und 10 Homepage-Tests bestanden.
