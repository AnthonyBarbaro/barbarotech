import { SITE } from "@/lib/site";

export const BASE_KEYWORDS = [
  "BarbaroTech",
  "Anthony Barbaro",
  "web developer San Diego",
  "software engineer San Diego",
  "Next.js developer",
  "full-stack developer",
  "freelance web developer",
  "freelance software engineer",
  "AI automation developer",
  "AI automation freelancer",
  "business automation",
  "website redesign",
  "Shopify developer",
  "Shopify freelancer",
  "custom web app development",
  "SEO-focused websites",
];

export const SITE_LOCALE = "en_US";

export function canonicalUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withTrailingSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;

  if (withTrailingSlash === "//") return `${SITE.url}/`;

  return `${SITE.url}${withTrailingSlash}`;
}

export function withBaseKeywords(extra: string[] = []) {
  return Array.from(new Set([...BASE_KEYWORDS, ...extra]));
}

export function estimateWordCount(parts: string[]) {
  return parts
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}
