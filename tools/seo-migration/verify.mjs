#!/usr/bin/env node
// Step 4 — on staging before the DNS switch, and again on the live domain after: request every old
// URL and check it lands on a live, indexable page in one hop, with its title, description, schema,
// content and internal links intact. Exits with code 1 if anything fails.
import path from "node:path";
import { parseArgs } from "node:util";
import {
  assertReachable, crawlSite, csv, extractPage, fetchPage, isRedirect, loadRobots, mapPool, parseHeaders, pathOf, readJson, readSitemaps,
  saveFile, shownPath, siteUrl, stripSlash,
} from "./lib.mjs";

const USAGE = `
Usage: node tools/seo-migration/verify.mjs --site <new-site-url> [options]

  --site <url>        Staging/preview URL before launch, the real domain after
  --out <dir>         Folder holding inventory.json; the report is written here (default: migration)
  --no-links          Skip crawling the new site for the internal-link comparison
  --max <n>           Max pages to crawl on the new site (default 2000)
  --header "K: V"     Extra request header, e.g. a Vercel protection-bypass token. Repeatable.
`;

const { values: opt } = parseArgs({
  options: {
    site: { type: "string" },
    out: { type: "string", default: "migration" },
    "no-links": { type: "boolean", default: false },
    max: { type: "string", default: "2000" },
    header: { type: "string", multiple: true },
    help: { type: "boolean", short: "h", default: false },
  },
});
if (opt.help || !opt.site) {
  console.log(USAGE);
  process.exit(opt.help ? 0 : 1);
}

const out = path.resolve(opt.out);
const site = siteUrl(opt.site);
const headers = parseHeaders(opt.header);
const inv = await readJson(path.join(out, "inventory.json"));
await assertReachable(site, headers);
const oldHost = new URL(inv.site).host;
const preview = /\.vercel\.app$/i.test(site.hostname);
const siteIssues = [];

/* ------------------------------------------------------------ site-wide ---- */

const robots = await loadRobots(site, headers);
if (!robots.found) siteIssues.push({ sev: "warn", msg: "No robots.txt" });
else if (!robots.allowed("/")) siteIssues.push({ sev: "fail", msg: "robots.txt blocks the whole site (Disallow: /)" });

const sitemapUrls = robots.sitemaps.length ? robots.sitemaps.map((u) => new URL(pathOf(u) ?? "/sitemap.xml", site).href) : [new URL("/sitemap.xml", site).href];
const sitemapPaths = [...new Set((await readSitemaps(sitemapUrls, headers)).map(pathOf).filter(Boolean))];
if (!sitemapPaths.length) siteIssues.push({ sev: "warn", msg: "No sitemap.xml (or it lists no URLs)" });

/* --------------------------------------------------------- link graph ---- */

let crawl = null;
if (!opt["no-links"]) {
  console.log(`Crawling ${site.origin} for the internal-link comparison…`);
  crawl = await crawlSite(site.href, {
    headers,
    aliases: [oldHost],
    max: Number(opt.max),
    concurrency: 4,
    delay: 50,
    seeds: [{ url: site.href, source: "start" }, ...sitemapPaths.map((p) => ({ url: new URL(p, site).href, source: "sitemap" }))],
  });
}
const newPage = new Map((crawl?.pages ?? []).map((p) => [stripSlash(p.path), p]));
const oldPageCount = inv.pages.filter((p) => p.kind === "page").length || 1;
const newPageCount = (crawl?.pages ?? []).filter((p) => p.kind === "page").length || 1;

for (const p of sitemapPaths) {
  const rec = newPage.get(stripSlash(p));
  if (crawl && rec && rec.kind !== "page" && rec.kind !== "doc") siteIssues.push({ sev: "warn", msg: `Sitemap lists ${p}, which returns ${rec.status}` });
}

/* ------------------------------------------------------------- per URL ---- */

async function follow(p) {
  const chain = [];
  let url = new URL(p, site).href;
  for (let i = 0; i < 6; i++) {
    const r = await fetchPage(url, { headers });
    chain.push(r);
    if (!isRedirect(r.status) || !r.location) break;
    url = r.location;
  }
  return chain;
}

// Generic container types that don't need to survive one-for-one.
const MINOR_TYPES = new Set(["WebPage", "WebSite", "ListItem", "ImageObject", "SearchAction", "EntryPoint", "PropertyValueSpecification", "SiteNavigationElement", "WPHeader", "WPFooter"]);
const oldPages = inv.pages.filter((p) => ["page", "doc", "redirect"].includes(p.kind));

const results = await mapPool(oldPages, 4, async (old) => {
  const chain = await follow(old.path);
  const final = chain.at(-1);
  const finalPath = pathOf(final.url) ?? old.path;
  const hops = chain.length - 1;
  const issues = [];
  // `group` is the summary line this issue is counted under.
  const add = (sev, msg, group = msg) => issues.push({ sev, msg, group });

  if (isRedirect(final.status)) add("fail", "redirect loop or more than 5 hops");
  else if (final.status !== 200) add("fail", `ends in ${final.status || final.error}`);
  const temporary = chain.slice(0, -1).filter((r) => ![301, 308].includes(r.status));
  if (temporary.length) add("fail", `temporary redirect (${temporary.map((r) => r.status).join(", ")}) — must be 301`, "temporary redirect (302/307) — must be 301");
  if (hops > 1) add("warn", `${hops} redirect hops — point it straight at the final URL`, "redirect chain (2+ hops)");

  let page = null;
  if (final.status === 200 && final.text !== undefined && final.type.includes("html")) {
    page = extractPage(final.text, final.url);
    if (/noindex/i.test(`${page.robots} ${final.xRobots}`))
      add(preview ? "warn" : "fail", preview ? "noindex (normal on a Vercel preview; must be gone on the live domain)" : "noindex — Google will drop this page");
    const canonicalPath = page.canonical ? pathOf(page.canonical) : null;
    if (!page.canonical) add("warn", "no canonical tag");
    else if (stripSlash(canonicalPath ?? "") !== stripSlash(finalPath)) add("warn", `canonical points to ${page.canonical}`, "canonical points to another URL");
    if (!page.title) add("warn", "no title");
    if (!page.description) add("warn", "no meta description");
    if (!page.h1.length) add("warn", "no H1");
    if (old.kind === "page") {
      const lost = old.schemaTypes.filter((t) => !MINOR_TYPES.has(t) && !page.schemaTypes.includes(t));
      if (lost.length) add("warn", `schema types missing: ${lost.join(", ")}`);
      if (old.words >= 150 && page.words < old.words * 0.5) add("warn", `content shrank from ${old.words} to ${page.words} words`, "content shrank by more than half");
    }
  }

  const now = newPage.get(stripSlash(finalPath));
  if (crawl && now && old.kind === "page" && old.inLinks >= 3) {
    // Compare the share of pages linking in, so a smaller site isn't flagged for having fewer pages.
    if (now.inLinks / newPageCount < old.inLinks / oldPageCount / 2) add("warn", `internal links in: ${old.inLinks} of ${oldPageCount} pages before, ${now.inLinks} of ${newPageCount} now`, "fewer internal links pointing in");
    if (old.clickDepth !== null && old.clickDepth <= 2 && (now.clickDepth === null || now.clickDepth > 3))
      add("warn", `buried: ${old.clickDepth} clicks from home before, ${now.clickDepth ?? "not linked"} now`, "buried deeper in the site");
  }

  const level = issues.some((i) => i.sev === "fail") ? "FAIL" : issues.length ? "WARN" : "OK";
  return { old, level, chain, finalPath, page, issues };
});

/* ------------------------------------------------------------- outputs ---- */

const linkProblems = (crawl?.pages ?? [])
  .filter((p) => p.inLinks > 0 && ["redirect", "missing", "error"].includes(p.kind))
  .map((p) => ({ ...p, from: crawl.pages.filter((src) => src.outLinks?.some((l) => l.to === p.path)).map((src) => src.path) }));

await saveFile(
  path.join(out, "verify-report.csv"),
  csv([
    ["old_path", "result", "chain", "final_path", "old_title", "new_title", "title_kept", "old_description_kept", "old_words", "new_words",
      "old_schema", "new_schema", "issues"],
    ...results.map((r) => [
      r.old.path, r.level, r.chain.map((c) => c.status || "error").join(" → "), r.finalPath, r.old.title, r.page?.title,
      r.page && r.old.title ? (r.page.title === r.old.title ? "yes" : "no") : "", r.page && r.old.description ? (r.page.description === r.old.description ? "yes" : "no") : "",
      r.old.words, r.page?.words, r.old.schemaTypes, r.page?.schemaTypes, r.issues.map((i) => i.msg),
    ]),
  ]),
);
if (crawl)
  await saveFile(
    path.join(out, "verify-links.csv"),
    csv([["linked_url", "status", "problem", "linked_from"], ...linkProblems.map((p) => [p.path, p.status, p.kind === "redirect" ? `redirects to ${p.redirectTo}` : "broken", p.from])]),
  );

const levels = results.reduce((m, r) => m.set(r.level, (m.get(r.level) ?? 0) + 1), new Map());
const byIssue = new Map();
for (const r of results) for (const i of r.issues) {
  const key = `${i.sev === "fail" ? "FAIL" : "warn"}  ${i.group}`;
  byIssue.set(key, (byIssue.get(key) ?? 0) + 1);
}
const pagesWithSchema = results.filter((r) => r.page?.jsonld.length).length;
const htmlResults = results.filter((r) => r.page).length;

console.log(`
${results.length} old URLs checked on ${site.origin}${preview ? " (Vercel preview)" : ""}
  OK ${levels.get("OK") ?? 0} · WARN ${levels.get("WARN") ?? 0} · FAIL ${levels.get("FAIL") ?? 0}
  Kept at the same URL: ${results.filter((r) => r.chain.length === 1 && r.chain[0].status === 200).length} · one redirect: ${results.filter((r) => r.chain.length === 2 && r.chain.at(-1).status === 200).length}
  JSON-LD on ${pagesWithSchema} of ${htmlResults} landing pages`);
for (const i of siteIssues) console.log(`  ${i.sev === "fail" ? "FAIL" : "warn"}  ${i.msg}`);
const failsFirst = (key) => (key.startsWith("FAIL") ? 0 : 1);
for (const [msg, n] of [...byIssue].sort((a, b) => failsFirst(a[0]) - failsFirst(b[0]) || b[1] - a[1])) console.log(`  ${msg}  ×${n}`);
if (crawl) {
  const toRedirects = linkProblems.filter((p) => p.kind === "redirect").length;
  console.log(`  New site: ${newPageCount} pages crawled · ${toRedirects} internal links go through a redirect · ${linkProblems.length - toRedirects} internal links are broken`);
}
console.log(`\nWrote verify-report.csv${crawl ? " and verify-links.csv" : ""} to ${shownPath(out)}/\n`);

process.exit(levels.get("FAIL") || siteIssues.some((i) => i.sev === "fail") ? 1 : 0);
