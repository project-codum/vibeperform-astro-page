import { bookingUrl } from '../lib/siteMetadata';

// Shared navigation and hero copy for the completed agency homepage.
export const homeIntroContent = {
  de: {
    title: 'Websites & Unternehmensprofile | VibePerform',
    description: 'Wir erstellen und betreuen Websites und Unternehmensprofile. Mit SEO, Texten und Grafiken entwickeln wir Ihren digitalen Firmenauftritt laufend weiter.',
    headline: 'Websites erstellen.',
    emphasis: 'Google-Profile pflegen.',
    intro: ['Für Betriebe, die ihre Leistungen online verständlich zeigen', 'und ihren Auftritt nicht selbst betreuen möchten.'],
    bookingNote: '45 Minuten per Google Meet mit Marlon. Wir besprechen Ihren Betrieb, Ihre Ziele und den passenden nächsten Schritt.',
    primaryLabel: 'Erstgespräch buchen',
    primaryHref: bookingUrl,
    moreLabel: 'Leistungen ansehen',
    homeLabel: 'VibePerform – Startseite',
    navLabel: 'Hauptnavigation',
    menuLabel: 'Menü',
    closeLabel: 'Schließen',
    languageLabel: 'EN',
    languageAria: 'Sprache zu Englisch wechseln',
    skipLabel: 'Zum Inhalt',
    pauseLabel: 'Animation pausieren',
    resumeLabel: 'Animation fortsetzen',
  },
  en: {
    title: 'Websites & Business Profiles | VibePerform',
    description: 'We create and maintain websites and business profiles. With SEO, copy and graphics, we keep developing your online presence.',
    headline: 'Websites built.',
    emphasis: 'Google profiles maintained.',
    intro: ['For businesses that want to explain their services clearly online', 'and leave the upkeep of their presence to us.'],
    bookingNote: '45 minutes on Google Meet with Marlon. We discuss your business, your goals and the right next step.',
    primaryLabel: 'Book an intro call',
    primaryHref: bookingUrl,
    moreLabel: 'Explore services',
    homeLabel: 'VibePerform – Home',
    navLabel: 'Main navigation',
    menuLabel: 'Menu',
    closeLabel: 'Close',
    languageLabel: 'DE',
    languageAria: 'Switch language to German',
    skipLabel: 'Skip to content',
    pauseLabel: 'Pause animation',
    resumeLabel: 'Resume animation',
  },
} as const;

export type HomeIntroContent = (typeof homeIntroContent)['de' | 'en'];
