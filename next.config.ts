import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Change this to match your GitHub repository name
  basePath: "/adhd-todo-list",
  assetPrefix: "/adhd-todo-list",
};

export default nextConfig;
