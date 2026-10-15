export interface KnowledgePostFrontmatter { title: string; kicker: string; date: string; readTime: string; excerpt: string; category?: 'website' | 'ai'; guideOrder?: number; coverImage?: string; coverImageAvifSrcset?: string; coverImageWebpSrcset?: string; coverImageFallback?: string; coverImageAlt?: string; coverImageDisclosure?: string | false; coverImageWidth?: number; coverImageHeight?: number; }

export function groupKnowledgePosts<T>(posts: T[], metadata: (post: T) => Pick<KnowledgePostFrontmatter, 'date' | 'category'>) {
  const [featured, ...remaining] = [...posts].sort((a, b) => Date.parse(metadata(b).date) - Date.parse(metadata(a).date));
  return {
    featured,
    website: remaining.filter(post => metadata(post).category === 'website'),
    supplemental: remaining.filter(post => metadata(post).category !== 'website'),
  };
}

export const knowledgeContent = {
  de: {
    title: 'Wissen für Ihren digitalen Firmenauftritt | VibePerform',
    headline: 'Website-Ratgeber:', emphasis: 'Webdesign, SEO & Betreuung.',
    intro: 'Was braucht eine gute Website? Wie wird Ihr Unternehmen gefunden? Und wie bleibt Ihr Auftritt aktuell? Hier finden Sie Orientierung zu unseren Leistungen und Einblicke in digitale Technologien.',
    browse: 'Zu den Beiträgen',
    articlesKicker: 'Praktische Leitfäden', articlesTitle: 'Website & Firmenprofil', articlesEmphasis: 'klar planen.',
    articlesIntro: 'Welche Inhalte braucht Ihr Betrieb? Was gehört zur Betreuung? Und wie passen Website und Google-Unternehmensprofil zusammen? Diese Leitfäden helfen bei den nächsten Entscheidungen.',
    supplementaryKicker: 'Ergänzende Perspektiven', supplementaryTitle: 'KI & Automatisierung', supplementaryEmphasis: 'einordnen.', supplementaryIntro: 'Ergänzend zum Firmenauftritt: Grundlagen zu KI, Daten und digitalen Arbeitsabläufen mit konkreten Grenzen und menschlichen Prüfschritten.',
    latest: 'Neuester Beitrag', read: 'Beitrag lesen', more: 'Weitere Beiträge',
    contact: { title: 'Was bedeutet das', emphasis: 'für Ihren Auftritt?', body: 'Wir schauen gemeinsam auf Ihre Website und Ihre Ziele. Im Erstgespräch klären wir, wo Sie stehen und welche nächsten Schritte zu Ihrem Unternehmen passen.' },
  },
  en: {
    title: 'Insights for your online presence | VibePerform',
    headline: 'Website guides:', emphasis: 'Web design, SEO & support.',
    intro: 'What makes a good website? How do people find your business? And how does your presence stay current? Explore our services and insights into digital technology.',
    browse: 'Explore the articles',
    articlesKicker: 'Practical guides', articlesTitle: 'Website & business profile', articlesEmphasis: 'plan with clarity.',
    articlesIntro: 'What content does your business need? What belongs in ongoing support? How do your website and Google Business Profile fit together? These guides help you prepare the next decision.',
    supplementaryKicker: 'Additional perspectives', supplementaryTitle: 'AI & automation', supplementaryEmphasis: 'in context.', supplementaryIntro: 'Alongside your online presence: foundations of AI, data and digital workflows, with clear boundaries and human review.',
    latest: 'Latest article', read: 'Read article', more: 'More articles',
    contact: { title: 'What does this mean', emphasis: 'for your presence?', body: 'Let’s look at your website and your goals together. In an initial conversation, we explore where you stand and which next steps fit your business.' },
  },
};
