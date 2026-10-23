import { useId, type CSSProperties } from "react";

/*
 * Custom renderings of the Vantage mark used on the brand board (variants that differ from <Mark />:
 * flat colours, one-colour, favicon simplifications, motion frames and misuse examples).
 * Colours are the design's own values; the misuse "recolour" example is deliberately off-palette.
 */

const RING = "M47.54 25.14A21 21 0 1 1 41.93 18.45";
const V = "M17 25L29 47L53 9";

type StrokeSpec = { color: string; opacity?: number; width?: number; /** 0–100 along the path */ dashOffset?: number };

/** Flat (non-gradient) mark built from the ring, the V and the node. Pass `false` to omit a part. */
export function FlatMark({
  size = 64,
  ring,
  v,
  node,
  closedRing,
  glow,
  className = "",
  style,
}: {
  size?: number;
  ring: StrokeSpec | false;
  v: StrokeSpec | false;
  node: { color: string; r?: number } | false;
  /** Misuse example: a full circle instead of the broken ring. */
  closedRing?: boolean;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const dash = (spec: StrokeSpec) =>
    spec.dashOffset === undefined ? {} : { pathLength: 100, strokeDasharray: 100, strokeDashoffset: spec.dashOffset };
  return (
    <svg
      className={[glow && "v-glow", className.trim()].filter(Boolean).join(" ") || undefined}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {ring &&
        (closedRing ? (
          <circle cx="29" cy="35" r="21" fill="none" stroke={ring.color} strokeOpacity={ring.opacity} strokeWidth={ring.width ?? 2.4} />
        ) : (
          <path
            d={RING}
            fill="none"
            stroke={ring.color}
            strokeOpacity={ring.opacity}
            strokeWidth={ring.width ?? 2.4}
            strokeLinecap="round"
            {...dash(ring)}
          />
        ))}
      {v && (
        <path
          d={V}
          fill="none"
          stroke={v.color}
          strokeWidth={v.width ?? 5}
          strokeLinecap="round"
          strokeLinejoin="round"
          {...dash(v)}
        />
      )}
      {node && <circle cx="53" cy="9" r={node.r ?? 4.2} fill={node.color} />}
    </svg>
  );
}

/** Mark on a light ground: deep-blue gradient, no glow. */
export function LightMark({ size = 64, className = "" }: { size?: number; className?: string }) {
  const gid = `bl${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg className={`v-mark ${className}`.trim()} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gid} x1="12" y1="52" x2="56" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0a2f7a" />
          <stop offset="1" stopColor="#1565e6" />
        </linearGradient>
      </defs>
      <path d={RING} fill="none" stroke="#1565e6" strokeOpacity=".55" strokeWidth="2.4" strokeLinecap="round" />
      <path d={V} fill="none" stroke={`url(#${gid})`} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="53" cy="9" r="4.2" fill="#1565e6" />
    </svg>
  );
}

const GRID_LINES =
  "M4 0V64M8 0V64M12 0V64M16 0V64M20 0V64M24 0V64M28 0V64M32 0V64M36 0V64M40 0V64M44 0V64M48 0V64M52 0V64M56 0V64M60 0V64M0 4H64M0 8H64M0 12H64M0 16H64M0 20H64M0 24H64M0 28H64M0 32H64M0 36H64M0 40H64M0 44H64M0 48H64M0 52H64M0 56H64M0 60H64";

/** Construction drawing: the mark on its 64-unit grid with the ring centre and the 24° break marked. */
export function MarkDiagram({ className = "" }: { className?: string }) {
  const gid = `bd${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <g stroke="#2f8cff" strokeOpacity=".12" strokeWidth=".06">
        <path d={GRID_LINES} />
      </g>
      <circle cx="29" cy="35" r="21" fill="none" stroke="#5cc8ff" strokeOpacity=".25" strokeWidth=".12" strokeDasharray=".5 .5" />
      <path d="M44 16 L50 13" stroke="#f5a524" strokeWidth=".18" strokeDasharray=".5 .4" />
      <g className="v-glow">
        <defs>
          <linearGradient id={gid} x1="12" y1="52" x2="56" y2="6" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1565e6" />
            <stop offset=".55" stopColor="#2f8cff" />
            <stop offset="1" stopColor="#8fe0ff" />
          </linearGradient>
        </defs>
        <path d={RING} fill="none" stroke="#7db8ff" strokeOpacity=".65" strokeWidth="2.4" strokeLinecap="round" />
        <path d={V} fill="none" stroke={`url(#${gid})`} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="53" cy="9" r="4.2" fill="#8fe0ff" />
      </g>
      <circle cx="29" cy="35" r=".5" fill="#5cc8ff" />
    </svg>
  );
}

/* ---------- preset variants ---------- */

const RING_DEFAULT = { color: "#7db8ff", opacity: 0.65 };
const V_SOLID = { color: "#2f8cff" };
const NODE_DEFAULT = { color: "#8fe0ff" };

export const CompactMark = ({ className }: { className?: string }) => (
  <FlatMark size={54} ring={RING_DEFAULT} v={V_SOLID} node={NODE_DEFAULT} glow className={`v-mark ${className ?? ""}`} />
);

export const OneColourMark = ({ tone, className }: { tone: "white" | "ink"; className?: string }) =>
  tone === "white" ? (
    <FlatMark size={80} ring={{ color: "#ffffff", opacity: 0.6 }} v={{ color: "#ffffff" }} node={{ color: "#ffffff" }} className={`v-mark ${className ?? ""}`} />
  ) : (
    <FlatMark size={80} ring={{ color: "#04070e", opacity: 0.55 }} v={{ color: "#04070e" }} node={{ color: "#04070e" }} className={`v-mark ${className ?? ""}`} />
  );

/** Motion storyboard frames 1–3 (frame 4 is the live <Mark draw />). */
export const MotionFrame = ({ step, className }: { step: 1 | 2 | 3; className?: string }) => {
  if (step === 1) return <FlatMark size={96} ring={{ ...RING_DEFAULT, dashOffset: 55 }} v={false} node={false} className={className} />;
  if (step === 2) return <FlatMark size={96} ring={RING_DEFAULT} v={{ ...V_SOLID, dashOffset: 50 }} node={false} className={className} />;
  return <FlatMark size={96} ring={RING_DEFAULT} v={V_SOLID} node={{ color: "#8fe0ff", r: 2 }} className={className} />;
};

/** Favicon, app icon and social avatar renderings, each on its own tile. */
export function Favicon16({ className }: { className?: string }) {
  return <FlatMark size={13} ring={false} v={{ color: "#5cc8ff", width: 9 }} node={false} className={className} />;
}
export function Favicon32({ className }: { className?: string }) {
  return <FlatMark size={26} ring={{ color: "#7db8ff", opacity: 0.7, width: 4 }} v={{ color: "#5cc8ff", width: 7 }} node={false} className={className} />;
}
export function AppIconMark({ className }: { className?: string }) {
  return (
    <FlatMark
      size={50}
      ring={{ color: "#7db8ff", opacity: 0.7, width: 2.6 }}
      v={{ color: "#2f8cff", width: 5.2 }}
      node={{ color: "#8fe0ff", r: 4.4 }}
      glow
      className={className}
    />
  );
}
export function SocialMark({ className }: { className?: string }) {
  return (
    <FlatMark
      size={58}
      ring={{ color: "#ffffff", opacity: 0.6, width: 2.6 }}
      v={{ color: "#ffffff", width: 5.2 }}
      node={{ color: "#8fe0ff", r: 4.4 }}
      className={className}
    />
  );
}

/** Misuse examples, in the order shown on the board. */
export const MisuseRotated = () => (
  <FlatMark ring={RING_DEFAULT} v={V_SOLID} node={NODE_DEFAULT} style={{ transform: "rotate(-24deg)" }} />
);
export const MisuseClosed = () => <FlatMark ring={RING_DEFAULT} v={V_SOLID} node={NODE_DEFAULT} closedRing />;
export const MisuseRecoloured = () => <FlatMark ring={{ color: "#e04848" }} v={{ color: "#3bd16f" }} node={{ color: "#f5a524" }} />;
export const MisuseOverglow = () => (
  <FlatMark
    ring={{ color: "#fff" }}
    v={{ color: "#fff" }}
    node={{ color: "#fff" }}
    style={{ filter: "drop-shadow(0 0 4px #fff) drop-shadow(0 0 12px #2f8cff) drop-shadow(0 0 24px #2f8cff) drop-shadow(0 0 40px #8fe0ff)" }}
  />
);
export const MisuseRetyped = ({ wordClassName }: { wordClassName?: string }) => (
  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <FlatMark size={40} ring={RING_DEFAULT} v={V_SOLID} node={NODE_DEFAULT} />
    <span className={wordClassName}>Vantage</span>
  </span>
);
