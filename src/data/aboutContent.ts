import { homeContent } from './homeContent';

export const aboutContent = {
	en: {
		nav: homeContent.en.nav,
		metaTitle: 'About Vibeperform',
		hero: {
			kicker: 'About us',
			title: 'We are partners and implementers, not just advisors.',
			intro:
				'As a small, tight-knit team we combine technology expertise, product thinking, and change capability, bringing in the right partners whenever needed.',
			promise: 'Our promise: solutions that work in practice, with real people, inside real processes.',
		},
		approach: {
			title: 'Our approach',
			intro: 'We believe AI only creates value once it is woven into everyday work.',
			steps: [
				'We dive into your processes and prioritize the levers with the most impact.',
				'We review the tools and solutions you already have in place.',
				'And we only build bespoke elements where it truly makes sense.',
			],
			closing: 'Our goal is to use technology that works, not because it is new, but because it helps.',
		},
		team: {
			title: 'Who we are',
			kicker: 'Team',
			members: [
				{
					name: 'Isabella Hoesch',
					image: {
						src: 'isabellahoesch.webp',
						alt: 'Portrait of Isabella Hoesch',
					},
					tagline: 'Systemic coach & AI product strategist',
					paragraphs: [
						'Isabella combines technological expertise with a deep understanding of learning and change.',
						'As the former founder of an AI coach for employee development, she knows how software helps people grow and what companies need to stay ahead.',
						'Her focus: lifelong learning, change management, and meaningful technology adoption.',
					],
				},
				{
					name: 'Marlon Dietrich',
					image: {
						src: 'marlondietrich.webp',
						alt: 'Portrait of Marlon Dietrich',
					},
					tagline: 'Software engineer & AI consultant',
					paragraphs: [
						'Marlon knows the reality of midsize-company processes first hand.',
						'As a certified RAG engineer and experienced developer he builds AI solutions that truly relieve teams: less manual work, more focus on value creation.',
						'His drive: make AI tangible and accessible for teams of any size. He builds AI solutions that relieve employees, automate routines, and free up time for what matters.',
					],
				},
			],
		},
		connect: {
			title: 'Want to see what AI could do in your business?',
			body: "Book a no-strings intro. We'll recommend the workshop that matches your team and goals.",
			button: {
				label: 'Book a call',
				href: 'https://calendar.app.google/utFQgw33PwJTiDk56',
			},
		},
	},
	de: {
		nav: homeContent.de.nav,
		metaTitle: 'Ueber Vibeperform',
		hero: {
			kicker: 'Über uns',
			title: 'Wir sind Partner und Umsetzer, nicht nur Berater.',
			intro:
				'Als kleines, eingespieltes Team verbinden wir Technologie-Expertise, Produktdenken und Change-Kompetenz. Bei Bedarf holen wir die richtigen Partner:innen dazu.',
			promise: 'Unser Anspruch: Lösungen, die in der Praxis, mit echten Menschen und in realen Prozessen funktionieren.',
		},
		approach: {
			title: 'Unser Ansatz',
			intro: 'Wir glauben, dass KI erst dann Wert schafft, wenn sie in den Alltag integriert ist.',
			steps: [
				'Wir verstehen Prozesse und priorisieren die größten Hebel.',
				'Wir prüfen vorhandene Tools und Lösungen.',
				'Und wir setzen nur dort individuell um, wo es wirklich Sinn macht.',
			],
			closing: 'Unser Ziel: Technologie einsetzen, die wirkt. Nicht, weil sie neu ist, sondern weil sie hilft.',
		},
		team: {
			title: 'Wer wir sind',
			kicker: 'Team',
			members: [
				{
					name: 'Isabella Hoesch',
					image: {
						src: 'isabellahoesch.webp',
						alt: 'Portrait von Isabella Hoesch',
					},
					tagline: 'Systemischer Coach & KI-Produktstrategin',
					paragraphs: [
						'Isabella verbindet technologische Expertise mit einem tiefen Verständnis für Lernen und Veränderung.',
						'Als ehemalige Gründerin eines KI-Coaches für Mitarbeiterentwicklung weiß sie, wie Software Menschen wachsen lässt und was Unternehmen brauchen, um den Anschluss nicht zu verlieren.',
						'Ihr Fokus: Lifelong Learning, Change Management und sinnvolle Technologieeinsätze.',
					],
				},
				{
					name: 'Marlon Dietrich',
					image: {
						src: 'marlondietrich.webp',
						alt: 'Portrait von Marlon Dietrich',
					},
					tagline: 'Software Engineer & KI-Berater',
					paragraphs: [
						'Marlon kennt die Realität mittelständischer Prozesse aus erster Hand.',
						'Als zertifizierter RAG-Engineer und erfahrener Entwickler baut er KI-Lösungen, die echte Entlastung bringen: weniger manuelle Arbeit, mehr Fokus auf Wertschöpfung.',
						'Sein Antrieb: KI für Teams jeder Größe greifbar und zugänglich machen. Er entwickelt KI-Lösungen, die Mitarbeitende entlasten, Routinen automatisieren und Zeit für das Wesentliche schaffen.',
					],
				},
			],
		},
		connect: {
			title: 'Findet heraus, was bei euch möglich ist!',
			body:
				'Buche hier ein unverbindliches Kennenlernen. Wir empfehlen dir den richtigen Workshop für euer Team und Ziel.',
			button: {
				label: 'Gespräch buchen',
				href: 'https://calendar.app.google/utFQgw33PwJTiDk56',
			},
		},
	},
} as const;

export type AboutLocale = keyof typeof aboutContent;
export type AboutContent = (typeof aboutContent)[AboutLocale];
