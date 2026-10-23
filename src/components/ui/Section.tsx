import Link from "next/link";
import type { ReactNode } from "react";
import { Btn } from "./Button";

/** Eyebrow + display heading (+ optional lead) at the top of a section. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  row,
  center,
  aside,
  as: H = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Heading left, lead (or `aside`) right on wide screens. */
  row?: boolean;
  center?: boolean;
  aside?: ReactNode;
  as?: "h1" | "h2";
}) {
  const cls = ["v-sec-head", row && "v-sec-head--row", center && "v-sec-head--center"].filter(Boolean).join(" ");
  const heading = (
    <>
      <p className="v-eyebrow">{eyebrow}</p>
      <H className="v-display v-h2">{title}</H>
    </>
  );
  if (row) {
    return (
      <div className={cls} data-reveal>
        <div className="v-stack v-sec-head-main">{heading}</div>
        {aside ?? (lead && <p className="v-lead v-sec-head-aside">{lead}</p>)}
      </div>
    );
  }
  return (
    <div className={cls} data-reveal>
      {heading}
      {lead && <p className="v-lead">{lead}</p>}
      {aside}
    </div>
  );
}

/** Breadcrumb trail for interior pages. The last item is the current page. */
export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="v-wrap">
      <ol className="v-crumbs">
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((item) => (
          <li key={item.label}>
            <span aria-hidden="true" className="v-crumbs-sep">
              /
            </span>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page" className="v-crumbs-cur">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Closing call-to-action band used at the foot of most pages. */
export function CtaBand({
  title,
  lead,
  primary,
  secondary,
  alt,
}: {
  title: ReactNode;
  lead: ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Use the alternate (raised) background — for pages where the section above is plain. */
  alt?: boolean;
}) {
  return (
    <section className={`v-sec v-glow-b v-cta-band${alt ? " v-alt" : ""}`}>
      <div className="v-gridbg" />
      <div className="v-beamline" style={{ top: 0 }} />
      <div className="v-wrap v-duo" data-reveal>
        <h2 className="v-display v-h2">{title}</h2>
        <div className="v-stack" style={{ gap: 24 }}>
          <p className="v-lead">{lead}</p>
          <div className="v-btn-row">
            <Btn href={primary.href} arrow>
              {primary.label}
            </Btn>
            {secondary && (
              <Btn href={secondary.href} variant="ghost">
                {secondary.label}
              </Btn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
