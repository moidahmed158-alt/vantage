import Link from "next/link";
import type { ReactNode } from "react";
import { Ph } from "@/components/ui/Flag";
import { ROUTES } from "@/lib/site";
import type { ServiceCopy } from "../_detail/types";

// All copy for /services/reputation-management, in page order. The hero mock UI copy is in MOCK below.

/** Jump target for the hero's "What's included" button. */
export const INCLUDED_ID = "reputation-included";

export const COPY: ServiceCopy = {
  meta: {
    title: "Healthcare Reputation Management",
    description: "Genuine review generation, monitoring and privacy-safe responses for medical and dental practices.",
  },

  hero: {
    crumb: "Reputation Management",
    eyebrow: "Be chosen · Reputation management",
    title: (
      <>
        Turn great care into the <span className="v-grad">reputation it deserves</span>.
      </>
    ),
    lead: "Most satisfied patients never leave a review unless they're asked at the right moment. We build a steady, genuine review flow, monitor what's said where patients read, and help you respond well — without disclosing anything about a patient.",
    primary: { label: "Request a reputation audit", href: ROUTES.contact },
    secondary: { label: "What's included", href: `#${INCLUDED_ID}` },
  },

  included: {
    eyebrow: "What's included",
    title: "A reputation system, not a review blast.",
    items: [
      {
        title: "Review generation",
        body: "Timed, personal requests by text or email after a visit — asking every patient, not just the happy ones.",
      },
      {
        title: "Monitoring",
        body: "Alerts across Google, healthcare directories and the other sites your patients actually read.",
      },
      {
        title: "Response workflows",
        body: "Privacy-safe reply drafts for your approval, with clear escalation for anything sensitive.",
      },
      {
        title: "Service recovery",
        body: "Patients who report a problem reach your team quickly — without discouraging anyone from posting publicly.",
      },
      {
        title: "Profile accuracy",
        body: "Hours, providers, services, photos and categories kept correct wherever you're listed.",
      },
      {
        title: "Reporting",
        body: "Rating trend, review velocity, response time and the themes patients mention most.",
      },
    ],
  },

  why: {
    eyebrow: "Why healthcare is different",
    title: (
      <>
        The rules are stricter here — <span className="v-neon">and they should be</span>.
      </>
    ),
    items: [
      {
        title: "A reply can be a disclosure",
        body: "Confirming that a reviewer is your patient, or mentioning their care, can expose protected health information. Every response is written to avoid that.",
      },
      {
        title: "No gating, no incentives, no fakes",
        body: "Filtering unhappy patients away from public reviews, paying for reviews or writing them breaks platform policies and consumer-protection rules. We don't do any of it.",
      },
      {
        title: "Recency carries weight",
        body: "Patients notice when the latest review is months old. A steady, genuine flow builds more trust than an occasional burst.",
      },
    ],
  },

  process: {
    eyebrow: "How it works",
    title: "Running in weeks, compounding for years.",
    items: [
      {
        title: "Audit",
        body: "Where you're listed, what's being said, how you compare locally and what's inaccurate.",
      },
      {
        title: "Set up requests",
        body: "Message templates, timing and — where integrated — triggers from completed visits.",
      },
      {
        title: "Monitor & respond",
        body: "Alerts, drafts and approvals in an agreed workflow with your team.",
      },
      {
        title: "Report & refine",
        body: "Trends and themes reviewed regularly, feeding back into operations and marketing.",
      },
    ],
    measure: {
      tag: "What we measure",
      title: "Trust you can see changing.",
      chips: [
        "Review volume & velocity",
        "Average rating trend",
        "Response time",
        "Themes by service",
        "Calls & directions from listings",
      ],
    },
  },

  related: {
    title: "Works best with",
    allLabel: "All services",
    items: [
      { href: ROUTES.healthcareSeo, body: "Reviews are a local ranking signal; SEO makes the most of them." },
      { href: ROUTES.aeo, body: "AI answers often draw on what patients say about you." },
      { href: ROUTES.integrations, body: "Trigger requests from completed visits in your PM system." },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Reputation questions.",
    items: [
      {
        q: "Can you remove negative reviews?",
        a: "We can help you flag reviews that genuinely violate a platform's policies — spam, conflicts of interest, offensive content. Legitimate reviews stay. The durable fix is a steady flow of new, genuine reviews and good responses.",
      },
      {
        q: "How do you reply without breaching patient privacy?",
        a: "Replies never confirm someone is a patient or reference their visit, condition or treatment. They thank, acknowledge in general terms and invite the person to contact the office directly. Your team approves sensitive replies before they're posted.",
      },
      {
        q: "Do you offer incentives for reviews?",
        a: "No. Incentivized and fake reviews violate platform rules and consumer-protection law, and they put your listing at risk. We ask, at the right time, and make it easy.",
      },
      {
        q: "Can requests go out automatically after a visit?",
        a: (
          <>
            Often, if your practice-management or messaging system supports it. We&apos;ll confirm during an{" "}
            <Link className="v-link" href={`${ROUTES.integrations}#request`}>
              integration assessment
            </Link>
            ; otherwise a simple daily export works well.
          </>
        ),
      },
    ],
  },

  cta: {
    title: (
      <>
        See how your reputation <span className="v-neon">compares locally</span>.
      </>
    ),
    lead: "We'll benchmark your ratings, review recency and responses against nearby practices, and show you what to fix first.",
    primary: { label: "Request a reputation audit", href: ROUTES.contact },
    secondary: { label: "See pricing", href: ROUTES.pricing },
  },
};

type MockReview = {
  rating: number;
  source: string;
  quote: string;
  status: string;
  /** "published" shows a green pill; "draft" highlights the card and shows an amber flag. */
  state: "published" | "draft";
};

/** Hero mock: a reputation inbox with two reviews and a privacy-safe reply draft. Illustrative only. */
export const MOCK: {
  tag: string;
  flag: string;
  reviews: MockReview[];
  reply: { tag: string; text: ReactNode; checks: string[] };
} = {
  tag: "Reputation inbox · Your Practice",
  flag: "Illustrative",
  reviews: [
    {
      rating: 5,
      source: "Search profile",
      quote: "“The front desk made scheduling so easy and the hygienist was wonderful.”",
      status: "Reply published",
      state: "published",
    },
    {
      rating: 2,
      source: "Directory site",
      quote: "“Waited forty minutes past my appointment time.”",
      status: "Draft ready · needs approval",
      state: "draft",
    },
  ],
  reply: {
    tag: "Suggested reply",
    text: (
      <>
        Thank you for this feedback. Long waits aren&apos;t the experience we want for anyone. We&apos;d value the chance to
        talk — please call our office manager at <Ph>[NUMBER]</Ph>.
      </>
    ),
    checks: ["Doesn't confirm they're a patient", "No visit or treatment details", "Moves the conversation offline"],
  },
};
