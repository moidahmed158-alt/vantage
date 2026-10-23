import type { ReactNode } from "react";
import type { AccordionItem } from "@/components/ui/Accordion";
import type { ROUTES } from "@/lib/site";

/** Shape of the copy every service detail page provides (see each page's `content.tsx`). */

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
export type CtaLink = { label: string; href: string };

export type HeroCopy = {
  /** Current-page label in the "Home / Services / …" breadcrumb. */
  crumb: string;
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  primary: CtaLink;
  secondary: CtaLink;
};

/** A titled point: an included feature, a "why healthcare is different" row, or a process step. */
export type Point = { title: string; body: ReactNode };

export type BlockCopy<T> = { eyebrow: string; title: ReactNode; lead?: ReactNode; items: T[] };

export type MeasureCopy = { tag: string; title: string; note?: string; chips: string[] };

export type RelatedCopy = {
  title: string;
  allLabel: string;
  /** Card tag ("Be found") and title come from SERVICE_GROUPS in src/lib/site.ts unless overridden here. */
  items: { href: Route; body: string; title?: string; tag?: string }[];
};

export type ServiceCopy = {
  meta: { title: string; description: string };
  hero: HeroCopy;
  included: BlockCopy<Point>;
  why: BlockCopy<Point>;
  /** Steps are numbered automatically ("01 · Audit"). */
  process: BlockCopy<Point> & { measure: MeasureCopy };
  related: RelatedCopy;
  faq: BlockCopy<AccordionItem>;
  cta: { title: ReactNode; lead: ReactNode; primary: CtaLink; secondary?: CtaLink };
};
