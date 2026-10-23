/** Join class names, skipping falsy values. */
export const cx = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(" ");

/** 0-based index → "01", "02", … */
export const nn = (i: number) => String(i + 1).padStart(2, "0");
