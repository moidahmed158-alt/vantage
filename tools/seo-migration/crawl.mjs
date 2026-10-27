#!/usr/bin/env node
// Step 1 — inventory and archive the old site: every URL, its title/description/headings, JSON-LD,
// internal links and images, plus a copy of each page. Run it while the old site is still live.
import path from "node:path";
import { parseArgs } from "node:util";
import {
  crawlSite, csv, fail, fetchBytes, loadRobots, mapPool, parseHeaders, pct, readSitemaps, readUrlList, safePath, saveFile,
  schemaTypes, shownPath, siteUrl, waybackSnapshots,
} from "./lib.mjs";

const USAGE = `
Usage: node tools/seo-migration/crawl.mjs <old-site-url> [options]

  --out <dir>          Output folder (default: migration)
  --urls <file>        Extra URLs: a Search Console "Pages" export, backlink export or plain list. Repeatable.
  --wayback            Also seed URLs archive.org has seen (finds old pages that still have backlinks)
  --archive-only       The site is already switched off: rebuild the inventory from archive.org captures
  --before <YYYYMMDD>  With --archive-only, use only captures made before this date
  --images             Download every image the pages use into the archive
  --max <n>            Stop after this many URLs (default 2000)
  --concurrency <n>    Parallel requests (default 3)
  --delay <ms>         Pause between requests per worker (default 250)
  --header "K: V"      Extra request header. Repeatable.
  --ignore-robots      Crawl paths robots.txt disallows
  --no-archive         Skip saving page copies
`;

const { values: opt, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    out: { type: "string", default: "migration" },
    urls: { type: "string", multiple: true },
    wayback: { type: "boolean", default: false },
    "archive-only": { type: "boolean", default: false },
    before: { type: "string" },
    images: { type: "boolean", default: false },
    max: { type: "string", default: "2000" },
    concurrency: { type: "string", default: "3" },
    delay: { type: "string", default: "250" },
    header: { type: "string", multiple: true },
    "ignore-robots": { type: "boolean", default: false },
    "no-archive": { type: "boolean", default: false },
    help: { type: "boolean", short: "h", default: false },
  },
});
if (opt.help || !positionals[0]) {
  console.log(USAGE);
  process.exit(opt.help ? 0 : 1);
}

const site = siteUrl(positionals[0]);
const out = path.resolve(opt.out);
const archive = path.join(out, "archive");
const headers = parseHeaders(opt.header);
const archiveOnly = opt["archive-only"];

/* ------------------------------------------------------------------ seeds ---- */

let seeds = [{ url: site.href, source: "start" }];
let robots = null;
const cdxProgress = (rows, urls) => console.log(`  ${rows} captures read · ${urls} distinct URLs`);
if (archiveOnly) {
  console.log(`Asking archive.org for captures of ${site.host} (it can be slow)…`);
  const snaps = await waybackSnapshots(site, { to: opt.before, onPage: cdxProgress });
  if (!snaps.length) fail(`archive.org has no HTML captures for ${site.host}${opt.before ? ` before ${opt.before}` : ""}.`);
  seeds = snaps.map((s) => ({ url: s.url, source: `wayback:${s.timestamp}`, fetchUrl: s.replay }));
  console.log(`  ${snaps.length} archived pages`);
} else {
  robots = await loadRobots(site, headers);
  const sitemapUrls = robots.sitemaps.length ? robots.sitemaps : ["/sitemap.xml", "/sitemap_index.xml"].map((p) => new URL(p, site).href);
  const fromSitemaps = await readSitemaps(sitemapUrls, headers);
  seeds.push(...fromSitemaps.map((url) => ({ url, source: "sitemap" })));
  for (const file of opt.urls ?? []) seeds.push(...(await readUrlList(file)).map((url) => ({ url, source: "list" })));
  if (opt.wayback) seeds.push(...(await waybackSnapshots(site, { onPage: cdxProgress })).map((s) => ({ url: s.url, source: "wayback" })));
  console.log(`Seeds: ${fromSitemaps.length} from sitemaps, ${seeds.length - fromSitemaps.length - 1} from lists/archive.org`);
}

/* ------------------------------------------------------------------ crawl ---- */

const tty = process.stdout.isTTY;
const result = await crawlSite(site.href, {
  seeds,
  // archive.org throttles hard; one request at a time with a pause keeps it answering.
  concurrency: archiveOnly ? 1 : Number(opt.concurrency),
  delay: archiveOnly ? Math.max(1200, Number(opt.delay)) : Number(opt.delay),
  max: Number(opt.max),
  headers,
  robots: opt["ignore-robots"] ? null : robots,
  follow: !archiveOnly,
  onPage: async (rec, html, text) => {
    if (opt["no-archive"]) return;
    const dir = path.join(archive, "pages", safePath(rec.path));
    await saveFile(path.join(dir, "page.html"), html);
    await saveFile(path.join(dir, "page.txt"), `${rec.url}\n\n${text}\n`);
  },
  onDoc: (rec, bytes) => saveFile(path.join(archive, "files", safePath(rec.path)), bytes),
  onProgress: (done, queued) => {
    if (tty) process.stdout.write(`\r  ${done} fetched · ${queued} queued   `);
    else if (done % 50 === 0) console.log(`  ${done} fetched · ${queued} queued`);
  },
});
if (tty) process.stdout.write("\n");

const pages = result.pages.map((p) =>
  archiveOnly ? { ...p, archivedAt: p.sources.find((s) => s.startsWith("wayback:"))?.slice(8) ?? null } : p,
);
const html = pages.filter((p) => p.kind === "page");

/* ---------------------------------------------------------------- images ---- */

if (opt.images) {
  const srcs = [...new Map(html.flatMap((p) => p.images.map((img) => [img.src, p]))).entries()];
  console.log(`Downloading ${srcs.length} images…`);
  let saved = 0;
  await mapPool(srcs, archiveOnly ? 1 : 4, async ([src, page]) => {
    const u = new URL(src);
    const fetchFrom = archiveOnly && page.archivedAt ? `https://web.archive.org/web/${page.archivedAt}im_/${src}` : src;
    const bytes = await fetchBytes(fetchFrom, headers);
    if (!bytes) return;
    const name = safePath(u.pathname) + (u.search ? `_${Buffer.from(u.search).toString("base64url").slice(0, 12)}` : "");
    await saveFile(path.join(archive, "images", u.hostname, name), bytes);
    saved++;
  });
  console.log(`  saved ${saved}`);
}

/* ---------------------------------------------------------------- outputs ---- */

await saveFile(
  path.join(out, "inventory.json"),
  JSON.stringify(
    { site: site.origin, mode: archiveOnly ? "archive.org" : "live", crawledAt: new Date().toISOString(), capped: result.capped, robotsBlocked: result.blocked, pages },
    null,
    2,
  ),
);

await saveFile(
  path.join(out, "pages.csv"),
  csv([
    ["path", "kind", "status", "redirect_to", "title", "title_chars", "description", "description_chars", "h1", "h1_count", "words",
      "schema_types", "in_links", "click_depth", "canonical", "robots", "sources"],
    ...pages.map((p) => [
      p.path, p.kind, p.status, p.redirectTo, p.title, p.title?.length, p.description, p.description?.length, p.h1?.[0], p.h1?.length,
      p.words, p.schemaTypes, p.inLinks, p.clickDepth ?? "orphan", p.canonical, p.robots, p.sources,
    ]),
  ]),
);

await saveFile(path.join(out, "links.csv"), csv([["from", "to", "anchor_text"], ...html.flatMap((p) => p.outLinks.map((l) => [p.path, l.to, l.anchor]))]));

await saveFile(path.join(out, "images.csv"), csv([["page", "src", "alt"], ...html.flatMap((p) => p.images.map((i) => [p.path, i.src, i.alt ?? "(missing)"]))]));

// What the new site reads to keep each page's title and description (see nextjs/seo.ts).
await saveFile(
  path.join(out, "metadata.json"),
  JSON.stringify(Object.fromEntries(html.filter((p) => p.status === 200).map((p) => [p.path, { title: p.title, description: p.description }])), null, 2),
);

// Each distinct JSON-LD block once, with the pages it appeared on.
const blocks = new Map();
for (const p of html)
  for (const block of p.jsonld) {
    const key = JSON.stringify(block);
    const entry = blocks.get(key) ?? blocks.set(key, { block, pages: [] }).get(key);
    entry.pages.push(p.path);
  }
await saveFile(
  path.join(out, "schema.json"),
  JSON.stringify(
    [...blocks.values()].map((e) => ({ types: schemaTypes([e.block]), pageCount: e.pages.length, pages: e.pages.slice(0, 25), block: e.block })),
    null,
    2,
  ),
);

/* ---------------------------------------------------------------- summary ---- */

const count = (list, key) => list.reduce((m, x) => m.set(key(x), (m.get(key(x)) ?? 0) + 1), new Map());
const top = (map, n = 8) => [...map].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => `${k} (${v})`).join(" · ");
const byKind = count(pages, (p) => p.kind);
const titles = count(html.filter((p) => p.title), (p) => p.title);
const sources = count(pages.flatMap((p) => p.sources.map((s) => s.replace(/:.*/, ""))), (s) => s);
const slashPages = html.filter((p) => p.path !== "/" && p.path.endsWith("/")).length;
const thin = html.filter((p) => p.words < 60 && p.outLinks.length < 5).length;

console.log(`
Old site: ${site.origin} (${archiveOnly ? "from archive.org" : "live"}) — ${pages.length} URLs
  pages ${byKind.get("page") ?? 0} · documents ${byKind.get("doc") ?? 0} · redirects ${byKind.get("redirect") ?? 0} · missing ${byKind.get("missing") ?? 0} · errors ${byKind.get("error") ?? 0}
  Found via:      ${top(sources)}
  Sections:       ${top(count(html, (p) => "/" + (p.path.split("/")[1] ?? "")))}
  Schema types:   ${top(count(html.flatMap((p) => p.schemaTypes), (t) => t), 12) || "none"}
  Trailing slash: ${slashPages} of ${html.length - 1} pages end in "/"
  Most linked:    ${html.slice().sort((a, b) => b.inLinks - a.inLinks).slice(0, 8).map((p) => `${p.path} (${p.inLinks})`).join(" · ")}
  Gaps:           ${html.filter((p) => !p.title).length} no title · ${html.filter((p) => !p.description).length} no description · ${html.filter((p) => !p.h1.length).length} no H1 · ${[...titles.values()].filter((n) => n > 1).length} duplicated titles · ${html.filter((p) => p.clickDepth === null).length} orphans`);
if (result.blocked.length) console.log(`  ! robots.txt blocked ${result.blocked.length} URLs (re-run with --ignore-robots to include them)`);
if (result.capped) console.log(`  ! Stopped at --max ${opt.max}; raise it to crawl the rest`);
if (html.length && thin / html.length > 0.3)
  console.log(`  ! ${pct(thin, html.length)} of pages have under 60 words of HTML text — the site may build its content with JavaScript, so check the archive copies`);
if (byKind.get("error")) console.log(`  ! ${byKind.get("error")} URLs failed to load; re-run to retry them`);
console.log(`
Wrote ${shownPath(out)}/
  inventory.json  everything above, per URL (input for redirects.mjs and verify.mjs)
  pages.csv       one row per URL — open in Excel/Sheets to review
  links.csv       internal link graph with anchor text
  images.csv      every image and its alt text
  metadata.json   titles and descriptions, read by the new site
  schema.json     each distinct JSON-LD block the old site served
  archive/        ${opt["no-archive"] ? "(skipped)" : "a copy of every page (HTML + plain text) and document"}${opt.images ? " and image" : ""}
`);
