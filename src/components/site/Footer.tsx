import Link from "next/link";
import { Btn } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Mark";
import { ROUTES, SITE } from "@/lib/site";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "All services", href: ROUTES.services },
      { label: "Website Development", href: ROUTES.websiteDevelopment },
      { label: "Reputation Management", href: ROUTES.reputationManagement },
      { label: "Video & Photography", href: ROUTES.videoPhotography },
      { label: "Healthcare SEO", href: ROUTES.healthcareSeo },
      { label: "Answer Engine Optimization", href: ROUTES.aeo },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Integrations directory", href: ROUTES.integrations },
      { label: "Integration assessment", href: `${ROUTES.integrations}#request` },
      { label: "Dental specialties", href: `${ROUTES.specialties}#dental` },
      { label: "Medical specialties", href: `${ROUTES.specialties}#medical` },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Vantage", href: ROUTES.about },
      { label: "Pricing", href: ROUTES.pricing },
      { label: "Contact", href: ROUTES.contact },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides & glossary", href: ROUTES.resources },
      { label: "FAQ", href: `${ROUTES.resources}#faq` },
      { label: "Privacy Policy", href: ROUTES.privacy },
      { label: "Terms of Use", href: ROUTES.terms },
    ],
  },
];

export function Footer() {
  return (
    <footer className="v-ftr v-glow-b">
      <div className="v-beamline" style={{ top: 0 }} />
      <div className="v-wrap">
        <div className="v-ftr-grid">
          <div className="v-ftr-brand">
            <Logo size={46} />
            <p>{SITE.tagline} The growth partner for medical and dental practices that intend to lead their market.</p>
            <a className="v-alink" href={`mailto:${SITE.email}`} style={{ color: "var(--cyan2)" }}>
              {SITE.email}
            </a>
            <Btn href={ROUTES.contact} size="sm" arrow>
              Book a strategy call
            </Btn>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2>{col.title}</h2>
              <div className="v-ftr-links">
                {col.links.map((l) => (
                  <Link key={l.label} href={l.href}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="v-ftr-base">
          <span>
            © {SITE.year} {SITE.name}. All rights reserved.
          </span>
          <nav aria-label="Legal">
            <Link href={ROUTES.privacy}>Privacy Policy</Link>
            <Link href={ROUTES.terms}>Terms of Use</Link>
            <Link href={ROUTES.contact}>Accessibility feedback</Link>
          </nav>
        </div>
      </div>
      <div className="v-ftr-mark" aria-hidden="true">
        VANTAGE
      </div>
    </footer>
  );
}
