"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { SectionHead } from "@/components/ui/Section";
import { cx, nn } from "../_detail/cx";
import { SOURCES, type SourceId } from "./content";
import s from "./SourceExplorer.module.css";

const ITEMS = SOURCES.items;

/**
 * "How AI chooses a practice": pick one of the five sources an AI answer draws on to see what it looks for,
 * what usually goes wrong and what we change. Followed by how each major assistant reads the web.
 */
export function SourceExplorer() {
  const [tab, setTab] = useState<SourceId>(ITEMS[0].id);
  const base = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = ITEMS.findIndex((x) => x.id === tab);
  const active = ITEMS[index];
  const tabId = (id: SourceId) => `${base}-tab-${id}`;
  const panelId = `${base}-panel`;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (index + 1) % ITEMS.length
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (index - 1 + ITEMS.length) % ITEMS.length
      : e.key === "Home" ? 0
      : e.key === "End" ? ITEMS.length - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    setTab(ITEMS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="v-sec v-alt v-glow-tl">
      <div className="v-wrap">
        <SectionHead eyebrow={SOURCES.eyebrow} title={SOURCES.title} lead={SOURCES.lead} />

        <div className={s.explorer} data-reveal="1">
          <div className={s.list} role="tablist" aria-label="Sources AI answers draw on" onKeyDown={onKey}>
            {ITEMS.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={tabId(item.id)}
                className={s.tab}
                aria-selected={item.id === tab}
                aria-controls={panelId}
                tabIndex={item.id === tab ? 0 : -1}
                onClick={() => setTab(item.id)}
              >
                <span className="v-num">{nn(i)}</span>
                <span className={s.tabText}>
                  <strong>{item.label}</strong>
                  <small>{item.hint}</small>
                </span>
              </button>
            ))}
          </div>

          <div id={panelId} role="tabpanel" aria-labelledby={tabId(tab)} className={cx("v-panel", s.panel)}>
            <div key={tab} className={cx("v-fadein", s.panelIn)}>
              <div className={s.panelHead}>
                <span className="v-num">
                  Source {nn(index)} / {nn(ITEMS.length - 1)}
                </span>
                <h3 className="v-h3">{active.label}</h3>
              </div>
              <div className={s.blocks}>
                <div className={s.block}>
                  <span className="v-tag">{SOURCES.blocks.looks}</span>
                  <p>{active.looks}</p>
                </div>
                <div className={cx(s.block, s.wrong)}>
                  <span className="v-tag">{SOURCES.blocks.wrong}</span>
                  <p>{active.wrong}</p>
                </div>
                <div className={cx(s.block, s.change)}>
                  <span className="v-tag">{SOURCES.blocks.change}</span>
                  <p>{active.change}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className={cx("v-h3", s.enginesTitle)} data-reveal>
          {SOURCES.enginesTitle}
        </h3>
        <ul className={s.engines} data-stagger>
          {SOURCES.engines.map((engine) => (
            <li key={engine.name} className={cx("v-card", s.engine)}>
              <span className={s.engineName}>
                <span className="v-dot" />
                {engine.name}
              </span>
              <p className="v-p">{engine.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
