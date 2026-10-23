import type { Metadata } from "next";
import { Btn, RowLink } from "@/components/ui/Button";
import { Radar } from "@/components/ui/Radar";
import { ROUTES } from "@/lib/site";
import s from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const POPULAR = [
  { label: "Services", href: ROUTES.services },
  { label: "Integrations directory", href: ROUTES.integrations },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Resources", href: ROUTES.resources },
];

export default function NotFound() {
  return (
    <section className={`v-glow-c ${s.page}`}>
      <div className={`v-gridbg ${s.grid}`} />
      <div className={s.radar} aria-hidden="true">
        <Radar inner={false} axes={false}>
          <span className={s.lost} />
        </Radar>
      </div>
      <div className={`v-wrap ${s.layout}`}>
        <div className="v-stack" style={{ gap: 24 }}>
          <p className="v-eyebrow v-rise">Error 404 · Signal lost</p>
          <h1 className="v-display v-h1 v-rise v-d1">
            You&apos;ve drifted <span className="v-grad">off the radar</span>.
          </h1>
          <p className="v-lead v-rise v-d2">The page you&apos;re looking for has moved or never existed. Here&apos;s the way back to higher ground.</p>
          <div className="v-btn-row v-rise v-d3">
            <Btn href={ROUTES.home} arrow>
              Back to home
            </Btn>
            <Btn href={ROUTES.contact} variant="ghost">
              Contact us
            </Btn>
          </div>
        </div>
        <nav aria-label="Popular pages" className="v-rise v-d3">
          <ul className="v-row-list">
            {POPULAR.map((p) => (
              <li key={p.href}>
                <RowLink href={p.href} large className={s.row}>
                  {p.label}
                </RowLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
