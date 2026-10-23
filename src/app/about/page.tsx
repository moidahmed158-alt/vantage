import type { Metadata } from "next";
import { Flag, Ph } from "@/components/ui/Flag";
import { Mark } from "@/components/ui/Mark";
import { Radar } from "@/components/ui/Radar";
import { CtaBand, SectionHead } from "@/components/ui/Section";
import { ROUTES } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  // The source title already names the company, so skip the "— Vantage Digital Health" template.
  title: { absolute: "About Vantage Digital Health" },
  description:
    "Vantage is a healthcare-only growth partner for medical and dental practices. Our philosophy, principles and how we work.",
};

/* =====================================================================
   Copy — edit principles, audiences and team cards here.
   ===================================================================== */

const PRINCIPLES: { num: string; title: string; body: string; highlight?: boolean }[] = [
  {
    num: "01",
    title: "Healthcare-specific by design",
    body: "Patient decisions, clinical credibility, ad policies and privacy aren't edge cases for us. They're the starting point.",
  },
  {
    num: "02",
    title: "Measured in patient terms",
    body: "Impressions and rankings are means, not ends. We report on inquiries and appointments wherever they can be measured.",
  },
  {
    num: "03",
    title: "Systems over tactics",
    body: "A website, a review flow and search visibility work far better as one connected system than as three separate projects.",
  },
  {
    num: "04",
    title: "Honest by default",
    body: "No guaranteed rankings, no invented results, no shortcuts that put patients' privacy or your listings at risk.",
    highlight: true,
  },
];

const AUDIENCES: { title: string; body: string }[] = [
  {
    title: "Independent practices",
    body: "Owner-led medical and dental offices that want a senior partner, not a junior account manager.",
  },
  {
    title: "Specialty clinics",
    body: "Dermatology, orthodontics, plastic surgery and other specialties with distinct patient journeys.",
  },
  {
    title: "Multi-location groups",
    body: "Practices opening new offices that need consistent visibility and reporting across every location.",
  },
  {
    title: "Healthcare decision-makers",
    body: "Operators and marketing leads at groups, DSOs and MSOs who need a partner fluent in healthcare.",
  },
];

/** Values wrapped in [BRACKETS] render as amber placeholder chips; replace them with verified details. */
const TEAM: { name: string; role: string; bio: string }[] = [
  { name: "[NAME]", role: "[ROLE]", bio: "[VERIFIED BIO — experience, credentials]" },
  { name: "[NAME]", role: "[ROLE]", bio: "[VERIFIED BIO — experience, credentials]" },
  { name: "[NAME]", role: "[ROLE]", bio: "[VERIFIED BIO — experience, credentials]" },
];

/* ===================================================================== */

const copy = (text: string) => (/^\[.*\]$/.test(text) ? <Ph>{text}</Ph> : text);

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className={`v-glow-tl ${styles.hero}`}>
        <div className="v-gridbg" />
        <div className="v-wrap">
          <p className="v-eyebrow v-rise">About Vantage</p>
          <h1 className={`v-display v-rise v-d1 ${styles.heroTitle}`}>
            We work for one kind of client: <span className="v-grad">healthcare practices</span>.
          </h1>
          <div className={`v-rise v-d2 ${styles.heroCols}`}>
            <div className="v-beamline" style={{ top: -1 }} />
            <p className={`v-lead ${styles.heroLead}`}>
              Medical and dental practices don&apos;t need another agency that treats a dentist like a restaurant. They
              need a partner who understands how patients choose care, what the advertising rules allow and why privacy
              shapes every decision.
            </p>
            <p className="v-p">
              That&apos;s the whole idea behind Vantage. We bring website, search, AI visibility, reputation and software
              integration together into one growth system — and we measure it the way a practice owner
              does: in inquiries, appointments and the health of the practice.
            </p>
          </div>
        </div>
      </section>

      {/* THE NAME & THE MARK */}
      <section className="v-sec v-alt v-glow-c v-clip">
        <div className={`v-wrap ${styles.markGrid}`}>
          <div className={styles.radarBox} data-reveal>
            <Radar inner={false} axes={false}>
              <div className={styles.markLayer}>
                <Mark size="44%" draw label="The Vantage mark" />
              </div>
            </Radar>
          </div>
          <div className={`v-stack ${styles.markText}`} data-reveal="1">
            <p className="v-eyebrow">The name &amp; the mark</p>
            <h2 className="v-display v-h2">
              A vantage point is where the <span className="v-neon">view is clearest</span>.
            </h2>
            <p className="v-lead">
              It&apos;s the position that lets you see the whole landscape — and be seen from everywhere in it. Our mark
              tells that story: a ring for the patient&apos;s field of view, a V of verified trust, and a rising line
              that breaks out to the point where your practice is seen first.
            </p>
            <p className={`v-display ${styles.motto}`}>
              Seen. <span className="v-neon">Trusted.</span> Chosen.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="v-sec">
        <div className="v-wrap">
          <SectionHead eyebrow="What we believe" title="Four principles behind every engagement." />
          <div className={styles.principles} data-stagger>
            {PRINCIPLES.map((p) => (
              <div key={p.num} className={`v-card ${p.highlight ? "v-card--hi" : ""} v-lift ${styles.principle}`}>
                <span className={`v-num ${styles.principleNum}`}>{p.num}</span>
                <h3 className="v-h3">{p.title}</h3>
                <p className={`v-p ${styles.principleBody}`}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="v-sec v-alt">
        <div className="v-wrap v-split">
          <div className={`v-stack v-sticky-col ${styles.whoHead}`} data-reveal>
            <p className="v-eyebrow">Who we work with</p>
            <h2 className="v-display v-h2">Practices that intend to lead their market.</h2>
            <p className="v-p">
              From a single-location practice to a growing specialty group, our clients share one thing: they&apos;d
              rather be chosen than be cheapest.
            </p>
          </div>
          <ul className={styles.who} data-stagger>
            {AUDIENCES.map((a) => (
              <li key={a.title} className={styles.whoRow}>
                <strong className={`v-h4 ${styles.whoTitle}`}>{a.title}</strong>
                <span className={`v-p ${styles.whoBody}`}>{a.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TEAM */}
      <section className="v-sec">
        <div className="v-wrap">
          <SectionHead
            eyebrow="The team"
            title="The people behind the work."
            row
            aside={<Flag>Add verified names, roles, bios &amp; photos</Flag>}
          />
          <div className={styles.team} data-stagger>
            {TEAM.map((member, i) => (
              <figure key={i} className={`v-card v-lift ${styles.member}`}>
                <div className={styles.photo}>
                  <span className="v-tag">Team photo</span>
                </div>
                <figcaption className={styles.caption}>
                  <strong className={styles.name}>{copy(member.name)}</strong>
                  <span className="v-muted">{copy(member.role)}</span>
                  <p className={`v-p ${styles.bio}`}>{copy(member.bio)}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        alt
        title={
          <>
            If that sounds like the partner you&apos;ve been looking for, <span className="v-neon">let&apos;s talk</span>.
          </>
        }
        lead="A strategy call is the simplest way to find out whether we're the right fit — for both of us."
        primary={{ label: "Book a strategy call", href: ROUTES.contact }}
        secondary={{ label: "See pricing", href: ROUTES.pricing }}
      />
    </>
  );
}
