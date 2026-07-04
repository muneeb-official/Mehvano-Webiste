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
  async redirects() {
    return [];
  },
};

export default nextConfig;
