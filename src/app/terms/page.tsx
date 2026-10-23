import type { Metadata } from "next";
import { Ph } from "@/components/ui/Flag";
import { SITE } from "@/lib/site";
import { LegalLayout, type LegalSection } from "../privacy/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the Vantage Digital Health website.",
};

// Draft legal copy — kept verbatim from the design, placeholders included. Counsel to review before publishing.
const NOTICE = (
  <>
    <strong>Draft for legal review — not approved legal text.</strong> No terms exist on the current site. Counsel should
    confirm every section, the governing law and the liability language before publication.
  </>
);

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Acceptance",
    body: (
      <p>
        By using vantagedigitalhealth.com, you agree to these terms. If you don&apos;t agree, please don&apos;t use the
        site.
      </p>
    ),
  },
  {
    heading: "2. No medical advice",
    body: (
      <p>
        Vantage provides marketing and technology services to healthcare businesses. Nothing on this website is medical,
        legal or compliance advice.
      </p>
    ),
  },
  {
    heading: "3. Use of the site",
    body: (
      <ul>
        <li>Use the site lawfully and don&apos;t interfere with its operation or security.</li>
        <li>Don&apos;t submit patient information or other sensitive health information through the site.</li>
        <li>Don&apos;t copy or scrape content beyond normal browsing without permission.</li>
      </ul>
    ),
  },
  {
    heading: "4. Our content",
    body: (
      <p>
        The website, its design, text, graphics and the Vantage name and mark belong to Vantage or its licensors. Brand
        names of third-party software are the property of their owners and are referenced for identification only; their
        mention does not imply partnership or endorsement.
      </p>
    ),
  },
  {
    heading: "5. Services are governed separately",
    body: (
      <p>
        Any services we provide are governed by a separate written agreement with each client, not by these terms.
      </p>
    ),
  },
  {
    heading: "6. Third-party links",
    body: (
      <p>
        Links to other sites are provided for convenience. We&apos;re not responsible for their content or practices.
      </p>
    ),
  },
  {
    heading: "7. Disclaimers",
    body: (
      <p>
        The site is provided “as is”. Examples, illustrations and case studies describe specific circumstances; results
        vary and are not guaranteed. <Ph>[COUNSEL TO DRAFT WARRANTY DISCLAIMER]</Ph>
      </p>
    ),
  },
  {
    heading: "8. Limitation of liability",
    body: (
      <p>
        <Ph>[COUNSEL TO DRAFT]</Ph>
      </p>
    ),
  },
  {
    heading: "9. Governing law",
    body: (
      <p>
        These terms are governed by the laws of <Ph>[STATE / JURISDICTION]</Ph>.
      </p>
    ),
  },
  {
    heading: "10. Changes",
    body: <p>We may update these terms; continued use means you accept the updated version.</p>,
  },
  {
    heading: "11. Contact",
    body: (
      <p>
        <a className="v-link" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      current="terms"
      eyebrow="Terms of Use"
      title="Terms for using this website."
      meta={
        <>
          Effective date: <Ph>[DATE]</Ph>
        </>
      }
      notice={NOTICE}
      sections={SECTIONS}
    />
  );
}
