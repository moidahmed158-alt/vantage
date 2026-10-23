import type { ReactNode } from "react";

/**
 * Radar backdrop: concentric rings, a rotating dashed ring and a sweeping beam.
 * Children are layered on top (core, blips, flow lines).
 */
export function Radar({
  children,
  className = "",
  inner = true,
  axes = true,
  label,
}: {
  children?: ReactNode;
  className?: string;
  /** Show the innermost glowing ring. */
  inner?: boolean;
  axes?: boolean;
  label?: string;
}) {
  return (
    <div className={`v-radar ${className}`.trim()} role={label ? "img" : undefined} aria-label={label}>
      <div className="v-radar-ring v-radar-ring--1" />
      <div className="v-radar-ring v-radar-ring--2" />
      <div className="v-radar-ring v-radar-ring--3" />
      {inner && <div className="v-radar-ring v-radar-ring--4" />}
      {axes && (
        <>
          <div className="v-radar-axis" />
          <div className="v-radar-axis v-radar-axis--h" />
        </>
      )}
      <div className="v-radar-sweep" />
      {children}
    </div>
  );
}
