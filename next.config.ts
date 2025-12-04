// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SSR/hybrid is the default in Next.js App Router.
  // Removing output: "export" allows server rendering + SEO routes (sitemap/robots) + image optimization.
  trailingSlash: true,
};

export default nextConfig;
