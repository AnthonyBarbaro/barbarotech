import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { SERVICE_LANDINGS } from "@/data/services";
import { canonicalUrl } from "@/lib/seo";

const CORE_ROUTES = ["/", "/about/", "/projects/", "/pricing/", "/contact/", "/services/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = CORE_ROUTES.map((route) => ({
    url: canonicalUrl(route),
  }));
  const servicePages: MetadataRoute.Sitemap = SERVICE_LANDINGS.map((service) => ({
    url: canonicalUrl(`/services/${service.slug}/`),
  }));
  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: canonicalUrl(`/projects/${project.slug}/`),
  }));

  return [...corePages, ...servicePages, ...projectPages];
}
