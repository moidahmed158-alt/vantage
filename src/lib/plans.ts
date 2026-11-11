// Plan packaging, shared by the home page preview and /pricing. Edit plan copy here.
import { ROUTES } from "./site";

export type PlanItem = {
  text: string;
  /** Small muted line under the item. */
  note?: string;
  /** Small pills under the item (e.g. AI platforms). */
  chips?: string[];
};

/** A titled list — used for the glowing highlight box. */
export type PlanGroup = { title: string; items: PlanItem[] };

export type Plan = {
  id: string;
  tier: string;
  tagline: string;
  headline: string;
  note: string;
  popular?: boolean;
  /** One continuous checklist (no section headings), so the card reads compact. */
  items: PlanItem[];
  /** Optional glowing box at the foot of the feature list. */
  highlight?: PlanGroup;
  cta: { label: string; href: string };
};

export const AI_PLATFORMS = ["ChatGPT", "Gemini", "Perplexity", "Copilot", "Claude"];

/** Included in every plan. */
const GOOGLE_ANALYTICS: PlanItem = { text: "Google Analytics (GA4)" };
const LIVE_SUPPORT: PlanItem = { text: "24-hour live phone support" };
const WEBSITE_OWNERSHIP: PlanItem = { text: "100% website ownership", note: "Design, content & domain — yours to keep" };
const OFFSITE_SEO: PlanItem = { text: "Off-site SEO (backlinks)" };

export const PLANS: Plan[] = [
  {
    id: "essential",
    tier: "Essential",
    tagline: "Single location. Core channels.",
    headline: "Best for new and growing practices.",
    note: "Shaped around your specialty and local market. We size the plan to fit.",
    items: [
      { text: "Review monitoring & alerts" },
      { text: "Custom website", note: "Hosting · speed monitoring · accessibility checks" },
      WEBSITE_OWNERSHIP,
      { text: "Google Business Profile optimization" },
      { text: "SEO keyword research" },
      { text: "Local SEO for your core services" },
      { text: "AI search visibility", note: "Structured data & consistent practice facts", chips: AI_PLATFORMS },
      GOOGLE_ANALYTICS,
      LIVE_SUPPORT,
    ],
    cta: { label: "Start with Essential", href: ROUTES.contact },
  },
  {
    id: "growth",
    tier: "Growth",
    tagline: "Established practice. Every core channel.",
    headline: "What most established practices choose.",
    note: "Shaped around your specialty and local market. We size the plan to fit.",
    popular: true,
    items: [
      { text: "Automated review requests & monitoring" },
      { text: "EHR/EMR integrations", note: "Review requests triggered by completed visits" },
      { text: "70+ online profile management", note: "Listings kept accurate across directories & maps" },
      { text: "Custom website", note: "Conversion-focused patient paths · mobile-first booking" },
      WEBSITE_OWNERSHIP,
      { text: "HTML5 build" },
      { text: "Google Business Profile optimization" },
      { text: "Blogs" },
      { text: "Medical schema markup" },
      { text: "JSON-LD structured data" },
      { text: "AI search visibility", note: "AI visibility monitoring", chips: AI_PLATFORMS },
      { text: "Lead management" },
      { text: "Two-way texting" },
    ],
    highlight: {
      title: "Growth layer",
      items: [
        { text: "Advanced SEO" },
        OFFSITE_SEO,
        { text: "AI voice SEO" },
        { text: "Growth dashboard" },
        { text: "SEO keyword research" },
        { text: "Expanded SEO & ongoing treatment-page content" },
        GOOGLE_ANALYTICS,
        LIVE_SUPPORT,
      ],
    },
    cta: { label: "Book a strategy call", href: ROUTES.contact },
  },
  {
    id: "elite",
    tier: "Elite",
    tagline: "Two or more locations. Every location.",
    headline: "Built for multi-location groups.",
    note: "Group structure and custom integrations factored in.",
    items: [
      { text: "Everything in Growth, for every location", note: "Reputation · website · SEO · AI visibility — scaled per location" },
      OFFSITE_SEO,
      { text: "Location pages & profiles for every office" },
      { text: "Consolidated multi-location reporting" },
      GOOGLE_ANALYTICS,
      { text: "Multiple & custom integrations" },
      { text: "Named team & priority support" },
      LIVE_SUPPORT,
    ],
    cta: { label: "Talk to us about your group", href: ROUTES.contact },
  },
];
