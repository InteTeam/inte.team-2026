# Tasks: Dedicated Pricing Pages

See `README.md` in this folder for context and design rationale, and
`pricing-data-repairs.md` / `pricing-data-websolutions.md` for the full
source-of-truth content these pages were built from.

**Status: build complete (2026-07-25).** Verification (section 6) still to
run against the live container.

## 1. `pricing-repairs.html`
- [x] Create page (head: `styles.css` + `tailwind.css`, meta description,
      canonical URL)
- [x] Add `pricing-repairs.html` to `tailwind.config.js` content glob
- [x] Build `<table>` per category: Game Consoles, TV & Hi-Fi, Laptops &
      Apple, Industrial B2B
- [x] Real figures used throughout — no `TBC` placeholders remain. Table
      shape ended up richer than the original 3-column sketch (Service /
      Diagnostic Fee / Range): each category has multiple tables covering
      priority tiers, scenarios, and policy callouts (Samsung consultation,
      data-handling disclaimer, B2B equipment/terms), per the real pricing
      model captured in `pricing-data-repairs.md`.
- [x] Add JSON-LD: `Service` (serviceType: "Electronics Repair") +
      `hasOfferCatalog` with real `priceSpecification` values per major
      item (not every table row individually — kept to the most
      search-relevant items to stay maintainable)
- [x] Add SSI footer include

## 2. `pricing-websolutions.html`
- [x] Create page, same technical shape as above
- [x] Add `pricing-websolutions.html` to `tailwind.config.js` content glob
- [x] Built as **One-off/Project-based + Subscription/Rental**, per the
      structural decision made before content gathering — not the
      originally-guessed CRM/WWW-sites/WhatsApp/Nextcloud categories.
      Real content: quick-fix hourly rates, modernization project tiers,
      the Established Business Package (£300 + £30/mo) and Startup
      Package (£20/mo), plus a "why we're this affordable" trust section.
- [x] Add JSON-LD: `Service` (serviceType: "Web Development") +
      `hasOfferCatalog`, mixing one-time `PriceSpecification` and
      recurring `UnitPriceSpecification` (per-month) offers
- [x] Add SSI footer include

## 3. Retire `repairs-estimates.html`
- [x] Add nginx redirect in `nginx.conf`:
      `location = /repairs-estimates.html { return 301 /pricing-repairs.html; }`
- [x] Delete `repairs-estimates.html` from the repo
- [x] Remove `repairs-estimates.html` from `tailwind.config.js` content array
- [x] Repoint `electronicsrepairs.html` journey-tile link →
      `pricing-repairs.html`
- [x] Repoint `repair-bookings.html` nav link ("Estimates" →
      "Pricing") → `pricing-repairs.html`

## 4. Indexing
- [x] `sitemap.xml`: replaced the `repairs-estimates.html` entry with
      `pricing-repairs.html` (priority 0.8)
- [x] `sitemap.xml`: added `pricing-websolutions.html` (priority 0.8)
- [x] `llms.txt`: updated the old `Repair estimates:` line → both new
      pricing page URLs
- [x] `llms.txt`: added a `## Pricing` section linking both new pages with
      real headline figures
- [x] `llms.txt`: replaced the vague `£200-£500 range` line; also bumped
      the file's `# Last updated:` date
- [x] Confirmed `robots.txt` needs no change

## 5. Nav links (minimal footprint — not a site-wide template pass)
- [x] `repair-bookings.html` — repointed
- [x] `electronicsrepairs.html` — repointed
- [x] `webdevelopment.html` — added a "PRICING" nav link →
      `pricing-websolutions.html`
- [x] `index.html` nav — left untouched this pass, as planned

## 6. Build & verify
- [x] `npm run build:css` — exited clean
- [x] `docker compose up -d` — both new pages return HTTP 200 via
      `http://localhost:8086/...`
- [x] `curl -I http://localhost:8086/repairs-estimates.html` → confirmed
      `301` + `Location: /pricing-repairs.html`
- [x] View-source / `curl` both new pages — `<table>` and
      `application/ld+json` confirmed present in raw HTML (13 tables +
      JSON-LD on repairs page, 2 tables + JSON-LD on web solutions page)
- [x] Validated JSON-LD — parsed cleanly as JSON on both pages (10 offers
      on repairs, 5 on web solutions), correct `Service`/`hasOfferCatalog`
      shape
- [x] `grep -rn "repairs-estimates" *.html *.xml llms.txt` → zero hits
- [x] Confirmed `sitemap.xml` lists exactly 15 `<loc>` entries

---

## Not in scope here (see README "Explicitly Deferred")
- Mobile-first 3-header redesign (Home / Web Dev / Electronics Repairs)
- FAQ content built from real customer calls
- Agentic booking / CRM API integration
- Structured "knowledge catalog" beyond `llms.txt`
- AI Share-of-Voice / Mention-Rate tracking
