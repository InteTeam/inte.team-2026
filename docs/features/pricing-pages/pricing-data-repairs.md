# Pricing Data: Electronics Repairs (raw, as supplied by user)

Working notes for `pricing-repairs.html` content. Captured verbatim/close
to verbatim as figures are supplied, category by category. **Not yet
built into the page** — this is the source-of-truth data file the table +
JSON-LD will be generated from once complete.

**Structural implication for the build pass:** the pricing model here is
richer than the flat "Service / price range" table originally sketched in
`tasks.md` — most items vary by **Priority tier** and **Location**, not
just a single range. The eventual `<table>` (and JSON-LD
`priceSpecification`) needs to reflect Medium/High × HQ/Drop-off as real
dimensions, not be flattened into one column. Revisit `README.md`'s
Acceptance Criteria once all categories are captured.

---

## General pricing framework (applies across categories unless overridden)

- **Priority tiers** (turnaround wording confirmed by Piotr 2026-10-21, shown
  on `electronicsrepairs.html#turnaround`; applies to diagnosis and repair
  separately):
  - **Low** — no fixed timescale, done between scheduled work. Can be
    upgraded to Medium for an additional fee (fee amount not yet set);
    upgraded jobs get 1–2h blocked in the CRM scheduler (internal only,
    not stated on the site).
  - **Urgent** — available to all customers (not just B2B), price agreed
    in advance; we drop everything, evenings/weekends if needed.
  - **Diagnosis cap** — up to 1–2h bench time; beyond that we contact the
    customer about next steps before continuing.
  - Parts: High = fitted within 1–2 days of parts arriving; Medium = 3–5
    working days from arrival.
  - **Medium** — 3–5 working days (up to 1 week) if parts don't need
    sourcing.
  - **High** — turnaround same/next day (1–2 days), or same-hours where
    possible. Costs **+50% over Medium**.
- **Location:** HQ (Livingston) vs. drop-off partner points (Petzone,
  D&J Records) — drop-off points run slightly higher than HQ at the same
  priority tier. **Confirmed: this is specific to the PS5 HDMI example
  only, not a general rule.** Everything else in this document is priced
  flat regardless of drop-off location unless stated otherwise.
- **Member perk — spare device loan:** members get a loaner device for
  the duration of repair, if needed and in stock. Stocked loaner devices,
  mainly: TVs, laptops, PS5, Xbox Series consoles, gamepads for
  PS5/Xbox + Nintendo Switch Joy-Cons, Sony TA-FE series hi-fi stereo
  analogue amps. **Phones and tablets planned to be added to the loaner
  pool next** (not yet stocked). **Confirmed: not automatic/free by
  default** — customer needs to call or book online to check availability
  and pricing for the loaner at the time of repair.
- Final price depends on: parts cost + priority tier + location.

---

## Game Consoles

### PS5 HDMI Port Repair
| Scenario | Price |
|---|---|
| Medium, HQ drop-off | £60 |
| Medium, partner drop-off point | £65 |
| High priority, either location | £90 |
| £120 tier | Only if: (a) customer wants it done same-visit/while they wait, **or** (b) trace damage — port can no longer connect to the mainboard because the traces themselves are gone (harder repair) |

Most customers land in the **£60–£90** range.

### PS5 Cleaning
- Full process ≈ 1 hour.
- **£40–£50.**
- Includes: photos taken during the process, and liquid metal
  reapplication/realignment.

### Gamepads (PS5/Xbox controllers)
| Repair | Price |
|---|---|
| 2x potentiometer replacement only | from £25 |
| Other small repairs (e.g. soldering a single component like a microswitch) | £30 |
| Hall Effect stick upgrade (permanent stick-drift fix) and/or mouse-click switch install | £40–£50 (mouse-click install price varies with the cost of the part itself) |

### Micro-soldering
| Scenario | Price |
|---|---|
| Starting price | from £20 |
| Per hour, HQ | £40 |
| Per hour, drop-off point (first hour) | £45 |
| Drop-off point, subsequent hours | negotiable per job |

### Everything else in Game Consoles
User's instruction: "the rest per repair estimates in game consoles" —
**interpreting as:** keep the existing placeholder ranges from the retired
`repairs-estimates.html` for items not redefined above (Xbox Series X Disc
Drive £55–£90, Nintendo Switch Joy-Con Drift £30–£55, general
Micro-soldering/Component Replacement "from £45" — **now superseded by the
more detailed micro-soldering breakdown above** — and Liquid Metal &
Thermal Re-paste £35–£60, **now superseded by the PS5 Cleaning entry
above**). **Confirmed correct by user.**

---

## TV & Hi-Fi

### Diagnosis
| Scenario | Price |
|---|---|
| Basic diagnosis (incl. while customer waits, when possible) | £20 one-off |
| Full board repair or deeper diagnosis | £40 |

### Backlight replacement — by screen size (cheapest brands)
Ranges reflect what customers have actually paid over the last year —
already blended across priority, stock availability, and parts cost, i.e.
**not** a separate Medium/+50%-High split like the game console pricing
above. **Confirmed: no High-priority tier for TV backlight pricing** —
these ranges are final as given.

| Size | Price |
|---|---|
| 32" | £50–£90 |
| 38–40" | £60–£90 |
| 41–50" | £70–£110 |
| 51–60" | £90–£130 |
| 61–70" | £110–£150 |
| Over 70" | £150–£180 |

**Premium brands:** 10–15% dearer than the cheapest-brand figures above,
due to parts cost/availability.

**Repair philosophy (worth stating on-page, not just internal policy):**
prefer replacing the full backlight array/edge-type kit over spot-repairing
a single faulty diode — these TVs aren't built to last, and a partial
repair tends to bring the customer back. Avoided "at all cost" where
possible.

**Samsung — requires phone consultation, not a fixed price:**
- Edge-type backlight Samsung TVs commonly have a melted-diffuser problem;
  some customers choose to donate the TV rather than repair it.
- Panel quality is inconsistent — call first for any Samsung TV from
  roughly the last 5 years.
- This should surface on the page as "call us before booking" for Samsung,
  not get a number.

### Hi-Fi diagnosis
| Scenario | Price |
|---|---|
| Quick diagnosis (device easy to open) | £20 |
| Harder-to-access device | £40–£60 |

**No High-priority tier for Hi-Fi** (unlike consoles/TVs).

### Everything else in TV & Hi-Fi
Per user: "rest is as on the repair estimate — exactly like last time" —
same interpretation as Game Consoles: keep the retired
`repairs-estimates.html` placeholder figures for anything not redefined
above — **TV Power Board Replacement £60–£140**, **OLED TV (panel
fault) → Call for quote** (consistent with the Samsung consultation note),
and **Vintage Hi-Fi Recap & Alignment £70–£200** (this is the actual
repair cost, on top of — not replacing — the new Hi-Fi diagnosis fee
above).

## Laptops, PCs & Apple

Priority tiers apply again: **Medium + High (+50%)**, same framework as
Game Consoles.

### MacBook diagnosis (by device value, Medium priority)
| Device value | Diagnosis price (Medium) |
|---|---|
| Older, under £200 | £40 |
| Over £200 | £50 |
| Over £1000 | £60 |

High priority = these +50%, per general framework.

### SSD / RAM upgrade
**Not a flat range — price = labour + parts cost, itemized on top of each
other.** This **supersedes** the old placeholder flat figures (SSD Upgrade
£40–£80, RAM Upgrade £30–£60) — page should show a labour rate + "parts
priced at cost," not a single number.

### Data handling / backup policy (disclaimer, not a price line)
- Backing up customer data to an external source may be needed and can
  add to the cost, if the customer hasn't already backed up their own
  data.
- During board repair, if the hard drive/storage section itself isn't
  damaged, Inte.Team does not touch or access the data or storage — focus
  stays strictly on the fault being repaired.
- Data integrity can't be confirmed until diagnosis/fix is complete —
  worth stating explicitly on-page to set expectations.

### Screen replacement
| Scenario | Price |
|---|---|
| Cheaper/older models | Covered by the retired `repairs-estimates.html` placeholder: **Screen Replacement (laptop) £60–£150** — carries over as-is |
| Newer MacBooks, aftermarket | ~£200–£500 (most common) |
| Original/OEM | Premium vs. aftermarket — **no fixed figure given**, price via consultation |

### PC diagnosis (non-Apple laptops/PCs — wasn't in the old placeholder list at all)
Same Medium/High(+50%) framework.
| Scenario | Price |
|---|---|
| Basic diagnosis, HQ | £20 |
| Basic diagnosis, drop-off point | £30 |
| Full diagnosis, Medium | £40–£80 |
| Full diagnosis, edge cases | Can run higher, via customer consultation |

These are what most customers have actually paid over the last year or so
(same "real-world blended range" framing as the TV backlight table).

### Everything else in Laptops, PCs & Apple
Per user, "the rest are OK" — same interpretation as prior categories:
keep the retired `repairs-estimates.html` placeholder figures for items
not redefined above — **MacBook Logic Board Repair £90–£250**,
**Liquid Damage Recovery £80–£200** — these stand as-is (SSD/RAM are the
only two explicitly overridden this round, per above).

## Industrial B2B

Three priority tiers here (one more than other categories): **Medium,
High, Urgent.**

| Tier | Rate |
|---|---|
| Medium | £40/h (rule of thumb base rate) |
| High | +50% over Medium (£60/h) |
| Urgent | Negotiable — "we drop everything, close the business and go, or start work now" |

- **Commute** to the factory/warehouse/plant/customer site is charged
  **on top of** the hourly rate.
- **Invoicing:** 60-day invoice terms acceptable in some cases, but
  requires an email agreement or a simple quick contract to be signed
  first.
- **NDA:** if the client needs Inte.Team to sign an NDA, that must be
  clearly stated by the client up front. Inte.Team's own staff, contracted
  technicians, and apprentices already have NDAs signed with Inte.Team
  internally — worth stating as a trust signal, distinct from a
  client-specific NDA request.
- **Equipment on hand** (worth listing on-page as a B2B credibility/trust
  signal): microscopes, oscilloscopes, digital multimeters, hot air
  stations, professional soldering stations (Aifen A9-Pro/Plus with C210
  and 245 tips), higher-resolution thermal cameras, logic analyzers,
  programmers (RT809H with 50+ adapters, SVOD4), bench power supplies,
  portable fume extractors — all mobile/loadable into the car for on-site
  work.
- **Solder:** unleaded Polish solder (Cynel) most of the time; leaded
  solder also used for medical, military/army, or older repairs, per
  British law requirements.
- **Component stock:** thousands of regular and SMD components in stock
  and growing, covering most typical general-electronics faults.

**Explicit removal:** drop the old **"Proxmox Stress Testing"** line
entirely from the new page — user confirmed this should not carry over
from `repairs-estimates.html`.

**Superseded:** the old flat "Contact for quote" lines for Commercial PCB
Redesign & Repair and Custom Firmware Programming are now backed by the
£40/h Medium / +50% High / negotiable-Urgent framework above (plus
commute) — page should lead with the rate structure rather than a bare
"contact for quote," though final scoping still happens via consultation
for complex jobs.
