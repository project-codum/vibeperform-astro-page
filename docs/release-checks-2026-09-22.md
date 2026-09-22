# Release checks — 2026-09-22

## Indexability changes

- DE/EN KI-Potenzialanalyse and Handwerksbetriebe pages are intended to be public search landing pages. Removed their HTML and Cloudflare `_headers` noindex rules and added their canonical URLs to generated `sitemap.xml`.
- Kept `noindex` on the 404 page, legacy redirect shells, and the `/v2/` website-story preview. These are not canonical production content.
- Added the German Handwerksbetriebe and KI-Potenzialanalyse Markdown pages to `llms.txt` and `llms-full.txt`; their route-level Markdown files are already generated for DE/EN.
- Updated built-site and live-verification expectations to catch accidental `noindex` meta/header regressions and ensure all four DE/EN landing pages appear in the sitemap.
- The Worker now redirects apex HTTPS and HTTP requests to the canonical `https://www.vibeperform.com` host while preserving path and query parameters. The live check covers apex and www behavior.

## Functional audit

- The DE/EN Handwerksbetriebe inquiry form posts directly to `/api/website-inquiries`; its UI validates inputs, reuses an idempotency key on retry, and reports success only after a matching accepted response.
- Final `npm test` passed: agent generation, Astro static build, and all 62 tests. Coverage includes validation, same-origin requests, rate limiting, persistence, notification recipient/reply-to, retry, and duplicate-submission behavior.
- Generated DE/EN Impressum, privacy, and About pages were inspected: they identify the sole proprietor and list the current relevant providers. The build contains no personal tax-number value. GitHub Actions has `PUBLIC_CLARITY_PROJECT_ID` unset, so Clarity remains inactive and is omitted from the privacy disclosure.
- The live readiness script checks sitemap URLs, static outputs, Markdown negotiation, redirects, indexability, and generated-content parity; it was run against both hostnames after deployment (details below).

## Pre-release baseline

Before the release push, no production form submission, notification, or deployment had run. GitHub and Wrangler CLI auth were available. Fresh GitHub refs confirmed `origin/master` and `origin/develop` were both at `0d29b99`; local `develop` was a fast-forward candidate 18 commits ahead of both. Local `master` was 12 commits behind `origin/master` and an ancestor of local `develop`; it was promoted with a normal fast-forward push.

At the pre-release baseline, apex and www both returned `/de/` directly with 200, so apex did not redirect to www. The four target landing pages returned 200 with matching `noindex` meta and `X-Robots-Tag` directives. The Worker and indexability changes below address those findings.

## Published release and verification

- Release commit: `5d46256b1d0dda130f59ab01d665959accdc79a4`.
- Production workflow: [Deploy to Cloudflare Workers, run 35783317257](https://github.com/project-codum/vibeperform-astro-page/actions/runs/35783317257). It completed successfully: dependency install, build and all 62 tests, D1 migration, Worker/static asset deployment, and CI live verification against `www.vibeperform.com` all passed.
- Additional apex verification: `npm run verify:live -- https://vibeperform.com` passed, including the apex-to-www redirect, 42/42 sitemap routes, all 161 built public files, and the four newly indexable DE/EN landing pages. The verifier also confirmed static output parity, Markdown negotiation, and redirects.
- Independent production review sampled 20 DE/EN pages and confirmed reciprocal language links, all eight blog preview images, and current sole-proprietor identity on About and legal pages.
- Production form E2E: submitted through the German Handwerksbetriebe UI as a clearly labeled release test. The UI returned success reference `bf5d760d-2ec2-416c-a65d-f2b2ff028cb0`; the matching D1 row has `email_sent_at`, a provider message ID, and no delivery error; Gmail search found that exact notification in INBOX. These are separate checks for form acceptance/storage, provider send confirmation, and inbox receipt. The test row and email are intentionally labeled `RELEASE TEST` for identification.
- `PUBLIC_CLARITY_PROJECT_ID` was unset in GitHub Actions, so Clarity remains inactive; no Clarity activation is claimed.

The workflow deploys on a `master` push or manual dispatch. This report-only update belongs on `develop` and should not be promoted to `master` or trigger another production deployment.
