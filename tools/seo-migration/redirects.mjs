#!/usr/bin/env node
// Step 3 — check every old URL against the new build and write the 301 map: keep what the new
// site already serves at the same path, redirect the rest to the right page, flag what needs a human.
import path from "node:path";
import { parseArgs } from "node:util";
import {
  assertReachable, csv, fetchPage, isRedirect, mapPool, parseHeaders, pathOf, readJson, readSitemaps, sameSiteUrl, saveFile, shownPath, siteUrl,
  stripSlash,
} from "./lib.mjs";

const USAGE = `
Usage: node tools/seo-migration/redirects.mjs --new <new-site-url> [options]

  --new <url>             The new build: local "next start", a preview or the production deployment
  --out <dir>             Folder holding inventory.json; outputs are written here too (default: migration)
  --rules <file>          Redirect rules (default: <out>/redirect-rules.json if it exists)
  --accept-suggestions    Put best-guess matches into redirects.json instead of leaving them for review
  --header "K: V"         Extra request header, e.g. a Vercel protection-bypass token. Repeatable.
`;

const { values: opt } = parseArgs({
  options: {
    new: { type: "string" },
    out: { type: "string", default: "migration" },
    rules: { type: "string" },
    "accept-suggestions": { type: "boolean", default: false },
    header: { type: "string", multiple: true },
    help: { type: "boolean", short: "h", default: false },
  },
});
if (opt.help || !opt.new) {
  console.log(USAGE);
  process.exit(opt.help ? 0 : 1);
}

const out = path.resolve(opt.out);
const newSite = siteUrl(opt.new);
const headers = parseHeaders(opt.header);
const inv = await readJson(path.join(out, "inventory.json"));
await assertReachable(newSite, headers);
const ruleSet = await readJson(opt.rules ?? path.join(out, "redirect-rules.json"), {});
const manual = new Map(Object.entries(ruleSet.manual ?? {}).map(([from, to]) => [stripSlash(from), to]));
const remove = new Set((ruleSet.remove ?? []).map(stripSlash));
const rules = (ruleSet.rules ?? []).map(compileRule);

/** Same pattern syntax as Next.js redirects: /contents/services/:slug, /blog/:path*, /x/:id? */
function compileRule({ from, to }) {
  const names = [];
  const parts = stripSlash(from)
    .split("/")
    .slice(1)
    .map((seg) => {
      const m = seg.match(/^:(\w+)([*+?]?)$/);
      if (!m) return "/" + seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      names.push(m[1]);
      return { "*": "(?:/(.*))?", "+": "/(.+)", "?": "(?:/([^/]+))?" }[m[2]] ?? "/([^/]+)";
    });
  const re = new RegExp(`^${parts.join("")}/?$`);
  return {
    from,
    to,
    apply(p) {
      const m = p.match(re);
      if (!m) return null;
      const dest = to.replace(/:(\w+)[*+?]?/g, (_, n) => m[names.indexOf(n) + 1] ?? "");
      return /^https?:/.test(dest) ? dest : stripSlash(dest.replace(/\/{2,}/g, "/"));
    },
  };
}

/* ------------------------------------------------------------- probing ---- */

const probes = new Map();
const probe = (p) => {
  if (!probes.has(p)) probes.set(p, fetchPage(new URL(p, newSite).href, { headers }));
  return probes.get(p);
};

/** Where `p` ends up on the new site, following up to 3 of its redirects. */
async function resolve(p) {
  if (/^https?:/.test(p)) return { status: 200, path: p, hops: 0, external: true };
  let cur = p;
  for (let hops = 0; hops < 4; hops++) {
    const r = await probe(cur);
    if (!isRedirect(r.status)) return { status: r.status, path: cur, hops };
    const next = r.location ? new URL(r.location) : null;
    if (!next) return { status: r.status, path: cur, hops };
    if (next.host !== newSite.host) return { status: 200, path: r.location, hops: hops + 1, external: true };
    cur = next.pathname;
  }
  return { status: 0, path: cur, hops: 4 };
}

const newPaths = (await readSitemaps([new URL("/sitemap.xml", newSite).href], headers)).map(pathOf).filter(Boolean);

const STOP = new Set(["contents", "content", "services", "service", "html", "htm", "php", "aspx", "index", "page", "the", "and", "of", "in", "for", "a", "to", "our", "us"]);
const tokens = (p) => new Set(decodeURIComponent(p).toLowerCase().split(/[^a-z0-9]+/).filter((t) => t && !STOP.has(t)));

/** Closest new-site path by shared words in the URL. */
function suggest(p) {
  const a = tokens(p);
  let best = null;
  for (const candidate of newPaths) {
    const b = tokens(candidate);
    const shared = [...a].filter((t) => b.has(t)).length;
    const score = shared / (a.size + b.size - shared || 1);
    if (!best || score > best.score) best = { path: candidate, score };
  }
  return best && best.score >= 0.5 ? best : null;
}

/* -------------------------------------------------------------- mapping ---- */

// Pages, documents and the old platform's own redirects; dead URLs only if something outside
// the site (sitemap, Search Console, archive.org) still knew about them.
const candidates = inv.pages.filter(
  (p) => ["page", "doc", "redirect"].includes(p.kind) || (p.kind === "missing" && p.sources.some((s) => !["link", "redirect"].includes(s))),
);

async function classify(page) {
  const p = page.path;
  const key = stripSlash(p);
  if (manual.has(key)) {
    const r = await resolve(manual.get(key));
    return { action: "manual", to: r.path, note: r.status === 200 ? "" : `! manual target returns ${r.status || "an error"}` };
  }
  if (remove.has(key)) return { action: "remove", note: "will 404 on purpose" };

  const first = await probe(p);
  if (first.status === 200) return { action: "kept", to: p };
  if (isRedirect(first.status) && stripSlash(pathOf(first.location) ?? "") === key) {
    const r = await resolve(p);
    if (r.status === 200) return { action: "kept", to: r.path, note: `extra hop: new site ${p.endsWith("/") ? "removes" : "adds"} the trailing slash` };
  }
  const notes = [];
  for (const rule of rules) {
    const dest = rule.apply(p);
    if (dest === null) continue;
    const r = await resolve(dest);
    if (r.status === 200) return { action: "rule", to: r.path, note: `${rule.from}${r.external ? " (external, not checked)" : ""}` };
    notes.push(`rule ${rule.from} → ${dest} returns ${r.status || "an error"}`);
  }
  if (page.kind === "redirect") return { action: "alias", note: notes.join("; ") };
  if (isRedirect(first.status)) {
    const r = await resolve(p);
    if (r.status === 200) return { action: "existing", to: r.path, note: "new site already redirects this" };
  }
  if (page.kind === "missing") return { action: "old-404", note: notes.join("; ") || "already broken on the old site" };
  const s = suggest(p);
  if (s) return { action: "suggested", to: s.path, note: [`${Math.round(s.score * 100)}% URL match — confirm`, ...notes].join("; ") };
  return { action: "unmapped", note: notes.join("; ") };
}

const rows = await mapPool(candidates, 4, async (page) => ({ page, ...(await classify(page)) }));

// The old platform's own redirects point wherever their target ended up.
const oldSite = new URL(inv.site);
const oldPath = (url) => sameSiteUrl(url, url, oldSite)?.pathname;
const byPath = new Map(rows.map((r) => [stripSlash(r.page.path), r]));
for (const row of rows.filter((r) => r.action === "alias")) {
  let target = row.page.redirectTo;
  for (let hops = 0; hops < 5 && oldPath(target); hops++) {
    const next = byPath.get(stripSlash(oldPath(target)));
    if (!next || next === row) break;
    if (next.to) {
      Object.assign(row, { action: next.action === "suggested" ? "suggested" : "alias", to: next.to, note: `old site redirected to ${next.page.path}` });
      break;
    }
    if (next.action !== "alias") break;
    target = next.page.redirectTo;
  }
  if (!row.to) Object.assign(row, { action: "unmapped", note: [`old site redirected to ${target}`, row.note].filter(Boolean).join("; ") });
}

/* -------------------------------------------------------------- outputs ---- */

// Next.js matches redirect sources exactly, trailing slash included, and runs its own slash
// redirect first — so sources (and pattern destinations) must use the form the new site serves.
async function servesTrailingSlash() {
  const sample = newPaths.find((p) => p !== "/" && !/\.\w+$/.test(p));
  if (!sample) return false;
  const r = await probe(sample.endsWith("/") ? sample : `${sample}/`);
  return r.status === 200 || (isRedirect(r.status) && Boolean(pathOf(r.location)?.endsWith("/")));
}
const trailing = await servesTrailingSlash();
const slashForm = (p) => (/^https?:/.test(p) || /\.\w+$/.test(p) ? p : trailing ? (p.endsWith("/") ? p : `${p}/`) : stripSlash(p));
// Next.js treats these characters in `source` as pattern syntax.
const escapeSource = (p) => p.replace(/[(){}:*+?]/g, "\\$&");

const REDIRECTING = new Set(["manual", "rule", "alias", "existing", ...(opt["accept-suggestions"] ? ["suggested"] : [])]);
const seen = new Set();
const redirects = [];
const movedUrls = [];
for (const row of rows) {
  const key = stripSlash(row.page.path);
  if (!REDIRECTING.has(row.action) || !row.to || stripSlash(row.to) === key || seen.has(key)) continue;
  seen.add(key);
  redirects.push({ source: escapeSource(slashForm(row.page.path)), destination: row.to });
  movedUrls.push(new URL(row.page.path, inv.site).href);
}

// Pattern rules also catch old URLs nobody found — unless they would swallow a page the new site serves.
const warnings = [];
const served = [...rows.filter((r) => r.action === "kept").map((r) => r.page.path), ...newPaths];
for (const rule of rules) {
  const clash = served.find((p) => rule.apply(p) !== null);
  if (clash) warnings.push(`Rule ${rule.from} not added as a catch-all: it would also redirect ${clash}, which the new site serves.`);
  else redirects.push({ source: slashForm(rule.from), destination: slashForm(rule.to) });
}
if (redirects.length > 1000) warnings.push(`${redirects.length} redirects — Vercel allows 1,024. Move them into proxy.ts (see README).`);

await saveFile(path.join(out, "redirects.json"), JSON.stringify(redirects, null, 2) + "\n");
await saveFile(
  path.join(out, "redirect-map.csv"),
  csv([
    ["old_path", "old_kind", "old_status", "title", "in_links", "sources", "action", "new_path", "note"],
    ...rows.map((r) => [r.page.path, r.page.kind, r.page.status, r.page.title, r.page.inLinks, r.page.sources, r.action, r.to, r.note]),
  ]),
);
// Submit this in Search Console for a few weeks after launch so Google re-crawls the old URLs and sees the 301s.
await saveFile(
  path.join(out, "legacy-sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${movedUrls
    .map((url) => `  <url><loc>${url.replace(/&/g, "&amp;")}</loc></url>`)
    .join("\n")}\n</urlset>\n`,
);

const tally = rows.reduce((m, r) => m.set(r.action, (m.get(r.action) ?? 0) + 1), new Map());
const pages = inv.pages.filter((p) => p.kind === "page" && p.path !== "/");
const slashShare = pages.filter((p) => p.path.endsWith("/")).length / (pages.length || 1);
const extraHops = rows.filter((r) => r.note?.startsWith("extra hop")).length;
const review = rows.filter((r) => ["unmapped", "suggested"].includes(r.action)).sort((a, b) => b.page.inLinks - a.page.inLinks);

console.log(`
${rows.length} old URLs checked against ${newSite.origin}
  ${["kept", "manual", "rule", "alias", "existing", "suggested", "remove", "old-404", "unmapped"].map((a) => `${a} ${tally.get(a) ?? 0}`).join(" · ")}
  redirects.json: ${redirects.length} entries${opt["accept-suggestions"] ? " (suggestions included)" : ""}, written for trailingSlash: ${trailing}`);
if (slashShare > 0.5 && !trailing) console.log(`  ! Most old URLs end in "/". Set trailingSlash: true in next.config.ts so they resolve without an extra hop.`);
else if (extraHops) console.log(`  ! ${extraHops} kept URLs take an extra trailing-slash hop on the new site — see the notes in redirect-map.csv.`);
for (const w of warnings) console.log(`  ! ${w}`);
if (review.length) {
  console.log(`\nNeeds a decision (${review.length}) — add to "manual" or "remove" in redirect-rules.json, then re-run:`);
  for (const r of review.slice(0, 20)) console.log(`  ${r.page.path}  ${r.to ? `→ ${r.to}?  ` : ""}(${r.page.inLinks} internal links) ${r.page.title ?? ""}`);
  if (review.length > 20) console.log(`  …and ${review.length - 20} more in redirect-map.csv`);
}
console.log(`\nWrote redirects.json, redirect-map.csv and legacy-sitemap.xml to ${shownPath(out)}/\n`);
