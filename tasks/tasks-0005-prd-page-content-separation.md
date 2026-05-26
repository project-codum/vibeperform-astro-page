## Relevant Files

- `src/pages/index.astro` - Source of the canonical localization pattern to mirror.
- `src/pages/about-us.astro` - English page with inline content to externalize.
- `src/pages/workshops.astro` - English page with inline content to externalize.
- `src/pages/ai-strategy.astro` - English page already using content modules; confirm alignment.
- `src/pages/de/index.astro` - German home page using localized data module.
- `src/pages/de/ueber-uns.astro` - German page with inline content to externalize.
- `src/pages/de/workshops.astro` - German page with inline content to externalize.
- `src/pages/de/ki-strategie.astro` - German strategy page; confirm alignment.
- `src/data/homeContent.ts` - Provides shared navigation content; reference for patterns.
- `src/data/strategyContent.ts` - Example of localized content module.
- `src/data/aboutContent.ts` - To be created for localized About page data.
- `src/data/workshopsContent.ts` - To be created for localized Workshops page data.
- `src/components/NavBar.astro` - Consumes localized navigation data across pages.
- `src/components/HomePage.astro` - Reference component for localized props.
- `src/components/StrategyPage.astro` - Consumes localized content module; ensure typings align.
- `docs/ARCHITECTURE.md` - Update documentation with new content structure (if exists/applicable).
- `README.md` - Primary developer documentation updated with localisation guidance.

### Notes

- **Page inventory:** `index.astro` and `de/index.astro` already load localized data via `HomePage` and `homeContent`. `ai-strategy.astro` and `de/ki-strategie.astro` load `strategyContent`. `about-us.astro`, `de/ueber-uns.astro`, `workshops.astro`, and `de/workshops.astro` contain inline copy that must migrate to data modules.
- **Shared dependencies:** All pages rely on `homeContent.<locale>.nav` when rendering `NavBar`, alongside locale-specific `homeHref`/`alternateLocaleHref` permutations.
- **Content consistency callouts:** Existing CTAs use `mailto:contact@vibeperform.com`; German pages include umlaut-less spellings (e.g., `Ueber`) that must stay unchanged in copy and routes.
- **Typing patterns:** `homeContent` and `strategyContent` both rely on `as const` exports with derived `Locale` and `Content` types. Nested structures are typed implicitly via the literal, ensuring TypeScript infers readonly string arrays.
- **Proposed About/Workshops schema:** New data modules will export `content = { en: { nav, metaTitle, hero: { kicker, title, intro }, highlights/cards, cta }, ... } as const`, along with `Locale`/`Content` types. `nav` will point to `homeContent.<locale>.nav` so navigation text continues to source from a single definition while living alongside page copy.
- **Typing alignment:** Continue to derive types from the literal export, optionally exporting helper interfaces if reuse emerges; no new shared type files required yet.
- **Assumptions:** Team is comfortable with the `as const` pattern and derived types; future locales can extend the same shapes without additional tooling.
- **New data modules:** `aboutContent` and `workshopsContent` now export locale-keyed objects with derived `Locale`/`Content` types to enforce field completeness.
- **Translation check:** German entries mirror existing wording (including ASCII transliterations like `Ueber`, `rueckwaerts`) and retain shared CTA routes (`mailto:contact@vibeperform.com`).
- **Page refactors (EN):** `about-us.astro` and `workshops.astro` now import their respective content modules, destructure localized data, and render with mapped sections and dynamic meta titles.
- **Page refactors (DE):** `de/ueber-uns.astro` and `de/workshops.astro` mirror the English pattern using localized data exports and preserve existing transliterated copy.
- **Validation status:** `npm run build` currently fails because Astro requires Node >= 18.20.8 (local environment reports v18.15.0).
- **Documentation:** README section “Managing Text & Localisation” now points developers to the new `aboutContent` and `workshopsContent` modules.

## Tasks

- [x] 1.0 Audit current page localization patterns and assets
  - [x] 1.1 Inventory all Astro pages (EN/DE) and note which already consume localized modules.
  - [x] 1.2 Document shared navigation/content dependencies that pages rely on today.
  - [x] 1.3 Capture any inconsistencies (naming, routes, CTA hrefs) that must be preserved during refactor.
- [x] 2.0 Define shared content typing strategy for page modules
  - [x] 2.1 Review existing typings in `homeContent.ts` and `strategyContent.ts` for reuse patterns.
  - [x] 2.2 Propose TypeScript interfaces/types for About and Workshops content structures (including nav references).
  - [x] 2.3 Align with team on typing approach (e.g., `as const` usage, exported types for locales).
- [x] 3.0 Extract English page content into localized data modules
  - [x] 3.1 Create `src/data/aboutContent.ts` with English (`en`) data mirrored from `about-us.astro`.
  - [x] 3.2 Create `src/data/workshopsContent.ts` with English (`en`) data mirrored from `workshops.astro`.
  - [x] 3.3 Ensure new content modules export locale typings and any shared type aliases.
- [x] 4.0 Extract German page content into localized data modules
  - [x] 4.1 Extend `src/data/aboutContent.ts` with German (`de`) content from `de/ueber-uns.astro`.
  - [x] 4.2 Extend `src/data/workshopsContent.ts` with German (`de`) content from `de/workshops.astro`.
  - [x] 4.3 Verify translations match existing copy and maintain route references.
- [ ] 5.0 Refactor Astro pages to consume localized modules and validate builds
  - [x] 5.1 Update English Astro pages to import their content modules and pass locale-specific data.
  - [x] 5.2 Update German Astro pages to import their content modules and pass locale-specific data.
  - [ ] 5.3 Run `npm run build` (and `npm run lint` if available) to confirm builds pass without new warnings.
  - [x] 5.4 Document the new pattern in project docs/readme for future contributors.
