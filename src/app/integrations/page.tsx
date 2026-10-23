import type { Metadata } from "next";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Btn } from "@/components/ui/Button";
import { Mark } from "@/components/ui/Mark";
import { SectionHead } from "@/components/ui/Section";
import { Directory } from "./Directory";
import { RequestProvider } from "./RequestContext";
import { RequestForm } from "./RequestForm";
import { StatusLegend } from "./Status";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Healthcare Integrations",
  description:
    "Search the healthcare software practices use — EHR/EMR, practice management, scheduling, CRM, reviews, messaging and analytics — and request an integration assessment.",
};

/* =====================================================================
   Page copy — verbatim from the design. Directory rows, categories,
   statuses and form copy live in ./data.ts.
   ===================================================================== */

/** Hero diagram — left card. */
const PATIENT_CHANNELS = ["Website & booking", "Search & maps", "AI answers", "Reviews", "Paid campaigns"];

/** Hero diagram — centre panel. */
const GROWTH_LAYER = [
  "Privacy-conscious tracking of calls, forms and bookings",
  "Lead routing and follow-up workflows",
  "Review requests triggered by completed visits",
  "One report, in patient terms",
];

/** Hero diagram — right card. */
const PRACTICE_SYSTEMS = ["EHR / EMR", "Practice management", "Scheduling", "CRM", "Patient messaging"];

const VALUE_PROPS = [
  {
    num: "01 · Attribution",
    title: "Know what produced the appointment",
    body: "Connect marketing sources to booked and completed visits, so budget follows the channels that bring patients in.",
  },
  {
    num: "02 · Operations",
    title: "Stop re-keying web leads",
    body: "Route form and call inquiries to the right place automatically, with follow-up tasks your front desk can trust.",
  },
  {
    num: "03 · Experience",
    title: "Make every touchpoint timely",
    body: "Real availability on your site, prompt confirmations and review requests sent after the visit — not weeks later.",
  },
];

/** "Integration assessment" — how it works. */
const REQUEST_STEPS = [
  "We review the vendor's integration options for your edition.",
  "We confirm data scope and any privacy or BAA requirements.",
  "You get a plain-language recommendation and estimate.",
];

const FAQS: AccordionItem[] = [
  {
    q: "Does marketing ever see clinical information?",
    a: "It shouldn't need to. Our default is to use the minimum operational data required — for example, that a new-patient appointment was booked or completed — and keep clinical details out of marketing tools entirely. Exact scope is agreed with your team before anything is connected.",
  },
  {
    q: "Is patient data sent to Google or Meta?",
    a: "We design conversion tracking to avoid sending health information to ad platforms. Some tracking methods common in other industries are inappropriate for healthcare pages, so we review each one with your compliance lead.",
  },
  {
    q: "What if our vendor doesn't offer an API?",
    a: "There are often alternatives — a certified connector, a scheduled export, or a different measurement approach. If none is sensible, we'll tell you, and suggest the next-best way to measure results.",
  },
];

function FlowArrow() {
  return (
    <div className={styles.arrow} aria-hidden="true">
      <svg width="56" height="24" viewBox="0 0 56 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path className="v-flow" d="M2 12H48" />
        <path d="M42 6l6 6-6 6" />
      </svg>
    </div>
  );
}

export default function IntegrationsPage() {
  return (
    <RequestProvider>
      {/* ---------- hero ---------- */}
      <section className={`v-glow-tr ${styles.hero}`}>
        <div className="v-gridbg" />
        <div className={`v-orb v-orb--blue ${styles.orb}`} />
        <div className="v-wrap">
          <p className="v-eyebrow v-rise">Healthcare integrations</p>
          <h1 className={`v-display v-h1--page v-rise v-d1 ${styles.h1}`}>
            Your practice already runs on software. <span className="v-grad">Your marketing should too.</span>
          </h1>
          <div className={`v-rise v-d2 ${styles.heroRow}`}>
            <p className="v-lead">
              When your website, ads and reviews connect to the systems that hold appointments and patient communication,
              you can see which marketing produced real visits — and your team stops copying data between screens.
            </p>
            <div className="v-btn-row">
              <Btn href="#directory">Search the directory</Btn>
              <Btn href="#request" variant="ghost">
                Request an integration assessment
              </Btn>
            </div>
          </div>

          <div
            className={`v-rise v-d3 ${styles.flow}`}
            role="img"
            aria-label="Diagram: patient channels feed into the Vantage growth layer, which connects to your practice systems."
          >
            <div className={`v-card ${styles.flowCard}`}>
              <span className="v-tag">Where patients find you</span>
              {PATIENT_CHANNELS.map((c) => (
                <span key={c} className="v-chip">
                  {c}
                </span>
              ))}
            </div>
            <FlowArrow />
            <div className={styles.layer}>
              <div className="v-beamline" style={{ top: 0 }} />
              <div className={styles.layerHead}>
                <Mark size={38} tone="solid" draw />
                <strong className={`v-h4 ${styles.layerTitle}`}>Vantage growth layer</strong>
              </div>
              <ul className={styles.layerList}>
                {GROWTH_LAYER.map((t) => (
                  <li key={t}>
                    <span className="v-dot" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <FlowArrow />
            <div className={`v-card ${styles.flowCard}`}>
              <span className="v-tag">Systems you already run</span>
              {PRACTICE_SYSTEMS.map((c) => (
                <span key={c} className="v-chip">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- value props ---------- */}
      <section className="v-sec--tight v-alt">
        <div className={`v-wrap ${styles.props}`} data-stagger>
          {VALUE_PROPS.map((p) => (
            <div key={p.num} className={styles.prop}>
              <span className="v-num">{p.num}</span>
              <h2 className="v-h3">{p.title}</h2>
              <p className="v-p">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- directory ---------- */}
      <section id="directory" className="v-sec" style={{ paddingTop: "clamp(72px, 8vw, 96px)" }}>
        <div className="v-wrap">
          <div className="v-sec-head v-sec-head--row" style={{ marginBottom: 36 }} data-reveal>
            <div className="v-stack" style={{ gap: 16, maxWidth: 720 }}>
              <p className="v-eyebrow">Integrations directory</p>
              <h2 className="v-display v-h2">Find the software your practice uses.</h2>
            </div>
            <p className="v-p" style={{ maxWidth: "46ch" }}>
              Status shows how a connection is delivered. <strong style={{ color: "var(--fg)" }}>Assessment required</strong>{" "}
              means we evaluate your specific edition and setup before committing to scope.
            </p>
          </div>

          <StatusLegend />

          <div data-reveal="2">
            <Directory />
          </div>
        </div>
      </section>

      {/* ---------- request / assessment form (footer links to /integrations#request) ---------- */}
      <section id="request" className="v-sec v-alt v-glow-tl">
        <div className="v-wrap v-split">
          <div className="v-stack v-sticky-col" style={{ gap: 24 }} data-reveal>
            <p className="v-eyebrow">Integration assessment</p>
            <h2 className="v-display v-h2">
              Can&apos;t find your software? <span className="v-neon">Start here.</span>
            </h2>
            <p className="v-lead">
              Tell us which systems you use and what you want them to do together. We&apos;ll come back with what&apos;s
              feasible, what it requires and what we&apos;d recommend — before any commitment.
            </p>
            <ol className="v-rows">
              {REQUEST_STEPS.map((step, i) => (
                <li key={step}>
                  <span className="v-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <span>{step}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div data-reveal="1">
            <RequestForm />
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="v-sec">
        <div className="v-wrap v-wrap--narrow">
          <SectionHead eyebrow="Integration questions" title="The practical details." />
          <div data-reveal="1">
            <Accordion items={FAQS} defaultOpen={0} headingLevel={3} />
          </div>
        </div>
      </section>
    </RequestProvider>
  );
}
