import Link from "next/link";
import { ROUTES } from "@/lib/site";
import type { ServiceCopy } from "../_detail/types";

// All copy for /services/healthcare-seo, in page order. The hero mock UI copy is in MOCK below.

/** Jump target for the hero's "What's included" button. */
export const INCLUDED_ID = "seo-included";

export const COPY: ServiceCopy = {
  meta: {
    title: "Healthcare SEO",
    description:
      "Technical SEO, specialty and location pages, local map visibility and Google Business Profile optimization for medical and dental practices.",
  },

  hero: {
    crumb: "Healthcare SEO",
    eyebrow: "Be found · Healthcare SEO",
    title: (
      <>
        Be the practice patients find <span className="v-grad">when it matters</span>.
      </>
    ),
    lead: "Patients search by treatment, symptom and neighborhood. Healthcare SEO makes your practice the clearest, most credible result for those searches — in organic results and on the map.",
    primary: { label: "Request an SEO assessment", href: ROUTES.contact },
    secondary: { label: "What's included", href: `#${INCLUDED_ID}` },
  },

  included: {
    eyebrow: "What's included",
    title: "Search visibility, built on substance.",
    items: [
      {
        title: "Technical SEO",
        body: "Crawlability, speed, site structure, internal linking and structured data — the foundation everything else depends on.",
      },
      {
        title: "Specialty & treatment pages",
        body: "Pages that answer what patients ask about each treatment, written in plain language and reviewed by your providers.",
      },
      {
        title: "Local & location SEO",
        body: "Location pages, consistent name-address-phone data and local citations for every office you run.",
      },
      {
        title: "Google Business Profile",
        body: "Categories, services, photos, hours, updates and Q&A managed so your map listing converts.",
      },
      {
        title: "Content strategy",
        body: "A plan driven by real patient questions and the services you want to grow — not volume for its own sake.",
      },
      {
        title: "Earned authority",
        body: "Local partnerships, professional associations and genuine mentions. No paid link schemes.",
      },
    ],
  },

  why: {
    eyebrow: "Why healthcare is different",
    title: (
      <>
        Health content is held to a <span className="v-neon">higher bar</span>.
      </>
    ),
    items: [
      {
        title: "Expertise has to be visible",
        body: "Search engines scrutinize health information closely. Clear authorship, provider credentials and medical review make that expertise evident.",
      },
      {
        title: "Accuracy over volume",
        body: "One accurate, genuinely helpful treatment page beats ten thin ones. We write for patients and have your clinicians sign off.",
      },
      {
        title: "Local intent dominates",
        body: "Most patients want care close to home. The map pack and your business profile often matter more than any blog post.",
      },
    ],
  },

  process: {
    eyebrow: "How it works",
    title: "Steady work that compounds.",
    items: [
      {
        title: "Audit",
        body: "Technical health, rankings, local listings and the competitors patients are choosing instead.",
      },
      {
        title: "Patient-intent map",
        body: "The treatment and location searches worth winning, prioritized by value to your practice.",
      },
      {
        title: "Build & optimize",
        body: "Fixes, pages and profile improvements shipped in a prioritized sequence.",
      },
      {
        title: "Measure & expand",
        body: "Track visibility and inquiries, then extend to the next set of services and locations.",
      },
    ],
    measure: {
      tag: "What we measure",
      title: "Visibility that turns into calls.",
      note: "SEO takes time and no one can guarantee rankings. We report honestly on what's moving.",
      chips: [
        "Visibility for priority searches",
        "Map pack presence",
        "Organic traffic to service pages",
        "Calls & forms from search",
        "Business profile actions",
      ],
    },
  },

  related: {
    title: "Works best with",
    allLabel: "All services",
    items: [
      { href: ROUTES.aeo, body: "Extend the same groundwork into AI-generated answers." },
      { href: ROUTES.reputationManagement, body: "Reviews strengthen local visibility and conversion." },
      { href: ROUTES.websiteDevelopment, body: "A fast, well-structured site that ranks and converts." },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "SEO questions.",
    items: [
      {
        q: "How long does SEO take to work?",
        a: "Technical and business-profile fixes can show effects relatively quickly; competitive treatment searches usually take months of consistent work. It depends on your market, your site's history and how strong competitors are. We'll set expectations in the assessment rather than promise a date.",
      },
      {
        q: "Who writes the content — and is it medically accurate?",
        a: "We research and draft in plain language; your providers review anything clinical before it's published. Their review is what makes the content trustworthy for patients and search engines alike.",
      },
      {
        q: "We have several locations. Does that change the approach?",
        a: "Yes. Each location needs its own accurate profile and a genuinely useful page — not duplicated text with a city name swapped in. We plan location architecture so offices support rather than compete with each other.",
      },
      {
        q: "What about AI search?",
        a: (
          <>
            Strong SEO is the foundation for AI visibility, and{" "}
            <Link className="v-link" href={ROUTES.aeo}>
              Answer Engine Optimization
            </Link>{" "}
            builds on it — making your facts consistent and citable for AI-generated answers.
          </>
        ),
      },
    ],
  },

  cta: {
    title: (
      <>
        Find out where you rank — <span className="v-neon">and why</span>.
      </>
    ),
    lead: "We'll show you where you appear for the treatments you care about, who is outranking you and the fixes most likely to change that.",
    primary: { label: "Request an SEO assessment", href: ROUTES.contact },
    secondary: { label: "See pricing", href: ROUTES.pricing },
  },
};

/** Hero mock: a search for a treatment, the map pack and an organic result. Illustrative only. */
export const MOCK = {
  tag: "Search results · Illustrative",
  flag: "Not client data",
  query: "dental implants near me",
  listing: { name: "Your Practice", meta: "Implant dentist · Open now · Book online", rank: "1" },
  /** Ranks shown on the two blurred competitor rows. */
  otherRanks: ["2", "3"],
  organic: {
    url: "yourpractice.com › dental-implants",
    title: "Dental Implants in Your City | Your Practice",
    body: "What to expect, candidacy, costs and financing — reviewed by our doctors.",
  },
};
