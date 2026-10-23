/* =====================================================================
   Integrations directory + assessment form data — verbatim from the design.
   Edit copy, categories, scope notes, statuses and directory rows here.
   ===================================================================== */

export type CategoryKey = "ehr" | "pm" | "sched" | "crm" | "reviews" | "msg" | "analytics" | "ads" | "cms";
export type StatusKey = "native" | "connector" | "custom" | "planned" | "assess";

/** Category labels — used by the directory filters, card tags, search and the form's Category select. */
export const CAT: Record<CategoryKey, string> = {
  ehr: "EHR / EMR",
  pm: "Practice management",
  sched: "Scheduling & booking",
  crm: "CRM",
  reviews: "Reviews & reputation",
  msg: "Patient messaging",
  analytics: "Analytics & call tracking",
  ads: "Ad platforms",
  cms: "Website & CMS",
};

/** "Typical connection scope" shown in the detail view, per category. */
export const SCOPE: Record<CategoryKey, string> = {
  ehr: "Appointment and visit-completion events for attribution and review timing. Clinical data stays out of marketing systems.",
  pm: "New-patient appointments, appointment types and visit status for attribution, recall and review requests.",
  sched: "Live availability on your website and booking-source tracking.",
  crm: "Lead capture, routing, follow-up tasks and pipeline reporting.",
  reviews: "Profile accuracy, review monitoring and response workflows.",
  msg: "Visit-triggered review requests and reminders — without health details in messages.",
  analytics: "Privacy-conscious measurement of calls, forms and bookings.",
  ads: "Conversion signals for campaign optimization, configured to exclude health information.",
  cms: "Website builds, forms, structured data and booking integrations.",
};

/** Support status labels. Chip and legend styling lives in Status.module.css (one class per key). */
export const ST: Record<StatusKey, string> = {
  native: "Native",
  connector: "Via connector",
  custom: "Custom build",
  planned: "Planned",
  assess: "Assessment required",
};

export const CATEGORY_KEYS = Object.keys(CAT) as CategoryKey[];
export const STATUS_KEYS = Object.keys(ST) as StatusKey[];

type Row = { name: string; cat: CategoryKey; desc: string; status: StatusKey };

/**
 * The 32 listed systems. Every status is "assess" until integrations are confirmed —
 * change a row's `status` to "native" | "connector" | "custom" | "planned" as they are.
 */
const ROWS: Row[] = [
  { name: "athenahealth", cat: "ehr", desc: "Cloud-based EHR, practice management and revenue cycle platform.", status: "assess" },
  { name: "eClinicalWorks", cat: "ehr", desc: "Ambulatory EHR and practice management system.", status: "assess" },
  { name: "NextGen Healthcare", cat: "ehr", desc: "EHR and practice management for ambulatory and specialty practices.", status: "assess" },
  { name: "ModMed", cat: "ehr", desc: "Specialty-specific EHR and practice management, e.g. dermatology and orthopedics.", status: "assess" },
  { name: "Elation Health", cat: "ehr", desc: "EHR built for independent primary care.", status: "assess" },
  { name: "Nextech", cat: "ehr", desc: "EHR and PM for specialties such as plastic surgery and dermatology.", status: "assess" },
  { name: "AdvancedMD", cat: "pm", desc: "Practice management, EHR and billing for independent practices.", status: "assess" },
  { name: "Tebra", cat: "pm", desc: "Practice management, billing and patient engagement (formerly Kareo and PatientPop).", status: "assess" },
  { name: "Dentrix", cat: "pm", desc: "Dental practice management software from Henry Schein One.", status: "assess" },
  { name: "Eaglesoft", cat: "pm", desc: "Dental practice management software from Patterson Dental.", status: "assess" },
  { name: "Open Dental", cat: "pm", desc: "Open-source dental practice management software.", status: "assess" },
  { name: "Curve Dental", cat: "pm", desc: "Cloud-based dental practice management.", status: "assess" },
  { name: "Denticon", cat: "pm", desc: "Cloud dental practice management for groups (Planet DDS).", status: "assess" },
  { name: "NexHealth", cat: "sched", desc: "Online booking, forms and messaging that sync with many PM systems.", status: "assess" },
  { name: "Zocdoc", cat: "sched", desc: "Patient-facing provider search and online booking marketplace.", status: "assess" },
  { name: "HubSpot", cat: "crm", desc: "CRM and marketing automation platform.", status: "assess" },
  { name: "Salesforce Health Cloud", cat: "crm", desc: "Healthcare-focused CRM built on Salesforce.", status: "assess" },
  { name: "Google Business Profile", cat: "reviews", desc: "Your listing in Google Search and Maps, including reviews.", status: "assess" },
  { name: "Healthgrades", cat: "reviews", desc: "Provider directory and patient ratings site.", status: "assess" },
  { name: "Yelp", cat: "reviews", desc: "Local business listings and reviews.", status: "assess" },
  { name: "Weave", cat: "msg", desc: "Phones, texting, reviews and payments for practices.", status: "assess" },
  { name: "Solutionreach", cat: "msg", desc: "Patient reminders, recall and two-way texting.", status: "assess" },
  { name: "RevenueWell", cat: "msg", desc: "Dental marketing and patient communication platform.", status: "assess" },
  { name: "Klara", cat: "msg", desc: "Patient messaging and engagement, now part of ModMed.", status: "assess" },
  { name: "Google Analytics 4", cat: "analytics", desc: "Website analytics — configured to avoid collecting health information.", status: "assess" },
  { name: "Google Tag Manager", cat: "analytics", desc: "Tag management for analytics and conversion tracking.", status: "assess" },
  { name: "CallRail", cat: "analytics", desc: "Call tracking and marketing attribution.", status: "assess" },
  { name: "Google Ads", cat: "ads", desc: "Search, Maps and YouTube advertising.", status: "assess" },
  { name: "Meta Ads Manager", cat: "ads", desc: "Facebook and Instagram advertising.", status: "assess" },
  { name: "Microsoft Advertising", cat: "ads", desc: "Bing search and partner network advertising.", status: "assess" },
  { name: "WordPress", cat: "cms", desc: "Widely used open-source website platform.", status: "assess" },
  { name: "Webflow", cat: "cms", desc: "Visual website builder and CMS.", status: "assess" },
];

export type Integration = Row & { id: string };

export const INTEGRATIONS: Integration[] = ROWS.map((r, i) => ({ ...r, id: `i${i}` }));

/** Detail view — "What we confirm first". */
export const CONFIRM_FIRST = [
  "Your edition, plan and API or partner access",
  "Which data is available — and appropriate — to use",
  "Vendor approvals or a BAA, where required",
];

/* ---------- request / assessment form ---------- */

export type RequestFields = {
  software: string;
  category: string;
  practice: string;
  name: string;
  email: string;
  notes: string;
};

export type RequiredField = "software" | "practice" | "name" | "email";
export type RequestErrors = Partial<Record<RequiredField, true>>;

export const EMPTY_REQUEST: RequestFields = { software: "", category: "", practice: "", name: "", email: "", notes: "" };

/** Inline error messages. Key order is the order fields appear (and the order focus goes to). */
export const FIELD_ERRORS: Record<RequiredField, string> = {
  software: "Tell us which software to assess.",
  practice: "Enter your practice name.",
  name: "Enter your name.",
  email: "Enter a valid email address, like name@practice.com.",
};

/** Category select options: "Not sure", every directory category, then "Other". */
export const REQUEST_CATEGORIES: { value: string; label: string }[] = [
  { value: "", label: "Not sure" },
  ...CATEGORY_KEYS.map((k) => ({ value: k, label: CAT[k] })),
  { value: "other", label: "Other" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Same rules as the design: three required text fields plus a basic email shape check. */
export function validateRequest(v: RequestFields): RequestErrors {
  const e: RequestErrors = {};
  if (!v.software.trim()) e.software = true;
  if (!v.practice.trim()) e.practice = true;
  if (!v.name.trim()) e.name = true;
  if (!EMAIL_RE.test(v.email.trim())) e.email = true;
  return e;
}
