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
          background: "linear-gradient(135deg, #16130e 0%, #2a2419 55%, #4a3d28 100%)",
          color: "#f7f4ee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#f2b53c",
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
                background: "#16130e",
                transform: "rotate(45deg)",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>
              {SITE.brandShort} <span style={{ color: "#f2b53c" }}>.</span>
            </span>
            <span style={{ fontSize: 15, letterSpacing: 4, color: "#c7bfb2", textTransform: "uppercase" }}>
              Realty
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 20, letterSpacing: 3, color: "#f2b53c", textTransform: "uppercase" }}>
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
          <span style={{ fontSize: 26, color: "#c7bfb2" }}>
            Mehvish Aslam · REALTOR®
          </span>
          <span style={{ fontSize: 24, color: "#f2b53c" }}>homesbymehvish.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
