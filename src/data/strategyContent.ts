export const strategyContent = {
	en: {
		metaTitle: 'AI Strategy Consulting for SMEs | Vibeperform',
			hero: {
				kicker: 'AI Strategy',
				title: 'Turn your AI vision into a measurable roadmap.',
			subtitle:
				'We co-create your AI ambition, shortlist the highest value use cases, and translate them into a roadmap that your teams can execute with confidence.',
			primaryCta: { label: 'Book a 15 min call', href: '#contact' },
			secondaryCta: { label: 'Explore the journey', href: '#process' },
			highlights: [
				{
					title: 'Structured co-creation',
					description:
						'Inspiration, guided ideation, and value-based scoring to surface the strongest bets.',
				},
				{
					title: 'Business first',
					description: 'Every decision connects to measurable impact and strategic relevance.',
				},
				{
					title: 'Ready-to-run plan',
					description:
						'Roadmap with owners, next steps, and guardrails so momentum starts on day one.',
				},
			],
		},
		process: {
			title: 'How the strategy sprint unfolds',
			intro:
				'A three step journey that keeps momentum high while de-risking adoption. Each session ends with tangible outputs you can circulate the same day.',
			steps: [
				{
					id: 'inspiration',
					title: 'Inspiration lab',
					description:
						'We translate industry best practice into your context, unpack technical levers, and connect opportunities with business value.',
					deliverables: [
						'Landscape map of relevant AI patterns for your business',
						'Tech and data readiness quick scan',
						'Impact hypotheses linked to strategic goals',
					],
				},
				{
					id: 'strategy',
					title: 'Strategy design studio',
					description:
						'We align on ambition, select leading use cases, and define value metrics that keep stakeholders invested.',
					deliverables: [
						'Prioritised shortlist across desirability, viability, feasibility',
						'Decision matrix with executive ready scoring',
						'AI strategy narrative with vision, target state, and guardrails',
					],
				},
				{
					id: 'roadmap',
					title: 'Roadmap and activation',
					description:
						'We codify ownership, sequence pilots, and define the signals that prove traction within the first 100 days.',
					deliverables: [
						'Milestone roadmap with sprint charters and checkpoints',
						'Change enablement moves for leadership and teams',
						'Risk and compliance checklist aligned to AI governance',
					],
				},
			],
		},
		valueDrivers: {
			title: 'The six value drivers we measure',
			intro:
				'Every use case is scored across six Vibeperform value drivers so you invest where momentum and payoff are highest. Open a driver to see how we assess it.',
			drivers: [
				{
					name: 'Revenue lift',
					description:
						'Signals that boost acquisition, cross sell, or pricing power. We size upside with funnel data and commercial models.',
				},
				{
					name: 'Efficiency',
					description:
						'Time saved in high volume processes, automation coverage, and expected cost to serve reduction.',
				},
				{
					name: 'Customer experience',
					description:
						'Impact on response times, personalisation, net promoter score, and service consistency.',
				},
				{
					name: 'Employee enablement',
					description:
						'How AI augments teams, unlocks expertise, and reduces cognitive load through copilot style workflows.',
				},
				{
					name: 'Risk and compliance',
					description:
						'Exposure to regulatory requirements, explainability needs, and safeguards for responsible deployment.',
				},
				{
					name: 'Innovation runway',
					description:
						'Ability to create new offerings, data assets, or differentiating IP beyond incremental gains.',
				},
			],
		},
		scorecard: {
			title: 'Interactive scoring canvas',
			intro:
				'Select the scenario that best matches your organisation to see how we balance value, feasibility, and readiness when we prioritise use cases.',
			scenarios: [
				{
					name: 'Transform a core process',
					description:
						'Ideal when you aim to reimagine your main value chain without disrupting day to day execution.',
					scoreFocus: ['Business impact 45%', 'Feasibility 35%', 'Strategic alignment 20%'],
					nextMoves: [
						'Define north star metrics and non negotiables',
						'Design pilots with explicit change stories',
						'Secure data foundations before automation',
					],
				},
				{
					name: 'Launch a flagship AI product',
					description:
						'Perfect for innovation squads that need fast validation loops and stakeholder proof points.',
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
						'Designed for operations teams with multiple automation ideas competing for attention and funding.',
					scoreFocus: ['Feasibility 40%', 'Business impact 30%', 'Strategic alignment 30%'],
					nextMoves: [
						'Bundle similar automations to reduce tech sprawl',
						'Sequence quick wins before complex builds',
						'Codify operating model and support runbooks',
					],
				},
			],
		},
		workshopFormats: {
			title: 'Formats that get decisions made',
			description:
				'We combine inspiration, design, and activation formats so you move from idea to execution without losing momentum.',
			modules: [
				{
					name: 'Use case radar',
					duration: '2 hrs',
					description:
						'Executive and business leads converge on opportunity zones, evaluate market signals, and define success themes.',
				},
				{
					name: 'Value sprint',
					duration: '1 day',
					description:
						'Cross functional teams ideate, score, and storyboard the highest value use cases with facilitator support.',
				},
				{
					name: 'Roadmap lab',
					duration: '3 hrs',
					description:
						'We turn the prioritised use cases into a sequenced roadmap with owners, capabilities, and first 100 day milestones.',
				},
			],
		},
		frameworks: {
			title: 'Tools you can reuse immediately',
			items: [
				{
					title: 'Use case canvas',
					description:
						'Guides teams from problem framing to PoC backlog with prompts for data, governance, and value proof.',
				},
				{
					title: 'Readiness scan',
					description:
						'Snapshot of data, tech, people, and compliance maturity so you remove blockers before scaling.',
				},
				{
					title: 'Value driver scorecard',
					description:
						'Lightweight scoring template to compare impact, feasibility, and alignment across initiatives.',
				},
			],
		},
		ctaBanner: {
			title: 'Ready to make your AI plan tangible?',
			body: 'Bring us into your next leadership session and leave with clarity on where to start.',
			primaryCta: { label: 'Schedule your consultation', href: '#contact' },
			secondaryCta: { label: 'Review the session flow', href: '#process' },
		},
		contact: {
			title: 'Let us prep your first 100 days',
			description:
				'Share your focus and we will return with a tailored agenda, relevant use case examples, and next step suggestions.',
			fields: [
				{ label: 'Name', name: 'name', type: 'text', autocomplete: 'name' },
				{ label: 'Work email', name: 'email', type: 'email', autocomplete: 'email' },
				{ label: 'Company', name: 'company', type: 'text', autocomplete: 'organization' },
				{ label: 'Top priority right now', name: 'priority', type: 'textarea' },
			],
			submitLabel: 'Send inquiry',
		},
	},
	de: {
		metaTitle: 'KI-Strategieberatung für den Mittelstand | Vibeperform',
			hero: {
				kicker: 'KI Strategie',
				title: 'Von der Vision zu konkreten Use Cases.',
			subtitle:
				'Wir entwickeln mit euch eure KI Vision, identifizieren die wertvollsten Use Cases und uebersetzen sie in eine Roadmap mit messbaren Zielen.',
			primaryCta: { label: '15 min Gespraech sichern', href: '#kontakt' },
			secondaryCta: { label: 'Ablauf ansehen', href: '#ablauf' },
			highlights: [
				{
					title: 'Strukturierte Co-Creation',
					description:
						'Inspiration, moderiertes Brainstorming und Value Scorecards fuer die staerksten Ideen.',
				},
				{
					title: 'Business Value zuerst',
					description: 'Jede Entscheidung zahlt auf messbaren Impact und strategische Relevanz ein.',
				},
				{
					title: 'Plan zum Durchstarten',
					description:
						'Roadmap mit Verantwortlichen, naechsten Schritten und Guardrails fuer schnelle Umsetzung.',
				},
			],
		},
		process: {
			title: 'So laeuft der Strategie Sprint',
			intro:
				'Drei Schritte, die Tempo und Sicherheit kombinieren. Jede Session liefert Ergebnisse, die ihr direkt teilen koennt.',
			steps: [
				{
					id: 'inspiration',
					title: 'Inspiration Lab',
					description:
						'Wir zeigen Branchenbeispiele ohne Buzzwords, bewerten technische Machbarkeit und verknuepfen Chancen mit Business Value.',
					deliverables: [
						'Landscape Map relevanter KI Muster fuer euer Geschaeft',
						'Quick Check zu Daten, Tech und Organisation',
						'Impact Hypothesen verknuepft mit strategischen Zielen',
					],
				},
				{
					id: 'strategie',
					title: 'Strategie Design Studio',
					description:
						'Wir schaerfen die Ambition, priorisieren Use Cases entlang Relevanz und Machbarkeit und definieren Value Metriken.',
					deliverables: [
						'Shortlist der Top Use Cases entlang Desirability, Viability, Feasibility',
						'Entscheidungsmatrix mit Management Score',
						'KI Strategie Narrative mit Vision, Zielbild und Guardrails',
					],
				},
				{
					id: 'roadmap',
					title: 'Roadmap und Aktivierung',
					description:
						'Wir definieren Ownership, planen Piloten und legen Signale fest, die innerhalb von 100 Tagen Fortschritt zeigen.',
					deliverables: [
						'Milestone Roadmap mit Sprints und Checkpoints',
						'Change Enablement Moves fuer Fuehrung und Teams',
						'Risk und Compliance Checklist aligned zur KI Governance',
					],
				},
			],
		},
		valueDrivers: {
			title: 'Die sechs Value Driver',
			intro:
				'Jeder Use Case wird entlang der sechs Vibeperform Value Driver bewertet. So investieren wir dort, wo Momentum und Nutzen am hoechsten sind.',
			drivers: [
				{
					name: 'Umsatzhebel',
					description:
						'Hebel fuer Akquise, Cross Sell oder Pricing Power. Wir quantifizieren den Upside mit Funnel Daten und Business Modellen.',
				},
				{
					name: 'Effizienz',
					description:
						'Zeitgewinn in Kernprozessen, Automatisierungsgrad und erwartete Kostenersparnis.',
				},
				{
					name: 'Kundenerlebnis',
					description:
						'Einfluss auf Response Zeiten, Personalisierung, Net Promoter Score und Service Qualitaet.',
				},
				{
					name: 'Mitarbeiter Enablement',
					description:
						'Wie KI Teams unterstuetzt, Expertise teilt und mentale Last durch Copilot Workflows reduziert.',
				},
				{
					name: 'Risk und Compliance',
					description:
						'Regulatorische Anforderungen, Erklaerbarkeit und Guardrails fuer verantwortungsvolle Nutzung.',
				},
				{
					name: 'Innovationsfaehigkeit',
					description:
						'Faehigkeit neue Angebote, Daten Assets oder differenzierende IP ueber inkrementelle Effekte hinaus zu schaffen.',
				},
			],
		},
		scorecard: {
			title: 'Interactive Scorecard',
			intro:
				'Waehlt das Szenario, das zu eurer Situation passt, und seht, wie wir Wert, Machbarkeit und Alignment ausbalancieren.',
			scenarios: [
				{
					name: 'Kernprozess transformieren',
					description:
						'Ideal wenn ihr die Haupt-Wertschoepfung neu denken wollt ohne den Betrieb zu stoeren.',
					scoreFocus: ['Business Impact 45%', 'Machbarkeit 35%', 'Strategic Alignment 20%'],
					nextMoves: [
						'North Star Metriken und No-Gos definieren',
						'Piloten mit klares Change Narrativ planen',
						'Datenbasis sichern bevor automatisiert wird',
					],
				},
				{
					name: 'Flagship KI Produkt starten',
					description:
						'Perfekt fuer Innovationsteams, die schnelle Validierung und Proof Points brauchen.',
					scoreFocus: ['Strategic Alignment 40%', 'Business Impact 35%', 'Machbarkeit 25%'],
					nextMoves: [
						'Mit Lighthouse Use Case und Hero Metric starten',
						'Demo Assets fuer das Management aufbauen',
						'Governance Rituale fuer schnelle Experimente etablieren',
					],
				},
				{
					name: 'Automation Portfolio skalieren',
					description:
						'Fuers Operations Team mit vielen Automationsideen, die um Ressourcen konkurrieren.',
					scoreFocus: ['Machbarkeit 40%', 'Business Impact 30%', 'Strategic Alignment 30%'],
					nextMoves: [
						'Aehnliche Automationen buendeln um Tech Sprawl zu reduzieren',
						'Quick Wins vor komplexen Builds umsetzen',
						'Operating Model und Support Runbooks dokumentieren',
					],
				},
			],
		},
		workshopFormats: {
			title: 'Formate mit Entscheidungs-Power',
			description:
				'Wir verbinden Inspiration, Design und Aktivierung, damit ihr von der Idee in die Umsetzung kommt.',
			modules: [
				{
					name: 'Use Case Radar',
					duration: '2 Std',
					description:
						'Fuehrung und Business Leads einigen sich auf Opportunity Zonen, bewerten Markt Signale und definieren Erfolgsthemen.',
				},
				{
					name: 'Value Sprint',
					duration: '1 Tag',
					description:
						'Crossfunktionale Teams entwickeln, bewerten und storyboarden die wertvollsten Use Cases mit Moderation.',
				},
				{
					name: 'Roadmap Lab',
					duration: '3 Std',
					description:
						'Wir formen die priorisierten Use Cases zu einer Roadmap mit Verantwortlichen, Capabilities und 100-Tage Meilensteinen.',
				},
			],
		},
		frameworks: {
			title: 'Tools zum direkten Einsatz',
			items: [
				{
					title: 'Use Case Canvas',
					description:
						'Fuehrt Teams von Problem-Definition zu Proof-of-Concept Backlog mit Prompts fuer Daten, Governance und Value Proof.',
				},
				{
					title: 'Readiness Scan',
					description:
						'Snapshot von Daten, Tech, People und Compliance Reife um Blocker frueh zu loesen.',
				},
				{
					title: 'Value Driver Scorecard',
					description:
						'Leichtgewicht Vorlage um Impact, Machbarkeit und Alignment ueber Initiativen zu vergleichen.',
				},
			],
		},
		ctaBanner: {
			title: 'Bereit fuer eine greifbare KI Roadmap?',
			body: 'Bringt uns in eure naechste Fuehrungsrunde und ihr geht mit Klarheit raus, wo ihr startet.',
			primaryCta: { label: 'Beratung anfragen', href: '#kontakt' },
			secondaryCta: { label: 'Ablauf ansehen', href: '#ablauf' },
		},
		contact: {
			title: 'Wir bereiten eure ersten 100 Tage vor',
			description:
				'Teilt eure Fokusthemen und wir liefern Agenda, relevante Use Cases und konkrete Next Steps.',
			fields: [
				{ label: 'Name', name: 'name', type: 'text', autocomplete: 'name' },
				{ label: 'Business E-Mail', name: 'email', type: 'email', autocomplete: 'email' },
				{ label: 'Unternehmen', name: 'company', type: 'text', autocomplete: 'organization' },
				{ label: 'Top Prioritaet', name: 'priority', type: 'textarea' },
			],
			submitLabel: 'Anfrage senden',
		},
	},
} as const;

export type StrategyLocale = keyof typeof strategyContent;
export type StrategyContent = (typeof strategyContent)[StrategyLocale];
