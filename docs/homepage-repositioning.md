# Homepage repositioning

18 September 2026 · `develop`

## Complete homepage

The root, German and English homepages now consistently present VibePerform as an agency for websites, business profiles and ongoing improvements.

- V2 hero with the original logo and favicon. A single “Mehr erfahren” / “Learn more” action scrolls to the customer problems section. Smooth scrolling respects reduced-motion preferences.
- All seven old homepage sections removed: old trust claims, AI promise, AI delivery process, use cases, exclusions, team presentation and AI discovery CTA.
- New sections: customer problems in the V2 editorial layout; four services; the ongoing-development vision; collaboration; four FAQ disclosures; contact; matching footer.
- Warm backgrounds, lavender accents, serif emphasis, fine dividers and restrained typography continue the V2 design. No homepage pricing.
- AI consulting appears only as a supplementary service. Existing specialized pages remain available.
- Navigation points to services and collaboration on the homepage, the existing About page and the existing booking link. The contact section also offers email.
- Homepage metadata and the shared Organization description reflect the new positioning. The former workshop social image is replaced by the original brand logo, with its actual dimensions. Generated homepage Markdown and the llms introduction are aligned with the new content.

## Validation

- `npm test`: all 34 tests pass, including four new regression checks for removed content, single discovery CTA, internal routes/anchors and homepage machine-readable content. Build completes successfully.
- Desktop visual review: hero, customer problems, services, collaboration/FAQ. FAQ opening checked.
- Mobile visual review at effective 320 CSS px: services and contact/footer; no horizontal page overflow. German/English language switch and discovery anchors work.
- The discovery action scrolls to `#home-next`; normal-mode computed scroll behavior is smooth. CSS switches it to auto for reduced motion.
- Animation pause rechecked after fixing an overlapping empty hero area. The V2 shader, fallback and reduced-motion behavior remain intact. Their logic was exercised in step 1; no real-device GPU benchmark performed.
- Mobile navigation closes after choosing a new homepage anchor. All contact destinations are existing booking/email links; no enquiry was sent during testing.
- No console errors or warnings in the checked German browser state. `git diff --check` passes.

## Scope and next work

This completes the homepage in the agreed new direction. Service detail pages, About and other subpages are separate next steps. The saved `V1-KI-Beratung` branch retains the original website. No production deployment was performed.

Design sources: `KI-Beratung/outputs/vibeperform-metaball-hero-2026-09-18/versions/v2/` and `KI-Beratung/outputs/vibeperform-brandbook-2026-09-18/`.
