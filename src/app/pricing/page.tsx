import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PlanCards } from "@/components/site/PlanCards";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Flag, Ph } from "@/components/ui/Flag";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CtaBand, SectionHead } from "@/components/ui/Section";
import { ROUTES } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Vantage plans for medical and dental practices — Basic, Growth and Advanced — with clear inclusions and add-ons.",
};

/* =====================================================================
   Copy — edit table rows, add-ons and FAQs here.
   The plan cards are shared with the home page: edit them in src/lib/plans.ts.
   ===================================================================== */

const TRUST: { icon: IconName; title: string; body: ReactNode }[] = [
  {
    icon: "shield",
    title: "Your accounts stay yours",
    body: (
      <>
        Analytics and listing accounts held in your practice&apos;s name. <Ph>[CONFIRM]</Ph>
      </>
    ),
  },
  {
    icon: "calendar",
    title: "Straightforward terms",
    body: (
      <>
        Engagement term <Ph>[TERM]</Ph> · notice period <Ph>[NOTICE]</Ph>.
      </>
    ),
  },
  {
    icon: "arrow",
    title: "Fast, planned launch",
    body: (
      <>
        Typical kickoff to launch: <Ph>[TIMELINE]</Ph>, with a dated plan.
      </>
    ),
  },
];

/** Cell values that get the "included" / "not included" treatment in the comparison table. */
const YES = "Included";
const NO = "—";

const COMPARE_COLUMNS: { name: string; note: string; popular?: boolean }[] = [
  { name: "Basic", note: "Single location" },
  { name: "Growth", note: "Most popular", popular: true },
  { name: "Advanced", note: "Multi-location" },
];

type CompareRow = { feature: string; values: [string, string, string] };

const COMPARE: { group: string; rows: CompareRow[] }[] = [
  {
    group: "Website & foundation",
    rows: [
      { feature: "Custom website", values: [YES, "Conversion-focused", "Every location"] },
      { feature: "Google Business Profile optimization", values: ["1 location", "1 location", "Every location"] },
      { feature: "Privacy-aware analytics & call tracking", values: [YES, YES, YES] },
    ],
  },
  {
    group: "SEO & AI visibility",
    rows: [
      { feature: "SEO keyword research", values: [YES, YES, YES] },
      { feature: "Local SEO", values: ["Core services", "Expanded", "Per location"] },
      { feature: "Treatment & specialty content", values: ["Starter set", "Ongoing", "Ongoing, per location"] },
      { feature: "AI search visibility (AEO)", values: [YES, YES, YES] },
      { feature: "AI visibility monitoring", values: [NO, YES, YES] },
    ],
  },
  {
    group: "Reputation",
    rows: [
      { feature: "Automated review requests", values: [YES, YES, YES] },
      { feature: "Monitoring & alerts", values: [YES, YES, YES] },
      { feature: "Response drafting & approvals", values: [NO, YES, YES] },
    ],
  },
  {
    group: "Connected",
    rows: [
      { feature: "Software integrations", values: [NO, "1 included", "Multiple + custom"] },
      { feature: "Reporting", values: ["In patient terms", "With strategist reviews", "Consolidated"] },
      { feature: "Support", values: ["Shared team", "Named strategist", "Named team, priority"] },
    ],
  },
];

const ADD_ONS: { icon: IconName; title: string; body: string; detail: string }[] = [
  {
    icon: "pin",
    title: "Additional location",
    body: "Profile, location page and local SEO for another office.",
    detail: "Per location",
  },
  {
    icon: "plug",
    title: "Custom integration",
    body: "Connections beyond your plan's included integration.",
    detail: "Scoped after assessment",
  },
];

const FAQS: AccordionItem[] = [
  {
    q: "How do you decide which plan fits?",
    a: "Mainly the number of locations and services you want to grow, how competitive your market is, and which integrations you need. We confirm all of it in the growth assessment before you commit.",
  },
  {
    q: "Can we change plans later?",
    a: (
      <>
        Yes — most practices start with one plan and move up as they add services or locations.{" "}
        <Ph>[CONFIRM UPGRADE / DOWNGRADE POLICY]</Ph>
      </>
    ),
  },
  {
    q: "Does a higher plan guarantee better results?",
    a: "No plan can guarantee rankings, leads or revenue. A larger plan covers more channels and more work; we recommend the smallest scope that fits your goals.",
  },
];

/* ===================================================================== */

function CompareCell({ value }: { value: string }) {
  if (value === YES) {
    return (
      <>
        <Icon name="check" size={15} strokeWidth={2.4} className={styles.yesIco} />
        {value}
      </>
    );
  }
  if (value === NO) {
    return (
      <>
        <span aria-hidden="true">{value}</span>
        <span className="v-sr">Not included</span>
      </>
    );
  }
  return value;
}

export default function PricingPage() {
  const colSpan = COMPARE_COLUMNS.length + 1;

  return (
    <>
      {/* HERO */}
      <section className={`v-glow-c ${styles.hero}`}>
        <div className="v-gridbg" />
        <div className={`v-orb v-orb--blue ${styles.heroOrb}`} />
        <div className={`v-wrap v-wrap--narrow v-stack ${styles.heroStack}`}>
          <p className="v-eyebrow v-rise">Pricing</p>
          <h1 className="v-display v-h1--page v-rise v-d1">
            Clear plans, built around <span className="v-grad">how your practice grows</span>.
          </h1>
          <p className={`v-lead v-rise v-d2 ${styles.heroLead}`}>
            Every plan runs on the same Found · Chosen · Connected system. Choose the scope that fits today — and step up
            when you add services, providers or locations.
          </p>
          <Flag className="v-rise v-d3">Proposed packaging — confirm inclusions before publishing</Flag>
        </div>
      </section>

      {/* PLANS */}
      <section className="v-sec--tight" style={{ paddingTop: 48 }}>
        <div className="v-wrap">
          <PlanCards idPrefix="pricing-plan" headingLevel={2} />
          <p className={`v-small v-muted ${styles.planNote}`} data-reveal>
            Plans are sized to your locations, services, market and integrations — confirmed in the growth assessment
            before you commit.
          </p>
        </div>
      </section>

      {/* TRUST */}
      <section className={`v-sec--tight ${styles.trustSec}`} style={{ paddingTop: 24 }}>
        <div className={`v-wrap v-trust4 ${styles.trust}`} data-stagger>
          {TRUST.map((t) => (
            <div key={t.title}>
              <span className="v-icon">
                <Icon name={t.icon} size={20} />
              </span>
              <strong>{t.title}</strong>
              <p className="v-small v-muted">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARE */}
      <section className={`v-sec v-alt ${styles.compare}`}>
        <div className="v-wrap">
          <SectionHead eyebrow="Compare plans" title="Everything, side by side." />
          <p className={`v-scroll-hint ${styles.hint}`} aria-hidden="true">
            Scroll to compare
            <Icon name="arrow" size={16} strokeWidth={2} />
          </p>
          <div
            className={`v-table-wrap ${styles.tableWrap}`}
            role="region"
            aria-label="Plan comparison table"
            tabIndex={0}
            data-reveal="1"
          >
            <table className={`v-table ${styles.table}`}>
              <caption className="v-sr">Comparison of Basic, Growth and Advanced plans</caption>
              <thead>
                <tr>
                  <th scope="col" className={styles.corner}>
                    Feature
                  </th>
                  {COMPARE_COLUMNS.map((col) => (
                    <th key={col.name} scope="col" className={col.popular ? "c pop" : "c"}>
                      {col.name}
                      <small>{col.note}</small>
                    </th>
                  ))}
                </tr>
              </thead>
              {COMPARE.map((group) => (
                <tbody key={group.group}>
                  <tr className="grp">
                    <th scope="rowgroup" colSpan={colSpan}>
                      <span className={styles.grpLabel}>{group.group}</span>
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.feature}>
                      <th scope="row" className={styles.rowHead}>
                        {row.feature}
                      </th>
                      {row.values.map((value, ci) => {
                        const cls = [
                          "c",
                          COMPARE_COLUMNS[ci]?.popular && "pop",
                          value === YES && "v-yes",
                          value === NO && "v-no",
                        ]
                          .filter(Boolean)
                          .join(" ");
                        return (
                          <td key={COMPARE_COLUMNS[ci]?.name ?? ci} className={cls}>
                            <CompareCell value={value} />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          <p style={{ marginTop: 14 }}>
            <Flag>Inclusions are a proposal — confirm against your delivery capacity</Flag>
          </p>
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="v-sec">
        <div className="v-wrap">
          <SectionHead eyebrow="Add-ons" title="Extend any plan." />
          <div className={styles.addOns} data-stagger>
            {ADD_ONS.map((addOn) => (
              <div key={addOn.title} className={`v-card v-lift ${styles.addOn}`}>
                <span className="v-icon">
                  <Icon name={addOn.icon} size={20} />
                </span>
                <h3 className="v-h4">{addOn.title}</h3>
                <p className={`v-p ${styles.addOnBody}`}>{addOn.body}</p>
                <span className={`v-tag ${styles.addOnDetail}`}>{addOn.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="v-sec v-alt">
        <div className={`v-wrap v-wrap--narrow ${styles.faq}`}>
          <SectionHead eyebrow="Pricing questions" title="Before you ask." />
          <div data-reveal="1">
            <Accordion items={FAQS} defaultOpen={0} headingLevel={3} />
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Not sure which plan fits? <span className="v-neon">We&apos;ll recommend one.</span>
          </>
        }
        lead="A strategy call and growth assessment show which scope your practice actually needs."
        primary={{ label: "Get a tailored plan", href: ROUTES.contact }}
        secondary={{ label: "Explore services", href: ROUTES.services }}
      />
    </>
  );
}
