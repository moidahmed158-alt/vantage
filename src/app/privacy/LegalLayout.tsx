import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { ROUTES, SHOW_CONTENT_FLAGS } from "@/lib/site";
import { TocCompact, TocRail, type TocItem } from "./LegalToc";
import s from "./legal.module.css";

/**
 * Shared layout for the legal drafts (/privacy and /terms).
 * Wide screens: legal-page nav + sticky "On this page" rail beside the prose.
 * Below 1080px: the nav stacks on top and the contents collapse into a <details> above the first section.
 */

// Copy shared by both legal pages.
const LEGAL_NAV_LABEL = "Legal";
const LEGAL_PAGES = [
  { key: "privacy", label: "Privacy Policy", href: ROUTES.privacy },
  { key: "terms", label: "Terms of Use", href: ROUTES.terms },
] as const;
const TOC_LABEL = "On this page";

export type LegalKey = (typeof LEGAL_PAGES)[number]["key"];

/** One numbered section of a legal page. `heading` is shown verbatim and also generates the anchor id. */
export type LegalSection = { heading: string; body: ReactNode };

/** GitHub-style slug: "2. Please don't send health information" -> "2-please-dont-send-health-information". */
function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toTocItems(sections: LegalSection[]): TocItem[] {
  const seen = new Map<string, number>();
  return sections.map(({ heading }) => {
    const base = slugify(heading) || "section";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    const match = heading.match(/^(\d+)\.\s+(.*)$/);
    return {
      id: n ? `${base}-${n}` : base,
      num: match ? match[1] : "",
      label: match ? match[2] : heading,
    };
  });
}

export function LegalLayout({
  current,
  eyebrow,
  title,
  meta,
  notice,
  sections,
}: {
  current: LegalKey;
  eyebrow: string;
  title: ReactNode;
  /** Effective / last-updated line under the title. */
  meta: ReactNode;
  /** "Draft for legal review" note; shown only while SHOW_CONTENT_FLAGS is on. */
  notice?: ReactNode;
  sections: LegalSection[];
}) {
  const toc = toTocItems(sections);

  return (
    <section className={`v-glow-tr ${s.page}`}>
      <div className={`v-wrap ${s.layout}`}>
        <div className={s.side}>
          <div className={`${s.sideIn} v-rise`}>
            <nav aria-label="Legal pages" className={s.legalNav}>
              <span className="v-tag">{LEGAL_NAV_LABEL}</span>
              <ul className={s.legalList}>
                {LEGAL_PAGES.map((p) => (
                  <li key={p.key}>
                    <Link
                      href={p.href}
                      className={`v-alink ${s.legalLink}`}
                      aria-current={p.key === current ? "page" : undefined}
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <TocRail items={toc} label={TOC_LABEL} />
          </div>
        </div>

        <article className={`v-prose ${s.article}`}>
          {SHOW_CONTENT_FLAGS && notice && (
            <div className={`v-notice v-notice--warn v-rise ${s.notice}`} role="note">
              <Icon name="info" size={20} strokeWidth={2} />
              <span>{notice}</span>
            </div>
          )}
          <p className="v-eyebrow v-rise v-d1">{eyebrow}</p>
          <h1 className={`v-display v-h1--page v-rise v-d2 ${s.title}`}>{title}</h1>
          <p className={`v-hint v-rise v-d3 ${s.meta}`}>{meta}</p>

          <TocCompact items={toc} label={TOC_LABEL} />

          {sections.map((section, i) => {
            const item = toc[i];
            return (
              <Fragment key={item.id}>
                <h2 id={item.id}>
                  {item.num ? (
                    <>
                      <span className={s.h2Num}>{item.num}.</span> {item.label}
                    </>
                  ) : (
                    section.heading
                  )}
                </h2>
                {section.body}
              </Fragment>
            );
          })}
        </article>
      </div>
    </section>
  );
}
