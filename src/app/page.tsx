import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PlanCards } from "@/components/site/PlanCards";
import { Accordion } from "@/components/ui/Accordion";
import { Btn, RowLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Flag, Ph } from "@/components/ui/Flag";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Mark } from "@/components/ui/Mark";
import { Radar } from "@/components/ui/Radar";
import { SectionHead } from "@/components/ui/Section";
import { ROUTES, SITE, specialtyHref } from "@/lib/site";
import Link from "next/link";
import { Journey } from "./_home/Journey";
import s from "./home.module.css";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — Healthcare growth partner` },
  description: SITE.description,
};

/* ---------------------------------------------------------------- content */

const TRUST = ["Healthcare-only focus", "Reported in patient terms", "Privacy-aware by design"];

const BLIPS: { label: string; icon: IconName; x: number; y: number; filled?: boolean }[] = [
  { label: "Search", icon: "search", x: 16, y: 22 },
  { label: "Maps", icon: "pinPlain", x: 82, y: 18 },
  { label: "AI answers", icon: "chat", x: 84, y: 60 },
  { label: "Reviews", icon: "star", x: 70, y: 88, filled: true },
];

const CHANNELS = [
  "Search results", "Map listings", "AI assistants", "Patient reviews",
  "Your website", "EHR / EMR", "Scheduling", "CRM", "Patient messaging",
];

const STATS = [
  { value: "500+", label: "Healthcare practices served" },
  { value: "312%", label: "Average organic traffic increase" },
  { value: "48,000+", label: "Five-star reviews generated" },
  { value: "97%", label: "Client retention rate" },
];

const PROBLEMS = [
  { title: "Invisible where patients start", body: "Search results, map packs and AI-generated answers surface competitors first — often practices with less experience but better-structured information." },
  { title: "Trust is judged in seconds", body: "A slow, dated website or a thin, unanswered review profile ends the comparison before a patient reads a word about your care." },
  { title: "Spend without signal", body: "SEO, ads and social run as separate projects with separate reports, so nobody can say which efforts produced booked appointments." },
  { title: "Systems that don't talk", body: "Scheduling, practice management, CRM and review tools sit apart from your marketing — and your front desk fills the gaps by hand." },
];

const LAYERS: { n: string; title: string; icon: IconName; body: string; links: { label: string; href: string }[] }[] = [
  {
    n: "01", title: "Be found", icon: "search",
    body: "Show up wherever patients start — search results, map listings and AI-generated answers.",
    links: [
      { label: "Healthcare SEO", href: ROUTES.healthcareSeo },
      { label: "Answer Engine Optimization", href: ROUTES.aeo },
    ],
  },
  {
    n: "02", title: "Be chosen", icon: "star",
    body: "Win the comparison with a website and a reputation that earn a patient's trust in the first few seconds.",
    links: [
      { label: "Website Development", href: ROUTES.websiteDevelopment },
      { label: "Reputation Management", href: ROUTES.reputationManagement },
      { label: "Video & Photography", href: ROUTES.videoPhotography },
    ],
  },
  {
    n: "03", title: "Be connected", icon: "plug",
    body: "Tie marketing to the software that runs your practice, so every inquiry is tracked, routed and followed up.",
    links: [
      { label: "Healthcare Integrations", href: ROUTES.integrations },
      { label: "Growth strategy & reporting", href: `${ROUTES.services}#strategy` },
    ],
  },
];

const FLOW = ["Patient searches", "Qualified inquiry", "Booked appointment", "Measured growth"];

/** 3×3 hub; `null` is the centre "growth layer" tile. */
const HUB: ({ label: string; icon: IconName } | null)[] = [
  { label: "EHR / EMR", icon: "clipboard" },
  { label: "Practice management", icon: "layers" },
  { label: "Scheduling", icon: "calendar" },
  { label: "CRM", icon: "users" },
  null,
  { label: "Reviews", icon: "star" },
  { label: "Messaging", icon: "message" },
  { label: "Analytics", icon: "chart" },
  { label: "Ad platforms", icon: "target" },
];

const STEPS = [
  { title: "Strategy call", body: "A focused conversation about your practice, goals and local market. No generic pitch deck.", out: "an initial read on your biggest opportunities." },
  { title: "Growth assessment", body: "We review visibility across search, maps, AI answers and reviews — and map the software you use.", out: "prioritized findings, in plain language." },
  { title: "Roadmap & build", body: "Work is sequenced by impact. Fixes that affect appointments come first; everything else earns its place.", out: "a roadmap with owners and milestones." },
  { title: "Measure & refine", body: "Reporting in patient terms — inquiries, calls and booked appointments, wherever your systems make that measurable.", out: "regular reviews and clear next priorities." },
];

const RESULTS = [
  { tag: "Orthopedics · SEO", quote: "Moved from page three to the top three results in under six months; new-patient volume up 40% year over year.", name: "Dr. Michael Torres", role: "Orthopedic Surgeon, Dallas, TX" },
  { tag: "Practice operations · Reputation", quote: "Google rating rose from 3.8 to 4.9 stars in four months.", name: "Jennifer Walsh", role: "Practice Manager, Chicago, IL" },
];

// Plan cards themselves live in src/lib/plans.ts (shared with /pricing).
const PLAN_TRUST: { title: string; body: ReactNode }[] = [
  { title: "Your accounts stay yours", body: <>Analytics and listing accounts in your practice&apos;s name. <Ph>[CONFIRM]</Ph></> },
  { title: "Straightforward terms", body: <>Term <Ph>[TERM]</Ph> · notice <Ph>[NOTICE]</Ph>.</> },
  { title: "Planned launch", body: <>Kickoff to launch in <Ph>[TIMELINE]</Ph>.</> },
];

const HOME_SPECIALTIES: { group: string; items: { label: string; slug: string }[] }[] = [
  {
    group: "Dental",
    items: [
      { label: "General & family dentistry", slug: "general-dentistry" },
      { label: "Orthodontics", slug: "orthodontics" },
      { label: "Implants & cosmetic dentistry", slug: "implants-cosmetic" },
      { label: "Pediatric dentistry", slug: "pediatric-dentistry" },
    ],
  },
  {
    group: "Medical",
    items: [
      { label: "Dermatology", slug: "dermatology" },
      { label: "Plastic & aesthetic surgery", slug: "plastic-surgery" },
      { label: "Medical spas", slug: "medical-spas" },
      { label: "Primary care & orthopedics", slug: "primary-care" },
    ],
  },
];

const FAQS = [
  {
    q: "Do you only work with healthcare practices?",
    a: "Yes. Vantage works with medical and dental practices, specialty clinics and the groups that run them. That focus is why our strategy accounts for what general agencies tend to miss: healthcare ad policies, privacy constraints, provider credibility and how patients actually choose care.",
  },
  {
    q: "What is Answer Engine Optimization, in plain terms?",
    a: "More patients now ask AI assistants and see AI-generated summaries before they ever click a website. AEO makes your practice's information — services, providers, hours, insurance, locations — clear, consistent and credible enough to be used and cited in those answers, while also strengthening traditional search.",
  },
  {
    q: "Can you guarantee rankings or a number of new patients?",
    a: "No — and be cautious of anyone who does. Search engines, AI platforms and ad auctions are outside any agency's control. What we commit to is a clear plan, disciplined execution and honest reporting on the measures that matter to your practice.",
  },
  {
    q: "How do you handle patient privacy in tracking and forms?",
    a: "We plan analytics, ad tracking, forms and integrations to avoid sending health information to platforms that shouldn't receive it. Whether a specific setup meets HIPAA requirements depends on how it is implemented and on agreements such as Business Associate Agreements, so we review those decisions with your compliance lead rather than labelling anything “compliant” by default.",
  },
  {
    q: "Will this work with the software we already use?",
    a: (
      <>
        Often, yes — but it depends on the system, your plan with that vendor and what you want connected. We start with an integration assessment, then tell you
        plainly what is possible natively, through a connector, with custom work, or not at all.{" "}
        <Link className="v-link" href={ROUTES.integrations}>
          Search the directory
        </Link>
        .
      </>
    ),
  },
  {
    q: "How do we get started?",
    a: (
      <>
        Book a strategy call. Tell us about your practice, locations and goals; we&apos;ll review your current visibility beforehand so the conversation is specific
        to your market.{" "}
        <Link className="v-link" href={ROUTES.contact}>
          Book a strategy call
        </Link>
        .
      </>
    ),
  },
];

/* ---------------------------------------------------------------- page */

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="v-hero v-glow-tr">
        <div className="v-gridbg" />
        <div className={`v-orb v-orb--blue ${s.orbA}`} />
        <div className={`v-orb v-orb--cyan ${s.orbB}`} />
        <div className="v-wrap v-hero-grid">
          <div className="v-hero-stack">
            <p className="v-eyebrow v-rise">Healthcare growth partner · Medical &amp; dental</p>
            <h1 className="v-display v-hero-h1 v-rise v-d1">
              Own the <span className="v-grad">high ground</span> in your local market.
            </h1>
            <p className="v-lead v-hero-lead v-rise v-d2">
              Vantage connects your website, search and AI visibility, reviews and practice software into one growth system — so patients searching for your
              specialty see you first, trust you, and book.
            </p>
            <div className="v-btn-row v-rise v-d3">
              <Btn href={ROUTES.contact} arrow>
                Book a strategy call
              </Btn>
              <Btn href="#system" variant="ghost">
                See how the system works
              </Btn>
            </div>
            <ul className="v-hero-trust v-rise v-d4">
              {TRUST.map((t) => (
                <li key={t}>
                  <span className="v-dot" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <figure className={`v-rise v-d3 ${s.heroFig}`}>
            <figcaption className="v-sr">
              Illustration: your practice at the centre of a radar, with search results, maps, AI answers and reviews pointing to it.
            </figcaption>
            <Radar className="v-hero-radar">
              <svg viewBox="0 0 100 100" className={s.radarFlows} fill="none" aria-hidden="true">
                <g stroke="#5cc8ff" strokeOpacity=".75" strokeWidth="1.4" strokeLinecap="round">
                  {["M16 22 Q 34 34 50 50", "M82 18 Q 64 32 50 50", "M84 60 Q 66 52 50 50", "M70 88 Q 62 66 50 50"].map((d) => (
                    <path key={d} className="v-flow" vectorEffect="non-scaling-stroke" d={d} />
                  ))}
                </g>
              </svg>
              <div className={s.pulseAnchor}>
                <span className="v-pulse" />
                <span className="v-pulse v-pulse--2" />
              </div>
              <div className="v-radar-core">
                <Mark size={54} draw tone="light" />
              </div>
              <span className={s.radarLabel}>Your practice</span>
              {BLIPS.map((b, i) => (
                <div key={b.label} className={`v-blip ${s.blip}`} style={{ left: `${b.x}%`, top: `${b.y}%`, animationDelay: `${0.9 + i * 0.12}s` }}>
                  <i>
                    <Icon name={b.icon} size={12} strokeWidth={2.6} filled={b.filled} />
                  </i>
                  <b>{b.label}</b>
                </div>
              ))}
            </Radar>

            <div className={`v-glass v-floaty v-hide-sm ${s.glassAi}`}>
              <div className={s.glassHead}>
                <span className="v-tag" style={{ fontSize: 10 }}>
                  AI answer
                </span>
                <span className="v-flag" style={{ fontSize: 9, padding: "2px 6px" }}>
                  Illustrative
                </span>
              </div>
              <p className={s.glassQuote}>
                “…<strong>Your Practice</strong> offers Saturday hours and new-patient visits.”
              </p>
            </div>
            <div className={`v-glass v-floaty v-floaty--2 v-hide-sm ${s.glassReq}`}>
              <span className="v-icon v-icon--sm">
                <Icon name="calendar" size={18} strokeWidth={2} />
              </span>
              <div>
                <strong style={{ fontSize: 13.5, display: "block" }}>New-patient request</strong>
                <span style={{ fontSize: 12.5, color: "var(--fg3)" }}>Tue 2:15 · via search</span>
              </div>
            </div>
          </figure>
        </div>
        <a href="#channels" className={s.scrollCue} aria-label="Scroll to content">
          <span />
        </a>
      </section>

      {/* ============ MARQUEE ============ */}
      <section id="channels" aria-label="Channels Vantage works across" className={s.marqueeBand}>
        <div className="v-marquee">
          <div className="v-marquee-track">
            {CHANNELS.map((c) => (
              <span key={c}>{c}</span>
            ))}
            {CHANNELS.map((c) => (
              <span key={`dup-${c}`} aria-hidden="true">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROOF ============ */}
      <section className="v-sec--tight">
        <div className="v-wrap">
          <div className={s.proofHead} data-reveal>
            <p className="v-eyebrow">By the numbers</p>
            <Flag>Figures carried over from current site — verify before publishing</Flag>
          </div>
          <div className={s.stats} data-stagger>
            {STATS.map((st) => (
              <div key={st.label} className={`v-card v-lift ${s.stat}`}>
                <Counter value={st.value} className={`v-display v-grad ${s.statNum}`} />
                <p className="v-muted" style={{ fontSize: 15 }}>
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROBLEM ============ */}
      <section className="v-sec">
        <div className="v-wrap v-split">
          <div className="v-stack v-sticky-col" style={{ gap: 24 }} data-reveal>
            <p className="v-eyebrow">The problem</p>
            <h2 className="v-display v-h2">
              Patients decide long before they <span className="v-neon">call</span>.
            </h2>
            <p className="v-lead">
              A prospective patient compares three or four practices in minutes — across search results, map listings, AI answers and reviews. Most practices actively
              manage one or two of those moments, and lose the rest by default.
            </p>
          </div>
          <ol className={`v-rows ${s.problems}`} data-stagger>
            {PROBLEMS.map((p, i) => (
              <li key={p.title}>
                <span className="v-num" style={{ paddingTop: 4 }}>
                  0{i + 1}
                </span>
                <div>
                  <h3 className="v-h3">{p.title}</h3>
                  <p className="v-p">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ SYSTEM ============ */}
      <section id="system" className="v-sec v-alt v-glow-c v-clip">
        <div className="v-gridbg" />
        <div className="v-wrap">
          <SectionHead
            row
            eyebrow="The Vantage growth system"
            title={
              <>
                Found. <span className="v-neon">Chosen.</span> Connected.
              </>
            }
            lead="Seven disciplines, one job: turning the moment a patient starts looking into an appointment on your schedule. Each layer makes the next work harder."
          />
          <div className={s.layersWrap}>
            <div className="v-beamline v-hide-sm" style={{ top: -24 }} />
            <div className={s.layers} data-stagger>
              {LAYERS.map((l) => (
                <div key={l.n} className={`v-card v-card--hi v-lift ${s.layer}`}>
                  <div className={s.layerTop}>
                    <span className="v-num">{l.n}</span>
                    <span className="v-icon">
                      <Icon name={l.icon} size={20} />
                    </span>
                  </div>
                  <h3 className={`v-display ${s.layerTitle}`}>{l.title}</h3>
                  <p className="v-p" style={{ fontSize: 16 }}>
                    {l.body}
                  </p>
                  <ul className={`v-row-list ${s.layerLinks}`}>
                    {l.links.map((link, i) => (
                      <li key={link.label}>
                        <RowLink href={link.href} className={i === l.links.length - 1 ? "v-row-link--flush" : undefined}>
                          {link.label}
                        </RowLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className={s.flowBar} data-reveal>
            <ol className={s.flowSteps}>
              {FLOW.map((f, i) => (
                <li key={f}>
                  {i > 0 && (
                    <span className="v-neon" aria-hidden="true">
                      →
                    </span>
                  )}
                  {f}
                </li>
              ))}
            </ol>
            <p className="v-small" style={{ color: "var(--fg3)", maxWidth: "44ch" }}>
              Strategy and measurement run through every layer: one roadmap, one report, one accountable team.
            </p>
          </div>
        </div>
      </section>

      {/* ============ PATIENT-SIDE DEMO ============ */}
      <section className="v-sec">
        <div className="v-wrap">
          <SectionHead
            eyebrow="From the patient's side"
            title={
              <>
                Every moment a patient meets your practice — <span className="v-grad">handled</span>.
              </>
            }
            lead="Choose a moment in the patient journey to see what they experience, and what Vantage runs behind it."
          />
          <Journey />
        </div>
      </section>

      {/* ============ INTEGRATIONS ============ */}
      <section className="v-sec v-alt v-glow-tr v-clip">
        <div className="v-wrap v-split v-split--center">
          <div className="v-stack" style={{ gap: 24 }} data-reveal>
            <p className="v-eyebrow">Healthcare integrations</p>
            <h2 className="v-display v-h2">
              Your marketing should talk to the software you <span className="v-neon">already run</span>.
            </h2>
            <p className="v-lead">
              EHRs, practice management, scheduling, CRM, reviews and patient messaging each hold part of the patient journey. Connected properly, they show which
              marketing produced real appointments — and stop your team re-keying data.
            </p>
            <p className="v-p" style={{ fontSize: 15.5 }}>
              Every connection is scoped after an integration assessment. A system is listed as supported only once it has been confirmed.
            </p>
            <div className="v-btn-row" style={{ marginTop: 8 }}>
              <Btn href={ROUTES.integrations} arrow>
                Explore the integrations directory
              </Btn>
              <Btn href={`${ROUTES.integrations}#request`} variant="ghost">
                Request an assessment
              </Btn>
            </div>
          </div>
          <div className={s.hub} data-stagger>
            <svg viewBox="0 0 300 300" preserveAspectRatio="none" className={s.hubLines} fill="none" aria-hidden="true">
              <g stroke="#2f8cff" strokeOpacity=".5" strokeWidth="1">
                <path
                  className="v-flow"
                  vectorEffect="non-scaling-stroke"
                  d="M50 50L150 150M150 50L150 150M250 50L150 150M50 150L150 150M250 150L150 150M50 250L150 150M150 250L150 150M250 250L150 150"
                />
              </g>
            </svg>
            {HUB.map((h) =>
              h ? (
                <div key={h.label} className={`v-card ${s.hubCell}`}>
                  <span className="v-icon">
                    <Icon name={h.icon} size={20} />
                  </span>
                  <strong>{h.label}</strong>
                </div>
              ) : (
                <div key="core" className={s.hubCore}>
                  <Mark size={40} tone="solid" />
                  <strong>Your growth layer</strong>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="v-sec">
        <div className="v-wrap">
          <SectionHead eyebrow="How engagement works" title="A clear path from first call to compounding growth." />
          <ol className="v-steps4" data-stagger>
            {STEPS.map((st, i) => (
              <li key={st.title}>
                <span className="v-num">Step 0{i + 1}</span>
                <h3 className="v-h3">{st.title}</h3>
                <p className="v-p" style={{ fontSize: 16 }}>
                  {st.body}
                </p>
                <p className={`v-small ${s.stepOut}`}>
                  <strong>You leave with:</strong> <span className="v-muted">{st.out}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ RESULTS ============ */}
      <section className="v-sec v-alt">
        <div className="v-wrap">
          <SectionHead
            row
            eyebrow="Client results"
            title={
              <>
                Practices that chose to <span className="v-neon">lead</span>.
              </>
            }
            aside={
              <Btn href={ROUTES.contact} variant="ghost" arrow>
                Discuss a similar challenge
              </Btn>
            }
          />
          <div className="v-grid v-grid--3" data-stagger>
            {RESULTS.map((r) => (
              <figure key={r.name} className={`v-card v-lift ${s.result}`}>
                <span className="v-tag" style={{ color: "var(--cyan2)" }}>
                  {r.tag}
                </span>
                <blockquote className={`v-display ${s.quote}`}>{r.quote}</blockquote>
                <figcaption className={s.quoteBy}>
                  <span>
                    <strong>{r.name}</strong>
                    <span className="v-muted"> · {r.role}</span>
                  </span>
                  <Flag style={{ alignSelf: "flex-start" }}>From current site — verify result &amp; consent</Flag>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="v-sec v-glow-c v-clip">
        <div className="v-gridbg" />
        <div className="v-wrap">
          <SectionHead
            center
            eyebrow="Pricing"
            title={
              <>
                Plans that grow <span className="v-grad">with your practice</span>.
              </>
            }
            lead="Every plan runs on the same growth system. Start with the scope that fits today and step up as you add services, providers or locations."
            aside={<Flag>Proposed packaging — confirm inclusions before publishing</Flag>}
          />
          <PlanCards idPrefix="home-plan" />
          <div className="v-trust4" style={{ marginTop: 40 }} data-stagger>
            {PLAN_TRUST.map((t) => (
              <div key={t.title}>
                <strong>{t.title}</strong>
                <p className="v-small v-muted">{t.body}</p>
              </div>
            ))}
          </div>
          <div className="v-btn-row" style={{ justifyContent: "center", marginTop: 36 }}>
            <Btn href={ROUTES.pricing} variant="ghost" arrow>
              Compare all plans
            </Btn>
          </div>
        </div>
      </section>

      {/* ============ SPECIALTIES ============ */}
      <section className="v-sec v-glow-tl">
        <div className="v-wrap">
          <SectionHead
            row
            eyebrow="Specialties"
            title="Different specialties win patients differently."
            lead="An implant consult, a teen's braces and a skin-cancer screening are researched, compared and booked in different ways. Strategy starts there."
          />
          <div className="v-split--even">
            {HOME_SPECIALTIES.map(({ group, items }) => (
              <div key={group} data-reveal>
                <p className="v-tag" style={{ marginBottom: 8 }}>
                  {group}
                </p>
                <ul className="v-row-list" data-stagger>
                  {items.map((sp) => (
                    <li key={sp.slug}>
                      <RowLink href={specialtyHref(sp.slug)} large>
                        {sp.label}
                      </RowLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="v-sec v-alt">
        <div className="v-wrap v-split">
          <div className="v-stack v-sticky-col" style={{ gap: 24 }} data-reveal>
            <p className="v-eyebrow">FAQ</p>
            <h2 className="v-display v-h2">Questions practice owners ask us.</h2>
            <p className="v-p">
              Something else on your mind?{" "}
              <Link className="v-link" href={ROUTES.contact}>
                Ask us directly
              </Link>{" "}
              — or browse the{" "}
              <Link className="v-link" href={ROUTES.resources}>
                glossary and guides
              </Link>
              .
            </p>
          </div>
          <div data-reveal="1">
            <Accordion items={FAQS} defaultOpen={0} />
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className={`v-sec v-glow-b v-clip ${s.finalCta}`}>
        <div className="v-gridbg v-gridbg--b" />
        <div className={`v-orb v-orb--blue ${s.orbC}`} />
        <div className={`v-wrap v-wrap--narrow v-stack ${s.finalInner}`} data-stagger>
          <div>
            <Mark size={72} />
          </div>
          <h2 className={`v-display v-h1 ${s.finalTitle}`}>
            See your market from <span className="v-grad">higher ground</span>.
          </h2>
          <p className="v-lead" style={{ marginInline: "auto" }}>
            Start with a strategy call. We&apos;ll look at where you appear today, where competitors outrank you, and which fixes are most likely to move appointments
            first.
          </p>
          <div className="v-btn-row" style={{ justifyContent: "center" }}>
            <Btn href={ROUTES.contact} arrow>
              Book a strategy call
            </Btn>
            <Btn href={ROUTES.services} variant="ghost">
              Explore services
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}
