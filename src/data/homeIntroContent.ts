import { bookingUrl } from '../lib/siteMetadata';

// Shared navigation and hero copy for the completed agency homepage.
export const homeIntroContent = {
  de: {
    title: 'Webseiten & Unternehmensprofile | VibePerform',
    description: 'Wir erstellen und betreuen Webseiten und Unternehmensprofile. Mit SEO, Texten und Grafiken entwickeln wir Ihren digitalen Firmenauftritt laufend weiter.',
    audience: '',
    headline: 'Ihr Online-Auftritt.',
    emphasis: 'In professionellen Händen.',
    intro: ['Wir lernen Ihren Betrieb kennen und übernehmen Gestaltung, Inhalte und Betreuung. Damit Sie sich auf Ihre Arbeit konzentrieren können.'],
    primaryLabel: 'Uns kennenlernen',
    heroPrimaryLabel: 'Uns kennenlernen',
    primaryHref: bookingUrl,
    moreLabel: 'Unsere Arbeit ansehen',
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
    audience: '',
    headline: 'Your online presence.',
    emphasis: 'In professional hands.',
    intro: ['We get to know your business and take care of design, content and ongoing support. So you can focus on your work.'],
    primaryLabel: 'Get to know us',
    heroPrimaryLabel: 'Get to know us',
    primaryHref: bookingUrl,
    moreLabel: 'See our work',
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
