import { SectionHead } from "@/components/ui/Section";
import { cx } from "../_detail/cx";
import { TERMS } from "./content";
import s from "./Vocabulary.module.css";

/** "AI search, defined": the platforms patients use, then four glossary cards with an example each. */
export function Vocabulary() {
  return (
    <section className="v-sec">
      <div className="v-wrap">
        <SectionHead eyebrow={TERMS.eyebrow} title={TERMS.title} lead={TERMS.lead} />

        <div className={s.platforms} data-reveal>
          <span className="v-tag">{TERMS.platformsLabel}</span>
          <ul className={s.platformList}>
            {TERMS.platforms.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <dl className={s.terms} data-stagger>
          {TERMS.items.map((t) => (
            <div key={t.term} className={cx("v-card v-lift", s.term)}>
              <dt className={s.termHead}>
                <span className={s.abbr}>{t.term}</span>
                <span className="v-h4">{t.full}</span>
              </dt>
              <dd className={cx("v-p", s.def)}>{t.def}</dd>
              <dd className={s.example}>
                <span className="v-tag">Example</span>
                {t.example}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
