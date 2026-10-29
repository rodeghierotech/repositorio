# RodeghieroTech Personal Studio Redesign Implementation Plan

> **For agentic workers:** Use this plan task by task. Keep changes within this repository and preserve pre-existing local edits.

**Goal:** Reframe the existing portfolio as RodeghieroTech, Henrique Rodeghiero's independent studio for custom business systems, following the selected Operational Field Notes visual direction.

**Architecture:** Keep the current React, Vite, React Router, and Tailwind application. Compose the home page from focused sections, keep project facts in the existing data module, and adapt current listing, detail, contact, navigation, and footer components instead of introducing a new app architecture.

**Tech Stack:** React 18, Vite 5, React Router 6, Tailwind CSS 3, existing Lucide icons, supplied PNG logo.

**Spec:** `docs/superpowers/specs/2026-10-22-rodeghierotech-studio-redesign-design.md`

## Global Constraints

- Do not present the studio as a team or a large agency.
- Do not invent customers, testimonials, quantified business results, service guarantees, or project outcomes absent from the existing data.
- Do not add a backend, account system, payment flow, or CRM.
- Do not publish or deploy the site.
- Keep React, Vite, React Router, and Tailwind; no new product dependency is required by the approved visual direction.
- Write in Brazilian Portuguese, in direct, client-friendly language. Describe what the software does for a business rather than listing implementation jargon first.
- Preserve working deep links, query-driven project search/filter state, outbound project links, and responsive behavior.
- Respect the user's preference: do not add or run tests, builds, or validation commands unless explicitly requested. Report accurately which checks were or were not run.
- Preserve existing local modifications to `src/components/Navbar.jsx` and `public/img/logo-henrique-r.png`.

## Review Focus

- Direct links to `/projects/:id` must keep working when the project list is reframed as case studies.
- Existing `?q=` and repeated `?tech=` URL state must remain readable and editable after the listing redesign.
- Malformed or absent optional project fields must not produce invented content or broken links in case-study layouts.
- The supplied logo PNG has transparent pixels and must not be placed inside a black background crop.
- The small-screen menu, focus visibility, and reduced-motion preference must remain usable after the visual treatment changes.

## File Map

- `src/pages/Home.jsx`: home-page composition only; delegate discrete sections to focused components.
- `src/components/studio/`: new hero, workflow, selected-work, method, and studio-introduction sections plus shared editorial primitives where useful.
- `src/data/projects.js`: existing source of project descriptions and links; only correct or add content when facts are supported by repository evidence.
- `src/pages/Projects.jsx`: searchable and filterable case-study index.
- `src/pages/ProjectDetail.jsx`: case-study detail using existing route and project data.
- `src/pages/Contact.jsx`: client-oriented contact introduction while retaining configured direct contact links.
- `src/components/Navbar.jsx`, `src/components/Footer.jsx`: consistent studio identity and destinations; preserve the already edited logo asset and local changes.
- `src/components/ProjectCard.jsx`: case-study preview hierarchy and existing project actions.
- `src/App.jsx`, `src/context/AppContext.jsx`, `src/pages/Favorites.jsx`: preserve the current favorites route/state as a quiet compatibility feature, without making it a primary navigation item; do not clear stored local data.
- `src/index.css`, `tailwind.config.js`, `index.html`: studio palette/type tokens, accessible shared styling, document title, description, language/icon metadata.
- `public/img/`: individual generated visual assets in the paper, ink, and signal-green art direction; keep the R logo as a supplied standalone asset.

---

### Task 1: Prepare the field-notes art direction

**Files:**
- Create: individual raster assets under `public/img/` for the workflow collage, operational fragments, and case-study imagery needed by the selected reference.
- Modify: `src/index.css`
- Modify: `tailwind.config.js`
- Keep: `public/img/logo-henrique-r.png`

**Interfaces:**
- Consumes: supplied logo and approved image reference `exec-b1298e29-7698-413e-b1ca-d3a24bf3a191.png`.
- Produces: shared paper, ink, signal-green, charcoal, and muted-metal tokens; reusable styles for paper fragments, route line placement, image cropping, focus, and reduced motion.

- [ ] Generate only the separate raster visuals the layout needs, matching the selected reference; do not use a text-bearing full-page image as the webpage.
- [ ] Add exact color tokens: paper `#ECE9DE`, ink `#171715`, signal green `#21D96B`, charcoal `#202426`, muted metal `#78817E`.
- [ ] Set the display/body typography pairing and shared accessibility styles without adding a dependency.

### Task 2: Build the studio home page

**Files:**
- Create: focused section components under `src/components/studio/` for the hero, project evidence, method, studio introduction, and closing contact invitation.
- Modify: `src/pages/Home.jsx`
- Consume: tokens and assets from Task 1.

**Interfaces:**
- Consumes: `developer` and `projects` exports from `src/data/projects.js`; existing React Router links.
- Produces: home page that identifies RodeghieroTech as Henrique's independent studio, explains its custom-system offer, and routes the primary action to `/contact`.

- [ ] Implement the hero with the approved headline, client-facing description, supplied logo, paper-field visual, and one primary action.
- [ ] Feature the verified operational-system examples `pdv-adega-demo`, `linkshort`, and `tv-ads`; describe context and what the system does without implying unverified customer results.
- [ ] Give the home sections stable IDs: `sistemas` for the offer, `projetos` for selected work, `metodo` for the four-stage sequence, and `contato` for the closing invitation.
- [ ] Present the four method stages (understand, design, build, deliver/evolve) as a connected sequence using the signal-green route.
- [ ] Add Henrique's personal authorship and a direct closing contact invitation.

### Task 3: Reframe project discovery and detail pages

**Files:**
- Modify: `src/pages/Projects.jsx`
- Modify: `src/pages/ProjectDetail.jsx`
- Modify: `src/components/ProjectCard.jsx`
- Modify: `src/data/projects.js` only for evidenced copy corrections needed by the new case-study hierarchy.

**Interfaces:**
- Consumes: existing project records, `useApp()` favorites/view APIs, `SearchFilter`, and current `/projects/:id` route.
- Produces: searchable project index and detail pages presented as client-relevant work, while retaining current links, query filters, favorite actions, related projects, and route compatibility.

- [ ] Reorder listing content around problem context and system purpose; de-emphasize stars, view counts, and developer-only language.
- [ ] Retain `q` and repeated `tech` query parameter behavior and the current filter controls.
- [ ] Reorder detail information to context, what was built, supported outcomes (only when evidenced), technologies, live/repository links, and related work.
- [ ] Retain `/favorites` and its existing local storage/state for compatibility; remove it from primary navigation but preserve project save controls.

### Task 4: Align navigation, contact, footer, and site metadata

**Files:**
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Footer.jsx`
- Modify: `src/pages/Contact.jsx`
- Modify: `src/App.jsx` only if section-anchor support requires it.
- Modify: `index.html`
- Consume: studio sections and shared tokens from Tasks 1–2.

**Interfaces:**
- Consumes: existing contact channels in `developer`, React Router, and section IDs exported by home sections.
- Produces: consistent RodeghieroTech identity and navigable destinations across home, project, detail, favorites, and contact routes.

- [ ] Use destinations `O que faço` → `/#sistemas`, `Projetos` → `/projects`, `Método` → `/#metodo`, and `Contato` → `/contact`; make the mark and wordmark return to `/` and retain the supplied transparent logo.
- [ ] Ensure mobile menu exposes the same destinations, is keyboard-operable, and accurately reports its expanded state.
- [ ] Reframe contact copy for prospective system clients while retaining all existing direct contact links and exact configured details.
- [ ] Update footer identity/copy and document title/description/icon metadata to RodeghieroTech.

### Task 5: Reconcile the redesign against the approved brief

**Files:**
- Review: all files listed above.
- Preserve: all pre-existing user edits and untracked assets.

**Interfaces:**
- Consumes: complete implementation from Tasks 1–4.
- Produces: handoff summary with changed files and exact validation status.

- [ ] Review the changed pages and routes against the spec's goals, non-goals, content rules, and acceptance criteria.
- [ ] Confirm project details and outbound destinations remain represented in the code; preserve optional/empty data behavior without adding unsupported copy.
- [ ] Check the responsive, keyboard, contrast, focus, and reduced-motion requirements only if the user authorizes those validations; otherwise record that they remain unverified.
- [ ] Do not run automated tests, builds, browser checks, or validation commands unless the user explicitly requests them.
- [ ] Do not commit, deploy, or alter external services without explicit authorization.

## Scope Notes

- The spec's proposed service framing is custom operational systems, integrations, and process automation; the implementation must keep each claim proportional to the projects and experience present in the repository.
- Favorites are retained as an unadvertised compatibility route with local data preserved. This is the plan's default resolution of the spec's open question and can be changed during plan review.
- The three featured project IDs are chosen from current records for operational relevance; verify their full descriptions before writing final case-study copy.
- Per the user's standing preference and current instruction, this plan intentionally contains no automated test/build commands.
