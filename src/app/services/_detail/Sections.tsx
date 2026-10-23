import Link from "next/link";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Arrow } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/Section";
import { ROUTES, SERVICE_GROUPS } from "@/lib/site";
import { cx, nn } from "./cx";
import type { BlockCopy, MeasureCopy, Point, RelatedCopy, ServiceCopy } from "./types";
import s from "./detail.module.css";

/** Section background classes, e.g. "v-alt", "v-glow-tl" or "v-alt v-glow-tr". */
type Bg = { bg?: string };

/* ------------------------------------------------------------------ */
/* What's included                                                     */
/* ------------------------------------------------------------------ */

/**
 * Six numbered features, either as the ruled `.v-feature6` list or as a grid of lifted cards.
 * `id` is the hero's "What's included" jump target — unique per page, because Next keeps
 * recently visited pages mounted (hidden) and a shared id would resolve to the wrong page.
 */
export function IncludedSection({
  id,
  copy,
  layout,
  bg,
}: Bg & { id?: string; copy: BlockCopy<Point>; layout: "list" | "cards" }) {
  return (
    <section id={id} className={cx("v-sec", bg)}>
      <div className="v-wrap">
        <SectionHead eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
        {layout === "list" ? (
          <div className={cx("v-feature6", s.features)} data-stagger>
            {copy.items.map((item, i) => (
              <div key={item.title}>
                <span className="v-num">{nn(i)}</span>
                <h3 className="v-h4">{item.title}</h3>
                <p className={cx("v-p", s.body16)}>{item.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <ul className="v-grid v-grid--3" data-stagger>
            {copy.items.map((item, i) => (
              <li key={item.title} className={cx("v-card v-lift", s.featureCard)}>
                <span className="v-num">{nn(i)}</span>
                <h3 className="v-h4">{item.title}</h3>
                <p className={cx("v-p", s.body16)}>{item.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why healthcare is different                                         */
/* ------------------------------------------------------------------ */

/** Sticky heading on the left, numbered rows on the right (stacks below 1080px). */
export function WhySection({ copy, bg }: Bg & { copy: BlockCopy<Point> }) {
  return (
    <section className={cx("v-sec", bg)}>
      <div className="v-wrap v-split">
        <div className="v-sticky-col">
          <div className={cx("v-stack", s.whyHead)} data-reveal>
            <p className="v-eyebrow">{copy.eyebrow}</p>
            <h2 className="v-display v-h2">{copy.title}</h2>
          </div>
        </div>
        <ol className={cx("v-rows", s.rows)} data-stagger>
          {copy.items.map((row, i) => (
            <li key={row.title}>
              <span className="v-num">{nn(i)}</span>
              <div>
                <h3 className="v-h3">{row.title}</h3>
                <p className="v-p">{row.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How it works + What we measure                                      */
/* ------------------------------------------------------------------ */

function Measure({ tag, title, note, chips }: MeasureCopy) {
  return (
    <div className="v-measure" data-reveal>
      <div className={cx("v-stack", s.measureHead)}>
        <span className={cx("v-tag", s.measureTag)}>{tag}</span>
        <h3 className="v-h3">{title}</h3>
        {note && <p className={cx("v-p", s.note)}>{note}</p>}
      </div>
      <ul className={s.chips}>
        {chips.map((chip) => (
          <li key={chip} className={cx("v-chip", s.chip)}>
            {chip}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Four-step timeline (the rule draws in as it reveals) followed by the measurement block. */
export function ProcessSection({ copy, bg }: Bg & { copy: ServiceCopy["process"] }) {
  return (
    <section className={cx("v-sec", bg)}>
      <div className="v-wrap">
        <SectionHead eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
        <ol className={cx("v-steps4", s.steps)} data-stagger>
          {copy.items.map((step, i) => (
            <li key={step.title}>
              <h3 className="v-num">
                {nn(i)} · {step.title}
              </h3>
              <p className={cx("v-p", s.body16)}>{step.body}</p>
            </li>
          ))}
        </ol>
        <Measure {...copy.measure} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Works best with                                                     */
/* ------------------------------------------------------------------ */

function lookupService(href: string) {
  for (const group of SERVICE_GROUPS) {
    const link = group.links.find((l) => l.href === href);
    if (link) return { tag: group.title, title: link.label };
  }
  return { tag: "", title: href };
}

/** Three related-service cards; names and group tags come from SERVICE_GROUPS. */
export function RelatedSection({ copy, bg }: Bg & { copy: RelatedCopy }) {
  return (
    <section className={cx("v-sec--tight", bg)}>
      <div className="v-wrap">
        <div className={s.relHead} data-reveal>
          <h2 className="v-h3">{copy.title}</h2>
          <Link className={cx("v-alink", s.allLink)} href={ROUTES.services}>
            {copy.allLabel}
            <Arrow />
          </Link>
        </div>
        <ul className={s.relList} data-stagger>
          {copy.items.map((item) => {
            const known = lookupService(item.href);
            const tag = item.tag ?? known.tag;
            const title = item.title ?? known.title;
            return (
              <li key={item.href}>
                <Link className={cx("v-card v-lift", s.relCard)} href={item.href}>
                  {tag && <span className="v-tag">{tag}</span>}
                  <strong className={s.relTitle}>{title}</strong>
                  <span className={cx("v-p", s.relBody)}>{item.body}</span>
                  <span className={s.relGo} aria-hidden="true">
                    <Arrow size={16} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

/** Narrow FAQ accordion; the first answer starts open. */
export function FaqSection({ copy, bg }: Bg & { copy: BlockCopy<AccordionItem> }) {
  return (
    <section className={cx("v-sec", bg)}>
      <div className="v-wrap v-wrap--narrow">
        <SectionHead eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
        <div data-reveal="1">
          <Accordion items={copy.items} defaultOpen={0} headingLevel={3} />
        </div>
      </div>
    </section>
  );
}
