"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { EMPTY_REQUEST, type CategoryKey, type RequestErrors, type RequestFields, type RequiredField } from "./data";

/**
 * Shared state for the integration-assessment form, so the directory's
 * "Request an assessment for …" actions can prefill it (as the design's goRequest() does).
 */
type RequestCtx = {
  fields: RequestFields;
  errors: RequestErrors;
  sent: boolean;
  /** Update one field; clears that field's error and the "ready" notice. */
  setField: (key: keyof RequestFields, value: string) => void;
  setErrors: (errors: RequestErrors) => void;
  setSent: (sent: boolean) => void;
  /** Prefill Software name (and Category, when known), then focus the field once the #request jump starts. */
  prefill: (software: string, category?: CategoryKey | "") => void;
  softwareRef: RefObject<HTMLInputElement | null>;
  categoryRef: RefObject<HTMLSelectElement | null>;
};

type Prefill = RequestCtx["prefill"];

const RequestContext = createContext<RequestCtx | null>(null);
/** Stable prefill action on its own, so the directory doesn't re-render on every form keystroke. */
const PrefillContext = createContext<Prefill | null>(null);

const without = (e: RequestErrors, key: RequiredField): RequestErrors => {
  const next = { ...e };
  delete next[key];
  return next;
};

/** Brief glow on a prefilled field so the change is noticeable after the scroll. */
function flash(el: HTMLElement | null) {
  if (!el || typeof el.animate !== "function") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const glow = "0 0 0 4px rgba(92, 200, 255, .4), 0 0 32px -4px rgba(92, 200, 255, .9)";
  el.animate(
    [
      { boxShadow: glow, borderColor: "#8fe0ff", offset: 0 },
      { boxShadow: glow, borderColor: "#8fe0ff", offset: 0.45 },
      { boxShadow: "0 0 0 0 rgba(92, 200, 255, 0)" },
    ],
    { duration: 2000, easing: "cubic-bezier(.16, 1, .3, 1)" },
  );
}

export function RequestProvider({ children }: { children: ReactNode }) {
  const [fields, setFields] = useState<RequestFields>(EMPTY_REQUEST);
  const [errors, setErrors] = useState<RequestErrors>({});
  const [sent, setSent] = useState(false);
  const softwareRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  const setField = useCallback((key: keyof RequestFields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => (key in e ? without(e, key as RequiredField) : e));
    setSent(false);
  }, []);

  const prefill = useCallback((software: string, category: CategoryKey | "" = "") => {
    setFields((f) => ({ ...f, software, category: category || f.category }));
    setErrors((e) => (e.software ? without(e, "software") : e));
    setSent(false);
    // The link's own #request jump runs after this handler; focus without fighting its scroll.
    requestAnimationFrame(() => {
      const input = softwareRef.current;
      if (!input) return;
      input.focus({ preventScroll: true });
      flash(input);
      if (category) flash(categoryRef.current);
    });
  }, []);

  const value = useMemo<RequestCtx>(
    () => ({ fields, errors, sent, setField, setErrors, setSent, prefill, softwareRef, categoryRef }),
    [fields, errors, sent, setField, prefill],
  );

  return (
    <PrefillContext value={prefill}>
      <RequestContext value={value}>{children}</RequestContext>
    </PrefillContext>
  );
}

export function useRequestForm(): RequestCtx {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error("useRequestForm must be used inside <RequestProvider>");
  return ctx;
}

export function useRequestPrefill(): Prefill {
  const prefill = useContext(PrefillContext);
  if (!prefill) throw new Error("useRequestPrefill must be used inside <RequestProvider>");
  return prefill;
}
