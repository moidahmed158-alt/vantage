"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./SpecialtyBrowser.module.css";

export type SpecialtyGroupId = "dental" | "medical";
export type FocusLink = { label: string; href: string };
export type Specialty = {
  /** Anchor id. Must match a slug in SPECIALTIES (src/lib/site.ts) — the header menu deep-links to it. */
  slug: string;
  group: SpecialtyGroupId;
  name: string;
  challenge: string;
  focus: FocusLink[];
  trust: string[];
};
/** `id` doubles as the anchor id of the group wrapper (`/specialties#dental`). */
export type SpecialtyGroup = { id: SpecialtyGroupId; label: string };
export type SpecialtyBrowserCopy = {
  /** "All" tab label. */
  all: string;
  /** Accessible name of the tab list. */
  tablist: string;
  notListed: FocusLink;
  challenge: string;
  focus: string;
  trust: string;
};

type Filter = "all" | SpecialtyGroupId;
type Target = { id: string; group: SpecialtyGroupId; kind: "group" | "card" };
/** `picked`: the user's last tab choice (null = none yet). `pending`: a same-page link target whose hash hasn't landed yet. */
type View = { picked: Filter | null; pending: string | null };

/* ---------- URL hash as an external store (server snapshot is empty, so hydration always matches) ---------- */
function decodeHash(raw: string) {
  const id = raw.startsWith("#") ? raw.slice(1) : raw;
  try {
    return decodeURIComponent(id);
  } catch {
    return id;
  }
}
const readHash = () => decodeHash(window.location.hash);
const readServerHash = () => "";
function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

const shows = (filter: Filter, target: Target) => filter === "all" || filter === target.group;

/**
 * The filter on screen. A hash target always wins over a stale choice:
 * `#dental` / `#medical` open that group; a specialty id keeps the current filter
 * if it already shows the card, otherwise falls back to All.
 */
function resolveFilter(picked: Filter | null, target: Target | null | undefined): Filter {
  if (!target) return picked ?? "all";
  if (target.kind === "group") return target.group;
  return picked && shows(picked, target) ? picked : "all";
}

/** All / Dental / Medical tabs over the specialty cards. Deep links (`#slug`, `#dental`) are never left hidden. */
export function SpecialtyBrowser({
  items,
  groups,
  copy,
}: {
  items: Specialty[];
  groups: SpecialtyGroup[];
  copy: SpecialtyBrowserCopy;
}) {
  const uid = useId();
  const panelId = `${uid}panel`;
  const tabId = (id: Filter) => `${uid}tab-${id}`;

  const targets = useMemo(() => {
    const map = new Map<string, Target>();
    for (const g of groups) map.set(g.id, { id: g.id, group: g.id, kind: "group" });
    for (const s of items) map.set(s.slug, { id: s.slug, group: s.group, kind: "card" });
    return map;
  }, [groups, items]);

  const hash = useSyncExternalStore(subscribeHash, readHash, readServerHash);
  const [view, setView] = useState<View>({ picked: null, pending: null });
  const target = targets.get(view.pending ?? hash) ?? null;
  const filter = resolveFilter(view.picked, target);
  const targetId = target?.id ?? null;
  // True when the hash (not a tab) decided what is on screen, so the target may have moved.
  const hashMovedView = filter !== (view.picked ?? "all");

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: copy.all, count: items.length },
    ...groups.map((g) => ({ id: g.id, label: g.label, count: items.filter((s) => s.group === g.id).length })),
  ];
  const current = tabs.find((t) => t.id === filter) ?? tabs[0];
  const announcement =
    filter === "all"
      ? `Showing all ${current.count} specialties`
      : `Showing ${current.count} ${current.label.toLowerCase()} specialties`;

  // The hash changed the filter (deep link, back/forward): bring the target back into view after the re-layout.
  useEffect(() => {
    if (!hashMovedView || !targetId) return;
    document.getElementById(targetId)?.scrollIntoView({ block: "start" });
  }, [hashMovedView, targetId]);

  // Same-page links to a card or group (header menu, footer) update the URL with pushState, which fires no
  // event. Reveal the target on click — before the router scrolls to it — then settle once the hash lands.
  useEffect(() => {
    let frame = 0;
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== "_self")) return;
      const here = window.location;
      const url = new URL(link.href, here.href);
      if (url.origin !== here.origin || url.pathname !== here.pathname || url.search !== here.search) return;
      const next = targets.get(decodeHash(url.hash));
      if (!next) return;

      const landed = readHash();
      setView((v) => ({
        picked: resolveFilter(resolveFilter(v.picked, targets.get(v.pending ?? landed)), next),
        pending: next.id,
      }));

      cancelAnimationFrame(frame);
      const started = performance.now();
      const settle = () => {
        if (readHash() === next.id || performance.now() - started > 2000) {
          setView((v) => (v.pending === next.id ? { ...v, pending: null } : v));
        } else {
          frame = requestAnimationFrame(settle);
        }
      };
      frame = requestAnimationFrame(settle);
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
    };
  }, [targets]);

  const pick = (next: Filter) => {
    const named = targets.get(readHash());
    if (named && resolveFilter(next, named) !== next) {
      // The URL names something this choice would hide (or override): drop the hash so URL and view agree.
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setView({ picked: next, pending: null });
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    let to = -1;
    if (e.key === "ArrowRight") to = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft") to = index === 0 ? last : index - 1;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = last;
    if (to < 0) return;
    e.preventDefault();
    e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[to]?.focus();
    pick(tabs[to].id);
  };

  return (
    <>
      <div className={styles.toolbar} data-reveal>
        <div className={`v-tabs ${styles.tabs}`} role="tablist" aria-label={copy.tablist}>
          {tabs.map((tab, i) => {
            const selected = tab.id === filter;
            return (
              <button
                key={tab.id}
                id={tabId(tab.id)}
                type="button"
                role="tab"
                className="v-tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => pick(tab.id)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {tab.label} <span className={styles.count}>{tab.count}</span>
              </button>
            );
          })}
        </div>
        <Link className={`v-alink ${styles.notListed}`} href={copy.notListed.href}>
          {copy.notListed.label}
        </Link>
      </div>

      <p className="v-sr" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      <div id={panelId} role="tabpanel" aria-labelledby={tabId(filter)} className={styles.groups}>
        {groups.map((group) => {
          const members = items.filter((s) => s.group === group.id);
          return (
            <div key={group.id} id={group.id} className={styles.group} hidden={filter !== "all" && filter !== group.id}>
              <div className={styles.groupHead}>
                <span className="v-dot" aria-hidden="true" />
                <h2 className={styles.groupTitle}>{group.label}</h2>
                <span className={styles.groupCount} aria-hidden="true">
                  {members.length}
                </span>
              </div>
              {/* Keyed by filter so the cards cascade in again on every switch. */}
              <div key={filter} className={styles.grid} data-stagger>
                {members.map((item) => (
                  <SpecialtyCard
                    key={item.slug}
                    item={item}
                    groupLabel={group.label}
                    copy={copy}
                    isTarget={item.slug === targetId}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function SpecialtyCard({
  item,
  groupLabel,
  copy,
  isTarget,
}: {
  item: Specialty;
  groupLabel: string;
  copy: SpecialtyBrowserCopy;
  isTarget: boolean;
}) {
  return (
    <article id={item.slug} className={`v-card v-lift ${styles.card}`} data-target={isTarget || undefined}>
      <div className={styles.cardHead}>
        <h3 className={`v-display ${styles.cardName}`}>{item.name}</h3>
        <span className={`v-tag ${styles.cardGroup}`}>{groupLabel}</span>
      </div>
      <div className={`v-stack ${styles.challenge}`}>
        <span className="v-num">{copy.challenge}</span>
        <p className={`v-p ${styles.challengeText}`}>{item.challenge}</p>
      </div>
      <div className={styles.details}>
        <div className={`v-stack ${styles.detail}`}>
          <span className="v-tag">{copy.focus}</span>
          <div className={styles.chips}>
            {item.focus.map((f) => (
              <Link key={f.href} className="v-chip" href={f.href}>
                {f.label}
              </Link>
            ))}
          </div>
        </div>
        <div className={`v-stack ${styles.detail}`}>
          <span className="v-tag">{copy.trust}</span>
          <ul className={`v-stack ${styles.trust}`}>
            {item.trust.map((t) => (
              <li key={t}>
                <Icon name="check" size={16} strokeWidth={2.4} className={styles.check} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
