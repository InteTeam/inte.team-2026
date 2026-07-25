# Feature: Dedicated Pricing Pages for AI-Agent Discoverability

**Status:** Planned — docs only. Pricing content/copy still to be agreed;
build pass not started.
**Depends on:** None functionally. Interacts with (but does not require)
the header/nav redesign noted under Explicitly Deferred.

---

## Overview

Consumer search is shifting from Google links to AI agents/answer engines
(ChatGPT, Perplexity, Gemini's AI Mode, personal shopping/booking agents).
Those systems need transparent, machine-parseable pricing to reference a
business at all — if pricing isn't published in a crawlable, structured
form, AI models won't cite it.

Inte.Team has two real gaps today:

1. **Repair pricing exists but isn't agent-friendly.**
   `repairs-estimates.html` has a real price-range accordion, but the
   content sits in `display:none` panels behind onclick JS with no
   structured-data equivalent, and `llms.txt` (the AI-facing summary file)
   doesn't carry the numbers at all.
2. **Web development pricing barely exists.** `webdevelopment.html` only
   has vague "price-tag" labels (`Affordable Rental Model`,
   `£200–£500 range`) — nothing itemized an agent (or a human) could
   actually cite.

**Decision:** build two new dedicated, flat, table-based pages —
`pricing-repairs.html` and `pricing-websolutions.html` — each with a plain
semantic `<table>` and `schema.org` JSON-LD structured data, rather than
retrofitting pricing into the existing service pages. Actual price figures
are **out of scope for this docs pass**; the goal here is to lock the
structure/wiring so numbers can be dropped in later without further
plumbing decisions.

This follows the project's existing `docs/features/` convention
(precedent: `docs/features/site-redesign/README.md`) rather than the
Laravel/React playbook SOP, which doesn't apply to this static-site repo.

---

## Design rationale

**Retire, don't duplicate — `repairs-estimates.html` gets 301-redirected
to `pricing-repairs.html`, not kept in parallel.** This site already had a
real content-drift bug (footer copy diverging across 11 pages, fixed in
the `site-redesign` pass). Two independently-maintained price lists for
the same services is the same failure mode again, with an added risk: an
AI agent could scrape both URLs and cite conflicting numbers for the same
repair. One canonical URL avoids that.

**JSON-LD shape — correction to an initial draft.** An early pricing
markup suggestion (from third-party AI research) used a `RepairService`
schema.org type — that type doesn't exist in the schema.org vocabulary.
The correct, valid pattern (and consistent with what's already live on
this site — `index.html` uses `LocalBusiness`, `webdevelopment.html` uses
a bare `Service`) is:

```
Service (serviceType: "Electronics Repair" | "Web Development")
  → hasOfferCatalog: OfferCatalog
      → itemListElement: [ Offer, Offer, ... ]  (one per category)
          → priceSpecification: { minPrice, maxPrice, priceCurrency: "GBP" }
```

Neither existing JSON-LD block on the site currently carries pricing —
this introduces that pattern for the first time.

**Semantic `<table>`, not divs/accordion.** No table markup exists
anywhere on the site today. A real `<table>` is the most reliably
crawlable shape for tabular pricing data — no reliance on CSS visibility
state or JS execution, unlike the current accordion. Technical shell
(head links, footer include) otherwise follows `repairs-estimates.html`'s
own pattern exactly: `styles.css` + compiled `tailwind.css` + a page-local
`<style>` block for component-specific classes, SSI footer include.

**Nav: minimal footprint, not a site-wide template pass.** Nav is
hand-coded per page today (only the footer is SSI-shared via
`partials/footer.html`), and link sets already differ page-to-page. Rather
than templating nav everywhere, only the pages where a pricing link
concretely belongs get touched:
- `repair-bookings.html` — repoint existing "Estimates" link →
  "Pricing" / `pricing-repairs.html`.
- `electronicsrepairs.html` — repoint an existing journey-tile link that
  currently points at `repairs-estimates.html`.
- `webdevelopment.html` — add a "Pricing" link (its nav is currently just
  `HOME`) → `pricing-websolutions.html`.
- `index.html` — **not touched.** Ambiguous which pricing page a
  homepage-level link should point to; revisit once both pages have real
  content, or once the deferred header redesign below lands.

---

## Acceptance Criteria (future build pass — not yet started)

### `pricing-repairs.html`
- [ ] New page, added to `tailwind.config.js` content glob
- [ ] Semantic `<table>` per category (Game Consoles, TV & Hi-Fi, Laptops
      & Apple, Industrial B2B — categories carried over from
      `repairs-estimates.html`), columns: Service / Typical
      Diagnostic-Base Fee / Common Repair Range, all price cells `TBC`
      until real figures are agreed
- [ ] JSON-LD: `Service` + `hasOfferCatalog` → one `Offer` per category
      with placeholder `priceSpecification`
- [ ] SSI footer include, matches sibling pages

### `pricing-websolutions.html`
- [ ] Same technical shape, rows seeded from `webdevelopment.html`'s
      existing categories (CRM/rental-subscription builds, regular WWW
      sites, Ticket-to-WhatsApp integration, Nextcloud integration),
      `TBC` prices
- [ ] JSON-LD: `Service` (serviceType: "Web Development") +
      `hasOfferCatalog`

### Retiring `repairs-estimates.html`
- [ ] `nginx.conf`: `location = /repairs-estimates.html { return 301
      /pricing-repairs.html; }`
- [ ] File deleted from repo (history preserved in git)
- [ ] Removed from `tailwind.config.js` content array
- [ ] `electronicsrepairs.html:333` and `repair-bookings.html:93`
      repointed

### Indexing
- [ ] `sitemap.xml`: swap `repairs-estimates.html` entry for
      `pricing-repairs.html`; add `pricing-websolutions.html` (suggest
      priority 0.8 for both)
- [ ] `llms.txt`: update the `Repair estimates:` line, add a `## Pricing`
      section linking both new pages, replace the vague `£200-£500 range`
      line once real figures land
- [ ] `robots.txt` — no change needed

### Quality gate
- [ ] `npm run build:css` clean
- [ ] Both pages return HTTP 200 in the running container
      (`http://localhost:8086/...`, not `file://` — SSI only resolves
      server-side)
- [ ] `curl -I .../repairs-estimates.html` → `301` to `/pricing-repairs.html`
- [ ] JSON-LD on both pages validates (schema.org validator / Google Rich
      Results Test)
- [ ] Site-wide grep for `repairs-estimates` returns zero hits after the
      pass
- [ ] `sitemap.xml` lists exactly 15 pages (14 − 1 retired + 2 new)

---

## Explicitly Deferred

- **Header/nav redesign.** Current nav is hand-coded per page,
  inconsistent (differing link sets, two unrelated visual systems: plain
  CSS vs. bespoke Tailwind), and not mobile-first — no
  hamburger/responsive pattern exists anywhere in the repo. User wants a
  proper mobile-first header system instead: one for the Home Page, one
  for Web Dev pages, one for Electronics Repairs pages. This is a
  separate, larger initiative (site information architecture + responsive
  CSS across many pages), explicitly not folded into this pass. Once
  built, the nav links added here should be revisited to slot into the
  new headers. See `project_inteteam_site_header_redesign` memory.
- **FAQ from real customer calls.** Turn actual customer/repair questions
  into public FAQ content, instead of generic AI-generated filler —
  raised as a priority for AI-search trust in the same research pass that
  prompted this feature.
- **Agentic booking readiness.** CRM API integration so AI agents can book
  directly (the old `repairs-estimates.html` already carried a "CRM API to
  be wired later" note — same direction, not started).
- **Structured "knowledge catalog".** `llms.txt` is already a lightweight
  version of this; formalizing it further (FAQs, policies, credentials,
  call transcripts) is a separate future pass.
- **AI Share-of-Voice / Mention-Rate tracking.** No action needed now —
  noted as a future measurement concern once the above ships.
