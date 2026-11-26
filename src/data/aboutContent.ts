import { homePageContent } from './homePageContent';

export const aboutInternetIntro = 'Das Internet verändert sich.';

export const aboutPaths = { de: '/de/ueber-uns/', en: '/en/about-us/' } as const;

const dePurposeHeading = {
  title: 'Spitzenmarketing ist',
  middle: 'keine Frage',
  emphasis: 'der Unternehmensgröße mehr.',
};

const dePurposeSegments = [
  {
    id: 'angebot',
    before: '',
    text: 'Dein Betrieb auf dem Qualitätsniveau großer, vergleichbarer Unternehmen.\nDas ist möglich und bezahlbar.',
  },
  {
    id: 'strategie',
    before: '\n\n',
    text: 'Gemeinsam entwickeln wir eine Online-Strategie für deinen Betrieb und ideal auf deine Arbeitsweise abgestimmt. Die Umsetzung und laufende Betreuung übernehme ich.',
  },
  {
    id: 'betreuung',
    before: ' ',
    text: 'Dein Auftritt bleibt immer aktuell. Aus deiner Arbeit, aktuellen Projekten und deiner Expertise werden Inhalte für die Webseite, das Unternehmensprofil und die sozialen Medien.',
  },
] as const;

export const aboutContent = {
  de: {
    metaTitle: 'Über VibePerform – Warum es unsere Agentur gibt | VibePerform',
    metaDescription: 'Marlon Dietrich erzählt, warum er VibePerform gegründet hat und wie KI kleinen und mittleren Unternehmen hilft, ihren Online-Auftritt weiterzuentwickeln.',
    guide: [
      { label: 'VibePerform', cues: [
        { start: 0, anchor: 'agency-title', text: 'VibePerform ist die moderne Webseitenagentur.' },
      ] },
      { label: 'Leitgedanke', cues: [
        {
          start: 3.82,
          anchor: 'purpose-title',
          text: Object.values(dePurposeHeading).join(' '),
          caption: { words: [4.55, 5.37, 5.57, 5.83, 6.15, 6.33, 7.23], end: 7.43 },
        },
        { start: 7.66, anchor: 'angebot', text: dePurposeSegments[0].text },
        { start: 13.66, anchor: 'strategie', text: dePurposeSegments[1].text },
        { start: 23.16, anchor: 'betreuung', text: dePurposeSegments[2].text },
      ] },
      { label: 'Kennenlernen', cues: [
        { start: 32.68, anchor: 'contact-title', text: 'Wenn du mit deinem Betrieb wachsen willst! Dann will ich mit dir arbeiten! Wann passt es dir?' },
      ] },
    ],
    hero: {
      title: 'Über VibePerform:', emphasis: 'Die moderne Webseitenagentur.',
      intro: 'Marlon Dietrich ist Inhaber von VibePerform und dein erster direkter Ansprechpartner. Im Erstgespräch geht es um dich und deinen digitalen Firmenauftritt.',
      action: 'Erstgespräch vereinbaren', role: 'Inhaber von VibePerform',
    },
    purpose: {
      ...dePurposeHeading,
      mission: dePurposeSegments.map(({ before, text }) => before + text).join(''),
      segments: dePurposeSegments,
    },
    contact: {
      title: 'Was willst du mit',
      emphasis: 'deinem Betrieb erreichen?',
      questions: ['Was kommt zu kurz?', 'Wo tust du dich schwer?', 'Wobei kann ich helfen?'],
      action: 'Gespräch mit Marlon vereinbaren',
    },
  },
  en: {
    metaTitle: 'About VibePerform – Why our agency exists | VibePerform',
    metaDescription: 'Marlon Dietrich shares why he founded VibePerform and how AI can help small and midsize businesses keep their online presence up to date.',
    guide: [
      { label: 'Mission', cues: [
        { start: 0, text: 'VibePerform exists so small businesses can afford an online presence of the same quality as major brands. To make that possible, we combine first-class design, precise writing and the professional use of AI.' },
      ] },
      { label: 'Vision', cues: [
        { start: 14.12, text: 'Our long-term vision is for every small business to have access to the skills of a first-class marketing team for its online sales, without having to build one of its own.' },
      ] },
    ],
    hero: {
      title: 'About VibePerform:', emphasis: 'the modern web agency.',
      intro: 'Marlon Dietrich is the owner of VibePerform and your first point of contact. Our initial conversation is about you and your online presence.',
      action: 'Arrange an initial call', role: 'Owner of VibePerform',
    },
    purpose: homePageContent.en.purpose,
    contact: { title: 'Where do you want to take', emphasis: 'your business online?', body: 'Tell me what’s changed in your business and what your customers can already see online. Together we’ll work out where to start.', action: 'Arrange a call with Marlon' },
  },
} as const;

export type AboutLocale = keyof typeof aboutContent;
