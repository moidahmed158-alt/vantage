import { Ph } from "@/components/ui/Flag";
import { ROUTES } from "@/lib/site";
import type { ServiceCopy } from "../_detail/types";

// All copy for /services/website-development, in page order. The hero mock UI copy is in MOCK below.

/** Jump target for the hero's "What's included" button. */
export const INCLUDED_ID = "website-included";

export const COPY: ServiceCopy = {
  meta: {
    title: "Healthcare Website Development",
    description:
      "Fast, accessible, mobile-first websites for medical and dental practices — designed to earn trust and make booking the obvious next step.",
  },

  hero: {
    crumb: "Website Development",
    eyebrow: "Be chosen · Website development",
    title: (
      <>
        A website that earns trust — and <span className="v-grad">books the appointment</span>.
      </>
    ),
    lead: "Your website is where a patient decides whether you're the right practice. We design and build fast, accessible, mobile-first sites that explain your care clearly, show the people behind it and make the next step obvious.",
    primary: { label: "Request a website review", href: ROUTES.contact },
    secondary: { label: "What's included", href: `#${INCLUDED_ID}` },
  },

  included: {
    eyebrow: "What's included",
    title: "Everything a practice website has to get right.",
    items: [
      {
        title: "Patient-first structure",
        body: "Information architecture built around what patients look for: services, providers, insurance, locations and how to book.",
      },
      {
        title: "Distinctive, credible design",
        body: "A look that reflects your practice — real photography, provider credentials and a tone that fits your patients.",
      },
      {
        title: "Performance on mobile",
        body: "Optimized images, lean code and Core Web Vitals monitoring, because most patients will meet you on a phone.",
      },
      {
        title: "Accessibility",
        body: "Designed and tested toward WCAG 2.2 AA: contrast, keyboard access, readable type and meaningful alt text, with a review before launch.",
      },
      {
        title: "Conversion paths",
        body: "Click-to-call, short forms, and online booking where your scheduling system supports it — each one tracked.",
      },
      {
        title: "Privacy-aware forms & tracking",
        body: "Forms collect only what's needed, and analytics are configured so health information isn't passed to third parties.",
      },
    ],
  },

  why: {
    eyebrow: "Why healthcare is different",
    title: (
      <>
        A practice site isn&apos;t a <span className="v-neon">brochure</span>.
      </>
    ),
    items: [
      {
        title: "Credibility is clinical",
        body: "Patients look for credentials, affiliations, real faces and plain explanations of treatment. Stock imagery and vague claims read as risk.",
      },
      {
        title: "Accessibility isn't optional",
        body: "Your patients include older adults and people with disabilities. An accessible site serves them — and reduces legal exposure.",
      },
      {
        title: "Forms carry privacy weight",
        body: "Intake and contact forms shouldn't collect health details unless the whole stack is set up to handle them appropriately. We decide that deliberately, with you.",
      },
    ],
  },

  process: {
    eyebrow: "How we build",
    title: "From discovery to a site that keeps improving.",
    items: [
      {
        title: "Discover",
        body: "Goals, patient audiences, services to prioritize and an audit of your current site and rankings.",
      },
      {
        title: "Architect & design",
        body: "Sitemap, content plan and design system, reviewed with your team before build.",
      },
      {
        title: "Build & test",
        body: "Development, redirects to protect existing rankings, accessibility and performance testing.",
      },
      {
        title: "Launch & improve",
        body: "Monitored launch, then ongoing updates and conversion improvements.",
      },
    ],
    measure: {
      tag: "What we measure",
      title: "Success looks like booked visits, not page views.",
      chips: [
        "Calls & form inquiries",
        "Online booking starts & completions",
        "Mobile conversion rate",
        "Core Web Vitals",
        "Accessibility issues resolved",
      ],
    },
  },

  related: {
    title: "Works best with",
    allLabel: "All services",
    items: [
      { href: ROUTES.healthcareSeo, body: "So the new site is found for the treatments you want more of." },
      { href: ROUTES.reputationManagement, body: "Reviews that back up everything the site says." },
      { href: ROUTES.integrations, body: "Online booking and tracking connected to your scheduling system." },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Website questions.",
    items: [
      {
        q: "Will a redesign hurt our current rankings?",
        a: "Not if the migration is planned properly. We map existing URLs, preserve what ranks, set redirects and monitor search performance through launch.",
      },
      {
        q: "Which platform do you build on?",
        a: (
          <>
            We recommend a platform after discovery, based on how your team will edit content, what you need to integrate and
            long-term cost. <Ph>[CONFIRM SUPPORTED PLATFORMS]</Ph>
          </>
        ),
      },
      {
        q: "Is the website HIPAA-compliant?",
        a: "HIPAA applies to how protected health information is collected, stored and shared — not to a website as a whole. If your site needs to collect health information (for example, intake forms), the hosting, form tools and vendors involved need appropriate safeguards and agreements. We'll design around that with your compliance lead rather than attach a label.",
      },
      {
        q: "How long does a new site take?",
        a: (
          <>
            It depends on page count, content readiness and integrations. You&apos;ll get a dated plan after discovery.{" "}
            <Ph>[TYPICAL TIMELINE]</Ph>
          </>
        ),
      },
    ],
  },

  cta: {
    title: (
      <>
        Find out what your current website is <span className="v-neon">costing you</span>.
      </>
    ),
    lead: "We'll review speed, accessibility, trust signals and booking paths, and show you the changes most likely to increase inquiries.",
    primary: { label: "Request a website review", href: ROUTES.contact },
    secondary: { label: "See pricing", href: ROUTES.pricing },
  },
};

/** Hero mock: a concept practice homepage in a browser frame, with numbered callouts. Illustrative only. */
export const MOCK = {
  caption: "Illustrative concept",
  url: "yourpractice.com",
  brand: "Your Practice",
  navCta: "Book a visit",
  headline: "Gentle, modern dental care for the whole family.",
  ctas: { primary: "Book online", secondary: "Call the office" },
  photo: "Real team photo",
  services: ["Cleanings & exams", "Implants", "Emergency care"],
  /** Numbered callouts floating over the mockup (listed under it on phones). */
  callouts: ["Booking path above the fold", "Real people, credentials", "Fast & accessible on mobile"],
};
