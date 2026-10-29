import type { MetadataRoute } from "next";
import { GUIDES } from "@/data/guides";
import { BLOG_POSTS } from "@/data/blog";
import { PROJECTS } from "@/data/projects";
import { SERVICE_LANDINGS } from "@/data/services";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

const CORE_ROUTES = [
  "/",
  "/about/",
  "/projects/",
  "/pricing/",
  "/contact/",
  "/services/",
  "/guides/",
  "/blog/",
  "/services/shopify-developer/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = CORE_ROUTES.map((route) => ({
    url: canonicalUrl(route),
  }));
  const servicePages: MetadataRoute.Sitemap = SERVICE_LANDINGS.map((service) => ({
    url: canonicalUrl(`/services/${service.slug}/`),
  }));
  const guidePages: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: canonicalUrl(`/guides/${guide.slug}/`),
  }));
  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: canonicalUrl(`/projects/${project.slug}/`),
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: canonicalUrl(`/blog/${post.slug}/`),
    lastModified: post.publishedAt,
  }));

  return [...corePages, ...servicePages, ...guidePages, ...projectPages, ...blogPages];
}
