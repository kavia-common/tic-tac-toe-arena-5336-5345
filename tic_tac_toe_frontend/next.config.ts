import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard server build
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  // Ensure stable builder in CI
  experimental: {
    turbo: {
      // Disable turbopack customizations in production builds for stability in some CI environments
      resolveAlias: {},
    },
  },
};

export default nextConfig;
