export const aboutPaths = { de: '/de/ueber-uns/', en: '/en/about-us/' } as const;

export const aboutContent = {
  de: {
    metaTitle: 'Über VibePerform – Warum es unsere Agentur gibt | VibePerform',
    metaDescription: 'Marlon Dietrich erzählt, warum er VibePerform gegründet hat und wie KI kleinen und mittleren Unternehmen hilft, ihren Online-Auftritt weiterzuentwickeln.',
    hero: {
      title: 'Über VibePerform:', emphasis: 'Die moderne Webseitenagentur.',
      intro: 'Marlon Dietrich ist Inhaber von VibePerform und Ihr erster direkter Ansprechpartner. Im Erstgespräch geht es um Sie und Ihren digitalen Firmenauftritt.',
      action: 'Erstgespräch vereinbaren', role: 'Inhaber von VibePerform',
      foot: 'Unsere Überzeugung',
    },
    voiceNote: 'Audioguide mit meiner KI-Stimme',
    chapters: [
      {
        id: 'ueberzeugung', audio: 'de-marlon-brief-1', name: 'Zeit',
        title: 'Wann war deine Webseite zuletzt', emphasis: 'so weit wie dein Betrieb?',
        duration: 29.26, paragraphStarts: [3.78, 11.08, 22.3],
        paragraphs: [
          'Denk an den letzten Auftrag, von dem du gerne mehr hättest. Was würde jemand darüber erfahren, der heute nach deinem Betrieb sucht?',
          'Stell dir vor, dein letzter Projektbericht ist von 2022. Seitdem habt ihr neue Aufgaben übernommen und bessere Lösungen gefunden. Wer heute auf die Seite kommt, sieht noch den Betrieb von damals.',
          'Heute kann ein Kunde auch ChatGPT bitten, mehrere Betriebe für ihn zu vergleichen. Was findet die KI dann über dich?',
        ],
      },
      {
        id: 'ki-suche', audio: 'de-marlon-brief-2', name: 'Lesbar für KI',
        title: 'Eine KI kann viele Seiten lesen.', emphasis: 'Was nur du weißt, fehlt ihr trotzdem.',
        duration: 26.38, paragraphStarts: [4.58, 11.56, 12.94],
        paragraphs: [
          'Was übernehmt ihr inzwischen? Wo arbeitet ihr? Welcher Auftrag zeigt, dass ihr das könnt?',
          'Und wo steht das?',
          'Du kennst die Antworten. Bei einer Websuche kann ChatGPT nach passenden Seiten suchen und Angaben daraus zusammenführen. Ein Projektbericht, der den Ort, die Aufgabe und eure Lösung nennt, macht deine Erfahrung auffindbar.',
        ],
        researchNote: 'OpenAI berichtete im September 2025 von 700 Millionen Menschen, die ChatGPT wöchentlich nutzten. In der Nutzungsstudie entfiel etwa die Hälfte der Nachrichten auf Fragen nach Auskunft oder Rat. Dieser Anteil war im Untersuchungszeitraum gestiegen.',
        sources: [
          { label: 'Studie zur Nutzung von ChatGPT', href: 'https://openai.com/index/how-people-are-using-chatgpt/' },
          { label: 'Wie ChatGPT im Web sucht', href: 'https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt' },
          { label: 'Wie Deep Research Quellen auswertet', href: 'https://openai.com/index/introducing-deep-research/' },
        ],
      },
      {
        id: 'unsere-arbeit', audio: 'de-marlon-brief-3', name: 'Visueller für Menschen',
        title: 'Welches Foto würdest du', emphasis: 'einem Kunden zeigen?',
        duration: 26.46, paragraphStarts: [3.14, 12.28, 17.26],
        paragraphs: [
          'Stell dir vor, ihr steht gemeinsam vor dieser Fensterbank aus Eiche. Auf dem Foto sieht man den ganzen Einbau. Im Gespräch würdest du auf eine einzige Stelle zeigen.',
          'Schau mal oben an die Kante. Das Holz schließt über die ganze Breite mit der Decke ab.',
          'Wer so ein Detail einmal gesehen hat, versteht, was du mit passgenau meinst. Genau diesen Blick auf deine Arbeit verdient auch jemand, der dich erst online kennenlernt.',
        ],
      },
      {
        id: 'unsere-vision', audio: 'de-marlon-brief-4', name: 'Warum VibePerform',
        title: 'Du weißt, worauf du stolz bist.', emphasis: 'Das soll man sehen können.',
        duration: 33.1, paragraphStarts: [3.7, 10.68, 28.46],
        paragraphs: [
          'Ich habe VibePerform gegründet, weil auch ein Betrieb mit fünf Leuten seine Arbeit so gut zeigen können soll wie eine große Marke.',
          'Du schickst uns das Foto und erzählst kurz, worauf es ankam. Wir fragen nach dem Detail. Mit KI können wir deine Notizen schneller zu einem Entwurf ausarbeiten. Wir wählen das Bild, schreiben den Text und prüfen die Angaben mit dir. Nach deiner Freigabe veröffentlichen wir das Projekt auf deiner Webseite und bereiten es für deine Kanäle auf.',
          'Erzähl mir von dem Auftrag, von dem du gerne mehr hättest.',
        ],
      },
    ],
    controls: { label: 'Audioguide', play: 'Anhören', pause: 'Pause', resume: 'Weiter', replay: 'Noch einmal', mute: 'Ton aus', unmute: 'Ton an', index: 'Kapitel auswählen', error: 'Der Ton konnte nicht geladen werden. Du kannst alle Kapitel auf dieser Seite lesen.' },
    contact: { title: 'Wo soll dein Betrieb', emphasis: 'online hin?', body: 'Erzähl mir, was sich in deinem Betrieb verändert hat und was deine Kunden davon schon online sehen. Gemeinsam schauen wir, womit wir anfangen können.', action: 'Gespräch mit Marlon vereinbaren' },
  },
  en: {
    metaTitle: 'About VibePerform – Why our agency exists | VibePerform',
    metaDescription: 'Marlon Dietrich shares why he founded VibePerform and how AI can help small and midsize businesses keep their online presence up to date.',
    hero: {
      title: 'About VibePerform:', emphasis: 'the modern web agency.',
      intro: 'Marlon Dietrich is the owner of VibePerform and your first point of contact. Our initial conversation is about you and your online presence.',
      action: 'Arrange an initial call', role: 'Owner of VibePerform',
      foot: 'What we believe',
    },
    voiceNote: 'Audio guide in my AI-generated voice',
    chapters: [
      {
        id: 'ueberzeugung', audio: 'en-marlon-brief-1', name: 'Then and now',
        title: 'When did your website last', emphasis: 'catch up with your business?',
        duration: 28.7, paragraphStarts: [3.06, 10.04, 21.34],
        paragraphs: [
          'Think of the last job you would love to do again. What would someone find out about it if they looked up your business today?',
          'Imagine the latest project on your website dates back to 2022. Since then you have taken on different jobs and found better ways to do them. A visitor today still sees the business you ran back then.',
          'Today a customer can also ask ChatGPT to compare local businesses. What can it find out about yours?',
        ],
      },
      {
        id: 'ai-search', audio: 'en-marlon-brief-2', name: 'Readable for AI',
        title: 'AI can read a lot of pages.', emphasis: 'It still needs what only you know.',
        duration: 24.18, paragraphStarts: [4.98, 10.76, 12.94],
        paragraphs: [
          'What work do you take on now? Where do you work? Which project shows what you can do?',
          'And where is that written down?',
          'You know the answers. When ChatGPT searches the web, it can look for relevant pages and bring the details together. A project story that names the place, the task and your solution gives it a source for your experience.',
        ],
        researchNote: 'In September 2025, OpenAI reported that 700 million people were using ChatGPT weekly. In its usage study, about half of messages asked for information or advice. That share grew over the period studied.',
        sources: [
          { label: 'Study of how people use ChatGPT', href: 'https://openai.com/index/how-people-are-using-chatgpt/' },
          { label: 'How ChatGPT searches the web', href: 'https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt' },
          { label: 'How deep research uses sources', href: 'https://openai.com/index/introducing-deep-research/' },
        ],
      },
      {
        id: 'our-work', audio: 'en-marlon-brief-3', name: 'A closer look',
        title: 'Which photo would you show', emphasis: 'a customer in person?',
        duration: 24.46, paragraphStarts: [2.9, 11.96, 16.46],
        paragraphs: [
          'Imagine standing with a customer in front of this oak window seat. The photo shows the whole installation. In person you would point to one small detail.',
          'Look at the top edge. The timber meets the ceiling all the way across.',
          'Once someone sees that detail, they understand what you mean by a precise fit. Someone discovering you online deserves that same close look at your work.',
        ],
      },
      {
        id: 'our-vision', audio: 'en-marlon-brief-4', name: 'Why VibePerform',
        title: 'You know what makes you proud.', emphasis: 'Your customers should see it too.',
        duration: 29.26, paragraphStarts: [3.78, 10.44, 25.98],
        paragraphs: [
          'I started VibePerform because a business with five people should be able to show its work with the same care as a major brand.',
          'You send us a photo and tell us what mattered on the job. We ask about the detail. AI helps us turn your notes into a draft more quickly. We choose the image, write the story and check the facts with you. Once you approve it, we publish the project on your website and adapt it for your channels.',
          'When we meet, tell me about the job you would love to do again.',
        ],
      },
    ],
    controls: { label: 'Audio guide', play: 'Listen', pause: 'Pause', resume: 'Resume', replay: 'Play again', mute: 'Mute', unmute: 'Unmute', index: 'Choose a chapter', error: 'The audio could not be loaded. You can read every chapter on this page.' },
    contact: { title: 'Where do you want to take', emphasis: 'your business online?', body: 'Tell me what’s changed in your business and what your customers can already see online. Together we’ll work out where to start.', action: 'Arrange a call with Marlon' },
  },
} as const;

export type AboutLocale = keyof typeof aboutContent;
