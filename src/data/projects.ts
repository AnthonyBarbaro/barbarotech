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
},
{
  slug: "qr-badge-system",
  title: "Employee QR Badge & Scan Tracking System",
  summary: "Serverless QR identity system with device-level tracking and Zebra printer integration.",
  description:
    "A production-grade QR badge system built to generate unique employee QR codes, track scans across devices, and support high-volume physical label printing. The system integrates a serverless AWS backend with printer-native ZPL generation for reliable hardware output.",
  tech: [
    "AWS Lambda",
    "API Gateway",
    "DynamoDB",
    "Python",
    "ZPL",
    "CSV Pipelines",
  ],
  highlights: [
    "Serverless backend with scan + unique device tracking",
    "Printer-native ZPL generation for Zebra hardware",
    "Batch label generation grouped by store location",
    "QR routing with platform-aware redirects",
  ],
  links: [
    { label: "Architecture notes", href: "#" },
  ],
  image: "/projects/qr-code-1.png",
  featured: true,

  metrics: [
    { label: "Labels printed", value: "100s+" },
    { label: "Latency", value: "<50ms per scan" },
    { label: "Infra", value: "100% serverless" },
  ],
  problem:
    "Needed a reliable way to generate and track employee QR badges while integrating with thermal printer hardware and avoiding brittle PDF-based workflows.",
  solution:
    "Built a serverless AWS system with native ZPL output to bypass PDF scaling issues and ensure consistent printing across Zebra devices.",
  results: [
    "Reliable QR scanning across devices",
    "Accurate scan metrics per employee",
    "Eliminated manual label generation",
  ],
},
{
  slug: "buzz-cannabis-platform",
  title: "Multi-Location Retail Web Platform",
  summary: "Production Next.js website with CMS-driven content and SEO-first architecture.",
  description:
    "A fully custom, production web platform built with Next.js and TinaCMS to support a multi-location retail business. The site features store-specific routing, dynamic SEO pages, and a CMS-backed content workflow, and is actively used by real customers.",
  tech: [
    "Next.js",
    "React",
    "TypeScript",
    "TinaCMS",
    "Vercel",
    "REST APIs",
  ],
  highlights: [
    "Multi-location routing and store-specific pages",
    "Headless CMS using TinaCMS (Git-backed)",
    "SEO-first architecture with dynamic metadata",
    "Custom API routes and backend utilities",
  ],
  links: [
    { label: "Live site", href: "https://buzzcannabis.com" },
  ],
  image: "/projects/buzz-cannabis.png",
  featured: true,

  metrics: [
    { label: "Locations supported", value: "Multiple" },
    { label: "Deploys", value: "Ongoing production" },
    { label: "Platform", value: "Vercel" },
  ],
  problem:
    "Needed a fast, maintainable, SEO-optimized website capable of supporting multiple physical locations with independent content and routing.",
  solution:
    "Designed a custom Next.js platform with TinaCMS to enable structured content management and scalable routing without relying on templates or page builders.",
  results: [
    "Improved SEO structure for local search",
    "Clean, mobile-first user experience",
    "Easy content updates via CMS",
  ],
}


  ];
  