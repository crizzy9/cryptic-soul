# Website analytics

The site integrates Umami for audience and content analytics. It works with Umami
Cloud or a public HTTPS self-hosted tracker; it does not require a server API key.
The owner's public Cloud website ID and tracker URL are configured in
`src/config.ts`. No login email, password, or API key is required in site code.
The configured integration becomes active when deployed to the production domain.

## Questions and measurements

| Question | Measurement |
| --- | --- |
| How do visitors find the site? | Referrer domain, landing page; browser/device and approximate geography supplied by Umami |
| Which articles attract interest? | Page views and referrer breakdown by article path |
| How far do readers get? | `article_progress` with `percent` at 25, 50, 75, 90; once each per article navigation |
| Which visits show sustained attention? | `article_engaged` with `seconds: 60`; once per navigation after 60 accumulated visible, focused seconds |
| Which projects get clicks? | `project_click` with the public project slug, including project links from home/CV and repository links from project entries |
| Does the resume attract interest? | `resume_download` when its PDF link is clicked |
| Do visitors try to contact me? | `contact_click` with `method: email` or `phone`; no address/number |
| Which other sites do visitors open? | `outbound_click` with the destination hostname only |

A scroll or focused-time event is a behavioral proxy, not proof of comprehension.
A download/contact click does not prove transfer completion or message delivery.
There are no session recordings, heatmaps, personal identities, advertising IDs,
form capture, error payloads, or per-user `identify()` calls in this integration.

## Connect Umami Cloud (free Hobby tier)

1. Create/sign in to an Umami Cloud account and choose the free Hobby plan. Do not
   enter a paid trial or enable paid add-ons for this setup.
2. Add one website: name `CrypticSoul`, domain `crypticsoul.dev`.
3. Open that website's edit/settings screen and copy the **website ID** and exact
   tracker **script src** from its Tracking code section. These are public tracker
   settings, not dashboard credentials. Keep login credentials/API keys out of code.
4. The tracking code supplied by the owner is already the shared default in
   `src/config.ts`. No Netlify environment changes are required for this Cloud
   setup. To move to another Umami instance later, override both values with these
   build-time variables in Netlify's **Production** deploy context:

   ```text
   PUBLIC_UMAMI_WEBSITE_ID=<website UUID from Umami>
   PUBLIC_UMAMI_SCRIPT_URL=<HTTPS script src from Tracking code>
   ```

   An explicitly empty `PUBLIC_UMAMI_WEBSITE_ID` disables collection for that build.

5. Build and review the site, then deploy through the normal human-approved
   publication workflow. Adding environment variables alone does not change an
   already-built deployment; the site must be rebuilt.
6. Visit the published website with DNT/GPC off and without an ad blocker. Confirm
   one page view in the Umami dashboard, navigate to another page, and confirm one
   more view. Check Events after clicking a project, resume, and contact link.
7. On `/privacy`, turn analytics off; confirm subsequent navigation sends no Umami
   collection calls. Re-enable there if desired. Use this opt-out in your own
   browser to keep your editing visits out of production statistics.

For self-hosting, use your instance's public HTTPS script URL and website UUID.
The integration requires the `track(callback)` and `data-before-send` APIs
(Umami 2.18+; use a current maintained release). An authenticated private tracker
behind a login will not work for public visitors. Deploying a new analytics server
is separate infrastructure work and is not part of this repo change.

## Dashboard

Use the website overview for visitors, visits, referrers, pages, devices, browsers,
operating systems, approximate countries, and time trends. Use **Events** and its
**Properties** view for progress percentages, active-time milestones, project slugs,
and contact methods. Filter by page URL to compare particular articles. Configure
available goals/funnels around project clicks, resume downloads, and contact clicks.
Do not assume a report or paid feature is available on every plan/version.

At the time of setup, the official pricing page lists Hobby at $0/month for one
website, up to 100K events/month and six months of retention. Page views, custom
events, and stored custom event properties consume usage, so 100K events does not
mean 100K visitors. Monitor your account's usage; no paid upgrade is authorized.
The integration batches no hidden replay or error data and emits at most four
scroll milestones plus one engagement milestone per article navigation.

## Privacy and collection boundaries

- Production builds and the `crypticsoul.dev` / `www.crypticsoul.dev` hostnames only.
  A non-production Netlify `CONTEXT`, development build, draft page, missing ID, or
  invalid script URL disables collection.
- `navigator.doNotTrack`, Global Privacy Control, and the documented
  `localStorage['umami.disabled']` opt-out are honored. If local storage cannot be
  read, collection stays off. No persistent analytics identifier is assigned here.
- The tracker loads at most once. Astro page-load events trigger manual pageviews,
  with auto-tracking disabled to avoid duplicate history-based views.
- Page queries/fragments are removed; external referrers become origin only.
  This intentionally sacrifices UTM campaign attribution and referrer path detail.
  If campaign reporting is later needed, define an explicit safe campaign schema
  before collecting those parameters.
- A `before-send` hook rechecks exclusions and sanitizes every outgoing payload.
- Umami still receives network requests and processes data for approximate location
  and session estimation; the integration is not a promise of zero data processing.
  The site discloses this on `/privacy`. Hosting logs remain separate.
- Visits blocked by privacy settings, extensions, network failures, or scripts
  disabled will not appear. Collection begins after activation, never retroactively.

## Verification

Run `pnpm build`. Check a normal production build contains the configured public
website ID, while development and deployment previews keep collection disabled. For
behavioral tests, use a temporary test website ID and intercept the tracker/network
in a browser test; do not send test events to the real production account. Verify
one initial/SPA pageview, query and referrer stripping, all event classes, browser
opt-outs, local opt-out/opt-in, previews/drafts, and failure to load the tracker.

Primary references: [Umami pricing](https://umami.is/pricing),
[tracker configuration](https://docs.umami.is/docs/tracker-configuration),
[tracker functions](https://docs.umami.is/docs/tracker-functions),
[event data](https://docs.umami.is/docs/event-data),
[exclude your own visits](https://docs.umami.is/docs/exclude-my-own-visits), and
[privacy FAQ](https://docs.umami.is/docs/faq).
