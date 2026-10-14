import type { NextConfig } from "next";

// Static export for GitHub Pages user site (repo: naeemdesigns.github.io, served from "/").
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
