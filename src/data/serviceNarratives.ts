import type { Locale } from '../lib/siteMetadata';
import type { ServiceKey } from './serviceDetails';
interface Narrative { label:string; title:string; emphasis:string; body:string; call:string; contactTitle:string; contactEmphasis:string; notes:[string,string][]; }
export const serviceNarratives:Record<Locale,Record<ServiceKey,Narrative>> = {
  "de": {
    "redesign": {
      "label": "Reales Projekt · HMS Loistl",
      "title": "Gleicher Betrieb.",
      "emphasis": "Ein treffenderer Auftritt.",
      "body": "Früher zeigten Stockfotos Gebäude außerhalb der gewünschten Zielgruppe. Heute stehen ein gepflegter Hauseingang, konkrete Leistungen und passende Servicegebiete im Mittelpunkt.",
      "call": "Bestehende Webseite besprechen",
      "contactTitle": "Was soll sich",
      "contactEmphasis": "auf Ihrer Webseite ändern?",
      "notes": [
        [
          "Behalten",
          "Die Identität und die fachlichen Leistungen des Betriebs."
        ],
        [
          "Neu ausrichten",
          "Bildauswahl und Ansprache auf große Mehrfamilienhäuser."
        ],
        [
          "Ergänzen",
          "Eigene Seiten für Leistungen und Servicegebiete."
        ]
      ]
    },
    "support": {
      "label": "Ein Beispiel aus der Betreuung",
      "title": "Aus zwei Fotos wird",
      "emphasis": "ein neuer Einblick.",
      "body": "HMS Loistl liefert Bilder aus dem Arbeitsalltag. Wir machen daraus einen verständlichen Projektabschnitt. So bekommt die Webseite neue Inhalte aus der Arbeit, die ohnehin stattfindet.",
      "call": "Betreuung besprechen",
      "contactTitle": "Was bleibt bei Ihnen",
      "contactEmphasis": "online liegen?",
      "notes": [
        [
          "Input",
          "Eine Nachricht und zwei Dateien."
        ],
        [
          "Entwurf & Freigabe",
          "Wir bereiten vor. Sie entscheiden."
        ],
        [
          "Aktualisierung",
          "Der neue Inhalt ergänzt den Auftritt."
        ]
      ]
    },
    "profile": {
      "label": "Schematische Profilansicht · Beispiel HMS Loistl",
      "title": "Von der Suche",
      "emphasis": "zum ersten Kontakt.",
      "body": "Ein Unternehmensprofil ist oft der erste Berührungspunkt. Deshalb sollen Angaben, Bilder und Kontaktmöglichkeiten zusammen ein klares Bild Ihres Betriebs ergeben.",
      "call": "Unternehmensprofil besprechen",
      "contactTitle": "Schauen wir auf",
      "contactEmphasis": "Ihr Unternehmensprofil.",
      "notes": [
        [
          "Aktuelle Angaben",
          "Was bieten Sie an? Wo sind Sie tätig? Wie kann man Sie erreichen?"
        ],
        [
          "Einblicke",
          "Bilder und Beiträge zeigen, was Ihr Betrieb tatsächlich macht."
        ],
        [
          "Kontakt",
          "Interessenten können anrufen oder auf Ihrer Webseite weiterlesen."
        ]
      ]
    },
    "seo": {
      "label": "Seitenkonzept am Beispiel HMS Loistl",
      "title": "Eine konkrete Frage.",
      "emphasis": "Eine passende Seite.",
      "body": "Wer Betreuung für ein Gebäude in Solln sucht, braucht Informationen über Leistungen und Einsatzgebiet. Diese Fragen bekommen einen eigenen Platz auf der Webseite.",
      "call": "Auffindbarkeit besprechen",
      "contactTitle": "Welche Fragen stellen",
      "contactEmphasis": "Ihre Wunschkunden?",
      "notes": [
        [
          "Suchfrage verstehen",
          "Welche Leistung wird in welchem Gebiet gebraucht?"
        ],
        [
          "Antwort ausarbeiten",
          "Leistung, Ablauf und Einsatzort verständlich erklären."
        ],
        [
          "Kontakt ermöglichen",
          "Den nächsten Schritt direkt auf der passenden Seite anbieten."
        ]
      ]
    },
    "content": {
      "label": "Redaktion & Gestaltung · HMS Loistl",
      "title": "Ein Bild zeigt Arbeit.",
      "emphasis": "Der Text erklärt sie.",
      "body": "Die Bilder zeigen dieselbe Rasenfläche vor und nach der Laubbeseitigung. Eine konkrete Überschrift und die richtige Zuordnung machen daraus einen nachvollziehbaren Einblick.",
      "call": "Inhalte besprechen",
      "contactTitle": "Was möchten Sie",
      "contactEmphasis": "Ihren Kunden zeigen?",
      "notes": [
        [
          "Aussage",
          "Was ist auf den Bildern tatsächlich zu sehen?"
        ],
        [
          "Auswahl",
          "Dieselbe Fläche, derselbe Blickwinkel, ein erkennbarer Unterschied."
        ],
        [
          "Gestaltung",
          "Überschrift und Bildpaar führen gemeinsam durch den Inhalt."
        ]
      ]
    },
    "ai": {
      "label": "Ergänzende Beratung für Ihren Arbeitsalltag",
      "title": "Eine Aufgabe verstehen.",
      "emphasis": "Einen sinnvollen Einsatz finden.",
      "body": "Wir betrachten einen konkreten Vorgang, seine Informationen und die menschlichen Entscheidungen. Daraus entsteht eine Einschätzung, wo KI unterstützen kann.",
      "call": "Arbeitsablauf besprechen",
      "contactTitle": "Welcher Vorgang kostet",
      "contactEmphasis": "Sie regelmäßig Zeit?",
      "notes": [
        [
          "Eingabe",
          "Welche Informationen stehen zur Verfügung?"
        ],
        [
          "Ergebnis",
          "Was soll vorbereitet werden?"
        ],
        [
          "Entscheidung",
          "Was muss ein Mensch prüfen und freigeben?"
        ]
      ]
    }
  },
  "en": {
    "redesign": {
      "label": "Real project · HMS Loistl",
      "title": "The same business.",
      "emphasis": "A more accurate impression.",
      "body": "The old stock photos showed buildings outside the intended audience. The new website focuses on a well-kept entrance, specific services and relevant service areas.",
      "call": "Discuss your existing website",
      "contactTitle": "What needs to change",
      "contactEmphasis": "on your website?",
      "notes": [
        [
          "Keep",
          "The business identity and professional services."
        ],
        [
          "Refocus",
          "Images and messaging on large apartment buildings."
        ],
        [
          "Add",
          "Dedicated pages for services and service areas."
        ]
      ]
    },
    "support": {
      "label": "An example of ongoing content work",
      "title": "Two photos become",
      "emphasis": "a new project story.",
      "body": "HMS Loistl provides photos from day-to-day work. We turn them into a clear project section. The website gains new content from work that is already happening.",
      "call": "Discuss website support",
      "contactTitle": "What gets left behind",
      "contactEmphasis": "on your website?",
      "notes": [
        [
          "Input",
          "A message and two files."
        ],
        [
          "Draft & approval",
          "We prepare it. You decide."
        ],
        [
          "Update",
          "The new content becomes part of your website."
        ]
      ]
    },
    "profile": {
      "label": "Illustrative profile view · HMS Loistl example",
      "title": "From a search",
      "emphasis": "to a first conversation.",
      "body": "A business profile is often the first point of contact. Its information, photos and contact options should give people a coherent picture of your business.",
      "call": "Discuss your business profile",
      "contactTitle": "Let’s look at",
      "contactEmphasis": "your business profile.",
      "notes": [
        [
          "Current information",
          "What do you offer, where do you work and how can people reach you?"
        ],
        [
          "Real insights",
          "Photos and updates show what your business actually does."
        ],
        [
          "Contact",
          "People can call or visit your website to learn more."
        ]
      ]
    },
    "seo": {
      "label": "Page concept using HMS Loistl as an example",
      "title": "A specific question.",
      "emphasis": "A relevant page.",
      "body": "Someone looking for property care in Solln needs information about services and location. Those questions deserve a dedicated place on the website.",
      "call": "Discuss search visibility",
      "contactTitle": "What do your ideal",
      "contactEmphasis": "customers ask?",
      "notes": [
        [
          "Understand the search",
          "Which service is needed, and in which area?"
        ],
        [
          "Develop the answer",
          "Explain the service, process and area clearly."
        ],
        [
          "Make contact easy",
          "Offer a relevant next step on that page."
        ]
      ]
    },
    "content": {
      "label": "Editorial work & design · HMS Loistl",
      "title": "The photo shows the work.",
      "emphasis": "The copy explains it.",
      "body": "These images show the same lawn before and after leaf removal. A specific headline and clear labels turn them into an understandable example of the work.",
      "call": "Discuss your content",
      "contactTitle": "What would you like",
      "contactEmphasis": "your customers to see?",
      "notes": [
        [
          "Message",
          "What do the photos actually show?"
        ],
        [
          "Selection",
          "The same area, the same viewpoint and a visible difference."
        ],
        [
          "Design",
          "The headline and paired images guide the reader together."
        ]
      ]
    },
    "ai": {
      "label": "Additional consulting for everyday work",
      "title": "Understand one task.",
      "emphasis": "Find a useful role for AI.",
      "body": "We examine a specific workflow, its information and the human decisions involved. This gives us a basis to assess where AI could help.",
      "call": "Discuss a workflow",
      "contactTitle": "Which task repeatedly",
      "contactEmphasis": "takes up your time?",
      "notes": [
        [
          "Input",
          "What information is available?"
        ],
        [
          "Output",
          "What needs to be prepared?"
        ],
        [
          "Decision",
          "What must a person check and approve?"
        ]
      ]
    }
  }
};
