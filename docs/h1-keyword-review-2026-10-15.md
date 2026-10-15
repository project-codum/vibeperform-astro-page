# H1-Prüfung VibePerform · 15.10.2026

Die Hauptüberschriften nennen jetzt das jeweilige Seitenthema und die dafür relevanten Begriffe. Die Auswahl folgt dem vorhandenen Inhalt und Angebot; es wurden keine Suchvolumina oder Rankinggewinne gemessen.

## Stand

- Ausgangspunkt: aktueller `origin/master`, Commit `6c61ff1`.
- Umsetzung: lokaler Branch `codex/h1-keywords-2026-10-15` im Website-Worktree dieses Pakets.
- 61 erzeugte HTML-Routen vollständig erfasst: 53 Inhalts-/Fehlerseiten und 8 Weiterleitungen.
- 33 HTML-Routen mit geänderter H1: 30 reguläre DE-/EN-Seiten, zwei bestehende V2-Vorschauen und die Root-Kopie der deutschen Startseite.
- 20 Inhalts-/Fehlerseiten geprüft und beibehalten: 15 Blogartikel, vier Rechtstextseiten und 404.
- Kein Push, PR, Merge oder Deployment. Die öffentliche Website enthält diese Änderungen noch nicht.

## Änderungen

| Route | Bisherige H1 | Neue H1 |
|---|---|---|
| `/de/blog/` | Gute Entscheidungen beginnen mit Verständnis. | Website-Ratgeber: Webdesign, SEO & Betreuung. |
| `/de/google-unternehmensprofil/` | Vor Ort bekannt. Online klar erkennbar. | Google-Unternehmensprofil. Vor Ort und online erkennbar. |
| `/de/` | Ihr Unternehmen entwickelt sich. Ihre Webseite sollte das auch. | Webseiten und Unternehmensprofile |
| `/de/ki-potenzialanalyse/` | Welche Büroarbeit müssen Sie wirklich selbst machen? | KI-Potenzialanalyse für Ihren Betrieb |
| `/de/ki-strategie/` | Weniger Rätsel um KI. Ein klarer nächster Schritt. | KI-Beratung & KI-Strategie. Ein klarer nächster Schritt. |
| `/de/leistungen/` | Ihr digitaler Auftritt. Als Ganzes gedacht. | Webdesign, SEO & Inhalte. Unsere Leistungen für Sie. |
| `/de/suchmaschinenoptimierung/` | Die richtigen Fragen. Die passenden Antworten. | SEO – Suchmaschinenoptimierung |
| `/de/texte-grafiken/` | Ihre Arbeit hat Substanz. Ihr Inhalt zeigt sie. | Texte & Grafiken. Für Ihren digitalen Auftritt. |
| `/de/ueber-uns/` | Ihre Webseite ist Ihre digitale Visitenkarte. | Über VibePerform: Die moderne Webseitenagentur. |
| `/de/website-betreuung/` | Ihr Unternehmen verändert sich. Wir halten den Auftritt aktuell. | Website-Betreuung. Wir halten Ihren Auftritt aktuell. |
| `/de/website-erstellen-lassen/` | Gute Arbeit verdient einen guten Auftritt. | Website erstellen lassen. Ein Auftritt für Ihr Unternehmen. |
| `/de/website-erstellen-lassen/v2/` | Gute Arbeit verdient einen guten Auftritt. | Website erstellen lassen. Ein Auftritt für Ihr Unternehmen. |
| `/de/website-ueberarbeiten/` | Ihr Betrieb ist weiter. Ihre Website auch? | Website überarbeiten. Passend zu Ihrem Betrieb. |
| `/de/websites-fuer-handwerksbetriebe/` | Ihre Arbeit überzeugt. Ihr Auftritt sollte das auch. | Websites für Handwerksbetriebe. Ein Auftritt, der überzeugt. |
| `/de/workshop/explore-workshop/` | Der strategische Explore Workshop | Explore Workshop für Ihre KI-Strategie |
| `/de/workshops/` | Unsere Workshops im Überblick | Unsere KI-Workshops im Überblick |
| `/en/about-us/` | Your website is your digital business card. | About VibePerform: the modern web agency. |
| `/en/ai-potential-analysis/` | Which office work do you really need to do yourself? | AI potential analysis for your business |
| `/en/ai-strategy/` | Less uncertainty about AI. A clear next step. | AI consulting & strategy. A clear next step. |
| `/en/blog/` | Good decisions start with understanding. | Website guides: Web design, SEO & support. |
| `/en/copy-graphics/` | Your work has substance. Your content shows it. | Copy & graphics. For your online presence. |
| `/en/google-business-profile/` | Known locally. Clear online. | Google Business Profile. Known locally. Clear online. |
| `/en/` | Your business keeps evolving. Your website should too. | Websites and Business Profiles     |
| `/en/search-engine-optimisation/` | The right questions. The relevant answers. | SEO – Search engine optimisation |
| `/en/services/` | Your online presence. Everything considered. | Web design, SEO & content. Our services for your business. |
| `/en/website-design/` | Good work deserves a great presence. | Website design & development. A presence for your business. |
| `/en/website-design/v2/` | Good work deserves a great presence. | Website design & development. A presence for your business. |
| `/en/website-redesign/` | Your business has moved on. Has your website? | Website redesign. Built around your business. |
| `/en/website-support/` | Your business keeps changing. We keep your presence current. | Website support & maintenance. We keep your presence current. |
| `/en/websites-for-trade-businesses/` | Your work speaks for itself. Your website should, too. | Websites for trade businesses. A presence that reflects your craft. |
| `/en/workshop/explore-workshop/` | The Strategic Explore Workshop | Explore Workshop for Your AI Strategy |
| `/en/workshops/` | Our Workshops at a Glance | Our AI Workshops at a Glance |
| `/` | Ihr Unternehmen entwickelt sich. Ihre Webseite sollte das auch. | Webseiten und Unternehmensprofile |

## Technische Anpassungen

Die Texte liegen weiterhin in den vorhandenen gemeinsamen DE-/EN-Inhaltsdateien unter `src/data/`. Die vorhandenen Markdown-Ausgaben und `llms-full.txt` wurden neu erzeugt. Auf Leistungsdetailseiten und in der Wissensübersicht führt auch die Markdown-Hauptüberschrift das konkrete Thema.

Für lange Fachbegriffe erlauben die Leistungsseiten natürliche Worttrennung und einen Umbruch als Rückfall. Auf großen Bildschirmen hat die SEO-H1 eine angepasste Größe, damit „Suchmaschinenoptimierung“ vollständig in die linke Spalte passt. Die Agenturseite vermeidet automatische Trennungen im Markennamen; die Potenzialanalyse hat mehr verfügbare Textbreite und vermeidet Trennungen sehr kurzer Wörter.

URLs, Canonicals, robots-Angaben und Weiterleitungsstatus wurden mit dem Ausgangsbuild verglichen und sind identisch.

## Verifikation

- Produktionsbuild erfolgreich: 61 Seiten.
- `npm test`: 84 von 84 vorhandenen Tests bestanden; keine übersprungenen Tests.
- Jede der 53 Inhalts-/Fehlerseiten enthält im ausgelieferten HTML genau eine H1. Die acht Weiterleitungsdokumente benötigen keine Inhalts-H1.
- Alle 33 geänderten Routen im Browser bei 320, 390 und 1440 Pixeln geprüft: insgesamt 99 Kombinationen, keine H1-Textüberläufe, kein H1-Beschnitt und kein horizontaler Seitenüberlauf.
- Nach der letzten Typografieanpassung wurden die sechs betroffenen DE-/EN-Routen bei allen drei Breiten erneut geprüft.
- Repräsentative Screenshots wurden visuell geprüft: SEO auf Desktop/Mobil, Startseite auf Desktop sowie Handwerk, Agentur und Potenzialanalyse auf Mobil.
- Browserprüfung mit reduzierter Bewegung und blockierten externen Ressourcen; keine erneute Prüfung von Tracking oder externen Integrationen.
- `git diff --check` erfolgreich.

Die H1 macht den Inhalt eindeutiger. Sie allein garantiert weder Indexierung noch ein bestimmtes Ranking. Grundlage: [Google SEO-Startleitfaden](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=de).

## Geprüft und beibehalten

| Route | H1 |
|---|---|
| `/404.html` | Seite nicht gefunden / Page not found |
| `/de/blog/beste-loesung-neue-webseite/` | Was ist die beste Lösung für eine neue Webseite? |
| `/de/blog/google-unternehmensprofil-website-abgleichen/` | Google-Unternehmensprofil und Website: Welche Angaben müssen zusammenpassen? |
| `/de/blog/handwerker-website-inhalte-checkliste/` | Welche Inhalte braucht eine Handwerker-Website? |
| `/de/blog/ki-agenten-geschaeftsnutzen-roi/` | KI-Agenten: So wird aus dem Hype echter Geschäftsnutzen |
| `/de/blog/ki-denkfaehigkeit-wettbewerbsvorteil/` | KI und seine Fähigkeit logisch zu Denken („Reasoning“) sind der Schlüssel zum Wettbewerbsvorteil |
| `/de/blog/ki-erfolg-muenchner-mittelstand-4-phasen/` | Der 4-Phasen-Guide für KI-Erfolg im Münchner Mittelstand |
| `/de/blog/ki-readiness-wertsteigerung-datenbasis/` | KI Readiness: Wie eine KI-fähige Datenbasis Unternehmenswert schafft |
| `/de/blog/website-betreuung-umfang-checkliste/` | Was gehört zur laufenden Website-Betreuung? |
| `/de/datenschutz/` | Datenschutzerklärung |
| `/de/impressum/` | Impressum |
| `/en/blog/ai-agents-business-roi/` | AI Agents: Turning the Hype into Real Business Value |
| `/en/blog/ai-readiness-company-value-data-foundation/` | AI Readiness: How an AI-Ready Data Foundation Creates Company Value |
| `/en/blog/ai-reasoning-competitive-advantage/` | AI and its ability to reason are the key to competitive advantage |
| `/en/blog/ai-success-munich-smes-4-phase-guide/` | The 4-Phase Guide to AI Success for Munich SMEs |
| `/en/blog/google-business-profile-website-consistency/` | Google Business Profile and website: which details should agree? |
| `/en/blog/ongoing-website-support-scope-checklist/` | What belongs in ongoing website support? |
| `/en/blog/trade-business-website-content-checklist/` | What content does a trade business website need? |
| `/en/legal-notice/` | Legal Notice |
| `/en/privacy/` | Privacy Policy |

## Nachweise

Im übergeordneten Paketordner: `h1-before.json`, `h1-after.json`, `browser-h1-check.json`, `test-after.log` und die PNG-Screenshots. Lokale Vorschau: http://127.0.0.1:4337/de/suchmaschinenoptimierung/ .

## Korrektur: Dopplungen oberhalb der H1

Auf der deutschen SEO-Seite steht über der H1 jetzt „Die richtigen Fragen. Die passenden Antworten.“; auf Englisch entsprechend „The right questions. The relevant answers.“. Der Text passt auf Desktop in eine Zeile und bei 320 Pixeln in zwei Zeilen.

Wiederholende Themenzeilen oberhalb der H1 wurden auf den übrigen Leistungsdetailseiten, der Website-Erstellung einschließlich V2, der Leistungsübersicht, den Handwerksseiten, der Potenzialanalyse und der Workshopübersicht entfernt. Die bisherigen H1 bleiben vollständig bestehen. Vorhandene Breadcrumbs bleiben zur Orientierung erhalten.

Verifikation dieser Korrektur: Build erfolgreich; 84 vorhandene Tests bestanden. Alle 22 betroffenen DE-/EN-Routen bei 320 und 1440 Pixeln auf Dopplungen und horizontalen Überlauf geprüft (44 Kombinationen, keine Befunde). Die SEO-Seite wurde in beiden Breiten visuell geprüft. H1, Canonicals, robots und Weiterleitungen entsprechen unverändert dem zuvor geprüften Stand. Noch nicht veröffentlicht.

## Startseite: Webseiten und Unternehmensprofile

Die vollständige H1 lautet nach dem abschließenden Feedback ausschließlich „Webseiten und Unternehmensprofile“ beziehungsweise „Websites and Business Profiles“. Die bisherigen zusätzlichen H1-Zeilen wurden entfernt.

Der Einleitungstext lautet jetzt:

- DE: „Wir pflegen Ihren digitalen Firmenauftritt. Und entwickeln ihn mit Ihnen weiter.“
- EN: „We take care of your online presence. And keep developing it with you.“

Der lange deutsche Fachbegriff darf auf kleinen Bildschirmen natürlich umbrechen. Build und alle 84 Tests bestanden. Die DE-/EN-Startseite und die deutsche Root-Kopie wurden bei 320, 390 und 1440 Pixeln geprüft: neun Kombinationen ohne Textbeschnitt oder Überlauf. Noch nicht veröffentlicht.

Die wiederholende kleine Themenzeile unter dem Einleitungstext der Startseite wurde auf Deutsch und Englisch entfernt, einschließlich zugehöriger Daten, CSS und Markdown-Wiederholung.
