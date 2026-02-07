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
},

{
  slug: "island-view-market-liquor",
  title: "Island View Market & Liquor — Static Next.js Website (AWS S3)",
  summary:
    "Mobile-first static marketing website with SEO + JSON-LD, deployed to AWS S3 with CI/CD.",
  description:
    "Designed and developed a fully static, mobile-first marketing website for a long-established neighborhood market in San Diego. Built with Next.js static export and deployed to AWS S3 for high performance, low cost, and SEO optimization.",
  tech: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Static Export",
    "AWS S3",
    "GitHub Actions",
    "SEO",
    "JSON-LD",
  ],
  highlights: [
    "Custom mobile-first UI/UX with responsive navigation and branded design system",
    "Hand-built touch-optimized carousels/sliders (no external UI libraries)",
    "SEO implementation: metadata, OpenGraph, Twitter cards, and JSON-LD structured data",
    "Static customer review section without API dependencies",
    "CI/CD deployment: builds Next.js export and syncs output to S3 via GitHub Actions",
  ],
  links: [
    { label: "Live site", href: "https://www.islandviewmarketsd.com/" },
    // Update this if your repo URL differs (or remove it if private)
    { label: "GitHub", href: "https://github.com/AnthonyBarbaro/islandviewmarket" },
  ],
  image: "/projects/islandviewmarket.png",
  featured: true,

  metrics: [
    { label: "Deployment", value: "Static export → S3" },
    { label: "SEO", value: "OpenGraph + JSON-LD" },
    { label: "Build", value: "CI/CD via GitHub Actions" },
  ],
  problem:
    "Needed a fast, modern, SEO-optimized website that reflects branding, highlights services/hours, and performs well for mobile users.",
  solution:
    "Built a static Next.js site with custom components and full SEO/structured-data setup, deployed to AWS S3 with automated CI/CD.",
  results: [
    "Fast, lightweight static site with low hosting costs",
    "Improved local SEO readiness via JSON-LD + metadata",
    "Reusable component/template structure for future sites",
  ],
},

{
  slug: "farida-law-san-diego",
  title: "Farida Law San Diego — Production Static Website (CloudFront + Serverless Forms)",
  summary:
    "Static site optimized for performance with CloudFront CDN and serverless contact/intake forms.",
  description:
    "Built a production-grade, mobile-first static website for a law firm. Optimized for speed and conversions, deployed behind AWS CloudFront with a custom domain + SSL, and implemented serverless contact/intake flows.",
  tech: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Static Site Generation",
    "AWS S3",
    "AWS CloudFront",
    "AWS Lambda",
    "AWS SES",
    "SEO",
  ],
  highlights: [
    "Static Site Generation for performance and reliability",
    "CloudFront CDN with custom domain + SSL",
    "Serverless contact & intake forms (Lambda + SES email delivery)",
    "Mobile-first, conversion-focused design",
  ],
  links: [
    { label: "Live site", href: "https://faridalawsd.com/" },
    // Add repo link if public; otherwise remove
    { label: "GitHub", href: "https://github.com/AnthonyBarbaro/faridalawsd" },
  ],
  image: "/projects/faridalawsd.png",
  featured: true,

  metrics: [
    { label: "CDN", value: "CloudFront" },
    { label: "Forms", value: "Serverless (Lambda + SES)" },
    { label: "Focus", value: "Mobile-first conversions" },
  ],
  problem:
    "Needed a fast, trustworthy marketing site with reliable contact/intake functionality without heavy CMS overhead.",
  solution:
    "Implemented a static Next.js site for speed + SEO, delivered globally via CloudFront, and added serverless email-based form handling.",
  results: [
    "High-performance static delivery via CDN",
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
    "Vercel",
    "SEO",
  ],
  highlights: [
    "Headless Shopify storefront using Storefront API (GraphQL)",
    "Mobile-first UI focused on browsing and product discovery",
    "SEO setup: metadata + structured sharing (OpenGraph/Twitter)",
    "Deployed on Vercel for fast iteration and production hosting",
  ],
  links: [
    { label: "Live site", href: "https://thesmokingbee.com/" },
    // Add GitHub if public; otherwise remove
    { label: "GitHub", href: "https://github.com/AnthonyBarbaro/thesmokingbee" },
  ],
  image: "/projects/thesmokingbee.png",
  featured: true,

  metrics: [
    { label: "Platform", value: "Headless Shopify" },
    { label: "Hosting", value: "Vercel" },
    { label: "API", value: "GraphQL Storefront" },
  ],
  problem:
    "Needed a modern storefront with stronger performance and SEO control than a standard theme-based Shopify build.",
  solution:
    "Built a headless Next.js frontend connected to Shopify’s Storefront API, optimized for speed, mobile UX, and SEO.",
  results: [
    "Modern mobile-friendly shopping experience",
    "Improved control over SEO + site structure",
    "Faster iteration and deployment workflow",
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
  