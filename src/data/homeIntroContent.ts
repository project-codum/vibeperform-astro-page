import { bookingUrl } from '../lib/siteMetadata';

// Shared navigation and hero copy for the completed agency homepage.
export const homeIntroContent = {
  de: {
    title: 'Websites & Unternehmensprofile | VibePerform',
    description: 'Wir erstellen und betreuen Websites und Unternehmensprofile. Mit SEO, Texten und Grafiken entwickeln wir Ihren digitalen Firmenauftritt laufend weiter.',
    headline: 'Webseiten erstellen.',
    emphasis: 'Google-Profile pflegen.',
    intro: ['Das machen wir für Betriebe, die einen professionellen Online-Auftritt wollen.', 'Ganz ohne eigenen Zeitaufwand.'],
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
    intro: ['We do this for businesses that want a professional online presence.', 'Without spending their own time on it.'],
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
