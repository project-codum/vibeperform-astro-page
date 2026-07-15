# Vibeperform SEO Action Plan

Based on the 2026-07-14 full audit. Priorities are ordered by impact and dependency.

## Critical: fix immediately

| Action | Why | Effort | Suggested owner |
|---|---|---:|---|
| Force all HTTP traffic to HTTPS with a permanent redirect | HTTP currently serves a full indexable duplicate | S-M | Hosting / DNS |

## High: complete within one week

| Action | Why | Effort | Suggested owner |
|---|---|---:|---|
| Standardize all sitemap, canonical, hreflang, and internal URLs on trailing slashes | 20 of 22 sitemap URLs currently redirect before reaching their final URL | M | Development |
| Remove, redirect, or `noindex` `/landing/`, `/landing-react/`, and `/workshop/explore-workshop/` | Uncontrolled pages are publicly indexable | S | Development |
| Decide the fate of `/de/ki-strategie/` and `/en/ai-strategy/` | Both are indexable, missing from the sitemap, and still branded `NEXperts` | S-M | Content + development |
| Replace generic homepage titles | Current title tags do not communicate the search intent | S | Content + development |
| Add one permission-cleared case study with an attributable outcome | The service promise currently has no on-site proof | M | Founders + content |
| Review Consentmanager loading and presentation | The banner was the mobile LCP element at 2.95 s | M | Development / CMP owner |

Suggested homepage titles:

- `KI-Beratung für Handwerk & Mittelstand | Vibeperform`
- `AI Consulting for Craft Businesses & SMEs | Vibeperform`

## Medium: complete within one month

| Action | Why | Effort | Suggested owner |
|---|---|---:|---|
| Add Open Graph and Twitter Card metadata to the homepage | Social/search previews currently lack explicit metadata | S | Development |
| Add `WebPage`, `BreadcrumbList`, `Person`, and connected Organization schema | Improves entity clarity and nested-page context | M | Development |
| Replace self-referential `sameAs` with verified profiles | Current entity linking adds no authority | S | Development |
| Correct H2/H3 hierarchy in older articles | Three article pairs skip from H1 to H3 | S | Content |
| Add sources, update dates, author role, and profile links to older articles | Unsupported statistics and weak attribution reduce trust | M | Content |
| Expand workshops, Explore, and About with decision-support content | Commercial pages are concise but omit objections, prerequisites, examples, and scope boundaries | M | Content |
| Build the three recommended topic clusters | Current content does not yet support the Handwerk positioning deeply | L | Content strategy |
| Link use-case cards to relevant service pages or articles | Improves crawl paths and converts informational interest into service intent | S-M | Content + development |
| Add responsive variants for four remaining large images | Roughly 300 KiB of avoidable transfer remains in the workspace | M | Development |
| Standardize German voice (`Sie` vs `ihr/euch`) | Mixed address weakens brand consistency | S | Content |

## Low: backlog

| Action | Why | Effort | Suggested owner |
|---|---|---:|---|
| Replace the root meta refresh with a server-side 301 | Cleaner discovery and redirect behavior | S-M | Hosting |
| Add baseline security headers through a proxy/CDN if GitHub Pages cannot provide them | Improves security posture | M | Hosting |
| Add more vertical padding to mobile footer links | Current physical targets are roughly 20 px high | S | Design / development |
| Consider IndexNow | Optional faster discovery for Bing and participating engines | S | Development |
| Configure GSC, GA4, CrUX/PageSpeed, Moz or Bing credentials for the next audit | Enables field CWV, index coverage, query, traffic, and backlink evidence | M | Marketing / development |

## Recommended implementation order

1. Hosting redirect and route cleanup.
2. URL/canonical/hreflang normalization.
3. Homepage titles and legacy-brand cleanup.
4. Consentmanager performance review.
5. Case study and authority/entity signals.
6. Older article repair and Handwerk topic clusters.
7. Responsive image variants and remaining polish.

## Acceptance checks

- `http://www.vibeperform.com/*` returns one permanent redirect to the equivalent HTTPS URL.
- Every submitted sitemap URL returns `200` directly and matches its canonical.
- Every hreflang URL returns `200` directly and reciprocates.
- No development or duplicate landing page is indexable.
- Both localized homepages have distinct intent-led titles and descriptions.
- Live Lighthouse mobile LCP is below 2.5 s under a repeatable test condition.
- Structured data validates without errors and verified profiles are used for entity links.
- GSC shows only intended canonical URLs after the next crawl cycle.

