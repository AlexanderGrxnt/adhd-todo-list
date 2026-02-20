import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  // Only apply the GitHub Pages sub-path in production builds.
  // In development the app is served from the root so the dev server works normally.
  basePath: isProd ? "/adhd-todo-list" : "",
  assetPrefix: isProd ? "/adhd-todo-list" : "",
};

export default nextConfig;
