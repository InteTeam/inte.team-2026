# Feature: Site Redesign — Shared Footer + Self-Hosted Tailwind

**Status:** Done (2026-07-19)
**Depends on:** None. Triggered by the `case-study.html` addition and the mini-audit that followed it.

---

## Overview

`inte.team-2026` is 14 hand-coded static HTML pages served directly by nginx
(`docker-compose.yml`, `nginx.conf` — plain bind-mount, no build step). There
was no shared header/footer/template of any kind: every page duplicated its
own `<nav>` and `<footer>` markup inline.

A mini-audit (2026-07-19, prompted by deciding where to put a case-study
link) found real drift, corrected twice during the audit itself as the
initial pass turned out to be wrong on two counts (see below):

- **4 pages load the Tailwind CDN script** (`electronicsrepairs.html`,
  `repairs-estimates.html`, `partnership-info.html`, `sales-engineering.html`)
  — an unbuilt, unpurged runtime CSS dependency. Worth fixing on its own:
  the web development service marketed *on this site* is "professional CRM
  and business systems," and a Tailwind CDN `<script>` tag on a production
  page is a specific, recognizable tell to anyone auditing a site
  professionally.
- **Footer copy drifted** across the 11 pages that share the same plain
  `<nav>`/`<footer>` markup shell: `repair-bookings.html`/`repairs-estimates.html`
  reordered the address sentence vs. the other 9, and `&copy;` vs. a raw `©`
  character were used inconsistently.
- **`sitemap.xml` was missing 8 of the 14 live pages.**

The site gets redesigned periodically anyway (per team discussion,
2026-07-19). This pass fixes the drift and sets up the one piece of
infrastructure (a shared footer partial) that stops it recurring, without
taking on a full visual rewrite.

---

## Design rationale — and two corrections made mid-audit

**Mechanism: nginx SSI**, not a build step or client-side JS include.
`ssi on;` in `nginx.conf`, then `<!--#include virtual="/partials/footer.html" -->`.
Zero build tooling for the *nav/footer* problem, resolved server-side before
the response ships — no flash-of-missing-content, content still visible to
crawlers/`curl`/view-source. This repo had no build step and no
`package.json` before this feature; SSI solves de-duplication without
introducing one.

**Correction #1 — the original nav-drift framing was wrong.** The initial
audit pass claimed `electronicsrepairs.html` had a missing nav (an
oversight) and that 4 pages "intentionally stripped nav" as a funnel
pattern. Reading every file in full (rather than grepping for a specific
class name) found:
- `repair-bookings.html` and `repairs-estimates.html` **do** have nav —
  contextual links (e.g. "Repairs" / "Book a Slot"), just not all-caps
  text, which the original grep pattern missed.
- `electronicsrepairs.html` has its own fully bespoke, working sticky nav
  (Home / Book Visit Now / phone) built in Tailwind utility classes — not a
  gap, a different self-contained system. Same for `partnership-info.html`
  and `sales-engineering.html`.

Net effect: **no nav templating, no "fix" to `electronicsrepairs.html`** —
there was nothing broken. Only the **footer** is genuinely duplicated,
identical content, across the 11 pages that share the plain-shell markup —
that's the piece SSI unifies.

**Correction #2 — the Tailwind page count and treatment were wrong.** The
original audit checked 3 guessed files instead of grepping all 14, missing
`repairs-estimates.html`. It also assumed the fix was "migrate these pages
onto the dark glass-morphism system" — but `sales-engineering.html` and
`partnership-info.html` are full alternate-theme microsites (their own
light-theme palette, extensive Tailwind grid/flex layouts, unique content
like a terminal mockup and an NGINX Proxy Manager 2FA contributor
testimonial). Hand-porting ~600+ lines of Tailwind utility layout into
vanilla CSS would have been a from-scratch rewrite with real regression
risk, not a cleanup.

**Chosen instead: self-host a compiled, purged Tailwind build.** One-time
`tailwindcss` CLI build (`package.json` + `tailwind.config.js` +
`tailwind-input.css` → static `tailwind.css`, 19.8KB minified), swap the
CDN `<script>` for a `<link>`. Fixes the actual professional concern
(runtime CDN dependency, unpurged CSS) without touching a single line of
existing layout or content. `electronicsrepairs.html` and
`repairs-estimates.html` keep mixing `styles.css` (dark theme chrome) with
Tailwind (utility-built content sections) exactly as before — just against
a static file instead of a CDN script.

**Design-system unification (dark theme for all pages) was explicitly
scoped out**, by user decision: keep `sales-engineering.html` and
`partnership-info.html` as intentionally distinct sub-brand pages, same way
funnel pages are allowed to structurally differ from content pages. Revisit
only as a deliberate, separate visual-redesign project if wanted later.

---

## Acceptance Criteria

### Infrastructure
- [x] `ssi on;` enabled in `nginx.conf`
- [x] `location ^~ /partials/ { internal; }` added — partials resolve via
      SSI but 404 on direct request (verified: `curl .../partials/footer.html`
      → 404 pre-fix would have been 200, now blocked; SSI include on
      `index.html` still resolves post-fix)
- [x] `partials/footer.html` created with the canonical, unified copy
      (`&copy;` entity, single consistent sentence order)
- [x] 11 pages switched to `<!--#include virtual="/partials/footer.html" -->`:
      `index`, `webdevelopment`, `case-study`, `membership`, `business-reality`,
      `community-projects`, `customer-journey`, `intecracy`, `bookvisit`,
      `repair-bookings`, `repairs-estimates`
- [x] Nav left untouched on all pages — confirmed not actually duplicated/drifted
      (see Correction #1)

### Tailwind CDN removal
- [x] `package.json` + `tailwind.config.js` (content globs scoped to the 4
      affected pages) + `tailwind-input.css` added; `node_modules/` gitignored
- [x] `npm run build:css` → static `tailwind.css` (19.8KB minified)
- [x] CDN `<script src="cdn.tailwindcss.com">` replaced with
      `<link rel="stylesheet" href="tailwind.css">` on `electronicsrepairs.html`,
      `repairs-estimates.html`, `partnership-info.html`, `sales-engineering.html`
- [x] Verified no Tailwind utility class used in any of the 4 pages is
      missing from the compiled CSS (diffed every `class="..."` token
      against the compiled output — the only tokens not found were each
      page's own custom classes, e.g. `.repair-card`, `.accordion-item`,
      defined in `styles.css`/inline `<style>`, correctly not Tailwind's job)
- [x] No visual/layout changes — same classes, same markup, just compiled
      instead of CDN-fetched

### Quality gate
- [x] All 14 pages return HTTP 200 in the running container
- [x] SSI-included footer content confirmed present in the raw response body
      via `curl` (not dependent on JS execution — there is no JS step)
- [x] Site-wide broken-link scan (every local `href` checked against the
      filesystem) — zero broken links
- [x] `sitemap.xml` updated: all 14 pages now listed (was 6); `robots.txt`
      already pointed at it correctly, no change needed there

## Explicitly Deferred

- Nav templating — dropped entirely; see Correction #1, there was no real
  duplication problem to solve.
- Full visual unification of `sales-engineering.html`/`partnership-info.html`
  into the dark theme — user decision to keep them as intentionally distinct
  sub-brand pages. Revisit only as its own scoped redesign project.
- Full static-site-generator/build pipeline — SSI covers the one real
  duplication (footer); not needed for anything else currently on the site.
- `og-image.png` / screenshot updates — no visual change was made this pass,
  nothing to re-screenshot.
