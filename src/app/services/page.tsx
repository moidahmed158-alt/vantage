import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { Btn } from "@/components/ui/Button";
import { Arrow, Icon, type IconName } from "@/components/ui/Icon";
import { CtaBand, SectionHead } from "@/components/ui/Section";
import { ROUTES } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Healthcare SEO, Answer Engine Optimization, website development, reputation management, video & photography and integrations — planned and run as one growth system.",
};

/* =====================================================================
   Copy & content — edit here
   ===================================================================== */

const HERO = {
  eyebrow: "Services",
  lead: "Most practices hire separately for a website, SEO and reviews — then wonder why nothing adds up. Vantage plans and runs them together, against one goal: more of the right patients booking with you.",
  primary: { label: "Request a growth assessment", href: ROUTES.contact },
  secondary: { label: "See how the layers fit", href: "#layers" },
  diagramLabel:
    "Diagram: three stacked layers — Be found on top, Be chosen in the middle, Be connected as the foundation.",
  caption: "Each layer rests on the one beneath it",
};

/** Hero diagram, top (narrowest) to foundation (full width). */
const HERO_LAYERS = [
  { title: "Be found", num: "01", chips: ["Healthcare SEO", "AEO"] },
  { title: "Be chosen", num: "02", chips: ["Website development", "Reputation management", "Video & photography"] },
  { title: "Be connected", num: "03", chips: ["Healthcare integrations", "Strategy & reporting"] },
];

type ServiceCard = {
  icon: IconName;
  title: string;
  body: string;
  cta: string;
  /** Route for the whole card, or an in-page `#hash` (then only the CTA is a link). */
  href: string;
  /** Highlighted card (`v-card--hi`). */
  hi?: boolean;
  /** Anchor id on the card itself. */
  id?: string;
};

type Layer = { num: string; title: string; body: string; cards: ServiceCard[] };

const LAYERS: Layer[] = [
  {
    num: "Layer 01",
    title: "Be found",
    body: "Patients start with a question — a symptom, a treatment, “near me”. These services make your practice a strong, trustworthy answer wherever they ask it.",
    cards: [
      {
        icon: "search",
        title: "Healthcare SEO",
        body: "Technical health, specialty and location pages, local map visibility and Google Business Profile optimization.",
        cta: "Explore SEO",
        href: ROUTES.healthcareSeo,
      },
      {
        icon: "chatLines",
        title: "Answer Engine Optimization",
        body: "Clear, consistent, citable information so AI assistants and AI-generated search answers can recommend you accurately.",
        cta: "Explore AEO",
        href: ROUTES.aeo,
      },
    ],
  },
  {
    num: "Layer 02",
    title: "Be chosen",
    body: "Being found only matters if patients pick you. These services win the side-by-side comparison every patient makes before they call.",
    cards: [
      {
        icon: "browser",
        title: "Website Development",
        body: "Fast, accessible, mobile-first websites that explain your care clearly and make booking the obvious next step.",
        cta: "Explore websites",
        href: ROUTES.websiteDevelopment,
      },
      {
        icon: "star",
        title: "Reputation Management",
        body: "A steady flow of genuine reviews, monitoring across sites and thoughtful, privacy-safe responses.",
        cta: "Explore reputation",
        href: ROUTES.reputationManagement,
      },
      {
        icon: "video",
        title: "Video & Photography",
        body: "On-site shoots that show patients real providers and real rooms — edited for your website, ads, reels and profiles.",
        cta: "Explore video",
        href: ROUTES.videoPhotography,
      },
    ],
  },
  {
    num: "Layer 03",
    title: "Be connected",
    body: "The foundation. When marketing connects to your practice software and one strategy guides everything, results become measurable — and compound.",
    cards: [
      {
        icon: "plug",
        title: "Healthcare Integrations",
        body: "Connect EHR, practice management, scheduling, CRM and messaging tools to your marketing — scoped after an assessment.",
        cta: "Search the directory",
        href: ROUTES.integrations,
        hi: true,
      },
      {
        icon: "chart",
        title: "Growth strategy & reporting",
        body: "Included in every engagement: one roadmap across all services, sequenced by impact, and one report in patient terms.",
        cta: "How reporting works",
        href: "#reporting",
        id: "strategy",
      },
    ],
  },
];

const REPORT = {
  panelLabel: "Illustrative growth report showing inquiries by channel.",
  title: "Growth report · Your Practice",
  flag: "Illustrative layout",
  channelsTitle: "Inquiries by channel",
  eyebrow: "Strategy & reporting",
  lead: "Reports lead with what a practice owner cares about — inquiries, calls, booked appointments and, where your systems allow it, completed visits — then explain the activity behind them.",
};

/** Mock KPI tiles; `skel` is the placeholder bar width in %. */
const REPORT_KPIS = [
  { label: "Inquiries", skel: 60 },
  { label: "Booked", skel: 45 },
  { label: "Completed visits", skel: 38 },
];

/** Mock channel bars; `value` is the bar width in %. */
const REPORT_CHANNELS: { label: string; value: number; tone: "hot" | "warm" | "mid" | "low" }[] = [
  { label: "Organic search", value: 86, tone: "hot" },
  { label: "Maps & local", value: 64, tone: "warm" },
  { label: "Paid search", value: 52, tone: "mid" },
  { label: "AI referrals", value: 22, tone: "mid" },
  { label: "Review sites", value: 30, tone: "low" },
];

const REPORT_ROWS = [
  { title: "A prioritized roadmap", body: "across every service, revisited as results come in." },
  { title: "Channel-level attribution", body: "built on privacy-conscious tracking." },
  { title: "Regular reviews", body: "with a named strategist, cadence agreed at kickoff." },
];

const STARTING = {
  eyebrow: "Common starting points",
  title: "Where practices usually begin.",
  lead: "Every plan is built from an assessment, but most practices arrive with one of three situations.",
};

const STARTING_POINTS = [
  {
    tag: "Launch",
    title: "A new practice or location",
    body: "You need to be visible and credible from day one, with nothing to build on.",
    chips: ["Website", "Local SEO", "Business profile", "Review engine"],
    cta: "Discuss a launch",
  },
  {
    tag: "Recover",
    title: "Rankings or reviews slipping",
    body: "Competitors are outranking you, or a handful of poor reviews are costing you calls.",
    chips: ["Reputation", "SEO audit", "Website fixes"],
    cta: "Discuss a recovery",
  },
  {
    tag: "Scale",
    title: "More locations, services or providers",
    body: "You're growing and need demand, attribution and operations that keep up.",
    chips: ["AEO", "Integrations", "Reporting"],
    cta: "Discuss scaling",
    hi: true,
  },
];

const PRINCIPLES = [
  { title: "Sequenced by impact", body: "Fixes that affect appointments come first. Nice-to-haves wait." },
  { title: "Privacy-aware by default", body: "Tracking, forms and integrations are planned around patient privacy." },
  { title: "Policy-literate", body: "Content and claims respect healthcare advertising rules from the start." },
  { title: "Honest reporting", body: "No vanity metrics, no guarantees — just what changed and why." },
];

const CTA = {
  lead: "We'll review your visibility, reputation, website and software, then recommend the few moves most likely to matter for your practice.",
  primary: { label: "Request a growth assessment", href: ROUTES.contact },
  secondary: { label: "See pricing", href: ROUTES.pricing },
};

/* =====================================================================
   Page
   ===================================================================== */

const pad2 = (n: number) => String(n).padStart(2, "0");

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className={`v-glow-tr ${styles.hero}`}>
        <div className="v-gridbg" />
        <div className={`v-wrap v-split ${styles.heroSplit}`}>
          <div className={`v-stack ${styles.heroCopy}`}>
            <p className="v-eyebrow v-rise">{HERO.eyebrow}</p>
            <h1 className="v-display v-h1--page v-rise v-d1">
              Seven disciplines. <span className="v-grad">One growth system.</span>
            </h1>
            <p className="v-lead v-rise v-d2">{HERO.lead}</p>
            <div className="v-btn-row v-rise v-d3">
              <Btn href={HERO.primary.href} arrow>
                {HERO.primary.label}
              </Btn>
              <Btn href={HERO.secondary.href} variant="ghost">
                {HERO.secondary.label}
              </Btn>
            </div>
          </div>

          <div className={`v-rise v-d3 ${styles.diagram}`} role="img" aria-label={HERO.diagramLabel}>
            {HERO_LAYERS.map((layer, i) => {
              const cls = [
                styles.layer,
                i === 0 && `v-card v-floaty ${styles.layer1}`,
                i === 1 && `v-card v-card--hi v-floaty v-floaty--2 ${styles.layer2}`,
                i === 2 && `v-floaty v-floaty--3 ${styles.layer3}`,
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <div key={layer.title} className={cls}>
                  <div className={styles.layerHead}>
                    <strong className={`v-h4 ${styles.layerTitle}`}>{layer.title}</strong>
                    <span className="v-num">{layer.num}</span>
                  </div>
                  <div className={styles.chips}>
                    {layer.chips.map((chip) => (
                      <span key={chip} className="v-chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
            <p className={`v-tag ${styles.caption}`}>{HERO.caption}</p>
          </div>
        </div>
      </section>

      {/* The three layers */}
      <section id="layers" className="v-sec v-alt">
        <div className={`v-wrap ${styles.layers}`}>
          {LAYERS.map((layer, i) => (
            <Fragment key={layer.title}>
              {i > 0 && <div className="v-hr" />}
              <div className="v-split">
                <div className={`v-stack v-sticky-col ${styles.layerIntro}`} data-reveal>
                  <div className={styles.layerMeta}>
                    <LayerGlyph active={i} />
                    <span className="v-num">{layer.num}</span>
                  </div>
                  <h2 className="v-display v-h2">{layer.title}</h2>
                  <p className="v-p">{layer.body}</p>
                </div>
                <div className={styles.svcGrid} data-stagger>
                  {layer.cards.map((card) => (
                    <ServiceCardView key={card.title} card={card} />
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </section>

      {/* Strategy & reporting */}
      <section id="reporting" className="v-sec v-glow-tl">
        <div className="v-wrap v-split--rev">
          <div className={`v-panel ${styles.report}`} role="img" aria-label={REPORT.panelLabel} data-reveal>
            <div className={styles.reportHead}>
              <span className={`v-tag ${styles.reportTitle}`}>
                <span className="v-live" />
                {REPORT.title}
              </span>
              {/* Permanent disclaimer, not a review flag. */}
              <span className="v-flag">{REPORT.flag}</span>
            </div>
            <div className={styles.kpis}>
              {REPORT_KPIS.map((kpi) => (
                <div key={kpi.label} className={`v-card v-card--static ${styles.kpi}`}>
                  <span className={`v-tag ${styles.kpiLabel}`}>{kpi.label}</span>
                  <span className={`v-skel ${styles.kpiSkel}`} style={{ width: `${kpi.skel}%` }} />
                </div>
              ))}
            </div>
            <div className={`v-stack ${styles.channels}`}>
              <span className="v-tag">{REPORT.channelsTitle}</span>
              <div className={styles.bars}>
                {REPORT_CHANNELS.map((channel, i) => (
                  <Fragment key={channel.label}>
                    <span className={styles.barLabel}>{channel.label}</span>
                    <span className={styles.track}>
                      <span
                        className={`${styles.bar} ${styles[channel.tone]}`}
                        style={{ width: `${channel.value}%`, transitionDelay: `${0.2 + i * 0.09}s` }}
                      />
                    </span>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className={`v-stack ${styles.reportCopy}`} data-reveal="1">
            <p className="v-eyebrow">{REPORT.eyebrow}</p>
            <h2 className="v-display v-h2">
              One roadmap. One report. In <span className="v-neon">patient terms</span>.
            </h2>
            <p className="v-lead">{REPORT.lead}</p>
            <ol className="v-rows" data-stagger>
              {REPORT_ROWS.map((row, i) => (
                <li key={row.title}>
                  <span className="v-num">{pad2(i + 1)}</span>
                  <div>
                    <strong>{row.title}</strong>
                    <span className="v-muted">{row.body}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Common starting points */}
      <section className="v-sec v-alt">
        <div className="v-wrap">
          <SectionHead eyebrow={STARTING.eyebrow} title={STARTING.title} lead={STARTING.lead} />
          <div className="v-grid v-grid--3" data-stagger>
            {STARTING_POINTS.map((point) => (
              <article
                key={point.tag}
                className={`v-card v-lift ${point.hi ? "v-card--hi" : ""} ${styles.start}`}
              >
                <span className="v-num">{point.tag}</span>
                <h3 className="v-h3">{point.title}</h3>
                <p className={`v-p ${styles.startBody}`}>{point.body}</p>
                <div className={styles.chips}>
                  {point.chips.map((chip) => (
                    <span key={chip} className="v-chip">
                      {chip}
                    </span>
                  ))}
                </div>
                <Link className={`v-alink ${styles.cta}`} href={ROUTES.contact}>
                  {point.cta} <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Working principles */}
      <section className="v-sec--tight">
        <div className={`v-wrap ${styles.principles}`} data-stagger>
          {PRINCIPLES.map((p) => (
            <div key={p.title} className={`v-stack ${styles.principle}`}>
              <span className="v-dot" />
              <h3 className="v-h4">{p.title}</h3>
              <p className={`v-p ${styles.small}`}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        alt
        title={
          <>
            Not sure where to start? That&apos;s what the <span className="v-neon">assessment</span> is for.
          </>
        }
        lead={CTA.lead}
        primary={CTA.primary}
        secondary={CTA.secondary}
      />
    </>
  );
}

/** Mini version of the hero stack with the current layer lit (decorative). */
function LayerGlyph({ active }: { active: number }) {
  return (
    <span className={styles.glyph} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <i key={i} data-on={i === active || undefined} />
      ))}
    </span>
  );
}

function ServiceCardView({ card }: { card: ServiceCard }) {
  const cls = ["v-card", card.hi && "v-card--hi", styles.svcCard].filter(Boolean).join(" ");
  const body = (
    <>
      <span className={`v-icon ${styles.svcIcon}`}>
        <Icon name={card.icon} size={22} />
      </span>
      <h3 className="v-h4">{card.title}</h3>
      <p className={`v-p ${styles.small}`}>{card.body}</p>
    </>
  );

  // In-page target: a plain card whose CTA is the only link.
  if (card.href.startsWith("#")) {
    return (
      <div id={card.id} className={cls}>
        {body}
        <a className={`v-alink ${styles.cta}`} href={card.href}>
          {card.cta} <Arrow />
        </a>
      </div>
    );
  }

  return (
    <Link id={card.id} href={card.href} className={`${cls} v-lift ${styles.svcLink}`}>
      {body}
      <span className={`v-alink ${styles.cta}`}>
        {card.cta} <Arrow />
      </span>
    </Link>
  );
}
