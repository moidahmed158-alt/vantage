"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { RowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/lib/site";
import s from "../home.module.css";

type MomentId = "search" | "compare" | "book" | "after";

const MOMENTS: {
  id: MomentId;
  n: string;
  label: string;
  title: string;
  body: string;
  links: { label: string; note: string; href: string }[];
}[] = [
  {
    id: "search",
    n: "01",
    label: "Searching",
    title: "They search. You're the clear answer.",
    body: "Patients type symptoms, treatments and “near me” — and increasingly ask AI assistants. We make your practice the best-structured, most citable answer in each place.",
    links: [
      { label: "Healthcare SEO", note: "specialty and location visibility", href: ROUTES.healthcareSeo },
      { label: "Answer Engine Optimization", note: "presence in AI answers", href: ROUTES.aeo },
    ],
  },
  {
    id: "compare",
    n: "02",
    label: "Comparing",
    title: "They compare. You look like the obvious choice.",
    body: "Review recency, how a practice responds, real photos and clear provider information quietly decide who gets the call. We build those signals deliberately.",
    links: [
      { label: "Reputation Management", note: "reviews, monitoring, responses", href: ROUTES.reputationManagement },
      { label: "Website Development", note: "credibility at first glance", href: ROUTES.websiteDevelopment },
    ],
  },
  {
    id: "book",
    n: "03",
    label: "Booking",
    title: "They're ready. Booking takes seconds.",
    body: "Clear calls to action, mobile-first forms, click-to-call and — where your software allows it — real availability. Every inquiry is tracked to the channel that produced it.",
    links: [
      { label: "Website Development", note: "conversion-focused patient paths", href: ROUTES.websiteDevelopment },
      { label: "Healthcare Integrations", note: "scheduling and PM connections", href: ROUTES.integrations },
    ],
  },
  {
    id: "after",
    n: "04",
    label: "After the visit",
    title: "They've visited. Their experience works for you.",
    body: "A well-timed, privacy-safe review request turns satisfied patients into your strongest marketing — and reporting shows which channels brought them in.",
    links: [
      { label: "Reputation Management", note: "automated review requests", href: ROUTES.reputationManagement },
      { label: "Healthcare Integrations", note: "visit-based triggers", href: ROUTES.integrations },
    ],
  },
];

const SLOTS = ["Tue 9:30", "Tue 2:15", "Wed 8:00", "Wed 11:45", "Thu 4:00", "Sat 10:30"];

function Stars({ n, dim }: { n: number; dim?: boolean }) {
  return (
    <div className={dim ? s.starsDim : "v-stars"} aria-label={`Rating shown as ${n === 5 ? "five" : "three"} stars`}>
      {Array.from({ length: n }, (_, i) => (
        <Icon key={i} name="star" filled size={15} />
      ))}
    </div>
  );
}

function SearchMock() {
  return (
    <div className={`v-mock v-fadein ${s.mockCol}`}>
      <div className="v-searchbar">
        <Icon name="search" size={16} strokeWidth={2.2} />
        orthopedic surgeon near me open saturday
      </div>
      <div className={`v-card v-card--static ${s.mockCard}`}>
        <div className={`v-tag ${s.aiTag}`}>
          <span className="v-live" />
          AI answer
        </div>
        <p style={{ color: "var(--fg2)" }}>
          Several nearby practices offer Saturday orthopedic appointments. <strong style={{ color: "#fff" }}>Your Practice</strong> lists
          Saturday hours, is accepting new patients, and is often described in reviews as clear about treatment options.
        </p>
        <div className={s.chipRow}>
          <span className="v-chip v-chip--sm">yourpractice.com/orthopedics</span>
          <span className="v-chip v-chip--sm">Business profile</span>
          <span className="v-chip v-chip--sm">Patient reviews</span>
        </div>
      </div>
      <div className={`v-card v-card--static ${s.resultRow}`}>
        <div>
          <strong style={{ fontSize: 15.5 }}>Your Practice — Orthopedic Surgery</strong>
          <div className="v-muted" style={{ fontSize: 13.5 }}>
            Open Saturday · New patients welcome
          </div>
        </div>
        <span className={s.bookPill}>Book online</span>
      </div>
    </div>
  );
}

function CompareMock() {
  return (
    <div className={`v-mock v-fadein ${s.compare}`}>
      <div className={`v-card v-card--static ${s.compareYou}`}>
        <span className="v-tag" style={{ color: "var(--cyan2)" }}>
          Your practice
        </span>
        <strong style={{ fontSize: 17 }}>Your Practice</strong>
        <Stars n={5} />
        <ul className={s.compareList}>
          {["Reviews arriving every week", "Thoughtful replies from the practice", "Real team photos, current hours"].map((t) => (
            <li key={t}>
              <Icon name="check" size={16} strokeWidth={2.4} />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className={`v-card v-card--flat v-card--static ${s.compareThem}`}>
        <span className="v-tag">Nearby practice</span>
        <strong style={{ fontSize: 17, color: "var(--fg2)" }}>Another Practice</strong>
        <Stars n={3} dim />
        <ul className={s.compareListDim}>
          <li>Last review several months ago</li>
          <li>Complaints left unanswered</li>
          <li>Stock photos, outdated hours</li>
        </ul>
      </div>
    </div>
  );
}

function BookMock() {
  return (
    <div className={`v-mock v-fadein v-card v-card--static ${s.bookCard}`}>
      <strong className={s.bookTitle}>Book a new-patient visit</strong>
      <div className="v-stack" style={{ gap: 8 }}>
        <span className="v-tag">Visit type</span>
        <div className={s.chipRow}>
          <span className="v-chip" data-on="true">
            Exam &amp; cleaning
          </span>
          <span className="v-chip">Consultation</span>
          <span className="v-chip">Urgent visit</span>
        </div>
      </div>
      <div className="v-stack" style={{ gap: 8 }}>
        <span className="v-tag">Next available</span>
        <div className={s.slots}>
          {SLOTS.map((t) => (
            <span key={t} className={t === "Tue 2:15" ? s.slotOn : s.slot}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <span className={s.bookCta}>Request Tue 2:15</span>
      <p className="v-hint" style={{ fontSize: 12.5 }}>
        Live availability depends on your scheduling system and a confirmed integration.
      </p>
    </div>
  );
}

function AfterMock() {
  return (
    <div className={`v-mock v-fadein ${s.afterCol}`}>
      <div className={s.afterSteps}>
        <span className={s.afterStep}>Visit complete</span>
        <span className="v-neon" aria-hidden="true">
          →
        </span>
        <span className={s.afterStep}>Request sent</span>
        <span className="v-neon" aria-hidden="true">
          →
        </span>
        <span className={`${s.afterStep} ${s.afterStepOn}`}>Review posted</span>
      </div>
      <div className={s.bubbleIn}>Thanks for visiting Your Practice today. Would you share how we did? It takes about a minute: yourpractice.com/review</div>
      <div className={s.bubbleOut}>Done! Everyone was lovely.</div>
      <div className={`v-card v-card--static ${s.alertCard}`}>
        <span className="v-icon v-icon--sm">
          <Icon name="message" size={18} strokeWidth={2} />
        </span>
        <div>
          <strong style={{ fontSize: 14.5 }}>Front desk alert</strong>
          <div className="v-muted" style={{ fontSize: 13.5 }}>
            New review received — suggested reply drafted for approval.
          </div>
        </div>
      </div>
      <p className="v-hint" style={{ fontSize: 12.5 }}>
        Messages never include health details. Triggers depend on a confirmed practice-management integration.
      </p>
    </div>
  );
}

const MOCKS: Record<MomentId, () => ReactNode> = {
  search: SearchMock,
  compare: CompareMock,
  book: BookMock,
  after: AfterMock,
};

/** "From the patient's side" — tabbed walkthrough of the patient journey. */
export function Journey() {
  const [tab, setTab] = useState<MomentId>("search");
  const base = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = MOMENTS.find((m) => m.id === tab)!;
  const Mock = MOCKS[tab];
  const tabId = (id: MomentId) => `${base}-tab-${id}`;
  const panelId = `${base}-panel`;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = MOMENTS.findIndex((m) => m.id === tab);
    const next =
      e.key === "ArrowRight" ? (i + 1) % MOMENTS.length
      : e.key === "ArrowLeft" ? (i - 1 + MOMENTS.length) % MOMENTS.length
      : e.key === "Home" ? 0
      : e.key === "End" ? MOMENTS.length - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    setTab(MOMENTS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <div className="v-tabs" role="tablist" aria-label="Patient journey moments" onKeyDown={onKey} data-reveal>
        {MOMENTS.map((m, i) => (
          <button
            key={m.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            className="v-tab"
            role="tab"
            id={tabId(m.id)}
            aria-selected={m.id === tab}
            aria-controls={panelId}
            tabIndex={m.id === tab ? 0 : -1}
            onClick={() => setTab(m.id)}
          >
            <span className="v-num">{m.n}</span>
            {m.label}
          </button>
        ))}
      </div>

      <div id={panelId} role="tabpanel" aria-labelledby={tabId(tab)} className={s.journey} data-reveal="1">
        <div className={`v-panel v-glow-tl ${s.stage}`}>
          <span className="v-flag" style={{ alignSelf: "flex-start" }}>
            Illustrative — not client data
          </span>
          <Mock key={tab} />
          <div className={s.stageDots} aria-hidden="true">
            {MOMENTS.map((m) => (
              <i key={m.id} data-on={m.id === tab} />
            ))}
          </div>
        </div>

        <div className={s.journeyCopy}>
          <div className="v-stack v-fadein" key={tab} style={{ gap: 22 }}>
            <span className="v-num">
              Moment {active.n} / 0{MOMENTS.length}
            </span>
            <h3 className={`v-h3 ${s.journeyTitle}`}>{active.title}</h3>
            <p className="v-p">{active.body}</p>
            <ul className="v-row-list">
              {active.links.map((l) => (
                <li key={l.label}>
                  <RowLink href={l.href} className={s.journeyLink}>
                    {l.label} <span className="v-muted">— {l.note}</span>
                  </RowLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
