import type { ReactNode } from "react";
import { Ph } from "@/components/ui/Flag";
import { ROUTES } from "@/lib/site";
import type { ServiceCopy } from "../_detail/types";

// All copy for /services/answer-engine-optimization, in page order.
// This page adds an "AEO in plain terms" section (PLAIN) between the hero and "What's included",
// plus the TERMS, SOURCES, BEFORE_AFTER and CHECKS sections at the end of this file.
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
        title: "Answer-ready service pages",
        body: "One page per treatment that opens with a direct answer, then covers candidacy, recovery, cost factors and FAQs — reviewed by your providers.",
      },
      {
        title: "Schema on every page",
        body: "Medical structured data in JSON-LD for your practice, providers, locations, services and FAQs, so your facts are machine-readable.",
      },
      {
        title: "One citable page per fact",
        body: "Insurance, hours, providers, locations and payment options each get a clear, linkable home — not a line buried in a footer or a PDF.",
      },
      {
        title: "Consistent profiles & listings",
        body: "Name, address, phone, hours, providers and insurance aligned across Google, health directories and data aggregators.",
      },
      {
        title: "Reviews & trust signals",
        body: "Credentials, affiliations, recent reviews and reputable mentions that give AI systems confidence to name you.",
      },
      {
        title: "AI crawler access & llms.txt",
        body: "robots.txt, firewall and CDN settings checked so the AI crawlers you choose can read your site — plus an llms.txt file, a proposed standard some AI tools read.",
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
        q: "What's the difference between AEO and GEO?",
        a: "Very little in practice. Both describe making your practice a clear, trusted source for AI-generated answers; GEO is more often used for generative tools like ChatGPT and Perplexity. The work is the same either way.",
      },
      {
        q: "How do AI assistants decide which practice to mention?",
        a: "No AI provider publishes the exact method, and it differs between platforms. Broadly, assistants favor sources they can read easily and cross-check: a clear website, consistent profiles and listings, structured data and genuine reviews.",
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
      {
        q: "What is llms.txt, and do we need one?",
        a: "It's a proposed standard: a plain-text file that summarizes your site for AI tools. Support among AI providers is limited and unconfirmed, so we treat it as a low-cost extra rather than a ranking factor.",
      },
      {
        q: "Does schema markup help with Google's AI Overviews?",
        a: "Google says its AI features need no special markup beyond normal SEO best practice. Structured data still helps search engines understand exactly who you are and what you offer — which removes the ambiguity that keeps practices out of answers.",
      },
      {
        q: "Do reviews affect what AI says about us?",
        a: "They can. Assistants often summarize what patients say, and review volume and recency feature in local results. A steady flow of genuine reviews — and thoughtful replies — gives them accurate material to work with.",
      },
      {
        q: "Is AEO safe under HIPAA?",
        a: "AEO works with public information about your practice — services, providers, hours, insurance — not patient data. Any measurement is configured so health information isn't passed to third parties.",
      },
      {
        q: "Do we need a new website for AEO?",
        a: "Not usually. Most of the work — restructuring key pages, adding schema, fixing listings — happens on the site you already have. If your platform blocks basics like editable page structure or schema, we'll tell you.",
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

/* ------------------------------------------------------------------ */
/* Sections added after the reference review, in page order.           */
/* ------------------------------------------------------------------ */

/** "AI search, defined": four glossary cards under a row of the platforms patients use. */
export const TERMS: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  platformsLabel: string;
  platforms: string[];
  items: { term: string; full: string; def: string; example: string }[];
} = {
  eyebrow: "AI search, defined",
  title: (
    <>
      Four terms behind the way patients <span className="v-neon">search now</span>.
    </>
  ),
  lead: "Patients ask longer, more specific questions than they ever typed into a search box — and get one composed answer back. Here's the vocabulary, and what each term means for your practice.",
  platformsLabel: "Where patients are asking",
  platforms: ["ChatGPT", "Gemini", "Google AI Overviews", "Perplexity", "Copilot", "Claude"],
  items: [
    {
      term: "AEO",
      full: "Answer Engine Optimization",
      def: "Making your practice's information clear, consistent and credible enough to be used — and cited — in AI-generated answers.",
      example: "A patient asks which orthodontist nearby offers evening appointments, and the answer names you.",
    },
    {
      term: "GEO",
      full: "Generative Engine Optimization",
      def: "A closely related term for the same goal, often used for tools that write answers from many sources. In practice the work overlaps almost entirely with AEO.",
      example: "Your insurance page is one of the sources an assistant cites when it summarizes options.",
    },
    {
      term: "AI Overviews",
      full: "Google AI Overviews & AI Mode",
      def: "Google's AI-written summaries above the search results, and its conversational search mode. Both build on Google's index — and, for local questions, on Business Profile information.",
      example: "A search for “implant cost near me” opens with a summary before any links.",
    },
    {
      term: "LLMs",
      full: "AI assistants",
      def: "Tools such as ChatGPT, Gemini, Claude, Copilot and Perplexity, built on large language models. Many search the web when a question needs current or local information.",
      example: "A parent asks an assistant to compare two pediatric dentists before calling either.",
    },
  ],
};

export type SourceId = "website" | "schema" | "gbp" | "reviews" | "listings";

/** "How AI chooses a practice": the five sources an answer is assembled from, then how each engine reads them. */
export const SOURCES: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  /** Labels for the three blocks in each source's panel. */
  blocks: { looks: string; wrong: string; change: string };
  items: { id: SourceId; label: string; hint: string; looks: string; wrong: string; change: string }[];
  enginesTitle: string;
  engines: { name: string; body: string }[];
} = {
  eyebrow: "How AI chooses a practice",
  title: (
    <>
      AI names the practice whose facts are <span className="v-neon">easiest to trust</span>.
    </>
  ),
  lead: "Assistants assemble an answer from sources they can read and cross-check. When your website, profiles, reviews and listings agree, you're a safe recommendation. When they conflict, you're easy to leave out.",
  blocks: { looks: "What AI looks for", wrong: "What usually goes wrong", change: "What we change" },
  items: [
    {
      id: "website",
      label: "Your website",
      hint: "The source you control most",
      looks: "A clear page for each service and location, with direct answers, provider credentials and practical details like insurance and hours.",
      wrong: "One page lists every service, key facts sit inside images or PDFs, and hours or insurance differ from your profiles.",
      change: "A dedicated, answer-first page per service, facts written as plain text, and every detail matched to your profiles.",
    },
    {
      id: "schema",
      label: "Structured data",
      hint: "Facts machines can read",
      looks: "Markup that states who you are: practice type, providers, locations, services, hours and FAQs.",
      wrong: "No schema at all, generic business markup only, or markup that contradicts what the page says.",
      change: "Medical schema in JSON-LD on every page — practice, providers, services and FAQs — validated and kept current.",
    },
    {
      id: "gbp",
      label: "Google Business Profile",
      hint: "The backbone of local answers",
      looks: "The right categories, accurate hours, services, photos and attributes — and steady, recent reviews.",
      wrong: "The wrong primary category, stale holiday hours, missing services or duplicate listings for one office.",
      change: "Categories and services aligned to what you want to be known for, hours kept current and duplicates resolved.",
    },
    {
      id: "reviews",
      label: "Patient reviews",
      hint: "What patients say, summarized",
      looks: "Recent, specific reviews across several sites, and thoughtful replies from the practice.",
      wrong: "A burst of reviews years ago, then silence — or complaints left unanswered.",
      change: "A steady flow of genuine reviews requested after visits, with privacy-safe responses.",
    },
    {
      id: "listings",
      label: "Directories & listings",
      hint: "The cross-check",
      looks: "The same name, address, phone, providers and insurance on health directories and data aggregators.",
      wrong: "Old addresses, retired providers and mismatched phone numbers scattered across dozens of sites.",
      change: "Listings corrected and kept in sync, so every source an assistant checks tells the same story.",
    },
  ],
  enginesTitle: "Each assistant reads the web a little differently.",
  engines: [
    {
      name: "ChatGPT",
      body: "Searches the web when a question needs current or local information, and shows the sources it used. Clear, crawlable pages give it something to cite.",
    },
    {
      name: "Gemini & AI Overviews",
      body: "Built on Google Search. For local questions they draw on the same signals as Maps — your Business Profile, reviews and website.",
    },
    {
      name: "Perplexity",
      body: "Searches the web for each question and cites sources inline, so pages that answer the question directly are the ones it links to.",
    },
    {
      name: "Copilot",
      body: "Draws on Bing's index, so your site and listings need to be readable by Bing as well as Google.",
    },
  ],
};

export type PageState = "before" | "after";

/** "Before & after": the same treatment page as a brochure and as an answer. Illustrative only. */
export const BEFORE_AFTER: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  flag: string;
  tabsLabel: string;
  states: Record<PageState, { label: string; url: string; verdict: string; points: string[] }>;
  before: { headline: string; services: string[]; photo: string; form: string };
  after: {
    headline: string;
    answerTag: string;
    sections: string[];
    providerTag: string;
    faqs: string[];
    schema: string;
    cta: string;
  };
} = {
  eyebrow: "Before & after",
  title: (
    <>
      Same treatment. One page AI can <span className="v-neon">actually cite</span>.
    </>
  ),
  lead: "Most practice pages were written as brochures. Here's what changes when a page is rebuilt to answer the question a patient — or an assistant — is actually asking.",
  flag: "Illustrative concept",
  tabsLabel: "Compare the page before and after",
  states: {
    before: {
      label: "Before",
      url: "yourpractice.com/services",
      verdict: "Why AI skips it",
      points: [
        "A slogan, not a treatment, in the main heading.",
        "Every service crammed onto one page, none explained.",
        "A stock photo where the provider and their credentials should be.",
        "A contact form is the only next step — and the only facts.",
      ],
    },
    after: {
      label: "After",
      url: "yourpractice.com/dental-implants",
      verdict: "Why AI can cite it",
      points: [
        "The treatment and the city named in the heading.",
        "A direct, provider-reviewed answer in the first few lines.",
        "Candidacy, recovery, cost factors and photos — each clearly labeled.",
        "Provider credentials, FAQs and medical schema in JSON-LD.",
      ],
    },
  },
  before: {
    headline: "Smile with confidence.",
    services: ["Cleanings", "Whitening", "Implants", "Veneers", "Crowns", "Bonding"],
    photo: "Stock photo",
    form: "Contact us",
  },
  after: {
    headline: "Dental implants in Your City",
    answerTag: "Short answer",
    sections: ["Who's a candidate", "Recovery", "Cost factors", "Before & after photos"],
    providerTag: "Provider bio · credentials",
    faqs: ["How long do implants last?", "Is the procedure painful?"],
    schema: "Dentist · MedicalProcedure · FAQPage",
    cta: "Book a consult",
  },
};

export type CheckStatus = "pass" | "fix";

/** "Technical checks": the plumbing AI crawlers depend on, as an illustrative status panel. */
export const CHECKS: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  tryIt: { title: string; body: string };
  panel: { tag: string; flag: string };
  statusLabel: Record<CheckStatus, string>;
  rows: { label: string; detail: string; status: CheckStatus; chips?: string[] }[];
} = {
  eyebrow: "Technical checks",
  title: (
    <>
      Eligible to be cited — <span className="v-neon">and checked regularly</span>.
    </>
  ),
  lead: "An assistant can't cite a page it isn't allowed to read. Alongside outcome reporting, we run automated checks on the plumbing AI crawlers depend on, and fix what fails. We don't sell an invented “AI rank”.",
  tryIt: {
    title: "Try it yourself",
    body: "Ask ChatGPT, Gemini and Perplexity the question your ideal patient would ask — the treatment, your town, their insurance — and note who gets named, and whether the facts are right.",
  },
  panel: { tag: "AI access checks", flag: "Illustrative" },
  statusLabel: { pass: "Pass", fix: "1 to fix" },
  rows: [
    {
      label: "robots.txt",
      detail: "Allows the AI crawlers you've chosen",
      status: "pass",
      chips: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"],
    },
    { label: "Firewall & CDN", detail: "Not silently blocking AI bots", status: "pass" },
    { label: "llms.txt", detail: "Present, and lists current services", status: "pass" },
    { label: "Practice schema", detail: "Valid practice and provider markup", status: "pass" },
    { label: "Page schema", detail: "Service and FAQ markup on every treatment page", status: "fix" },
    { label: "Sitemap & canonicals", detail: "Every page listed once, at one canonical URL", status: "pass" },
  ],
};
