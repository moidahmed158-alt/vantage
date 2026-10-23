import type { ReactNode } from "react";
import { cx } from "./cx";
import s from "./detail.module.css";

/**
 * Frame for a hero mock UI: a `.v-panel` figure whose caption row carries the mono tag
 * and the permanent "Illustrative" disclaimer (a plain `.v-flag`, never hidden).
 */
export function MockPanel({
  label,
  flag,
  live,
  bar,
  className,
  children,
}: {
  label: string;
  flag: string;
  /** Blinking "live" dot before the label. */
  live?: boolean;
  /** Caption as a full-width header bar with a rule below; content then sets its own padding. */
  bar?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <figure className={cx("v-panel v-mock", s.panel, !bar && s.panelPad, className)}>
      <figcaption className={cx(s.head, bar && s.headBar)}>
        <span className={cx("v-tag", s.headTag)}>
          {live && <span className="v-live" />}
          {label}
        </span>
        <span className="v-flag">{flag}</span>
      </figcaption>
      {children}
    </figure>
  );
}
