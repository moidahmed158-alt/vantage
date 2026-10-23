import type { Metadata } from "next";
import { Btn } from "@/components/ui/Button";
import { ROUTES } from "@/lib/site";
import {
  SpecialtyBrowser,
  type FocusLink,
  type Specialty,
  type SpecialtyBrowserCopy,
  type SpecialtyGroup,
} from "./SpecialtyBrowser";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Specialties",
  description:
    "How Vantage adapts healthcare growth strategy for dental and medical specialties — from family dentistry and orthodontics to dermatology, plastic surgery, med spas and primary care.",
};

/* =====================================================================
   Copy & content — edit here
   ===================================================================== */

const HERO = {
  eyebrow: "Specialties",
  lead: "The same growth system adapts to three things that vary by specialty:",
};

const FACTORS = [
  { label: "Intent", body: "Urgent and local, or researched for months? That decides the channel mix." },
  {
    label: "Trust threshold",
    body: "Higher-stakes decisions need stronger proof: credentials, consented results, reviews.",
  },
  { label: "Rules", body: "Advertising policies and claims standards differ for cosmetic, surgical and medical care." },
];

/** Service chips shown under "Where we focus first". */
const FOCUS = {
  seo: { label: "Healthcare SEO", href: ROUTES.healthcareSeo },
  aeo: { label: "AEO", href: ROUTES.aeo },
  web: { label: "Website", href: ROUTES.websiteDevelopment },
  rep: { label: "Reputation", href: ROUTES.reputationManagement },
  int: { label: "Integrations", href: ROUTES.integrations },
} satisfies Record<string, FocusLink>;

/** Group ids are also anchor ids (`/specialties#dental`, `#medical` — linked from the footer). */
const GROUPS: SpecialtyGroup[] = [
  { id: "dental", label: "Dental" },
  { id: "medical", label: "Medical" },
];

/** Each `slug` is the card's anchor id and must match SPECIALTIES in src/lib/site.ts (header menu deep links). */
const SPECIALTY_CARDS: Specialty[] = [
  {
    slug: "general-dentistry",
    group: "dental",
    name: "General & family dentistry",
    challenge:
      "Frequent, local and insurance-driven. Patients choose on proximity, accepted plans, availability and what recent reviews say about comfort.",
    focus: [FOCUS.seo, FOCUS.rep, FOCUS.web],
    trust: [
      "Accepted insurance clearly listed",
      "Recent reviews that mention comfort and staff",
      "Real team photos and easy online booking",
    ],
  },
  {
    slug: "orthodontics",
    group: "dental",
    name: "Orthodontics",
    challenge:
      "A long consideration, often a parent deciding for a teen — and adults weighing aligners against braces, cost and timeline.",
    focus: [FOCUS.web, FOCUS.aeo, FOCUS.rep],
    trust: [
      "Before-and-after results shared with documented consent",
      "Transparent treatment and financing information",
      "Clear explanation of the consultation process",
    ],
  },
  {
    slug: "implants-cosmetic",
    group: "dental",
    name: "Implants & cosmetic dentistry",
    challenge:
      "High-value, heavily researched decisions. Patients compare cost, credentials and results across several practices before calling.",
    focus: [FOCUS.seo, FOCUS.aeo, FOCUS.web],
    trust: ["Provider training and credentials", "Consented case photography", "Honest cost and financing information"],
  },
  {
    slug: "pediatric-dentistry",
    group: "dental",
    name: "Pediatric dentistry",
    challenge:
      "Parents search on mobile, often with urgency, looking for gentleness, availability and whether their insurance is accepted.",
    focus: [FOCUS.seo, FOCUS.rep, FOCUS.aeo],
    trust: [
      "Reviews from parents about anxious children",
      "A clear first-visit explainer",
      "Current hours, including any after-school or weekend times",
    ],
  },
  {
    slug: "dermatology",
    group: "medical",
    name: "Dermatology",
    challenge:
      "Two different journeys: medical patients (insurance, referrals, wait times) and cosmetic patients (self-pay, comparison shopping).",
    focus: [FOCUS.seo, FOCUS.rep, FOCUS.int],
    trust: [
      "Board certification shown clearly",
      "Medically reviewed condition content",
      "Separate, clear paths for medical and cosmetic care",
    ],
  },
  {
    slug: "plastic-surgery",
    group: "medical",
    name: "Plastic & aesthetic surgery",
    challenge:
      "Long research cycles and a high trust threshold, with heavy use of visual proof and social channels.",
    focus: [FOCUS.web, FOCUS.aeo, FOCUS.rep],
    trust: [
      "Board certification and surgical credentials",
      "Consented before-and-after galleries",
      "Realistic expectations about recovery and results",
    ],
  },
  {
    slug: "medical-spas",
    group: "medical",
    name: "Medical spas",
    challenge:
      "A competitive, promotion-heavy market where medical oversight and safety are the real differentiators.",
    focus: [FOCUS.seo, FOCUS.rep, FOCUS.web],
    trust: [
      "Medical director and provider credentials",
      "Treatment-specific safety information",
      "Ad claims that meet platform health policies",
    ],
  },
  {
    slug: "primary-care",
    group: "medical",
    name: "Primary care",
    challenge:
      "Patients choose on insurance, location, availability and — critically — whether a provider is accepting new patients.",
    focus: [FOCUS.seo, FOCUS.aeo, FOCUS.int],
    trust: [
      "“Accepting new patients” status kept current",
      "Provider bios with languages and focus areas",
      "Up-to-date insurance list across every profile",
    ],
  },
  {
    slug: "orthopedics",
    group: "medical",
    name: "Orthopedics",
    challenge: "Patients arrive through referrals and injury searches; joint-replacement research can take months.",
    focus: [FOCUS.seo, FOCUS.web, FOCUS.rep],
    trust: [
      "Fellowship training and sub-specialties",
      "Procedure pages with honest recovery timelines",
      "Reviews that speak to outcomes and communication",
    ],
  },
];

const BROWSER_COPY: SpecialtyBrowserCopy = {
  all: "All specialties",
  tablist: "Specialty group",
  notListed: { label: "Specialty not listed? Talk to us", href: ROUTES.contact },
  challenge: "How patients choose",
  focus: "Where we focus first",
  trust: "Trust signals that matter",
};

const CTA = {
  eyebrow: "Your specialty",
  lead: "Whether you run one specialty office or a multi-location group, the strategy call starts with your patients' decision — not a template.",
  primary: { label: "Discuss your practice", href: ROUTES.contact },
  secondary: { label: "Explore services", href: ROUTES.services },
};

/* =====================================================================
   Page
   ===================================================================== */

const FACTOR_DELAYS = ["v-d3", "v-d4", "v-d5"];

export default function SpecialtiesPage() {
  return (
    <>
      {/* Hero */}
      <section className={`v-glow-tr ${styles.hero}`}>
        <div className="v-gridbg" />
        <div className="v-wrap">
          <p className="v-eyebrow v-rise">{HERO.eyebrow}</p>
          <h1 className={`v-display v-h1--page v-rise v-d1 ${styles.title}`}>
            Every specialty wins patients <span className="v-grad">differently</span>.
          </h1>
          <div className={styles.factors}>
            <p className={`v-lead v-rise v-d2 ${styles.factorsLead}`}>{HERO.lead}</p>
            {FACTORS.map((factor, i) => (
              <div key={factor.label} className={`v-card v-rise ${FACTOR_DELAYS[i]} ${styles.factor}`}>
                <span className="v-num">{factor.label}</span>
                <p className={`v-p ${styles.factorText}`}>{factor.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty directory */}
      <section className={`v-sec v-alt ${styles.directory}`}>
        <div className="v-wrap">
          <SpecialtyBrowser items={SPECIALTY_CARDS} groups={GROUPS} copy={BROWSER_COPY} />
        </div>
      </section>

      {/* Closing CTA — like <CtaBand>, plus the source's eyebrow */}
      <section className="v-sec v-glow-b v-cta-band">
        <div className="v-gridbg" />
        <div className="v-beamline" style={{ top: 0 }} />
        <div className="v-wrap v-duo" data-reveal>
          <div className={`v-stack ${styles.ctaHead}`}>
            <p className="v-eyebrow">{CTA.eyebrow}</p>
            <h2 className="v-display v-h2">
              Tell us how your patients choose. We&apos;ll show you <span className="v-neon">how we&apos;d reach them</span>.
            </h2>
          </div>
          <div className={`v-stack ${styles.ctaBody}`}>
            <p className="v-lead">{CTA.lead}</p>
            <div className="v-btn-row">
              <Btn href={CTA.primary.href} arrow>
                {CTA.primary.label}
              </Btn>
              <Btn href={CTA.secondary.href} variant="ghost">
                {CTA.secondary.label}
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
