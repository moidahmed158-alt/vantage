"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/Section";
import { cx, nn } from "../_detail/cx";
import { SHOOT_DAY } from "./content";
import s from "./ShootDay.module.css";

const STEPS = SHOOT_DAY.steps;
/** Phase labels span the steps that belong to them. */
const PHASE_SPANS = SHOOT_DAY.phases.map((phase) => ({ phase, span: STEPS.filter((st) => st.phase === phase).length }));

/** "Shoot day": a six-step stepper grouped into before / during / after, with what we need from the practice at each step. */
export function ShootDay() {
  const [tab, setTab] = useState(STEPS[0].id);
  const base = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = STEPS.findIndex((st) => st.id === tab);
  const active = STEPS[index];
  const tabId = (id: string) => `${base}-tab-${id}`;
  const panelId = `${base}-panel`;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const next =
      e.key === "ArrowRight" ? (index + 1) % STEPS.length
      : e.key === "ArrowLeft" ? (index - 1 + STEPS.length) % STEPS.length
      : e.key === "Home" ? 0
      : e.key === "End" ? STEPS.length - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    setTab(STEPS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="v-sec v-glow-tr">
      <div className="v-wrap">
        <SectionHead eyebrow={SHOOT_DAY.eyebrow} title={SHOOT_DAY.title} lead={SHOOT_DAY.lead} />

        <div className={s.stepper} data-reveal>
          <div className={s.phases} aria-hidden="true">
            {PHASE_SPANS.map(({ phase, span }) => (
              <span key={phase} style={{ gridColumn: `span ${span}` }}>
                {phase}
              </span>
            ))}
          </div>
          <div className={s.tabs} role="tablist" aria-label={SHOOT_DAY.tabsLabel} onKeyDown={onKey}>
            {STEPS.map((st, i) => (
              <button
                key={st.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={tabId(st.id)}
                className={s.tab}
                aria-selected={st.id === tab}
                aria-controls={panelId}
                tabIndex={st.id === tab ? 0 : -1}
                onClick={() => setTab(st.id)}
              >
                <span className="v-num">{nn(i)}</span>
                {st.label}
              </button>
            ))}
          </div>
        </div>

        <div id={panelId} role="tabpanel" aria-labelledby={tabId(tab)} className={cx("v-panel", s.panel)} data-reveal="1">
          <div key={tab} className={cx("v-fadein", s.panelIn)}>
            <div className={s.copy}>
              <span className="v-num">
                Step {nn(index)} · {active.phase}
              </span>
              <h3 className="v-h3">{active.title}</h3>
              <p className="v-p">{active.body}</p>
            </div>
            <div className={s.needs}>
              <span className="v-tag">{SHOOT_DAY.needLabel}</span>
              <ul className="v-checklist">
                {active.needs.map((need) => (
                  <li key={need}>
                    <Icon name="check" size={16} strokeWidth={2.4} />
                    {need}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
