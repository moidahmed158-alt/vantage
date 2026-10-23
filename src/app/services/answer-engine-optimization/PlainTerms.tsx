import { SectionHead } from "@/components/ui/Section";
import { cx } from "../_detail/cx";
import { PLAIN, PLAIN_ID } from "./content";
import s from "./PlainTerms.module.css";

/** "AEO in plain terms": a list of links (search engine) beside one composed answer (answer engine). */
export function PlainTerms() {
  return (
    <section id={PLAIN_ID} className="v-sec v-alt">
      <div className="v-wrap">
        <SectionHead eyebrow={PLAIN.eyebrow} title={PLAIN.title} lead={PLAIN.lead} />
        <div className={s.compare} data-stagger>
          <div className={cx("v-card", s.side)}>
            <span className="v-tag">{PLAIN.search.tag}</span>
            <h3 className="v-h3">{PLAIN.search.title}</h3>
            <ul className={s.links} aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <li key={i}>
                  <span className={cx("v-skel", s.fav)} />
                  <span className={cx("v-skel", s.bar)} />
                </li>
              ))}
            </ul>
            <p className={cx("v-p", s.text)}>{PLAIN.search.body}</p>
          </div>

          <div className={cx("v-card v-card--hi", s.side, s.hi)}>
            <span className={cx("v-tag", s.tagHi)}>{PLAIN.answer.tag}</span>
            <h3 className="v-h3">{PLAIN.answer.title}</h3>
            <div className={s.answer} aria-hidden="true">
              <span className={cx("v-skel", s.bar)} />
              <span className={cx("v-skel", s.bar)} />
              <span className={cx("v-skel", s.bar)} />
              <span className={s.dots}>
                <i />
                <i />
                <i />
              </span>
            </div>
            <p className={cx("v-p", s.text)}>{PLAIN.answer.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
