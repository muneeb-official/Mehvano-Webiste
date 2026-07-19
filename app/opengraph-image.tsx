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
          background: "linear-gradient(135deg, #1c1c1b 0%, #2a2723 55%, #3a342c 100%)",
          color: "#ecebe7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#b7ac9b",
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
                background: "#1c1c1b",
                transform: "rotate(45deg)",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>
              {SITE.brandShort} <span style={{ color: "#b7ac9b" }}>.</span>
            </span>
            <span style={{ fontSize: 15, letterSpacing: 4, color: "#ada79c", textTransform: "uppercase" }}>
              Realty
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 20, letterSpacing: 3, color: "#b7ac9b", textTransform: "uppercase" }}>
            Anne Arundel & Howard County, MD
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
            Find your next home in Maryland
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: 26, color: "#ada79c" }}>
            Mehvish Aslam · REALTOR®
          </span>
          <span style={{ fontSize: 24, color: "#b7ac9b" }}>homesbymehvish.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
