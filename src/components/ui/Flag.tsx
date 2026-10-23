import type { CSSProperties, ReactNode } from "react";
import { SHOW_CONTENT_FLAGS } from "@/lib/site";

/** Amber review note ("verify before publishing"). Hidden site-wide when SHOW_CONTENT_FLAGS is false. */
export function Flag({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  if (!SHOW_CONTENT_FLAGS) return null;
  return (
    <span className={`v-flag ${className}`.trim()} style={style}>
      {children}
    </span>
  );
}

/**
 * Inline placeholder chip such as [PRICE] for copy still to be supplied.
 * Always renders, since the text it stands in for is missing either way.
 */
export function Ph({ children }: { children: ReactNode }) {
  return <span className="v-ph">{children}</span>;
}
