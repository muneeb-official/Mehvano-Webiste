import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.brand,
    short_name: SITE.brandShort,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#e8ebef",
    theme_color: "#131720",
    icons: [{ src: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" }],
  };
}
