import Link from "next/link";
import { useId } from "react";

type MarkProps = {
  size?: number | string;
  /** Animate the ring, V and node drawing in. */
  draw?: boolean;
  glow?: boolean;
  /** Lighter gradient used on the radar core. */
  tone?: "default" | "light" | "solid";
  className?: string;
  label?: string;
};

/** The Vantage mark: a ring (field of view), a V (verified trust) and a node breaking out. */
export function Mark({ size = 40, draw, glow = true, tone = "default", className = "", label }: MarkProps) {
  const gid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const stops =
    tone === "light"
      ? [
          ["0", "#2f8cff"],
          ["1", "#cfe6ff"],
        ]
      : [
          ["0", "#1565e6"],
          [".55", "#2f8cff"],
          ["1", "#8fe0ff"],
        ];
  const cls = ["v-mark", glow && "v-glow", draw && "v-draw", className].filter(Boolean).join(" ");
  return (
    <svg
      className={cls}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={`vg${gid}`} x1="12" y1="52" x2="56" y2="6" gradientUnits="userSpaceOnUse">
          {stops.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </linearGradient>
      </defs>
      <path
        className="m-ring"
        d="M47.54 25.14A21 21 0 1 1 41.93 18.45"
        fill="none"
        stroke="#7db8ff"
        strokeOpacity=".65"
        strokeWidth="2.4"
        strokeLinecap="round"
        pathLength={100}
      />
      <path
        className="m-v"
        d="M17 25L29 47L53 9"
        fill="none"
        stroke={tone === "solid" ? "#8fe0ff" : `url(#vg${gid})`}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
      />
      <circle className="m-node" cx="53" cy="9" r="4.2" fill={tone === "solid" ? "#ffffff" : "#8fe0ff"} />
    </svg>
  );
}

export function Logo({ size = 40, draw, className = "" }: { size?: number; draw?: boolean; className?: string }) {
  return (
    <Link href="/" className={`v-logo ${className}`.trim()} aria-label="Vantage Digital Health — home">
      <Mark size={size} draw={draw} />
      <span className="v-word">
        <b>VANTAGE</b>
        <i>Digital Health</i>
      </span>
    </Link>
  );
}
