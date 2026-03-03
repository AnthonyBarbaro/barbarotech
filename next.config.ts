import type { NextConfig } from "next";

const isStaticExport =
  process.env.STATIC_EXPORT === "1" || process.env.STATIC_EXPORT?.toLowerCase() === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
