import type { Metadata } from "next";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Btn } from "@/components/ui/Button";
import { Mark } from "@/components/ui/Mark";
import { SectionHead } from "@/components/ui/Section";
import { Directory } from "./Directory";
import { RequestProvider } from "./RequestContext";
import { RequestForm } from "./RequestForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Healthcare Integrations",
  description:
    "Connect your EHR, practice management or scheduling software so review requests go out automatically after every visit. Search the directory or request an integration assessment.",
};

/* =====================================================================
   Page copy. The page has one job: show how connecting practice software
   powers reviews & reputation. Directory rows and form copy live in ./data.ts.
   ===================================================================== */

/** Hero diagram — left card. */
const PRACTICE_SYSTEMS = ["EHR / EMR", "Practice management", "Scheduling", "Patient messaging"];

/** Hero diagram — centre panel. */
const REVIEW_ENGINE = [
  "Completed visits trigger a review request",
  "Sent by text or email — no health details",
  "Every new review monitored across sites",
  "Replies drafted for your approval",
];

/** Hero diagram — right card. */
const REVIEW_SITES = ["Google", "Healthgrades", "Yelp", "Facebook", "70+ directories"];

const VALUE_PROPS = [
  {
    num: "01 · Timing",
    title: "Ask while the visit is fresh",
    body: "Review requests go out shortly after a completed appointment — when patients are most likely to respond — not weeks later.",
  },
  {
    num: "02 · Volume",
    title: "Every patient gets asked",
    body: "No front-desk reminders or spreadsheets. Every eligible visit sends a request automatically, so reviews arrive week after week.",
  },
  {
    num: "03 · Response",
    title: "Never miss a review",
    body: "New reviews from every site land in one place, with replies drafted for your approval — so nothing goes unanswered.",
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
    q: "Will every patient get a review request?",
    a: "Only patients who fit the rules you set — for example, completed visits only, no more than once in a set period, and excluding sensitive appointment types. You stay in control of who is asked and when.",
  },
  {
    q: "What if our vendor doesn't offer an API?",
    a: "There are often alternatives — a certified connector or a scheduled export of completed visits. If none is sensible, we'll tell you, and suggest the next-best way to keep review requests flowing.",
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
            Connect your practice software. <span className="v-grad">Turn every visit into a review.</span>
          </h1>
          <div className={`v-rise v-d2 ${styles.heroRow}`}>
            <p className="v-lead">
              When your EHR, practice management or scheduling system connects to Vantage, review requests go out
              automatically after every completed visit — and every new review is monitored and answered in one place.
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
            aria-label="Diagram: your practice systems feed the Vantage review engine, which sends review requests and monitors the sites where patients read reviews."
          >
            <div className={`v-card ${styles.flowCard}`}>
              <span className="v-tag">Systems you already run</span>
              {PRACTICE_SYSTEMS.map((c) => (
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
                <strong className={`v-h4 ${styles.layerTitle}`}>Vantage review engine</strong>
              </div>
              <ul className={styles.layerList}>
                {REVIEW_ENGINE.map((t) => (
                  <li key={t}>
                    <span className="v-dot" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <FlowArrow />
            <div className={`v-card ${styles.flowCard}`}>
              <span className="v-tag">Where patients read reviews</span>
              {REVIEW_SITES.map((c) => (
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
              Connecting the system that holds your appointments is what lets review requests go out automatically. We
              confirm your edition and setup before committing to scope.
            </p>
          </div>

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
              Tell us which system holds your appointments. We&apos;ll come back with how review requests can be
              triggered from it, what it requires and what we&apos;d recommend — before any commitment.
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
