# SEO review: Website service landing page

Stand: 2026-09-09  
Scope: `/de/websites-fuer-handwerksbetriebe/` and `/en/websites-for-trade-businesses/`

## Ausgangslage

- Die Seite ist ein geprüfter Entwurf. `websiteServiceIndexable` bleibt deshalb `false`.
- Der HTML-Robots-Hinweis bleibt `noindex, follow`; die Seiten werden weiterhin nicht in die Discovery-Dateien aufgenommen.
- Im `.seo-cache` liegt nur ein älterer Performance-Eintrag für `/de/`; es gibt keinen Seiten- oder Audit-Cache für diese Landingpage.
- Title und Description stammen aus `src/data/websiteServiceContent.ts`. Nach dem Luna-Review wurden die Titles auf „Websites für Handwerksbetriebe | VibePerform“ bzw. „Websites for trade businesses | VibePerform“ gekürzt; die laufende Betreuung bleibt in der Description erklärt. Zeichenzahlen sind keine feste Google-Grenze.

## Umgesetzt

In `src/components/WebsiteServiceDocument.astro`:

- Robots wird explizit als `noindex, follow` ausgegeben und schaltet bei einer späteren Freigabe nachvollziehbar auf `index, follow`.
- Open Graph wurde um `og:site_name`, die passende englische Locale (`en_US`), die alternative Locale, ein Bild-Alt-Attribut und die konsistente absolute Bild-URL ergänzt.
- Twitter-Metadaten enthalten jetzt zusätzlich Title, Description und Bild.
- Das Service-JSON-LD verwendet für Englisch `en-US`, verweist über `mainEntityOfPage` eindeutig auf die jeweilige WebPage und nennt das bereits vorhandene VibePerform-Logo als Service-Bild.
- Kein neues FAQPage-Schema: Für diese kommerzielle Seite wäre das kein belastbarer Google-Rich-Result-Hebel.

## Vor der Suchfreigabe

1. Finale Freigabe der kompakten deutschen und englischen Meta-Texte.
2. Platzhalter-Referenzen und Entwurfsinhalte gegen freigegebene echte Inhalte prüfen.
3. Erst danach `websiteServiceIndexable`, die passenden Header-Regeln und die Discovery-Dateien gemeinsam ändern und die gebauten HTML-Seiten sowie JSON-LD validieren.
