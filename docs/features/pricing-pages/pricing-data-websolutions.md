# Pricing Data: Web Development & Business Automation (raw, as supplied by user)

Working notes for `pricing-websolutions.html` content. Captured verbatim/
close to verbatim as figures are supplied. **Not yet built into the
page** — source-of-truth data file the table + JSON-LD will be generated
from once complete.

**Structural decision (2026-07-25):** split top-level into **One-off /
Project-based** and **Subscription / Rental** pricing, mirroring the
distinction already implied on `webdevelopment.html` ("Affordable Rental
Model" vs. "Regular WWW websites"). Some items may be hybrid (one-off
setup fee + ongoing subscription) — allowed, not forced into a single
bucket. This split also maps cleanly to schema.org structured data
(one-time `priceSpecification` vs. recurring `UnitPriceSpecification` with
a billing interval), unlike the repairs pricing which stayed single-tier
per item.

---

## One-off / Project-based

### Quick-fix solutions (hourly)
| Scenario | Price |
|---|---|
| Per hour, beyond the first hour | £40/h |
| First hour | £60 |
| High priority / urgent | No fixed price — customer must call, scheduled based on availability |

### Modernization projects ("turning old web solutions into modern ones")
Priced per project, not hourly.
| Scope | Price |
|---|---|
| Simple website (portfolio) | £100–£300 |
| E-commerce store or CRM | £300–£1,000 |
| Larger scope | Can exceed £1,000 — needs a look first, consultation-based |

### General rate & AI-assisted delivery (worth stating on-page)
- Base rate: **£40/h**; can drop to **£30/h minimum** for jobs with a lot
  of hours (bulk-hours discount).
- Inte.Team uses LLM-assisted development (not hand-coding everything) to
  write code within the frameworks they work in — claimed **up to 500%
  faster than a senior developer** working unassisted, "proven to work
  great." This is presented as the mechanism that lets the customer pay
  less, not a hidden markup — worth stating plainly as the "why we're
  affordable" answer, ties into the same AI-era positioning driving this
  whole pricing-pages initiative.

### Turnaround
- Typical: within one week.
- Can take longer depending on availability — capacity swings week to
  week (some weeks 8 new customers onboard at once, other weeks none).
- **Best framed on-page as:** "best to call or book to check current
  availability" rather than a hard promise.

### Quick-fix vs. modernization boundary
User called this "a thin line" and asked for on-page wording. Suggested
copy (draft, not final):

> **Not sure which one you need?** A quick-fix is a single, well-defined
> change — a bug, a broken form, a small tweak — that we can usually scope
> over the phone in a few minutes. Anything bigger — a redesign, a new
> system, several moving parts — becomes a project quote instead. When
> you're not sure which side of the line your job falls on, just call us
> and we'll tell you honestly before any work (or billing) starts.

### Payment structure
- **Deposit:** £100 to Inte.Team's business bank account, required before
  work starts — collected *after* an initial conversation and an official
  email agreement (written scope confirmation).
- **Phased/milestone billing:** work is broken into phases; customer pays
  after each phase is confirmed complete (not one lump sum, not pure
  pay-on-completion).
- **Staging environment** provided so the customer can test each phase
  before sign-off.

### Hosting, domain & additional costs
- Inte.Team can host on their own Dell R550, or on one of their rented UK/
  EU web solutions (VPS).
- **Additional costs to the customer, billed separately from the project
  price:** hardware, software, third-party APIs, domain registration,
  Cloudflare DNS.
- **Cost-saving migrations:** where a customer is currently paying for a
  third-party service that Inte.Team can replace with a self-hosted
  equivalent (e.g. a paid Redis cache service → self-hosted Redis,
  or a paid auth provider → Laravel's built-in authentication), Inte.Team
  will explain the difference, benefits, and cost in plain English
  upfront, so the customer can decide.

### Tech stack disclosure
**Confirmed by user.** State on-page: "primarily PHP/Laravel, React, Vue 3,
JS — but not limited to." Matches `llms.txt`'s existing "Technologies
used" list (which also includes Next.js, Tailwind CSS, Docker) — repeated
here for discoverability on the pricing page itself.

## Subscription / Rental

### Established Business Package — £300 one-off + £30/month

**One-off setup: £300 total**, non-refundable, paid in phased £100
installments:
- £100 — due once phase 1 is **completed** (confirmed by user — not on
  agreement/start).
- If the project runs more than 2 phases: **two further £100 payments**
  later (presumably one per subsequent phase, consistent with the
  "paid after each phase confirmed complete" pattern already established
  in the One-off section above).
- Covers roughly **up to 10 hours of work, sometimes more.**

**Included** (non-exhaustive — "not only"):
- Landing page + a form on the landing page
- CRM that captures form submissions as bookings, and sends confirmation
  emails both to the business's own customers *and* to the business
  itself
- Email server + email client + contacts, integrated ("talks") across all
  of Inte.Team's apps
- **SSO** (single sign-on) — one login across all Inte.Team apps the
  customer uses
- Project management app
- **CMS** — can power the landing-page forms, editable by the customer via
  the same SSO login
- **Procurement app** — if the business does purchasing
- CRM's built-in **WSL** (Warehouse System Logistics) — barcode + QR
  scanning and label printing, built in
- **2FA** built in as standard
- **Backups:** 3×/day, at least one copy off-server — max potential data
  loss window **under 24h**

**Backup add-ons:** more frequent backups available for an extra fee, or
a constant/real-time second copy (continuous replication) — both **custom
priced**, not fixed.

**Monthly subscription: £30/month.**
- Includes infrequent small feature requests/code adjustments (a few per
  year) at **no extra charge** — "no extra fee if we have no extra cost on
  our side."
- £30/mo is a **baseline tied to server/traffic usage** — price only rises
  if the business grows and uses more resources, not a flat forever-price.

**Final phase — customer-journey app:** once everything else in the
package is working perfectly, Inte.Team works with the customer on their
specific customer journey and builds an additional app to simplify their
process, as the last stage.
- **Included** in the package if it can be built from Inte.Team's existing
  ready-made solutions/modules (confirmed).
- **Quoted separately** if the requirement falls outside that scope
  (confirmed).

### Startup Package — £20/month
- Limited access to: CRM + landing page + a company email alias (e.g.
  `info@`) forwarded to an email address of the customer's choice (alias
  forwarding, not a full mailbox).
- **One-off setup fee: same £300 as the Established Business Package**
  (confirmed). Can be added onto/spread across the monthly installments,
  but a **minimum £100 must be paid one-off** upfront regardless.

### Anything beyond these two packages
Requires going through Inte.Team's quote system for an accurate custom
price — not a fixed figure.

---

## "Why we're this affordable" — trust/credibility copy

Requested by user in response to the pricing discussion above — addresses
the "why so cheap, are you legit" question directly on the page rather
than leaving it unanswered. Raw facts supplied:

- Not a startup: the current CRM has been running for **5+ years** on a
  Laravel base; the present version has been live **since Dec 2025**.
- Home-based business, low overhead.
- Web dev team works **part-time**, "happy to earn extra" — not a
  full-time-salaried cost structure.
- **Recurring subscription revenue compounds over time** — even during a
  quiet stretch with no new customers, existing subscriptions provide
  residual income, which frees the team to work on internal apps instead
  of chasing new sales.
- Philosophy: the more apps (and AI agents) they build, the better
  prepared their customers are for an evolving web — customers don't need
  to understand the tech themselves, that's Inte.Team's job. Some
  customers have been with Inte.Team **18 years** (as of July 2026).
- They use the same software internally that they sell to customers
  ("eat their own dog food" — already a stated value prop in `llms.txt`,
  this reinforces it) — framed as "we stand by it."
- That same software/systems have let Inte.Team scale their **electronics
  repair** side to 3 drop-off points, with a goal of 500+ in future
  (matches the wider business goal already tracked in memory).

**Suggested on-page copy (draft, not final):**

> **Why is this so affordable?**
> We're not a startup burning investor money to buy customers — we've run
> our own Laravel-based CRM for over five years, with the current version
> live since December 2025. We work from home, our web dev team works
> part-time by choice, and our subscriptions compound: even in a quiet
> month with no new sign-ups, our existing customers keep the lights on,
> which means we spend that time building better tools instead of chasing
> sales. The more apps — and AI agents — we build, the better prepared our
> customers are for a web that keeps changing, without needing to
> understand any of it themselves. Some have been with us 18 years. We
> also use the same software we sell, in our own business — including the
> systems that helped us grow our electronics repair side to three
> drop-off points, with more planned. We stand by what we build because
> we run on it too.
