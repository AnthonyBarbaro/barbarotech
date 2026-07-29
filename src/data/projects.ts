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
  summary: "Portfolio and services site with pricing, project pages, and quick inquiry paths.",
  description:
    "A complete personal portfolio and client services website built for fast page loads, SEO, clean design, and easy maintenance.",
  tech: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
  highlights: [
    "Fast, low-maintenance website structure",
    "Project pages with clean routing",
    "SMS-to-phone inquiry system",
  ],
  links: [
    { label: "Live site", href: "https://barbaro.tech" },
  ],
  image: "/projects/barbarotech.png",
  featured: true,

  // ✅ new, optional
  metrics: [
    { label: "Performance", value: "95+ Lighthouse" },
    { label: "Build time", value: "1 week" },
    { label: "Focus", value: "Fast launch" },
  ],
  problem: "Needed a premium, fast-loading site to showcase skills and attract clients.",
  solution: "Built a performance-focused site with SEO structure and clean UI.",
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
    "Built a cloud-based system with native ZPL output to bypass PDF scaling limitations and ensure consistent printing across Zebra devices.",
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
    "A fully custom, production web platform built to support a multi-location retail business. The site features store-specific routing, dynamic SEO pages, and a structured content workflow, and is actively used by real visitors.",
  tech: [
    "Next.js",
    "React",
    "TypeScript",
    "TinaCMS",
    "Local SEO",
  ],
  highlights: [
    "Multi-location routing and store-specific pages",
    "Structured content management workflow",
    "SEO-first architecture with dynamic metadata",
    "Custom backend utilities",
  ],
  links: [
    { label: "Live site", href: "https://buzzcannabis.com" },
  ],
  image: "/projects/buzz-cannabis.png",
  featured: true,

  metrics: [
    { label: "Locations supported", value: "Multiple" },
    { label: "Status", value: "Ongoing production" },
    { label: "Focus", value: "Local SEO" },
  ],
  problem:
    "Needed a fast, maintainable, SEO-optimized website capable of supporting multiple physical locations with independent content and routing.",
  solution:
    "Designed a custom content workflow with scalable routing and local SEO structure without relying on page builders.",
  results: [
    "Improved SEO structure for local search",
    "Clean, mobile-first user experience",
    "Easy content updates via CMS",
  ],
},

{
  slug: "island-view-market-liquor",
  title: "Island View Market & Liquor — Mobile-First Marketing Website",
  summary:
    "Mobile-first marketing website with local SEO, structured business content, and fast browsing.",
  description:
    "Designed and developed a mobile-first marketing website for a long-established neighborhood market in San Diego. The site highlights hours, services, location details, and local search readiness.",
  tech: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "SEO",
    "JSON-LD",
  ],
  highlights: [
    "Custom mobile-first UI/UX with responsive navigation and branded design system",
    "Hand-built touch-optimized carousels/sliders (no external UI libraries)",
    "SEO implementation: metadata, OpenGraph, Twitter cards, and JSON-LD structured data",
    "Review section without third-party dependencies",
    "Low-maintenance structure for store content",
  ],
  links: [
    { label: "Live site", href: "https://www.islandviewmarketsd.com/" },
  ],
  image: "/projects/islandviewmarket.png",
  featured: true,

  metrics: [
    { label: "Delivery", value: "Fast website" },
    { label: "SEO", value: "OpenGraph + JSON-LD" },
    { label: "Focus", value: "Local visibility" },
  ],
  problem:
    "Needed a fast, modern, SEO-optimized website that reflects branding, highlights services/hours, and performs well for mobile users.",
  solution:
    "Built a fast site with custom components and full SEO/structured-data setup for local search readiness.",
  results: [
    "Fast, lightweight site with low operating overhead",
    "Improved local SEO readiness via JSON-LD + metadata",
    "Reusable component structure for future sections",
  ],
},

{
  slug: "farida-law-san-diego",
  title: "Farida Law San Diego — Production Law Firm Website",
  summary:
    "Performance-focused law firm website with contact and intake flows.",
  description:
    "Built a production-grade, mobile-first website for a law firm. Optimized for speed, trust, and lead capture with clear contact and intake flows.",
  tech: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "SEO",
    "Lead Capture",
  ],
  highlights: [
    "Performance-focused structure for reliability",
    "Clear contact and intake paths",
    "Mobile-first, conversion-focused design",
  ],
  links: [
    { label: "Live site", href: "https://faridalawsd.com/" },
  ],
  image: "/projects/faridalawsd.png",
  featured: true,

  metrics: [
    { label: "Delivery", value: "Fast website" },
    { label: "Forms", value: "Contact intake" },
    { label: "Focus", value: "Mobile-first conversions" },
  ],
  problem:
    "Needed a fast, trustworthy marketing site with reliable contact/intake functionality without heavy CMS overhead.",
  solution:
    "Implemented a fast site for speed, SEO, and reliable email-based intake.",
  results: [
    "High-performance website delivery",
    "Reliable form submissions without third-party form tools",
    "Mobile-optimized UX designed for lead capture",
  ],
},

{
  slug: "the-smoking-bee",
  title: "The Smoking Bee — Headless Shopify Storefront (Next.js)",
  summary:
    "High-performance headless storefront with a modern UI, SEO focus, and Shopify integration.",
  description:
    "Built an end-to-end headless eCommerce storefront powered by Shopify. Focused on performance, SEO, and a mobile-friendly browsing experience with custom UI components and clean routing.",
  tech: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Shopify Storefront API",
    "GraphQL",
    "SEO",
  ],
  highlights: [
    "Headless Shopify storefront using Storefront API (GraphQL)",
    "Mobile-first UI focused on browsing and product discovery",
    "SEO setup: metadata + structured sharing (OpenGraph/Twitter)",
    "Fast iteration workflow for storefront improvements",
  ],
  links: [
    { label: "Live site", href: "https://thesmokingbee.com/" },
  ],
  image: "/projects/thesmokingbee.png",
  featured: true,

  metrics: [
    { label: "Platform", value: "Headless Shopify" },
    { label: "Focus", value: "Product discovery" },
    { label: "API", value: "GraphQL Storefront" },
  ],
  problem:
    "Needed a modern storefront with stronger performance and SEO control than a standard theme-based Shopify build.",
  solution:
    "Built a headless Next.js frontend connected to Shopify’s Storefront API, optimized for speed, mobile UX, and SEO.",
  results: [
    "Modern mobile-friendly shopping experience",
    "Improved control over SEO + site structure",
    "Faster iteration workflow",
  ],
},

{
  slug: "goso-gummies",
  title: "GosoGummies — Custom Mobile Shopify Homepage (Liquid Theme Code)",
  summary:
    "Custom Shopify homepage built with theme code + Liquid, optimized for mobile UX and performance.",
  description:
    "Designed and implemented a custom Shopify homepage using theme code and Liquid, focusing on layout, branding, and performance. Built a responsive front-page experience integrated with an existing Shopify storefront where the majority of traffic is mobile.",
  tech: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript", "Mobile-First Design"],
  highlights: [
    "Custom Shopify homepage built with Liquid + theme code (not a page builder)",
    "Mobile-first layout optimized for touch interactions and small screens",
    "Performance-focused asset/layout decisions for faster loading",
    "Conversion-oriented visual hierarchy (hero → CTA → best sellers)",
  ],
  links: [
    // Update if you have a different canonical URL
    { label: "Live site", href: "https://gosogummies.com/" },
  ],
  image: "/projects/gosogummies.png",
  featured: false,

  metrics: [
    { label: "Scope", value: "Homepage + theme code" },
    { label: "Focus", value: "Mobile-first UX" },
    { label: "Platform", value: "Shopify (Liquid)" },
  ],
  problem:
    "Needed a mobile-first homepage experience that matched brand identity and improved product discovery for a predominantly mobile audience.",
  solution:
    "Implemented a custom Shopify homepage using Liquid theme code with responsive layout and conversion-oriented UI structure.",
  results: [
    "Improved mobile browsing experience",
    "Clearer product discovery and calls-to-action",
    "Clean, maintainable theme customization",
  ],
},
  ];
