# Umami Cloud

Website-ID: `f4d32a51-9990-49dc-8daf-388a72a62b74`.

Shared head: `ConsentManagerHead.astro` includes `UmamiAnalytics.astro`. Its loader appends the supplied deferred `https://cloud.umami.is/script.js` tag to document.head after complete stored CMP approval. Unknown, partial or rejected consent leaves it unloaded. Local previews do not track. The before-send hook checks consent on each payload and blocks subsequent transmissions after revocation for the remainder of the document. No guessed CMP vendor ID is used; granular opt-in is not enabled.

URL queries/fragments are excluded, referring URLs stripped of query and fragment. No questionnaire or form field values are sent. Existing Google Analytics and Clarity remain configured independently.

DE/EN privacy notices document the integration. Tests cover absence of consent, partial consent, previews, once-only load, supplied ID, payload filtering, withdrawal and presence in shared built heads.

Provider documentation: https://docs.umami.is/docs/tracker-configuration and https://umami.is/privacy . A live source/deployment check proves installation; actual dashboard statistics require a consenting visitor and access to the Umami account.
