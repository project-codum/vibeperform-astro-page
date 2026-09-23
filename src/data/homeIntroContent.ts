import { bookingUrl } from '../lib/siteMetadata';

// Shared navigation and hero copy for the completed agency homepage.
export const homeIntroContent = {
  de: {
    title: 'Websites & Unternehmensprofile | VibePerform',
    description: 'Wir erstellen und betreuen Websites und Unternehmensprofile. Mit SEO, Texten und Grafiken entwickeln wir Ihren digitalen Firmenauftritt laufend weiter.',
    headline: ['Ihr Unternehmen', 'entwickelt sich.'],
    emphasis: 'Ihre Webseite sollte das auch.',
    intro: ['Wir gestalten Ihren digitalen Firmenauftritt.', 'Und entwickeln ihn mit Ihnen weiter.'],
    audience: 'Websites & Unternehmensprofile',
    primaryLabel: 'Vorhaben besprechen',
    primaryHref: bookingUrl,
    moreLabel: 'Mehr erfahren',
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
    headline: ['Your business', 'keeps evolving.'],
    emphasis: 'Your website should too.',
    intro: ['We design your online presence.', 'And keep developing it with you.'],
    audience: 'Websites & business profiles',
    primaryLabel: 'Discuss your project',
    primaryHref: bookingUrl,
    moreLabel: 'Learn more',
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
