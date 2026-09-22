# Bilingual release audit

Audit date: 2026-09-22

## Result

The route inventory contains a German and English page for each current public page family. No missing English content route was found, so no duplicate EN page was added. The translated service and workshop content is backed by paired `de`/`en` data, and the main page components provide reciprocal language links. The generic 404 now serves a bilingual static fallback with distinct DE and EN navigation, so it remains usable even when the host returns one shared `404.html` for unknown URLs.

## Route pairs checked

| German | English |
| --- | --- |
| `/de/` | `/en/` |
| `/de/leistungen/` | `/en/services/` |
| `/de/website-erstellen-lassen/` and `/de/website-erstellen-lassen/v2/` | `/en/website-design/` and `/en/website-design/v2/` |
| `/de/website-ueberarbeiten/` | `/en/website-redesign/` |
| `/de/website-betreuung/` | `/en/website-support/` |
| `/de/websites-fuer-handwerksbetriebe/` | `/en/websites-for-trade-businesses/` |
| `/de/suchmaschinenoptimierung/` | `/en/search-engine-optimisation/` |
| `/de/google-unternehmensprofil/` | `/en/google-business-profile/` |
| `/de/texte-grafiken/` | `/en/copy-graphics/` |
| `/de/ki-strategie/` | `/en/ai-strategy/` |
| `/de/ki-potenzialanalyse/` | `/en/ai-potential-analysis/` |
| `/de/ueber-uns/` | `/en/about-us/` |
| `/de/workshops/` | `/en/workshops/` |
| `/de/workshop/explore-workshop/` | `/en/workshop/explore-workshop/` |
| `/de/datenschutz/` | `/en/privacy/` |
| `/de/impressum/` | `/en/legal-notice/` |
| `/de/blog/` and all four article routes | `/en/blog/` and the four corresponding article routes |

The old `/de/explore-workshop/` and `/en/explore-workshop/` routes redirect to the paired workshop detail pages. Root legacy routes remain redirects/aliases; `/` serves the German home page. The old root English article route redirects to its English canonical blog route.

## Checks and boundaries

- Compared `src/pages/de/` and `src/pages/en/` route inventories, including nested workshop, website-v2 and blog pages.
- Checked service route mappings in `src/data/serviceDetails.ts`, paired locale props, workshop page alternates, blog article `alternateLocaleHref` metadata, and homepage language links.
- Browser QA on local `:4322`: DE and EN home, service overview, trade-business landing page, agency page, knowledge overview and paired article routes. Desktop screenshots were reviewed at the default 1280px viewport; mobile screenshots were reviewed at 390px and 320px. No clipping was visible in the sampled viewports; article covers rendered, and the trade inquiry controls appeared in the accessibility tree. No inquiry was submitted.
- Opened and collapsed the mobile service menu; verified English service links stay under `/en/` and German links under `/de/`. On paired blog articles, the language switch navigated EN → DE and DE → EN to the corresponding article. Used keyboard Space to open the German menu, Escape to close it, and expanded a home FAQ item to verify its answer appears.
- Navigated to an unknown `/en/...` route in the local preview. The fallback visibly presented German and English headings plus home, services and workshops links for both locales.
- The 404 has no hreflang pair because it is a noindex error response; both language recovery paths are visible on the shared static fallback.
- Legal wording and legal page details are handled in the separate legal review. Sitemap, robots and indexing changes are handled in the SEO release check.
- The full production build was left to the release check agent to avoid concurrent `dist` writes.
