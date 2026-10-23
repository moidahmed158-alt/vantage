"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import s from "./legal.module.css";

export type TocItem = { id: string; num: string; label: string };

function TocLinks({ items, active, onPick }: { items: TocItem[]; active?: string | null; onPick?: () => void }) {
  return (
    <ol className={s.tocList}>
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={s.tocLink}
            aria-current={active === item.id ? "location" : undefined}
            onClick={onPick}
          >
            {item.num && <span className={s.tocNum}>{item.num.padStart(2, "0")}</span>}
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * Sticky "On this page" rail for wide screens (hidden below 1080px by CSS).
 * Highlights the section whose heading has most recently passed the upper third of the viewport.
 */
export function TocRail({ items, label }: { items: TocItem[]; label: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!headings.length) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const line = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const el of headings) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      // Short closing sections can't reach the line; treat the bottom of the article as the last section.
      const last = headings[headings.length - 1];
      if (current && window.innerHeight + window.scrollY >= doc.scrollHeight - 4) current = last.id;
      setActive(current);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  return (
    <nav aria-label={label} className={s.rail}>
      <p className="v-tag">{label}</p>
      <TocLinks items={items} active={active} />
    </nav>
  );
}

/** Collapsible contents shown above the prose below 1080px. Closes after a link is chosen. */
export function TocCompact({ items, label }: { items: TocItem[]; label: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  // Closing before the browser follows the hash keeps the jump target where the user expects it.
  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  return (
    <nav aria-label={label} className={s.compact}>
      <details ref={ref} className={s.details}>
        <summary className={s.summary}>
          <span className={s.summaryLabel}>
            <Icon name="doc" size={18} />
            {label}
          </span>
          <Icon name="caret" size={18} strokeWidth={2} className={s.summaryCaret} />
        </summary>
        <TocLinks items={items} onPick={close} />
      </details>
    </nav>
  );
}
