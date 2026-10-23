import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#eef2f8",
          backgroundColor: "#03050b",
          backgroundImage: "radial-gradient(circle at 100% 0%, rgba(31,123,255,.5), rgba(3,5,11,0) 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="84" height="84" viewBox="0 0 64 64">
            <path d="M47.54 25.14A21 21 0 1 1 41.93 18.45" fill="none" stroke="#7db8ff" strokeOpacity=".7" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M17 25L29 47L53 9" fill="none" stroke="#5cc8ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="53" cy="9" r="4.4" fill="#8fe0ff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 12 }}>VANTAGE</span>
            <span style={{ fontSize: 15, letterSpacing: 7, color: "#8fe0ff", textTransform: "uppercase", marginTop: 6 }}>Digital Health</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2.5, maxWidth: 940 }}>
            Own the high ground in your local market.
          </div>
          <div style={{ fontSize: 28, color: "#9aa8bf" }}>{`${SITE.tagline} The growth partner for medical and dental practices.`}</div>
        </div>
      </div>
    ),
    size,
  );
}
