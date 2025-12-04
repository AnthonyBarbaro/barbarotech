import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/projects/`, lastModified: new Date() },
    { url: `${base}/pricing/`, lastModified: new Date() },
    { url: `${base}/about/`, lastModified: new Date() },
    { url: `${base}/contact/`, lastModified: new Date() },
  ];
}
