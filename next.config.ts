import { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⬅️ Ignore ESLint errors during builds
  },
};

export default nextConfig;
