export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  highlights: string[];
  links: { label: string; href: string }[];
  image?: string;
  featured?: boolean;

  // ✅ Optional, case-study fields
  metrics?: ProjectMetric[];
  problem?: string;
  solution?: string;
  results?: string[];
};
  
  export const PROJECTS: Project[] = [
{
  slug: "barbarotech-site",
  title: "BarbaroTech Website",
  summary: "Static Next.js portfolio + services site with pricing and SMS inquiries.",
  description:
    "A complete personal portfolio and client services website built for fast page loads, SEO, clean design, and easy maintenance.",
  tech: ["Next.js", "TypeScript", "Tailwind CSS", "Static Export"],
  highlights: [
    "Static HTML export for S3 + CloudFront",
    "Dynamic project pages with clean routing",
    "SMS-to-phone inquiry system",
  ],
  links: [
    { label: "Live site", href: "https://barbaro.tech" },
    { label: "GitHub", href: "https://github.com/AnthonyBarbaro/barbarotech" },
  ],
  image: "/projects/barbarotech.png",
  featured: true,

  // ✅ new, optional
  metrics: [
    { label: "Performance", value: "95+ Lighthouse" },
    { label: "Build time", value: "1 week" },
    { label: "Hosting", value: "AWS + CloudFront" },
  ],
  problem: "Needed a premium, fast-loading site to showcase skills and attract clients.",
  solution: "Built a static Next.js site with SEO structure and clean UI.",
  results: ["Fast load times", "Clean UX", "Easy maintenance"],
}

  ];
  