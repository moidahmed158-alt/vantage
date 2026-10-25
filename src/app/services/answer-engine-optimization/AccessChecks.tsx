import { Icon } from "@/components/ui/Icon";
import { MockPanel } from "../_detail/MockPanel";
import { cx } from "../_detail/cx";
import { CHECKS } from "./content";
import s from "./AccessChecks.module.css";

/** "Technical checks": copy and a self-test tip beside an illustrative AI-access status panel. */
export function AccessChecks() {
  return (
    <section className="v-sec">
      <div className="v-wrap v-split v-split--center">
        <div className={cx("v-stack", s.copy)} data-reveal>
          <p className="v-eyebrow">{CHECKS.eyebrow}</p>
          <h2 className="v-display v-h2">{CHECKS.title}</h2>
          <p className="v-lead">{CHECKS.lead}</p>
          <div className={cx("v-card v-card--static", s.tryIt)}>
            <span className="v-icon v-icon--sm">
              <Icon name="search" size={18} strokeWidth={2} />
            </span>
            <div className={s.tryText}>
              <strong>{CHECKS.tryIt.title}</strong>
              <p className="v-p">{CHECKS.tryIt.body}</p>
            </div>
          </div>
        </div>

        <div data-reveal="1">
          <MockPanel label={CHECKS.panel.tag} flag={CHECKS.panel.flag} live bar>
            <ul className={s.rows}>
              {CHECKS.rows.map((row) => (
                <li key={row.label} className={s.row}>
                  <div className={s.rowText}>
                    <code className={s.rowLabel}>{row.label}</code>
                    <span className={s.rowDetail}>{row.detail}</span>
                    {row.chips && (
                      <span className={s.bots}>
                        {row.chips.map((bot) => (
                          <span key={bot}>{bot}</span>
                        ))}
                      </span>
                    )}
                  </div>
                  <span className={cx(s.status, row.status === "fix" && s.statusFix)}>
                    <Icon name={row.status === "pass" ? "check" : "alert"} size={13} strokeWidth={2.4} />
                    {CHECKS.statusLabel[row.status]}
                  </span>
                </li>
              ))}
            </ul>
          </MockPanel>
        </div>
      </div>
    </section>
  );
}
