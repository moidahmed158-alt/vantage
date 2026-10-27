# Vantage Digital Health — website

Next.js 16 (App Router) build of the Vantage Digital Health site, ported from the "Vantage — Brand & Website" design canvas
and its "Signal" neon design system.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

## Editing copy

All copy lives next to the page that shows it. Repeated content (cards, FAQs, plans, table rows, directory data) is kept in
typed arrays at the top of each page file, so most edits are text changes in one place.

| Where | What |
| --- | --- |
| `src/lib/site.ts` | Site name, email, tagline, URL, nav groups, specialty list, route paths |
| `src/app/page.tsx` | Home page |
| `src/app/<route>/page.tsx` | Each other page (`services`, `pricing`, `contact`, …) |
| `src/app/services/<service>/` | Service detail pages; shared layout pieces in `src/app/services/_detail/` |
| `src/app/integrations/data.ts` | Integrations directory data |
| `src/components/site/Header.tsx`, `Footer.tsx` | Navigation and footer links |

### Review flags and placeholders

- **Amber "verify before publishing" flags** (`<Flag>`) mark figures, testimonials and packaging carried over from the old
  site. Hide every one at once with `SHOW_CONTENT_FLAGS = false` in `src/lib/site.ts`.
- **`[PLACEHOLDER]` chips** (`<Ph>`) stand in for copy still to be supplied (prices, terms, team bios). Search the code for
  `<Ph>` to find them all.
- "Illustrative — not client data" labels on mock UIs are permanent disclaimers, not review flags.

## Structure

```
src/
  app/
    globals.css          design system (tokens, components, responsive rules)
    layout.tsx           fonts, metadata, header, footer, effects
    page.tsx             home
    <route>/page.tsx     one folder per page, with a colocated *.module.css
    sitemap.ts robots.ts opengraph-image.tsx icon.svg
  components/
    site/                Header (mega menus + mobile drawer), Footer, Effects (scroll reveal, card spotlight)
    ui/                  Icon, Mark/Logo, Btn/RowLink, Accordion, Counter, Radar, Flag/Ph, SectionHead/Crumbs/CtaBand
  lib/site.ts            site-wide constants
tools/
  seo-migration/         crawl → redirect map → verify scripts for moving client practice sites off Tebra/PatientPop
                         (not part of this site's build; see its README)
```

### Design system notes

- Tokens are CSS variables on `:root` in `globals.css` (`--ink*` surfaces, `--line*` borders, `--blue*`/`--cyan*` accents,
  `--fg*` text). Fonts: Sora (display), Plus Jakarta Sans (body), JetBrains Mono (labels), self-hosted via `next/font`.
- Breakpoints: 1180, 1080 (nav collapses to the drawer, splits stack), 860, 760 (phone layout), 560, 420.
- Motion: add `data-reveal` to an element (or `data-stagger` to a list/grid) to animate it in on scroll. All motion
  respects `prefers-reduced-motion`.
- Pages `/privacy` and `/terms` are drafts for legal review. `/brand` is the internal brand guidelines page (not indexed,
  not linked from the nav).

## Forms

The contact and integration-request forms validate in the browser and finish with a prefilled email to the address in
`SITE.email`. To send submissions to a CRM or email service instead, replace the clearly marked submit function in each
form component.
