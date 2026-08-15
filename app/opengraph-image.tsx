import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const alt = `${SITE.brand} — ${SITE.tagline}`;
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
          background: "linear-gradient(135deg, #131720 0%, #1c2230 55%, #2b3446 100%)",
          color: "#eaedf2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#aebccf",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 5,
                background: "#131720",
                transform: "rotate(45deg)",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>
              {SITE.brandShort} <span style={{ color: "#aebccf" }}>.</span>
            </span>
            <span style={{ fontSize: 15, letterSpacing: 4, color: "#a4adbd", textTransform: "uppercase" }}>
              LLC
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 20, letterSpacing: 3, color: "#aebccf", textTransform: "uppercase" }}>
            Serving the United States
          </span>
          <span
            style={{
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
              marginTop: 20,
              textTransform: "uppercase",
              maxWidth: 980,
            }}
          >
            One trusted partner for every service
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: 26, color: "#a4adbd" }}>
            Medical · AI · Real Estate · IT · Business
          </span>
          <span style={{ fontSize: 24, color: "#aebccf" }}>mehvano.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
