/* =====================================================================
   Integrations directory + assessment form data.
   The page is about one job: connecting practice software so review requests go out after
   every visit. Only systems that serve reviews & reputation are listed.
   Edit categories, scope notes, statuses and directory rows here.
   ===================================================================== */

export type CategoryKey = "ehr" | "pm" | "sched" | "reviews" | "msg" | "interop";
export type StatusKey = "native" | "connector" | "custom" | "planned" | "assess";

/** Category labels. Not shown as filters or tags; the directory search still matches them (e.g. "EHR"). */
export const CAT: Record<CategoryKey, string> = {
  ehr: "EHR / EMR",
  pm: "Practice management",
  sched: "Scheduling & booking",
  reviews: "Reviews & reputation",
  msg: "Patient messaging",
  interop: "Interoperability",
};

/** "How it powers your reviews" shown in the detail view, per category. */
export const SCOPE: Record<CategoryKey, string> = {
  ehr: "Visit-completion events that trigger a review request at the right moment. Clinical data stays out of marketing systems.",
  pm: "Completed appointments and visit status, used to time review requests and avoid asking the same patient twice.",
  sched: "Appointment status, so review requests follow completed visits rather than bookings.",
  reviews: "Profile accuracy, new-review alerts and response drafting, all in one place.",
  msg: "Review requests sent by text or email after the visit — without health details in messages.",
  interop: "One connection to many EHRs, limited to the visit events that trigger review requests. Clinical data stays out of marketing systems.",
};

/** Support status labels. Chip and legend styling lives in Status.module.css (one class per key). */
export const ST: Record<StatusKey, string> = {
  native: "Native",
  connector: "Via connector",
  custom: "Custom build",
  planned: "Planned",
  assess: "Assessment required",
};


type Row = {
  name: string;
  cat: CategoryKey;
  desc: string;
  status: StatusKey;
  /** Other names the directory search should match (former or alternate spellings). */
  aka?: string[];
};

/**
 * The core listed systems, shown first. Every status is "assess" until integrations are confirmed —
 * change a row's `status` to "native" | "connector" | "custom" | "planned" as they are.
 */
const ROWS: Row[] = [
  { name: "athenahealth", cat: "ehr", desc: "Cloud-based EHR, practice management and revenue cycle platform.", status: "assess" },
  { name: "eClinicalWorks", cat: "ehr", desc: "Ambulatory EHR and practice management system.", status: "assess" },
  { name: "NextGen Healthcare", cat: "ehr", desc: "EHR and practice management for ambulatory and specialty practices.", status: "assess" },
  { name: "ModMed", cat: "ehr", desc: "Specialty-specific EHR and practice management, e.g. dermatology and orthopedics.", status: "assess", aka: ["Modernizing Medicine"] },
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
  { name: "Google Business Profile", cat: "reviews", desc: "Your listing in Google Search and Maps, including reviews.", status: "assess" },
  { name: "Healthgrades", cat: "reviews", desc: "Provider directory and patient ratings site.", status: "assess" },
  { name: "Yelp", cat: "reviews", desc: "Local business listings and reviews.", status: "assess" },
  { name: "Weave", cat: "msg", desc: "Phones, texting, reviews and payments for practices.", status: "assess" },
  { name: "Solutionreach", cat: "msg", desc: "Patient reminders, recall and two-way texting.", status: "assess" },
  { name: "RevenueWell", cat: "msg", desc: "Dental marketing and patient communication platform.", status: "assess" },
  { name: "Klara", cat: "msg", desc: "Patient messaging and engagement, now part of ModMed.", status: "assess" },
];

/**
 * Healthcare systems from Birdeye's integration library (birdeye.com/integration/healthcare), reviewed October 2026.
 * Systems already listed above are not repeated. Left out as not relevant to US medical and dental practices:
 * veterinary (PetExec, PetWellClinic, IDEXX, RxWorks), cannabis (Green Bits, Arfinn Med, VerifyMC), non-practice
 * systems (GoRev, Repticity, BestRx, MindParcs, QGenda, WellSky Home Health, NikoHealth), regional products sold
 * outside the US (Medesync, eVisionCare, Gensolve, Core Practice, Coreplus, PPMP, TM3), and listings we could not
 * verify as current (OfficeMD, IOS Health Systems, ClinicDr).
 */
const BIRDEYE_ROWS: Row[] = [
  // EHR / EMR
  { name: "NextGen Office", cat: "ehr", desc: "Cloud EHR and PM for small practices (formerly HealthFusion MediTouch).", status: "assess" },
  { name: "DrChrono", cat: "ehr", desc: "Cloud EHR, practice management and billing with mobile apps (EverHealth).", status: "assess" },
  { name: "Aesthetic Record", cat: "ehr", desc: "EMR and practice management for medical spas and aesthetic practices.", status: "assess" },
  { name: "AllegianceMD", cat: "ehr", desc: "Cloud EHR, practice management and billing for outpatient practices.", status: "assess" },
  { name: "Veradigm", cat: "ehr", desc: "Ambulatory EHR and practice management (formerly Allscripts).", status: "assess" },
  { name: "Atlas.md", cat: "ehr", desc: "EMR and practice management for direct primary care and concierge practices.", status: "assess" },
  { name: "Oracle Health", cat: "ehr", desc: "EHR for hospitals and health systems (formerly Cerner).", status: "assess" },
  { name: "CharmHealth", cat: "ehr", desc: "Cloud EHR, practice management and billing platform.", status: "assess" },
  { name: "ChiroFusion", cat: "ehr", desc: "Cloud chiropractic EHR, billing and practice management.", status: "assess" },
  { name: "Clinicient", cat: "ehr", desc: "Rehab therapy EMR and billing (Insight), now part of WebPT.", status: "assess" },
  { name: "East West Health", cat: "ehr", desc: "EHR for acupuncturists, chiropractors and medical practitioners.", status: "assess" },
  { name: "Ensora Health", cat: "ehr", desc: "Therapy EHR for mental health (TheraNest) and rehab therapy (Fusion) practices.", status: "assess" },
  { name: "Ethizo", cat: "ehr", desc: "Cloud EHR, practice management and billing, incl. post-acute and long-term care.", status: "assess" },
  { name: "Ezderm", cat: "ehr", desc: "Dermatology-specific EHR, practice management and revenue cycle software.", status: "assess" },
  { name: "Fusion (Ensora Health)", cat: "ehr", desc: "EHR for physical, occupational and speech therapists, from Ensora Health.", status: "assess" },
  { name: "Healthie", cat: "ehr", desc: "EHR and practice management for wellness, nutrition and virtual-care providers.", status: "assess", aka: ["Gethealthie"] },
  { name: "ICANotes", cat: "ehr", desc: "Behavioral health EHR for therapists, psychiatrists and other clinicians.", status: "assess" },
  { name: "InSync", cat: "ehr", desc: "EHR and practice management for behavioral health and therapy practices (Qualifacts).", status: "assess" },
  { name: "MD Synergy", cat: "ehr", desc: "Mobile EHR (Althea) with practice management and billing modules.", status: "assess" },
  { name: "ModMed gGastro", cat: "ehr", desc: "Gastroenterology EHR and practice management suite from ModMed.", status: "assess", aka: ["Modernizing Medicine gGastro"] },
  { name: "myCare iMedicWare", cat: "ehr", desc: "Ophthalmology EHR and practice management from Eye Care Leaders.", status: "assess" },
  { name: "Office Practicum", cat: "ehr", desc: "Pediatric EHR and practice management.", status: "assess" },
  { name: "OneTouch EMR", cat: "ehr", desc: "EMR with practice management and billing, designed for iPad charting.", status: "assess", aka: ["One Touch EMR"] },
  { name: "Power2Practice", cat: "ehr", desc: "EMR and practice management for functional and integrative medicine.", status: "assess" },
  { name: "Experity", cat: "ehr", desc: "Urgent care EMR and practice management (formerly Practice Velocity).", status: "assess" },
  { name: "Prime Suite", cat: "ehr", desc: "Ambulatory EHR and practice management from Greenway Health.", status: "assess" },
  { name: "PrognoCIS", cat: "ehr", desc: "Cloud EHR, practice management and RCM (Bizmatics, now part of Harris).", status: "assess" },
  { name: "Prompt Health", cat: "ehr", desc: "EMR, scheduling and billing for PT, OT, speech and other rehab therapy clinics.", status: "assess" },
  { name: "Remedly", cat: "ehr", desc: "EMR, practice management and marketing for plastic surgery and med spas.", status: "assess" },
  { name: "RevolutionEHR", cat: "ehr", desc: "Cloud EHR and practice management for optometry.", status: "assess", aka: ["Revolution EHR"] },
  { name: "RXNT", cat: "ehr", desc: "Cloud EHR, practice management and e-prescribing.", status: "assess" },
  { name: "SimplePractice", cat: "ehr", desc: "EHR and practice management for therapists and other wellness professionals.", status: "assess" },
  { name: "Symplast", cat: "ehr", desc: "EHR and practice management for plastic surgery and aesthetic practices.", status: "assess" },
  { name: "TRAKnet", cat: "ehr", desc: "Podiatry EHR and practice management, now part of ModMed.", status: "assess" },
  { name: "Unified Practice", cat: "ehr", desc: "EHR and practice management for acupuncture and integrative clinics.", status: "assess" },
  { name: "Valant", cat: "ehr", desc: "Behavioral health EHR and practice management, incl. IOP and PHP programs.", status: "assess" },
  { name: "WebPT", cat: "ehr", desc: "EMR, billing and practice management for PT, OT and speech therapy.", status: "assess" },
  { name: "WRS Health", cat: "ehr", desc: "Specialty EHR and practice management with integrated billing services.", status: "assess" },

  // Practice management (incl. billing / RCM)
  { name: "ACOM Health", cat: "pm", desc: "Chiropractic billing services with included EHR and practice management software.", status: "assess" },
  { name: "Nextech Practice+", cat: "pm", desc: "Nextech practice management for ophthalmology, plastic surgery and dermatology.", status: "assess" },
  { name: "Aesthetic Nurse Software", cat: "pm", desc: "Booking, treatment records and payments for aesthetic clinics and practitioners.", status: "assess" },
  { name: "AntWorks Healthcare", cat: "pm", desc: "Practice management and revenue cycle software (formerly Benchmark Systems).", status: "assess" },
  { name: "Auditdata", cat: "pm", desc: "Practice management software for audiology and hearing care clinics.", status: "assess" },
  { name: "CareCloud", cat: "pm", desc: "Cloud EHR, practice management and revenue cycle services.", status: "assess" },
  { name: "Carepatron", cat: "pm", desc: "Practice management and EHR for therapists, allied health and wellness practitioners.", status: "assess" },
  { name: "ClinicSense", cat: "pm", desc: "Practice management for massage therapists and wellness practitioners.", status: "assess" },
  { name: "Cliniko", cat: "pm", desc: "Practice management, scheduling and treatment notes for allied health clinics.", status: "assess" },
  { name: "CollaborateMD", cat: "pm", desc: "Medical billing and practice management software (EverHealth).", status: "assess" },
  { name: "CounselEar", cat: "pm", desc: "Practice management and clinical documentation for audiology clinics.", status: "assess" },
  { name: "Eyefinity", cat: "pm", desc: "Optometry practice management and EHR (Encompass), from VSP Vision.", status: "assess" },
  { name: "Greyfinch", cat: "pm", desc: "Cloud practice management for orthodontic practices.", status: "assess" },
  { name: "MedClarity", cat: "pm", desc: "Cloud practice management and billing platform from Medusind.", status: "assess" },
  { name: "Medical Manager", cat: "pm", desc: "Legacy practice management system (Sage/Vitera, now Greenway Health).", status: "assess" },
  { name: "My Practice Now", cat: "pm", desc: "Practice management and EHR for functional medicine and cash-pay practices.", status: "assess" },
  { name: "Nookal", cat: "pm", desc: "Practice management for allied health clinics, with scheduling, billing and notes.", status: "assess" },
  { name: "Nymbl Systems", cat: "pm", desc: "Practice management for orthotics and prosthetics (O&P), CRT and DME providers.", status: "assess" },
  { name: "Office Ally", cat: "pm", desc: "Claims clearinghouse with practice management (Practice Mate) and EHR 24/7.", status: "assess", aka: ["OfficeAlly"] },
  { name: "OPIE", cat: "pm", desc: "Practice management and EMR for orthotic and prosthetic (O&P) clinics.", status: "assess" },
  { name: "Optical POS", cat: "pm", desc: "Optometry EHR, practice management and optical retail POS (Eye Cloud Pro).", status: "assess" },
  { name: "Practice Better", cat: "pm", desc: "Practice management and EHR for nutrition, coaching and wellness practitioners.", status: "assess" },
  { name: "PracticeHub", cat: "pm", desc: "Clinic management software for chiropractors.", status: "assess" },
  { name: "QSIDental", cat: "pm", desc: "Dental practice management (formerly NextGen's QSI Dental, now Planet DDS).", status: "assess" },
  { name: "SimpleClinic", cat: "pm", desc: "Practice management for naturopaths, nutritionists and herbalists.", status: "assess" },
  { name: "Vericle", cat: "pm", desc: "Cloud practice management, EHR and billing for practices and billing companies.", status: "assess" },
  { name: "Zanda", cat: "pm", desc: "Practice management for allied and mental health practices (formerly Power Diary).", status: "assess" },

  // Scheduling & booking
  { name: "Clockwise.MD", cat: "sched", desc: "Online check-in and wait-time queuing for urgent care, from Experity.", status: "assess" },
  { name: "NextPatient", cat: "sched", desc: "Online booking, waitlists and reminders for specialty practices, synced with the EHR.", status: "assess" },
  { name: "Relatient", cat: "sched", desc: "Patient scheduling, self-scheduling and reminders (Dash by Relatient).", status: "assess" },
  { name: "Setmore", cat: "sched", desc: "General-purpose online appointment booking and scheduling.", status: "assess" },

  // Interoperability
  { name: "Redox", cat: "interop", desc: "Healthcare interoperability platform connecting EHRs and other systems.", status: "assess" },
];

export type Integration = Row & { id: string };

export const INTEGRATIONS: Integration[] = [...ROWS, ...BIRDEYE_ROWS].map((r, i) => ({ ...r, id: `i${i}` }));

/** Detail view — "What we confirm first". */
export const CONFIRM_FIRST = [
  "Your edition, plan and API or partner access",
  "Which data is available — and appropriate — to use",
  "Vendor approvals or a BAA, where required",
];

/* ---------- request / assessment form ---------- */

export type RequestFields = {
  software: string;
  practice: string;
  name: string;
  email: string;
  notes: string;
};

export type RequiredField = "software" | "practice" | "name" | "email";
export type RequestErrors = Partial<Record<RequiredField, true>>;

export const EMPTY_REQUEST: RequestFields = { software: "", practice: "", name: "", email: "", notes: "" };

/** Inline error messages. Key order is the order fields appear (and the order focus goes to). */
export const FIELD_ERRORS: Record<RequiredField, string> = {
  software: "Tell us which software to assess.",
  practice: "Enter your practice name.",
  name: "Enter your name.",
  email: "Enter a valid email address, like name@practice.com.",
};

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
