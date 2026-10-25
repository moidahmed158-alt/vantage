"use client";

import { Fragment, useId, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { Icon } from "@/components/ui/Icon";
import {
  CAT,
  CATEGORY_KEYS,
  CONFIRM_FIRST,
  INTEGRATIONS,
  SCOPE,
  ST,
  STATUS_KEYS,
  type CategoryKey,
  type Integration,
  type StatusKey,
} from "./data";
import { useRequestPrefill } from "./RequestContext";
import { StatusChip } from "./Status";
import styles from "./Directory.module.css";

type CatFilter = CategoryKey | "all";
type StatusFilter = StatusKey | "all";

const CAT_FILTERS: { key: CatFilter; label: string }[] = [
  { key: "all", label: "All categories" },
  ...CATEGORY_KEYS.map((k) => ({ key: k, label: CAT[k] })),
];
const STATUS_FILTERS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "Any" },
  ...STATUS_KEYS.map((k) => ({ key: k, label: ST[k] })),
];

/** Name, former names (`aka`), category label or description contains the query — so "chiropractic" or "Allscripts" finds a match. */
const matches = (x: Integration, ql: string) =>
  [x.name, CAT[x.cat], x.desc, ...(x.aka ?? [])].some((text) => text.toLowerCase().includes(ql));

/** Cards shown before "Show all" — a multiple of every column count the grid reaches (1–4). */
const PAGE = 24;

/** Wraps each case-insensitive occurrence of `needle` (already lower-cased) in a <mark>. */
function highlight(text: string, needle: string): ReactNode {
  if (!needle) return text;
  const lower = text.toLowerCase();
  const out: ReactNode[] = [];
  let from = 0;
  let at = lower.indexOf(needle);
  while (at !== -1) {
    if (at > from) out.push(text.slice(from, at));
    out.push(
      <mark key={at} className={styles.hit}>
        {text.slice(at, at + needle.length)}
      </mark>,
    );
    from = at + needle.length;
    at = lower.indexOf(needle, from);
  }
  if (!out.length) return text;
  if (from < text.length) out.push(text.slice(from));
  return out;
}

/**
 * Searchable, filterable integrations directory.
 * Selecting a system opens its detail inline, directly beneath the row it sits in
 * (full-width grid item + dense auto-flow), so it never opens off-screen on any width.
 */
export function Directory() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CatFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [selId, setSelId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const prefill = useRequestPrefill();

  const uid = useId();
  const searchId = `${uid}-q`;
  const resultsId = `${uid}-results`;
  const detailId = `${uid}-detail`;
  const detailTitleId = `${uid}-detail-title`;

  const searchRef = useRef<HTMLInputElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());

  // ---- derived (mirrors the design's renderVals) ----
  const qTrim = q.trim();
  const ql = qTrim.toLowerCase();
  const byQ = ql ? INTEGRATIONS.filter((x) => matches(x, ql)) : INTEGRATIONS;
  const list = byQ.filter((x) => (cat === "all" || x.cat === cat) && (status === "all" || x.status === status));
  const catCount = (k: CatFilter) => (k === "all" ? byQ.length : byQ.filter((x) => x.cat === k).length);
  const statusCount = (k: StatusFilter) => (k === "all" ? byQ.length : byQ.filter((x) => x.status === k).length);
  const filtered = !!ql || cat !== "all" || status !== "all";
  const visible = showAll ? list : list.slice(0, PAGE);
  const hiddenCount = list.length - visible.length;
  const resultLabel =
    hiddenCount > 0 ? `${visible.length} of ${list.length} systems`
    : list.length === 1 ? "1 system"
    : `${list.length} systems`;
  // With no search text, the empty state names the active filter(s) instead of an empty “”.
  const missing =
    qTrim || [cat !== "all" ? CAT[cat] : "", status !== "all" ? ST[status] : ""].filter(Boolean).join(" · ");

  // ---- actions ----
  // Every new search or filter starts from the first page of results.
  const onSearch = (value: string) => {
    setQ(value);
    setSelId(null);
    setShowAll(false);
  };
  const pickCat = (k: CatFilter) => {
    setCat(k);
    setSelId(null);
    setShowAll(false);
  };
  const pickStatus = (k: StatusFilter) => {
    setStatus(k);
    setSelId(null);
    setShowAll(false);
  };
  const clearAll = (e: MouseEvent<HTMLButtonElement>) => {
    setQ("");
    setCat("all");
    setStatus("all");
    setSelId(null);
    setShowAll(false);
    // The clear button unmounts; keyboard users continue from the search field.
    // (Skipped for pointer/touch so phones don't pop the on-screen keyboard.)
    if (e.detail === 0) searchRef.current?.focus();
  };
  // The button unmounts, so focus moves to the first card it revealed.
  const revealAll = () => {
    const firstNew = list[PAGE]?.id;
    flushSync(() => setShowAll(true));
    if (firstNew) cardRefs.current.get(firstNew)?.focus();
  };
  const toggle = (id: string) => {
    const next = selId === id ? null : id;
    flushSync(() => setSelId(next));
    if (next) detailRef.current?.scrollIntoView({ block: "nearest" });
  };
  const closeDetail = () => {
    const id = selId;
    setSelId(null);
    if (id) cardRefs.current.get(id)?.focus();
  };
  const onDetailKey = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== "Escape") return;
    e.stopPropagation();
    closeDetail();
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.filters} aria-label="Filters">
        <div className="v-field">
          <label className="v-label" htmlFor={searchId}>
            Search by name
          </label>
          <div className="v-search">
            <Icon name="search" size={20} strokeWidth={2} />
            <input
              ref={searchRef}
              id={searchId}
              className="v-input"
              type="search"
              placeholder="e.g. Dentrix, athenahealth"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
              aria-controls={resultsId}
              value={q}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        <fieldset className={styles.group}>
          <legend className={`v-tag ${styles.legend}`}>Category</legend>
          <div className={styles.catList}>
            {CAT_FILTERS.map((c) => {
              const n = catCount(c.key);
              return (
                <button
                  key={c.key}
                  type="button"
                  className={`v-chip ${styles.chip}`}
                  aria-pressed={cat === c.key}
                  data-zero={n === 0 ? "true" : undefined}
                  onClick={() => pickCat(c.key)}
                >
                  {c.label} <span className="v-count">{n}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend className={`v-tag ${styles.legend}`}>Status</legend>
          <div className={styles.statList}>
            {STATUS_FILTERS.map((st) => {
              const n = statusCount(st.key);
              return (
                <button
                  key={st.key}
                  type="button"
                  className={`v-chip ${styles.chip}`}
                  aria-pressed={status === st.key}
                  data-zero={n === 0 ? "true" : undefined}
                  onClick={() => pickStatus(st.key)}
                >
                  {st.label} <span className="v-count">{n}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </aside>

      <div id={resultsId} className={styles.results}>
        <div className={styles.bar}>
          <p className={styles.count} aria-live="polite">
            <span className="v-live" aria-hidden="true" />
            {resultLabel}
          </p>
          {filtered && (
            <button type="button" className={`v-alink ${styles.clear}`} onClick={clearAll}>
              Clear filters
            </button>
          )}
        </div>

        {list.length > 0 ? (
          <ul className={styles.grid}>
            {visible.map((x) => {
              const on = x.id === selId;
              const base = `${uid}-${x.id}`;
              return (
                <Fragment key={x.id}>
                  <li>
                    <button
                      ref={(el) => {
                        if (el) cardRefs.current.set(x.id, el);
                        else cardRefs.current.delete(x.id);
                      }}
                      type="button"
                      className={on ? `v-card v-lift ${styles.card} ${styles.cardOn}` : `v-card v-lift ${styles.card}`}
                      aria-expanded={on}
                      aria-controls={on ? detailId : undefined}
                      aria-labelledby={`${base}-n`}
                      aria-describedby={`${base}-c ${base}-s ${base}-d`}
                      onClick={() => toggle(x.id)}
                    >
                      <span className={styles.cardTop}>
                        <span className={styles.initial} aria-hidden="true">
                          {x.name.charAt(0)}
                        </span>
                        <StatusChip status={x.status} id={`${base}-s`} />
                      </span>
                      <strong id={`${base}-n`} className={styles.cardName}>
                        {highlight(x.name, ql)}
                      </strong>
                      <span id={`${base}-c`} className={`v-tag ${styles.cardCat}`}>
                        {highlight(CAT[x.cat], ql)}
                      </span>
                      <span id={`${base}-d`} className={styles.cardDesc}>
                        {highlight(x.desc, ql)}
                      </span>
                      <span className={styles.cardMore}>
                        View details <Icon name="arrow" size={16} strokeWidth={2} />
                      </span>
                    </button>
                  </li>

                  {on && (
                    <li className={styles.detailItem}>
                      <article
                        ref={detailRef}
                        id={detailId}
                        className={`v-fadein v-panel ${styles.detail}`}
                        aria-labelledby={detailTitleId}
                        onKeyDown={onDetailKey}
                      >
                        <div className={styles.detailHead}>
                          <div className={styles.detailIntro}>
                            <span className={`v-tag ${styles.detailCat}`}>{CAT[x.cat]}</span>
                            <h3 id={detailTitleId} className={`v-display ${styles.detailTitle}`}>
                              {x.name}
                            </h3>
                            <p className={styles.detailDesc}>{x.desc}</p>
                          </div>
                          <button type="button" className={styles.close} onClick={closeDetail} aria-label="Close details">
                            <Icon name="close" size={18} strokeWidth={2} />
                          </button>
                        </div>
                        <div className={styles.facts}>
                          <div className={styles.fact}>
                            <span className="v-tag">Status</span>
                            <StatusChip status={x.status} large />
                          </div>
                          <div className={styles.fact}>
                            <span className="v-tag">Typical connection scope</span>
                            <p className={styles.factText}>{SCOPE[x.cat]}</p>
                          </div>
                          <div className={styles.fact}>
                            <span className="v-tag">What we confirm first</span>
                            <ul className={styles.confirm}>
                              {CONFIRM_FIRST.map((c) => (
                                <li key={c}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <a
                          className={`v-btn v-btn--primary ${styles.detailCta}`}
                          href="#request"
                          onClick={() => prefill(x.name, x.cat)}
                        >
                          Request an assessment for {x.name}
                        </a>
                      </article>
                    </li>
                  )}
                </Fragment>
              );
            })}
          </ul>
        ) : null}

        {hiddenCount > 0 && (
          <div className={styles.more}>
            <button type="button" className="v-btn v-btn--ghost" onClick={revealAll}>
              Show all {list.length} systems
              <Icon name="caret" size={16} strokeWidth={2} />
            </button>
          </div>
        )}

        {list.length === 0 && (
          <div className={`v-fadein v-card v-card--dash ${styles.empty}`}>
            <span className="v-icon">
              <Icon name="search" size={22} strokeWidth={1.8} />
            </span>
            <h3 className={`v-h3 ${styles.emptyTitle}`}>No listed match for “{missing}”.</h3>
            <p className="v-p">
              That doesn&apos;t mean we can&apos;t connect it. Tell us what you run and we&apos;ll assess what&apos;s
              possible — natively, through a connector, or with custom work.
            </p>
            <div className="v-btn-row">
              {qTrim ? (
                <a className="v-btn v-btn--primary" href="#request" onClick={() => prefill(qTrim, "")}>
                  Request an assessment for “{qTrim}”
                </a>
              ) : (
                <a className="v-btn v-btn--primary" href="#request">
                  Request an integration assessment
                </a>
              )}
              <button type="button" className="v-btn v-btn--ghost" onClick={clearAll}>
                {qTrim ? "Clear search" : "Clear filters"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
