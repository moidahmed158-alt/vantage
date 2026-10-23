import { Icon } from "@/components/ui/Icon";
import { MockPanel } from "../_detail/MockPanel";
import { cx } from "../_detail/cx";
import { MOCK } from "./content";
import s from "./SearchMock.module.css";

/** Hero mock UI: search bar, map pack with the practice ranked first, and an organic result. */
export function SearchMock() {
  return (
    <MockPanel label={MOCK.tag} flag={MOCK.flag}>
      <div className="v-searchbar">
        <Icon name="search" size={16} strokeWidth={2.2} />
        <span className={s.query}>{MOCK.query}</span>
      </div>

      <div className={cx("v-card v-card--static", s.pack)}>
        <div className={s.map} aria-hidden="true">
          <svg className={s.roads} viewBox="0 0 100 40" preserveAspectRatio="none">
            <path className={s.road} d="M-2 30 C 20 26, 34 12, 52 14 S 84 30, 102 22" />
            <path className={s.road} d="M64 -2 C 60 12, 70 26, 66 42" />
            <path className={s.lane} d="M-2 10 C 18 14, 30 4, 44 6 S 70 2, 102 8" />
            <path className={s.lane} d="M22 -2 C 24 14, 16 28, 20 42" />
          </svg>
          <span className={s.pinMain}>
            <span className={cx("v-pulse", s.pulse)} />
            <svg width="18" height="18" viewBox="0 0 64 64">
              <path d="M17 25L29 47L53 9" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className={cx(s.pinDot, s.pinA)} />
          <span className={cx(s.pinDot, s.pinB)} />
        </div>
        <ol className={s.list}>
          <li className={s.row}>
            <div className={s.rowText}>
              <strong className={s.name}>{MOCK.listing.name}</strong>
              <span className={s.meta}>{MOCK.listing.meta}</span>
            </div>
            <span className={s.rankOn}>{MOCK.listing.rank}</span>
          </li>
          {MOCK.otherRanks.map((rank) => (
            <li key={rank} className={cx(s.row, s.dim)}>
              <div className={s.rowText} aria-hidden="true">
                <span className={cx("v-skel", s.skTitle)} />
                <span className={cx("v-skel", s.skLine)} />
              </div>
              <span className={s.rank}>{rank}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className={cx("v-card v-card--static", s.organic)}>
        <span className={s.url}>{MOCK.organic.url}</span>
        <strong className={s.title}>{MOCK.organic.title}</strong>
        <span className={s.desc}>{MOCK.organic.body}</span>
      </div>
    </MockPanel>
  );
}
