# SEO migration kit — Tebra / PatientPop → Next.js

Scripts and drop-in files for moving a practice off a hosted platform without losing rankings. Plain Node 20+, nothing
to install. Run them from the **new practice site's repo** so the `migration/` folder they write is committed with it:

```bash
node <path-to>/vantage-site/tools/seo-migration/crawl.mjs https://www.practice.com
```

| Script | When | What it does |
| --- | --- | --- |
| `crawl.mjs` | Day one, while the old site is live | Inventories every URL (title, description, headings, JSON-LD, links, images) and archives a copy of each page |
| `speed.mjs` | Before build, and after launch | Core Web Vitals for the key pages via PageSpeed Insights |
| `redirects.mjs` | When the new build runs | Checks every old URL against it and writes the 301 map |
| `verify.mjs` | On staging, then on the live domain | Confirms every old URL lands on a live, indexable page in one hop with its metadata, schema, content and links intact |
| `nextjs/seo.ts`, `nextjs/JsonLd.tsx` | During the build | Old titles/descriptions per page, canonical tags, and practice/provider/treatment schema |

## Runbook, per practice

### 0. Before anything — access, and don't cancel Tebra yet

Tebra switches the site off when the practice cancels, and everything below needs the old site live. Line up first:

- **Domain**: registrar login. Confirm the practice owns the domain, not Tebra. Losing the domain loses the rankings.
- **Google Search Console**: add a *Domain* property verified by DNS TXT record. It survives the platform switch; an
  HTML-tag verification installed by Tebra won't.
- **Google Business Profile**, GA4 and any ad accounts that link to the site.
- Tebra's **booking widget, review widget and forms** — decide what replaces each.
- Who owns the **copy and photos** Tebra produced (check the agreement) before reusing them.

### 1. Crawl and archive the old site

Export from Search Console first: *Performance → Pages* (16 months) and *Indexing → Pages*. Backlink exports (Ahrefs,
Semrush) work the same way.

```bash
node crawl.mjs https://www.practice.com --images --wayback --urls gsc-performance-pages.csv --urls gsc-indexed-pages.csv
```

`--wayback` adds old URLs archive.org has seen, which still have backlinks. The summary shows the URL sections (e.g.
`/contents`), schema types, trailing-slash use, the most-linked pages and gaps. Review `pages.csv`.

Already switched off? `--archive-only` rebuilds the inventory from archive.org captures (`--before 20261001` to skip
any "site deactivated" captures). It's slow and only covers what archive.org captured.

### 2. Speed baseline

```bash
PSI_API_KEY=... node speed.mjs --base https://www.practice.com --label before
```

Needs a free API key: Google Cloud console → enable *PageSpeed Insights API* → Credentials → API key.

### 3. Build the new site

- **Keep the URLs.** Mirror the old paths in `app/` wherever you can. A page at the same URL needs no redirect, which is
  the safest outcome. Clean up ugly paths later, if ever. If the old URLs end in `/`, set `trailingSlash: true`.
- **Static HTML.** Server Components and `generateStaticParams` (the App Router default). No client-side fetching of
  page content, so Google gets the full copy without running JavaScript.
- **Metadata.** Copy `nextjs/seo.ts` to `src/lib/seo.ts`. Each page uses `pageMetadata(path, { oldPath })`, which
  reuses the old title and description from `migration/metadata.json` and sets the canonical tag. Rewrite wording
  later, on purpose, not at launch.
- **Content.** `migration/archive/pages/<path>/page.txt` has each page's copy with headings marked. Carry the
  headings, body copy and FAQs over, then rewrite once rankings have settled.
- **Schema.** Fill in `PRACTICE` in `seo.ts`, using the type from the crawl summary (`Dentist`, `MedicalClinic`…).
  Copy `nextjs/JsonLd.tsx` to `src/components/`. Render `<JsonLd data={[practiceSchema(), websiteSchema()]} />` in
  the root layout and add `servicePageSchema`, `providerSchema`, `breadcrumbSchema` and `faqSchema` per page. Compare
  with `migration/schema.json`. Keep `AggregateRating` only if the reviews themselves appear on the page.
- **Internal links.** Use `links.csv` to rebuild the nav, footer and in-copy links. Keep the most-linked pages within
  two clicks of home. Link to final URLs, matching the trailing-slash setting, so no internal link goes through a
  redirect.
- **Speed.** `next/image` with width/height for every photo, `next/font` for fonts, and no heavy third-party embeds
  above the fold.

### 4. Redirect map

Run the build (`next build && next start`, or a preview deployment) and:

```bash
node redirects.mjs --new http://localhost:3000
```

Write `migration/redirect-rules.json` (see `redirect-rules.example.json`): pattern `rules` for whole sections,
`manual` for one-offs, `remove` for pages that should 404. Re-run until "Needs a decision" is empty. Then wire the
map into `next.config.ts`:

```ts
import type { NextConfig } from "next";
import migrationRedirects from "./migration/redirects.json";

const nextConfig: NextConfig = {
  trailingSlash: true, // match the old site — redirects.mjs tells you which
  async redirects() {
    return (migrationRedirects as { source: string; destination: string }[]).map((r) => ({ ...r, statusCode: 301 as const }));
  },
};

export default nextConfig;
```

Use `statusCode: 301`, not `permanent: true`, which sends a 308. Google treats the two the same, but SEO tools and
clients expect to see a 301. Redirects run at the server/edge before any page code, so they are real HTTP redirects,
not client-side ones. If you change `trailingSlash`, re-run `redirects.mjs`: Next.js matches sources exactly, slash
included.

`redirect-map.csv` actions:

| Action | Meaning |
| --- | --- |
| `kept` | The new site serves the same URL — no redirect |
| `rule` / `manual` | Redirected by a pattern rule / a one-off in `redirect-rules.json` |
| `alias` | The old platform already redirected this URL; it now goes straight to where its target lives |
| `existing` | The new site already redirects it |
| `suggested` | Best guess from the URL words. Not in `redirects.json` until confirmed (or `--accept-suggestions`) |
| `unmapped` | No destination yet. Add it to `manual` or `remove` |
| `remove` / `old-404` | Left to 404 on purpose / already broken on the old site |

### 5. Verify on staging

```bash
node verify.mjs --site https://practice-git-main-team.vercel.app --header "x-vercel-protection-bypass: <token>"
```

Fix every **FAIL**: non-200 endings, temporary (302/307) redirects, noindex, robots.txt blocking the site. Review the
**WARN**s: redirect chains, missing canonical/title/description/H1, schema types the old page had, copy that shrank
by more than half, pages that lost internal links or sit deeper in the site, sitemap URLs that don't load, internal
links that go through a redirect. Details are in `verify-report.csv` and `verify-links.csv`. Preview deployments
always send noindex, so that one is only a warning on `*.vercel.app`.

### 6. Launch

1. Point DNS at the new site. Run `verify.mjs --site https://www.practice.com` right away and fix anything that fails.
2. Search Console: submit `sitemap.xml`, plus `legacy-sitemap.xml` (copy it to `public/`) so Google re-crawls the old
   URLs and sees the 301s sooner. Remove the legacy sitemap after about four weeks. Use URL Inspection on the top pages.
3. Update the Google Business Profile website and booking links if they pointed at Tebra URLs.
4. **Then** let the practice cancel Tebra.

### 7. After launch

- `speed.mjs --base https://www.practice.com --label after` compares against the baseline.
- Watch Search Console (Pages and Performance) weekly for 6–8 weeks. Some movement in the first weeks is normal.
- Keep the redirects permanently.

## Notes

- HTML is parsed with regular expressions. That works for platform-generated markup, but check the archive copies if
  the crawl warns that pages have almost no text: the site may render its content with JavaScript.
- Vercel allows 1,024 redirects per deployment. Past that, move the map into `proxy.ts` (see "Managing redirects at
  scale" in the Next.js redirect docs).
- The crawler respects robots.txt (`--ignore-robots` to override) and identifies itself as `VantageMigrationBot`.
