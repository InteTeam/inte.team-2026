# Legal pages: Privacy Policy and Terms & Conditions

Started 2026-10-21 on branch `legal-pages`. The Privacy Policy draft is `privacy.html`. The T&Cs are an
outline only (section "Terms & Conditions" below): a Scottish solicitor writes or checks the final wording.

**Do not merge while `privacy.html` still has gaps.** Every unknown is marked in the page as
`<mark class="gap">`. Before merging, this must print `0`:

```
grep -c 'class="gap"' privacy.html
```

## Who the operator is

- **Decided (Piotr, 2026-10-21):** Piotr Ficner, sole trader, trading as Inte.Team. No Ltd company.
- **Decided (Piotr, 2026-07-05, for farmsinscotland):** legal and data contact `support@inte.team`;
  Inte.Team does not sell, rent or trade personal data, for any product.
- **Decided (Piotr, 2026-10-21):** business address 43 Norman Rise, Livingston, EH54 6LY (Q1), as in
  the footer ("Private Home, By Appointment Only").
- ICO data protection fee **paid 2026-10-21** (Piotr). Application number C2065527.
  **Decided (Piotr, 2026-10-21):** publish now with "fee paid, registration number shown once issued"
  (Q2). **Follow-up after merge:** when the ICO issues the number (usually "Z" + digits), replace
  that sentence in `privacy.html` section 1. The application number is not published.
- **Decided (Piotr, 2026-10-21):** not VAT registered (Q3). The VAT line is removed.

## Answers from Piotr, 2026-10-21 (Q4-Q10)

| # | Answer | Where in `privacy.html` |
|---|---|---|
| Q4 | Chat AI uses only Inte.Team's own LLMs on own hardware at 43 Norman Rise. No third-party AI | 3, Website chat |
| Q5 | Contabo servers are in Germany (EU) | 5, Hosting + transfers line |
| Q6 | Customer email goes out from own Mailu servers on Contabo | 5, Email |
| Q7 (SMS) | Own SMS gateway at Norman Rise, built in-house, Smarty SIM. AI never sends SMS; it can draft templates/replies that a person must edit before sending. CRM automatic SMS = team-made templates filled with booking details | 3, Phone/SMS; 5, SMS |
| Q8 | WhatsApp Business account via Meta's API | 5, WhatsApp |
| Q9 | Dojo, SumUp, Monzo Business bank transfer, cash | 5, Payments |
| Q10 | Drop-off points get no customer data, only the booking ID; the CRM does the rest | 5, Drop-off partners |

## Answers from Piotr, 2026-10-21 (Q7 phone, Q11-Q14, maps)

| # | Answer | Where in `privacy.html` |
|---|---|---|
| Q7 (phone) | Calls run through Webex and Twilio, plus Smarty when calls are forwarded to a mobile | 5, Phone |
| Q7 (recording) | **Decided (Piotr, 2026-10-21):** calls are not recorded. Voice AI calling (e.g. vapi.ai) is planned. Policy says "we do not record; we will update this policy first and tell you at the start of each call" | 3, Phone/SMS |
| Q11 | 6 years after the last job | 6 |
| Q12 | CRM server logs roll over 14 days. Website container logs had no limit (Docker default), so `docker-compose.yml` now caps them (2 x 5 MB) and the policy says "kept briefly, overwritten automatically" | 6 |
| Q13 | Chat slice B is in testing; the policy says "we are introducing" it. Reword when it is live | 3, Website chat |
| Q14 | Customer-data servers admin-reachable only over WireGuard; backups encrypted; backups go to Google Cloud Storage and Google Drive (Workspace) | 5, Google; 9 |
| Maps | **Decided (Piotr, 2026-10-21):** click-to-load. Built: `map-consent.js` + `.map-consent` in `styles.css`, on `index.html` and the `electronicsrepairs.html` "Visiting Us?" pop-up. Checked in Chrome: zero Google requests before the click, map loads after | 7 |

Publication date set to 21 October 2026. If the merge goes live on a later day, change it.

**Merge gate passed 2026-10-21:** `grep -c 'class="gap"' privacy.html` prints 0.

**Follow-ups after merge:** ICO registration number (Q2); chat slice B wording when live (Q13); call
voice AI calling (planned): before it goes live, update section 3 + the processor list (provider,
where audio/transcripts go, retention), add the call-start announcement, and do a DPIA (new tech on
customer voices). A hosted provider like Vapi also breaks the "own hardware only" stance from Q4,
so decide that first; production needs `docker compose up -d` once so the
log cap applies.

**Poka-yoke (Q4):** `inteteam-ai` supports Gemini, Claude and OpenAI. The policy now promises chat text
never reaches an outside AI provider, so on production those provider keys must stay empty. Enabling
any of them (even as a fallback) needs this policy changed first.

## Scope

- **Proposed, pending confirmation:** one policy for the inte.team website and the repair service
  (customer records in the CRM). Membership, the e-wallet, oorhq.inte.team and the other products
  keep their own policies or get one later. Ruled out: one policy covering every Inte.Team product,
  because each product would then have to be checked before any change to it (future-proof lens).
- Web development clients (Inte.Team as processor for a client's site) are out of scope here. Their
  contracts cover that.

## Facts checked (2026-10-21)

Checked in code or on the live endpoints, not assumed:

| Fact | Where checked |
|---|---|
| No analytics, ad or tracking scripts on any page | grep of every `.html` and `script.js` for gtag, GTM, analytics, Plausible, Umami, fbq, Clarity |
| The site stores one thing in the browser: `localStorage` `no-motion` (the visitor's own reduce-motion choice). No cookies of its own | `script.js:15-27` |
| Outside services the pages load: the CRM at `crm.bookrepaironline.co.uk` (forms, chat), Google Maps (homepage map on every visit, a second map in the repairs page's "First time here?" pop-up) | grep of every page for external URLs |
| Form embed sends no cookies and stores nothing in the browser | `inteteam_crm` `public/js/form-embed.js` on origin/main ff51c42 |
| Chat panel sets no cookies and has no session (the route drops cookie/session/CSRF middleware) | `resources/js/utils/webChatEvents.ts`; website-chat memory note 10-11 |
| Form fields (HQ, Petzone, D&J Records, call-back, car boot sale) | `GET /api/forms/{uuid}` on production, 2026-10-21 |
| Chat retention: no confirmed contact = deleted after 30 days; confirmed email = 12 months after last message; CRM backups rotate over 2 weeks, so fully gone at most 2 weeks later | `inteteam_crm/docs/features/website-chat/README.md` decisions 21 and 27 (Piotr, 2026-10-08) |
| Chat answers come only from the business's knowledge base, through `inteteam-ai` | website-chat README flow 4 |
| `inteteam-ai` can call Gemini, Claude or OpenAI when configured; the draft-reply endpoint is local-only by design | `inteteam-ai/.env.example` (local checkout, may be behind origin) |
| Website and CRM run on the Contabo 12GB VPS, behind Cloudflare | memory `project_contabo_deployment` (not re-checked on the server) |
| CRM database backups go to Google Drive (restic) | memory `project_business_infra` / `dr_gap` (not re-checked) |

## Not checked

All of Q1-Q14 were answered by Piotr on 2026-10-21 (tables above). The answers are his, not
re-checked on the servers.

## Proposed choices (pending confirmation)

1. **Decided (Piotr, 2026-10-21), built:** **Google Maps loads only on click** ("Show map" placeholder) on the homepage and repairs page.
   Today the homepage map loads on every visit and Google can set cookies before the visitor has
   agreed. A click-to-load map needs no cookie banner. Ruled out: a cookie banner. More friction for
   every visitor, and it needs consent-recording logic (poka-yoke + complexity lenses).
2. **One policy page, `privacy.html`, linked from every footer** (the shared `partials/footer.html`
   plus the three bespoke footers on `electronicsrepairs.html`, `partnership-info.html`,
   `sales-engineering.html`). Links are added in this branch but only go live with the page.
3. **The policy says "we do not use automated decision-making with legal or similar effects"**:
   chat answers are information only and staff handle everything else.
4. **Lawful bases:** contract for bookings and repairs; legal obligation for accounting records;
   legitimate interests for answering enquiries, chat and security logs; consent for the car boot
   sale interest list.

## Terms & Conditions (outline only, not drafted)

Not written by Claude: a Scottish solicitor should write or check the wording. Scots law differs
from English law on points that matter here (e.g. uncollected goods: the Torts (Interference with
Goods) Act 1977 does not apply in Scotland), and consumer law limits what can be excluded
(Consumer Rights Act 2015). What the business rules are is Piotr's call; the outline lists what
must be decided first.

**Decided (Piotr, 2026-10-21):** T&Cs are paused. Before any rules or wording, the first step is a
full inventory of every service Inte.Team offers (repairs, drop-off, membership/loaners, web
development, sales engineering, hosting/subscriptions, community projects, ...), then a plan for
which terms each needs. Do not jump straight into the T1-T13 table below.

Business rules to decide (Piotr):

| # | Rule | Known so far |
|---|---|---|
| T1 | Priority tiers and turnaround | Decided (Piotr, 2026-10-21): Low/Medium/High/Urgent, see `electronicsrepairs.html#turnaround` |
| T2 | Diagnosis: time cap and fee | Decided (Piotr, 2026-10-21): up to 1-2h bench time, then customer is contacted. Fee refundable if repair declined? **open** |
| T3 | Estimate approval: no work without approval | Stated on `pricing-repairs.html` |
| T4 | Warranty on repairs: length, parts vs labour, what voids it | **open** |
| T5 | Devices not collected: notice period, storage charge, what happens after | **open** (Scots law, solicitor) |
| T6 | Data on devices: customer backs up; we don't access files; liability for data loss | Partly stated on `pricing-repairs.html` |
| T7 | Pre-existing damage, liquid damage, devices that fail further during repair | **open** |
| T8 | Parts: OEM vs equivalent, customer's own parts | Stated on repairs page ("OEM when possible") |
| T9 | Payment: when due, methods, deposits for parts | **open** |
| T10 | Cancellation: 14-day right for bookings made online/off-premises, and how it works once a repair has started | **open** (Consumer Contracts Regulations 2013, solicitor) |
| T11 | Member loaner devices: deposit (e-wallet), damage, return | **open** |
| T12 | B2B: 60-day invoice terms, hourly rates | Partly on `pricing-repairs.html` |
| T13 | Governing law: Scots law, Scottish courts | Proposed |

## Lens check

- **Future-proof:** facts that change (processors, retention) are kept in one table here, so a
  change of provider means one doc edit plus one page edit. Ruled out: copying the farmsinscotland
  React page, since this site is static HTML.
- **Poka-yoke:** gaps are marked in the page and a grep must return 0 before merge, so a
  half-filled policy cannot go live by accident.
- **Team complexity budget:** plain static page, no build step, no cookie-consent tooling.
