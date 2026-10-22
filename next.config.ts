import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Every page is pre-rendered, so the build is plain files in out/ that GitHub Pages
  // serves as they are.
  output: "export",
};

export default nextConfig;
