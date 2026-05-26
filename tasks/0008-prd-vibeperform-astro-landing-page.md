# Vibeperform Landing Page Astro Migration PRD

## Introduction/Overview
Rebuild the existing React landing page defined in `docs/landingpage.tsx` as an Astro page while preserving its content, layout, styling, and interactions. The new Astro implementation must deliver the same visual experience—a dark, gradient-rich, single-page marketing site for Vibeperform that communicates the offer, process, use cases, and contact paths for mid-sized companies exploring AI initiatives.

## Goals
- Replicate the React landing page pixel-for-pixel in an Astro page (target file: `src/pages/landing.astro`) using Tailwind CSS utility classes.
- Keep all textual content, section order, iconography, and interactive behaviors (hover states, mailto links, external link handling) identical to the React version.
- Ensure the page remains responsive from mobile widths up to large desktops, matching the current breakpoint-driven spacing and grid behaviors.

## User Stories
- As a prospective Vibeperform client, I can scan the hero headline, supporting copy, and primary CTA immediately on page load so I understand the value proposition and can book an intro call.
- As a stakeholder evaluating the offer, I can scroll through clearly delineated sections—deliverables, process, application fields, results, security posture, target audience, next steps, FAQs—to build confidence and share the page internally.
- As a Vibeperform team member, I can trust that the Astro page mirrors the existing React content so I can maintain one source of truth when updating copy or CTA destinations.

## Functional Requirements
1. Create a new Astro page at `src/pages/landing.astro` that renders within the existing site layout (import and use shared layout wrapper if required by project conventions).
2. Apply root-level styling identical to the React version: `<body>` or page wrapper uses Tailwind classes `bg-slate-900 text-slate-300 antialiased selection:bg-purple-500 selection:text-white`; ensure these classes are applied in Astro (via wrapper `<div>` if body classes are controlled elsewhere).
3. Implement the background visuals:
   - Full-viewport `<svg>` pattern overlay (`absolute inset-0 -z-10 h-full w-full stroke-slate-700` etc.) with `pattern` definition `id="0787a7c5-978c-4f66-83c7-11c213f99cb7` and `rect` fill referencing the pattern.
   - Gradient blob element: absolutely positioned `<div>` with classes `absolute left-[calc(50%-4rem)] top-10 -z-10 ... blur-3xl` containing an inner `<div>` with `aspect-[1108/632]` etc. and inline `clip-path` polygon matching the React version.
4. Recreate the header:
   - Positioned absolutely at top (`absolute inset-x-0 top-0 z-50 p-6`), containing a `<nav>` with `SparklesIcon` (sized `h-6 w-6 text-purple-400`) and text label “Vibeperform”.
   - Anchor is non-navigating (`href="#"`), uses classes `-m-1.5 p-1.5 text-white font-bold text-xl flex items-center gap-2`.
5. Implement the main container sized `mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pt-48 lg:px-8`.
6. Hero section:
   - Centered layout with `text-center`.
   - Heading text exactly “KI schnell nutzbar machen – ohne große Projekte, ohne Risiko.” with classes `text-4xl ... sm:text-6xl`.
   - Supporting paragraph copy verbatim, `mt-6 text-lg leading-8 text-slate-400 max-w-3xl mx-auto`.
   - CTA button linking to `mailto:contact@vibeperform.com`, classes `rounded-md bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline ... transition-colors duration-200`.
7. “Was wir liefern” section:
   - Section spacing `mt-24 sm:mt-32`; inner heading, paragraph text as in React.
   - 4-item responsive grid `grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4`.
   - Each card reproduces `FeatureCard` appearance: centered column layout, `bg-slate-800/50 p-8 rounded-lg transition-transform hover:scale-105 hover:bg-slate-800`, icon container `flex h-12 w-12 ... bg-purple-600 text-white`, icon sizes `h-6 w-6`.
   - Card content exactly matches React titles/descriptions: “Use-Case-Portfolio”, “Entscheidungsvorlage”, “Prototyp/PoC (optional)”, “Enablement”.
8. “Unser Vorgehen (bewährt & schlank)” section:
   - Heading `text-3xl` etc.
   - Three vertically stacked `ProcessStep` rows spaced `space-y-12`, each a flex layout switching to row on medium screens (`flex flex-col md:flex-row items-start gap-6`).
   - Number badge styling `h-12 w-12 rounded-full bg-purple-600 text-white font-bold text-xl`.
   - Titles/subtitles content identical, including subtitles (“Wertvolle KI-Ideen finden”, etc.) and descriptive paragraphs.
   - Followed by centered highlight box `mt-12 ... bg-slate-800/50 ... max-w-md mx-auto` with text “Zeitbedarf intern: Kernteam 6–12 Std. ...”.
9. “Typische Anwendungsfelder” section:
   - Heading same classes.
   - 3-card grid `grid grid-cols-1 gap-8 md:grid-cols-3`.
   - Each card `bg-slate-800/50 p-8 rounded-lg`, icons (ChartBarIcon, UsersIcon, BriefcaseIcon) inline with headings, unordered list with `list-disc list-inside text-slate-400 space-y-2` and item copy identical.
10. “Ergebnisse, auf die Sie sich verlassen können” section:
    - Layout matches React version, reuses FeatureCard visuals with icons (RocketLaunchIcon, CheckBadgeIcon, LightBulbIcon) and provided text.
11. “Datenschutz & Sicherheit” section:
    - Container `mt-24 sm:mt-32 bg-slate-800/50 rounded-lg p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8`.
    - Include `ShieldCheckIcon` sized `h-24 w-24 text-purple-400`.
    - Copy text identical, preserving `<strong>` emphasis and highlighted statement `font-semibold text-purple-300`.
12. “Für wen ist das gedacht?” section:
    - Centered content (`max-w-3xl text-center`), header and paragraph text verbatim with inline `<strong>` maintaining white emphasis.
13. “Nächste Schritte” section:
    - Heading centered, unordered list (`role="list"`, `space-y-6`) with two items using `CheckBadgeIcon` bullet icons.
    - CTA button identical styling and href as hero but text “Jetzt Kontakt aufnehmen”.
14. “Kurz-FAQ” section:
    - Section spacing as above; three FAQ cards each `p-6 bg-slate-800/50 rounded-lg`, headings `font-semibold text-lg text-white`, paragraphs `text-slate-400`.
15. Footer:
    - Wrapper `mx-auto max-w-7xl px-6 lg:px-8 mt-16 sm:mt-24 pb-12`.
    - Top border `border-t border-slate-700 pt-8 text-center`.
    - Contact area with label “Kontakt:”, email `contact@vibeperform.com` (mailto link, purple hover), website link `https://vibeperform.com` (opens in new tab with `target="_blank"` and `rel="noopener noreferrer"`), divider `|`.
    - Closing note `text-sm text-slate-500 bg-slate-800/50 p-3 rounded-md inline-block` containing copy about sharing the One-Pager.
16. Iconography must use the same components from `./components/Icons` (or Astro equivalent path). Ensure all icons receive appropriate `aria-hidden` when decorative and class names for sizing.
17. All sections must inherit the responsive spacing from Tailwind classes exactly as in the React version (`mt-24 sm:mt-32`, `max-w-*`, grid breakpoint classes, etc.) to guarantee parity without relying on custom CSS.
18. Maintain hover/focus states on interactive elements (`FeatureCard` scale/background, buttons’ hover color, focus-visible outlines) by keeping the existing Tailwind utility classes.
19. Preserve semantic HTML structure: headings must use matching levels (`h1` for hero, `h2` for section titles, `h3`/`h4` for subsections), lists remain `<ul>` with `<li>` items, and CTA buttons remain `<a>` anchors with button styling.
20. Ensure no additional interactivity or scripts are introduced; the page remains static aside from styling transitions.

## Non-Goals
- Do not change copywriting, CTA destinations, or icon choices.
- Do not introduce new sections, layout variations, or animation beyond the existing hover transitions.
- Do not build content management, localization, or CMS integrations as part of this migration.

## Design Considerations
- Reuse Tailwind CSS utility classes to mirror spacing, typography, colors, and transitions; update Tailwind configuration only if existing tokens are insufficient.
- Ensure the SVG gradient background and blur blob align visually with the React version, including z-index stacking so content sits above the visuals.
- Verify color contrast on dark background meets accessibility expectations (the React page already uses high-contrast text).

## Technical Considerations
- Use Astro’s component model to optionally extract reusable pieces (`FeatureCard`, `ProcessStep`, `FaqItem`) as `.astro` components for maintainability while keeping markup identical.
- Import React-icon equivalents as Astro components or convert them to inline SVG if required; confirm the `components/Icons` module is compatible in Astro (may need to expose as functions returning SVG).
- Ensure Tailwind classes used in the React component are available in the Astro project’s Tailwind configuration to avoid purging or tree-shaking issues.
- Maintain mailto and external links with correct attributes; ensure `rel="noopener noreferrer"` is preserved for the external link.

## Success Metrics
- Visual parity between the React and Astro pages confirmed via manual side-by-side comparison at mobile (~375px), tablet (~768px), and desktop (≥1280px) widths.
- No regressions in Lighthouse accessibility or best-practice scores compared to the current React rendering.
- CTA links verified to open the default mail client (`mailto`) and Vibeperform home page in a new tab.

## Open Questions
- Should the Astro page replace an existing route (e.g., `src/pages/index.astro`) or remain a separate `landing.astro` file linked elsewhere?
- Is there a desire to centralize section data (e.g., feature lists, FAQs) into JSON or Astro props for easier future updates?
- Are there analytics, tracking pixels, or meta tags that need to be added during this migration, or should the Astro page remain free of additional scripts?
