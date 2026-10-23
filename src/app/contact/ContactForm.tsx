"use client";

import Link from "next/link";
import { Fragment, useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Ph } from "@/components/ui/Flag";
import { Arrow, Icon } from "@/components/ui/Icon";
import { ROUTES, SITE } from "@/lib/site";
import s from "./ContactForm.module.css";

/* =====================================================================
   Copy & option lists — verbatim from the design. Edit copy here.
   ===================================================================== */

/** Step 1 — "I'm interested in" chips. */
const TOPICS = [
  { value: "call", label: "A strategy call" },
  { value: "assessment", label: "A growth assessment" },
  { value: "integration", label: "An integration assessment" },
] as const;

/** Step 2 — "What would you most like to improve?" checkboxes. */
const GOALS = [
  { value: "patients", label: "More new-patient inquiries" },
  { value: "reviews", label: "Stronger reviews & reputation" },
  { value: "visibility", label: "Visibility in search & AI answers" },
  { value: "website", label: "A new or better website" },
  { value: "software", label: "Connecting our software" },
  { value: "reporting", label: "Clearer reporting on results" },
] as const;

type Option = { value: string; label: string };

/** Step 1 — Specialty select. Labels are also used in the summary and the email body. */
const SPECIALTIES: Option[] = [
  { value: "general-dental", label: "General & family dentistry" },
  { value: "ortho", label: "Orthodontics" },
  { value: "implants", label: "Implants & cosmetic dentistry" },
  { value: "pedo", label: "Pediatric dentistry" },
  { value: "derm", label: "Dermatology" },
  { value: "plastics", label: "Plastic & aesthetic surgery" },
  { value: "medspa", label: "Medical spa" },
  { value: "primary", label: "Primary care" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "other", label: "Other specialty" },
];

/** Step 1 — Locations select. */
const LOCATIONS: Option[] = [
  { value: "1", label: "1 location" },
  { value: "2-5", label: "2–5 locations" },
  { value: "6+", label: "6 or more" },
  { value: "new", label: "Opening soon" },
];

/** Step 2 — Monthly marketing budget select. */
const BUDGETS: Option[] = [
  { value: "", label: "Prefer not to say" },
  { value: "lt5", label: "Under $5,000" },
  { value: "5-15", label: "$5,000–$15,000" },
  { value: "15-40", label: "$15,000–$40,000" },
  { value: "40+", label: "Over $40,000" },
];

/** Step 3 — Your role select. */
const ROLES: Option[] = [
  { value: "owner", label: "Owner / physician / dentist" },
  { value: "manager", label: "Practice or office manager" },
  { value: "marketing", label: "Marketing lead" },
  { value: "group", label: "Group / DSO / MSO leadership" },
  { value: "other", label: "Other" },
];

/** Step indicator labels. */
const STEPS = ["Practice", "Goals", "You"] as const;

/** Inline error messages. Key order is the order fields appear, used to pick the first invalid field. */
const ERRORS = {
  practice: "Enter your practice name.",
  specialty: "Choose the closest specialty.",
  goals: "Choose at least one goal.",
  name: "Enter your name.",
  email: "Enter a valid email, like name@practice.com.",
  consent: "Please confirm to continue.",
} as const;

const ERROR_SUMMARY = "A few details are missing. Please check the highlighted fields.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* =====================================================================
   Types & pure helpers
   ===================================================================== */

type Topic = (typeof TOPICS)[number]["value"];
type Goal = (typeof GOALS)[number]["value"];
type Step = 1 | 2 | 3;
type ErrorKey = keyof typeof ERRORS;
type Errors = Partial<Record<ErrorKey, true>>;

type Fields = {
  topic: Topic;
  practice: string;
  specialty: string;
  locations: string;
  website: string;
  software: string;
  budget: string;
  notes: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  consent: boolean;
};

type TextField = Exclude<keyof Fields, "topic" | "consent">;

const INITIAL_FIELDS: Fields = {
  topic: "call",
  practice: "",
  specialty: "",
  locations: "1",
  website: "",
  software: "",
  budget: "",
  notes: "",
  name: "",
  role: "owner",
  email: "",
  phone: "",
  consent: false,
};

const ERROR_ORDER = Object.keys(ERRORS) as ErrorKey[];
const isErrorKey = (k: string): k is ErrorKey => k in ERRORS;

function validateStep(step: Step, f: Fields, goals: readonly Goal[]): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!f.practice.trim()) e.practice = true;
    if (!f.specialty) e.specialty = true;
  }
  if (step === 2) {
    if (!goals.length) e.goals = true;
  }
  if (step === 3) {
    if (!f.name.trim()) e.name = true;
    if (!EMAIL_RE.test(f.email.trim())) e.email = true;
    if (!f.consent) e.consent = true;
  }
  return e;
}

/** Labels for the success summary, plus the prefilled email (subject and body exactly as in the design). */
function summarise(f: Fields, goals: readonly Goal[]) {
  const goalsText = GOALS.filter((g) => goals.includes(g.value))
    .map((g) => g.label)
    .join(", ");
  const topicLabel = (TOPICS.find((t) => t.value === f.topic) ?? TOPICS[0]).label;
  const specLabel = SPECIALTIES.find((o) => o.value === f.specialty)?.label ?? "";
  const body =
    "Interested in: " + topicLabel +
    "\nPractice: " + f.practice + " (" + specLabel + ", " + f.locations + ")" +
    "\nWebsite: " + f.website +
    "\nGoals: " + goalsText +
    "\nSoftware: " + f.software +
    "\nNotes: " + f.notes +
    "\nName: " + f.name + " (" + f.role + ")" +
    "\nEmail: " + f.email +
    "\nPhone: " + f.phone;
  const mailto =
    "mailto:" + SITE.email +
    "?subject=" + encodeURIComponent("Strategy call request — " + f.practice) +
    "&body=" + encodeURIComponent(body);
  const firstName = f.name.trim().split(" ")[0] || "there";
  return { goalsText, topicLabel, specLabel, mailto, firstName };
}

/**
 * Focus `el`, then make sure it (or its field wrapper, so the label shows too) sits on screen below the
 * sticky site header. Done by hand because on desktop the panel is `position: sticky`, and when it is
 * stuck by its bottom edge the browser's own focus scrolling can't bring its top back into view.
 */
function focusAndReveal(el: HTMLElement, form: HTMLElement | null) {
  el.focus({ preventScroll: true });
  const box = el.closest<HTMLElement>(".v-field, fieldset") ?? el;
  const headerBottom = Math.max(0, document.querySelector(".v-hdr")?.getBoundingClientRect().bottom ?? 0);
  const gap = 24;
  const r = box.getBoundingClientRect();
  if (r.top >= headerBottom + gap && r.bottom <= window.innerHeight - gap) return;
  let top = r.top;
  const row = form?.parentElement;
  if (form && row && getComputedStyle(form).position === "sticky") {
    // Where the box sits when the panel is not stuck: the panel's natural top is the top of its grid row.
    top = row.getBoundingClientRect().top + (r.top - form.getBoundingClientRect().top);
  }
  window.scrollTo({ top: window.scrollY + top - headerBottom - gap });
}

/* =====================================================================
   Submission
   ===================================================================== */

export type StrategyCallRequest = Fields & {
  goals: Goal[];
  topicLabel: string;
  specialtyLabel: string;
  goalsText: string;
};

/**
 * Sends a completed strategy-call request.
 *
 * There is no backend yet, so this resolves `{ delivered: false }` and the success screen shows the
 * "Not sent yet" notice with a prefilled email instead (the design's behaviour).
 *
 * TODO [FORM ENDPOINT]: POST `request` to the submission service (or a route handler such as
 * `app/api/strategy-call/route.ts`) and return `{ delivered: res.ok }`. Throwing, or returning
 * `delivered: false`, keeps the email fallback. Write copy for the delivered state when this is connected.
 */
async function sendStrategyCallRequest(request: StrategyCallRequest): Promise<{ delivered: boolean }> {
  void request;
  return { delivered: false };
}

/* =====================================================================
   Component
   ===================================================================== */

export function ContactForm() {
  const uid = useId();
  const id = (key: string) => `${uid}-${key}`;
  const errId = (key: ErrorKey) => id(`${key}-err`);
  const titleId = id("title");
  const stepHintId = id("step");

  const [step, setStep] = useState<Step>(1);
  const [dir, setDir] = useState<"fwd" | "back" | null>(null);
  const [fields, setFields] = useState<Fields>(INITIAL_FIELDS);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Element to focus once the next render has committed: the step heading after a step change,
  // or the first invalid field after a failed step (so aria-invalid and the error text are already in place).
  const focusAfterRender = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const target = focusAfterRender.current;
    if (!target) return;
    focusAfterRender.current = null;
    const el = document.getElementById(target);
    if (el) focusAndReveal(el, formRef.current);
  });

  // Publish the panel height as --form-h so the desktop sticky offset can keep the
  // Back/Continue row on screen when the panel is taller than the viewport (see the CSS module).
  useEffect(() => {
    const el = formRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => el.style.setProperty("--form-h", `${Math.ceil(el.offsetHeight)}px`));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const clearError = (key: ErrorKey) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const onText =
    (key: TextField) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setFields((f) => ({ ...f, [key]: value }));
      if (isErrorKey(key)) clearError(key);
    };

  /** aria-invalid + aria-describedby → the inline error, for a validated field. */
  const describe = (key: ErrorKey) => ({
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? errId(key) : undefined,
  });

  const toggleGoal = (value: Goal) => {
    setGoals((prev) => (prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]));
    clearError("goals");
  };

  const goToStep = (next: Step, direction: "fwd" | "back") => {
    focusAfterRender.current = titleId;
    setDir(direction);
    setStep(next);
    setErrors({});
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (submitting) return;

    const found = validateStep(step, fields, goals);
    const firstInvalid = ERROR_ORDER.find((k) => found[k]);
    if (firstInvalid) {
      focusAfterRender.current = firstInvalid === "goals" ? id(`goal-${GOALS[0].value}`) : id(firstInvalid);
      setErrors(found);
      return;
    }

    if (step < 3) {
      goToStep((step + 1) as Step, "fwd");
      return;
    }

    setErrors({});
    setSubmitting(true);
    const sum = summarise(fields, goals);
    let ok = false;
    try {
      const result = await sendStrategyCallRequest({
        ...fields,
        goals: [...goals],
        topicLabel: sum.topicLabel,
        specialtyLabel: sum.specLabel,
        goalsText: sum.goalsText,
      });
      ok = result.delivered;
    } catch {
      ok = false;
    }
    focusAfterRender.current = titleId;
    setDelivered(ok);
    setDone(true);
    setSubmitting(false);
  };

  const reset = () => {
    focusAfterRender.current = titleId;
    setFields(INITIAL_FIELDS);
    setGoals([]);
    setErrors({});
    setDone(false);
    setDelivered(false);
    setDir(null);
    setStep(1);
  };

  const summary = done ? summarise(fields, goals) : null;
  const showErrors = Object.keys(errors).length > 0;

  return (
    <form
      ref={formRef}
      className={`v-panel v-form v-rise v-d2 ${s.form}`}
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby={titleId}
      aria-busy={submitting || undefined}
    >
      {summary ? (
        /* ---------- success ---------- */
        <div className={`v-stack v-fadein ${s.done}`}>
          <span className={`v-icon ${s.doneIcon}`}>
            <Icon name="check" size={24} strokeWidth={2.2} />
          </span>
          <h2 id={titleId} tabIndex={-1} className={`v-h3 ${s.doneTitle}`}>
            Thanks, {summary.firstName} — your request is ready.
          </h2>
          {!delivered && (
            <div className="v-notice v-notice--warn">
              <Icon name="info" size={20} strokeWidth={2} style={{ marginTop: 2 }} />
              <span>
                <strong>Not sent yet.</strong> This form still needs to be connected to a submission service{" "}
                <Ph>[FORM ENDPOINT]</Ph>. Until then, send these details by email and we&apos;ll reply from there.
              </span>
            </div>
          )}
          <dl className={s.summary}>
            <dt className="v-muted">Interested in</dt>
            <dd>{summary.topicLabel}</dd>
            <dt className="v-muted">Practice</dt>
            <dd>
              {fields.practice} · {summary.specLabel}
            </dd>
            <dt className="v-muted">Goals</dt>
            <dd>{summary.goalsText}</dd>
            <dt className="v-muted">Contact</dt>
            <dd>
              {fields.name} · {fields.email}
            </dd>
          </dl>
          <div className="v-btn-row">
            <a className="v-btn v-btn--primary" href={summary.mailto}>
              Email these details
            </a>
            <button className="v-btn v-btn--ghost" type="button" onClick={reset}>
              Start over
            </button>
          </div>
        </div>
      ) : (
        /* ---------- steps ---------- */
        <div className={`v-stack ${s.flow}`}>
          <div className={`v-stack ${s.head}`}>
            <h2 id={titleId} tabIndex={-1} aria-describedby={stepHintId} className={`v-h3 ${s.title}`}>
              Book a strategy call
            </h2>
            <ol className={`v-steps ${s.steps}`} aria-label="Form progress">
              {STEPS.map((label, i) => {
                const n = i + 1;
                const state = step === n ? "current" : step > n ? "done" : "todo";
                return (
                  <Fragment key={label}>
                    {i > 0 && <li className={`v-step-sep ${s.sep}`} aria-hidden="true" data-done={step > i} />}
                    <li className={`v-step ${s.step}`} data-state={state} aria-current={state === "current" ? "step" : undefined}>
                      <b>{n}</b>
                      <span className={s.stepLabel}>{label}</span>
                    </li>
                  </Fragment>
                );
              })}
            </ol>
          </div>

          {showErrors && (
            <div className="v-notice v-notice--err" role="alert">
              <Icon name="alert" size={20} strokeWidth={2} style={{ marginTop: 2 }} />
              <span>{ERROR_SUMMARY}</span>
            </div>
          )}

          {step === 1 && (
            <div className={`v-stack v-fadein ${s.pane}`} data-dir={dir ?? undefined}>
              <fieldset className={s.fieldset}>
                <legend className={`v-label ${s.legend}`}>I&apos;m interested in</legend>
                <div className={s.chips}>
                  {TOPICS.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      className="v-chip"
                      aria-pressed={fields.topic === t.value}
                      onClick={() => setFields((f) => ({ ...f, topic: t.value }))}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="v-field">
                <label className="v-label" htmlFor={id("practice")}>
                  Practice name
                </label>
                <input
                  id={id("practice")}
                  className="v-input"
                  type="text"
                  autoComplete="organization"
                  value={fields.practice}
                  onChange={onText("practice")}
                  aria-required="true"
                  {...describe("practice")}
                />
                {errors.practice && (
                  <span id={errId("practice")} className="v-err">
                    {ERRORS.practice}
                  </span>
                )}
              </div>

              <div className="v-row2">
                <div className="v-field">
                  <label className="v-label" htmlFor={id("specialty")}>
                    Specialty
                  </label>
                  <select
                    id={id("specialty")}
                    className="v-input"
                    value={fields.specialty}
                    onChange={onText("specialty")}
                    aria-required="true"
                    {...describe("specialty")}
                  >
                    <option value="">Select…</option>
                    {SPECIALTIES.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.specialty && (
                    <span id={errId("specialty")} className="v-err">
                      {ERRORS.specialty}
                    </span>
                  )}
                </div>
                <div className="v-field">
                  <label className="v-label" htmlFor={id("locations")}>
                    Locations
                  </label>
                  <select id={id("locations")} className="v-input" value={fields.locations} onChange={onText("locations")}>
                    {LOCATIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="v-field">
                <label className="v-label" htmlFor={id("website")}>
                  Current website <span className="v-opt">(optional)</span>
                </label>
                <input
                  id={id("website")}
                  className="v-input"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="yourpractice.com"
                  value={fields.website}
                  onChange={onText("website")}
                  aria-describedby={id("website-hint")}
                />
                <span id={id("website-hint")} className="v-hint">
                  We&apos;ll review it before the call.
                </span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={`v-stack v-fadein ${s.pane}`} data-dir={dir ?? undefined}>
              <fieldset className={s.fieldset}>
                <legend className={`v-label ${s.legend}`}>
                  What would you most like to improve? <span className="v-opt">Choose any</span>
                </legend>
                <div className={s.goals}>
                  {GOALS.map((g) => {
                    const on = goals.includes(g.value);
                    return (
                      <label key={g.value} className="v-check" data-on={on}>
                        <input
                          id={id(`goal-${g.value}`)}
                          type="checkbox"
                          checked={on}
                          onChange={() => toggleGoal(g.value)}
                          {...describe("goals")}
                        />
                        {g.label}
                      </label>
                    );
                  })}
                </div>
                {errors.goals && (
                  <span id={errId("goals")} className="v-err">
                    {ERRORS.goals}
                  </span>
                )}
              </fieldset>

              <div className="v-row2">
                <div className="v-field">
                  <label className="v-label" htmlFor={id("software")}>
                    Practice software <span className="v-opt">(optional)</span>
                  </label>
                  <input
                    id={id("software")}
                    className="v-input"
                    type="text"
                    placeholder="e.g. Dentrix, athenahealth"
                    value={fields.software}
                    onChange={onText("software")}
                  />
                </div>
                <div className="v-field">
                  <label className="v-label" htmlFor={id("budget")}>
                    Monthly marketing budget <span className="v-opt">(optional)</span>
                  </label>
                  <select id={id("budget")} className="v-input" value={fields.budget} onChange={onText("budget")}>
                    {BUDGETS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="v-field">
                <label className="v-label" htmlFor={id("notes")}>
                  Anything else we should know? <span className="v-opt">(optional)</span>
                </label>
                <textarea
                  id={id("notes")}
                  className="v-input"
                  value={fields.notes}
                  onChange={onText("notes")}
                  placeholder="Competitors, timelines, what hasn't worked before…"
                  aria-describedby={id("notes-hint")}
                />
                <span id={id("notes-hint")} className="v-hint">
                  Please don&apos;t include patient health information.
                </span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={`v-stack v-fadein ${s.pane}`} data-dir={dir ?? undefined}>
              <div className="v-row2">
                <div className="v-field">
                  <label className="v-label" htmlFor={id("name")}>
                    Your name
                  </label>
                  <input
                    id={id("name")}
                    className="v-input"
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={onText("name")}
                    aria-required="true"
                    {...describe("name")}
                  />
                  {errors.name && (
                    <span id={errId("name")} className="v-err">
                      {ERRORS.name}
                    </span>
                  )}
                </div>
                <div className="v-field">
                  <label className="v-label" htmlFor={id("role")}>
                    Your role
                  </label>
                  <select id={id("role")} className="v-input" value={fields.role} onChange={onText("role")}>
                    {ROLES.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="v-row2">
                <div className="v-field">
                  <label className="v-label" htmlFor={id("email")}>
                    Work email
                  </label>
                  <input
                    id={id("email")}
                    className="v-input"
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={onText("email")}
                    aria-required="true"
                    {...describe("email")}
                  />
                  {errors.email && (
                    <span id={errId("email")} className="v-err">
                      {ERRORS.email}
                    </span>
                  )}
                </div>
                <div className="v-field">
                  <label className="v-label" htmlFor={id("phone")}>
                    Phone <span className="v-opt">(optional)</span>
                  </label>
                  <input
                    id={id("phone")}
                    className="v-input"
                    type="tel"
                    autoComplete="tel"
                    value={fields.phone}
                    onChange={onText("phone")}
                  />
                </div>
              </div>

              <div className="v-field">
                <label className="v-check" data-on={fields.consent}>
                  <input
                    id={id("consent")}
                    type="checkbox"
                    checked={fields.consent}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFields((f) => ({ ...f, consent: checked }));
                      clearError("consent");
                    }}
                    aria-required="true"
                    {...describe("consent")}
                    style={{ marginTop: 2 }}
                  />
                  <span>
                    I agree to be contacted about this inquiry, and I haven&apos;t included any patient health information.
                    See our{" "}
                    <Link className="v-link" href={ROUTES.privacy}>
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.consent && (
                  <span id={errId("consent")} className="v-err">
                    {ERRORS.consent}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className={s.nav}>
            {step > 1 && (
              <button type="button" className="v-btn v-btn--ghost" onClick={() => goToStep((step - 1) as Step, "back")}>
                Back
              </button>
            )}
            <span id={stepHintId} className={`v-hint ${s.navHint}`}>
              Step {step} of 3
            </span>
            <button type="submit" className="v-btn v-btn--primary" aria-disabled={submitting || undefined}>
              {step === 3 ? "Request my strategy call" : "Continue"} <Arrow />
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
