import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Turbopack on Windows can mis-resolve the project root during HMR.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
