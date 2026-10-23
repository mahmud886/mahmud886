import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Every image in public/ is already a compressed WebP sized for the page, so serve the
    // files as they are. (Vercel's optimiser is metered; once its quota runs out every
    // /_next/image request fails with 402 and images vanish.)
    unoptimized: true,
  },
};

export default nextConfig;
