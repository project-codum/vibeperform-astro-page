# Performance Audit Report

## Verdict

Yes. Compared with merge base `1997599`, this branch introduces a measurable performance regression. The main cause is commit `31de20e` (animated cursor orbit), which adds GSAP to every page. Commit `7199957` (AI image disclosures) adds no JavaScript and has a much smaller payload cost.

The regression does **not** breach the skill's high-priority lab thresholds in this controlled test: current median LCP remained below 2.5 seconds and CLS remained below 0.1. It is still worth fixing because the cursor is decorative, the extra JavaScript is global, and mobile devices download/evaluate it even though the cursor is hidden there.

## Scope and method

- Base: `1997599` (`origin/master` merge base)
- Cursor-only state: `31de20e`
- Current branch: `7199957`
- Page: German homepage (`/de/`)
- Builds: production Astro builds from clean Git archives, using the same installed dependencies
- Browser: headless Chrome, three runs per state and viewport, median reported
- Throttling: 4x CPU slowdown, 150 ms latency, 1.6 Mbps download
- Desktop viewport: 1365 x 768; mobile viewport: 390 x 844 with touch input
- Third-party requests were blocked identically in all runs to isolate branch-owned code

These are comparative local lab measurements, not CrUX real-user data. The absolute timings benefit from localhost delivery; the deltas are the useful signal. No Lighthouse score or INP measurement was available. Synthetic pointer task time is a diagnostic and is not presented as INP.

## Measured results

### Desktop medians

| Metric | Base | Cursor commit | Current branch | Current vs base |
|---|---:|---:|---:|---:|
| Lab LCP | 736 ms | 844 ms | 848 ms | +112 ms (+15.2%) |
| Lab CLS | 0.000 | 0.000 | 0.000 | no change |
| First-party encoded bytes | 228,901 | 257,269 | 257,530 | +28,629 (+12.5%) |
| Script encoded bytes | 49,387 | 77,350 | 77,609 | +28,222 (+57.1%) |
| Script requests | 2 | 3 | 3 | +1 |
| Main-thread task time through settled load | 335 ms | 457 ms | 460 ms | +125 ms (+37.2%) |
| Script time through settled load | 65 ms | 86 ms | 88 ms | +23 ms (+35.3%) |
| Task time during 30 pointer moves | 246 ms | 351 ms | 363 ms | +117 ms (+47.4%) |

### Mobile medians

| Metric | Base | Cursor commit | Current branch | Current vs base |
|---|---:|---:|---:|---:|
| Lab LCP | 720 ms | 848 ms | 876 ms | +156 ms (+21.7%) |
| Lab CLS | 0.000 | 0.000 | 0.000 | no change |
| First-party encoded bytes | 166,842 | 195,210 | 195,351 | +28,509 (+17.1%) |
| Script encoded bytes | 1,309 | 29,272 | 29,336 | +28,027 |
| Script requests | 1 | 2 | 2 | +1 |
| Main-thread task time through settled load | 193 ms | 223 ms | 249 ms | +56 ms (+28.8%) |
| Script time through settled load | 10 ms | 23 ms | 24 ms | +14 ms |

Mobile pointer work did not regress because the media query disables the effect on coarse/touch input. The loading cost remains because `import { gsap } from 'gsap'` is static and therefore fetched and evaluated before the media query decides not to activate the cursor.

## Production bundle attribution

### `31de20e` — animated cursor orbit

- Adds 71,464 raw bytes / 28,031 gzip bytes of JavaScript to the built site.
- Adds one JavaScript request to the homepage.
- Adds 1,469 raw bytes / 405 gzip bytes of shared CSS.
- Registers document-level pointer listeners on eligible desktop devices.
- Runs three continuous orbit animations plus one continuous halo animation while enabled.
- Accounts for nearly all of the branch's measured JavaScript and interaction regression.

Assessment: **material regression for a decorative feature**.

### `7199957` — AI image disclosures

- Adds no JavaScript beyond the cursor state.
- Adds 593 raw bytes / 65 gzip bytes of shared CSS.
- Adds 2,446 raw bytes / 583 gzip bytes to the German homepage HTML.
- Adds 33,729 raw bytes / 7,445 gzip bytes of HTML across all 33 generated pages.
- Uses small static badges, container queries, and `backdrop-filter: blur(6px)`.

The lab medians moved slightly from the cursor-only state to current HEAD, but the static payload evidence shows this commit is a minor contributor and the run-to-run timing difference is too small to attribute confidently. Its runtime impact is low compared with the cursor commit.

Assessment: **small payload increase; no independent JavaScript regression**.

## Repository-only finding

Commit `7199957` also adds five PDFs under `docs/reports/`, totaling 501,637 bytes. They are not copied into `dist/`, so they do not affect page loading. They do increase clone/fetch size and their filenames suggest personal insurance/administrative documents unrelated to this UI branch. They should be removed from the branch and, if the repository is public or broadly shared, treated as a potential sensitive-data exposure.

## Recommended action

1. Remove the static GSAP import from `NavBar.astro`. Prefer a small native `requestAnimationFrame`/transform implementation, or dynamically import GSAP only after the desktop/fine-pointer media query matches.
2. Keep the disclosure component; its cost is small. If paint traces later identify badge cost, remove `backdrop-filter` before changing the semantic disclosure markup.
3. Remove the five unrelated PDFs from the branch/history before merging.
4. After optimizing the cursor, repeat the same branch comparison and run Lighthouse against a deployed preview with real third-party behavior. Use CrUX only after enough real-user data exists.

## Priority

- **Medium:** global decorative JavaScript regression from the cursor commit.
- **Low:** disclosure markup/CSS overhead.
- **Low data limitation:** no real-user CrUX, Lighthouse score, or INP for the unpublished branch.
