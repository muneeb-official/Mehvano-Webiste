import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.brand,
    short_name: SITE.brandShort,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f2f2f2",
    theme_color: "#06323b",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
