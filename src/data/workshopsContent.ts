import { homeContent } from './homeContent.ts';

export const workshopsContent = {
	en: {
		metaTitle: 'Workshops – Vibeperform',
		nav: homeContent.en.nav,

		hero: {
			kicker: 'Workshops',
			title: 'Our Workshops at a Glance',
			intro: 'Together we identify AI opportunities inside your processes, then build tangible solutions to prove the impact.',
			// sub: 'No generic slide decks. We work on your process, with your team, toward a solution you could ship.',
		},

		valueSection: {
			heading: 'Why teams work with us',
			bullets: [
				{
					title: "You don't need more theory.",
					body: 'You need clarity on where AI can drive revenue, save hours, or remove bottlenecks. That’s what we map with you in under a day.',
					icon: 'lightbulb',
				},
				{
					title: 'We build, not just advise.',
					body: 'We combine software engineering and learning design. We don’t hand you slides – we co-design and then prototype with you.',
					icon: 'user-round-cog',
				},
				{
					title: 'Your team leaves with next steps.',
					body: 'Every session ends with 1 owned use case, success criteria, and a concrete path to implementation.',
					icon: 'rocket',
				},
			],
		},

		offeringsIntro: {
			heading: 'Formats',
			body: "Three modular formats. Start where you are. Combine if you're ready to move fast.",
		},

		offerings: [
			{
				title: 'Explore Session',
				meta: '1 hour / on-site / leadership + key operators',
				description:
					'Identify high-value AI opportunities in your business. We look at where time is lost, where quality breaks, and where capacity is limited. You leave with 2–3 use cases ranked by impact and feasibility.',
				outcomes: [
					'Map of current bottlenecks',
					'Shortlist of AI/automation use cases',
					'Which one is worth building first – and why',
				],
				ctaLabel: 'Request Explore Session',
			},
			{
				title: 'Design Workshop',
				meta: '1 day / on-site / up to 8 people',
				description:
					'We take the top use case and design it in detail: how it fits into your workflow, what inputs it needs, what it should deliver, and how we measure success.',
				outcomes: [
					'Future-state workflow with AI in the loop',
					'Defined feature set and data requirements',
					'Trust & acceptance criteria for the team',
				],
				ctaLabel: 'See sample agenda',
			},
			{
				title: 'Build Sprint',
				meta: '2–4 weeks / engineering + iteration with your team',
				description:
					'We prototype the solution with your real context. That can be workflow automation, smart replies, content generation, internal assistant, or lead intake.',
				outcomes: [
					'Working prototype or automated process',
					'Live demo in your environment',
					'Clear path for rollout or extension',
				],
				ctaLabel: 'Start a Sprint',
			},
		],

		scorecard: {
			title: 'Interactive scoring canvas',
			intro:
				'Choose the scenario that best matches your workshop goals to see how we balance value, feasibility, and readiness.',
			scenarios: [
				{
					name: 'Transform a core process',
					description:
						"We identify where your workflows hold the most AI potential and how change would land in the day-to-day.",
					scoreFocus: ['Where do you lose time?', 'Where do workflows break?', 'Where are new revenue opportunities?'],
					nextMoves: [
						'Define north star metrics and non-negotiables',
						'Design pilots with explicit change stories',
						'Secure data foundations before automation',
					],
				},
				{
					name: 'Launch a flagship AI product',
					description:
						'Perfect for innovation squads that need fast validation loops and stakeholder-ready proof points.',
					scoreFocus: ['Strategic alignment 40%', 'Business impact 35%', 'Feasibility 25%'],
					nextMoves: [
						'Start with a lighthouse use case and hero metric',
						'Craft demo assets for executive storytelling',
						'Stand up governance rituals for rapid experimentation',
					],
				},
				{
					name: 'Scale automation portfolio',
					description:
						'Designed for teams juggling multiple automation ideas that need a clear investment order.',
					scoreFocus: ['Feasibility 40%', 'Business impact 30%', 'Strategic alignment 30%'],
					nextMoves: [
						'Bundle similar automations to reduce tech sprawl',
						'Sequence quick wins before complex builds',
						'Codify operating models and support runbooks',
					],
				},
			],
		},

		proof: {
			heading: 'What happens after the workshop',
			items: [
				{
					stat: '+6 hours/week freed',
					body: 'Automated quote follow-ups and first-response handling removed repetitive manual typing for a 15-person service business.',
				},
				{
					stat: 'More inbound without ads',
					body: 'A craft business now auto-generates social posts from finished project photos – and gets steady leads instead of waiting on referrals only.',
				},
				{
					stat: 'No more dropped requests',
					body: 'Website assistant qualifies and routes inquiries so nothing gets lost when owners are on site.',
				},
			],
		},

		team: {
			heading: "Who you'll work with",
			body:
				"We’re builders with a coaching mindset. We’ve shipped software, designed learning experiences, and implemented AI in real operations. We sit next to your team, map the work, and make sure the solution fits how people actually work.",
		},

		finalCta: {
			heading: 'Want to see what AI could do in your business?',
			body: "Book a no-strings intro. We'll recommend the workshop that matches your team and goals.",
			button: {
				label: 'Book a call',
				href: 'mailto:contact@vibeperform.com',
			},
		},
	},
	de: {
		metaTitle: 'Workshops – Vibeperform',
		nav: homeContent.de.nav,

			hero: {
				kicker: 'Workshops',
				title: 'Unsere Workshops im Überblick',
				intro: 'In unseren Workshops identifizieren wir gemeinsam KI-Potenziale für eure Prozesse. Darauf aufbauend entwickeln oder installieren wir greifbare Lösungen für euch.',
			// sub: 'Keine Folienschlacht. Wir arbeiten direkt an euren Abläufen, mit eurem Team, auf ein konkretes Ergebnis hin.',
		},

		valueSection: {
			heading: 'Warum Teams mit uns arbeiten',
			bullets: [
				{
					title: 'Weniger Theorie. Mehr Umsetzung.',
					body: 'Ihr braucht Klarheit, wo KI echten Mehrwert bringt, Zeit spart oder Engpässe löst. Genau das machen wir mit euch – in unter einem Tag.',
					icon: 'lightbulb',
				},
				{
					title: 'Wir bauen mit euch.',
					body: 'Wir verbinden Software-Entwicklung mit Lern- und Change-Kompetenz. Heißt: Wir entwerfen die Lösung mit euch – und setzen sie um.',
					icon: 'user-round-cog',
				},
				{
					title: 'Klarheit. Nächste Schritte. Loslegen.',
					body: 'Am Ende steht ein priorisierter Use Case mit Nutzen, Erfolgskennzahlen und Umsetzungsplan.',
					icon: 'rocket',
				},
			],
		},

		offeringsIntro: {
			heading: 'Unsere Formate',
			body: 'Drei Bausteine. Einstieg niedrigschwellig. Kombinierbar, wenn es schnell gehen soll.',
		},

		offerings: [
			{
				title: 'Explore Session',
				meta: '1 Stunde / vor Ort / Geschäftsführung + Schlüsselrollen',
				description:
					'Wir identifizieren, wo in eurem Alltag Potenzial für KI steckt: Wo geht Zeit verloren? Wo brechen Abläufe? Wo liegen Chancen für neue Aufträge? Ergebnis: 2–3 priorisierte Use Cases mit klarer Wirkung.',
				outcomes: [
					'Übersicht über eure größten Pain Points',
					'Shortlist an KI-/Automations-Ideen',
					'Empfehlung: Womit starten und warum',
				],
				ctaLabel: 'Explore anfragen',
			},
			{
				title: 'Design Workshop',
				meta: '1 Tag / vor Ort / bis 8 Personen',
				description:
					'Wir nehmen den wichtigsten Use Case auseinander: Wer nutzt die Lösung? Welche Daten braucht sie? Wie sieht der Ablauf aus? Wie wird Erfolg gemessen? Ergebnis ist ein klares Soll-Szenario.',
				outcomes: [
					'Zukünftiger Prozess mit KI-Unterstützung',
					'Feature-Set und Datenbedarf',
					'Vertrauens- und Qualitätskriterien fürs Team',
				],
				ctaLabel: 'Agenda ansehen',
			},
			{
				title: 'Build Sprint',
				meta: '2–4 Wochen / Umsetzung mit echten Daten',
				description:
					'Wir bauen einen funktionierenden Prototypen oder automatisieren einen Teilprozess. Typische Ergebnisse: Angebots-Assistent, Social-Content-Generator, Lead-Intake-Bot, interne Wissenssuche.',
				outcomes: [
					'Laufender Prototyp oder automatisierter Ablauf',
					'Test in eurer echten Umgebung',
					'Nächste Schritte für Rollout oder Skalierung',
				],
				ctaLabel: 'Sprint starten',
			},
		],

		scorecard: {
			title: 'Interaktive Scoring-Canvas',
			intro:
				'Wählt das Szenario, das eure Workshop-Ziele am besten trifft – so gewichten wir Wirkung, Machbarkeit und Readiness.',
			scenarios: [
				{
					name: 'Kernprozess transformieren',
					description:
						'Wir identifizieren gemeinsam, wo in euren Arbeitsabläufen Potenzial für KI steckt.',
					scoreFocus: ['Wie wird KI zun Wettbewerbsvorteil?', 'Wo geht Zeit verloren oder brechen Abläufe?', 'Wo liegen Chancen für neue Aufträge?'],
					nextMoves: [
						'Nordstern-KPIs und No-Gos definieren',
						'Piloten mit klarer Change-Story planen',
						'Datenfundament vor der Automatisierung sichern',
					],
				},
				{
					name: 'Flaggschiff-KI-Produkt starten',
					description:
						'Perfekt für Innovationsteams, die schnelle Validierung und überzeugende Proof Points brauchen.',
					scoreFocus: ['Strategische Passung 40 %', 'Business Impact 35 %', 'Machbarkeit 25 %'],
					nextMoves: [
						'Mit einem Lighthouse-Use-Case und klarer KPI starten',
						'Demo-Artefakte für Stakeholder-Stories bauen',
						'Governance-Rituale für schnelles Experimentieren etablieren',
					],
				},
				{
					name: 'Automationsportfolio skalieren',
					description:
						'Gedacht für Teams mit vielen Automationsideen, die eine klare Investitionsreihenfolge brauchen.',
					scoreFocus: ['Machbarkeit 40 %', 'Business Impact 30 %', 'Strategische Passung 30 %'],
					nextMoves: [
						'Ähnliche Automationen bündeln statt Tech-Sprawl',
						'Schnelle Quick Wins vor komplexen Builds priorisieren',
						'Operating Model und Runbooks früh festhalten',
					],
				},
			],
		},

		proof: {
			heading: 'Was nach dem Workshop passiert',
			items: [
				{
					stat: '+6 Stunden / Woche',
					body: 'Durch automatisierte Angebots-Nachverfolgung musste ein Handwerksbetrieb deutlich weniger manuell nachfassen – ohne Qualitätsverlust.',
				},
				{
					stat: 'Mehr Anfragen, ohne Anzeigenbudget',
					body: 'Ein kleines Unternehmen veröffentlicht jetzt automatisch Social-Posts aus echten Projektfotos. Ergebnis: neue Anfragen statt Warten auf Empfehlungen.',
				},
				{
					stat: 'Kein Anfrageverlust mehr',
					body: 'Ein Assistent auf der Website qualifiziert und sortiert eingehende Anfragen, auch wenn niemand ans Telefon gehen kann.',
				},
			],
		},

		team: {
			heading: 'Mit wem ihr arbeitet',
			body:
				'Wir sind ein Team aus Entwicklung und Enablement. Wir bringen KI dorthin, wo sie Wirkung hat – in die tägliche Arbeit. Uns ist wichtig: Umsetzung statt Buzzword, Praxis statt Politik.',
		},

			finalCta: {
				heading: 'Findet heraus, was bei euch möglich ist!',
			body:
				'Buche hier ein unverbindliches Kennenlernen. Wir empfehlen dir den richtigen Workshop für euer Team und Ziel.',
			button: {
				label: 'Gespräch buchen',
				href: 'mailto:contact@vibeperform.com',
			},
		},
	},
} as const;

export type WorkshopsLocale = keyof typeof workshopsContent;
export type WorkshopsContent = (typeof workshopsContent)[WorkshopsLocale];
