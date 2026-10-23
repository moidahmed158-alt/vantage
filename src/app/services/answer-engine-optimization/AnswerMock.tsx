import { Icon } from "@/components/ui/Icon";
import { MockPanel } from "../_detail/MockPanel";
import { cx } from "../_detail/cx";
import { MOCK } from "./content";
import s from "./AnswerMock.module.css";

/** Hero mock UI: a chat exchange with an AI assistant; the question, answer and signals arrive in sequence. */
export function AnswerMock() {
  return (
    <MockPanel label={MOCK.tag} flag={MOCK.flag} live>
      <p className={s.ask}>{MOCK.question}</p>
      <div className={cx("v-card v-card--static", s.answer)}>
        <p className={s.answerText}>{MOCK.answer}</p>
        <ul className={s.sources}>
          {MOCK.sources.map((source) => (
            <li key={source} className={cx("v-chip v-chip--sm", s.source)}>
              {source}
            </li>
          ))}
        </ul>
      </div>
      <ul className={s.signals}>
        {MOCK.signals.map((signal) => (
          <li key={signal} className={s.signal}>
            <Icon name="check" size={14} strokeWidth={2.4} />
            {signal}
          </li>
        ))}
      </ul>
    </MockPanel>
  );
}
