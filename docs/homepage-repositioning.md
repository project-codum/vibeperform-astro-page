# Homepage repositioning — step 1

18 September 2026 · `develop`

## Implemented

- Homepage navigation and hero on `/`, `/de/` and `/en/` use the V2 visual study and Brandbook 2.1.
- Original `public/vibeperform-logo.png` and `favicon.png` retained. Logo uses the existing dark treatment; no replacement v.-mark.
- Websites, About and project discussion links point to existing pages or the existing booking URL. Language switching retains the locale preference. The broader services page will be added in a later step.
- Native Astro/custom-element integration of the V2 metaball shader; no React hydration for the hero. Pause/resume, reduced-motion poster, unavailable-WebGL fallback, visibility suspension and cleanup remain supported.
- Mobile navigation opens with a button, closes with Escape/outside click/focus leaving, and keeps links accessible without JavaScript.
- Localized homepage title and description reflect the digital-company-presence positioning.

## Deliberate step boundary

Content below the hero, footer, social preview image, Organization schema and agent-readable positioning remain part of the previous version. They will be revised as the remaining homepage sections are approved. This is a development preview, not a complete relaunch.

## Validation

- `npm test`: build of 38 pages and all 30 existing tests passed.
- Browser: desktop layout and mobile layouts at effective 390 and 320 CSS px; no horizontal overflow in checked narrow layouts. German/English copy, menu opening, Escape closing, language navigation, hero pause and the actual website-service destination checked. No console errors in the final homepage check.
- Reduced-motion/unavailable-WebGL logic separately exercised with browser API stubs: no WebGL context or animation starts under reduced motion; failed context retains fallback; observers disconnect on destroy. Not a real-device GPU benchmark.
- Built root/DE/EN HTML: one H1 each; all homepage navigation routes resolve locally.
- `git diff --check` passed.

## References and next step

Source study: `KI-Beratung/outputs/vibeperform-metaball-hero-2026-09-18/versions/v2/`.
Brandbook: `KI-Beratung/outputs/vibeperform-brandbook-2026-09-18/`.

Next: customer problems immediately below the hero, followed by services, process and contact. Prices belong on a separate products/services page.
