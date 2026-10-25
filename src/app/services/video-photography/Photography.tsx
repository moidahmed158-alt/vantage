import { Btn } from "@/components/ui/Button";
import { cx, nn } from "../_detail/cx";
import { PHOTO } from "./content";
import s from "./Photography.module.css";

/** "Photography": copy beside a contact sheet of the shots we take on the same visit. */
export function Photography() {
  return (
    <section className="v-sec v-alt">
      <div className="v-wrap v-split v-split--center">
        <div className={cx("v-stack", s.copy)} data-reveal>
          <p className="v-eyebrow">{PHOTO.eyebrow}</p>
          <h2 className="v-display v-h2">{PHOTO.title}</h2>
          {PHOTO.body.map((para) => (
            <p key={para} className="v-p">
              {para}
            </p>
          ))}
          <div className="v-btn-row">
            <Btn href={PHOTO.cta.href} arrow>
              {PHOTO.cta.label}
            </Btn>
          </div>
        </div>

        <div className={s.sheetWrap} data-reveal="1">
          <h3 className={cx("v-tag", s.sheetTitle)}>{PHOTO.listTitle}</h3>
          <ul className={s.sheet}>
            {PHOTO.list.map((shot, i) => (
              <li key={shot} className={s.shot}>
                <span className={s.frameNo} aria-hidden="true">
                  {nn(i)}
                </span>
                <span className={s.label}>{shot}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
