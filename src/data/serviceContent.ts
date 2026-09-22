import { detailPaths } from './serviceDetails';
import type { Locale } from '../lib/siteMetadata';

export const servicePaths = {
  de: { overview: '/de/leistungen/', website: '/de/website-erstellen-lassen/' },
  en: { overview: '/en/services/', website: '/en/website-design/' },
} as const;

export const serviceContent = {
  de: {
    overview: {
      title: 'Leistungen für Ihren digitalen Firmenauftritt | VibePerform',
      description: 'Website-Erstellung, Relaunch, Betreuung, SEO, Google-Unternehmensprofile, Texte und Grafiken. Entdecken Sie die Leistungen von VibePerform.',
      kicker: 'Unsere Leistungen', headline: 'Ihr digitaler Auftritt.', emphasis: 'Als Ganzes gedacht.',
      intro: 'Eine Website, die Ihren Betrieb zeigt. Inhalte, die Ihre Leistungen erklären. Unternehmensprofile, die dazu passen. Wir gestalten Ihren Auftritt und entwickeln ihn mit Ihnen weiter.',
      action: 'Leistungen entdecken', sectionTitle: 'Was Ihr Auftritt braucht.', sectionEmphasis: 'Und wie wir helfen.',
      sectionIntro: 'Starten Sie dort, wo Ihr Unternehmen gerade steht. Unsere Leistungen lassen sich einzeln beauftragen und sinnvoll miteinander verbinden.',
      categories: ['Websites', 'Sichtbarkeit', 'Inhalte'],
      items: [
        { id: 'erstellung', label: '01 / Websites', title: 'Website erstellen lassen', body: 'Ihr Unternehmen bekommt einen Auftritt, der seine Leistungen verständlich zeigt und den Weg zur Anfrage einfach macht.', details: ['Seitenstruktur und Gestaltung', 'Texte, Bilder und Grafiken', 'Umsetzung für Mobilgeräte und Desktop'], link: 'Website-Erstellung entdecken', href: servicePaths.de.website },
        { id: 'relaunch', label: '02 / Websites', title: 'Website überarbeiten', body: 'Ihr Betrieb hat sich verändert. Wir prüfen, was an Ihrer Website noch passt, und bringen Struktur, Gestaltung und Inhalte auf den heutigen Stand.', details: ['Bestehenden Auftritt prüfen', 'Inhalte und Kontaktwege verbessern', 'Überarbeitung oder Neuaufbau planen'], link: 'Mehr zur Überarbeitung', href: detailPaths.de.redesign },
        { id: 'betreuung', label: '03 / Websites', title: 'Website betreuen & weiterentwickeln', body: 'Neue Leistungen, aktuelle Projekte und Hinweise aus Nutzungsdaten: Wir machen daraus die nächsten sinnvollen Verbesserungen für Ihre Website.', details: ['Inhalte aktuell halten', 'Such- und Nutzungsdaten einordnen', 'Anpassungen gemeinsam priorisieren'], link: 'Mehr zur Betreuung', href: detailPaths.de.support },
        { id: 'seo', label: '04 / Sichtbarkeit', title: 'Suchmaschinenoptimierung', body: 'Wir richten Struktur und Inhalte auf die Fragen Ihrer Kunden aus. Damit Ihr Angebot für Menschen und Suchmaschinen verständlich wird.', details: ['Suchbegriffe und Kundenfragen recherchieren', 'Seiten und Inhalte gezielt optimieren', 'Entwicklung anhand verfügbarer Daten prüfen'], link: 'Mehr zur Suchmaschinenoptimierung', href: detailPaths.de.seo },
        { id: 'google-profil', label: '05 / Sichtbarkeit', title: 'Google-Unternehmensprofil', body: 'Leistungen, Öffnungszeiten, Bilder und Kontaktdaten sollen zusammenpassen. Wir unterstützen bei der Einrichtung und Pflege Ihres Profils.', details: ['Bestehendes Profil und Zugriff prüfen', 'Unternehmensangaben mit der Website abstimmen', 'Änderungen im vereinbarten Umfang pflegen'], link: 'Mehr zum Unternehmensprofil', href: detailPaths.de.profile },
        { id: 'inhalte', label: '06 / Inhalte', title: 'Texte & Grafiken', body: 'Wir bringen auf den Punkt, was Ihren Betrieb ausmacht. Mit verständlichen Texten und einer Bildsprache, die Ihren Auftritt zusammenhält.', details: ['Leistungen verständlich beschreiben', 'Projekte und Referenzen aufbereiten', 'Bilder bearbeiten und Grafiken gestalten'], link: 'Mehr zu Texten und Grafiken', href: detailPaths.de.content },
      ],
      connected: { kicker: 'Von Anfang an verbunden', title: 'Ein guter Start.', emphasis: 'Ein Auftritt, der mitwächst.', intro: 'Struktur, Texte, Gestaltung und SEO greifen schon bei der Erstellung ineinander. Später entwickeln wir die Website und Ihre Unternehmensprofile im vereinbarten Umfang weiter.', body: 'Gemeinsam legen wir fest, welche Aufgaben zu Ihrem Projekt gehören und welche laufende Betreuung sinnvoll ist. So wissen Sie, was Sie bekommen und wer sich darum kümmert.', link: 'Gemeinsam den Einstieg finden' },
      additional: { title: 'KI-Beratung für den Arbeitsalltag', body: 'Ergänzend zum Firmenauftritt unterstützen wir Sie dabei, passende KI-Anwendungen für konkrete Aufgaben im Betrieb zu finden.', link: 'Zur KI-Beratung', href: '/de/ki-strategie/' },
    },
    website: {
      title: 'Website erstellen lassen für Ihr Unternehmen | VibePerform',
      description: 'Lassen Sie eine Unternehmenswebsite erstellen, die Ihre Leistungen klar zeigt. VibePerform verbindet Webdesign, Texte, SEO und anschließende Betreuung.',
      kicker: 'Website erstellen lassen', headline: 'Gute Arbeit verdient', emphasis: 'einen guten Auftritt.',
      intro: 'Zeigen Sie online, was Ihr Unternehmen ausmacht. Wir planen, gestalten und entwickeln Ihre Website – mit verständlichen Inhalten und einem klaren Weg zur Anfrage.',
      action: 'Website besprechen', secondary: 'So entsteht Ihre Website',
      mockLabel: 'Gestaltungsbeispiel', mockBrand: 'Ihr Unternehmen', mockNav: 'Leistungen · Über uns · Kontakt', mockTitle: 'Mit Können.', mockEmphasis: 'Mit Leidenschaft.', mockText: 'Wir zeigen, was Ihren Betrieb besonders macht.', mockButton: 'Unsere Arbeit entdecken', mockFooter: 'Klar gestaltet. Einfach zu erreichen.',
      problems: { kicker: 'Mehr als eine erste Visitenkarte', title: 'Besucher haben Fragen.', emphasis: 'Ihre Website gibt Antworten.', intro: 'Passt dieser Betrieb zu meinem Vorhaben? Was bietet er an? Wie erreiche ich ihn? Ihre neue Website hilft dabei, diese Fragen zu beantworten.', items: [
        { title: 'Leistungen auf den Punkt bringen', body: 'Eine klare Seitenstruktur zeigt, was Sie anbieten und für wen Ihre Arbeit passt.' },
        { title: 'Qualität sichtbar machen', body: 'Passende Gestaltung, echte Einblicke und verständliche Texte vermitteln, wie Ihr Unternehmen arbeitet.' },
        { title: 'Kontakt einfach machen', body: 'Interessenten finden den passenden nächsten Schritt – vom Anruf bis zur konkreten Projektanfrage.' },
      ] },
      scope: { kicker: 'Konzept, Gestaltung & Umsetzung', title: 'Alles, was Ihren Auftritt', emphasis: 'zusammenbringt.', intro: 'Wir stimmen die Leistungen auf Ihr Vorhaben ab. Diese Bausteine bilden die Grundlage unserer Website-Projekte.', items: [
        { title: 'Struktur & Seitenplan', body: 'Wir ordnen Leistungen, Zielgruppen und Inhalte zu einer verständlichen Website.' },
        { title: 'Webdesign', body: 'Farben, Schriften und Layouts passen zu Ihrem Unternehmen und funktionieren auf kleinen und großen Bildschirmen.' },
        { title: 'Texte & Medien', body: 'Wir formulieren Ihre Inhalte und bereiten vorhandene Bilder sowie vereinbarte Grafiken für die Website auf.' },
        { title: 'Suchmaschinenoptimierung', body: 'Relevante Suchbegriffe, klare Überschriften und passende Seitenbeschreibungen fließen in den Aufbau ein.' },
        { title: 'Technische Umsetzung', body: 'Wir setzen die vereinbarten Seiten und Kontaktwege um und prüfen Darstellung sowie Funktion.' },
        { title: 'Abstimmung & Start', body: 'Sie sehen Ihre Website vorab in einer Vorschau. Inhalte, Veröffentlichung und Übergabe stimmen wir gemeinsam ab.' },
      ] },
      process: { kicker: 'So entsteht Ihre Website', title: 'Von der ersten Idee', emphasis: 'bis zum fertigen Auftritt.', items: [
        { title: 'Verstehen & planen', body: 'Wir besprechen Ihren Betrieb, Ihre Kunden und Ihre Ziele. Daraus entsteht der Plan für Seiten, Inhalte und Umfang.' },
        { title: 'Gestalten & abstimmen', body: 'Wir entwickeln Texte und Gestaltung. Sie sehen den Entwurf, geben Feedback und prüfen die Angaben zu Ihrem Betrieb.' },
        { title: 'Umsetzen & starten', body: 'Wir bauen die Website, prüfen die vereinbarten Funktionen und bereiten den Start nach Ihrer Freigabe vor.' },
      ] },
      ongoing: { kicker: 'Nach dem Start geht es weiter', title: 'Ihr Unternehmen entwickelt sich.', emphasis: 'Ihre Website sollte das auch.', intro: 'Neue Angebote und Projekte gehören auf Ihre Website. Suchanfragen und verfügbare Nutzungsdaten zeigen, wo weitere Verbesserungen sinnvoll sein können.', body: 'Mit einer passenden Betreuung halten wir Ihren Auftritt aktuell und entwickeln ihn gemeinsam weiter. Aufgaben und Umfang vereinbaren wir vorab.', link: 'Mehr zur laufenden Betreuung' },
      trade: { title: 'Sie führen einen Handwerksbetrieb?', body: 'Für Handwerksbetriebe haben wir das Website-Angebot auf typische Fragen zu Aufträgen, Leistungen und Mitarbeitergewinnung zugeschnitten.', link: 'Zum Angebot für Handwerksbetriebe', href: '/de/websites-fuer-handwerksbetriebe/' },
      faq: { kicker: 'Gut zu wissen', title: 'Vor Ihrer', emphasis: 'neuen Website.', items: [
        { question: 'Was kostet eine neue Website?', answer: 'Webseiten starten meistens bei 1.800 Euro brutto. Der Preis hängt davon ab, wie viele zusätzliche Seiten hinzukommen.' },
        { question: 'Können Sie unsere bestehende Website überarbeiten?', answer: 'Ja. Wir prüfen die bestehende Website und ihre technische Grundlage. Anschließend besprechen wir, was sich übernehmen lässt und wo ein neuer Aufbau sinnvoll ist.' },
        { question: 'Müssen wir Texte und Bilder selbst liefern?', answer: 'Wir unterstützen bei Texten, Bildbearbeitung und Grafiken. Von Ihnen brauchen wir die Informationen über Ihren Betrieb und vorhandenes Material. Gemeinsam klären wir, welche Bilder noch fehlen und verwendet werden dürfen.' },
        { question: 'Wie lange dauert die Erstellung?', answer: 'Das hängt vom Umfang und den verfügbaren Inhalten ab. Nach der ersten Abstimmung planen wir die Schritte und Termine gemeinsam. Rechtzeitiges Feedback hilft, den vereinbarten Ablauf einzuhalten.' },
        { question: 'Kümmern Sie sich auch nach dem Start?', answer: 'Ja. Wir bieten laufende Betreuung und Weiterentwicklung an. Welche Inhalte, technischen Aufgaben und Optimierungen dazugehören, vereinbaren wir passend zu Ihrem Bedarf.' },
      ] },
      contact: { kicker: 'Ihre neue Website beginnt hier', title: 'Erzählen Sie uns', emphasis: 'von Ihrem Vorhaben.', body: 'Was bieten Sie an? Wen möchten Sie erreichen? Und was soll Ihre neue Website besser machen? Gemeinsam finden wir den passenden Einstieg.' },
    },
  },
  en: {
    overview: {
      title: 'Services for your online presence | VibePerform',
      description: 'Website design, redesign, ongoing support, SEO, Google Business Profiles, copy and graphics. Discover VibePerform’s services.',
      kicker: 'Our services', headline: 'Your online presence.', emphasis: 'Everything considered.',
      intro: 'A website that reflects your business. Content that explains your services. Business profiles that tell the same story. We create your presence and keep developing it with you.',
      action: 'Explore our services', sectionTitle: 'What your presence needs.', sectionEmphasis: 'How we can help.',
      sectionIntro: 'Start where your business is today. Our services can be commissioned individually and combined to meet your needs.', categories: ['Websites', 'Visibility', 'Content'],
      items: [
        { id: 'erstellung', label: '01 / Websites', title: 'Website design & development', body: 'Give your business a website that explains your services clearly and makes it easy for visitors to enquire.', details: ['Structure and design', 'Copy, images and graphics', 'Development for mobile and desktop'], link: 'Explore website design', href: servicePaths.en.website },
        { id: 'relaunch', label: '02 / Websites', title: 'Website redesign', body: 'Your business has changed. We review what still works and bring the structure, design and content up to date.', details: ['Review your existing website', 'Improve content and contact options', 'Plan an update or a rebuild'], link: 'Explore website redesign', href: detailPaths.en.redesign },
        { id: 'betreuung', label: '03 / Websites', title: 'Website support & development', body: 'New services, recent projects and insights from usage data: we turn them into practical next steps for your website.', details: ['Keep content current', 'Interpret search and usage data', 'Prioritise improvements together'], link: 'Explore ongoing support', href: detailPaths.en.support },
        { id: 'seo', label: '04 / Visibility', title: 'Search engine optimisation', body: 'We align structure and content with your customers’ questions, making your services understandable to people and search engines.', details: ['Research search terms and customer questions', 'Improve pages and content', 'Review progress using available data'], link: 'Explore SEO', href: detailPaths.en.seo },
        { id: 'google-profil', label: '05 / Visibility', title: 'Google Business Profile', body: 'Services, opening hours, images and contact details should be consistent. We help set up and maintain your profile.', details: ['Review your profile and access', 'Align business details with your website', 'Maintain information within the agreed scope'], link: 'Explore business profiles', href: detailPaths.en.profile },
        { id: 'inhalte', label: '06 / Content', title: 'Copy & graphics', body: 'We explain what makes your business different, with clear writing and a visual style that holds your presence together.', details: ['Explain your services clearly', 'Present projects and references', 'Edit images and design graphics'], link: 'Explore copy and graphics', href: detailPaths.en.content },
      ],
      connected: { kicker: 'Connected from the start', title: 'A strong beginning.', emphasis: 'Room to grow.', intro: 'Structure, copy, design and SEO work together from the beginning. Afterwards, we continue to develop your website and business profiles within the agreed scope.', body: 'Together, we define the tasks included in your project and the ongoing support that makes sense. You know what to expect and who takes care of it.', link: 'Find your starting point' },
      additional: { title: 'AI consulting for everyday work', body: 'Alongside your online presence, we help you identify useful AI applications for specific tasks in your business.', link: 'Explore AI consulting', href: '/en/ai-strategy/' },
    },
    website: {
      title: 'Website design & development for your business | VibePerform',
      description: 'A business website that explains your services clearly. VibePerform brings together web design, copy, SEO and ongoing support.',
      kicker: 'Website design & development', headline: 'Good work deserves', emphasis: 'a great presence.',
      intro: 'Show what makes your business different. We plan, design and develop your website with clear content and a simple route to an enquiry.',
      action: 'Discuss your website', secondary: 'How we build your website',
      mockLabel: 'Design example', mockBrand: 'Your business', mockNav: 'Services · About · Contact', mockTitle: 'With skill.', mockEmphasis: 'With passion.', mockText: 'Show what makes your business special.', mockButton: 'Discover our work', mockFooter: 'Clear design. Easy to reach.',
      problems: { kicker: 'More than a first impression', title: 'Visitors have questions.', emphasis: 'Your website answers them.', intro: 'Is this the right business for my project? What does it offer? How can I get in touch? Your new website helps answer these questions.', items: [
        { title: 'Explain your services', body: 'A clear page structure shows what you offer and who your work is for.' },
        { title: 'Make quality visible', body: 'Thoughtful design, real insights and clear copy communicate how your business works.' },
        { title: 'Make contact easy', body: 'Visitors find the right next step, from a phone call to a specific project enquiry.' },
      ] },
      scope: { kicker: 'Planning, design & development', title: 'Everything that brings', emphasis: 'your presence together.', intro: 'We tailor our services to your project. These elements form the basis of our website work.', items: [
        { title: 'Structure & page plan', body: 'We organise services, audiences and content into an understandable website.' },
        { title: 'Web design', body: 'Colours, typography and layouts reflect your business and work on small and large screens.' },
        { title: 'Copy & media', body: 'We write content and prepare existing images and agreed graphics for your website.' },
        { title: 'Search engine optimisation', body: 'Relevant search terms, clear headings and appropriate page descriptions inform the build.' },
        { title: 'Development', body: 'We build the agreed pages and contact options, then check layout and functionality.' },
        { title: 'Review & launch', body: 'You see a preview before launch. We agree content, publication and handover together.' },
      ] },
      process: { kicker: 'How your website takes shape', title: 'From the first idea', emphasis: 'to your new presence.', items: [
        { title: 'Understand & plan', body: 'We discuss your business, customers and goals, then plan the pages, content and scope.' },
        { title: 'Design & review', body: 'We develop the copy and design. You review the draft, share feedback and check the facts about your business.' },
        { title: 'Build & launch', body: 'We build your website, check the agreed functions and prepare to launch after your approval.' },
      ] },
      ongoing: { kicker: 'Launch is just the beginning', title: 'Your business keeps evolving.', emphasis: 'Your website should too.', intro: 'New services and projects belong on your website. Search queries and available usage data can highlight opportunities to improve it further.', body: 'With the right support, we keep your presence current and develop it with you. We agree tasks and scope in advance.', link: 'Explore ongoing support' },
      trade: { title: 'Do you run a trade business?', body: 'Our dedicated offer for trade businesses addresses common questions about enquiries, services and recruitment.', link: 'Explore websites for trade businesses', href: '/en/websites-for-trade-businesses/' },
      faq: { kicker: 'Good to know', title: 'Before your', emphasis: 'new website.', items: [
        { question: 'How much does a new website cost?', answer: 'Websites usually start at €1,800 including VAT. The price depends on how many additional pages are needed.' },
        { question: 'Can you redesign our existing website?', answer: 'Yes. We review your existing website and its technical foundations, then discuss what can be retained and where rebuilding makes sense.' },
        { question: 'Do we need to provide copy and images?', answer: 'We help with copy, image editing and graphics. We need information about your business and any existing materials. Together, we identify missing images and check which materials may be used.' },
        { question: 'How long does development take?', answer: 'That depends on the scope and available content. After our initial discussion, we plan the steps and timeline together. Timely feedback helps keep the agreed schedule on track.' },
        { question: 'Do you provide support after launch?', answer: 'Yes. We offer ongoing support and development. We agree the content, technical tasks and improvements based on your needs.' },
      ] },
      contact: { kicker: 'Your new website starts here', title: 'Tell us about', emphasis: 'your project.', body: 'What do you offer? Who do you want to reach? What should your new website do better? Together, we find the right starting point.' },
    },
  },
} as const;

export const serviceMenu = (locale: Locale) => {
  const de = locale === 'de';
  const paths = servicePaths[locale];
  const items = serviceContent[locale].overview.items;
  const itemLink = (index: number) => ({ label: items[index].title, description: items[index].details[0], href: items[index].href });
  return [
    { title: 'Websites', links: [itemLink(0), itemLink(1), itemLink(2)] },
    { title: de ? 'Sichtbarkeit & Inhalte' : 'Visibility & content', links: [itemLink(3), itemLink(4), itemLink(5)] },
    { title: de ? 'Überblick' : 'Overview', links: [
      { label: de ? 'Alle Leistungen' : 'All services', description: de ? 'Ihr Firmenauftritt aus einer Hand' : 'Your online presence in one place', href: paths.overview },
      { label: de ? 'Für Handwerksbetriebe' : 'For trade businesses', description: de ? 'Das Angebot für Ihren Betrieb' : 'An offer tailored to your trade', href: serviceContent[locale].website.trade.href },
      { label: de ? 'KI-Beratung' : 'AI consulting', description: de ? 'Ergänzende Hilfe im Arbeitsalltag' : 'Additional support for everyday work', href: serviceContent[locale].overview.additional.href },
    ] },
  ];
};
