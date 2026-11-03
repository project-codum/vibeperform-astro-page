import { bookingUrl } from '../lib/siteMetadata';

// Shared navigation and hero copy for the completed agency homepage.
export const homeIntroContent = {
  de: {
    title: 'Webseiten & Unternehmensprofile | VibePerform',
    description: 'Wir erstellen und betreuen Webseiten und Unternehmensprofile. Mit SEO, Texten und Grafiken entwickeln wir Ihren digitalen Firmenauftritt laufend weiter.',
    audience: 'Für kleine Unternehmen, die etwas vorhaben.',
    headline: 'Dein Unternehmen verdient einen starken Online-Auftritt.',
    emphasis: 'Wir kümmern uns darum.',
    intro: ['Wir lernen deinen Betrieb kennen und zeigen, was ihn ausmacht.', 'Von der Beratung über Website und Inhalte bis zur laufenden Pflege – persönlich und mit einem festen Ansprechpartner.'],
    primaryLabel: 'Lass uns deinen Betrieb kennenlernen',
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
    audience: 'For small businesses with ambition.',
    headline: 'Your business deserves a strong online presence.',
    emphasis: 'We take care of it.',
    intro: ['We get to know your business and show what makes it special.', 'From advice to your website, content and ongoing care – with one dedicated point of contact.'],
    primaryLabel: 'Let’s get to know your business',
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
