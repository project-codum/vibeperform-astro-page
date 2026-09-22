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
- The live readiness script checks sitemap URLs, static outputs, Markdown negotiation, redirects, indexability, and generated-content parity. Run it against both `https://vibeperform.com` and `https://www.vibeperform.com` after deployment, then run the unique form notification E2E only against the released pages.

## Release state

Before deployment, no production form submission, notification, commit, push, or deployment had run. GitHub and Wrangler CLI auth are available. Fresh GitHub refs confirmed `origin/master` and `origin/develop` were both at `0d29b99`; local `develop` was a fast-forward candidate 18 commits ahead of both. Local `master` was 12 commits behind `origin/master` and an ancestor of local `develop`; promote with a normal fast-forward push and no force-push.

Read-only production GETs show both apex and www currently return `/de/` directly with 200, so the apex does not yet redirect to www. All four target landing pages currently return 200 with matching `noindex` meta and `X-Robots-Tag` directives. The Worker change and updated workflow live checks address those findings.

The existing workflow deploys on a `master` push or manual dispatch. It runs `npm test`, applies remote D1 migrations, deploys the Worker and assets, then calls `verify:live` against `www.vibeperform.com`. Check the post-deploy workflow and both hostnames, then run the unique form notification E2E after the new release is live.
