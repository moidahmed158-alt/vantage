import type { ReactNode } from "react";
import { Ph } from "@/components/ui/Flag";
import { ROUTES } from "@/lib/site";
import type { ServiceCopy } from "../_detail/types";

// All copy for /services/answer-engine-optimization, in page order.
// This page adds an "AEO in plain terms" section (PLAIN) between the hero and "What's included".
// The hero mock UI copy is in MOCK below.

/** Jump target for the hero's "AEO in plain terms" button (id kept from the design). */
export const PLAIN_ID = "plain";

export const COPY: ServiceCopy = {
  meta: {
    title: "Answer Engine Optimization (AEO) for Practices",
    description:
      "Help AI assistants and AI-generated search answers describe your practice accurately — with consistent facts, structured data and answer-ready content.",
  },

  hero: {
    crumb: "Answer Engine Optimization",
    eyebrow: "Be found · Answer Engine Optimization",
    title: (
      <>
        When patients ask AI, make sure it <span className="v-grad">knows you</span>.
      </>
    ),
    lead: "More patients now ask AI assistants — and read AI-generated search summaries — before choosing a provider. AEO makes your practice's information clear, consistent and credible enough to be used in those answers.",
    primary: { label: "Request an AI visibility check", href: ROUTES.contact },
    secondary: { label: "AEO in plain terms", href: `#${PLAIN_ID}` },
  },

  included: {
    eyebrow: "What's included",
    title: "Make your practice easy to understand — for people and machines.",
    items: [
      {
        title: "Fact consistency",
        body: "Name, locations, hours, providers, services and insurance aligned across your site, profiles and directories.",
      },
      {
        title: "Structured data",
        body: "Schema markup for your practice type, physicians or dentists, locations and FAQs, so your facts are machine-readable.",
      },
      {
        title: "Answer-ready content",
        body: "Direct, well-organized answers to the questions patients actually ask — reviewed by your providers.",
      },
      {
        title: "Trust signals",
        body: "Credentials, affiliations, reviews and reputable mentions that give AI systems confidence to cite you.",
      },
      {
        title: "Crawler access",
        body: "Technical checks — and a deliberate policy decision — on which search and AI crawlers can read your site.",
      },
      {
        title: "Visibility monitoring",
        body: "Regular sampling of priority patient questions across major AI assistants, tracking whether — and how accurately — you're mentioned.",
      },
    ],
  },

  why: {
    eyebrow: "Why healthcare is different",
    title: (
      <>
        Wrong answers cost patients, <span className="v-neon">not just clicks</span>.
      </>
    ),
    items: [
      {
        title: "Accuracy is a patient-safety issue",
        body: "An AI repeating outdated hours, the wrong insurance or a retired provider sends patients to the wrong place. Fixing the facts comes first.",
      },
      {
        title: "Careful with clinical claims",
        body: "Content stays factual and provider-reviewed. Overstated outcomes are a risk for patients and for your practice.",
      },
      {
        title: "Nobody controls the answer",
        body: "AI responses vary by platform, phrasing and time. We improve your odds and measure honestly; we don't promise placements.",
      },
    ],
  },

  process: {
    eyebrow: "How it works",
    title: "From “how does AI describe us?” to a measurable plan.",
    items: [
      {
        title: "Baseline",
        body: "We ask major assistants your patients' priority questions and record what they say about you and competitors.",
      },
      {
        title: "Fix the facts",
        body: "Correct inconsistencies across your website, profiles and directories, and add structured data.",
      },
      {
        title: "Publish answers",
        body: "Create clear, provider-reviewed answers to high-value questions.",
      },
      {
        title: "Monitor",
        body: "Re-test on a regular cadence and adjust as platforms change.",
      },
    ],
    measure: {
      tag: "What we measure",
      title: "A new channel, measured carefully.",
      chips: [
        "Mention rate on sampled questions",
        "Accuracy of facts in answers",
        "Referrals from AI assistants, where identifiable",
        "Structured-data coverage",
      ],
    },
  },

  related: {
    title: "Works best with",
    allLabel: "All services",
    items: [
      { href: ROUTES.healthcareSeo, body: "The technical and content foundation AEO builds on." },
      { href: ROUTES.reputationManagement, body: "What patients say about you is part of what AI repeats." },
      { href: ROUTES.websiteDevelopment, body: "A well-structured site is the most citable source you own." },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "AEO questions.",
    items: [
      {
        q: "Is AEO replacing SEO?",
        a: "No. Most patients still use traditional search, and many AI answers draw on the same well-structured, authoritative pages that rank well. Think of AEO as extending good SEO into a new kind of result.",
      },
      {
        q: "Can you guarantee we'll be recommended by AI assistants?",
        a: "No one can. AI providers decide how answers are generated, and results vary between platforms and over time. We make your practice a clearer, more trustworthy source and report what changes.",
      },
      {
        q: "Which AI tools do you monitor?",
        a: (
          <>
            The major general-purpose assistants and AI features in search, agreed at the start of each engagement.{" "}
            <Ph>[CONFIRM MONITORED PLATFORMS]</Ph>
          </>
        ),
      },
      {
        q: "How quickly do changes show up?",
        a: "It varies. Some assistants search the web live; others rely on information gathered earlier. Fixing facts at the source — your site and profiles — is what eventually propagates everywhere.",
      },
    ],
  },

  cta: {
    title: (
      <>
        Ask us how AI describes your practice <span className="v-neon">today</span>.
      </>
    ),
    lead: "We'll test the questions your patients ask and show you what AI assistants say — accurate or not — and what we'd fix first.",
    primary: { label: "Request an AI visibility check", href: ROUTES.contact },
    secondary: { label: "Read the glossary", href: `${ROUTES.resources}#glossary` },
  },
};

/** "AEO in plain terms": search engine vs answer engine. */
export const PLAIN: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  search: { tag: string; title: string; body: string };
  answer: { tag: string; title: string; body: string };
} = {
  eyebrow: "AEO in plain terms",
  title: (
    <>
      Search gives a list. Answer engines give <span className="v-neon">an answer</span>.
    </>
  ),
  lead: "With a traditional search, patients compare ten links. With an AI answer, they often see one composed recommendation that cites a handful of sources. If your information is missing, inconsistent or hard to read, you're simply left out.",
  search: {
    tag: "Search engine",
    title: "“Here are pages that might help.”",
    body: "The patient does the comparing. Ranking well puts you in the running.",
  },
  answer: {
    tag: "Answer engine",
    title: "“Based on what I found, try this practice.”",
    body: "The AI does the comparing. Being a clear, trusted source decides whether you're mentioned at all.",
  },
};

/** Hero mock: a patient question, an AI answer citing sources, and the signals that made it citable. Illustrative only. */
export const MOCK: {
  tag: string;
  flag: string;
  question: string;
  answer: ReactNode;
  sources: string[];
  signals: string[];
} = {
  tag: "AI assistant · Illustrative",
  flag: "Not a real answer",
  question: "Which pediatric dentist near downtown takes my insurance and has Saturday hours?",
  answer: (
    <>
      A few practices fit. <strong className="v-neon">Your Practice</strong> lists Saturday appointments, accepts several
      major insurance plans and has two board-certified pediatric dentists. Reviews often mention patience with anxious
      children.
    </>
  ),
  sources: ["1 · yourpractice.com/insurance", "2 · Business profile", "3 · Directory listing"],
  signals: ["Hours consistent everywhere", "Insurance page is citable", "Provider credentials marked up"],
};
