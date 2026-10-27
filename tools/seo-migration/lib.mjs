// Shared helpers for the SEO migration scripts. Plain Node (20+), no dependencies.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const UA = "Mozilla/5.0 (compatible; VantageMigrationBot/1.0; site migration inventory)";

/** Never queued as pages. */
const ASSET_EXT = /\.(?:jpe?g|png|gif|webp|avif|svg|ico|bmp|tiff?|css|js|mjs|map|json|xml|txt|woff2?|ttf|eot|otf|mp4|webm|mov|m4v|mp3|wav|zip|gz|rss)$/i;
/** Documents that can rank in search (new-patient forms, menus) and are archived alongside pages. */
const DOC_EXT = /\.(?:pdf|docx?|xlsx?|pptx?)$/i;

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const isRedirect = (status) => status >= 300 && status < 400;
export const stripSlash = (p) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p);
const bareHost = (host) => host.replace(/^www\./i, "").toLowerCase();

export function fail(message) {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

/** Accepts "example.com" as well as a full URL. */
export function siteUrl(input) {
  try {
    return new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`);
  } catch {
    return fail(`Not a URL: ${input}`);
  }
}

/** "Name: value" strings from --header flags → headers object. */
export function parseHeaders(list = []) {
  return Object.fromEntries(
    list.map((h) => {
      const i = h.indexOf(":");
      return [h.slice(0, i).trim(), h.slice(i + 1).trim()];
    }),
  );
}

/**
 * Resolves `href` against `base` and returns it as a URL on `origin` (www or not, http or https;
 * `aliases` are extra hosts treated as the same site) without hash or query. Null if off-site.
 */
export function sameSiteUrl(href, base, origin, aliases = []) {
  let u;
  try {
    u = new URL(href, base);
  } catch {
    return null;
  }
  const hosts = [origin.host, ...aliases].map(bareHost);
  if (!/^https?:$/.test(u.protocol) || !hosts.includes(bareHost(u.host))) return null;
  u.protocol = origin.protocol;
  u.host = origin.host;
  u.hash = "";
  u.search = "";
  return u;
}

export const pathOf = (url) => {
  try {
    return new URL(url).pathname;
  } catch {
    return null;
  }
};

/**
 * Fetches one URL without following redirects (unless `redirect: "follow"`). Returns the status,
 * absolute redirect target, content type, and the body as `text` (HTML/XML/plain) or `bytes`
 * (documents). Retries 429/5xx; network failures come back as status 0 with `error` set.
 */
export async function fetchPage(url, { headers = {}, redirect = "manual", retries = 2, timeout = 25000, asText = false } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, {
        redirect,
        headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", ...headers },
        signal: AbortSignal.timeout(timeout),
      });
      if ((res.status === 429 || res.status >= 500) && attempt < retries) {
        await res.body?.cancel();
        await sleep(2000 * (attempt + 1));
        continue;
      }
      const type = (res.headers.get("content-type") ?? "").toLowerCase();
      const location = res.headers.get("location");
      const out = {
        url: res.url || url,
        status: res.status,
        type,
        location: location ? new URL(location, url).href : null,
        xRobots: res.headers.get("x-robots-tag") ?? "",
      };
      if (res.status === 200 && (asText || /html|xml|text\/plain/.test(type))) out.text = await res.text();
      else if (res.status === 200 && (DOC_EXT.test(new URL(url).pathname) || /pdf|msword|officedocument/.test(type)))
        out.bytes = Buffer.from(await res.arrayBuffer());
      else await res.body?.cancel();
      return out;
    } catch (err) {
      if (attempt >= retries) return { url, status: 0, type: "", location: null, error: err.cause?.code ?? err.name ?? String(err) };
      await sleep(2000 * (attempt + 1));
    }
  }
}

/** Stops early when the site is down or behind a login, instead of reporting every URL as broken. */
export async function assertReachable(site, headers) {
  const res = await fetchPage(site.href, { headers, redirect: "follow" });
  if (res.status === 0) fail(`Can't reach ${site.origin} (${res.error}). Is the site running?`);
  if (res.status === 401 || res.status === 403)
    fail(`${site.origin} answered ${res.status}. For a protected Vercel preview, add --header "x-vercel-protection-bypass: <token>".`);
}

export async function fetchBytes(url, headers = {}) {
  try {
    const res = await fetch(url, { headers: { "user-agent": UA, ...headers }, signal: AbortSignal.timeout(30000) });
    return res.ok ? Buffer.from(await res.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

/** Runs `fn` over `items` with at most `limit` in flight; keeps input order in the result. */
export async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

/* ---------------------------------------------------------------- HTML ---- */

const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’",
  ldquo: "“", rdquo: "”", hellip: "…", copy: "©", reg: "®", trade: "™", middot: "·", bull: "•", eacute: "é",
};

export function decode(s) {
  return s.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] !== "#") return ENTITIES[e.toLowerCase()] ?? m;
    try {
      return String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    } catch {
      return m;
    }
  });
}

const clean = (s) => decode(s.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

function attrs(src) {
  const out = {};
  for (const m of src.matchAll(/([^\s"'=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g))
    out[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? "");
  return out;
}

const absolute = (href, base) => {
  try {
    return new URL(href, base).href;
  } catch {
    return href;
  }
};

/** Every @type in a JSON-LD block, including nested nodes and @graph entries. */
export function schemaTypes(blocks) {
  const types = new Set();
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    for (const t of [node["@type"]].flat()) if (typeof t === "string") types.add(t);
    Object.values(node).forEach(walk);
  };
  walk(blocks);
  return [...types].sort();
}

/** Readable text with headings marked, for the archive and word counts. */
function toText(html) {
  const body = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  return decode(
    body
      .replace(/<h([1-6])\b[^>]*>/gi, (_, n) => `\n\n${"#".repeat(Number(n))} `)
      .replace(/<li\b[^>]*>/gi, "\n- ")
      .replace(/<(?:br|hr)\b[^>]*>|<\/(?:p|div|h[1-6]|li|tr|section|article|header|footer|blockquote)>/gi, "\n")
      .replace(/<[^>]*>/g, " "),
  )
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** SEO-relevant parts of a page: metadata, headings, JSON-LD, links, images and text. */
export function extractPage(html, pageUrl) {
  const doc = html.replace(/<!--[\s\S]*?-->/g, "");
  const jsonld = [];
  for (const m of doc.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/application\/ld\+json/i.test(m[1])) continue;
    try {
      jsonld.push(JSON.parse(m[2].trim()));
    } catch {
      jsonld.push({ "@invalid": m[2].trim().slice(0, 2000) });
    }
  }
  const body = doc.replace(/<(script|style|noscript|template|svg)\b[\s\S]*?<\/\1>/gi, " ");

  const meta = {};
  for (const m of body.matchAll(/<meta\b([^>]*)>/gi)) {
    const a = attrs(m[1]);
    const key = (a.name || a.property || "").toLowerCase();
    if (key && a.content !== undefined && !(key in meta)) meta[key] = a.content.trim();
  }
  let canonical = "";
  for (const m of body.matchAll(/<link\b([^>]*)>/gi)) {
    const a = attrs(m[1]);
    if (/(^|\s)canonical(\s|$)/i.test(a.rel ?? "") && a.href) {
      canonical = absolute(a.href, pageUrl);
      break;
    }
  }
  const headings = (tag) =>
    [...body.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi"))].map((m) => clean(m[1])).filter(Boolean);

  const links = [];
  for (const m of body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const a = attrs(m[1]);
    if (!a.href || /^(?:mailto|tel|javascript|sms):/i.test(a.href)) continue;
    const imgAlt = m[2].match(/<img\b[^>]*\balt\s*=\s*["']([^"']*)["']/i)?.[1];
    links.push({ href: a.href, text: clean(m[2]) || (imgAlt ? `[img] ${decode(imgAlt)}` : "") });
  }
  const images = [];
  for (const m of body.matchAll(/<img\b([^>]*)>/gi)) {
    const a = attrs(m[1]);
    const src = [a.src, a["data-src"], a["data-lazy-src"], (a.srcset || a["data-srcset"] || "").split(/\s/)[0]].find(
      (s) => s && !s.startsWith("data:"),
    );
    if (src) images.push({ src: absolute(src, pageUrl), alt: a.alt ?? null });
  }

  const text = toText(body);
  return {
    title: clean(body.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ""),
    description: meta.description ?? "",
    robots: meta.robots ?? "",
    canonical,
    ogTitle: meta["og:title"] ?? "",
    ogImage: meta["og:image"] ? absolute(meta["og:image"], pageUrl) : "",
    h1: headings("h1"),
    h2: headings("h2"),
    jsonld,
    schemaTypes: schemaTypes(jsonld),
    words: text.replace(/^#+ /gm, "").split(/\s+/).filter(Boolean).length,
    links,
    images,
    text,
  };
}

/* ------------------------------------------------------ robots, sitemaps ---- */

export async function loadRobots(origin, headers) {
  const res = await fetchPage(new URL("/robots.txt", origin).href, { headers, redirect: "follow", asText: true });
  const txt = res.status === 200 ? (res.text ?? "") : "";
  const sitemaps = [];
  const groups = [];
  let current = null;
  let inAgentLines = false;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const i = line.indexOf(":");
    if (i < 0) continue;
    const key = line.slice(0, i).trim().toLowerCase();
    const value = line.slice(i + 1).trim();
    if (key === "sitemap") {
      sitemaps.push(value);
    } else if (key === "user-agent") {
      if (!inAgentLines) groups.push((current = { agents: [], rules: [] }));
      current.agents.push(value.toLowerCase());
      inAgentLines = true;
      continue;
    } else if (current && (key === "allow" || key === "disallow") && value) {
      const re = new RegExp(`^${value.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\\\$$/, "$")}`);
      current.rules.push({ allow: key === "allow", re, len: value.length });
    }
    inAgentLines = false;
  }
  const rules = groups.find((g) => g.agents.includes("*"))?.rules ?? [];
  // Longest matching rule wins; Allow wins a tie (Google's interpretation).
  const allowed = (p) => {
    let best = null;
    for (const r of rules) if (r.re.test(p) && (!best || r.len > best.len || (r.len === best.len && r.allow))) best = r;
    return !best || best.allow;
  };
  return { found: res.status === 200, sitemaps, allowed };
}

/** Every <loc> in the given sitemaps, following sitemap indexes. */
export async function readSitemaps(urls, headers) {
  const seen = new Set();
  const locs = [];
  const todo = [...urls];
  while (todo.length && seen.size < 100) {
    const url = todo.shift();
    if (seen.has(url)) continue;
    seen.add(url);
    const res = await fetchPage(url, { headers, redirect: "follow", asText: true });
    if (res.status !== 200 || !res.text || !/<(?:urlset|sitemapindex)\b/i.test(res.text)) continue;
    const found = [...res.text.matchAll(/<loc>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/loc>/gi)].map((m) => decode(m[1]).trim());
    if (/<sitemapindex\b/i.test(res.text)) todo.push(...found);
    else locs.push(...found);
  }
  return locs;
}

/** URLs from a text file or CSV export (Search Console, Ahrefs, Semrush): first column of each line. */
export async function readUrlList(file) {
  const raw = await readFile(file, "utf8").catch(() => fail(`Can't read ${file}`));
  return raw
    .split(/\r?\n/)
    .map((line) => (line.startsWith('"') ? line.slice(1, line.indexOf('"', 1)) : line.split(/[,\t]/)[0]).trim())
    .filter((v) => /^https?:\/\//i.test(v) || v.startsWith("/"));
}

/**
 * Latest successful HTML capture of each URL on the site at archive.org, optionally only captures
 * made before `to` (YYYYMMDD) — e.g. the day the old site was cancelled.
 */
export async function waybackSnapshots(site, { to, maxRows = 50000, onPage } = {}) {
  const latest = new Map();
  let resumeKey = null;
  let rows = 0;
  // The CDX API times out on big result sets, so read it in pages of 1,000 captures.
  do {
    const query = new URLSearchParams({ url: `${bareHost(site.host)}/*`, output: "json", fl: "original,timestamp", limit: "1000", showResumeKey: "true" });
    query.append("filter", "statuscode:200");
    query.append("filter", "mimetype:text/html");
    if (to) query.set("to", to);
    if (resumeKey) query.set("resumeKey", resumeKey);
    const res = await fetchPage(`https://web.archive.org/cdx/search/cdx?${query}`, { redirect: "follow", timeout: 120000, retries: 4, asText: true });
    if (res.status !== 200) fail(`archive.org didn't answer (${res.status || res.error}). It is often slow; try again in a few minutes.`);
    const data = JSON.parse(res.text?.trim() || "[]");
    // With showResumeKey the last two rows are [] and [key].
    resumeKey = data.length > 2 && data.at(-1).length === 1 ? data.splice(-2)[1][0] : null;
    for (const [original, timestamp] of data.slice(1)) {
      const u = sameSiteUrl(original, original, site);
      // %22/%3C/%3E: quotes and brackets from malformed links archive.org followed — never real pages.
      if (!u || ASSET_EXT.test(u.pathname) || /%(?:22|3c|3e)/i.test(u.pathname)) continue;
      const prev = latest.get(u.pathname);
      if (!prev || timestamp > prev.timestamp) latest.set(u.pathname, { url: u.href, timestamp, original });
    }
    rows += Math.max(data.length - 1, 0);
    onPage?.(rows, latest.size);
  } while (resumeKey && rows < maxRows);
  // Home page and shallow pages first, so a --max cut keeps the important ones.
  const depth = (s) => new URL(s.url).pathname.split("/").filter(Boolean).length;
  return [...latest.values()]
    .sort((a, b) => depth(a) - depth(b) || a.url.length - b.url.length)
    .map((s) => ({ ...s, replay: `https://web.archive.org/web/${s.timestamp}id_/${s.original}` }));
}

/* --------------------------------------------------------------- crawl ---- */

/**
 * Breadth-first crawl of one site. `seeds` are {url, source, fetchUrl?} — the start page, sitemap
 * entries, Search Console exports, archive.org captures (`fetchUrl` = the capture to read instead).
 * Returns page records sorted by path, with inbound internal-link counts and click depth from home.
 */
export async function crawlSite(start, opts = {}) {
  const { max = 2000, concurrency = 3, delay = 250, headers = {}, robots = null, follow = true, aliases = [] } = opts;
  const { onPage, onDoc, onProgress } = opts;
  const origin = new URL(start);
  const seeds = opts.seeds ?? [{ url: origin.href, source: "start" }];
  const pages = new Map();
  const queue = [];
  const blocked = new Set();
  let capped = false;

  const add = (href, source, base = origin.href, fetchUrl) => {
    const u = sameSiteUrl(href, base, origin, aliases);
    if (!u || ASSET_EXT.test(u.pathname)) return;
    const known = pages.get(u.pathname);
    if (known) return void known.sources.add(source);
    if (robots && !robots.allowed(u.pathname)) return void blocked.add(u.pathname);
    if (pages.size >= max) return void (capped = true);
    const rec = { path: u.pathname, url: u.href, sources: new Set([source]), fetchUrl };
    pages.set(u.pathname, rec);
    queue.push(rec);
  };

  async function visit(rec) {
    const res = await fetchPage(rec.fetchUrl ?? rec.url, { headers, redirect: rec.fetchUrl ? "follow" : "manual" });
    rec.status = res.status;
    if (res.error) rec.error = res.error;
    if (isRedirect(res.status) && res.location) {
      rec.kind = "redirect";
      rec.redirectTo = res.location;
      add(res.location, "redirect", rec.url);
    } else if (res.text !== undefined && res.type.includes("html")) {
      rec.kind = "page";
      const { links, text, ...page } = extractPage(res.text, rec.url);
      Object.assign(rec, page);
      const out = new Map();
      let external = 0;
      for (const link of links) {
        const u = sameSiteUrl(link.href, rec.url, origin, aliases);
        if (!u) {
          if (/^https?:/i.test(absolute(link.href, rec.url))) external++;
          continue;
        }
        if (ASSET_EXT.test(u.pathname)) continue;
        if (!out.has(u.pathname)) out.set(u.pathname, link.text);
        if (follow) add(u.href, "link", rec.url);
      }
      rec.outLinks = [...out].map(([to, anchor]) => ({ to, anchor }));
      rec.externalLinks = external;
      await onPage?.(rec, res.text, text);
    } else if (res.bytes) {
      rec.kind = "doc";
      await onDoc?.(rec, res.bytes);
    } else {
      rec.kind = res.status === 0 ? "error" : res.status === 200 ? "other" : "missing";
    }
    delete rec.fetchUrl;
  }

  for (const s of seeds) add(s.url, s.source, origin.href, s.fetchUrl);
  let active = 0;
  let done = 0;
  const worker = async () => {
    for (;;) {
      const rec = queue.shift();
      if (!rec) {
        if (!active) return;
        await sleep(50);
        continue;
      }
      active++;
      try {
        await visit(rec);
      } catch (err) {
        rec.kind = "error";
        rec.error = String(err);
      } finally {
        active--;
      }
      onProgress?.(++done, queue.length);
      if (delay) await sleep(delay);
    }
  };
  await Promise.all(Array.from({ length: concurrency }, worker));

  const inbound = new Map();
  for (const rec of pages.values())
    for (const { to } of rec.outLinks ?? []) if (to !== rec.path) (inbound.get(to) ?? inbound.set(to, new Set()).get(to)).add(rec.path);

  // Clicks from the home page, following links and redirects. null = nothing on the site links to it.
  const root = origin.pathname;
  const depth = new Map([[root, 0]]);
  for (const bfs = [root]; bfs.length; ) {
    const p = bfs.shift();
    const rec = pages.get(p);
    const next = rec?.kind === "redirect" ? [pathOf(rec.redirectTo)] : (rec?.outLinks ?? []).map((l) => l.to);
    for (const n of next) {
      if (!n || depth.has(n)) continue;
      depth.set(n, depth.get(p) + 1);
      bfs.push(n);
    }
  }

  const list = [...pages.values()].sort((a, b) => a.path.localeCompare(b.path));
  for (const rec of list) {
    rec.sources = [...rec.sources];
    rec.inLinks = inbound.get(rec.path)?.size ?? 0;
    rec.clickDepth = depth.get(rec.path) ?? null;
  }
  return { pages: list, blocked: [...blocked], capped };
}

/* --------------------------------------------------------------- files ---- */

export async function saveFile(file, data) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, data);
}

export async function readJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (err) {
    if (fallback !== undefined && err.code === "ENOENT") return fallback;
    return fail(`Can't read ${file}: ${err.message}`);
  }
}

/** CSV with a BOM so Excel opens it as UTF-8. Arrays become "a | b". */
export function csv(rows) {
  const cell = (v) => {
    const s = Array.isArray(v) ? v.join(" | ") : String(v ?? "");
    return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return "\uFEFF" + rows.map((r) => r.map(cell).join(",")).join("\r\n") + "\r\n";
}

/** URL path → relative file path that is valid on Windows too. */
export function safePath(p) {
  const segs = p
    .split("/")
    .filter(Boolean)
    .map((seg) => {
      let s;
      try {
        s = decodeURIComponent(seg);
      } catch {
        s = seg;
      }
      s = s.replace(/[<>:"\\|?*\x00-\x1f]/g, "_").replace(/[. ]+$/, "_");
      return /^(con|prn|aux|nul|com\d|lpt\d)(\..*)?$/i.test(s) ? `_${s}` : s || "_";
    });
  return segs.length ? path.join(...segs) : "_home";
}

/** Output folder as the user would type it. */
export function shownPath(dir) {
  const rel = path.relative(process.cwd(), dir);
  return !rel ? "." : rel.startsWith("..") ? dir : rel;
}

export const pct = (n, total) => (total ? `${Math.round((n / total) * 100)}%` : "0%");
