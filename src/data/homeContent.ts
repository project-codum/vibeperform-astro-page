const BASE_PATH = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

export const homeContent = {
	en: {
		nav: {
			brand: 'vibeperform',
			links: [
				{ label: 'Workshops', href: '/en/workshops' },
				{ label: 'Blog', href: '/en/blog' },
				{ label: 'About us', href: '/en/about-us' },
			],
			toggleLabel: 'DE',
			toggleAriaLabel: 'Switch language to German',
			menuToggleLabel: 'Toggle navigation menu',
		},
		hero: {
			kicker: 'AI consulting & implementation',
			title: '',
			rotatingWords: ['Independent advice.', 'On-site analysis.', 'Turnkey implementation.'],
			subtitle: 'The all-in-one AI solution for SMBs: vendor-independent consulting, on-site workshop analysis, and turnkey implementation that turns AI into a tangible competitive advantage.',
			primaryCta: 'Get in touch',
			primaryHref: 'https://calendar.app.google/utFQgw33PwJTiDk56',
			secondaryCta: 'How we work',
			secondaryHref: '#how-we-work',
			callouts: [
				{ label: 'Speed', description: 'Weeks, not months' },
				{ label: 'Focus', description: 'Clear roadmaps' },
				{ label: 'Results', description: 'Measurable impact' },
				{ label: 'Trust', description: 'Compliance included' },
			],
		},
		features: {
			kicker: 'All-in-one for SMBs.',
			heading: 'How we turn AI into advantage',
			subheading:
				'We analyse your processes on site, advise independently of vendors, and implement the right solution turnkey - so your team can feel the impact in daily work quickly.',
			items: [],
			cta: {
				heading: 'Sound like the right approach?',
				primary: {
					label: 'Book a free discovery call',
					href: 'https://calendar.app.google/utFQgw33PwJTiDk56',
				},
				secondary: {
					label: 'Explore workshops',
					href: `${BASE_PATH}/en/workshops`,
				},
			},
		},
		useCases: {
			kicker: 'Use Cases',
			heading: 'Proven areas of application',
			subheading: 'Fast to deploy, clearly measurable - drawn from real mid-market projects.',
			cards: [
				{
					category: 'Sales',
					title: 'Proposal Assistant',
					description: 'AI bundles email and CRM info, drafts proposals and follow-ups including open points.',
					highlights: [
						'Proposal draft (PDF/Doc)',
						'Follow-up email (prewritten)',
						'Open questions & to-dos',
						'Source log',
					],
					toneClass: 'rose',
					icon: 'proposal',
				},
				{
					category: 'Customer Service',
					title: 'Knowledge Assistant (RAG)',
					description: 'Answers with source citations from manuals, tickets, and Confluence. Consistent tone, fast, and traceable.',
					highlights: [
						'Draft response with citations',
						'Relevant passages/links',
						'Quality check (policy/tone)',
						'Ticket-system handover',
					],
					toneClass: 'indigo',
					icon: 'support',
				},
				{
					category: 'Operations',
					title: 'Document Extraction & Checks',
					description: 'Extracts fields, checks rules, and writes to the ERP - with audit trail and variance report.',
					highlights: [
						'Extracted fields (JSON/CSV)',
						'PO vs. invoice reconciliation',
						'Variance report',
						'ERP posting incl. log',
					],
					toneClass: 'emerald',
					icon: 'operations',
				},
			],
		},
		audience: {
			heading: 'Who our AI offering is built for',
			subheading:
				'Our offering is aimed at mid-sized companies that want to noticeably improve their processes with AI and automation:',
			cards: [
				{ copy: '<strong>SMBs</strong> with ambition but limited capacity.' },
				{
					copy: '<strong>Sales, customer service, and operations teams</strong> as well as <strong>IT and data teams</strong> looking for relief in day-to-day work.',
				},
				{ copy: '<strong>Executive and department leaders</strong> who want fast, measurable results.' },
			],
		},
	},
	de: {
		nav: {
			brand: 'vibeperform',
			links: [
				// { label: 'KI Strategie', href: '/de/ki-strategie' },
				{ label: 'Workshops', href: '/de/workshops' },
				{ label: 'Blog', href: '/de/blog' },
				{ label: 'Über uns', href: '/de/ueber-uns' },
			],
			toggleLabel: 'EN',
			toggleAriaLabel: 'Sprache zu Englisch wechseln',
			menuToggleLabel: 'Navigationsmenue oeffnen',
		},
		hero: {
			kicker: 'KI Beratung & Umsetzung',
			title: '',
			rotatingWords: ['Unabhängig beraten.', 'Vor Ort analysieren.', 'Schlüsselfertige Umsetzung.'],
			subtitle: 'Der KI-Partner für KMU: Alles aus einer Hand. Von unabhängiger Beratung über Vor-Ort-Workshops bis zur fertigen Implementierung, damit Ihr Wettbewerbsvorteil direkt spürbar wird.',
			primaryCta: 'Kontakt aufnehmen',
			primaryHref: 'https://calendar.app.google/utFQgw33PwJTiDk56',
			secondaryCta: 'So arbeiten wir',
			secondaryHref: '#so-arbeiten-wir',
			callouts: [
				{ label: 'Tempo', description: 'Wochen statt Monate' },
				{ label: 'Fokus', description: 'Klare Roadmaps' },
				{ label: 'Ergebnis', description: 'Messbarer Impact' },
				{ label: 'Vertrauen', description: 'Compliance inklusive' },
			],
		},
		features: {
			kicker: 'All-in-one für KMU.',
			heading: 'So wird KI zum Wettbewerbsvorteil',
			subheading:
				'Wir analysieren eure Abläufe vor Ort, beraten anbieterunabhängig und implementieren die passende Lösung schlüsselfertig - damit euer Team den Nutzen schnell im Alltag spürt.',
			items: [],
			cta: {
				heading: 'Klingt nach dem richtigen Ansatz?',
				primary: {
					label: 'Kostenloses Erstgespräch vereinbaren',
					href: 'https://calendar.app.google/utFQgw33PwJTiDk56',
				},
				secondary: {
					label: 'Workshops ansehen',
					href: `${BASE_PATH}/de/workshops`,
				},
			},
		},
		audience: {
			heading: 'Für wen unser KI-Angebot gemacht ist',
			subheading:
				'Unser Angebot richtet sich an mittelständische Unternehmen, die ihre Abläufe mit KI und Automatisierung spürbar verbessern wollen:',
			cards: [
				{ copy: '<strong>KMU</strong> mit Ambition, aber begrenzten Kapazitäten.' },
				{
					copy: '<strong>Teams in Vertrieb, Kundenservice und Operations</strong> sowie <strong>IT- und Daten-Teams</strong>, die Entlastung im Tagesgeschäft suchen.',
				},
				{
					copy: '<strong>Geschäftsführungen und Bereichsleitungen</strong>, die schnelle, messbare Ergebnisse sehen wollen.',
				},
			],
		},
		useCases: {
			kicker: 'Use Cases',
			heading: 'Bewährte Einsatzfelder',
			subheading: 'Schnell nutzbar, klar messbar – aus realen Projekten im Mittelstand.',
			cards: [
				{
					category: 'Vertrieb',
					title: 'Angebots-Assistent',
					description: 'KI bündelt Mail- und CRM-Infos, erstellt Angebotsentwürfe und Follow-ups inklusive offener Punkte.',
					highlights: [
						'Angebotsentwurf (PDF/Doc)',
						'Follow-up-Mail (vorformuliert)',
						'Offene Fragen & To-dos',
						'Protokoll der Datenquellen',
					],
					toneClass: 'rose',
					icon: 'proposal',
				},
				{
					category: 'Kundenservice',
					title: 'Wissens-Assistenz (RAG)',
					description: 'Antworten mit Quellenzitaten aus Handbuch, Tickets und Confluence. Einheitliche Tonalität, schnell und nachvollziehbar.',
					highlights: [
						'Antwortentwurf mit Zitaten',
						'Relevante Passagen/Links',
						'Qualitätscheck (Policy/Ton)',
						'Handover an Ticket-System',
					],
					toneClass: 'indigo',
					icon: 'support',
				},
				{
					category: 'Operations',
					title: 'Dokumenten-Extraktion & Prüfungen',
					description: 'Extrahiert Felder, prüft Regeln und schreibt ins ERP – mit Audit-Trail und Abweichungsreport.',
					highlights: [
						'Extrahierte Felder (JSON/CSV)',
						'Abgleich PO ↔ Rechnung',
						'Abweichungsreport',
						'ERP-Buchung inkl. Log',
					],
					toneClass: 'emerald',
					icon: 'operations',
				},
			],
		},
	},
} as const;

export type HomeLocale = keyof typeof homeContent;
export type HomeContent = (typeof homeContent)[HomeLocale];
