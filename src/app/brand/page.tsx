import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Ph } from "@/components/ui/Flag";
import { Arrow, Icon, type IconName } from "@/components/ui/Icon";
import { Mark } from "@/components/ui/Mark";
import {
  AppIconMark,
  CompactMark,
  Favicon16,
  Favicon32,
  LightMark,
  MarkDiagram,
  MisuseClosed,
  MisuseOverglow,
  MisuseRecoloured,
  MisuseRetyped,
  MisuseRotated,
  MotionFrame,
  OneColourMark,
  SocialMark,
} from "./marks";
import css from "./page.module.css";

// Internal brand reference: not linked from the nav, excluded from the sitemap and from search.
export const metadata: Metadata = {
  title: "Signal brand identity",
  description:
    "A deep night-navy world lit by electric blue and cyan signal light. It reads like precision instruments and modern healthcare technology — calm, exact and quietly luminous.",
  robots: { index: false, follow: false },
};

/* =====================================================================
   Copy & data — verbatim from the brand board (Brand.dc.html)
   ===================================================================== */

const COVER = {
  title: "Vantage Digital Health — “Signal” identity system",
  version: "v2.0 · 2026",
  word: "VANTAGE",
  descriptor: "Digital Health",
  tagline: (
    <>
      Seen. <span className="v-neon">Trusted.</span> Chosen.
    </>
  ),
  body: [
    "A deep night-navy world lit by electric blue and cyan signal light. It reads like precision instruments and modern healthcare technology — calm, exact and quietly luminous.",
    "Light is used with intent: it marks the practice, the next action and the data that matters. Everything else stays dark, so the signal always stands out.",
  ],
};

type MarkPart = { num: string; title: string; text: string };
const MARK_PARTS: MarkPart[] = [
  { num: "01 · The ring", title: "The patient's field of view", text: "Every search, map, review and AI answer a patient sees. The market you have to win." },
  { num: "02 · The V", title: "Verified trust", text: "The V doubles as a check mark — credibility earned, then confirmed by patients." },
  {
    num: "03 · The breakout",
    title: "Growth past the ceiling",
    text: "The rising stroke escapes through a deliberate gap in the ring — the practice outgrowing its local market.",
  },
  { num: "04 · The point", title: "The vantage point", text: "Your practice, lit at the highest position: the first thing a patient sees." },
];
const MARK_SPEC = "64-unit grid · ring r21 · stroke 2.4 / 5 · point r4.2 · gap 24°";
const MARK_FLAG = "The break in the ring";

const LOGO_CAPTIONS = {
  primary: "Primary · horizontal · on night",
  stacked: "Stacked",
  light: "On light · no glow",
  compact: "Compact",
  oneColour: "One-colour",
};

const MOTION_STEPS = [
  { at: "0.10s", what: "ring draws · 1.6s ease-out-expo" },
  { at: "0.55s", what: "V traces · 1.2s" },
  { at: "1.45s", what: "point pops · 0.5s" },
  { at: "2.20s", what: "point breathes · 2.8s loop" },
];
const FRAMES: { step: 1 | 2 | 3 | "live"; caption: string }[] = [
  { step: 1, caption: "Frame 1 · ring" },
  { step: 2, caption: "Frame 2 · trace" },
  { step: 3, caption: "Frame 3 · ignite" },
  { step: "live", caption: "Live · loops on load" },
];

type BigSwatch = { tone: "night" | "blue" | "bright" | "cyan"; tag: string; name: string; lines: string[]; tokens: string[] };
const BIG_SWATCHES: BigSwatch[] = [
  {
    tone: "night",
    tag: "Ground",
    name: "Night",
    lines: ["#03050B · surfaces #070D1A · #0A1325", "Text #EEF2F8 on Night — 18.4 : 1"],
    tokens: ["--ink0", "--ink2", "--ink3", "--fg"],
  },
  { tone: "blue", tag: "Action", name: "Signal Blue", lines: ["#1565E6 · White 5.2 : 1"], tokens: ["--blue"] },
  { tone: "bright", tag: "Glow", name: "Bright Blue", lines: ["#2F8CFF · light & borders"], tokens: ["--blue2"] },
  { tone: "cyan", tag: "Light", name: "Cyan", lines: ["#8FE0FF · #5CC8FF", "on Night 13.6 : 1"], tokens: ["--cyan2", "--cyan"] },
];
const SWATCH_TONE: Record<BigSwatch["tone"], string> = { night: css.swNight, blue: css.swBlue, bright: css.swBright, cyan: css.swCyan };

/** Supporting palette: label and hex from the board, token = the CSS custom property in globals.css. */
const SMALL_SWATCHES: { name: string; hex: string; token: string; edge?: boolean }[] = [
  { name: "Ink 2", hex: "#070D1A", token: "--ink2", edge: true },
  { name: "Ink 3", hex: "#0A1325", token: "--ink3", edge: true },
  { name: "Line", hex: "#1B2A47", token: "--line2" },
  { name: "Line hi", hex: "#2F5BA8", token: "--line4" },
  { name: "Soft", hex: "#7DB8FF", token: "--blue3" },
  { name: "Muted text", hex: "#9AA8BF", token: "--fg3" },
  { name: "Spark", hex: "#F5A524", token: "--amber" },
  { name: "Error", hex: "#FF8A8A", token: "--danger" },
];
const PROPORTION = [
  { share: 62, token: "--ink0", edge: true },
  { share: 20, token: "--ink3" },
  { share: 9, token: "--blue" },
  { share: 6, token: "--cyan2" },
  { share: 3, token: "--amber" },
];

const TYPE_FACES = [
  {
    tag: "Display · Sora",
    face: css.aaDisplay,
    text: "Headlines, numbers and the wordmark. Geometric, open and confident. 600 weight, −3.5% tracking for headlines; +32% for the wordmark.",
  },
  {
    tag: "Text · Plus Jakarta Sans",
    face: css.aaSans,
    text: "Body and interface. Friendly, highly legible at small sizes on dark grounds. 17px base, 1.65 line-height.",
  },
  {
    tag: "Signal · JetBrains Mono",
    face: `${css.aaMono} v-neon`,
    text: "Eyebrows, data, statuses — the instrument readout layer. Uppercase, 11–12px, +12–16% tracking.",
    hi: true,
  },
];
const TYPE_SCALE: { tag: string; sample: ReactNode; meta: string }[] = [
  {
    tag: "Display XL",
    sample: (
      <span className={`v-display ${css.sampleXl}`}>
        Own the <span className="v-grad">high ground</span>.
      </span>
    ),
    meta: "41–96px fluid",
  },
  {
    tag: "Heading 2",
    sample: (
      <span className={`v-display ${css.sampleH2}`}>
        Found. <span className="v-neon">Chosen.</span> Connected.
      </span>
    ),
    meta: "32–56px fluid",
  },
  {
    tag: "Lead",
    sample: <span className={css.sampleLead}>We connect your website, search, reviews and practice software into one system.</span>,
    meta: "17–20px · 1.6",
  },
  { tag: "Eyebrow", sample: <span className="v-eyebrow">The Vantage growth system</span>, meta: "12px · +16% · caps" },
];

const EFFECTS = [
  { key: "glow", tag: "Glow scale", text: "None · soft · hot" },
  { key: "grid", tag: "Signal grid", text: "Slow 30s pan behind heroes" },
  { key: "radar", tag: "Radar sweep", text: "Visibility, scanning the market" },
  { key: "beams", tag: "Beam lines", text: "Data travelling between systems" },
] as const;

const ICONS: IconName[] = ["search", "pin", "chatLines", "star", "target", "browser", "plug", "chart"];

const APP_ICONS = [
  { label: "16", tile: css.fav16, art: <Favicon16 /> },
  { label: "32", tile: css.fav32, art: <Favicon32 /> },
  { label: "App icon", tile: css.app72, art: <AppIconMark /> },
  { label: "Social avatar", tile: css.social96, art: <SocialMark /> },
];

const VOICE_PAIRS = [
  { dont: "We're passionate about helping businesses grow.", say: "We turn search visibility into booked appointments." },
  { dont: "Guaranteed #1 rankings.", say: "A clear plan, disciplined execution, honest reporting." },
  { dont: "100% HIPAA-compliant marketing.", say: "Privacy-aware by design, reviewed with your compliance lead." },
];

const DONT = "Don't";
const MISUSE: { key: string; art: ReactNode; text: string }[] = [
  { key: "rotate", art: <MisuseRotated />, text: "rotate the mark." },
  { key: "close", art: <MisuseClosed />, text: "close the ring." },
  { key: "recolour", art: <MisuseRecoloured />, text: "recolour outside the palette." },
  { key: "glow", art: <MisuseOverglow />, text: "overload the glow." },
  { key: "retype", art: <MisuseRetyped wordClassName={css.retyped} />, text: "tighten or retype the wordmark." },
];

/* =====================================================================
   Page
   ===================================================================== */

/** Eyebrow + display heading for each board section. `aside` sits to the right on wide screens. */
function BoardHead({
  id,
  eyebrow,
  title,
  size = "lg",
  lead,
  aside,
  flush,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  size?: "xl" | "lg" | "md";
  lead?: ReactNode;
  aside?: ReactNode;
  /** No bottom margin (the head sits inside a column). */
  flush?: boolean;
}) {
  const main = (
    <div className={css.headMain}>
      <p className="v-eyebrow">{eyebrow}</p>
      <h2 id={id} className={`v-display ${{ xl: css.hXl, lg: css.hLg, md: css.hMd }[size]}`}>
        {title}
      </h2>
      {lead}
    </div>
  );
  if (aside) {
    return (
      <div className={css.headRow} data-reveal>
        {main}
        <div className={css.headAside}>{aside}</div>
      </div>
    );
  }
  const cls = flush ? css.flush : size === "xl" ? css.headXl : css.head;
  return (
    <div className={cls} data-reveal>
      {main}
    </div>
  );
}

function Part({ part }: { part: MarkPart }) {
  return (
    <div className={css.part}>
      <span className="v-num">{part.num}</span>
      <h3 className="v-h3">{part.title}</h3>
      <p className={`v-p ${css.partText}`}>{part.text}</p>
    </div>
  );
}

function EffectArt({ kind }: { kind: (typeof EFFECTS)[number]["key"] }) {
  switch (kind) {
    case "glow":
      return (
        <div className={css.glowScale} aria-hidden="true">
          <span className={css.glowNone} />
          <span className={css.glowSoft} />
          <span className={css.glowHot} />
        </div>
      );
    case "grid":
      return <div className={`v-gridbg ${css.fxGridBg}`} aria-hidden="true" />;
    case "radar":
      return (
        <div className={css.fxRadarWrap} aria-hidden="true">
          <div className={`v-radar ${css.fxRadar}`}>
            <div className="v-radar-ring v-radar-ring--1" />
            <div className="v-radar-ring v-radar-ring--3" />
            <div className="v-radar-sweep" />
          </div>
        </div>
      );
    case "beams":
      return (
        <div className={css.fxBeams} aria-hidden="true">
          <div className="v-beamline" style={{ top: "30%" }} />
          <div className="v-beamline" style={{ top: "55%", opacity: 0.6 }} />
          <div className="v-beamline" style={{ top: "80%", opacity: 0.35 }} />
        </div>
      );
  }
}

export default function BrandPage() {
  return (
    <>
      {/* 00 — Cover */}
      <section className={`v-glow-c ${css.cover}`} aria-labelledby="brand-title">
        <div className={`v-gridbg ${css.coverGrid}`} aria-hidden="true" />
        <div className={`v-orb v-orb--blue ${css.coverOrb}`} aria-hidden="true" />
        <div className={`v-wrap ${css.coverIn}`}>
          <div className={`${css.coverTop} v-rise`}>
            <h1 id="brand-title" className="v-tag">
              {COVER.title}
            </h1>
            <span className="v-tag">{COVER.version}</span>
          </div>
          <div className={css.coverCenter}>
            <Mark size={230} draw className={css.coverMark} />
            <div className={`${css.coverWord} v-rise v-d3`}>
              <span className={css.coverWordMain}>{COVER.word}</span>
              <span className={css.coverWordSub}>{COVER.descriptor}</span>
            </div>
          </div>
          <div className={`${css.coverFoot} v-rise v-d4`}>
            <p className={`v-display ${css.coverTagline}`}>{COVER.tagline}</p>
            {COVER.body.map((p) => (
              <p key={p} className={css.coverBody}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 01 — The mark explained */}
      <section className={`v-sec v-deep ${css.bt}`} aria-labelledby="brand-mark">
        <div className="v-wrap">
          <BoardHead
            id="brand-mark"
            eyebrow="01 — The mark"
            title="The Breakout V."
            size="xl"
            lead={
              <p className="v-lead">
                One continuous idea in three strokes: a practice inside its market, earning trust, and breaking out above it.
              </p>
            }
          />
          <div className={css.markGrid}>
            <div className={`${css.markCol} ${css.markColL}`} data-stagger>
              {MARK_PARTS.slice(0, 2).map((part) => (
                <Part key={part.num} part={part} />
              ))}
            </div>
            <div className={css.markPanel} data-reveal>
              <MarkDiagram className={css.diagram} />
              <span className={`v-tag ${css.panelSpec}`}>{MARK_SPEC}</span>
              <span className={`v-flag ${css.panelFlag}`}>{MARK_FLAG}</span>
            </div>
            <div className={css.markCol} data-stagger>
              {MARK_PARTS.slice(2).map((part) => (
                <Part key={part.num} part={part} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Logo system */}
      <section className="v-sec" aria-labelledby="brand-logo">
        <div className="v-wrap">
          <BoardHead
            id="brand-logo"
            eyebrow="02 — Logo system"
            title="One signal, every surface."
            aside={
              <p className="v-p">
                The wordmark is set in Sora at +32% tracking — wide, calm capitals that feel engineered rather than shouted.
                The descriptor sits in mono cyan beneath.
              </p>
            }
          />
          <div className={css.logoGrid} data-stagger>
            <figure className={`${css.fig} ${css.figWide} ${css.figTall} ${css.figPrimary}`}>
              <div className={css.lockH}>
                <Mark size={100} className={css.lockHMark} />
                <span className={css.wordH}>
                  <span className={css.wordHMain}>VANTAGE</span>
                  <span className={css.wordHSub}>Digital Health</span>
                </span>
              </div>
              <figcaption className={`v-tag ${css.figCap}`}>{LOGO_CAPTIONS.primary}</figcaption>
            </figure>
            <figure className={`${css.fig} ${css.figTall} ${css.figInk1}`}>
              <div className={css.lockV}>
                <Mark size={96} className={css.lockVMark} />
                <span className={css.wordV}>
                  <span className={css.wordVMain}>VANTAGE</span>
                  <span className={css.wordVSub}>Digital Health</span>
                </span>
              </div>
              <figcaption className={`v-tag ${css.figCap}`}>{LOGO_CAPTIONS.stacked}</figcaption>
            </figure>
            <figure className={`${css.fig} ${css.figLight}`}>
              <div className={css.lockL}>
                <LightMark size={64} className={css.lockLMark} />
                <span className={css.wordH}>
                  <span className={css.wordLMain}>VANTAGE</span>
                  <span className={css.wordLSub}>Digital Health</span>
                </span>
              </div>
              <figcaption className={`v-tag ${css.figCap} ${css.figCapLight}`}>{LOGO_CAPTIONS.light}</figcaption>
            </figure>
            <figure className={`${css.fig} ${css.figInk2}`}>
              <div className={css.lockC}>
                <CompactMark className={css.lockCMark} />
                <span className={css.wordCMain}>VANTAGE</span>
              </div>
              <figcaption className={`v-tag ${css.figCap}`}>{LOGO_CAPTIONS.compact}</figcaption>
            </figure>
            <figure className={`${css.fig} ${css.figSplit}`}>
              <div className={css.splitDark}>
                <OneColourMark tone="white" className={css.oneMark} />
              </div>
              <div className={css.splitLight}>
                <OneColourMark tone="ink" className={css.oneMark} />
              </div>
              <figcaption className={`v-tag ${css.figCap}`}>{LOGO_CAPTIONS.oneColour}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 03 — Motion */}
      <section className={`v-sec v-deep v-glow-tr ${css.bb}`} aria-labelledby="brand-motion">
        <div className={`v-wrap ${css.motionGrid}`}>
          <div className={css.motionCopy}>
            <BoardHead
              id="brand-motion"
              eyebrow="03 — Motion"
              title="The logo powers on."
              flush
              lead={
                <p className="v-p">
                  On load the ring draws itself, the V traces upward through the gap, and the point lights — then breathes
                  gently. 1.9 seconds, once per visit. Reduced-motion users see the finished mark instantly.
                </p>
              }
            />
            <ul className={css.timeline} data-stagger>
              {MOTION_STEPS.map((step) => (
                <li key={step.at}>
                  <b>{step.at}</b> → {step.what}
                </li>
              ))}
            </ul>
          </div>
          <div className={css.frames} data-stagger>
            {FRAMES.map((frame) => (
              <figure key={frame.caption} className={css.frame}>
                {frame.step === "live" ? (
                  <div className={`v-card v-card--hi ${css.frameCard}`}>
                    <Mark size={96} draw className={`${css.frameSvg} ${css.liveMark}`} />
                  </div>
                ) : (
                  <div className={`v-card ${css.frameCard}`}>
                    <MotionFrame step={frame.step} className={css.frameSvg} />
                  </div>
                )}
                <figcaption className={`v-tag ${frame.step === "live" ? css.liveCap : ""}`.trim()}>{frame.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Colour */}
      <section className="v-sec" aria-labelledby="brand-colour">
        <div className="v-wrap">
          <BoardHead
            id="brand-colour"
            eyebrow="04 — Colour"
            title="Night, signal and a single spark."
            aside={
              <p className="v-p">
                Ninety percent night. Blue carries action and structure, cyan carries light and data, and amber appears only
                for ratings and content that needs attention.
              </p>
            }
          />
          <div className={css.swBig} data-stagger>
            {BIG_SWATCHES.map((sw) => (
              <div key={sw.name} className={`${css.sw} ${SWATCH_TONE[sw.tone]}`}>
                <div className={css.swTop}>
                  <span className="v-tag">{sw.tag}</span>
                  <span className={css.tokens}>
                    {sw.tokens.map((t) => (
                      <code key={t} className={css.token}>
                        {t}
                      </code>
                    ))}
                  </span>
                </div>
                <div>
                  <p className={`v-display ${sw.tone === "night" ? css.swNameLg : css.swName}`}>{sw.name}</p>
                  {sw.lines.map((line, i) => (
                    <p key={line} className={`v-mono ${css.swLine} ${i === 0 ? css.swLineFirst : ""}`.trim()}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={css.swSmall} data-stagger>
            {SMALL_SWATCHES.map((sw) => (
              <div key={sw.token} className={css.chipCell}>
                <div className={`${css.chip} ${sw.edge ? css.chipEdge : ""}`.trim()} style={{ background: `var(${sw.token})` }} />
                <span className={`v-mono ${css.chipLabel}`}>
                  {sw.name} · {sw.hex}
                </span>
                <code className={css.chipToken}>{sw.token}</code>
              </div>
            ))}
          </div>
          <div className={css.prop} aria-hidden="true">
            {PROPORTION.map((p) => (
              <span
                key={p.token}
                className={p.edge ? css.propEdge : undefined}
                style={{ flex: p.share, background: `var(${p.token})` }}
              />
            ))}
          </div>
          <p className={`v-tag ${css.propCap}`}>Proportion of use</p>
        </div>
      </section>

      {/* 05 — Typography */}
      <section className={`v-sec ${css.noTop}`} aria-labelledby="brand-type">
        <div className="v-wrap">
          <BoardHead id="brand-type" eyebrow="05 — Typography" title="Engineered, warm, precise." />
          <div className={css.faces} data-stagger>
            {TYPE_FACES.map((f) => (
              <div key={f.tag} className={`v-card ${f.hi ? "v-card--hi" : ""} ${css.face}`}>
                <span className="v-tag">{f.tag}</span>
                <p className={`${css.aa} ${f.face}`} aria-hidden="true">
                  Aa
                </p>
                <p className={`v-p ${css.faceText}`}>{f.text}</p>
              </div>
            ))}
          </div>
          <div className={`v-card ${css.scale}`} data-reveal>
            {TYPE_SCALE.map((row) => (
              <div key={row.tag} className={css.scaleRow}>
                <span className={`v-tag ${css.scaleTag}`}>{row.tag}</span>
                <span className={css.scaleSample}>{row.sample}</span>
                <span className={`v-mono v-muted ${css.scaleMeta}`}>{row.meta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Light & effects */}
      <section className={`v-sec v-deep v-glow-c ${css.bb}`} aria-labelledby="brand-effects">
        <div className="v-wrap">
          <BoardHead
            id="brand-effects"
            eyebrow="06 — Light & effects"
            title="Neon with restraint."
            aside={
              <p className="v-p">
                Glow marks importance. One hot element per view; everything else sits at soft or none. Every animation pauses
                for reduced-motion users.
              </p>
            }
          />
          <div className={css.fx} data-stagger>
            {EFFECTS.map((fx) => (
              <figure key={fx.key} className={`v-card ${css.fxCard} ${fx.key === "grid" ? css.fxEnd : ""}`.trim()}>
                <EffectArt kind={fx.key} />
                <figcaption>
                  <span className="v-tag">{fx.tag}</span>
                  <p className={css.fxCapText}>{fx.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Iconography · 08 — Favicon, app & social */}
      <section className="v-sec" aria-labelledby="brand-icons brand-app">
        <div className={`v-wrap ${css.iconsGrid}`}>
          <div className={css.col}>
            <BoardHead
              id="brand-icons"
              eyebrow="07 — Iconography"
              title="Instrument-line icons."
              size="md"
              flush
              lead={
                <p className="v-p">
                  24px grid, 1.8px rounded stroke, cyan on a glass tile with a soft glow. Fill is reserved for rating stars.
                </p>
              }
            />
            <div className={css.iconTiles} data-stagger>
              {ICONS.map((name) => (
                <span key={name} className={`v-icon ${css.iconTile}`}>
                  <Icon name={name} size={24} />
                </span>
              ))}
            </div>
          </div>
          <div className={css.col}>
            <BoardHead id="brand-app" eyebrow="08 — Favicon, app & social" title="Lit at sixteen pixels." size="md" flush />
            <div className={`v-card ${css.appCard}`} data-reveal>
              {APP_ICONS.map((app) => (
                <div key={app.label} className={css.appItem}>
                  <span className={app.tile}>{app.art}</span>
                  <span className={`v-mono v-muted ${css.appLabel}`}>{app.label}</span>
                </div>
              ))}
            </div>
            <div className={`v-glow-tr ${css.banner}`} data-reveal>
              <div className={`v-gridbg ${css.bannerGrid}`} aria-hidden="true" />
              <div className={css.bannerText}>
                <span className={`v-display ${css.bannerHead}`}>
                  Own the <span className="v-grad">high ground</span> in your market.
                </span>
                <span className={`v-tag ${css.bannerUrl}`}>vantagedigitalhealth.com</span>
              </div>
              <span className={`v-tag ${css.bannerTag}`}>Profile cover</span>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — Interface kit (static specimens, not live controls) */}
      <section className={`v-sec v-deep v-glow-tl ${css.bb}`} aria-labelledby="brand-kit">
        <div className={`v-wrap ${css.kitGrid}`}>
          <BoardHead
            id="brand-kit"
            eyebrow="09 — Interface kit"
            title="Controls that light up."
            size="md"
            flush
            lead={
              <p className="v-p">
                Primary actions are a deep blue gradient with a glow halo and a light sweep on hover. Secondary actions are
                glass. Focus is always a cyan ring.
              </p>
            }
          />
          <div className={`v-card ${css.kit}`} data-reveal>
            <div className="v-btn-row">
              <span className="v-btn v-btn--primary">
                Book a strategy call <Arrow />
              </span>
              <span className="v-btn v-btn--ghost">View case studies</span>
              <span className={`v-btn v-btn--primary ${css.btnHover}`}>Hover</span>
              <span className={`v-btn v-btn--ghost ${css.btnFocus}`}>Focus</span>
            </div>
            <div className={css.kitChips}>
              <span className={`v-chip ${css.kitChip}`} data-on="true">
                All categories
              </span>
              <span className={`v-chip ${css.kitChip}`}>EHR / EMR</span>
              <span className={`v-chip ${css.kitChip}`}>Scheduling</span>
              <span className="v-flag">Verify before publishing</span>
              <Ph>[PLACEHOLDER]</Ph>
            </div>
            <div className={css.kitFields}>
              <div className="v-field">
                <span className="v-label">Practice name</span>
                <span className={`v-input ${css.fakeInput} ${css.fakeFocus}`}>Riverside Family Dental</span>
              </div>
              <div className="v-field">
                <span className="v-label">Work email</span>
                <span className={`v-input ${css.fakeInput} ${css.fakeErr}`}>riverside@</span>
                <span className="v-err">Enter a complete email address.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — Voice + misuse */}
      <section className="v-sec" aria-labelledby="brand-voice">
        <div className="v-wrap">
          <div className={css.voiceGrid}>
            <BoardHead
              id="brand-voice"
              eyebrow="10 — Voice"
              title="Say the specific thing."
              size="md"
              flush
              lead={
                <p className="v-p">
                  Confident, plain and healthcare-literate. Talk about patients, appointments and trust — never promise rankings
                  or revenue.
                </p>
              }
            />
            <div className={css.pairs} data-stagger>
              {VOICE_PAIRS.map((pair) => (
                <div key={pair.say} className={css.pair}>
                  <p className={css.dont}>
                    <s>{pair.dont}</s>
                  </p>
                  <p>
                    <strong>{pair.say}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className={css.misuse} data-stagger>
            {MISUSE.map((m) => (
              <figure key={m.key} className={css.misFig}>
                <div className={`v-card ${css.misCard}`}>{m.art}</div>
                <figcaption className="v-small">
                  <strong className={css.dontLabel}>{DONT}</strong> {m.text}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
