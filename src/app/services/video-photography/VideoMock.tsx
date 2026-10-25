import { MockPanel } from "../_detail/MockPanel";
import { cx } from "../_detail/cx";
import { MOCK } from "./content";
import s from "./VideoMock.module.css";

const RATIO_SHAPE: Record<string, string> = { "16:9": s.wide, "9:16": s.tall, "1:1": s.square };

/**
 * Hero mock UI: a provider-interview edit — framed shot with lower third and burned-in captions,
 * the edit timeline beneath it, and the aspect ratios the same footage is cut to.
 */
export function VideoMock() {
  return (
    <MockPanel label={MOCK.tag} flag={MOCK.flag} live>
      <div className={s.frame}>
        <span className={s.light} aria-hidden="true" />
        <span className={s.subject} aria-hidden="true" />
        <span className={s.timecode}>{MOCK.timecode}</span>
        <div className={s.lowerThird}>
          <strong>{MOCK.name}</strong>
          <span>{MOCK.practice}</span>
        </div>
        <p className={s.caption}>{MOCK.caption}</p>
      </div>

      <div className={s.timeline} aria-hidden="true">
        <div className={s.track}>
          {MOCK.clips.map((clip, i) => (
            <span
              key={`${clip.label}-${i}`}
              className={cx(s.clip, clip.label === "B-roll" && s.clipAlt, i === MOCK.clips.length - 1 && s.clipEnd)}
              style={{ width: `${clip.w}%` }}
            >
              {clip.label}
            </span>
          ))}
        </div>
        <span className={s.playhead} />
      </div>

      <div className={s.formats}>
        <span className="v-tag">{MOCK.formatsLabel}</span>
        <ul className={s.formatList}>
          {MOCK.formats.map((f) => (
            <li key={f.ratio}>
              <span className={cx(s.shape, RATIO_SHAPE[f.ratio])} aria-hidden="true" />
              <span className={s.formatText}>
                <b>{f.ratio}</b>
                {f.use}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </MockPanel>
  );
}
