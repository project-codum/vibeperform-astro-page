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

## Aufbau und Input nach Browserfeedback

Lokale Überarbeitung: Der erklärende HMS-Loistl-Block mit den zwei Detailkarten entfällt; der große Webseitenvergleich bleibt erhalten. In der Zusammenarbeit heißt Schritt 2 jetzt „Sie geben Input“ und erklärt WhatsApp, Sprachnachrichten und E-Mails mit Anhang. Ein generiertes E-Mail-Beispiel ersetzt dort die Kundenfotos. Es enthält neutrale Beispieldaten und ist keine echte Kundenkorrespondenz. Die Originalbilder rasen-vorher.jpg und rasen-nachher.jpg erscheinen in Schritt 3 als gestalteter Vergleich auf dunkelgrünem Grund entsprechend der gelieferten Webseitenreferenz. Der Text stellt die redaktionelle/gestalterische Arbeit und die Freigabe des Kunden klar.

Der Leitgedanke steht jetzt zwischen Zusammenarbeit und Leistungen. Vier offene, abwechselnde Bild-Text-Abschnitte ersetzen die Leistungskacheln: Webseite, Unternehmensprofil, laufende Betreuung und Suchmaschinenoptimierung. Die bestehenden Animationen, Links und das 90%-Badge bleiben; der Suchabschnitt erhält eine schematische Suchgrafik ohne behauptete Platzierungen. Auf Mobil folgen die Grafiken dem jeweiligen Text. Beide Sprachen und die maschinenlesbare Fassung sind synchronisiert.

Bildquellen: Built-in Imagegen, neue fiktive E-Mail-Illustration und englische Textlokalisierung; Assets unter src/assets/collaboration/input-email-de-documents.png und input-email-en-documents.png. Astro liefert responsive WebP-Dateien. Prompt und Verwendung in docs/collaboration-email-illustration.md. Die echten Vorher-Nachher-Fotos bleiben unverändert.

Prüfung: Build mit 62 Seiten, alle 115 Tests, git diff --check. DE/EN bei 1440, 1042, 768, 390 und 320 Pixeln: keine horizontalen Überläufe, abwechselnde Grafikpositionen auf Desktop und korrekte Stapelung mobil. Zusammenarbeit und Leistungsbereich visuell geprüft; Bilder geladen, Leistungslinks lokalisiert und Animationen bei Sichtbarkeit aktiv. Lokal, noch nicht veröffentlicht.

Nachkorrektur: Die generierte E-Mail zeigt ausschließlich Dokumentanhänge vorher.jpg/nachher.jpg, keine Fotos oder Vorschaubilder. DE und EN entsprechend ersetzt. Originalfotos weiterhin nur im umgesetzten Vergleich.
