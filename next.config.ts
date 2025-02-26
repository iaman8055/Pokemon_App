import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["raw.githubusercontent.com"], // ✅ Allow external images from GitHub
  }
};

export default nextConfig;
