import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Ph } from "@/components/ui/Flag";
import { SITE } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Book a strategy call",
  description:
    "Tell us about your practice and goals. We review your visibility before the call, so the conversation is specific to your market.",
};

/* ---------- copy (verbatim from the design) ---------- */

/** "What happens next" card. Numbers are generated from the order. */
const NEXT_STEPS: { title: string; body: ReactNode }[] = [
  { title: "You share the basics", body: "About two minutes. No patient information needed." },
  {
    title: "We do our homework",
    body: "Search, maps, AI answers, reviews and your website — reviewed before we speak.",
  },
  {
    title: "Strategy call",
    body: (
      <>
        A <Ph>[DURATION]</Ph> conversation with a strategist about your goals and the biggest opportunities we found.
      </>
    ),
  },
  { title: "A written summary", body: "Prioritized recommendations you can act on — with us or without us." },
];

export default function ContactPage() {
  return (
    <section className={`v-glow-tr ${s.hero}`}>
      <div className="v-gridbg" />
      <div className={`v-orb v-orb--blue ${s.orb}`} />
      <div className={`v-wrap ${s.wrap}`}>
        <div className={`v-split ${s.split}`}>
          {/* ---------- intro column ---------- */}
          <div className={`v-stack ${s.intro}`}>
            <div className={`v-stack ${s.introHead}`}>
              <p className="v-eyebrow v-rise">Contact</p>
              <h1 className="v-display v-h1--page v-rise v-d1">
                Let&apos;s look at your market <span className="v-grad">together</span>.
              </h1>
              <p className="v-lead v-rise v-d2">
                Tell us about your practice and what you want to change. We&apos;ll review your current visibility
                before we talk, so the call is about your market — not a generic pitch.
              </p>
            </div>

            <div className={`v-card v-card--hi v-rise v-d3 ${s.nextCard}`}>
              <h2 className={`v-tag ${s.tagHeading} ${s.cardTag}`}>What happens next</h2>
              <ol className={`v-rows ${s.nextRows}`}>
                {NEXT_STEPS.map((item, i) => (
                  <li key={item.title}>
                    <span className="v-num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <span className={`v-muted ${s.rowBody}`}>{item.body}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className={`v-stack ${s.direct}`} data-reveal>
              <h2 className={`v-tag ${s.tagHeading}`}>Prefer to reach us directly?</h2>
              <a className={`v-alink ${s.email}`} href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              <p className="v-small v-muted">
                Book a time directly: <Ph>[SCHEDULING LINK]</Ph> · Phone: <Ph>[PHONE]</Ph>
              </p>
            </div>
          </div>

          {/* ---------- 3-step request form ---------- */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
