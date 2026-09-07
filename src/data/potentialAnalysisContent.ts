import { homeContent } from './homeContent';

const contactHref = 'mailto:contact@vibeperform.com?subject=Anfrage%20KI-Potenzialanalyse';
const contactHrefEn = 'mailto:contact@vibeperform.com?subject=AI%20potential%20analysis%20inquiry';

export const potentialAnalysisContent = {
	de: {
		metaTitle: 'KI-Potenzialanalyse für Büroarbeit | Vibeperform',
		metaDescription:
			'In einer Stunde prüfen wir an einem echten Anfrage- oder Angebotsprozess, welche Büroarbeit eine Assistenz vorbereiten kann und wann sie Sie fragen muss.',
		nav: homeContent.de.nav,
		hero: {
			kicker: 'KI-Potenzialanalyse · eine Stunde',
			duration: '60 Minuten',
			title: 'Welche Büroarbeit müssen Sie wirklich selbst machen?',
			intro:
				'Wir nehmen einen echten Ablauf aus Ihrem Betrieb und schauen gemeinsam, was eine Assistenz mit Ihrer Einweisung vorbereiten kann. Online oder nach Absprache vor Ort.',
			primaryCta: { label: 'Analyse anfragen', href: contactHref },
			secondaryCta: { label: 'So läuft die Stunde', href: '#ablauf' },
			asideLabel: 'Der Prüfpunkt',
			asideTitle: 'Eine gute Assistenz braucht keinen Meister, sondern arbeitet meisterlich zu.',
			asideBody:
				'Sie muss wissen, welche Aufgaben sie übernehmen kann – und wann sie Sie fragen muss.',
			asideFootnote: 'KI bereitet vor. Sie entscheiden.',
		},
			workflow: {
				kicker: 'Ein konkreter Blick in Ihren Alltag',
				title: 'Wir starten mit einer typischen Anfrage oder einem Angebot.',
				intro:
					'Sie zeigen uns, wie ein Vorgang heute durch Ihren Betrieb läuft. Daran werden sinnvolle Vorarbeiten sichtbar.',
					steps: [
						{ number: '01', title: 'Vorgang zeigen', body: 'Eine echte Kundenanfrage, ein Nachfassen oder ein Angebotsentwurf.' },
						{ number: '02', title: 'Daten finden', body: 'Wo liegen Mails, Maße, Fotos, Preise und bisherige Antworten?' },
						{ number: '03', title: 'Aufgaben abgeben', body: 'Was kann eine Assistenz mit Einweisung zusammenstellen, prüfen oder entwerfen?' },
					],
				programsLabel: 'Wir schauen auf Ihre vorhandenen Programme',
				programs: ['E-Mail', 'Microsoft 365 / Google Workspace', 'Kunden- oder Auftragsverwaltung', 'Branchensoftware', 'Dateien & Tabellen'],
			},
			process: {
				id: 'ablauf',
				kicker: 'In 60 Minuten',
				title: 'Sie zeigen uns Ihre Arbeit. Wir schauen, was Sie abgeben können.',
				items: [
					{ title: 'Arbeitsweise verstehen', body: 'Wir klären, wo die Anfrage eintrifft, wer sie bearbeitet und welche Übergaben Zeit kosten.' },
					{ title: 'Programme und Daten ansehen', body: 'Wir finden die Informationen, die heute tatsächlich gebraucht werden – und was davon zugänglich ist.' },
					{ title: 'Aufgaben verteilen', body: 'Wir trennen vorbereitende Schritte von Entscheidungen, die bei Ihnen bleiben müssen.' },
					{ title: 'Nächsten Schritt festhalten', body: 'Nach der Stunde erhalten Sie eine kurze schriftliche Auswertung mit Chancen, Voraussetzungen und einer Empfehlung.' },
				],
			},
			review: {
				kicker: 'Nach dem Termin',
				title: 'Eine kurze Auswertung, mit der Sie weiterarbeiten können.',
				intro: 'Die Empfehlung bezieht sich auf Ihre Abläufe und auf Programme, die zu Ihrer aktuellen Arbeitsweise passen.',
				items: [
					'Konkrete Möglichkeiten für vorbereitende Büroarbeit',
					'Voraussetzungen bei Daten, Zugriffen und Einweisung',
					'Ein sinnvoller nächster Schritt für Ihren Betrieb',
				],
				decisionTitle: 'Die Entscheidung bleibt bei Ihnen.',
				decisionBody: 'Sie entscheiden, was fachlich machbar ist, welcher Umfang passt und wie es weitergeht.',
			},
			faq: {
				kicker: 'Fragen zur Analyse',
				items: [
					{ question: 'Müssen wir neue Software kaufen?', answer: 'Nein. Wir beginnen mit Ihren aktuellen Arbeitsweisen, Programmen und Daten. Die Empfehlung soll zu Ihrem Alltag passen.' },
					{ question: 'Brauchen wir einen fertigen Automatisierungsplan?', answer: 'Nein. Ein konkretes Beispiel reicht. Wir arbeiten heraus, welche Vorbereitung sinnvoll ist und welche Fragen offen bleiben.' },
					{ question: 'Findet der Termin online statt?', answer: 'Ja, online oder nach Absprache vor Ort. Die passende Form klären wir bei Ihrer Anfrage.' },
				],
			},
			finalCta: {
				title: 'Bringen Sie einen echten Vorgang mit.',
				body: 'Schreiben Sie uns kurz, welche Büroarbeit Sie anschauen möchten. Wir melden uns mit den nächsten Fragen.',
				button: { label: 'Analyse anfragen', href: contactHref },
			},
		},
		en: {
		metaTitle: 'AI Potential Analysis for Office Work | Vibeperform',
		metaDescription:
			'In one hour, we use a real inquiry or quote process to identify which office work an assistant can prepare and when it should ask you.',
			nav: homeContent.en.nav,
			hero: {
			kicker: 'AI potential analysis · one hour',
			duration: '60 minutes',
			title: 'Which office work do you really need to do yourself?',
			intro:
				'We take a real workflow from your business and identify what an assistant could prepare with your briefing. Online or on site by arrangement.',
			primaryCta: { label: 'Request an analysis', href: contactHrefEn },
			secondaryCta: { label: 'How the hour works', href: '#process' },
			asideLabel: 'The decision point',
			asideTitle: 'A good assistant does not need a master in your craft.',
			asideBody: 'It needs to know which tasks it can take on – and when to ask you.',
			asideFootnote: 'AI prepares. You decide.',
		},
		workflow: {
			kicker: 'A concrete look at daily work',
			title: 'We start with a typical inquiry or quote.',
				intro:
					'You show us how one case moves through your business today. That makes the useful preparation visible.',
			steps: [
				{ number: '01', title: 'Show the case', body: 'A customer inquiry, a follow-up, or a quote draft.' },
				{ number: '02', title: 'Find the data', body: 'Where do emails, measurements, photos, prices, and past answers live?' },
				{ number: '03', title: 'Hand off tasks', body: 'What could an assistant compile, check, or draft with a briefing?' },
			],
			programsLabel: 'We look at your existing programs',
			programs: ['Email', 'Microsoft 365 / Google Workspace', 'Customer or job management', 'Trade software', 'Files & spreadsheets'],
		},
		process: {
			id: 'process',
			kicker: 'In 60 minutes',
			title: 'You show us your work. We look at what you can hand off.',
			items: [
				{ title: 'Understand the workflow', body: 'We map where the inquiry arrives, who handles it, and where handovers cost time.' },
				{ title: 'Review programs and data', body: 'We find the information actually needed today and what can be accessed.' },
				{ title: 'Decide what to hand off', body: 'We separate preparation from decisions that must stay with you.' },
				{ title: 'Record the next step', body: 'After the hour, you receive a short written evaluation with opportunities, prerequisites, and a recommendation.' },
			],
		},
		review: {
			kicker: 'After the appointment',
			title: 'A short evaluation you can act on.',
			intro: 'The recommendation is grounded in your workflows and programs that fit your current way of working.',
			items: ['Concrete opportunities for preparatory office work', 'Prerequisites around data, access, and briefing', 'A sensible next step for your business'],
			decisionTitle: 'The decision stays with you.',
			decisionBody: 'You decide what is feasible, what scope fits, and what happens next.',
		},
		faq: {
			kicker: 'Questions about the analysis',
			items: [
				{ question: 'Do we need to buy new software?', answer: 'No. We start with your current workflows, software, and data. The recommendation should fit your day to day work.' },
				{ question: 'Do we need a finished automation plan?', answer: 'No. One concrete example is enough. We identify useful preparation and the questions that remain.' },
				{ question: 'Does the appointment happen online?', answer: 'Yes, online or on site by arrangement. We clarify the right format when you inquire.' },
			],
		},
		finalCta: {
			title: 'Bring one real case.',
			body: 'Tell us briefly which office work you want to look at. We will reply with the next questions.',
			button: { label: 'Request an analysis', href: contactHrefEn },
		},
	},
} as const;

export type PotentialAnalysisLocale = keyof typeof potentialAnalysisContent;
export type PotentialAnalysisContent = (typeof potentialAnalysisContent)[PotentialAnalysisLocale];
