import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.brand,
    short_name: SITE.brandShort,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#e2e2de",
    theme_color: "#1c1c1b",
    icons: [{ src: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" }],
  };
}
