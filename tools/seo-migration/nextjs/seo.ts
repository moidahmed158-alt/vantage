// Drop-in for a migrated practice site — copy to src/lib/seo.ts and fill in PRACTICE.
// Keeps each page's old title and description (migration/metadata.json, written by crawl.mjs) and
// builds the practice's JSON-LD so every page's schema points back to one practice entity.
import type { Metadata } from "next";
import preserved from "../../migration/metadata.json";

export const PRACTICE = {
  /** schema.org type. Keep what the old site used (crawl.mjs prints it): Dentist, MedicalClinic, Physician, Optician… */
  type: "Dentist",
  name: "Practice Name",
  /** Production origin, no trailing slash. */
  url: "https://www.example.com",
  telephone: "+1-555-555-5555",
  address: { streetAddress: "123 Main St", addressLocality: "City", addressRegion: "ST", postalCode: "00000", addressCountry: "US" },
  geo: { latitude: 0, longitude: 0 },
  hours: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" }],
  logo: "/logo.png",
  image: "/office.jpg",
  /** schema.org MedicalSpecialty names: Dentistry, Dermatology, PlasticSurgery, PrimaryCare, Musculoskeletal… */
  specialties: ["Dentistry"],
  /** Google Business Profile, Facebook, Yelp, Healthgrades — at least the profiles the old site's schema listed. */
  sameAs: [] as string[],
};

const abs = (path: string) => new URL(path, PRACTICE.url).href;
export const PRACTICE_ID = abs("/#practice");
export const WEBSITE_ID = abs("/#website");

/* ------------------------------------------------------------- metadata ---- */

const PRESERVED: Record<string, { title?: string; description?: string }> = preserved;
const oldMeta = (path: string) => PRESERVED[path] ?? PRESERVED[path.replace(/\/$/, "")] ?? PRESERVED[`${path}/`] ?? {};

/**
 * Metadata for one page. Title and description default to what the old site served at `oldPath`
 * (the same path unless the URL changed) — the wording Google already ranks. Pass `title` or
 * `description` only to rewrite them on purpose.
 */
export function pageMetadata(
  path: string,
  opts: { oldPath?: string; title?: string; description?: string; image?: string } = {},
): Metadata {
  const old = oldMeta(opts.oldPath ?? path);
  const title = opts.title ?? old.title;
  const description = opts.description ?? old.description;
  return {
    // absolute: the old titles already include the practice name, so skip the layout's title template.
    ...(title && { title: { absolute: title } }),
    ...(description && { description }),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: PRACTICE.name,
      url: path,
      ...(title && { title }),
      ...(description && { description }),
      ...(opts.image && { images: [opts.image] }),
    },
  };
}

/* --------------------------------------------------------------- schema ---- */

/** The practice itself. Render once in the root layout, with websiteSchema(). */
export function practiceSchema() {
  return {
    "@type": PRACTICE.type,
    "@id": PRACTICE_ID,
    name: PRACTICE.name,
    url: abs("/"),
    telephone: PRACTICE.telephone,
    image: abs(PRACTICE.image),
    logo: abs(PRACTICE.logo),
    address: { "@type": "PostalAddress", ...PRACTICE.address },
    geo: { "@type": "GeoCoordinates", ...PRACTICE.geo },
    openingHoursSpecification: PRACTICE.hours.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    medicalSpecialty: PRACTICE.specialties.map((s) => `https://schema.org/${s}`),
    sameAs: PRACTICE.sameAs,
  };
}

export function websiteSchema() {
  return { "@type": "WebSite", "@id": WEBSITE_ID, url: abs("/"), name: PRACTICE.name, publisher: { "@id": PRACTICE_ID } };
}

export type Provider = {
  path: string;
  name: string;
  /** "DDS", "MD", "DO"… */
  honorificSuffix?: string;
  jobTitle?: string;
  image?: string;
  description?: string;
  /** Physicians only: IndividualPhysician with NPI and specialties. Dentists and others are a Person. */
  physician?: { npi?: string; specialties?: string[] };
  sameAs?: string[];
};

const providerId = (p: Provider) => abs(`${p.path}#person`);

export function providerSchema(p: Provider) {
  return {
    "@type": p.physician ? "IndividualPhysician" : "Person",
    "@id": providerId(p),
    name: p.name,
    honorificSuffix: p.honorificSuffix,
    jobTitle: p.jobTitle,
    url: abs(p.path),
    image: p.image && abs(p.image),
    description: p.description,
    sameAs: p.sameAs,
    ...(p.physician
      ? { practicesAt: { "@id": PRACTICE_ID }, usNPI: p.physician.npi, medicalSpecialty: p.physician.specialties?.map((s) => `https://schema.org/${s}`) }
      : { worksFor: { "@id": PRACTICE_ID } }),
  };
}

export type Service = {
  path: string;
  name: string;
  description: string;
  image?: string;
  /** Most treatments are a MedicalProcedure; use MedicalTherapy for ongoing treatment, MedicalTest for diagnostics. */
  kind?: "MedicalProcedure" | "MedicalTherapy" | "MedicalTest";
  /** The provider who reviewed the page, and when (YYYY-MM-DD) — a trust signal for medical content. */
  reviewedBy?: Provider;
  lastReviewed?: string;
};

/** A treatment page: the page itself, published by the practice, about the procedure. */
export function servicePageSchema(s: Service) {
  const url = abs(s.path);
  return [
    {
      "@type": "MedicalWebPage",
      "@id": `${url}#webpage`,
      url,
      name: s.name,
      description: s.description,
      isPartOf: { "@id": WEBSITE_ID },
      publisher: { "@id": PRACTICE_ID },
      about: { "@id": `${url}#service` },
      ...(s.reviewedBy && { reviewedBy: { "@id": providerId(s.reviewedBy) } }),
      lastReviewed: s.lastReviewed,
    },
    { "@type": s.kind ?? "MedicalProcedure", "@id": `${url}#service`, name: s.name, description: s.description, url, image: s.image && abs(s.image) },
  ];
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: abs(item.path) })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
