import type { Locale } from '../lib/siteMetadata';
export const detailPaths = {
 de: { redesign:'/de/website-ueberarbeiten/', support:'/de/website-betreuung/', seo:'/de/suchmaschinenoptimierung/', profile:'/de/google-unternehmensprofil/', content:'/de/texte-grafiken/', ai:'/de/ki-strategie/' },
 en: { redesign:'/en/website-redesign/', support:'/en/website-support/', seo:'/en/search-engine-optimisation/', profile:'/en/google-business-profile/', content:'/en/copy-graphics/', ai:'/en/ai-strategy/' },
} as const;
export type ServiceKey = keyof typeof detailPaths.de;
export const serviceKeys = Object.keys(detailPaths.de) as ServiceKey[];
type Pair = [string,string];
export interface ServiceDetail {
 name:string; description:string; title:Pair; intro:string; kicker:string;
 problemTitle:Pair; problems:Pair[]; scopeTitle:Pair; scopeIntro:string; scope:Pair[]; boundary:string;
 process:Pair[]; contribution:string; related:ServiceKey[]; faq:Pair[]; contact:string;
 visual:{ label:string; title:string; accent:string; rows:string[]; note:string; };
}
export const serviceDetails:Record<Locale,Record<ServiceKey,ServiceDetail>> = {
  "de": {
    "redesign": {
      "name": "Website überarbeiten",
      "description": "Ihre bestehende Website gezielt überarbeiten: Struktur, Inhalte, Design und Kontaktwege auf den heutigen Stand bringen. Mit VibePerform.",
      "kicker": "Website-Überarbeitung & Relaunch",
      "title": [
        "Ihr Betrieb ist weiter.",
        "Ihre Website auch?"
      ],
      "intro": "Ihre Website darf zeigen, wo Ihr Unternehmen heute steht. Wir prüfen den bestehenden Auftritt, erhalten Bewährtes und überarbeiten, was Ihren Leistungen und Kunden nicht mehr gerecht wird.",
      "problemTitle": [
        "Es hat sich viel verändert.",
        "Zeit, es zu zeigen."
      ],
      "problems": [
        [
          "Die Leistungen sind weiter als die Website.",
          "Neue Angebote, Projekte oder Zielgruppen tauchen auf Ihrer Website kaum auf. Besucher sehen einen Stand, der Ihren Betrieb nicht mehr richtig beschreibt."
        ],
        [
          "Der nächste Schritt bleibt unklar.",
          "Informationen sind verteilt, wichtige Fragen bleiben offen und der Kontaktweg ist schwer zu finden."
        ],
        [
          "Auf dem Handy wird es mühsam.",
          "Texte, Bilder oder Navigation funktionieren auf kleinen Bildschirmen nicht so, wie Ihre Kunden es brauchen."
        ]
      ],
      "scopeTitle": [
        "Das Gute bleibt.",
        "Der Rest wird besser."
      ],
      "scopeIntro": "Aus dem bestehenden Auftritt entwickeln wir einen konkreten Überarbeitungsplan. Der Umfang reicht von gezielten Änderungen bis zu einem abgestimmten Relaunch.",
      "scope": [
        [
          "Bestand verstehen",
          "Wir sehen uns Seiten, Inhalte, Kontaktwege und die technische Grundlage an. Daraus entsteht ein Überblick über das, was bleiben kann und wo Handlungsbedarf besteht."
        ],
        [
          "Struktur und Inhalte ordnen",
          "Leistungen bekommen einen klaren Platz. Wir aktualisieren vereinbarte Texte und planen fehlende Inhalte aus Sicht Ihrer Kunden."
        ],
        [
          "Gestaltung und Bedienung verbessern",
          "Schrift, Bilder, Abstände und Navigation werden zu einem stimmigen Auftritt. Desktop und Mobilgeräte werden gemeinsam berücksichtigt."
        ],
        [
          "Änderungen umsetzen und prüfen",
          "Wir setzen den vereinbarten Umfang um und prüfen Darstellung und Kontaktwege. Werden Adressen verändert, berücksichtigen wir erforderliche Weiterleitungen."
        ]
      ],
      "boundary": "Ob das vorhandene System geeignet ist und welche Inhalte übernommen werden können, klären wir vor der Umsetzung. Ein vollständiger Neuaufbau oder zusätzliche Funktionen werden ausdrücklich vereinbart.",
      "process": [
        [
          "Website gemeinsam ansehen",
          "Sie zeigen uns den aktuellen Auftritt und erklären, was sich im Betrieb verändert hat. Wir prüfen Inhalte und verfügbare Zugänge."
        ],
        [
          "Überarbeitung festlegen",
          "Wir stimmen Prioritäten, betroffene Seiten und gewünschte Änderungen ab. Sie sehen, was erhalten bleibt und was neu entsteht."
        ],
        [
          "Umsetzen und abstimmen",
          "Sie prüfen die Vorschau und die fachlichen Angaben. Danach stimmen wir Veröffentlichung und Übergabe ab."
        ]
      ],
      "contribution": "Wir brauchen die bestehende Website, passende Zugänge, aktuelle Unternehmensinformationen und eine Person, die Rückmeldungen bündelt.",
      "related": [
        "support",
        "content"
      ],
      "faq": [
        [
          "Muss meine Website komplett neu gebaut werden?",
          "Das entscheiden wir nach einem Blick auf die bestehende Website. Oft lassen sich Inhalte und Teile der Gestaltung weiterverwenden. Bei technischen oder strukturellen Grenzen kann ein Neuaufbau sinnvoll sein."
        ],
        [
          "Können Sie mit unserem vorhandenen System arbeiten?",
          "Wir prüfen zuerst das eingesetzte System und die verfügbaren Zugänge. Danach können wir sagen, welche Änderungen darin möglich sind und ob eine andere technische Grundlage sinnvoll ist."
        ],
        [
          "Was passiert mit bestehenden Seiten und Links?",
          "Wir berücksichtigen die vorhandenen Seitenadressen im Überarbeitungsplan. Bei Änderungen planen wir notwendige Weiterleitungen und prüfen wichtige interne Links."
        ],
        [
          "Was kostet eine Überarbeitung?",
          "Der Aufwand hängt vom Bestand und den gewünschten Änderungen ab. Nach der Bestandsaufnahme erhalten Sie ein Angebot für den konkret vereinbarten Umfang."
        ],
        [
          "Können Sie die Website danach weiter betreuen?",
          "Ja, eine anschließende Betreuung können wir passend zum System und Ihrem Bedarf vereinbaren. Inhaltliche Änderungen und technische Aufgaben werden dabei konkret festgelegt."
        ]
      ],
      "contact": "Zeigen Sie uns Ihre aktuelle Website. Gemeinsam klären wir, was heute noch passt und was sich verändern sollte.",
      "visual": {
        "label": "Gestaltungsbeispiel",
        "title": "Klarer aufgebaut.",
        "accent": "Leichter verstanden.",
        "rows": [
          "Bisher",
          "Überarbeitet",
          "Behalten",
          "Überarbeiten",
          "Ergänzen"
        ],
        "note": "Struktur und Orientierung im Vergleich."
      }
    },
    "support": {
      "name": "Website betreuen & weiterentwickeln",
      "description": "Website-Betreuung für einen aktuellen Firmenauftritt: Inhalte pflegen, Verbesserungen priorisieren und vereinbarte Änderungen nachvollziehbar umsetzen.",
      "kicker": "Website-Betreuung & Weiterentwicklung",
      "title": [
        "Ihr Unternehmen verändert sich.",
        "Wir halten den Auftritt aktuell."
      ],
      "intro": "Eine neue Leistung, ein abgeschlossenes Projekt, eine bessere Antwort auf Kundenfragen: Wir kümmern uns um die vereinbarte Pflege und entwickeln Ihre Website Schritt für Schritt mit Ihnen weiter.",
      "problemTitle": [
        "Im Betrieb geht es weiter.",
        "Online bleibt etwas liegen."
      ],
      "problems": [
        [
          "Für die Pflege fehlt die Zeit.",
          "Neue Informationen sind vorhanden, schaffen es aber nicht auf die Website. Aktualisierungen werden immer wieder verschoben."
        ],
        [
          "Es gibt viele Ideen, aber keine Reihenfolge.",
          "Sie wissen, dass sich etwas verbessern ließe. Was zuerst sinnvoll ist, bleibt zwischen Tagesgeschäft und technischen Fragen offen."
        ],
        [
          "Es ist unklar, wer sich kümmert.",
          "Inhaltliche Änderungen und technische Aufgaben haben keine feste Zuständigkeit. Sie möchten nachvollziehen können, was erledigt wurde."
        ]
      ],
      "scopeTitle": [
        "Aktuell halten.",
        "Gezielt weiterentwickeln."
      ],
      "scopeIntro": "Wir legen gemeinsam fest, welche Aufgaben zu Ihrer Betreuung gehören. Fachliche Änderungen im Betrieb und verfügbare Daten helfen, sinnvolle Prioritäten zu setzen.",
      "scope": [
        [
          "Inhalte pflegen",
          "Vereinbarte Änderungen an Leistungen, Kontaktdaten, Bildern und Projekten werden auf der Website umgesetzt."
        ],
        [
          "Hinweise aus Daten einordnen",
          "Soweit passende Datenquellen verfügbar sind, betrachten wir Suchfragen und Nutzung. Wir halten fest, welche Beobachtungen eine Anpassung nahelegen."
        ],
        [
          "Verbesserungen umsetzen",
          "Aus den abgestimmten Prioritäten entstehen konkrete Änderungen an Texten, Abschnitten oder Kontaktwegen. Umfang und Reihenfolge bleiben nachvollziehbar."
        ],
        [
          "Technische Aufgaben abstimmen",
          "Wir klären, welche Prüfungen und Wartungsaufgaben zur eingesetzten Technik passen und übernommen werden sollen. Inhaltliche Pflege und technische Wartung werden getrennt beschrieben."
        ]
      ],
      "boundary": "Betreuung bedeutet einen vereinbarten Arbeitsumfang. Neue umfangreiche Seiten, zusätzliche Funktionen, Reaktionszeiten und technische Betriebsaufgaben werden gesondert festgelegt.",
      "process": [
        [
          "Ausgangspunkt klären",
          "Wir prüfen Website, Zugänge und vorhandene Informationen. Gemeinsam legen wir Zuständigkeiten und den passenden Betreuungsumfang fest."
        ],
        [
          "Nächste Aufgaben bestimmen",
          "Sie melden Änderungen im Betrieb. Wir ordnen diese mit vorhandenen Beobachtungen ein und stimmen die nächsten Verbesserungen ab."
        ],
        [
          "Umsetzen und rückmelden",
          "Wir bearbeiten die vereinbarten Aufgaben und dokumentieren den Stand. Spätere Beobachtungen helfen, die nächsten Schritte zu bestimmen."
        ]
      ],
      "contribution": "Sie informieren uns über Änderungen im Unternehmen, ermöglichen die vereinbarten Zugänge und prüfen neue fachliche Aussagen. Wir übernehmen die abgestimmte Arbeit am Auftritt.",
      "related": [
        "seo",
        "profile"
      ],
      "faq": [
        [
          "Ist Website-Betreuung dasselbe wie technische Wartung?",
          "Technische Wartung und inhaltliche Weiterentwicklung erfüllen unterschiedliche Aufgaben. Wir beschreiben im Angebot, welche technischen Prüfungen und welche Arbeiten an Inhalten oder Gestaltung enthalten sind."
        ],
        [
          "Betreuen Sie auch Websites, die jemand anderes erstellt hat?",
          "Wir sehen uns zuerst Technik, Zustand und Zugänge an. Danach klären wir, welche Betreuung wir für die vorhandene Website sinnvoll übernehmen können."
        ],
        [
          "Wird meine Website automatisch verändert?",
          "Neue fachliche Aussagen und Änderungen stimmen wir im vereinbarten Ablauf mit Ihnen ab. Die Betreuung berücksichtigt Ihre Informationen und Prioritäten."
        ],
        [
          "Was passiert, wenn nur wenige Nutzungsdaten vorliegen?",
          "Dann arbeiten wir mit konkreten Befunden, Kundenfragen und Änderungen in Ihrem Betrieb. Aus einer kleinen Datenbasis leiten wir keine vermeintlich gesicherten Erfolgssteigerungen ab."
        ],
        [
          "Was kostet die Betreuung und wie ist sie kündbar?",
          "Preis, Arbeitsumfang, Laufzeit und Kündigungsbedingungen legen wir im konkreten Angebot fest. So ist vor Beginn klar, welche Aufgaben und Bedingungen vereinbart sind."
        ]
      ],
      "contact": "Welche Änderungen bleiben bei Ihnen liegen? Erzählen Sie uns von Ihrer Website und dem Bedarf, den wir übernehmen sollen.",
      "visual": {
        "label": "Beispiel eines Pflegeablaufs",
        "title": "Ein klarer Plan.",
        "accent": "Sichtbare Fortschritte.",
        "rows": [
          "Ansehen",
          "Neue Leistung aufnehmen",
          "Abstimmen",
          "Projektbilder ergänzen",
          "Erledigt",
          "Kontaktangaben aktualisieren"
        ],
        "note": "Aufgaben und Status beispielhaft dargestellt."
      }
    },
    "seo": {
      "name": "Suchmaschinenoptimierung",
      "description": "SEO für Unternehmenswebsites: Kundenfragen recherchieren, passende Seiten entwickeln und Inhalte sowie technische Grundlagen gezielt verbessern.",
      "kicker": "Suchmaschinenoptimierung · SEO",
      "title": [
        "Die richtigen Fragen.",
        "Die passenden Antworten."
      ],
      "intro": "Ihre Kunden suchen nach einer Lösung. Wir richten Struktur und Inhalte Ihrer Website auf die Leistungen aus, die Sie tatsächlich anbieten – und auf die Fragen, die Menschen dazu stellen.",
      "problemTitle": [
        "Ihr Angebot ist da.",
        "Findet man die Antwort?"
      ],
      "problems": [
        [
          "Wichtige Leistungen haben keinen Platz.",
          "Was Sie anbieten, steht nur beiläufig auf der Website. Für konkrete Anliegen fehlt eine verständliche, passende Seite."
        ],
        [
          "Die Begriffe passen nicht zu den Kundenfragen.",
          "Interne Bezeichnungen und allgemeine Aussagen erklären wenig. Besucher müssen sich selbst zusammenreimen, ob Ihr Betrieb ihnen helfen kann."
        ],
        [
          "Optimierung bleibt abstrakt.",
          "Es gibt viele mögliche Maßnahmen. Sie möchten wissen, welche Seiten wir warum bearbeiten und was sich tatsächlich verändert."
        ]
      ],
      "scopeTitle": [
        "Suchfragen verstehen.",
        "Seiten gezielt verbessern."
      ],
      "scopeIntro": "Wir verbinden Recherche mit konkreter Arbeit an Ihrer Website. Welche Maßnahmen sinnvoll sind, ergibt sich aus Ihrem Angebot, dem vorhandenen Auftritt und der verfügbaren Datenbasis.",
      "scope": [
        [
          "Suchbegriffe und Fragen recherchieren",
          "Wir untersuchen, wie Menschen nach Ihren Leistungen suchen, und ordnen relevante Begriffe den tatsächlichen Angeboten Ihres Betriebs zu."
        ],
        [
          "Seiten klar ausrichten",
          "Jede wichtige Seite bekommt eine verständliche Aufgabe. Überschriften, Beschreibungen und interne Verlinkungen führen zu passenden Informationen."
        ],
        [
          "Inhalte und Grundlagen verbessern",
          "Wir prüfen vorhandene Inhalte und ausgewählte technische Grundlagen. Daraus entstehen konkrete Anpassungen oder ein Briefing für benötigte neue Inhalte."
        ],
        [
          "Entwicklung nachvollziehen",
          "Wir dokumentieren umgesetzte Maßnahmen und betrachten verfügbare Such- und Nutzungsdaten. Beobachtungen und Vermutungen bleiben unterscheidbar."
        ]
      ],
      "boundary": "SEO ist Arbeit an Auffindbarkeit und Verständlichkeit. Bestimmte Platzierungen, Besucherzahlen oder Anfragen können wir nicht zusagen. Umfangreiche neue Inhalte und bezahlte Werbung sind eigene Aufgaben.",
      "process": [
        [
          "Angebot und Ausgangslage klären",
          "Wir besprechen Leistungen, Zielkunden und Region. Bestehende Seiten und verfügbare Daten bilden den Ausgangspunkt."
        ],
        [
          "Maßnahmen priorisieren",
          "Sie erhalten eine verständliche Reihenfolge der vorgesehenen Arbeiten. Wir stimmen Seiten, Inhalte und Zuständigkeiten ab."
        ],
        [
          "Verbessern und beobachten",
          "Wir setzen die vereinbarten Maßnahmen um. Anhand verfügbarer Beobachtungen besprechen wir sinnvolle nächste Schritte."
        ]
      ],
      "contribution": "Von Ihnen brauchen wir verlässliche Angaben zu Leistungen, Zielkunden und Einsatzgebiet sowie passende Website- und Analysezugänge, soweit vorhanden.",
      "related": [
        "content",
        "support"
      ],
      "faq": [
        [
          "Können Sie Platz eins bei Google garantieren?",
          "Nein. Wir bearbeiten die vereinbarten Inhalte und Grundlagen Ihrer Website. Wie Suchmaschinen Seiten einordnen und wie viele Anfragen daraus entstehen, können wir nicht garantieren."
        ],
        [
          "Ist SEO bei einer neuen Website schon enthalten?",
          "Die vereinbarte erstmalige SEO-Arbeit gehört zum Website-Projekt. Weitergehende Recherche, zusätzliche Inhalte und laufende Optimierung stimmen wir separat ab. Bereits enthaltene Arbeiten werden nicht doppelt angesetzt."
        ],
        [
          "Brauchen wir dafür ständig neue Blogartikel?",
          "Nicht automatisch. Zuerst betrachten wir Ihre vorhandenen Leistungsseiten und die Fragen Ihrer Kunden. Manchmal ist eine präzisere bestehende Seite sinnvoller als ein zusätzlicher Artikel."
        ],
        [
          "Wie beurteilen wir Fortschritt?",
          "Wir halten bearbeitete Seiten und Änderungen fest. Wenn geeignete Daten vorliegen, betrachten wir zusätzlich die Entwicklung relevanter Suchfragen und der Nutzung. Den Beobachtungszeitraum stimmen wir passend ab."
        ],
        [
          "Was kostet Suchmaschinenoptimierung?",
          "Das hängt von Website, Ausgangslage und Umfang der Maßnahmen ab. Wir vereinbaren einen konkreten Auftrag oder einen passenden Umfang für die laufende Betreuung."
        ]
      ],
      "contact": "Welche Leistungen sollen Ihre Kunden besser finden und verstehen? Gemeinsam schauen wir auf Ihre Website und den nächsten sinnvollen Schritt.",
      "visual": {
        "label": "Illustratives Suchbeispiel",
        "title": "Von der Suchfrage",
        "accent": "zur passenden Seite.",
        "rows": [
          "möbel nach maß",
          "Leistungsseite",
          "Möbel nach Maß",
          "Materialien, Möglichkeiten, Kontakt"
        ],
        "note": "Beispielhafte Zuordnung, keine Ranking-Prognose."
      }
    },
    "profile": {
      "name": "Google-Unternehmensprofil",
      "description": "Google-Unternehmensprofil einrichten, überarbeiten und pflegen lassen. VibePerform stimmt Unternehmensangaben, Bilder und Kontaktwege mit Ihrer Website ab.",
      "kicker": "Google-Unternehmensprofil",
      "title": [
        "Vor Ort bekannt.",
        "Online klar erkennbar."
      ],
      "intro": "Aktuelle Öffnungszeiten, passende Leistungen und ein direkter Weg zu Ihnen. Wir unterstützen Sie bei der Einrichtung, Überarbeitung und vereinbarten Pflege Ihres Google-Unternehmensprofils.",
      "problemTitle": [
        "Der erste Kontakt beginnt",
        "oft vor Ihrer Website."
      ],
      "problems": [
        [
          "Die Angaben sind nicht mehr aktuell.",
          "Geänderte Zeiten, neue Leistungen oder veraltete Bilder vermitteln ein unvollständiges Bild Ihres Betriebs."
        ],
        [
          "Website und Profil erzählen Verschiedenes.",
          "Kontaktangaben und Leistungsbeschreibungen passen nicht zusammen. Interessenten müssen selbst herausfinden, welche Information stimmt."
        ],
        [
          "Niemand fühlt sich für die Pflege zuständig.",
          "Das Profil besteht, doch Zugriff und laufende Änderungen sind ungeklärt. Sie möchten eine verlässliche Abstimmung."
        ]
      ],
      "scopeTitle": [
        "Die richtigen Angaben.",
        "Ein stimmiger Eindruck."
      ],
      "scopeIntro": "Wir beginnen mit dem vorhandenen Stand. Ein bestehendes Profil kann häufig gezielt überarbeitet werden; eine Einrichtung betrachten wir passend zur tatsächlichen Situation.",
      "scope": [
        [
          "Profil und Zugriff prüfen",
          "Wir klären, ob bereits ein Profil besteht, welche Zugänge vorhanden sind und welche Schritte für die Bearbeitung noch fehlen."
        ],
        [
          "Unternehmensangaben abstimmen",
          "Name, Kontaktwege, Zeiten und angebotene Leistungen werden mit Ihren aktuellen Informationen und der Website abgeglichen."
        ],
        [
          "Bilder und Verweise aufbereiten",
          "Geeignete bereitgestellte Bilder und passende Website-Verweise ergänzen den Auftritt. Wir achten auf verständliche und zusammenpassende Inhalte."
        ],
        [
          "Pflege organisieren",
          "Für spätere Änderungen legen wir einen klaren Ablauf fest. Vereinbarte Anpassungen und noch offene Schritte werden nachvollziehbar festgehalten."
        ]
      ],
      "boundary": "Einrichtung und laufende Pflege werden nach Bedarf vereinbart. Weitere Standorte, Beiträge und Antworten auf Bewertungen gehören nur im ausdrücklich vereinbarten Umfang dazu. Freischaltung und Platzierung liegen nicht in unserer Hand.",
      "process": [
        [
          "Ausgangslage ansehen",
          "Sie zeigen uns das vorhandene Profil oder beschreiben Ihren Bedarf. Gemeinsam klären wir Zugriff und aktuelle Geschäftsinformationen."
        ],
        [
          "Inhalte vorbereiten",
          "Wir stimmen Angaben, Leistungen, Bilder und Verlinkungen mit Ihnen ab. Sie bestätigen die fachliche Richtigkeit."
        ],
        [
          "Bearbeiten und rückmelden",
          "Wir setzen die vereinbarten Änderungen um und halten offene Schritte fest. Bei erforderlichen Bestätigungen ist Ihre Mitwirkung nötig."
        ]
      ],
      "contribution": "Sie ermöglichen berechtigten Zugriff, liefern korrekte Geschäftsdaten und nutzbare Bilder und wirken bei erforderlichen Bestätigungen mit.",
      "related": [
        "support",
        "seo"
      ],
      "faq": [
        [
          "Brauchen wir ein neues Profil?",
          "Das prüfen wir zuerst. Wenn bereits ein geeignetes Profil vorhanden ist, kann eine Überarbeitung ausreichen. Der konkrete Einstieg richtet sich nach dem Bestand und Ihrem Zugriff."
        ],
        [
          "Können Sie eine Freischaltung garantieren?",
          "Nein. Wir begleiten die vereinbarten Schritte und halten den Bearbeitungsstand fest. Erforderliche Bestätigungen und Entscheidungen der Plattform können wir nicht ersetzen."
        ],
        [
          "Kümmern Sie sich auch um Bewertungen und Beiträge?",
          "Wenn dies gewünscht ist, vereinbaren wir Aufgaben und Abstimmung gesondert. Eine laufende Rundumbetreuung von Bewertungen und Beiträgen ist nicht automatisch enthalten."
        ],
        [
          "Geht das auch für mehrere Standorte?",
          "Wir klären zunächst die tatsächlichen Standorte, vorhandenen Profile und Zuständigkeiten. Der Aufwand und die benötigten Arbeiten werden je Vorhaben abgestimmt."
        ],
        [
          "Was kosten Einrichtung und Pflege?",
          "Einrichtung, Überarbeitung und laufende Pflege haben unterschiedliche Umfänge. Nach einem Blick auf den vorhandenen Stand erstellen wir ein passendes Angebot."
        ]
      ],
      "contact": "Ist Ihr Profil aktuell, vollständig und zugänglich? Gemeinsam klären wir den vorhandenen Stand und die Aufgaben, bei denen Sie Unterstützung möchten.",
      "visual": {
        "label": "Schematische Profilansicht",
        "title": "Ihr Unternehmen",
        "accent": "Informationen, die zusammenpassen.",
        "rows": [
          "Leistungen",
          "Öffnungszeiten",
          "Kontakt",
          "Website",
          "Profil ↔ Website"
        ],
        "note": "Gestaltungsbeispiel mit beispielhaften Feldern."
      }
    },
    "content": {
      "name": "Texte & Grafiken",
      "description": "Verständliche Website-Texte, Projektbeschreibungen und passende Grafiken für Ihren Firmenauftritt. VibePerform bereitet Ihre Inhalte gezielt auf.",
      "kicker": "Texte, Bilder & Grafiken",
      "title": [
        "Ihre Arbeit hat Substanz.",
        "Ihr Inhalt zeigt sie."
      ],
      "intro": "Sie kennen Ihren Betrieb. Wir bringen seine Leistungen auf den Punkt und gestalten die passenden Inhalte für Ihren digitalen Auftritt – verständlich, stimmig und auf Ihre Kunden ausgerichtet.",
      "problemTitle": [
        "Viel zu erzählen.",
        "Noch nicht auf den Punkt."
      ],
      "problems": [
        [
          "Die Texte klingen wie ein Fachgespräch.",
          "Was für Sie selbstverständlich ist, bleibt für Interessenten unklar. Der Nutzen Ihrer Arbeit geht zwischen Fachbegriffen verloren."
        ],
        [
          "Gute Arbeit bleibt unsichtbar.",
          "Aktuelle Projekte und praktische Beispiele liegen in Ordnern. Auf der Website findet sich davon wenig."
        ],
        [
          "Die Materialien passen nicht zusammen.",
          "Bilder, Texte und Grafiken stammen aus unterschiedlichen Zeiten. Dem Auftritt fehlt eine erkennbare gemeinsame Linie."
        ]
      ],
      "scopeTitle": [
        "Inhalte mit Aussage.",
        "Gestaltung mit Zusammenhang."
      ],
      "scopeIntro": "Wir stimmen zuerst ab, welche Inhalte Sie für welchen Einsatz brauchen. Daraus entsteht ein klar begrenzter Auftrag mit passenden Texten, Bildern oder Grafiken.",
      "scope": [
        [
          "Inhalte planen",
          "Wir klären Zielgruppe, Aussage und Verwendungsort. Ihre Informationen werden zu einer verständlichen Struktur für die benötigten Inhalte."
        ],
        [
          "Texte formulieren",
          "Wir schreiben oder überarbeiten vereinbarte Leistungsbeschreibungen, Seitentexte und Projektvorstellungen – auf Basis Ihrer tatsächlichen Arbeit."
        ],
        [
          "Bilder und Grafiken gestalten",
          "Vorhandene Bilder werden für den Einsatz aufbereitet. Vereinbarte Grafiken und Bildkombinationen orientieren sich an Ihrer Marke und der jeweiligen Aussage."
        ],
        [
          "Abstimmen und übergeben",
          "Sie prüfen fachliche Angaben und geben Rückmeldung. Danach bauen wir die Inhalte wie vereinbart ein oder übergeben die passenden Dateien."
        ]
      ],
      "boundary": "Seiten, Formate, Sprachen, Korrekturen und Nutzungsumfang legen wir vorab fest. Fotoshooting, Logoentwicklung und umfangreiche zusätzliche Inhalte sind keine pauschalen Bestandteile.",
      "process": [
        [
          "Informationen sammeln",
          "Sie erklären Leistungen, Kunden und das gewünschte Thema. Wir sichten vorhandene Texte, Bilder und belegbare Beispiele."
        ],
        [
          "Entwurf entwickeln",
          "Wir bringen Struktur, Sprache und Gestaltung zusammen. Sie erhalten einen Entwurf für den vereinbarten Einsatz."
        ],
        [
          "Prüfen und fertigstellen",
          "Sie bestätigen Fakten und Nutzungsberechtigungen. Wir arbeiten das abgestimmte Feedback ein und bereiten Einbau oder Übergabe vor."
        ]
      ],
      "contribution": "Sie liefern Fachinformationen, vorhandenes Material und echte Beispiele. Welche Inhalte fehlen und wie wir sie ergänzen, klären wir gemeinsam.",
      "related": [
        "seo",
        "redesign"
      ],
      "faq": [
        [
          "Müssen wir die Texte selbst vorschreiben?",
          "Nein. Wir brauchen Ihre Fachinformationen und die wichtigsten Aussagen. Daraus können wir Texte entwickeln. Vorhandene Entwürfe und Materialien sind hilfreich, aber kein fertiger Website-Text ist Voraussetzung."
        ],
        [
          "Können Sie bestehende Texte verbessern?",
          "Ja. Wir prüfen Verständlichkeit, Aufbau und Passung zur Zielgruppe. Danach überarbeiten wir den vereinbarten Inhalt auf Basis Ihrer aktuellen Angaben."
        ],
        [
          "Verwenden Sie KI-generierte Bilder?",
          "Wenn ein generiertes Motiv für den vereinbarten Zweck geeignet ist, können wir es einsetzen. Echte Projekte und Kundenreferenzen werden dadurch nicht erfunden oder ersetzt. Die passende Bildquelle wird vorab geklärt."
        ],
        [
          "Sind Texte und Grafiken bei der Website-Erstellung schon enthalten?",
          "Die vereinbarten Inhalte gehören zum Website-Projekt. Zusätzliche Seiten, spätere Projektberichte oder weitere Grafiken stimmen wir separat ab. Bereits enthaltene Arbeiten werden nicht nochmals angesetzt."
        ],
        [
          "Was kostet ein Text- oder Grafikauftrag?",
          "Wir kalkulieren nach benötigten Inhalten, vorhandenen Grundlagen, Formaten und dem vereinbarten Korrekturumfang. Sie erhalten ein konkretes Angebot für die gewünschte Lieferung."
        ]
      ],
      "contact": "Welche Leistung, welches Projekt oder welche Idee soll verständlich werden? Zeigen Sie uns Ihr Material und den vorgesehenen Einsatz.",
      "visual": {
        "label": "Redaktionelles Gestaltungsbeispiel",
        "title": "Räume mit Charakter.",
        "accent": "Handwerk, das bleibt.",
        "rows": [
          "Leistungsbeschreibung",
          "Material. Form. Gefühl.",
          "Wir machen sichtbar, was Ihre Arbeit ausmacht."
        ],
        "note": "KI-generiertes Motiv · keine Kundenreferenz."
      }
    },
    "ai": {
      "name": "KI-Beratung",
      "description": "Ergänzende KI-Beratung für kleine Unternehmen: einen Arbeitsablauf verstehen, geeignete Unterstützung prüfen und einen sinnvollen nächsten Schritt bestimmen.",
      "kicker": "Ergänzende Leistung · KI-Beratung",
      "title": [
        "Weniger Rätsel um KI.",
        "Ein klarer nächster Schritt."
      ],
      "intro": "Welche wiederkehrende Aufgabe kostet Ihr Büro Zeit? Wir betrachten einen konkreten Arbeitsablauf und prüfen, wo KI sinnvoll vorbereiten kann, welche Informationen sie braucht und was Menschen entscheiden.",
      "problemTitle": [
        "Die Aufgabe ist konkret.",
        "Die Möglichkeiten sind unklar."
      ],
      "problems": [
        [
          "Büroarbeit wiederholt sich.",
          "Informationen aus Anfragen, Dokumenten und Notizen werden immer wieder zusammengesucht und neu aufbereitet."
        ],
        [
          "Werkzeuge gibt es viele.",
          "Sie möchten einschätzen können, welche Unterstützung zu Ihren Aufgaben und vorhandenen Systemen passt."
        ],
        [
          "Die Verantwortung soll klar bleiben.",
          "Fachliche Aussagen, Preise, Termine und Versand brauchen verlässliche Prüfpunkte. Sie möchten verstehen, wo Grenzen liegen."
        ]
      ],
      "scopeTitle": [
        "Den Ablauf verstehen.",
        "Eine fundierte Richtung finden."
      ],
      "scopeIntro": "Unser Einstieg ist Ihre tatsächliche Arbeit. Wir ordnen Aufgaben, Informationsquellen und Entscheidungspunkte, bevor wir den Einsatz eines Werkzeugs besprechen.",
      "scope": [
        [
          "Aufgabe und Informationen erfassen",
          "Wir betrachten einen typischen Ablauf und klären, welche Informationen in welchen Programmen oder Dokumenten vorliegen."
        ],
        [
          "Eignung und Grenzen beurteilen",
          "Welche Schritte lassen sich vorbereiten? Wo fehlen Informationen, und wann muss ein Mensch prüfen oder entscheiden? Wir machen diese Grenzen sichtbar."
        ],
        [
          "Werkzeugbedarf einordnen",
          "Wenn eine konkrete Auswahl sinnvoll ist, bestimmen wir die Anforderungen und klären den passenden Umfang einer Werkzeugprüfung."
        ],
        [
          "Nächsten Schritt beschreiben",
          "Wir fassen die Einschätzung nachvollziehbar zusammen und besprechen Voraussetzungen, Prioritäten und eine mögliche weitere Umsetzung."
        ]
      ],
      "boundary": "Beratung liefert eine Entscheidungsgrundlage. Softwarekauf, Einführung und individuelle Automatisierung werden bei Bedarf gesondert vereinbart. Eine bestimmte Zeitersparnis oder pauschale Konformität wird nicht zugesagt.",
      "process": [
        [
          "Einen Ablauf auswählen",
          "Sie bringen eine typische Aufgabe und geeignete Beispiele mit. Wir klären Ziel und vorhandene Arbeitsmittel."
        ],
        [
          "Möglichkeiten prüfen",
          "Wir ordnen Schritte und Informationsquellen. Geeignete Assistenzaufgaben und notwendige menschliche Prüfpunkte werden festgehalten."
        ],
        [
          "Gemeinsam entscheiden",
          "Sie erhalten eine nachvollziehbare Einschätzung und einen priorisierten nächsten Schritt. Über Kauf, Einsatz und Umsetzung entscheiden Sie."
        ]
      ],
      "contribution": "Hilfreich sind eine konkrete wiederkehrende Aufgabe, eine Person, die den Ablauf kennt, und geeignete Beispiele ohne unnötige vertrauliche Angaben.",
      "related": [
        "support",
        "content"
      ],
      "faq": [
        [
          "Müssen wir bereits ein KI-Werkzeug nutzen?",
          "Nein. Ausgangspunkt ist Ihre Aufgabe und die vorhandene Arbeitsweise. Ob ein zusätzliches Werkzeug sinnvoll ist, ergibt sich erst aus der Betrachtung."
        ],
        [
          "Entscheidet KI dann über Preise, Termine oder Kundenkommunikation?",
          "Die Beratung beschreibt, was eine Assistenz vorbereiten könnte und wo Menschen prüfen und entscheiden. Verantwortlichkeiten und Freigaben werden nicht stillschweigend an ein System abgegeben."
        ],
        [
          "Ist eine fertige Automatisierung enthalten?",
          "Eine Beratung oder Analyse ist noch keine individuell umgesetzte Automatisierung. Eine weitere Umsetzung wird nach konkretem Bedarf separat beschrieben und vereinbart."
        ],
        [
          "Wie starten wir mit einer einzelnen Aufgabe?",
          "Die bestehende KI-Potenzialanalyse betrachtet einen priorisierten Arbeitsablauf mit einer schriftlichen Bewertung. Im Gespräch klären wir, ob dieser Einstieg zu Ihrem Bedarf passt."
        ],
        [
          "Was kostet die Beratung?",
          "Wir klären zunächst die Aufgabe und den passenden Analyse- oder Beratungsumfang. Danach erhalten Sie ein konkretes Angebot. Es besteht keine automatische Verpflichtung zu einem Folgeprojekt."
        ]
      ],
      "contact": "Welcher Arbeitsablauf soll einfacher werden? Beschreiben Sie uns eine typische Aufgabe und wo Sie dabei heute Zeit verlieren.",
      "visual": {
        "label": "Beispiel eines begleiteten Arbeitsablaufs",
        "title": "KI bereitet vor.",
        "accent": "Menschen entscheiden.",
        "rows": [
          "Informationen",
          "Anfrage und Unterlagen",
          "Entwurf",
          "Geordnet und vorbereitet",
          "Menschliche Prüfung",
          "Fakten, Preis, Termine, Versand"
        ],
        "note": "Ablaufbeispiel, keine bereits eingerichtete Automation."
      }
    }
  },
  "en": {
    "redesign": {
      "name": "Website redesign",
      "description": "Update your existing business website with clearer structure, current content, thoughtful design and straightforward contact options.",
      "kicker": "Website updates & redesign",
      "title": [
        "Your business has moved on.",
        "Has your website?"
      ],
      "intro": "Your website should reflect where your business is today. We review your existing presence, retain what works and improve what no longer serves your services and customers.",
      "problemTitle": [
        "A lot has changed.",
        "Time to show it."
      ],
      "problems": [
        [
          "Your services have outgrown your website.",
          "New services, projects and audiences barely appear online. Visitors see a picture that no longer reflects your business."
        ],
        [
          "The next step is unclear.",
          "Information is scattered, questions remain unanswered and contact details are difficult to find."
        ],
        [
          "Mobile browsing feels difficult.",
          "Text, images or navigation do not work the way your customers need on smaller screens."
        ]
      ],
      "scopeTitle": [
        "Keep what works.",
        "Improve what matters."
      ],
      "scopeIntro": "We turn the current website into a clear improvement plan, from targeted updates to an agreed redesign.",
      "scope": [
        [
          "Understand the current website",
          "We review pages, content, contact options and technical foundations to identify what can stay and what needs attention."
        ],
        [
          "Organise structure and content",
          "Services get a clear place. We update agreed copy and plan missing information around your customers’ needs."
        ],
        [
          "Improve design and usability",
          "Typography, images, spacing and navigation work together. Desktop and mobile are considered together."
        ],
        [
          "Implement and check",
          "We implement the agreed changes and check layout and contact options. If page addresses change, we account for necessary redirects."
        ]
      ],
      "boundary": "We first establish whether your existing system is suitable and which content can be retained. A complete rebuild or additional features are agreed explicitly.",
      "process": [
        [
          "Review the website together",
          "You show us the current website and explain what has changed. We review content and available access."
        ],
        [
          "Define the changes",
          "Together, we agree priorities, pages and updates. You know what will remain and what will be created."
        ],
        [
          "Build and review",
          "You review the preview and check the facts. We then agree publication and handover."
        ]
      ],
      "contribution": "We need your existing website, appropriate access, current business information and one person to coordinate feedback.",
      "related": [
        "support",
        "content"
      ],
      "faq": [
        [
          "Does my entire website need rebuilding?",
          "We decide after reviewing the existing website. Content and parts of the design can often be retained. Technical or structural limitations may make rebuilding sensible."
        ],
        [
          "Can you work with our current system?",
          "We first review the system and available access. Then we can explain which changes are possible and whether another technical foundation makes sense."
        ],
        [
          "What happens to existing pages and links?",
          "We account for existing page addresses in the plan. If they change, we plan necessary redirects and check important internal links."
        ],
        [
          "How much does a redesign cost?",
          "The effort depends on your current website and the changes required. After reviewing it, we provide a proposal for the agreed scope."
        ],
        [
          "Can you support the website afterwards?",
          "Yes. We can agree ongoing support suited to your system and needs. Content updates and technical tasks are defined explicitly."
        ]
      ],
      "contact": "Show us your current website. Together, we identify what still works and what needs to change.",
      "visual": {
        "label": "Design example",
        "title": "Clearer structure.",
        "accent": "Easier to understand.",
        "rows": [
          "Before",
          "Updated",
          "Retain",
          "Improve",
          "Add"
        ],
        "note": "A comparison of structure and navigation."
      }
    },
    "support": {
      "name": "Website support & development",
      "description": "Keep your business website current with content updates, prioritised improvements and clearly agreed ongoing support.",
      "kicker": "Website support & development",
      "title": [
        "Your business keeps changing.",
        "We keep your presence current."
      ],
      "intro": "A new service, a completed project, a clearer answer to a customer question: we take care of agreed updates and develop your website with you, step by step.",
      "problemTitle": [
        "Business moves forward.",
        "Online updates get left behind."
      ],
      "problems": [
        [
          "There is little time for upkeep.",
          "New information is available but never reaches the website. Updates keep getting postponed."
        ],
        [
          "There are ideas, but no priorities.",
          "You know the website could improve. What to tackle first gets lost between daily work and technical questions."
        ],
        [
          "Responsibility is unclear.",
          "Content changes and technical tasks have no clear owner. You want to understand what has actually been done."
        ]
      ],
      "scopeTitle": [
        "Keep it current.",
        "Develop it with purpose."
      ],
      "scopeIntro": "Together, we define the tasks included in your support. Changes in your business and available data help us set sensible priorities.",
      "scope": [
        [
          "Maintain content",
          "Agreed updates to services, contact details, images and projects are implemented on your website."
        ],
        [
          "Interpret available data",
          "Where suitable data sources exist, we review searches and usage. We record observations that may suggest an improvement."
        ],
        [
          "Implement improvements",
          "Agreed priorities become specific changes to copy, sections or contact options. Scope and sequence remain clear."
        ],
        [
          "Agree technical tasks",
          "We identify the checks and maintenance suited to your technology. Content work and technical maintenance are described separately."
        ]
      ],
      "boundary": "Support covers an agreed amount of work. Substantial new pages, extra features, response times and technical operations are defined separately.",
      "process": [
        [
          "Establish the starting point",
          "We review the website, access and available information, then agree responsibilities and scope."
        ],
        [
          "Choose the next tasks",
          "You tell us about business changes. We combine these with observations and agree the next improvements."
        ],
        [
          "Implement and report back",
          "We complete agreed tasks and document progress. Later observations help determine the next steps."
        ]
      ],
      "contribution": "You tell us about business changes, provide agreed access and review new factual statements. We take care of the agreed work on your presence.",
      "related": [
        "seo",
        "profile"
      ],
      "faq": [
        [
          "Is website support the same as technical maintenance?",
          "Technical maintenance and content development address different needs. Our proposal specifies which checks and which content or design tasks are included."
        ],
        [
          "Do you support websites built by someone else?",
          "We first review the technology, condition and access. Then we establish which support we can reasonably provide."
        ],
        [
          "Will my website change automatically?",
          "New factual statements and changes follow the agreed review process. Your information and priorities inform the work."
        ],
        [
          "What if there is very little usage data?",
          "We work with concrete findings, customer questions and changes in your business. We do not claim proven improvements from a limited data sample."
        ],
        [
          "How much does support cost, and how can it be cancelled?",
          "Price, scope, term and cancellation conditions are defined in the proposal. You know the agreed tasks and terms before we begin."
        ]
      ],
      "contact": "Which updates keep getting postponed? Tell us about your website and the work you would like us to take care of.",
      "visual": {
        "label": "Example support workflow",
        "title": "A clear plan.",
        "accent": "Visible progress.",
        "rows": [
          "Review",
          "Add a new service",
          "Agree",
          "Update project images",
          "Completed",
          "Refresh contact details"
        ],
        "note": "Illustrative tasks and status."
      }
    },
    "seo": {
      "name": "Search engine optimisation",
      "description": "SEO for business websites: research customer questions, organise relevant pages and improve content and technical foundations.",
      "kicker": "Search engine optimisation · SEO",
      "title": [
        "The right questions.",
        "The relevant answers."
      ],
      "intro": "Your customers are looking for a solution. We align your website’s structure and content with the services you actually provide and the questions people ask about them.",
      "problemTitle": [
        "Your service is there.",
        "Can people find the answer?"
      ],
      "problems": [
        [
          "Important services lack a clear place.",
          "What you offer is mentioned only in passing. Specific needs have no clear, relevant page."
        ],
        [
          "Your terms do not match customer questions.",
          "Internal descriptions and vague statements explain little. Visitors have to work out whether you can help."
        ],
        [
          "Optimisation feels abstract.",
          "There are many possible actions. You want to know which pages we are working on, why, and what actually changes."
        ]
      ],
      "scopeTitle": [
        "Understand the questions.",
        "Improve the right pages."
      ],
      "scopeIntro": "We connect research with specific work on your website. Your services, current presence and available data determine the relevant actions.",
      "scope": [
        [
          "Research search terms and questions",
          "We explore how people search for your services and connect relevant terms with what your business actually offers."
        ],
        [
          "Give pages a clear purpose",
          "Each important page gets a clear role. Headings, descriptions and internal links guide visitors to useful information."
        ],
        [
          "Improve content and foundations",
          "We review existing content and selected technical foundations. The result is a set of changes or a brief for the new content needed."
        ],
        [
          "Review developments",
          "We document completed actions and review available search and usage data, keeping observations distinct from assumptions."
        ]
      ],
      "boundary": "SEO addresses visibility and clarity. We cannot promise specific rankings, visitor numbers or enquiries. Substantial new content and paid advertising are separate tasks.",
      "process": [
        [
          "Understand the starting point",
          "We discuss your services, customers and location. Existing pages and available data provide the starting point."
        ],
        [
          "Prioritise the work",
          "We propose a clear order of work and agree pages, content and responsibilities."
        ],
        [
          "Improve and observe",
          "We implement the agreed actions. Available observations inform the discussion about sensible next steps."
        ]
      ],
      "contribution": "We need reliable information about services, customers and your service area, plus suitable website and analytics access where available.",
      "related": [
        "content",
        "support"
      ],
      "faq": [
        [
          "Can you guarantee first place on Google?",
          "No. We work on the agreed content and website foundations. We cannot guarantee how search engines rank pages or how many enquiries result."
        ],
        [
          "Is SEO included in a new website?",
          "Agreed initial SEO work forms part of the website project. Further research, additional content and ongoing optimisation are agreed separately. Included work is not charged twice."
        ],
        [
          "Do we need constant new blog posts?",
          "Not automatically. We first review your service pages and customer questions. Improving an existing page can make more sense than adding another article."
        ],
        [
          "How do we assess progress?",
          "We record pages worked on and changes made. Where suitable data exists, we also review relevant searches and usage over an appropriate agreed period."
        ],
        [
          "How much does SEO cost?",
          "It depends on your website, starting point and scope. We agree a specific project or a suitable level of ongoing work."
        ]
      ],
      "contact": "Which services should your customers find and understand more easily? Let’s look at your website and the next useful step.",
      "visual": {
        "label": "Illustrative search example",
        "title": "From a search question",
        "accent": "to a relevant page.",
        "rows": [
          "bespoke furniture",
          "Service page",
          "Bespoke furniture",
          "Materials, options, contact"
        ],
        "note": "Example mapping, not a ranking prediction."
      }
    },
    "profile": {
      "name": "Google Business Profile",
      "description": "Set up, improve and maintain your Google Business Profile. VibePerform aligns business details, images and contact options with your website.",
      "kicker": "Google Business Profile",
      "title": [
        "Known locally.",
        "Clear online."
      ],
      "intro": "Current opening hours, relevant services and a direct way to reach you. We help set up, improve and maintain your Google Business Profile within the agreed scope.",
      "problemTitle": [
        "The first contact often starts",
        "before your website."
      ],
      "problems": [
        [
          "The information is outdated.",
          "Changed hours, new services or old images give an incomplete picture of your business."
        ],
        [
          "Website and profile tell different stories.",
          "Contact details and service descriptions do not match. Potential customers must work out which information is correct."
        ],
        [
          "Nobody owns the upkeep.",
          "The profile exists, but access and ongoing updates are unclear. You want a reliable process."
        ]
      ],
      "scopeTitle": [
        "The right information.",
        "A consistent impression."
      ],
      "scopeIntro": "We start with what already exists. An existing profile may only need targeted updates; setup work depends on the actual situation.",
      "scope": [
        [
          "Review the profile and access",
          "We establish whether a profile already exists, who has access and what steps are still needed before editing."
        ],
        [
          "Align business details",
          "Name, contact options, hours and services are checked against current business information and your website."
        ],
        [
          "Prepare images and links",
          "Suitable supplied images and relevant website links complete the presence. Content stays clear and consistent."
        ],
        [
          "Organise ongoing updates",
          "We agree a clear process for later changes and keep track of completed work and outstanding steps."
        ]
      ],
      "boundary": "Setup and ongoing maintenance are agreed according to need. Additional locations, posts and review responses are included only where explicitly agreed. Activation and rankings are outside our control.",
      "process": [
        [
          "Review the starting point",
          "You show us the profile or describe your needs. We establish access and current business information."
        ],
        [
          "Prepare content",
          "We agree details, services, images and links with you. You confirm factual accuracy."
        ],
        [
          "Update and report back",
          "We implement the agreed changes and record outstanding steps. Required confirmations may need your involvement."
        ]
      ],
      "contribution": "You provide authorised access, accurate business details and usable images, and participate in required confirmations.",
      "related": [
        "support",
        "seo"
      ],
      "faq": [
        [
          "Do we need a new profile?",
          "We check first. An existing suitable profile may only need updating. The starting point depends on what exists and your access."
        ],
        [
          "Can you guarantee activation?",
          "No. We support the agreed steps and document progress. We cannot replace required confirmations or platform decisions."
        ],
        [
          "Do you also handle reviews and posts?",
          "If required, we agree these tasks and the review process separately. Continuous management of reviews and posts is not automatically included."
        ],
        [
          "Can you help with several locations?",
          "We first establish actual locations, existing profiles and responsibilities. Work and effort are agreed for the specific project."
        ],
        [
          "What do setup and maintenance cost?",
          "Setup, improvements and ongoing maintenance have different scopes. After reviewing the current situation, we prepare a suitable proposal."
        ]
      ],
      "contact": "Is your profile current, complete and accessible? Let’s establish the starting point and where you would like support.",
      "visual": {
        "label": "Illustrative profile layout",
        "title": "Your business",
        "accent": "Information that fits together.",
        "rows": [
          "Services",
          "Opening hours",
          "Contact",
          "Website",
          "Profile ↔ Website"
        ],
        "note": "Design example with illustrative fields."
      }
    },
    "content": {
      "name": "Copy & graphics",
      "description": "Clear website copy, project descriptions and relevant graphics for your online presence. VibePerform prepares content around your business.",
      "kicker": "Copy, images & graphics",
      "title": [
        "Your work has substance.",
        "Your content shows it."
      ],
      "intro": "You know your business. We explain its services clearly and create suitable content for your online presence, with a consistent style and your customers in mind.",
      "problemTitle": [
        "Plenty to say.",
        "Time to make it clear."
      ],
      "problems": [
        [
          "The copy sounds like an industry conversation.",
          "What seems obvious to you may be unfamiliar to potential customers. The value of your work gets lost in jargon."
        ],
        [
          "Good work stays unseen.",
          "Current projects and useful examples sit in folders. Very little reaches the website."
        ],
        [
          "The materials do not fit together.",
          "Images, copy and graphics come from different periods. The presence lacks a recognisable shared style."
        ]
      ],
      "scopeTitle": [
        "Content with meaning.",
        "Design that connects it."
      ],
      "scopeIntro": "We first agree what content you need and where it will be used. This creates a defined project for the relevant copy, images or graphics.",
      "scope": [
        [
          "Plan the content",
          "We clarify audience, message and intended use. Your information becomes a clear structure for the content needed."
        ],
        [
          "Write the copy",
          "We write or improve agreed service descriptions, page copy and project presentations based on your actual work."
        ],
        [
          "Prepare images and graphics",
          "Existing images are prepared for their intended use. Agreed graphics and image combinations follow your brand and the message."
        ],
        [
          "Review and hand over",
          "You check facts and provide feedback. We then add the content as agreed or supply suitable files."
        ]
      ],
      "boundary": "Pages, formats, languages, revisions and usage are agreed in advance. Photography, logo design and substantial additional content are not standard inclusions.",
      "process": [
        [
          "Gather information",
          "You explain services, customers and the topic. We review existing copy, images and substantiated examples."
        ],
        [
          "Develop the draft",
          "We bring structure, language and design together in a draft for the agreed use."
        ],
        [
          "Review and finalise",
          "You confirm facts and usage rights. We incorporate agreed feedback and prepare implementation or handover."
        ]
      ],
      "contribution": "You provide subject knowledge, existing materials and real examples. Together, we identify what is missing and how to complete it.",
      "related": [
        "seo",
        "redesign"
      ],
      "faq": [
        [
          "Do we have to draft the copy ourselves?",
          "No. We need your subject knowledge and key messages. We can develop copy from those. Existing drafts and materials help, but finished website copy is not a prerequisite."
        ],
        [
          "Can you improve existing copy?",
          "Yes. We review clarity, structure and suitability for the audience, then revise the agreed content using your current information."
        ],
        [
          "Do you use AI-generated images?",
          "We can use a generated image where it suits the agreed purpose. This does not invent or replace actual projects or client references. The appropriate image source is agreed in advance."
        ],
        [
          "Are copy and graphics already included in website creation?",
          "Agreed content forms part of the website project. Extra pages, later project reports or additional graphics are agreed separately. Included work is not charged again."
        ],
        [
          "How much does a copy or graphics project cost?",
          "We price the required content, available source material, formats and agreed revisions. You receive a specific proposal for the intended deliverables."
        ]
      ],
      "contact": "Which service, project or idea needs explaining? Show us your material and where you want to use it.",
      "visual": {
        "label": "Editorial design example",
        "title": "Spaces with character.",
        "accent": "Craft that lasts.",
        "rows": [
          "Service description",
          "Material. Form. Feeling.",
          "We make the value of your work visible."
        ],
        "note": "AI-generated image · not a client reference."
      }
    },
    "ai": {
      "name": "AI consulting",
      "description": "Additional AI consulting for small businesses: understand a workflow, assess useful assistance and identify a sensible next step.",
      "kicker": "Additional service · AI consulting",
      "title": [
        "Less uncertainty about AI.",
        "A clear next step."
      ],
      "intro": "Which recurring office task takes up your time? We examine a specific workflow, identify where AI could help prepare work and clarify the information and human decisions it requires.",
      "problemTitle": [
        "The task is specific.",
        "The options are unclear."
      ],
      "problems": [
        [
          "Office work repeats itself.",
          "Information from enquiries, documents and notes is gathered and rearranged again and again."
        ],
        [
          "There are many tools.",
          "You want to assess which support fits your tasks and existing systems."
        ],
        [
          "Responsibility must stay clear.",
          "Facts, prices, dates and communication need reliable checkpoints. You want to understand the boundaries."
        ]
      ],
      "scopeTitle": [
        "Understand the workflow.",
        "Find an informed direction."
      ],
      "scopeIntro": "Your actual work is our starting point. We map tasks, information sources and decision points before discussing tools.",
      "scope": [
        [
          "Map the task and information",
          "We examine a typical workflow and identify which information exists in which programs or documents."
        ],
        [
          "Assess suitability and boundaries",
          "Which steps can be prepared? Where is information missing, and when must a person review or decide? We make these boundaries visible."
        ],
        [
          "Clarify tool requirements",
          "Where a specific selection makes sense, we identify requirements and agree a suitable scope for evaluating tools."
        ],
        [
          "Describe the next step",
          "We summarise the assessment and discuss requirements, priorities and possible further implementation."
        ]
      ],
      "boundary": "Consulting provides a basis for decisions. Software purchases, rollout and custom automation are agreed separately where needed. We do not promise a particular time saving or blanket compliance.",
      "process": [
        [
          "Choose a workflow",
          "You bring a typical task and suitable examples. We clarify the objective and existing tools."
        ],
        [
          "Assess the possibilities",
          "We organise steps and information sources, recording suitable assistance tasks and necessary human checkpoints."
        ],
        [
          "Decide together",
          "You receive a clear assessment and a prioritised next step. You decide on purchases, use and implementation."
        ]
      ],
      "contribution": "A recurring task, someone familiar with the workflow and suitable examples without unnecessary confidential information provide a useful starting point.",
      "related": [
        "support",
        "content"
      ],
      "faq": [
        [
          "Do we need to use an AI tool already?",
          "No. Your task and current way of working are the starting point. Whether another tool makes sense follows from the assessment."
        ],
        [
          "Will AI decide prices, dates or customer communication?",
          "The assessment describes what an assistant could prepare and where people review and decide. Responsibilities and approvals are not silently transferred to a system."
        ],
        [
          "Is a finished automation included?",
          "Consulting or analysis is not an individually implemented automation. Further implementation is described and agreed separately for the actual need."
        ],
        [
          "How can we start with a single task?",
          "The existing AI potential analysis examines one prioritised workflow and provides a written assessment. We discuss whether that starting point suits your needs."
        ],
        [
          "How much does consulting cost?",
          "We first clarify the task and suitable analysis or consulting scope, then provide a specific proposal. There is no automatic obligation to commission a follow-up project."
        ]
      ],
      "contact": "Which workflow should become easier? Tell us about a typical task and where you currently lose time.",
      "visual": {
        "label": "Example assisted workflow",
        "title": "AI prepares.",
        "accent": "People decide.",
        "rows": [
          "Information",
          "Enquiry and documents",
          "Draft",
          "Organised and prepared",
          "Human review",
          "Facts, prices, dates, sending"
        ],
        "note": "Workflow example, not a deployed automation."
      }
    }
  }
};
