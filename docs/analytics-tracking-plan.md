# GA4 and UTM tracking plan

## Audit snapshot

The live GA4 property was reviewed on 6 August 2026. The reporting window was 9 July to 5 August 2026.

- 80 sessions: 59 Direct (73.75%) and 21 Organic Search (26.25%).
- 15 active users, 323 page views, 687 events and zero key events.
- Only automatically collected events existed: `page_view`, `user_engagement`, `session_start`, `scroll`, `first_visit` and `click`.
- `/de/` accounted for 186 views from 13 active users. The resulting 14.31 views per active user is a strong signal that internal testing or repeated reloads dominate the sample.
- Organic Search sessions showed only five seconds of average engagement per session in this small sample. This is directional, not a reliable page-quality conclusion.
- No sessions appeared in campaign channels such as email, social or paid media. Existing campaign attribution cannot be evaluated from this dataset.
- Both slash and non-slash paths appear in the page report, for example `/de/workshops` and `/de/workshops/`. This fragments reporting until historical rows age out; current site generation already uses trailing slashes.

## Measurement model

The site now uses one consent-gated GA4 component instead of copying the tag loader into every page. No analytics event is sent before the Google tag has loaded following consent.

| Event | Meaning | GA4 treatment |
| --- | --- | --- |
| `page_view` | A page was viewed | Automatically collected |
| `cta_click` | A visitor chose an internal next step | Diagnostic event, not a key event |
| `contact_start` | A visitor opened the booking calendar, email link or validated mail-app contact flow | Recommended first key event |
| `language_switch` | A visitor changed the site language | Diagnostic event |
| `generate_lead` | A booking or enquiry was actually completed | Reserved for a future confirmation page or verified integration; do not fire on a click |

Custom event parameters:

- `cta_name`: stable action identifier, such as `book-discovery-call`
- `cta_location`: stable placement, such as `home-hero` or `footer`
- `link_type`: `calendar`, `email`, `anchor`, `internal`, `external` or `button`
- `target_locale`: only for `language_switch`

Never include names, email addresses, free-text form values or other personal data in event parameters or UTM values.

## UTM standard

Use UTMs only on links placed outside `vibeperform.com`. Never add UTMs to navigation, locale switches or other internal links because they can overwrite the session's original campaign attribution.

Required parameters:

- `utm_source`: platform or partner, for example `linkedin`, `newsletter` or `partner-name`
- `utm_medium`: controlled channel, for example `social`, `paid_social`, `email`, `cpc`, `display`, `affiliate` or `referral`
- `utm_campaign`: durable initiative name using `year-period-offer`, for example `2026-q3-explore-workshop`

Optional parameters:

- `utm_content`: creative or placement, for example `founder-post-01` or `newsletter-hero`
- `utm_term`: paid-search keyword only
- `utm_id`: stable campaign identifier when one exists

All values are lowercase ASCII with hyphens. Do not use spaces, inconsistent aliases (`li`, `linkedin.com`, `LinkedIn`) or personal data.

Build a tagged link locally:

```sh
npm run utm -- https://www.vibeperform.com/de/workshop/explore-workshop/ \
  --source linkedin \
  --medium social \
  --campaign 2026-q3-explore-workshop \
  --content founder-post-01
```

## GA4 property follow-up

These property changes were not made during the code update:

1. Mark `contact_start` as a key event after it arrives in GA4.
2. Register event-scoped custom dimensions for `cta_name`, `cta_location` and `link_type`; register `target_locale` only if language-switch reporting is useful.
3. Define internal traffic for the team and development locations, then test the filter before activating it.
4. Link the verified Search Console property to analyse organic queries and landing pages. This is a separate data-sharing setting and should be approved deliberately.
5. Keep `generate_lead` unused until a successful booking or enquiry can be verified through a confirmation page or integration.

## Validation checklist

- Before consent or after rejection: no request to `googletagmanager.com` and no GA4 event transmission.
- After analytics consent: exactly one Google tag request and one initial `page_view`.
- A primary calendar or email CTA sends one `contact_start` with `cta_name`, `cta_location` and `link_type`.
- An internal tracked CTA sends one `cta_click` and does not change session campaign attribution.
- A locale switch sends one `language_switch` with `target_locale`.
- A tagged inbound URL appears under session source/medium and session campaign in GA4 Realtime/DebugView before campaign rollout.
