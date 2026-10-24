# How we operate: the customer journey page

Started 2026-10-24 on branch `how-we-operate`. **Built 2026-10-24** (same branch): `how-we-operate.html`,
`how-we-operate.css`, `how-we-operate.js`, plus the repairs page changes, `sitemap.xml` and `llms.txt`.
Not merged or deployed.

## Why

Customers ask on the phone and in the chat how booking, drop-off, payment and collection work. The site
has no single place that says it:

- The 8-step carousel on `electronicsrepairs.html` (`#process`) scrolls by itself, so on a phone it
  can't be read step by step. It also says nothing about payment or collection.
- The section called "How We Work" (`#how-we-work`, also in the section dock) is really the engineering
  workflow (microsoldering lab, QC), so "how it works" leads to the wrong content.
- Payment and collection are not described on any page (checked 2026-10-24: `repair-bookings.html`,
  `pricing-repairs.html`, `electronicsrepairs.html`, `llms.txt`).

Goal: staff can say on the phone "go to inte.team, Electronics Repairs, press *How we operate*", and the
customer finds the whole journey in one place.

## Decisions

- **Decided (Piotr, 2026-10-24): no CRM change.** First idea was a "How we work" button in the website
  chat. The chat's buttons are fixed in CRM code (`WebChatPanelService::buttons()`: Book a visit, My
  bookings, Phone and opening hours), so that needs a migration and an evening deploy. Ruled out for now.
  Can be added later as a per-widget link setting, so other CRM companies could use it too.
- **Decided (Piotr, 2026-10-24): a page of its own, linked from the very top of the repairs page.**
  A big "How we operate" button under the headline of `electronicsrepairs.html`, with the line
  "Click here to learn what to expect from us". Ruled out: moving the full steps to the top of the
  repairs page (pushes everything else down; no link of its own to text customers or list in
  `llms.txt`).
- **Decided (Piotr, 2026-10-24): design = circuit trace snake.** The timeline is a copper PCB trace from
  "You start here" to the review. Each step is a solder pad; the last one is an LED that lights green.
  Drop-off splits into parallel traces (HQ / Petzone / D&J Records) that join again at the bench.
  Phone: a straight trace down the left. PC: a snake across rows with 45° bends. As you scroll, current
  flows along the trace and lights each pad. Ruled out: repair tracker ticket, device journey map
  (both shown to Piotr 2026-10-24).
- **Decided (Piotr, 2026-10-24): mobile-first**, scaling up to a full-size PC monitor.
- **Decided (Piotr, 2026-10-24): list the page in `llms.txt` and `sitemap.xml`.** `robots.txt` needs no
  change: it lists no pages, allows everything and points at the sitemap.

## Proposed — pending confirmation

| # | Proposal | Lens |
|---|---|---|
| P1 | File `how-we-operate.html`, title "How we operate". Same phrase as staff use on the phone | Poka-yoke: what is said on the phone matches the button |
| P2 | Rename the engineering section on the repairs page from "How We Work" to "Engineering Workflow" (heading and dock label) | Poka-yoke: one name, one meaning |
| P3 | The "How does this work?" tile in "Start Here" links to the new page instead of `#process` | Poka-yoke |
| P4 | Replace the auto-scrolling carousel with a short static summary + "Full details →" link. The steps then live in one place only | Future-proof: no two copies to drift apart |
| P5 | Each step card says the same four things: **You do / We do / How long / Cost**. Times and prices are copied from the `#turnaround` section and `pricing-repairs.html`, never new numbers | Poka-yoke: a conflicting number on the domain is worse than none |
| P6 | Built as plain HTML + CSS + inline SVG with a small script (IntersectionObserver lights the pads). No libraries, no build step. On phone the trace is one CSS line, not an SVG path | Team complexity budget: anyone on the team can edit a step. Ruled out: one SVG path computed from card positions (breaks when text changes length) |
| P7 | With "No Animations" switched on (`body.no-motion`), the trace is drawn fully lit and nothing moves. Test with `localStorage.setItem('no-motion','true')` | Poka-yoke: the dock broke this way on 10-21 |
| P8 | Same dark slate base as the repairs page, plus copper (trace) and green (LED, finished) as this page's own accents | Consistent with the site, still its own look |
| P9 | Plain nav/footer shell (`styles.css` + SSI footer), page styles in its own CSS file, not Tailwind | Avoids rebuilding `tailwind.css`; mobile-first from scratch |
| P10 | Section dock: none, unless the page grows beyond ~3 screens | Dock rule in the site reference |

## Answers from Piotr, 2026-10-24

| Topic | Answer |
|---|---|
| Enquiry channels | Online or by phone. SMS, WhatsApp or email if the customer can wait |
| Booking confirmation | Email sent; it may land in Spam/Junk. Tell the customer to move it out so future emails arrive |
| Device received | SMS or email confirms we have received the device |
| Drop-off points | No access to customer data: they see only the booking ID and the time someone will show up. They cannot test the device |
| Estimate (Q5) | Agreed with the customer. If the repair stays within the agreed estimate, it is just done, no further confirmation |
| Deposit (Q2) | We try not to take down payments. Mostly only on TVs and lower-value items. When one is needed we make it clear |
| Ready for collection | SMS says the device is ready and asks the customer to call us to schedule collection. They can also schedule a visit themselves with **Chat with us** (bottom right on inte.team) |
| At collection | The customer gets a text message to confirm they are collecting the device |
| No SMS possible | Email instead, for every message above |
| Uncollected (Q7) | 30 days from our "ready for collection" message. A customer who can't collect in time should tell us. With no word from them, the 30-day cap applies |
| Shipping (Q8) | No insurance by default; agreed with each customer individually. "Insured shipping" in the carousel is wrong |
| Warranty (Q9) | Case by case: depends on who provides the parts, new or used, and whether it is a swap or a board repair |
| Members (Q10) | Members contact us directly; members get extra care (TLC) |
| Payment (Q1) | Whatever is left is squared up at collection |
| Where to pay (Q3) | Always with us, never at a drop-off point |
| Declined estimate (Q4) | The diagnosis fee is non-returnable |
| Where to collect (Q6) | Case by case |
| Members (Q11) | Keep the spare-device swap on the page, and add "contact us directly" |
| Over the estimate (Q12) | Yes, we contact the customer first |
| After 30 days (Q13) | A device not collected is taken as donated to Inte.Team by the customer. Any personal data is wiped before it is recycled or binned |
| Warranty told (Q14) | At collection |

## The journey (draft order)

| # | Step | Content (source) | Open |
|---|---|---|---|
| 0 | You start here | — | — |
| 1 | Enquiry / booking | Online form (`repair-bookings.html`) or phone; SMS / WhatsApp / email if you can wait. Confirmation email within 5 minutes; check Spam/Junk and move it out | — |
| 1.1 | Members | Spare-device swap if we have one; contact us directly; extra care | — |
| 2 | Drop-off (3 branches) | First visit: HQ, 43 Norman Rise, EH54 6LY, by appointment, we call to arrange a time. Returning: Petzone (Craigshill) or D&J Records (Bathgate), no call needed, show the booking ID. TV, Hi-Fi and High priority: HQ only (`repair-bookings.html`). Drop-off points see only the booking ID and arrival time, and don't test devices. We confirm by SMS/email once we have it | — |
| 3 | Diagnosis | Tiers High / Medium / Low; capped at 1–2 h bench time, then we contact you (`#turnaround`) | — |
| 4 | Estimate | Agreed with you. Within the agreed estimate we just go ahead; above it, we contact you first. Deposit only when needed (mostly TVs and lower-value items), always said up front. The diagnosis fee is non-returnable if you decline | Q15 |
| 5 | Repair | Repair tiers after parts arrive (`#turnaround`) | — |
| 6 | Quality control | Stress testing and final inspection | — |
| 7 | Ready for collection | SMS (or email): call us to schedule, or book a visit with Chat with us. Where to collect is agreed case by case. 30 days to collect from this message; tell us if you can't. After 30 days with no word, the device is taken as donated to Inte.Team: personal data wiped, then recycled or binned | — |
| 8 | Collection and payment | Text to confirm you are collecting. Whatever is left is paid now, always with us, never at a drop-off point. Methods: Dojo, SumUp, Monzo Business bank transfer, cash (privacy plan Q9). Shipping possible, insurance agreed individually | — |
| 9 | Warranty | Case by case (parts source, new/used, swap or board repair), told at collection | — |
| 10 | Review (LED) | Post-repair email (carousel) | — |

## Open questions (for Piotr)

Answered 2026-10-24: Q1–Q14 (see above).

Answered 2026-10-24 (Piotr):
15. Anything that must be paid up front is paid via a payment link sent to the booking email; work
    continues once it is paid. Never at a drop-off point.
16. Bubbles: "you can try". Built as example texts ("you'll get an SMS like:"), not the real template
    wording, which was not checked in the CRM.
17. Yes to P1–P10: all built.

**Flag (not a question):** the 30-day "taken as donated" rule is a terms-of-business clause. The page
states it as Piotr gave it; the T&Cs, which a solicitor checks (`docs/features/legal-pages/README.md`),
must say the same, and the "ready for collection" SMS should mention the 30 days so the clock is
visible to the customer. Not checked whether the current SMS template says it.

## Facts checked in the code (2026-10-24)

- Chat buttons fixed in `inteteam_crm` `app/Services/WebChat/WebChatPanelService.php` (`buttons()`), on
  `origin/main` ff51c42.
- Repairs page sections in order: `#overview`, `#why-we-do-it`, `#how-we-work`, `#start-here`,
  `#process`, `#turnaround`, `#partnership`. The "How does this work?" tile calls `scrollToProcess()`.
- `robots.txt`: `Allow: /` + sitemap line, no page list.

Not checked: how the page looks behind Cloudflare caching (purge needed after deploy, see the Cloudflare
cache note in memory).

## Before you plan checklist (audit 2026-10-24)

- [x] Doesn't duplicate another repo: static site only, CRM ruled out
- [x] Three lenses applied to each proposal (table above)
- [x] Every item labelled Decided or Proposed
- [x] Facts checked in the code listed; one not checked
- [x] All questions answered; built 2026-10-24
- [ ] MVP vs deferred: deferred = chat button (CRM), anything else Piotr adds

## What was built (2026-10-24)

- `how-we-operate.html`: plain nav/footer shell (SSI footer, so the chat button loads), hero with the
  You / We / Time / Cost legend, 10 pads (start, 8 steps, LED), "Good to know" rules, CTA.
- `how-we-operate.css`: phone = straight trace on the left. From 900px the JS sets `.is-snake`: 2
  columns, 3 from 1280px, rows alternate direction, U-turns through the side gutter (rounded corners,
  not 45° chamfers: plain CSS borders, no SVG). No positioning with `transform` (No Animations gotcha).
- `how-we-operate.js`: grid placement + segment classes; IntersectionObserver lights pads while
  scrolling. No JS, No Animations or reduced motion = everything drawn lit.
- `electronicsrepairs.html`: "How we operate" button under the headline; `#how-we-work` renamed
  `#engineering-workflow` (dock label too; no other links pointed at it); "How does this work?" tile
  links to the new page; carousel replaced by a static 8-step grid + members line + "Full details"
  link ("insured shipping" wording removed). `tailwind.css` rebuilt, link bumped to `?v=20261024`.
- `sitemap.xml` (new entry, repairs lastmod) and `llms.txt` ("How We Operate" section).

Checked with headless Chrome through `http://localhost:8086` at 390, 1440 and 1920 wide. Not checked:
a real phone, the No Animations path in a browser (logic only), the Cloudflare cache after deploy.

**Follow-ups:** the "ready for collection" SMS template should mention the 30 days (not checked);
T&Cs must carry the same 30-day rule; the chat could link here later (CRM change, deferred).
