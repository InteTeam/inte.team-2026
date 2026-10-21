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
- Address shown on the site today (footer partial): 43 Norman Rise, Livingston, EH54 6LY, "Private
  Home, By Appointment Only". Using it as the policy address is **Proposed, pending confirmation** (Q1).

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

## Not checked (needs Piotr or a server check)

Each is a gap in `privacy.html`, numbered to match.

| # | Question | Why it matters |
|---|---|---|
| Q1 | Is 43 Norman Rise the address to publish as the business address? | The policy must name where the controller is |
| Q2 | Has the ICO data protection fee been paid? Registration number? | Most businesses handling customer data must pay it; the number goes in the policy |
| Q3 | VAT registered? Number? | Shown with the business details if so |
| Q4 | Does the production chat AI ever use Gemini, Claude or OpenAI, or only Inte.Team's own servers (Ollama on the Dell / P40)? Including any fallback | The policy must say truthfully where chat text goes |
| Q5 | Which Contabo region are the VPSes in (Germany, UK, other)? | Says where data is stored |
| Q6 | How does Inte.Team send emails to customers: own mail server (Mailu) or Resend? | Processor list |
| Q7 | How are SMS sent (own gateway phone, Twilio, other)? Are phone calls recorded (Twilio/Webex call history)? | Processor list; call recording must be stated |
| Q8 | WhatsApp: the forms offer it as a contact method. Business app on a phone, or the API? | Meta is then a processor / independent controller |
| Q9 | How do customers pay (card terminal provider, bank transfer, online)? | Processor list |
| Q10 | What do Petzone and D&J Records see: name and booking reference only, or more? | They handle devices on Inte.Team's behalf |
| Q11 | How long are customer and repair records kept in the CRM? | Retention section. HMRC needs business records kept at least 5 years after the 31 January Self Assessment deadline; **Proposed:** 6 years after the last job, then deleted |
| Q12 | How long are web server logs (nginx in Docker, Cloudflare) kept? | Retention section |
| Q13 | Is chat slice B (leave your email, 6-digit code) live yet? | Describe only what visitors can actually do; the text is written to cover it |
| Q14 | Are all servers holding customer data (CRM 12GB VPS, Mailu 8GB VPS, backups) admin-reachable only over WireGuard? Is the restic backup to Google Drive encrypted (restic's default) with the key kept off Google? | Security section. Memory says the 3rd VPS still has public SSH; whether it holds customer data was not checked |

## Proposed choices (pending confirmation)

1. **Google Maps loads only on click** ("Show map" placeholder) on the homepage and repairs page.
   Today the homepage map loads on every visit and Google can set cookies before the visitor has
   agreed. A click-to-load map needs no cookie banner. Ruled out: a cookie banner. More friction for
   every visitor, and it needs consent-recording logic (poka-yoke + complexity lenses). Not built
   yet: separate small change once agreed.
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
