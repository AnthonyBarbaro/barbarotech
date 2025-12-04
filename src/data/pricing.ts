export type PricingPlan = {
    id: string;
    name: string;
    bestFor: string;
  
    oneTime: string;      // headline
    monthly?: string;     // optional support range
  
    includes: string[];   // short highlights
    timeline?: string;    // typical turnaround
    deliverables?: string[]; // concrete outputs people care about
    notes?: string;
  
    popular?: boolean;    // optional highlight on the UI
  };
  
  export const PRICING = {
    staticWebsites: <PricingPlan[]>[
      {
        id: "starter",
        name: "Static Starter",
        bestFor: "First professional site for a small business or single location.",
        oneTime: "Starting around $900 (typical: $750 – $1,500)",
        monthly: "$25 – $75 (optional)",
        includes: [
          "Mobile-first design (1–3 pages)",
          "Fast load times + clean layout",
          "SEO-ready structure (titles/meta)",
          "Contact buttons + inquiry setup",
        ],
        timeline: "3–7 days",
        deliverables: [
          "Homepage + Contact (plus 1 page if needed)",
          "Click-to-call / text CTAs",
          "Map, hours, social links",
          "Deployed + basic SEO metadata",
        ],
        notes: "Best for shops that just need a clean, legit online presence without a big build.",
      },
      {
        id: "pro",
        name: "Static Pro",
        bestFor: "Growing businesses that need more pages, sections, and clearer funnels.",
        oneTime: "Starting around $2,200 (typical: $1,800 – $3,500)",
        monthly: "$75 – $150 (optional)",
        includes: [
          "Everything in Starter",
          "5–10 pages + custom sections",
          "Conversion-focused design (CTAs)",
          "Stronger local SEO structure",
        ],
        timeline: "1–2 weeks",
        deliverables: [
          "Homepage + 4–9 internal pages",
          "Service / brand / promo sections",
          "Better on-page SEO (structure, headings)",
          "Performance pass (speed + UX polish)",
        ],
        notes: "Ideal for smoke shops, liquor stores, and gas stations that want to look premium and rank locally.",
        popular: true,
      },
    ],
  
    existingSites: <PricingPlan[]>[
      {
        id: "tune-up",
        name: "Existing Site Tune‑Up",
        bestFor: "You already have a site — it just needs fixes, polish, or updates.",
        oneTime: "Starting around $500 (typical: $300 – $1,200)",
        monthly: "$0 – $75 (optional)",
        includes: [
          "Fix broken sections & layout issues",
          "Speed + SEO quick wins",
          "Update hours/contact/CTAs",
          "Mobile cleanup",
        ],
        timeline: "1–3 days",
        deliverables: [
          "Fixes applied + tested on mobile/desktop",
          "CTA improvements (call/text buttons)",
          "Basic SEO + performance cleanup",
        ],
        notes: "Best for quick improvements without rebuilding from scratch.",
      },
      {
        id: "remodel",
        name: "Website Remodel (Redesign)",
        bestFor: "Your site works, but looks outdated or doesn’t convert.",
        oneTime: "Starting around $2,000 (typical: $1,500 – $6,000)",
        monthly: "$75 – $250 (optional)",
        includes: [
          "Design refresh (modern, clean)",
          "Rebuild key sections for conversions",
          "Speed + mobile UX improvements",
          "SEO structure improvements",
        ],
        timeline: "1–3 weeks",
        deliverables: [
          "Redesigned homepage + key pages",
          "Improved CTAs and navigation flow",
          "New section layouts (brands, promos, services)",
          "Performance/UX cleanup + final QA",
        ],
        notes: "This is the best option when you want a big upgrade without switching platforms.",
      },
      {
        id: "shopify",
        name: "Shopify / Ecommerce Enhancements",
        bestFor: "Theme edits, landing pages, and conversion upgrades for stores.",
        oneTime: "Starting around $900 (typical: $750 – $2,500)",
        monthly: "$75 – $250 (optional)",
        includes: [
          "Theme customization (sections/layout)",
          "Product + collection page upgrades",
          "App/integration cleanup",
          "Conversion improvements",
        ],
        timeline: "3–10 days",
        deliverables: [
          "Updated theme sections + styling",
          "Higher-converting product pages",
          "Checkout/cart improvements (where possible)",
        ],
        notes: "Perfect if you want Shopify to look premium and convert better.",
      },
      {
        id: "migration",
        name: "Platform Migration (Move Sites)",
        bestFor: "Move from Wix/Squarespace/WordPress to something faster/cleaner.",
        oneTime: "Starting around $2,500 (typical: $2,000 – $8,000)",
        monthly: "$75 – $250 (optional)",
        includes: [
          "Content + page migration",
          "Design refresh during move",
          "Redirects for SEO",
          "Launch support",
        ],
        timeline: "1–3 weeks",
        deliverables: [
          "New site on the new platform",
          "SEO-safe redirects (if applicable)",
          "Launch checklist + post-launch checks",
        ],
        notes: "Best when your current platform is limiting you or slow.",
      },
      {
        id: "maintenance",
        name: "Monthly Site Care",
        bestFor: "You want a developer on-call for edits, fixes, and improvements.",
        oneTime: "No build fee (after initial setup)",
        monthly: "$99 – $399",
        includes: [
          "Ongoing edits (text/photos/sections)",
          "Bug fixes + small feature requests",
          "Performance & SEO upkeep",
          "Priority response window",
        ],
        timeline: "Ongoing",
        deliverables: [
          "Monthly improvements + updates",
          "Fast turnaround on small requests",
        ],
        notes: "Great for owners who don’t want to deal with website issues.",
      },
    ],
  
    backendWebsites: <PricingPlan[]>[
      {
        id: "backend-basic",
        name: "Backend Basic (Vercel Hosted)",
        bestFor: "Apps needing auth, dashboards, APIs, and a database.",
        oneTime: "Starting around $5,500 (typical: $4,500 – $9,000)",
        monthly: "$150 – $600 (support & iteration)",
        includes: [
          "Auth + roles (as needed)",
          "Dashboards / admin tools",
          "APIs + database modeling",
          "Deployed on Vercel (staging + prod)",
        ],
        timeline: "2–6 weeks",
        deliverables: [
          "Production-ready web app",
          "Admin/dashboard functionality",
          "API endpoints + database setup",
          "Deployment pipeline + launch support",
        ],
        notes: "Best for replacing spreadsheets/manual tasks or building a custom internal tool.",
      },
    ],
  };
  