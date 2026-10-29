import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { LegalLayout, type LegalSection } from "./LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Vantage Digital Health collects, uses and protects information submitted through this website.",
};

const LAST_UPDATED = "October 28, 2026";
const SUPPORT_EMAIL = "support@vantagedigitalhealth.com";

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

const INTRO = (
  <>
    <p>
      Vantage Digital Health (“Company,” “we,” “us,” or “our”) is committed to protecting the privacy and security of the
      personal information collected through our website, <SiteLink /> (the “Site”). This Privacy Policy explains how we
      collect, use, disclose, and safeguard your personal information when you visit our Site, submit forms, or request
      information regarding our digital marketing and web services.
    </p>
    <p>
      Please read this Privacy Policy carefully. By accessing or using our Site, you acknowledge that you have read,
      understood, and agree to the collection and use of your information as described in this policy. If you do not
      agree with these terms, please discontinue use of the Site.
    </p>
  </>
);

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Scope & Relationship to Healthcare Privacy Laws (HIPAA)",
    body: (
      <>
        <p>
          <strong>Informational Website Scope:</strong> This Privacy Policy applies solely to information collected
          through our public marketing website (vantagedigitalhealth.com), public contact forms, consultation requests,
          and marketing analytics.
        </p>
        <p>
          <strong>Client &amp; Patient Data:</strong> If your medical practice enters into a service relationship with
          Vantage Digital Health, the processing of patient data, electronic health records (EHR), and HIPAA-regulated
          Protected Health Information (PHI) is governed by our Master Services Agreement (MSA) and executed Business
          Associate Agreement (BAA), not this general website Privacy Policy.
        </p>
      </>
    ),
  },
  {
    heading: "2. Information We Collect",
    body: (
      <>
        <p>
          We collect information from visitors in two ways: directly when provided voluntarily, and automatically through
          website technologies.
        </p>
        <h3>A. Information You Provide Voluntarily</h3>
        <p>
          When you interact with our Site—such as requesting a website audit, filling out a contact form, or scheduling a
          consultation—we may collect personal information, including:
        </p>
        <ul>
          <li>
            <strong>Contact Details:</strong> Full name, business email address, phone number, and practice name.
          </li>
          <li>
            <strong>Practice Information:</strong> Website URL, specialty/medical field, practice location, and general
            details regarding your marketing goals.
          </li>
          <li>
            <strong>Communication Content:</strong> Information provided in open text fields or inquiry messages.
          </li>
        </ul>
        <h3>B. Information Collected Automatically</h3>
        <p>
          As you navigate our Site, we automatically gather technical and usage data via cookies, log files, and web
          analytics, including:
        </p>
        <ul>
          <li>
            <strong>Device &amp; Network Data:</strong> IP address, browser type and version, operating system, device
            identifiers, and internet service provider (ISP).
          </li>
          <li>
            <strong>Usage &amp; Navigation Data:</strong> Pages viewed, time spent on pages, referral URL, clickstream
            data, date and time stamps, and website navigation paths.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. How We Use Your Information",
    body: (
      <>
        <p>We use the information collected on this Site for legitimate business purposes, including:</p>
        <ul>
          <li>
            <strong>Service Provision &amp; Inquiries:</strong> Responding to your form submissions, providing requested
            consultations or site audits, and communicating regarding our web development and software solutions.
          </li>
          <li>
            <strong>Marketing &amp; Communications:</strong> Sending relevant industry insights, corporate updates,
            service announcements, and promotional materials (you may opt out at any time).
          </li>
          <li>
            <strong>Website Optimization:</strong> Analyzing website traffic trends, improving page layout and
            accessibility, diagnosing technical server issues, and optimizing site performance.
          </li>
          <li>
            <strong>Security &amp; Fraud Prevention:</strong> Detecting and preventing unauthorized web scraping,
            malicious activity, form spamming, and security breaches.
          </li>
          <li>
            <strong>Legal Compliance:</strong> Enforcing our Website Terms of Use and complying with applicable legal
            obligations.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "4. How We Share & Disclose Your Information",
    body: (
      <>
        <p>
          Vantage Digital Health does not sell, rent, or trade your personal contact information to third parties for
          commercial marketing purposes. We may share your information under the following limited circumstances:
        </p>
        <ul>
          <li>
            <strong>Third-Party Service Providers:</strong> We utilize trusted third-party cloud infrastructure, CRM
            systems, web hosting platforms (e.g., Vercel, GitHub), and communication services to operate our Site and
            deliver services. These vendors are bound by strict confidentiality obligations and process data solely on
            our behalf.
          </li>
          <li>
            <strong>Business Transfers:</strong> In the event of a merger, acquisition, corporate reorganization, or sale
            of company assets, website user information may be transferred as part of the business assets.
          </li>
          <li>
            <strong>Legal &amp; Regulatory Obligations:</strong> We may disclose information if required by law,
            subpoena, court order, or government regulation, or if we believe in good faith that disclosure is necessary
            to protect our rights, defend against legal claims, or ensure the safety of our users or the public.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "5. Cookies & Tracking Technologies",
    body: (
      <>
        <p>
          Our Site utilizes standard cookies, web beacons, and analytical tags to enhance visitor experience and analyze
          site traffic.
        </p>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Necessary for basic website function, security, and navigation.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us understand visitor behavior, popular pages, and traffic sources.
          </li>
          <li>
            <strong>Managing Cookies:</strong> You can set your web browser to refuse cookies or alert you when cookies
            are being sent. Note that disabling cookies may affect the functionality or appearance of certain web pages.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "6. Data Security Measures",
    body: (
      <p>
        Vantage Digital Health employs industry-standard administrative, technical, and physical security controls to
        safeguard the information collected on our Site against unauthorized access, loss, alteration, or disclosure.
        However, no data transmission over the internet or cloud storage network can be guaranteed to be 100% secure.
        Visitors submit information through our forms at their own risk.
      </p>
    ),
  },
  {
    heading: "7. Communication Preferences & Opt-Out",
    body: (
      <ul>
        <li>
          <strong>Marketing Emails:</strong> You can unsubscribe from our promotional email communications at any time by
          clicking the “Unsubscribe” link at the bottom of any marketing email or by contacting <SupportEmail />.
        </li>
        <li>
          <strong>SMS &amp; Text Messaging:</strong> If you provide your phone number for outreach, you can opt out of
          text communications at any time by replying “STOP.”
        </li>
      </ul>
    ),
  },
  {
    heading: "8. Third-Party Links",
    body: (
      <p>
        Our Site may contain links to external third-party websites, software partners, search engines, or review
        networks. We do not control and are not responsible for the privacy practices or content of external sites. We
        encourage you to read the privacy policies of any third-party site you visit.
      </p>
    ),
  },
  {
    heading: "9. Children's Privacy",
    body: (
      <p>
        Our Site and services are directed strictly to healthcare professionals and commercial medical practices. We do
        not knowingly collect or solicit personal information from children under the age of 18. If we learn that we have
        collected information from a child under 18, we will delete it promptly.
      </p>
    ),
  },
  {
    heading: "10. Modifications to This Privacy Policy",
    body: (
      <p>
        Vantage Digital Health reserves the right to update or modify this Privacy Policy at any time. Any changes will be
        posted directly to this page with an updated “Last Updated” revision date. Your continued use of the Site
        following any updates indicates your acceptance of the revised policy.
      </p>
    ),
  },
  {
    heading: "11. Contact Us",
    body: (
      <>
        <p>
          If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact
          us at:
        </p>
        <p>
          <strong>Vantage Digital Health</strong>
          <br />
          Email: <SupportEmail />
          <br />
          Website: <SiteLink />
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      current="privacy"
      eyebrow="Privacy Policy"
      title="How we handle your information."
      meta={<>Last Updated: {LAST_UPDATED}</>}
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
