# F02: website and business-profile guides

Prepared 30 September 2026 in the SEO P1 checkout. Six original articles form three reciprocal German/English pairs, authored by Marlon Dietrich. No invented customer case, price, quantified outcome, ranking guarantee or automatic profile eligibility is stated. Examples are explicitly illustrative.

## Coverage

1. **Website content checklist:** customer questions, service boundaries, real work examples, usable contact routes, accurate service area, permissions, review before publication and handover for updates.
2. **Ongoing support checklist:** distinction between content care, system-dependent technical tasks and development; concrete scope, accounts, ownership, publication approval, handover, checks and conditional use of analytics. No automatic hosting/maintenance inclusion and no mandatory publishing frequency.
3. **Profile/website consistency:** existing profile and access, business name, contact, hours, service areas and real services; distinct treatment of customer-facing location and hidden profile address; no duplicate profile shortcut; business confirmation and verification of visible changes.

The knowledge overview now leads with the three website/profile guides, then shows AI articles under a separate supplemental heading. Text-only guides omit cover markup rather than request missing images. Both locale overviews use the shared component. New guide order is content → support → profile (frontmatter `category: website`, `guideOrder: 1/2/3`).

## Sources

Existing service scope was checked in `src/data/serviceDetails.ts` and website content approach in `src/data/websiteStoryContent.ts`. The new articles introduce educational planning recommendations rather than additional commercial inclusions.

Primary Google sources opened and reviewed on 30 September 2026:

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=de — readable/current content, titles and links, image descriptions, no required word count or search ranking guarantee.
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=de — people-first content and avoiding superficial freshness changes.
- https://support.google.com/business/answer/3038177?hl=de — truthful business name, location/address treatment, company-managed contact and profile guidelines.
- https://support.google.com/business/answer/7091?hl=de — local ranking factors and no purchasable fixed local position.

German pages link German documentation; corresponding English pages link English versions.

## Verification in this worker

- All six Markdown files have reciprocal alternate-locale links to existing source files.
- All internal article/service links resolve to existing source routes.
- Each article provides five content sections suitable for the existing contents navigation.
- Dates are 2026-09-30; reading time estimated at 200 words/minute, rounded up (German guides: 4/3/3 minutes; English guides: 4/4/4 minutes).
- Existing knowledge test now permits the text-only featured class, checks guide-first ordering and rejects empty/undefined image URLs. Test syntax check passed.
- Responsive image component integration was reviewed by technical worker; image rendering internals are owned by that worker.

Build, rendered layout verification, complete test suite and deployment are the coordinating agent's responsibility. No worker build, commit or deployment was performed.
