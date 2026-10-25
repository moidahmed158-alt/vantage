// Plan packaging, shared by the home page preview and /pricing. Edit plan copy here.
import { ROUTES } from "./site";

export type PlanItem = {
  text: string;
  /** Small muted line under the item. */
  note?: string;
  /** Small pills under the item (e.g. AI platforms). */
  chips?: string[];
};

export type PlanGroup = { title: string; items: PlanItem[] };

export type Plan = {
  id: string;
  tier: string;
  tagline: string;
  headline: string;
  note: string;
  popular?: boolean;
  groups: PlanGroup[];
  /** The glowing box at the foot of the feature list. */
  highlight: PlanGroup;
  cta: { label: string; href: string };
};

export const AI_PLATFORMS = ["ChatGPT", "Gemini", "Perplexity", "Copilot", "Claude"];

/** Included in every plan. */
const GOOGLE_ANALYTICS: PlanItem = { text: "Google Analytics (GA4)", note: "Set up so health information isn't collected" };

export const PLANS: Plan[] = [
  {
    id: "basic",
    tier: "Basic",
    tagline: "Single location. Core channels.",
    headline: "Best for new and growing practices.",
    note: "Shaped around your specialty and local market. We size the plan to fit.",
    groups: [
      {
        title: "Reputation",
        items: [{ text: "Automated review requests & monitoring" }],
      },
      {
        title: "Website & foundation",
        items: [
          { text: "Custom website", note: "Hosting · speed monitoring · accessibility checks" },
          { text: "Google Business Profile optimization" },
        ],
      },
      {
        title: "SEO coverage",
        items: [
          { text: "SEO keyword research" },
          { text: "Local SEO for your core services" },
          { text: "AI search visibility", note: "Structured data & consistent practice facts", chips: AI_PLATFORMS },
        ],
      },
    ],
    highlight: {
      title: "Growth layer",
      items: [GOOGLE_ANALYTICS, { text: "Privacy-aware analytics & call tracking" }, { text: "Reporting in patient terms" }],
    },
    cta: { label: "Start with Basic", href: ROUTES.contact },
  },
  {
    id: "growth",
    tier: "Growth",
    tagline: "Established practice. Every core channel.",
    headline: "What most established practices choose.",
    note: "Shaped around your specialty and local market. We size the plan to fit.",
    popular: true,
    groups: [
      {
        title: "Reputation",
        items: [
          { text: "Automated review requests & monitoring" },
          { text: "Review response drafting & approvals" },
          { text: "70+ online profile management", note: "Listings kept accurate across directories & maps" },
        ],
      },
      {
        title: "Website & foundation",
        items: [
          { text: "Custom website", note: "Conversion-focused patient paths · mobile-first booking" },
          { text: "HTML5 build" },
          { text: "Google Business Profile optimization" },
        ],
      },
      {
        title: "SEO coverage",
        items: [
          { text: "SEO keyword research" },
          { text: "Expanded SEO & ongoing treatment-page content" },
          { text: "Blogs" },
          { text: "Medical schema markup" },
          { text: "JSON-LD structured data" },
          { text: "AI search visibility", note: "AI visibility monitoring", chips: AI_PLATFORMS },
        ],
      },
      {
        title: "Leads & messaging",
        items: [{ text: "Lead management" }, { text: "Two-way texting" }],
      },
    ],
    highlight: {
      title: "Growth layer",
      items: [
        { text: "Growth dashboard" },
        { text: "One scheduling or PM integration", note: "Connected after an integration assessment" },
        GOOGLE_ANALYTICS,
        { text: "Privacy-aware analytics & call tracking" },
        { text: "Reporting in patient terms" },
        { text: "Named strategist & roadmap reviews" },
        { text: "Live phone customer support" },
      ],
    },
    cta: { label: "Book a strategy call", href: ROUTES.contact },
  },
  {
    id: "advanced",
    tier: "Advanced",
    tagline: "Two or more locations. Every location.",
    headline: "Built for multi-location groups and MSOs.",
    note: "Group structure and custom integrations factored in.",
    groups: [
      {
        title: "Foundation",
        items: [
          {
            text: "Everything in Growth, for every location",
            note: "Reputation · website · SEO · AI visibility — scaled per location",
          },
        ],
      },
      {
        title: "Multi-location",
        items: [{ text: "Location pages & profiles for every office" }, { text: "Consolidated multi-location reporting" }],
      },
    ],
    highlight: {
      title: "Growth layer",
      items: [GOOGLE_ANALYTICS, { text: "Multiple & custom integrations" }, { text: "Named team & priority support" }],
    },
    cta: { label: "Talk to us about your group", href: ROUTES.contact },
  },
];
