import type { CSSProperties, ReactNode } from "react";
import { Btn } from "@/components/ui/Button";
import { Crumbs } from "@/components/ui/Section";
import { ROUTES } from "@/lib/site";
import { cx } from "./cx";
import type { HeroCopy } from "./types";
import s from "./detail.module.css";

const GLOW = { tr: "v-glow-tr", tl: "v-glow-tl", c: "v-glow-c" } as const;

/** Blurred light source behind the hero. Sizes/offsets in px, as in the design; the size is capped on phones. */
export type HeroOrb = { tone: "blue" | "cyan"; size: number; top: number; left?: number; right?: number };

/**
 * Breadcrumbs + split hero shared by every service detail page:
 * copy on the left, the page's own illustrative mock UI on the right (stacks below 1080px).
 */
export function ServiceHero({
  copy,
  glow,
  orb,
  visual,
}: {
  copy: HeroCopy;
  glow: keyof typeof GLOW;
  orb?: HeroOrb;
  visual: ReactNode;
}) {
  const orbSize = orb && `min(${orb.size}px, 120vw)`;
  const orbStyle: CSSProperties | undefined = orb && {
    width: orbSize,
    height: orbSize,
    top: orb.top,
    left: orb.left,
    right: orb.right,
  };

  return (
    <div className={cx("v-phero", GLOW[glow])}>
      <div className="v-gridbg" />
      {orb && <div className={`v-orb v-orb--${orb.tone}`} style={orbStyle} />}
      <Crumbs items={[{ label: "Services", href: ROUTES.services }, { label: copy.crumb }]} />
      <section className="v-phero-body">
        <div className="v-wrap v-split v-split--center">
          <div className={cx("v-phero-stack", s.heroCopy)}>
            <p className="v-eyebrow v-rise">{copy.eyebrow}</p>
            <h1 className="v-display v-h1--page v-rise v-d1">{copy.title}</h1>
            <p className="v-lead v-rise v-d2">{copy.lead}</p>
            <div className="v-btn-row v-rise v-d3">
              <Btn href={copy.primary.href} arrow>
                {copy.primary.label}
              </Btn>
              <Btn href={copy.secondary.href} variant="ghost">
                {copy.secondary.label}
              </Btn>
            </div>
          </div>
          <div className={cx("v-rise v-d3", s.heroVisual)}>{visual}</div>
        </div>
      </section>
    </div>
  );
}
