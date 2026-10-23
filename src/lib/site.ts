// Site-wide constants. Copy that appears on many pages lives here so it can be edited once.

export const SITE = {
  name: "Vantage Digital Health",
  short: "Vantage",
  tagline: "Seen. Trusted. Chosen.",
  description:
    "Vantage helps medical and dental practices get seen, trusted and chosen — connecting website, SEO, AEO, reputation and practice software into one growth system.",
  url: "https://www.vantagedigitalhealth.com",
  email: "hello@vantagedigitalhealth.com",
  year: 2026,
};

/**
 * Amber "verify before publishing" flags and [PLACEHOLDER] chips from the design review.
 * Leave on while copy is being finalised; set to false to hide every flag site-wide.
 */
export const SHOW_CONTENT_FLAGS = true;

export const ROUTES = {
  home: "/",
  services: "/services",
  integrations: "/integrations",
  pricing: "/pricing",
  about: "/about",
  contact: "/contact",
  specialties: "/specialties",
  resources: "/resources",
  privacy: "/privacy",
  terms: "/terms",
  brand: "/brand",
  websiteDevelopment: "/services/website-development",
  reputationManagement: "/services/reputation-management",
  healthcareSeo: "/services/healthcare-seo",
  aeo: "/services/answer-engine-optimization",
} as const;

export type NavLink = { label: string; href: string; desc?: string };

export const SERVICE_GROUPS: { tag: string; title: string; links: NavLink[] }[] = [
  {
    tag: "01 · Be found",
    title: "Be found",
    links: [
      { label: "Healthcare SEO", href: ROUTES.healthcareSeo, desc: "Specialty, location and local map visibility" },
      { label: "Answer Engine Optimization", href: ROUTES.aeo, desc: "Be the practice AI assistants cite" },
    ],
  },
  {
    tag: "02 · Be chosen",
    title: "Be chosen",
    links: [
      { label: "Website Development", href: ROUTES.websiteDevelopment, desc: "Fast, accessible sites built to book" },
      { label: "Reputation Management", href: ROUTES.reputationManagement, desc: "Reviews, monitoring and response" },
    ],
  },
  {
    tag: "03 · Be connected",
    title: "Be connected",
    links: [
      { label: "Healthcare Integrations", href: ROUTES.integrations, desc: "EHR, PM, scheduling, CRM and more" },
      { label: "Growth strategy & reporting", href: `${ROUTES.services}#strategy`, desc: "One roadmap, one report" },
    ],
  },
];

/** Specialty slugs double as anchor ids on /specialties. */
export const SPECIALTIES = {
  dental: [
    { slug: "general-dentistry", label: "General & family dentistry" },
    { slug: "orthodontics", label: "Orthodontics" },
    { slug: "implants-cosmetic", label: "Implants & cosmetic dentistry" },
    { slug: "pediatric-dentistry", label: "Pediatric dentistry" },
  ],
  medical: [
    { slug: "dermatology", label: "Dermatology" },
    { slug: "plastic-surgery", label: "Plastic & aesthetic surgery" },
    { slug: "medical-spas", label: "Medical spas" },
    { slug: "primary-care", label: "Primary care" },
    { slug: "orthopedics", label: "Orthopedics" },
  ],
};

export const specialtyHref = (slug: string) => `${ROUTES.specialties}#${slug}`;

export const PRIMARY_NAV: NavLink[] = [
  { label: "Integrations", href: ROUTES.integrations },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Resources", href: ROUTES.resources },
  { label: "About", href: ROUTES.about },
];
