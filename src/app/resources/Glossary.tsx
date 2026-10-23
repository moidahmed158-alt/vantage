"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/lib/site";
import styles from "./Glossary.module.css";

export type GlossaryTerm = { term: string; full: string; def: string };

/** Wraps each case-insensitive occurrence of `query` (already lower-cased) in a <mark>. */
function highlight(text: string, query: string): ReactNode {
  if (!query) return text;
  const lower = text.toLowerCase();
  const parts: ReactNode[] = [];
  let from = 0;
  let at = lower.indexOf(query);
  while (at !== -1) {
    if (at > from) parts.push(text.slice(from, at));
    parts.push(
      <mark key={at} className={styles.hit}>
        {text.slice(at, at + query.length)}
      </mark>,
    );
    from = at + query.length;
    at = lower.indexOf(query, from);
  }
  if (from === 0) return text;
  if (from < text.length) parts.push(text.slice(from));
  return parts;
}

/**
 * Searchable glossary: filters by term, full name or definition as you type,
 * announces the result count and shows an empty state when nothing matches.
 */
export function Glossary({ terms, heading }: { terms: GlossaryTerm[]; heading: ReactNode }) {
  const [q, setQ] = useState("");
  const base = useId();
  const inputId = `${base}-q`;
  const countId = `${base}-count`;

  const query = q.trim().toLowerCase();
  const shown = query
    ? terms.filter((t) => `${t.term} ${t.full} ${t.def}`.toLowerCase().includes(query))
    : terms;
  const countLabel =
    shown.length === terms.length ? `${terms.length} terms` : `${shown.length} of ${terms.length} terms`;

  return (
    <>
      <div className="v-sec-head v-sec-head--row" style={{ marginBottom: 36 }}>
        <div className={`v-stack ${styles.headMain}`}>{heading}</div>
        <div className={`v-field ${styles.field}`}>
          <label className="v-label" htmlFor={inputId}>
            Filter terms
          </label>
          <div className="v-search">
            <Icon name="search" size={20} strokeWidth={2} />
            <input
              id={inputId}
              className="v-input"
              type="search"
              placeholder="e.g. PHI, local pack"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
              aria-describedby={countId}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
      </div>

      <p id={countId} aria-live="polite" className={`v-hint ${styles.count}`} data-filtered={shown.length !== terms.length}>
        <span className="v-live" />
        {countLabel}
      </p>

      {shown.length > 0 ? (
        <dl className={styles.list}>
          {shown.map((t) => (
            <div key={t.term} className={`v-fadein ${styles.item}`}>
              <dt className={styles.term}>
                <strong className={`v-h4 ${styles.termName}`}>{highlight(t.term, query)}</strong>
                <span className="v-tag">{highlight(t.full, query)}</span>
              </dt>
              <dd className={`v-p ${styles.def}`}>{highlight(t.def, query)}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className={`v-notice v-notice--warn v-fadein ${styles.empty}`}>
          <Icon name="search" size={20} />
          <span>
            No terms match “{q}”.{" "}
            <Link className="v-link" href={ROUTES.contact}>
              Ask us
            </Link>{" "}
            — we&apos;ll explain it, and probably add it here.
          </span>
        </div>
      )}
    </>
  );
}
