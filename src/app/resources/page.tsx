import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";
import { CtaBand, SectionHead } from "@/components/ui/Section";
import { ROUTES } from "@/lib/site";
import { Glossary, type GlossaryTerm } from "./Glossary";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Resources — Healthcare growth glossary, guides & FAQ",
  description:
    "Plain-language definitions of healthcare marketing terms — AEO, BAA, PHI, E-E-A-T, local pack and more — plus answers to common questions.",
};

/* =====================================================================
   Copy — edit glossary terms, guides and FAQs here.
   ===================================================================== */

/** In-page jump links; ids are linked from other pages (/resources#glossary, /resources#faq). */
const SECTIONS = [
  { id: "glossary", label: "Glossary" },
  { id: "guides", label: "Guides" },
  { id: "faq", label: "FAQ" },
] as const;

const TERMS: GlossaryTerm[] = [
  {
    term: "AEO",
    full: "Answer Engine Optimization",
    def: "Making your practice information clear, consistent and credible enough to be used and cited in AI-generated answers.",
  },
  {
    term: "Attribution",
    full: "Source tracking",
    def: "Connecting an inquiry or appointment to the marketing channel that produced it.",
  },
  {
    term: "BAA",
    full: "Business Associate Agreement",
    def: "A contract HIPAA requires when a vendor creates, receives, maintains or transmits protected health information on a practice's behalf.",
  },
  {
    term: "Core Web Vitals",
    full: "Page experience metrics",
    def: "Google's measures of loading speed, responsiveness and visual stability — LCP, INP and CLS.",
  },
  {
    term: "E-E-A-T",
    full: "Experience, Expertise, Authoritativeness, Trust",
    def: "Concepts from Google's search quality guidelines, applied with particular weight to health content.",
  },
  {
    term: "Google Business Profile",
    full: "GBP",
    def: "Your free listing in Google Search and Maps, including hours, services, photos and reviews.",
  },
  {
    term: "Local pack",
    full: "Map results",
    def: "The group of map listings shown near the top of many local searches.",
  },
  {
    term: "NAP",
    full: "Name, address, phone",
    def: "Your core practice details. Consistency across the web supports local visibility and AI accuracy.",
  },
  {
    term: "PHI",
    full: "Protected health information",
    def: "Individually identifiable health information handled by a covered entity or its business associates under HIPAA.",
  },
  {
    term: "Review gating",
    full: "Selective review requests",
    def: "Asking only satisfied patients for public reviews. It breaks major platforms' policies and should be avoided.",
  },
  {
    term: "Schema markup",
    full: "Structured data",
    def: "Code that describes your practice, providers and services in a standard vocabulary machines can read.",
  },
  {
    term: "YMYL",
    full: "“Your Money or Your Life”",
    def: "Topics, including health, that can significantly affect people's wellbeing — and are held to higher quality standards in search.",
  },
];

const GUIDES: { status: string; tag: string; title: string; body: string }[] = [
  {
    status: "In preparation",
    tag: "Be found",
    title: "The practice owner's guide to AI search",
    body: "What changes when patients ask AI assistants, and what to fix first.",
  },
  {
    status: "In preparation",
    tag: "Be chosen",
    title: "Replying to reviews without risking privacy",
    body: "A practical approach to public responses for healthcare teams.",
  },
  {
    status: "In preparation",
    tag: "Be connected",
    title: "Connecting online booking to your practice software",
    body: "Questions to ask your vendor before you start.",
  },
  {
    status: "In preparation",
    tag: "Strategy",
    title: "What to measure in healthcare marketing",
    body: "Moving reports from clicks to appointments.",
  },
];

const FAQS: AccordionItem[] = [
  {
    q: "Where should a practice start if budget is limited?",
    a: (
      <>
        Usually with the foundations that affect every other channel: an accurate business profile, a steady flow of
        genuine reviews and a website that makes booking easy. The{" "}
        <Link className="v-link" href={ROUTES.contact}>
          growth assessment
        </Link>{" "}
        tells you which matters most for you.
      </>
    ),
  },
  {
    q: "Do we need SEO and paid ads?",
    a: (
      <>
        Not always. Paid campaigns produce demand quickly but stop when spend stops; SEO builds more slowly and
        compounds. Many practices use both, weighted differently by specialty and market. See{" "}
        <Link className="v-link" href={ROUTES.healthcareSeo}>
          Healthcare SEO
        </Link>
        .
      </>
    ),
  },
  {
    q: "What does “HIPAA-compliant marketing” actually mean?",
    a: "There's no certification by that name. HIPAA governs how protected health information is used and disclosed. In marketing, that mostly means keeping PHI out of tools that shouldn't have it, having the right agreements with vendors that do, and writing public content — including review replies — that never discloses patient information. Ask your compliance advisor about your specific obligations.",
  },
  {
    q: "How do we know if marketing is working?",
    a: (
      <>
        Track inquiries (calls, forms, bookings) by source, then connect them to appointments where your software
        allows. That&apos;s the core of our{" "}
        <Link className="v-link" href={ROUTES.services}>
          strategy and reporting
        </Link>{" "}
        layer.
      </>
    ),
  },
];

/* ===================================================================== */

export default function ResourcesPage() {
  return (
    <>
      {/* HERO */}
      <section className={`v-glow-tr ${styles.hero}`}>
        <div className="v-gridbg" />
        <div className="v-wrap">
          <p className="v-eyebrow v-rise">Resources</p>
          <h1 className={`v-display v-h1--page v-rise v-d1 ${styles.heroTitle}`}>
            Healthcare marketing, in <span className="v-grad">plain language</span>.
          </h1>
          <p className={`v-lead v-rise v-d2 ${styles.heroLead}`}>
            Definitions, guides and straight answers for practice owners and managers — no jargon required.
          </p>
          <nav aria-label="On this page" className={`v-rise v-d3 ${styles.jump}`}>
            {SECTIONS.map((s) => (
              <a key={s.id} className={`v-chip ${styles.jumpChip}`} href={`#${s.id}`}>
                {s.label}
                <Icon name="caret" size={14} strokeWidth={2} />
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* GLOSSARY */}
      <section id="glossary" className="v-sec v-alt" style={{ paddingTop: 88 }}>
        <div className="v-wrap" data-reveal>
          <Glossary
            terms={TERMS}
            heading={
              <>
                <p className="v-eyebrow">Glossary</p>
                <h2 className="v-display v-h2">Terms you&apos;ll hear from us.</h2>
              </>
            }
          />
        </div>
      </section>

      {/* GUIDES */}
      <section id="guides" className="v-sec v-glow-tl">
        <div className="v-wrap">
          <SectionHead
            eyebrow="Guides"
            title="Practical guides, in preparation."
            lead="Each guide is written for practice owners and reviewed before publication. The first editions are being prepared now."
          />
          <div className={styles.grid4} data-stagger>
            {GUIDES.map((g) => (
              <article key={g.title} className={`v-card v-lift ${styles.guide}`}>
                <span className={`v-flag ${styles.guideStatus}`}>{g.status}</span>
                <span className={`v-tag ${styles.guideTag}`}>{g.tag}</span>
                <h3 className="v-h4">{g.title}</h3>
                <p className={`v-p ${styles.guideBody}`}>{g.body}</p>
                <div className={styles.guideSkel} aria-hidden="true">
                  <span className="v-skel" />
                  <span className="v-skel" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="v-sec v-alt">
        <div className="v-wrap v-split">
          <div className={`v-stack v-sticky-col ${styles.faqHead}`} data-reveal>
            <p className="v-eyebrow">FAQ</p>
            <h2 className="v-display v-h2">Common questions, answered directly.</h2>
            <p className="v-p">More detail lives on each service page.</p>
          </div>
          <div data-reveal="1">
            <Accordion items={FAQS} defaultOpen={0} headingLevel={3} />
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Rather <span className="v-neon">talk it through</span>?
          </>
        }
        lead="Bring your questions to a strategy call. We'll answer them in the context of your practice and market."
        primary={{ label: "Book a strategy call", href: ROUTES.contact }}
        secondary={{ label: "Explore services", href: ROUTES.services }}
      />
    </>
  );
}
