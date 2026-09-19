export const websiteStartingPrice: { amount: number; tax: 'net' | 'gross' } | null = null;
export function investmentContent(locale: 'de'|'en', kind: 'create'|'redesign'|'support') {
 const de=locale==='de';
 const price=websiteStartingPrice;
 const cost=price ? (de ? `Ab ${price.amount.toLocaleString('de-DE')} € ${price.tax==='net'?'netto zzgl. Umsatzsteuer':'inkl. Umsatzsteuer'}` : `From €${price.amount.toLocaleString('en-GB')} ${price.tax==='net'?'excluding VAT':'including VAT'}`) : (de?'Angebot nach Umfang':'Quoted to fit the scope');
 return {
 kicker:de?'Kosten & Umfang':'Cost & scope',
 title:de?'Sie wissen vorher,':'Know the scope', emphasis:de?'womit Sie planen.':'before you start.',
 label:kind==='create'?(de?'Website erstellen':'Website creation'):kind==='redesign'?(de?'Website überarbeiten':'Website redesign'):(de?'Betreuung & Weiterentwicklung':'Support & development'),
 price:kind==='create'?cost:(de?'Nach technischer Einschätzung':'After a technical review'),
 body:kind==='create'?(de?'Der konkrete Preis richtet sich nach Seiten, Inhalten und Funktionen. Vor dem Start erhalten Sie ein Angebot mit dem vereinbarten Umfang.':'The specific price depends on pages, content and features. Before we begin, you receive a proposal defining the agreed scope.'):kind==='redesign'?(de?'Wir prüfen zuerst das eingesetzte System, Hosting, verfügbare Zugänge und die gewünschten Änderungen. Daraus ergibt sich, was wir übernehmen können und welcher Aufwand nötig ist.':'We first review the system, hosting, available access and requested changes. This shows what can be reused and how much work is needed.'):(de?'Die eingesetzte Technologie, Hosting, Zugänge und der gewünschte Betreuungsumfang bestimmen den Aufwand. Aufgaben, Rhythmus und Kosten vereinbaren wir passend zu Ihrer Website.':'Technology, hosting, access and the required level of support determine the work involved. We agree tasks, frequency and costs to suit your website.'),
 note:de?'Website-Erstellung und laufende Betreuung weisen wir getrennt aus. Zusätzliche Inhalte, Funktionen und externe Betriebskosten klären wir im Angebot.':'Website creation and ongoing support are quoted separately. Additional content, features and external running costs are clarified in the proposal.',
 };
}
