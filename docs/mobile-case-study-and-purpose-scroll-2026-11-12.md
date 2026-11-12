# Mobile case study and scroll-driven purpose statement

Approved 2026-11-12. Scope: mobile HMS Loistl comparison and first-pass purpose animation in DE/EN.

## Behavior

Up to 700px, the project comparison uses a compact fixed-aspect card, attached before/after choices, a customer-site link and a separate VibePerform contact button. The contact button reuses the existing dialog. Desktop presentation and its animation stay unchanged. Without JavaScript both versions and a contact link remain available.

The purpose statement uses a native sticky viewport and scroll position. The first word starts after 120px; each word takes 150px and starts at scale 1.2. Reverse scrolling reverses the unfinished reveal. Completion retains the full sentence for the rest of the page visit, with reserved geometry preventing a jump. Reduced motion and no-JavaScript views show plain readable text.

## Performance

No added JavaScript dependency. Removed GSAP from the purpose script. Passive scroll handling coalesces events into one requested frame, with no playback clock or background frame loop. After completion listeners are removed. Initial setup cancels its pending duplicate frame before the immediate first render.

Mobile `<picture>` sources use lazy-loaded static WebP overview crops at 720/1080px. At 374px/DPR 2 the two selected files total 60,648 bytes. Existing desktop image sources are preserved.

Source images: existing `public/case-studies/loistl/before-desktop.webp` and `after-desktop.webp`. Before crop: left 0, top 36, width 1800, height 1250. After: complete 1440 × 1000 image. Resize to widths 720 and 1080 using Sharp, WebP quality 82, effort 6. No generative processing.

## Validation

- Production build and all 120 tests pass, including new scroll-regression tests for delayed entry, per-word distance, frame coalescing, reversal, completion and reduced motion.
- Browser: mobile comparison has equal before/after height; contact dialog opens and closes; no horizontal overflow at 320/374px.
- DE/EN and desktop/mobile scroll views verified: no movement without scrolling, delayed first word, retained completed state.
- Desktop comparison card geometry compared with production and unchanged.
- Reduced-motion view remains fully readable.

Other local homepage drafts are excluded from this release.
