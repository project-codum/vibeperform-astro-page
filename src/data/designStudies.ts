import type { Locale } from '../lib/siteMetadata';

export function designStudies(locale: Locale) {
  const de = locale === 'de';
  return [
    { id: "01-sauerteig", trade: de ? "Bäckerei" : "Bakery", detail: de ? "Sauerteig und Kruste" : "Sourdough and crust", imageTitle: de ? "Webseite für eine Bäckerei" : "Bakery website design" },
    { id: "02-metallbau", trade: de ? "Metallbau" : "Metal fabrication", detail: de ? "Vom Plan zum Teil" : "From drawing to finished part", imageTitle: de ? "Webseite für einen Metallbaubetrieb" : "Metal fabrication website design" },
    { id: "03-floristik", trade: de ? "Floristik" : "Floristry", detail: de ? "Blüten nach Gefühl" : "Flowers by feel", imageTitle: de ? "Webseite für einen Blumenladen" : "Floristry website design" },
    { id: "04-radwerkstatt", trade: de ? "Fahrradwerkstatt" : "Bike repair", detail: de ? "Was macht dein Rad?" : "How is your bike doing?", imageTitle: de ? "Webseite für eine Fahrradwerkstatt" : "Bike repair website design" },
    { id: "05-physio", trade: de ? "Physiotherapie" : "Physiotherapy", detail: de ? "Wieder leichter bewegen" : "Move with greater ease", imageTitle: de ? "Webseite für eine Physiotherapiepraxis" : "Physiotherapy website design" },
    { id: "06-zimmerei", trade: de ? "Zimmerei" : "Carpentry", detail: de ? "Mehr Raum aus Holz" : "More room, built in wood", imageTitle: de ? "Webseite für eine Zimmerei" : "Carpentry website design" },
    { id: "07-kaeserei", trade: de ? "Käserei" : "Cheesemaking", detail: de ? "Reife ist Geschmack" : "Flavor takes time", imageTitle: de ? "Webseite für eine Käserei" : "Cheesemaking website design" },
    { id: "08-elektrotechnik", trade: de ? "Elektrotechnik" : "Electrical engineering", detail: de ? "Laden, wo du parkst" : "Charge where you park", imageTitle: de ? "Webseite für einen Elektrotechnikbetrieb" : "Electrical engineering website design" },
    { id: "09-buchhandlung", trade: de ? "Buchhandlung" : "Bookshop", detail: de ? "Zwischen zwei Deckeln" : "Between two covers", imageTitle: de ? "Webseite für eine Buchhandlung" : "Bookshop website design" },
    { id: "10-hundepflege", trade: de ? "Hundepflege" : "Dog grooming", detail: de ? "Einmal fein, bitte!" : "A little grooming, please!", imageTitle: de ? "Webseite für einen Hundesalon" : "Dog grooming website design" },
    { id: "11-elektriker-v2", trade: de ? "Elektriker" : "Electrical contractor", detail: de ? "Fertig, wenn die Frühschicht kommt" : "Ready for the morning shift", imageTitle: de ? "Webseite für einen Elektrikerbetrieb" : "Electrical contractor website design" },
    { id: "12-dachdecker-v2", trade: de ? "Dachdeckerei" : "Roofing", detail: de ? "Der erste Regen" : "The first rain", imageTitle: de ? "Webseite für eine Dachdeckerei" : "Roofing website design" },
    { id: "13-schreiner", trade: de ? "Schreinerei" : "Joinery", detail: de ? "Einbauten für Wohnräume" : "Built-ins for living spaces", imageTitle: de ? "Webseite für eine Schreinerei" : "Joinery website design" },
    { id: "14-heizungsinstallateur", trade: de ? "Heizungsbau" : "Heating installation", detail: de ? "Wärmepumpen im Altbau" : "Heat pumps for older buildings", imageTitle: de ? "Webseite für einen Heizungsbaubetrieb" : "Heating installation website design" },
    { id: "15-maler-v2", trade: de ? "Malerbetrieb" : "Painting and decorating", detail: de ? "Licht auf Kalk" : "Light on lime", imageTitle: de ? "Webseite für einen Malerbetrieb" : "Painting and decorating website design" },
    { id: "16-fliesenleger", trade: de ? "Fliesenhandwerk" : "Tiling", detail: de ? "Großformatige Fliesen im Sanierungsbad" : "Large-format tiles for a bathroom renovation", imageTitle: de ? "Webseite für einen Fliesenlegerbetrieb" : "Tiling website design" },
    { id: "17-kammerjaeger-v2", trade: de ? "Schädlingsmanagement" : "Pest management", detail: de ? "Der Kontrollgang" : "The inspection round", imageTitle: de ? "Webseite für einen Schädlingsbekämpfungsbetrieb" : "Pest management website design" },
    { id: "18-berater", trade: de ? "Unternehmensberatung" : "Business consulting", detail: de ? "Unternehmerische Übergänge" : "Business transitions", imageTitle: de ? "Webseite für eine Unternehmensberatung" : "Business consulting website design" },
    { id: "19-psychologe", trade: de ? "Psychologische Praxis" : "Psychology practice", detail: de ? "Raum für Veränderung" : "Space for change", imageTitle: de ? "Webseite für eine psychologische Praxis" : "Psychology practice website design" },
  ];
}
