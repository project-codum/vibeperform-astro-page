# PHP2Shell article publication handoff

Release source prepared on 23 October 2026 at `/de/blog/php2shell-sicherheitsluecke-webseite/`.

## Content and search metadata

- Published frontmatter (`draft: false`) with publication and modification date 2026-10-23. This date is the authorized release date; deployment still needs completion.
- Author Marlon Dietrich, Person schema, linked to `/de/ueber-uns/`; no invented job title.
- User-reviewed V9 reader text, emphasis, native explanation cards and questionnaire preserved. One dated note adds the PHP project's further security advisory published on 23 October, with the PHP archive source, as checked by the coordinating agent.
- Visible header teaser remains hidden only for this article. SEO description, canonical URL, social metadata/image, and BlogPosting remain present.
- The German knowledge overview, generated Markdown, sitemap and llms discovery files now include the article. No English translation is claimed.
- The inquiry form is in live mode. The draft label and preview-only note do not appear in the built page. Fields are updateFrequency, contentOwner, updateObstacle and email; deployment of its route and D1 migration belongs to the release coordinator.

## Verification

`npm test` builds all pages and runs the complete test suite. The former draft-only test was replaced with `tests/php2shell-publication.test.mjs`, checking discoverability, publication metadata, author/profile, canonical/Markdown URLs, social image and live-mode form fields. Shared knowledge-page tests also verify article navigation and generated Markdown.

The build HTML was inspected statically. No browser access was attempted because the existing security-policy restriction still applies. Earlier screenshot versions are not evidence of this release's final dated advisory.

No commit, push, migration or deployment was performed by the frontend agent. The release coordinator owns those actions and final live verification.
