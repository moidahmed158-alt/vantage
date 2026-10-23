import { Icon } from "@/components/ui/Icon";
import { MockPanel } from "../_detail/MockPanel";
import { cx } from "../_detail/cx";
import { MOCK } from "./content";
import s from "./InboxMock.module.css";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="v-stars" role="img" aria-label={`${rating} stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="star" filled size={14} className={i < rating ? undefined : s.starOff} />
      ))}
    </span>
  );
}

/** Hero mock UI: incoming reviews on the left, a privacy-safe suggested reply on the right (stacks on phones). */
export function InboxMock() {
  return (
    <MockPanel label={MOCK.tag} flag={MOCK.flag} live bar>
      <div className={s.body}>
        <div className={s.feed}>
          {MOCK.reviews.map((review) => (
            <div key={review.quote} className={cx("v-card v-card--static", s.review, review.state === "draft" && s.hot)}>
              <div className={s.top}>
                <Stars rating={review.rating} />
                <span className={cx("v-tag", s.source)}>{review.source}</span>
              </div>
              <p className={s.quote}>{review.quote}</p>
              {review.state === "published" ? (
                <span className={s.ok}>{review.status}</span>
              ) : (
                <span className={cx("v-flag", s.status)}>{review.status}</span>
              )}
            </div>
          ))}
        </div>

        <div className={s.reply}>
          <span className={cx("v-tag", s.replyTag)}>{MOCK.reply.tag}</span>
          <p className={s.bubble}>
            {MOCK.reply.text}
            <span className={s.caret} aria-hidden="true" />
          </p>
          <ul className={s.checks}>
            {MOCK.reply.checks.map((check) => (
              <li key={check}>
                <Icon name="check" size={16} strokeWidth={2.4} />
                {check}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MockPanel>
  );
}
