// Source: Marlon’s homepage feedback, 6 November 2026.
// Describes decisions and work, without claiming measured business results.
const de = {
  collaboration: {
    title: 'Sie kennen Ihren Betrieb.', emphasis: 'Wir machen Ihre Arbeit sichtbar.',
    items: [
      { title: 'Wir machen Vorschläge', body: 'Ein Beispiel: „Wie wäre ein Vorher-Nachher-Vergleich? Ein Foto, bevor die Arbeit passiert ist. Ein Foto aus dem gleichen Winkel, wenn die Arbeit gemacht wurde.“' },
      { title: 'Sie geben Input', body: 'Ganz egal ob WhatsApp-Nachricht, Sprachnachricht oder E-Mail mit Anhang: Wir verarbeiten, was Sie uns schicken.' },
      { title: 'Wir setzen um', body: 'Wir übernehmen die redaktionelle und gestalterische Arbeit. Sie entscheiden, ob die neuen Inhalte online kommen.' },
    ],
  },
} as const;


const en = {
  collaboration: {
    title: 'You know your business.', emphasis: 'We make your work visible.',
    items: [
      { title: 'We make suggestions', body: 'For example: “How about a before-and-after comparison? One photo before the work begins. Another from the same angle once the work is done.”' },
      { title: 'You share your input', body: 'Whether it’s a WhatsApp message, a voice note or an email with attachments, we work with whatever you send us.' },
      { title: 'We create', body: 'We take care of the editorial work and design. You decide whether the new content goes online.' },
    ],
  },
} as const;

export const homeStoryContent = { de, en } as const;
