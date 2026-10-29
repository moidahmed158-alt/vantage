import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { LegalLayout, type LegalSection } from "../privacy/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the Vantage Digital Health website.",
};

// Terms use the support inbox rather than SITE.email (hello@).
const SUPPORT_EMAIL = "support@vantagedigitalhealth.com";
const LAST_UPDATED = "October 28, 2026";

const SupportEmail = () => (
  <a className="v-link" href={`mailto:${SUPPORT_EMAIL}`}>
    {SUPPORT_EMAIL}
  </a>
);

const SiteLink = () => (
  <a className="v-link" href={SITE.url}>
    {SITE.url}
  </a>
);

const SECTIONS: LegalSection[] = [
  {
    heading: "Welcome",
    body: (
      <>
        <p>
          Welcome to the website of Vantage Digital Health (“Company,” “we,” “us,” or “our”) located at <SiteLink />{" "}
          (the “Site”). Please read these Website Terms of Use (“Terms of Use”) carefully before browsing, accessing, or
          using our Site.
        </p>
        <p>
          By accessing or browsing this Site, submitting inquiries through our web forms, or using any public resources
          made available here, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to
          all of these terms, you must immediately discontinue use of this Site.
        </p>
      </>
    ),
  },
  {
    heading: "1. Scope & Relation to Master Services Agreement",
    body: (
      <>
        <p>
          These Terms of Use govern public access to and use of our informational marketing website, public blog posts,
          contact forms, and digital marketing resources.
        </p>
        <p>
          If you or your medical practice execute an Order Form, Statement of Work (SOW), or enter into a client
          relationship with Vantage Digital Health for custom web development, software environments, or
          hosting/maintenance services, such services are governed by our separate Master Services Agreement (MSA). In
          the event of any conflict between these Terms of Use and the Master Services Agreement, the Master Services
          Agreement shall control for active client accounts.
        </p>
      </>
    ),
  },
  {
    heading: "2. Digital Accessibility (ADA & WCAG Compliance Statement)",
    body: (
      <>
        <p>
          Vantage Digital Health is committed to ensuring digital accessibility for individuals with disabilities. We
          actively design, develop, and maintain our Site in alignment with prevailing web accessibility standards,
          including the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA and the Americans with Disabilities Act
          (ADA).
        </p>
        <p>
          <strong>Ongoing Commitment:</strong> We strive to ensure that all visitors—regardless of disability, sensory
          impairment, or assistive technology used—can seamlessly navigate, read, and interact with our public web pages
          and online submission forms.
        </p>
        <p>
          <strong>Accessibility Feedback &amp; Assistance:</strong> If you encounter any accessibility barriers, have
          difficulty reading content, or experience issues accessing any portion of this Site using assistive
          technologies, please contact us directly:
        </p>
        <ul>
          <li>
            <strong>Email:</strong> <SupportEmail />
          </li>
          <li>
            <strong>Response:</strong> We take web accessibility feedback seriously and will evaluate your request to
            provide the requested information or functionality through an accessible alternative communication method.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. Proprietary Rights & Content Ownership",
    body: (
      <>
        <p>
          All contents, materials, and digital assets on this Site—including but not limited to articles, blog posts,
          white papers, case studies, graphics, page layouts, code, logos, icons, audio/video clips, and brand marks—are
          the property of Vantage Digital Health or its licensors and are protected by applicable intellectual property
          laws, including copyright and trademark laws.
        </p>
        <p>
          <strong>Limited Grant:</strong> You are granted a non-exclusive, non-transferable, revocable, limited license to
          access and view content on the Site solely for personal, non-commercial, or evaluation purposes.
        </p>
        <p>
          <strong>Prohibited Uses:</strong> You may not:
        </p>
        <ul>
          <li>
            Copy, reproduce, republish, upload, post, transmit, or distribute any blog content, marketing copy, graphics,
            or code from this Site without explicit prior written authorization from Vantage Digital Health.
          </li>
          <li>
            Use automated tools, web scrapers, spiders, site search/retrieval applications, or data extraction scripts to
            scrape, harvest, mine, or index any portion of this Site or its content.
          </li>
          <li>Frame, mirror, or create derivative works from any part of this Site or its underlying source code.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "4. Acceptable Use & Prohibited Activities",
    body: (
      <>
        <p>
          You agree to use this Site solely for lawful purposes and in a manner that does not infringe upon the rights of
          Vantage Digital Health or any third party. You strictly agree not to:
        </p>
        <ul>
          <li>
            <strong>Form Abuse &amp; Spamming:</strong> Submit false, fraudulent, or misleading information, or send
            unsolicited commercial communications (spam), automated bot entries, or promotional pitch materials through
            our contact, audit request, or consultation forms.
          </li>
          <li>
            <strong>Security Interference:</strong> Attempt to breach, probe, test, or compromise the security,
            integrity, or vulnerability of the Site, its backend cloud hosting infrastructure, code repositories, or web
            servers.
          </li>
          <li>
            <strong>Malicious Code:</strong> Upload or transmit viruses, Trojan horses, malware, worms, ransomware, or any
            other destructive software.
          </li>
          <li>
            <strong>Impersonation:</strong> Impersonate any individual, practice representative, or entity, or falsely
            state or misrepresent your affiliation with a medical practice or Vantage Digital Health.
          </li>
        </ul>
        <p>
          We reserve the right to block, restrict, or terminate access to the Site for any visitor who violates these
          restrictions or engages in unauthorized automated scraping or form abuse.
        </p>
      </>
    ),
  },
  {
    heading: "5. Educational & Informational Purpose Only (No Medical or Legal Advice)",
    body: (
      <p>
        The information provided on this Site, including blog posts, case studies, digital strategy guides, and
        healthcare marketing advice, is provided for general informational and educational purposes only. It does not
        constitute professional legal, regulatory, or medical advice.
      </p>
    ),
  },
  {
    heading: "6. Third-Party Links & Platform Integrations",
    body: (
      <p>
        This Site may contain links or references to third-party web platforms, software partners, search engines, or
        review services (such as Google, Facebook, Yelp, GitHub, or Vercel). Vantage Digital Health does not control,
        endorse, or accept responsibility for the content, privacy policies, or practices of any third-party websites or
        services. Accessing third-party sites is done strictly at your own risk.
      </p>
    ),
  },
  {
    heading: "7. Disclaimer of Warranties",
    body: (
      <>
        <p>
          THIS SITE AND ALL CONTENT, MATERIALS, AND SERVICES AVAILABLE HEREIN ARE PROVIDED ON AN “AS IS” AND “AS
          AVAILABLE” BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE
          UNDER APPLICABLE LAW, VANTAGE DIGITAL HEALTH DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT
          LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
        </p>
        <p>
          WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, FREE OF VIRUSES OR HARMFUL
          COMPONENTS, OR THAT ANY DEFECTS WILL BE PROMPTLY CORRECTED.
        </p>
      </>
    ),
  },
  {
    heading: "8. Limitation of Liability",
    body: (
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL VANTAGE DIGITAL HEALTH, ITS OFFICERS,
        DIRECTORS, EMPLOYEES, AFFILIATES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
        PUNITIVE, OR EXEMPLARY DAMAGES (INCLUDING LOSS OF PROFITS, DATA, BUSINESS, OR GOODWILL) ARISING OUT OF OR IN
        CONNECTION WITH YOUR ACCESS TO, BROWSING OF, OR INABILITY TO USE THIS SITE OR ITS CONTENT.
      </p>
    ),
  },
  {
    heading: "9. Indemnification",
    body: (
      <p>
        You agree to defend, indemnify, and hold harmless Vantage Digital Health and its officers, directors, employees,
        contractors, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including
        reasonable attorneys&apos; fees) arising out of or related to your breach of these Terms of Use, misuse of the
        Site, unauthorized web scraping, or form spamming activities.
      </p>
    ),
  },
  {
    heading: "10. Modifications to Terms of Use",
    body: (
      <p>
        Vantage Digital Health reserves the right to modify, alter, or update these Terms of Use at any time without
        prior notice. Updated terms will become effective immediately upon posting to the Site. Your continued browsing
        or use of the Site following any changes constitutes your binding acceptance of the updated Terms of Use.
      </p>
    ),
  },
  {
    heading: "11. Governing Law & Jurisdiction",
    body: (
      <p>
        These Terms of Use shall be governed by and construed in accordance with the laws of the State of Florida,
        without giving effect to any principles of conflicts of law. Any legal suit, action, or proceeding arising out of
        or related to these Terms of Use or the Site shall be instituted exclusively in the state or federal courts
        located in Florida.
      </p>
    ),
  },
  {
    heading: "12. Contact Information",
    body: (
      <>
        <p>
          If you have any questions regarding these Website Terms of Use, web accessibility, or wish to request permission
          to reference our digital materials, please contact us at:
        </p>
        <p>
          <strong>{SITE.name}</strong>
          <br />
          Email: <SupportEmail />
          <br />
          Website: <SiteLink />
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      current="terms"
      eyebrow="Terms of Use"
      title="Terms for using this website."
      meta={<>Last updated: {LAST_UPDATED}</>}
      sections={SECTIONS}
    />
  );
}
