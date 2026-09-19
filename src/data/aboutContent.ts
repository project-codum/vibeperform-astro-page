export const aboutPaths = { de: '/de/ueber-uns/', en: '/en/about-us/' } as const;

export const aboutContent = {
  de: {
    metaTitle: 'Marlon Dietrich & die Agentur | VibePerform',
    metaDescription: 'Lernen Sie Marlon Dietrich kennen: Ihr persönlicher Ansprechpartner für Websites und Unternehmensprofile, die mit Ihrem Unternehmen weiterwachsen.',
    hero: {
      kicker: 'Marlon Dietrich · Geschäftsführer von VibePerform',
      title: 'Ihre Webseite ist Ihre', emphasis: 'digitale Visitenkarte.',
      intro: 'Marlon Dietrich ist Geschäftsführer von VibePerform und Ihr erster direkter Ansprechpartner. Im Erstgespräch geht es um Sie und Ihren digitalen Firmenauftritt.',
      action: 'Erstgespräch vereinbaren', role: 'GF von VibePerform',
      caption: 'Persönlich verantwortlich. Von der ersten Idee an.',
    },
    vision: {
      kicker: 'Unsere Überzeugung', title: 'Ihr Unternehmen steht nicht still.', emphasis: 'Ihr Auftritt auch nicht.',
      body: 'Eine neue Leistung, ein neues Projekt, neue Fragen Ihrer Kunden: Ihr Unternehmen entwickelt sich ständig. Das sollte sich auch in Ihrem digitalen Auftritt zeigen.',
      mission: 'Deshalb verbinden wir Gestaltung, Inhalte, Suchmaschinenoptimierung und Technik. Wir erstellen Ihren Auftritt und entwickeln ihn auf Wunsch laufend weiter – mit Blick auf Ihren Betrieb, Kundenfragen und verfügbare Such- und Nutzungsdaten.',
      link: 'So bleibt Ihre Website aktuell', href: '/de/website-betreuung/',
    },
    journey: {
      kicker: 'Mein Weg zu VibePerform', title: 'Technik verstehen.', emphasis: 'Für Menschen gestalten.',
      paragraphs: [
        'Drei Jahre lang habe ich für ein mittelständisches Unternehmen Software entwickelt. Anschließend habe ich in verschiedenen Startups KI-Agenten und automatisierte Prozesse entwickelt und digitale Ideen in nutzbare Anwendungen übersetzt.',
        'Heute verbinde ich diese Erfahrung mit dem Einsatz von KI-Agenten, um Websites und den digitalen Firmenauftritt neu zu denken. Mit VibePerform bieten wir genau diesen Service. Wir helfen Ihnen, Ihr Unternehmen online klar zu präsentieren, sodass die richtigen Aufträge und die passenden Mitarbeiter zu Ihnen finden.',
      ],
    },
    future: {
      kicker: 'Mit Blick nach vorne', title: 'Für Menschen gemacht.', emphasis: 'Auch für KI verständlich.',
      body: 'Kunden können Unternehmen auch über KI-gestützte Suche entdecken. Das denken wir direkt mit, sodass Menschen und digitale Assistenten Ihr Angebot besser verstehen.',
      extra: 'Dazu gehören verständliche Wege zur Anfrage. Wo es zu Ihrem Vorhaben passt, können wir auch Schnittstellen für digitale Assistenten gesondert planen.',
      center: 'Ihr Unternehmen', website: 'Website', profile: 'Unternehmensprofil',
      foundation: 'Klare Leistungen · aktuelle Informationen', audience: ['Menschen', 'Suchmaschinen', 'KI-Assistenten'],
      link: 'Mehr über Auffindbarkeit', href: '/de/suchmaschinenoptimierung/',
    },
    contact: {
      kicker: 'Lernen wir uns kennen', title: 'Was soll Ihr Auftritt', emphasis: 'für Sie leisten?',
      body: 'Erzählen Sie mir von Ihrem Unternehmen und dem, was Sie verändern möchten. Im ersten Gespräch klären wir, wo Sie stehen und welcher nächste Schritt sinnvoll ist.',
      action: 'Gespräch mit Marlon vereinbaren', note: 'Sie sprechen direkt mit mir. Ich freue mich auf Ihr Vorhaben.',
    },
  },
  en: {
    metaTitle: 'Marlon Dietrich & the Agency | VibePerform',
    metaDescription: 'Meet Marlon Dietrich, your direct contact for websites and business profiles that keep growing with your company.',
    hero: {
      kicker: 'Marlon Dietrich · Managing Director of VibePerform',
      title: 'Your website is your', emphasis: 'digital business card.',
      intro: 'Marlon Dietrich is the Managing Director of VibePerform and your first point of contact. Our initial conversation is about you and your online presence.',
      action: 'Arrange an initial call', role: 'Managing Director of VibePerform',
      caption: 'Personally responsible. From the first idea onwards.',
    },
    vision: {
      kicker: 'What we believe', title: 'Your business keeps moving.', emphasis: 'Your website should, too.',
      body: 'A new service, a recent project, new questions from your customers: your business is always evolving. Your online presence should reflect that.',
      mission: 'That’s why we bring design, content, search engine optimisation and technology together. We build your presence and offer ongoing development informed by your business, customer questions and available search and usage data.',
      link: 'Keep your website up to date', href: '/en/website-support/',
    },
    journey: {
      kicker: 'My path to VibePerform', title: 'Understanding technology.', emphasis: 'Designing for people.',
      paragraphs: [
        'I spent three years developing software for a midsize company. I then worked with several startups, developing AI agents and automated processes and turning digital ideas into usable applications.',
        'Today, I combine that experience with AI agents to rethink websites and the way businesses present themselves online. This is exactly the service we offer through VibePerform. We help you present your business clearly online so that the right projects and the right people to join your team can find you.',
      ],
    },
    future: {
      kicker: 'Looking ahead', title: 'Made for people.', emphasis: 'Understandable to AI.',
      body: 'Customers can also discover businesses through AI-powered search. We consider this from the start so that people and digital assistants can better understand what you offer.',
      extra: 'That includes clear ways to enquire. Where it suits your project, we can also plan interfaces for digital assistants as a separate part of the work.',
      center: 'Your business', website: 'Website', profile: 'Business profile',
      foundation: 'Clear services · current information', audience: ['People', 'Search engines', 'AI assistants'],
      link: 'More about being found', href: '/en/search-engine-optimisation/',
    },
    contact: {
      kicker: 'Let’s meet', title: 'What should your online presence', emphasis: 'do for you?',
      body: 'Tell me about your business and what you would like to change. In our first conversation, we’ll look at where you are now and identify a sensible next step.',
      action: 'Arrange a call with Marlon', note: 'You’ll speak directly with me. I look forward to hearing about your project.',
    },
  },
} as const;
export type AboutLocale = keyof typeof aboutContent;
export type AboutContent = (typeof aboutContent)[AboutLocale];
