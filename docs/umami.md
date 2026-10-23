# Umami Cloud

Website-ID: `f4d32a51-9990-49dc-8daf-388a72a62b74`.

The shared head directly includes the supplied deferred cloud.umami.is/script.js tag through UmamiAnalytics.astro. data-domains restricts collection to vibeperform.com and www.vibeperform.com. Query strings and fragments are excluded; the before-send hook also strips them from referrers. Form values and questionnaire answers are not passed to Umami.

At the owner's explicit request, ConsentManagerHead.astro comments out the CMP setup and its dependent Google Analytics/Clarity components. Their source remains available for reactivation. No CMP scripts/preconnects or Google/Clarity scripts are rendered. DE/EN privacy notices reflect this state.

Verification covers all built HTML heads and referrer sanitisation. Dashboard receipt needs access to the Umami account; deployment/source checks alone do not establish actual statistics.

Sources: https://docs.umami.is/docs/tracker-configuration and https://umami.is/privacy .
