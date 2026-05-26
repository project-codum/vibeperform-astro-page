export type LandingLocale = "en" | "de";

export const landingHighlightsContent = {
  en: {
    applications: {
      heading: "Typical application areas",
      description: "Where we see quick wins for mid-sized teams.",
      cards: [
        {
          title: "Document analysis",
          imageSrc: "/example1.png",
          imageAlt: "Document analysis illustration",
          description:
            "We extract the signal from contracts, maintenance forms, and insurance policies.",
          highlight: "Up to −70% less manual capture effort.",
          examples: [
            "Contract analysis: clauses, deadlines, deviations from the standard clause.",
            "Maintenance/service reports: fault codes, actions taken, spare parts, next due date — history stays current.",
            "Insurance contracts & policies: coverage limits, deductibles, exclusions, durations — catch renewals on time.",
          ],
        },
        {
          title: "Sales copilot (next best action)",
          imageSrc: "/example2.png",
          imageAlt: "Sales copilot dashboard mockup",
          description:
            "We prioritise leads, summarise every interaction, and recommend the next best step.",
          highlight: "+10–20% conversion, −30% admin effort.",
          examples: [
            "Lead prioritisation: scoring from CRM data, website signals, and email engagement.",
            "Contact summaries: emails / calls / meetings distilled into a CRM note within a minute.",
            "Follow-up actions: suggested next steps with email/call drafts plus task and calendar entries.",
          ],
        },
        {
          title: "Proposal assistant",
          imageSrc: "/example3.png",
          imageAlt: "Proposal assistant mockup",
          description:
            "We generate proposal drafts from templates, past cases, and product data — including pricing and terms.",
          highlight: "Up to −50% creation time.",
          examples: [
            "Prefilled line items: products, quantities, prices pulled from ERP or price lists.",
            "Terms & service modules: auto-selected clauses based on client and scope.",
            "Deviation checks: discount/margin, special conditions, and approval workflow.",
          ],
        },
      ],
    },
    security: {
      heading: "Data protection & security",
      body: [
        "We work fully GDPR-compliant, use secure setups such as isolated tenants, API-based processing, and data minimisation, and sign NDAs whenever required. Private cloud and on-prem deployments are part of our toolkit.",
      ],
      highlight:
        "No training on your proprietary data without explicit approval.",
    },
    audience: {
      heading: "Who is this for?",
      description:
        "Executives, sales/service/operations leads, and IT or data teams who want fast, dependable AI decisions.",
    },
  },
  de: {
    applications: {
      heading: "Typische Anwendungsfelder",
      description: "Wo wir schnelle Ergebnisse für mittelständische Teams sehen.",
      cards: [
        {
          title: "Dokumentenanalyse",
          imageSrc: "/example1.png",
          imageAlt: "Dokumentenanalyse Beispiel",
          description:
            "Wir extrahieren relevante Inhalte und machen Dokumente durchsuchbar.",
          highlight: "Bis zu −70 % Erfassungsaufwand.",
          examples: [
            "Vertragsanalyse: Klauseln, Fristen, Abweichungen zur Standardklausel.",
            "Wartungs-/Serviceberichte: Fehlercodes, Maßnahmen, Ersatzteile, nächste Fälligkeit – Historie wird aktualisiert.",
            "Versicherungsverträge & Policen: Deckungssummen, Selbstbehalte, Ausschlüsse, Laufzeiten – Erneuerungen erkennen.",
          ],
        },
        {
          title: "Vertriebs-Copilot (Entscheidungshilfe)",
          imageSrc: "/example2.png",
          imageAlt: "Vertriebs-Copilot Beispiel",
          description:
            "Wir priorisieren Leads, fassen Interaktionen zusammen und schlagen nächste Schritte vor.",
          highlight: "+10–20 % Conversion, −30 % Admin-Aufwand.",
          examples: [
            "Lead-Priorisierung: Bewertung aus CRM-Daten, Website-Signalen und E-Mail-Engagement.",
            "Kontakt-Zusammenfassungen: Mails/Anrufe/Termine als CRM-Notiz in einer Minute.",
            "Folgeaktionen: Vorschläge inklusive Mail-/Anruf-Entwürfen sowie Terminanlage.",
          ],
        },
        {
          title: "Angebots-Assistent",
          imageSrc: "/example3.png",
          imageAlt: "Angebots-Assistent Beispiel",
          description:
            "Wir erzeugen Angebotsentwürfe aus Vorlagen, Fällen und Produktdaten – inkl. Preisen und Konditionen.",
          highlight: "Bis zu −50 % Erstellungszeit.",
          examples: [
            "Vorbefüllte Positionen: Artikel, Mengen, Preise direkt aus ERP oder Preislisten.",
            "AGB & Leistungsbausteine: Automatisch passend zu Kunde und Leistungsumfang.",
            "Abweichungsprüfung: Rabatt/Marge, Sonderkonditionen und Freigabe-Workflow.",
          ],
        },
      ],
    },
    security: {
      heading: "Datenschutz & Sicherheit",
      body: [
        "Wir arbeiten DSGVO-konform, nutzen sichere Setups wie isolierte Tenants, API-basierte Verarbeitung und Datenminimierung. Private Cloud und On-Prem-Szenarien sind Teil unseres Werkzeugkastens.",
      ],
      highlight:
        "Kein Training auf Ihren proprietären Daten.",
    },
    audience: {
      heading: "Für wen ist unser Angebot gemacht?",
      description:
        "Geschäftsführungen, Leitungen in Vertrieb/Service/Operations sowie IT- oder Daten-Teams, die schnelle, belastbare KI-Entscheidungen wollen.",
    },
  },
} as const;

export const landingIconKeys = [
  "barChart3",
  "users",
  "briefcase",
  "shieldCheck",
] as const;

export type LandingIconKey = (typeof landingIconKeys)[number];
