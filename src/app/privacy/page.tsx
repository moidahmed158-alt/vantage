import type { Metadata } from "next";
import { Ph } from "@/components/ui/Flag";
import { SITE } from "@/lib/site";
import { LegalLayout, type LegalSection } from "./LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Vantage Digital Health collects, uses and protects information submitted through this website.",
};

// Draft legal copy — kept verbatim from the design, placeholders included. Counsel to review before publishing.
const NOTICE = (
  <>
    <strong>Draft for legal review — not approved legal text.</strong> The current site has no privacy policy (its link
    points to a missing anchor). This structure and wording are a starting point for qualified counsel, who must confirm
    applicable laws, vendors and practices before publication.
  </>
);

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Who we are",
    body: (
      <p>
        This policy describes how Vantage Digital Health (“Vantage”, “we”, “us”) collects and uses information through
        vantagedigitalhealth.com. Legal entity and address: <Ph>[LEGAL ENTITY NAME, ADDRESS]</Ph>.
      </p>
    ),
  },
  {
    heading: "2. Please don't send health information",
    body: (
      <p>
        This website is for practices and healthcare businesses interested in our services. Please do not submit patient
        information or personal health information through our forms or by email.
      </p>
    ),
  },
  {
    heading: "3. Information we collect",
    body: (
      <ul>
        <li>
          <strong>Information you give us</strong> — for example your name, practice name, role, email, phone number and
          details of your inquiry.
        </li>
        <li>
          <strong>Information collected automatically</strong> — such as device and browser type, pages viewed and
          referring sites, through cookies or similar technologies. <Ph>[LIST ANALYTICS &amp; TAG VENDORS]</Ph>
        </li>
      </ul>
    ),
  },
  {
    heading: "4. How we use information",
    body: (
      <ul>
        <li>To respond to inquiries and provide requested information or services.</li>
        <li>To operate, secure and improve the website.</li>
        <li>To send service-related communications and, where permitted, marketing you can opt out of.</li>
      </ul>
    ),
  },
  {
    heading: "5. How we share information",
    body: (
      <p>
        We share information with service providers that help us run the website and our business, under contractual
        obligations to protect it. We do not sell personal information.{" "}
        <Ph>[CONFIRM — INCLUDING ANY “SALE/SHARING” DEFINITIONS UNDER APPLICABLE STATE LAWS]</Ph>
      </p>
    ),
  },
  {
    heading: "6. Cookies and analytics",
    body: (
      <p>
        We use cookies and similar technologies for essential site functions and analytics. You can control cookies in your
        browser settings. <Ph>[COOKIE CONSENT APPROACH &amp; OPT-OUT MECHANISMS]</Ph>
      </p>
    ),
  },
  {
    heading: "7. Client data and HIPAA",
    body: (
      <p>
        When we provide services to healthcare clients that involve protected health information, that information is
        governed by our agreements with those clients, including Business Associate Agreements where required — not by this
        website policy. <Ph>[CONFIRM WITH COUNSEL]</Ph>
      </p>
    ),
  },
  {
    heading: "8. Retention and security",
    body: (
      <p>
        We keep information only as long as needed for the purposes above or as required by law, and use reasonable
        safeguards to protect it. <Ph>[RETENTION PERIODS]</Ph>
      </p>
    ),
  },
  {
    heading: "9. Your choices and rights",
    body: (
      <p>
        Depending on where you live, you may have rights to access, correct, delete or limit use of your personal
        information. To make a request, contact us using the details below. <Ph>[JURISDICTIONS &amp; RIGHTS TO CONFIRM]</Ph>
      </p>
    ),
  },
  {
    heading: "10. Children",
    body: <p>This website is intended for businesses and is not directed to children.</p>,
  },
  {
    heading: "11. Changes",
    body: <p>We may update this policy. The “last updated” date above shows when it last changed.</p>,
  },
  {
    heading: "12. Contact",
    body: (
      <p>
        Questions about this policy:{" "}
        <a className="v-link" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>{" "}
        <Ph>[CONFIRM PRIVACY CONTACT]</Ph>
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      current="privacy"
      eyebrow="Privacy Policy"
      title="How we handle your information."
      meta={
        <>
          Effective date: <Ph>[DATE]</Ph> · Last updated: <Ph>[DATE]</Ph>
        </>
      }
      notice={NOTICE}
      sections={SECTIONS}
    />
  );
}
