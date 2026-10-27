#!/usr/bin/env node
// Step 2 and 5 — Core Web Vitals baseline for the old site's key pages, then the same pages on the
// new site, via Google PageSpeed Insights (mobile). Set PSI_API_KEY to avoid the anonymous rate limit.
import path from "node:path";
import { parseArgs } from "node:util";
import { fail, readJson, saveFile, siteUrl, stripSlash } from "./lib.mjs";

const USAGE = `
Usage: node tools/seo-migration/speed.mjs --base <site-url> --label <before|after> [options]

  --base <url>        Site to test: the old site for "before", the new one for "after"
  --label <name>      Saved as speed-<name>.json; "after" is compared with "before" automatically
  --out <dir>         Folder holding inventory.json (default: migration)
  --top <n>           Home page plus the n-1 most internally linked pages (default 10)
`;

const { values: opt } = parseArgs({
  options: {
    base: { type: "string" },
    label: { type: "string" },
    out: { type: "string", default: "migration" },
    top: { type: "string", default: "10" },
    help: { type: "boolean", short: "h", default: false },
  },
});
if (opt.help || !opt.base || !opt.label) {
  console.log(USAGE);
  process.exit(opt.help ? 0 : 1);
}

const out = path.resolve(opt.out);
const base = siteUrl(opt.base);
const inv = await readJson(path.join(out, "inventory.json"));
const redirects = await readJson(path.join(out, "redirects.json"), []);
const moved = new Map(redirects.filter((r) => !/[*+?]/.test(r.source)).map((r) => [stripSlash(r.source.replace(/\\/g, "")), r.destination]));

// After launch, test where each page lives now, so redirect time doesn't count against the new site.
const onNewSite = opt.label !== "before";
const pages = inv.pages
  .filter((p) => p.kind === "page" && p.status === 200)
  .sort((a, b) => (a.path === "/" ? -1 : b.path === "/" ? 1 : b.inLinks - a.inLinks))
  .slice(0, Number(opt.top))
  .map((p) => ({ oldPath: p.path, path: (onNewSite && moved.get(stripSlash(p.path))) || p.path }));

const ms = (v) => (v == null ? "–" : v >= 1000 ? `${(v / 1000).toFixed(1)}s` : `${Math.round(v)}ms`);
const results = [];
for (const page of pages) {
  const url = new URL(page.path, base).href;
  const query = new URLSearchParams({ url, strategy: "mobile", category: "performance" });
  if (process.env.PSI_API_KEY) query.set("key", process.env.PSI_API_KEY);
  process.stdout.write(`  ${page.path} … `);
  try {
    const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${query}`, { signal: AbortSignal.timeout(120000) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message ?? res.status);
    const audit = (id) => data.lighthouseResult.audits[id]?.numericValue ?? null;
    const field = (id) => data.loadingExperience?.metrics?.[id]?.percentile ?? null;
    const r = {
      ...page,
      score: Math.round(data.lighthouseResult.categories.performance.score * 100),
      lcp: audit("largest-contentful-paint"),
      cls: audit("cumulative-layout-shift"),
      tbt: audit("total-blocking-time"),
      // Real-user (Chrome UX Report) data, only for pages with enough traffic.
      fieldLcp: field("LARGEST_CONTENTFUL_PAINT_MS"),
      fieldInp: field("INTERACTION_TO_NEXT_PAINT"),
      fieldCls: field("CUMULATIVE_LAYOUT_SHIFT_SCORE") == null ? null : field("CUMULATIVE_LAYOUT_SHIFT_SCORE") / 100,
    };
    results.push(r);
    console.log(`score ${r.score} · LCP ${ms(r.lcp)} · CLS ${r.cls?.toFixed(3)} · TBT ${ms(r.tbt)}${r.fieldInp != null ? ` · field INP ${ms(r.fieldInp)}` : ""}`);
  } catch (err) {
    results.push({ ...page, error: String(err.message ?? err) });
    console.log(`failed: ${err.message ?? err}`);
    if (/quota/i.test(String(err.message)) && !process.env.PSI_API_KEY)
      fail("PageSpeed Insights' shared quota is used up. Create a free API key (see README) and set PSI_API_KEY.");
    process.exitCode = 1;
  }
}

await saveFile(path.join(out, `speed-${opt.label}.json`), JSON.stringify({ base: base.origin, testedAt: new Date().toISOString(), results }, null, 2));

if (opt.label !== "before") {
  const before = await readJson(path.join(out, "speed-before.json"), null);
  if (before) {
    console.log(`\nBefore → after (mobile lab data):`);
    for (const r of results) {
      const b = before.results.find((x) => x.oldPath === r.oldPath);
      if (!b || b.error || r.error) continue;
      const flag = r.score < b.score || r.lcp > b.lcp || r.cls > Math.max(b.cls, 0.1) ? "  ! slower" : "";
      console.log(`  ${r.oldPath}: score ${b.score} → ${r.score} · LCP ${ms(b.lcp)} → ${ms(r.lcp)} · CLS ${b.cls?.toFixed(3)} → ${r.cls?.toFixed(3)}${flag}`);
    }
  }
}
console.log(`\nGood: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms. Wrote speed-${opt.label}.json\n`);
