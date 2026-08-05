import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Add IDX / listing image hosts here in Phase 2 (must be Bright MLS-approved).
    ],
  },
  // Real-estate & portfolio routes are temporarily hidden while that division
  // is offline. The page files still exist, but these TEMPORARY (307) redirects
  // send any direct visit to the homepage so nothing 404s. Delete these entries
  // to bring the routes back — no page code needs to change.
  async redirects() {
    const hidden = [
      "/portfolio",
      "/home-value",
      "/listings",
      "/neighborhoods",
      "/market-reports",
      "/guides",
      "/services/real-estate",
    ];
    return hidden.flatMap((source) => [
      { source, destination: "/", permanent: false },
      { source: `${source}/:path*`, destination: "/", permanent: false },
    ]);
  },
};

export default nextConfig;
