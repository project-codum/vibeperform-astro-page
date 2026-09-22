export interface KnowledgePostFrontmatter { title: string; kicker: string; date: string; readTime: string; excerpt: string; coverImage: string; coverImageFallback?: string; coverImageAlt?: string; coverImageDisclosure?: string; coverImageWidth?: number; coverImageHeight?: number; }

export const knowledgeContent = {
  de: {
    title: 'Wissen für Ihren digitalen Firmenauftritt | VibePerform',
    kicker: 'Wissen & Einblicke', headline: 'Gute Entscheidungen', emphasis: 'beginnen mit Verständnis.',
    intro: 'Was braucht eine gute Website? Wie wird Ihr Unternehmen gefunden? Und wie bleibt Ihr Auftritt aktuell? Hier finden Sie Orientierung zu unseren Leistungen und Einblicke in digitale Technologien.',
    browse: 'Zu den Beiträgen', topicsKicker: 'Ihr Firmenauftritt', topicsTitle: 'Was beschäftigt', topicsEmphasis: 'Sie gerade?',
    topics: [
      { title: 'Eine Website planen', body: 'Struktur, Gestaltung und Inhalte: Was zu einem durchdachten Internetauftritt gehört.', label: 'Zur Website-Erstellung', href: '/de/website-erstellen-lassen/' },
      { title: 'Besser gefunden werden', body: 'Wie klare Inhalte und eine gute technische Grundlage die Auffindbarkeit unterstützen.', label: 'Zur Suchmaschinenoptimierung', href: '/de/suchmaschinenoptimierung/' },
      { title: 'Aktuell bleiben', body: 'Wie Ihre Website neue Leistungen, Projekte und Veränderungen im Betrieb aufnimmt.', label: 'Zur Website-Betreuung', href: '/de/website-betreuung/' },
    ],
    articlesKicker: 'Beiträge & Perspektiven', articlesTitle: 'KI & Automatisierung', articlesEmphasis: 'verstehen.',
    articlesIntro: 'Ergänzend zum digitalen Firmenauftritt beschäftigen wir uns mit KI und digitalen Arbeitsabläufen. Diese Beiträge geben Einblicke in die Grundlagen und den Einsatz im Unternehmen.',
    latest: 'Zuletzt veröffentlicht', read: 'Beitrag lesen', more: 'Weitere Beiträge',
    contact: { kicker: 'Vom Lesen ins Gespräch', title: 'Was bedeutet das', emphasis: 'für Ihren Auftritt?', body: 'Wir schauen gemeinsam auf Ihre Website und Ihre Ziele. Im Erstgespräch klären wir, wo Sie stehen und welche nächsten Schritte zu Ihrem Unternehmen passen.' },
  },
  en: {
    title: 'Insights for your online presence | VibePerform',
    kicker: 'Knowledge & insights', headline: 'Good decisions', emphasis: 'start with understanding.',
    intro: 'What makes a good website? How do people find your business? And how does your presence stay current? Explore our services and insights into digital technology.',
    browse: 'Explore the articles', topicsKicker: 'Your online presence', topicsTitle: 'What is on', topicsEmphasis: 'your mind?',
    topics: [
      { title: 'Planning a website', body: 'Structure, design and content: the elements of a considered online presence.', label: 'Explore website design', href: '/en/website-design/' },
      { title: 'Being easier to find', body: 'How clear content and sound technical foundations support discoverability.', label: 'Explore search optimisation', href: '/en/search-engine-optimisation/' },
      { title: 'Keeping things current', body: 'How your website reflects new services, projects and changes in your business.', label: 'Explore website support', href: '/en/website-support/' },
    ],
    articlesKicker: 'Articles & perspectives', articlesTitle: 'Understanding AI', articlesEmphasis: '& automation.',
    articlesIntro: 'Alongside online presence, we work with AI and digital workflows. These articles explore the foundations and their use in business.',
    latest: 'Most recently published', read: 'Read article', more: 'More articles',
    contact: { kicker: 'From reading to a conversation', title: 'What does this mean', emphasis: 'for your presence?', body: 'Let’s look at your website and your goals together. In an initial conversation, we explore where you stand and which next steps fit your business.' },
  },
};
