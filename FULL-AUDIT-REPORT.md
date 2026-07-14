# Vibeperform Full SEO Audit

Analyzed: 2026-07-14  
Primary URL: https://www.vibeperform.com/de/  
Business type: B2B AI consultancy and implementation agency with service-area signals around Munich  
Overall SEO Health Score: **66/100**

## Executive summary

Vibeperform has a strong technical foundation in server-rendered Astro pages, valid bilingual hreflang, useful structured data, a valid sitemap, and unusually good AI-crawler support through `llms.txt`, `llms-full.txt`, and agent-readable Markdown. The current workspace redesign also improves the homepage H1, relevance for craft businesses, visual trust, contrast, image delivery, and readability.

The largest risks are on the deployed infrastructure and indexable route estate. HTTP serves a complete duplicate of the HTTPS site, most canonical and sitemap URLs redirect because trailing slashes are inconsistent, and several development or legacy pages are publicly indexable. The live homepage title is generic, the strongest service promise lacks case-study proof, and older articles need better hierarchy and sourcing.

### Category scores

| Category | Weight | Score | Weighted contribution |
|---|---:|---:|---:|
| Technical SEO | 22% | 68 | 15.0 |
| Content quality | 23% | 58 | 13.3 |
| On-page SEO | 20% | 56 | 11.2 |
| Schema / structured data | 10% | 76 | 7.6 |
| Performance / CWV | 10% | 92 | 9.2 |
| AI search readiness | 10% | 67 | 6.7 |
| Images | 5% | 55 | 2.8 |
| **Overall** | **100%** |  | **66/100** |

### Top five issues

1. **Critical:** `http://www.vibeperform.com/de/` returns `200` with the full page instead of redirecting to HTTPS.
2. **High:** 20 of 22 sitemap URLs redirect to slash-suffixed URLs, while canonicals and hreflang point back to non-slashed URLs.
3. **High:** `/landing/`, `/landing-react/`, and `/workshop/explore-workshop/` are indexable `200` pages without a canonical or `noindex`.
4. **High:** `/de/ki-strategie/` and `/en/ai-strategy/` are indexable and still use the legacy brand name `NEXperts`, but are absent from the sitemap.
5. **High:** Both homepages use the generic title `Vibeperform`, leaving the primary search intent out of the title tag.

### Top five quick wins

1. Replace homepage titles with intent-led titles in German and English.
2. Standardize sitemap, canonical, hreflang, and internal links on the final slash-suffixed URLs.
3. Remove, redirect, or `noindex` the three uncontrolled routes.
4. Correct or retire the two legacy `NEXperts` strategy pages.
5. Add verified external profiles to `Organization.sameAs` and publish one permission-cleared project case study.

## Scope and methodology

- Fetched the live homepage with the SEO skill's `fetch_page.py` script.
- Crawled all 22 URLs in the live XML sitemap while respecting `robots.txt`.
- Inspected the 36 routes in the current static Astro build.
- Ran technical, content, schema, sitemap, hreflang, GEO, image, and performance analyzers.
- Ran Lighthouse 12.8.2 against the live site on mobile and desktop.
- Compared the deployed homepage with the current workspace build at desktop and 390 px mobile width.
- Verified automated canonical warnings manually. The sitemap analyzer incorrectly interpreted some stylesheets and alternate links as canonicals; those false positives are excluded from the findings below.

No previous project-local `.seo-cache/` was present, so this audit gathered fresh evidence.

## Technical SEO

### Critical: HTTPS is not enforced

- `http://www.vibeperform.com/de/` returns `200 OK` and serves the same HTML as HTTPS.
- `http://vibeperform.com/` redirects to the still-insecure `http://www.vibeperform.com/`.
- The HTML canonical points to HTTPS, but this does not replace a transport-level redirect.

**Impact:** duplicate crawlable protocol variants, diluted URL signals, and avoidable security risk.  
**Fix:** force HTTP to HTTPS with a permanent redirect at the custom-domain, CDN, or hosting layer.

### High: final URLs, canonicals, and sitemap entries disagree

- The sitemap contains 22 URLs.
- Only `/de/` and `/en/` return `200` directly.
- The other 20 URLs return `301` to a trailing-slash version.
- Their canonical and hreflang elements use the non-slashed URL that redirects.
- Hreflang pairs are reciprocal and the language codes are correct.

**Fix:** use slash-suffixed final URLs consistently in `absoluteUrl`, sitemap generation, internal links, canonicals, and hreflang.

### High: uncontrolled indexable routes

The following live routes return `200`, have no canonical, and have no `noindex`:

- `/landing/`
- `/landing-react/`
- `/workshop/explore-workshop/`

They are not part of the intended bilingual information architecture. Remove them from the production build or convert them to explicit redirect/noindex pages.

### High: legacy strategy pages

- `/de/ki-strategie/` and `/en/ai-strategy/` return indexable `200` pages.
- Their titles contain `NEXperts`.
- Neither URL appears in the sitemap.

Decide whether these are real service pages. If yes, update the brand, strengthen the content, and include them in the sitemap. If no, redirect or `noindex` them.

### Medium: root URL uses a soft redirect

`https://www.vibeperform.com/` returns `200` with a zero-second meta refresh and JavaScript redirect to `/de/`. Prefer a server-side `301`. If that is not possible on the current host, add unambiguous canonical and noindex handling to the redirect shell.

### Security headers

Normal pages do not return HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy. This is primarily a security and trust issue rather than a direct ranking factor. GitHub Pages may require a proxy or CDN layer for complete header control.

### What is working

- `robots.txt` is valid, allows crawling, and references the sitemap.
- All 22 sitemap URLs ultimately resolve to `200`.
- Unknown URLs correctly return `404`.
- Critical content is present in initial server-rendered HTML.
- Googlebot and normal fetches returned equivalent homepage content.
- Seven legacy redirect stubs in the current build already include valid `noindex` behavior.

## On-page SEO

### Homepage title tags are too generic

Both homepages use `<title>Vibeperform</title>`. Suggested replacements:

- German: `KI-Beratung für Handwerk & Mittelstand | Vibeperform`
- English: `AI Consulting for Craft Businesses & SMEs | Vibeperform`

The current workspace H1, `KI, die im Betrieb mitarbeitet.`, is much stronger than the live H1, `Unabhängig beraten.` The exact target phrase appears in the workspace kicker, but the title tag still needs to carry the primary search intent.

### Metadata and social previews

- The live homepage meta descriptions are 174-178 characters and may truncate.
- The workspace description is concise but could state the target audience and independent implementation offer more explicitly.
- Homepage Open Graph and Twitter Card metadata are absent.
- Several article titles exceed a practical 60-character target; the longest is 110 characters.

### Heading and content structure

- Every sitemap page has one H1.
- The current homepage hierarchy is coherent and craft-specific.
- Three older article pairs jump from H1 to H3, with only a generic CTA as H2.
- The workspace homepage has about 356 words. Keep it concise, but add proof and decision-support content rather than generic filler.

## Content quality and E-E-A-T

### Strengths

- Named team members, portraits, clear roles, legal notice, privacy policy, and Codum GmbH identity form a sound trust base.
- The craft-focused wording uses credible operational language such as Werkstatt, Leistungsverzeichnis, Angebot, Baustelle, and on-site process work.
- The July AI-readiness article is the benchmark: 1,700+ words per language, clear H2/H3 structure, update date, author credentials, primary citations, and contextual internal links.

### Gaps

- No website case study, testimonial, review, customer logo, or attributable result was detected.
- Older articles contain unsupported numeric claims such as 25%, 56%, 31%, 83%, 75%, and 95% without source links.
- Commercial pages provide limited decision content:
  - Workshops: roughly 283 DE / 296 EN words
  - Explore workshop: roughly 415 / 442 words
  - About: roughly 238 / 256 words
  - Blog index: roughly 175 / 184 words
- German voice is inconsistent: the homepage uses formal `Sie`, while workshops/about use `ihr/euch`.

### Recommended topic clusters

1. **Handwerk workflows:** offer preparation, job knowledge, site documentation, and office automation.
2. **Readiness and safety:** data readiness, GDPR, access controls, and tool selection.
3. **Implementation:** process analysis, pilot design, employee adoption, and ROI measurement.

Each article should link to a relevant service page and at least two related articles.

## Schema and entity signals

Detected JSON-LD parses successfully:

- Homepage: `Organization` and `WebSite`
- Workshop pages: `Service`
- Articles: `BlogPosting`

Recommended improvements:

- Add `WebPage` to the homepage graph.
- Add `BreadcrumbList` to nested service and article pages.
- Add `ProfilePage`/`Person` for Marlon Dietrich and Isabella Hoesch.
- Replace `Organization.sameAs` pointing to the homepage with verified external profiles, or omit it.
- Express the relationship between the Vibeperform brand and legal entity Codum GmbH clearly, for example with `legalName`.
- Embed or reference one connected Organization graph consistently on service pages.

No deprecated schema types were detected.

## Performance and Core Web Vitals

### Live Lighthouse lab results

| Metric | Mobile | Desktop |
|---|---:|---:|
| Performance | 92 | 98 |
| SEO | 100 | 100 |
| Best practices | 100 | 100 |
| FCP | 1.65 s | 0.52 s |
| LCP | 2.95 s | 0.86 s |
| TBT | 10 ms | 0 ms |
| CLS | 0 | 0.062 |

Mobile LCP needs improvement. In the live test, the Consentmanager banner text was the LCP element and contributed roughly 2.1-2.3 seconds of render delay. The workspace hero itself is well configured with responsive WebP, explicit dimensions, eager loading, and high fetch priority.

No Google credentials were available, so CrUX, Search Console, GA4, field INP, and 75th-percentile CWV could not be verified. Local mobile Lighthouse against the Vite development server was excluded from scoring because HMR and development modules inflated the payload.

## Images

### Live score: 55/100

The deployed homepage still uses three older PNG examples. Lighthouse identified avoidable delivery weight, especially `example2.png`. The current redesign materially improves image relevance, alt text, formats, and hero delivery.

Remaining workspace opportunities:

- Add responsive 480w/800w sources for `workshop2.webp`, `workshop3.webp`, and `home-offer-document.webp`.
- Add 400w/800w variants for `isabellahoesch.webp`, which is 303 KiB at 1280x1920 but renders much smaller.
- Keep the logo's empty alt because its enclosing home link has the accessible brand label.

All current content images have explicit dimensions and useful alt text, and below-fold images are lazy-loaded. Measured CLS is zero in the current local homepage.

## AI search readiness

### Score: 67/100

Strengths:

- Major AI search crawlers are allowed.
- `llms.txt`, `llms-full.txt`, and `/agent/` Markdown are live and substantive.
- Content is server-rendered.
- Structured data is present.

Gaps:

- Few self-contained answer passages combine a direct answer, evidence, and clear attribution.
- First-hand proof and attributable outcomes are missing.
- Entity connections are weak because verified profiles are not linked in schema.

The strongest next GEO asset is a permission-cleared case study with a sourced, self-contained summary and clear author/reviewer identity. Regenerate public agent files whenever positioning or primary service content changes.

## Local SEO

### Observable readiness score: 28/100

Vibeperform appears to be a service-area consultancy rather than a customer-facing location.

- Footer: `München & Umgebung`
- Legal address: Codum GmbH, Ebenhausen
- LinkedIn headquarters signal: Munich
- Schema: Munich/Bavaria/Germany/Europe in `areaServed`
- No business phone, review signals, click-to-call, or visible GBP integration detected

This is location ambiguity, not a proven NAP contradiction. If local-pack visibility matters, distinguish legal seat and service area clearly, maintain one consistent identity across verified profiles, and publish one substantive Munich service page. Do not create many city-swapped doorway pages.

## Backlinks and external data

Backlink health is **insufficient data**. Moz and Bing credentials were absent, Common Crawl retrieval timed out, and no known-link file was available. Search confirmed indexed LinkedIn references, but that is not enough to infer backlink authority.

## Readability and visual verification

The current workspace now uses a 16 px secondary-text baseline and a 14 px metadata baseline. The logo artwork is enlarged inside the existing 77 px header. Desktop and 390 px mobile checks show no horizontal overflow. The redesign removes the live homepage's measured contrast failures.

Screenshots:

- `screenshots/seo-audit-home-desktop.png`
- `screenshots/seo-audit-home-mobile.png`

## Tool limitations

- No GSC, GA4, CrUX, PageSpeed API, Moz, Bing, or DataForSEO credentials were available.
- Public PageSpeed API calls were rate-limited, so Lighthouse lab data was used.
- INP requires field data or a meaningful interaction sample and is not confirmed.
- The live deployment differs from the current workspace branch.
- Local analyzers intentionally block localhost URLs; local verification used the static build and browser measurements instead.

