// Source: Marlon’s homepage feedback, 6 November 2026.
// Describes decisions and work, without claiming measured business results.
const de = {
  caseStudy: {
    intro: 'HMS Loistl möchte große Mehrfamilienhäuser betreuen. Darauf haben wir Bildauswahl und Inhalte des Auftritts ausgerichtet.',
    items: [
      { title: 'Präziser erster Eindruck', paragraphs: [
        { label: 'Vorher', body: 'Stockfotos von Gebäuden außerhalb der Zielgruppe.' },
        { label: 'Nachher', body: 'Ein gepflegter Hauseingang – dort wird Hausbetreuung für Bewohner unmittelbar sichtbar.' },
      ] },
      { title: 'Den Kunden abholen', paragraphs: [
        { label: '', body: 'Eigene Seiten erklären jede Leistung und alle Servicegebiete. Interessenten finden die passende Betreuung und sehen, wo HMS Loistl tätig ist.' },
      ] },
    ],
  },
  collaboration: {
    title: 'Sie kennen Ihren Betrieb.', emphasis: 'Wir machen Ihre Arbeit sichtbar.',
    intro: 'Sie müssen nicht allein entscheiden, welche Bilder und Inhalte Ihren Betrieb gut zeigen. Wir schlagen passende Themen und Motive vor und machen daraus Ihren Online-Auftritt.',
    items: [
      { title: 'Wir machen Vorschläge', body: 'Gemeinsam klären wir, welche Leistungen und Kunden wichtig sind. Daraus leiten wir ab, welche Inhalte und Bilder Ihren Betrieb verständlich machen.' },
      { title: 'Sie liefern', body: 'Sie liefern fachliche Angaben und Bilder aus Ihrem Alltag. Bei HMS Loistl waren das zum Beispiel Vorher-Nachher-Aufnahmen, deren Motive wir zuvor gemeinsam besprochen haben.' },
      { title: 'Wir setzen um', body: 'Wir übernehmen Texte, Gestaltung und Umsetzung. Sie prüfen die Inhalte und geben den Auftritt frei. Danach halten wir ihn im vereinbarten Umfang aktuell – etwa mit neuen Projekten und Beiträgen im Unternehmensprofil.' },
    ],
  },
} as const;


const en = {
  caseStudy: {
    intro: 'HMS Loistl wants to look after large apartment buildings. We shaped the imagery and content around that goal.',
    items: [
      { title: 'A clearer first impression', paragraphs: [
        { label: 'Before', body: 'Stock photos of buildings outside the target market.' },
        { label: 'After', body: 'A well-kept entrance – where residents can see the quality of building care every day.' },
      ] },
      { title: 'Help customers find what they need', paragraphs: [
        { label: '', body: 'Dedicated pages explain each service and every service area. Potential customers can find the right support and see where HMS Loistl operates.' },
      ] },
    ],
  },
  collaboration: {
    title: 'You know your business.', emphasis: 'We make your work visible.',
    intro: 'You do not have to decide on the right images and content alone. We suggest suitable topics and photo subjects, then build your online presence around them.',
    items: [
      { title: 'We make suggestions', body: 'Together, we identify the services and customers that matter to your business. This guides the content and images we use to make your work easy to understand.' },
      { title: 'You supply', body: 'You provide details about your services and photos from your everyday work. For HMS Loistl, this included before-and-after photos based on subjects we had discussed together.' },
      { title: 'We create', body: 'We take care of the copy, design and development. You review the content and approve the site. We then keep it up to date within the agreed scope – for example, with new projects and posts on your business profile.' },
    ],
  },
} as const;

export const homeStoryContent = { de, en } as const;
