"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/Section";
import { cx } from "../_detail/cx";
import { BEFORE_AFTER as BA, type PageState } from "./content";
import s from "./BeforeAfter.module.css";

const ORDER: PageState[] = ["before", "after"];

/** Numbered marker tying a spot on the mock page to the matching point in the list beside it. */
function Marker({ n }: { n: number }) {
  return (
    <i className={s.marker} aria-hidden="true">
      {n}
    </i>
  );
}

function Skel({ className }: { className: string }) {
  return <span className={cx("v-skel", className)} aria-hidden="true" />;
}

function BeforePage() {
  return (
    <>
      <div className={s.hero}>
        <div className={s.heroCopy}>
          <span className={s.marked}>
            <Marker n={1} />
            <span className={s.headline}>{BA.before.headline}</span>
          </span>
          <Skel className={s.sk90} />
          <Skel className={s.sk70} />
        </div>
        <div className={cx(s.photo, s.stock)}>
          <Marker n={3} />
          <span className="v-tag">{BA.before.photo}</span>
        </div>
      </div>
      <div className={s.marked}>
        <Marker n={2} />
        <ul className={s.pills}>
          {BA.before.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>
      <div className={cx(s.marked, s.form)}>
        <Marker n={4} />
        <Skel className={s.field} />
        <Skel className={s.field} />
        <span className={s.btnDim}>{BA.before.form}</span>
      </div>
    </>
  );
}

function AfterPage() {
  return (
    <>
      <span className={s.marked}>
        <Marker n={1} />
        <span className={s.headline}>{BA.after.headline}</span>
      </span>
      <div className={cx(s.marked, s.answer)}>
        <Marker n={2} />
        <div className={s.answerBody}>
          <span className={cx("v-tag", s.answerTag)}>{BA.after.answerTag}</span>
          <Skel className={s.sk95} />
          <Skel className={s.sk80} />
        </div>
      </div>
      <div className={s.marked}>
        <Marker n={3} />
        <ul className={cx(s.pills, s.pillsOn)}>
          {BA.after.sections.map((section) => (
            <li key={section}>
              <Icon name="check" size={12} strokeWidth={2.6} />
              {section}
            </li>
          ))}
        </ul>
      </div>
      <div className={cx(s.marked, s.proof)}>
        <Marker n={4} />
        <div className={s.proofBody}>
          <div className={s.provider}>
            <span className={s.avatar} aria-hidden="true" />
            <div className={s.providerText}>
              <span className="v-tag">{BA.after.providerTag}</span>
              <Skel className={s.sk70} />
            </div>
          </div>
          <ul className={s.faqs}>
            {BA.after.faqs.map((q) => (
              <li key={q}>
                {q}
                <Icon name="plus" size={12} strokeWidth={2.4} />
              </li>
            ))}
          </ul>
          <code className={s.schema}>
            <span>JSON-LD</span> {BA.after.schema}
          </code>
        </div>
      </div>
      <span className={s.btnSolid}>{BA.after.cta}</span>
    </>
  );
}

/** "Before & after": a toggle between a brochure-style treatment page and one rebuilt to be citable. */
export function BeforeAfter() {
  const [state, setState] = useState<PageState>("before");
  const base = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = BA.states[state];
  const tabId = (id: PageState) => `${base}-tab-${id}`;
  const panelId = `${base}-panel`;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const i = ORDER.indexOf(state);
    const next = e.key === "Home" ? 0 : e.key === "End" ? ORDER.length - 1 : (i + 1) % ORDER.length;
    setState(ORDER[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="v-sec v-alt">
      <div className="v-wrap">
        <SectionHead eyebrow={BA.eyebrow} title={BA.title} lead={BA.lead} />

        <div className={cx("v-tabs", s.toggle)} role="tablist" aria-label={BA.tabsLabel} onKeyDown={onKey} data-reveal>
          {ORDER.map((id, i) => (
            <button
              key={id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={tabId(id)}
              className="v-tab"
              aria-selected={id === state}
              aria-controls={panelId}
              tabIndex={id === state ? 0 : -1}
              onClick={() => setState(id)}
            >
              {BA.states[id].label}
            </button>
          ))}
        </div>

        <div id={panelId} role="tabpanel" aria-labelledby={tabId(state)} className={s.stage} data-reveal="1">
          <figure className={s.figure}>
            <figcaption className={cx("v-flag", s.caption)}>{BA.flag}</figcaption>
            <div className="v-browser">
              <div className="v-browser-bar">
                <i />
                <i />
                <i />
                <span className="v-browser-url">{current.url}</span>
              </div>
              <div key={state} className={cx("v-mock v-fadein", s.page, state === "after" && s.pageAfter)}>
                {state === "before" ? <BeforePage /> : <AfterPage />}
              </div>
            </div>
          </figure>

          <div key={state} className={cx("v-fadein", s.verdict, state === "after" && s.verdictAfter)}>
            <span className={cx("v-tag", s.verdictTag)}>{current.verdict}</span>
            <ol className={s.points}>
              {current.points.map((point, i) => (
                <li key={point}>
                  <i className={s.marker} aria-hidden="true">
                    {i + 1}
                  </i>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
