import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ This disables ESLint errors during Vercel build
  },
  // other config options here
};

export default nextConfig;
