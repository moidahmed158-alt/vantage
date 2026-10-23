import { cx } from "../_detail/cx";
import { MOCK } from "./content";
import s from "./BrowserMock.module.css";

const CALLOUT_POS = [s.callout1, s.callout2, s.callout3];
const CALLOUT_FLOAT = ["v-floaty", "v-floaty v-floaty--2", "v-floaty v-floaty--3"];

/**
 * Hero mock UI: a concept practice homepage in a browser frame.
 * Callouts float over the frame on wide screens and become a numbered list below it on phones.
 */
export function BrowserMock() {
  return (
    <figure className={s.figure}>
      <figcaption className={cx("v-flag", s.caption)}>{MOCK.caption}</figcaption>

      <div className="v-browser">
        <div className="v-browser-bar">
          <i />
          <i />
          <i />
          <span className="v-browser-url">{MOCK.url}</span>
        </div>
        <div className={cx("v-mock", s.site)}>
          <div className={s.nav}>
            <span className={s.brand}>{MOCK.brand}</span>
            <span className={s.navRight}>
              <span className={cx("v-skel", s.navSkel)} aria-hidden="true" />
              <span className={cx("v-skel", s.navSkel)} aria-hidden="true" />
              <span className={s.navCta}>{MOCK.navCta}</span>
            </span>
          </div>

          <div className={s.hero}>
            <div className={s.heroCopy}>
              <span className={s.headline}>{MOCK.headline}</span>
              <span className={cx("v-skel", s.sk90)} aria-hidden="true" />
              <span className={cx("v-skel", s.sk70)} aria-hidden="true" />
              <span className={s.ctas}>
                <span className={s.btnSolid}>{MOCK.ctas.primary}</span>
                <span className={s.btnLine}>{MOCK.ctas.secondary}</span>
              </span>
            </div>
            <div className={s.photo}>
              <span className={cx("v-tag", s.photoTag)}>{MOCK.photo}</span>
            </div>
          </div>

          <ul className={s.services}>
            {MOCK.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      </div>

      <ol className={s.callouts}>
        {MOCK.callouts.map((text, i) => (
          <li key={text} className={cx("v-pin", CALLOUT_FLOAT[i], s.callout, CALLOUT_POS[i])}>
            <i>{i + 1}</i>
            {text}
          </li>
        ))}
      </ol>
    </figure>
  );
}
