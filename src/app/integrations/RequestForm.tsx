"use client";

import { useId, useRef, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { Ph } from "@/components/ui/Flag";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/lib/site";
import { FIELD_ERRORS, REQUEST_CATEGORIES, validateRequest, type RequiredField } from "./data";
import { useRequestForm } from "./RequestContext";
import styles from "./RequestForm.module.css";

/** Fallback while the form has no submission endpoint (same link as the design). */
const MAILTO = `mailto:${SITE.email}?subject=Integration%20assessment`;

const FIELD_ORDER = Object.keys(FIELD_ERRORS) as RequiredField[];

/** "Request an integration assessment" form: validation on submit, then the "ready — not sent" notice. */
export function RequestForm() {
  const { fields, errors, sent, setField, setErrors, setSent, softwareRef, categoryRef } = useRequestForm();
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const practiceRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const errCount = Object.keys(errors).length;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateRequest(fields);
    const first = FIELD_ORDER.find((k) => found[k]);
    if (first) {
      // Commit aria-invalid + error text first so focus lands on a field that already announces its error.
      flushSync(() => {
        setErrors(found);
        setSent(false);
      });
      const refs = { software: softwareRef, practice: practiceRef, name: nameRef, email: emailRef };
      refs[first].current?.focus();
    } else {
      flushSync(() => {
        setErrors({});
        setSent(true);
      });
      statusRef.current?.scrollIntoView({ block: "nearest" });
    }
  };

  const a11y = (k: RequiredField) => ({
    "aria-required": true,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? id(`${k}-err`) : undefined,
  });

  const error = (k: RequiredField) =>
    errors[k] ? (
      <span id={id(`${k}-err`)} className={`v-err ${styles.err}`}>
        <Icon name="alert" size={16} strokeWidth={2} />
        {FIELD_ERRORS[k]}
      </span>
    ) : null;

  return (
    <form className={`v-panel v-form ${styles.form}`} noValidate onSubmit={onSubmit} aria-labelledby={id("title")}>
      <div className={styles.head}>
        <h3 id={id("title")} className="v-h3">
          Request an integration assessment
        </h3>
        {/* Live regions stay mounted so their content changes are announced. */}
        <div role="alert" className={styles.live}>
          {errCount > 0 && (
            <div className="v-notice v-notice--err v-fadein">
              <Icon name="alert" size={20} strokeWidth={2} />
              <span>Please fix the {errCount} highlighted field(s) below.</span>
            </div>
          )}
        </div>
        <div ref={statusRef} role="status" className={styles.live}>
          {sent && (
            <div className="v-notice v-notice--warn v-fadein">
              <Icon name="info" size={20} strokeWidth={2} />
              <span>
                <strong>Request ready — not sent.</strong> This form isn&apos;t connected to a submission service yet{" "}
                <Ph>[FORM ENDPOINT]</Ph>. Until it is, please email{" "}
                <a className="v-link" href={MAILTO}>
                  {SITE.email}
                </a>
                .
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="v-row2">
        <div className="v-field">
          <label className="v-label" htmlFor={id("software")}>
            Software name
          </label>
          <input
            ref={softwareRef}
            id={id("software")}
            className="v-input"
            type="text"
            autoComplete="off"
            value={fields.software}
            onChange={(e) => setField("software", e.target.value)}
            {...a11y("software")}
          />
          {error("software")}
        </div>
        <div className="v-field">
          <label className="v-label" htmlFor={id("category")}>
            Category
          </label>
          <select
            ref={categoryRef}
            id={id("category")}
            className="v-input"
            value={fields.category}
            onChange={(e) => setField("category", e.target.value)}
          >
            {REQUEST_CATEGORIES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="v-row2">
        <div className="v-field">
          <label className="v-label" htmlFor={id("practice")}>
            Practice name
          </label>
          <input
            ref={practiceRef}
            id={id("practice")}
            className="v-input"
            type="text"
            autoComplete="organization"
            value={fields.practice}
            onChange={(e) => setField("practice", e.target.value)}
            {...a11y("practice")}
          />
          {error("practice")}
        </div>
        <div className="v-field">
          <label className="v-label" htmlFor={id("name")}>
            Your name
          </label>
          <input
            ref={nameRef}
            id={id("name")}
            className="v-input"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => setField("name", e.target.value)}
            {...a11y("name")}
          />
          {error("name")}
        </div>
      </div>

      <div className="v-field">
        <label className="v-label" htmlFor={id("email")}>
          Work email
        </label>
        <input
          ref={emailRef}
          id={id("email")}
          className="v-input"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          value={fields.email}
          onChange={(e) => setField("email", e.target.value)}
          {...a11y("email")}
        />
        {error("email")}
      </div>

      <div className="v-field">
        <label className="v-label" htmlFor={id("notes")}>
          What should it connect to? <span className="v-opt">(optional)</span>
        </label>
        <textarea
          id={id("notes")}
          className="v-input"
          value={fields.notes}
          onChange={(e) => setField("notes", e.target.value)}
          aria-describedby={id("notes-hint")}
        />
        <span id={id("notes-hint")} className="v-hint">
          Please don&apos;t include any patient information.
        </span>
      </div>

      <button className={`v-btn v-btn--primary ${styles.submit}`} type="submit">
        Request assessment
      </button>
    </form>
  );
}
