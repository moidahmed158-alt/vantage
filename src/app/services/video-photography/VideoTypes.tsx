import { SectionHead } from "@/components/ui/Section";
import { cx, nn } from "../_detail/cx";
import { TYPES_ID, VIDEO_TYPES } from "./content";
import s from "./VideoTypes.module.css";

/** "What we film": six video types as cards, each listing where the edit gets used. */
export function VideoTypes() {
  return (
    <section id={TYPES_ID} className="v-sec v-alt">
      <div className="v-wrap">
        <SectionHead eyebrow={VIDEO_TYPES.eyebrow} title={VIDEO_TYPES.title} lead={VIDEO_TYPES.lead} />
        <ul className="v-grid v-grid--3" data-stagger>
          {VIDEO_TYPES.items.map((item, i) => (
            <li key={item.title} className={cx("v-card v-lift", s.card)}>
              <span className="v-num">{nn(i)}</span>
              <h3 className="v-h4">{item.title}</h3>
              <p className={cx("v-p", s.body)}>{item.body}</p>
              <div className={s.uses}>
                <span className="v-tag">{VIDEO_TYPES.usedOnLabel}</span>
                <ul className={s.chips}>
                  {item.uses.map((use) => (
                    <li key={use}>{use}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
