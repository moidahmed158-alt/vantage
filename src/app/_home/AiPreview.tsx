"use client";

import Link from "next/link";
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { Arrow, Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/Section";
import { ROUTES } from "@/lib/site";
import s from "./AiPreview.module.css";

type EngineId = "chatgpt" | "gemini" | "perplexity" | "copilot" | "claude";

/** One mock exchange per assistant. Illustrative only — not real AI output or client data. */
const ENGINES: {
  id: EngineId;
  name: string;
  /** Dot colour for the engine. */
  color: string;
  prompt: string;
  answer: ReactNode;
  /** Location line under the answer. */
  cite: string;
  /** Page the answer cites. */
  source: string;
}[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    color: "#10a37f",
    prompt: "What's a good orthopedic doctor near me for a sports injury?",
    answer: (
      <>
        For a sports injury, <strong>Your Practice</strong> is a strong local choice. Their team focuses on sports
        medicine, offers same-week injury evaluations and lists the insurance plans they accept. Reviews often mention
        clear explanations and a practical return-to-play plan.
      </>
    ),
    cite: "Your Practice · Sports medicine · 2.4 mi · Accepting new patients",
    source: "yourpractice.com/sports-injuries",
  },
  {
    id: "gemini",
    name: "Gemini",
    color: "#6f8cff",
    prompt: "Which dentist near me takes Delta Dental and has Saturday hours?",
    answer: (
      <>
        <strong>Your Practice</strong> accepts Delta Dental PPO and lists Saturday appointments from 8am to 1pm on its
        website and Google Business Profile. Recent reviews describe the team as gentle, on time and good with nervous
        patients.
      </>
    ),
    cite: "Your Practice · Family dentistry · 1.1 mi · Open Saturday",
    source: "yourpractice.com/insurance",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    color: "#20b8cd",
    prompt: "Best dermatologist near me for acne scar treatment?",
    answer: (
      <>
        <strong>Your Practice</strong> is frequently cited for acne scar treatment. It has a board-certified
        dermatologist, a dedicated page explaining laser and microneedling options, and recent reviews describing a
        thorough first consultation.
      </>
    ),
    cite: "Your Practice · Dermatology · 3.0 mi · Consults this week",
    source: "yourpractice.com/acne-scars",
  },
  {
    id: "copilot",
    name: "Copilot",
    color: "#2aa7ff",
    prompt: "Pediatrician accepting new patients near me?",
    answer: (
      <>
        <strong>Your Practice</strong> is accepting new patients, offers same-day sick visits and has an online form for
        new families. It&apos;s open until 7pm on weekdays, and parents often mention how easy it is to get an
        appointment.
      </>
    ),
    cite: "Your Practice · Pediatrics · 1.8 mi · Accepting new patients",
    source: "yourpractice.com/new-patients",
  },
  {
    id: "claude",
    name: "Claude",
    color: "#d97757",
    prompt: "Who does Invisalign for adults near me, and what does it involve?",
    answer: (
      <>
        <strong>Your Practice</strong> offers Invisalign for adults. Their treatment page walks through the consultation,
        how aligners are fitted and the typical check-in visits, and lists payment options. Reviews mention flexible
        evening appointments.
      </>
    ),
    cite: "Your Practice · Orthodontics · 2.7 mi · Evening appointments",
    source: "yourpractice.com/invisalign",
  },
];

/**
 * "See how your practice shows up in AI answers": pick an assistant (hover, tap or arrow keys) to preview a
 * patient question and the kind of answer AEO works toward. The answer "types" in after a short pause.
 */
export function AiPreview() {
  const [tab, setTab] = useState<EngineId>(ENGINES[0].id);
  const base = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = ENGINES.findIndex((e) => e.id === tab);
  const active = ENGINES[index];
  const tabId = (id: EngineId) => `${base}-tab-${id}`;
  const panelId = `${base}-panel`;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (index + 1) % ENGINES.length
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (index - 1 + ENGINES.length) % ENGINES.length
      : e.key === "Home" ? 0
      : e.key === "End" ? ENGINES.length - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    setTab(ENGINES[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="v-sec v-alt v-glow-c">
      <div className="v-wrap">
        <SectionHead
          center
          eyebrow="AI answer-engine visibility"
          title={
            <>
              See how your practice shows up in <span className="v-neon">AI answers</span>.
            </>
          }
          lead="Patients aren't just searching Google anymore — they're asking ChatGPT, Gemini, Perplexity, Copilot and Claude. Hover or tap an engine to preview a patient question and the kind of answer we work to win."
        />

        <div className={s.stage} data-reveal="1">
          <div className={s.list} role="tablist" aria-label="AI assistants" onKeyDown={onKey}>
            {ENGINES.map((engine, i) => {
              const on = engine.id === tab;
              return (
                <button
                  key={engine.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={tabId(engine.id)}
                  className={s.tab}
                  style={{ "--engine": engine.color } as CSSProperties}
                  aria-selected={on}
                  aria-controls={panelId}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setTab(engine.id)}
                  onMouseEnter={() => setTab(engine.id)}
                >
                  <span className={s.dot} aria-hidden="true" />
                  <span className={s.tabText}>
                    <strong>{engine.name}</strong>
                    <small>{on ? "Viewing preview" : "Preview answer"}</small>
                  </span>
                  {on && <Arrow size={16} className={s.tabArrow} aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId(tab)}
            className={`v-panel ${s.window}`}
            style={{ "--engine": active.color } as CSSProperties}
          >
            <div className={s.bar}>
              <span className={s.dot} aria-hidden="true" />
              <strong className={s.barName}>{active.name}</strong>
              <span className={s.barSub}>answer preview</span>
              <span className={`v-flag ${s.flag}`}>Illustrative</span>
            </div>

            <div key={tab} className={s.chat}>
              <p className={s.ask}>{active.prompt}</p>

              <div className={s.reply}>
                <span className={s.avatar} aria-hidden="true">
                  <Icon name="chatLines" size={16} strokeWidth={2} />
                </span>
                <div className={s.replyBody}>
                  <span className={s.typing} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <div className={s.answer}>
                    <p className={s.answerText}>{active.answer}</p>
                    <span className={s.cite}>
                      <Icon name="pin" size={14} strokeWidth={2} />
                      {active.cite}
                    </span>
                    <div className={s.source}>
                      <span className={s.sourceIcon}>
                        <Icon name="check" size={14} strokeWidth={2.6} />
                      </span>
                      <span className={s.sourceText}>
                        <strong>{active.source}</strong>
                        <small>
                          Cited by {active.name} · Optimized by Vantage
                        </small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className={s.foot} data-reveal>
          Previews are illustrative, not real AI responses or client data.{" "}
          <Link className="v-link" href={ROUTES.aeo}>
            How AI search optimization works
          </Link>
          <Arrow size={16} className={s.footArrow} />
        </p>
      </div>
    </section>
  );
}
