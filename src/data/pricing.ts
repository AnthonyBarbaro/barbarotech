export type PricingPlan = {
    id: string;
    name: string;
    bestFor: string;
    oneTime: string;   // main headline price text
    monthly?: string;  // optional ongoing support range
    includes: string[];
    notes?: string;
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
          "Mobile-first design (1–3 core pages)",
          "SEO-ready structure (titles, meta, clean layout)",
          "Fast hosting and deployment setup",
          "Contact form or direct text to your phone (vtext)",
        ],
        notes:
          "Best for shops that just need a clean, legit online presence without a big build.",
      },
      {
        id: "pro",
        name: "Static Pro",
        bestFor: "Growing businesses that need more pages, sections, and clearer funnels.",
        oneTime: "Starting around $2,200 (typical: $1,800 – $3,500)",
        monthly: "$75 – $150 (optional)",
        includes: [
          "Everything in Static Starter",
          "5–10 pages with custom sections & branding",
          "Cleaner UX polish and conversion-focused layout",
          "Stronger local SEO structure (service / location pages)",
        ],
        notes:
          "Ideal for smoke shops, liquor stores, and gas stations that want to look premium and rank locally.",
      },
    ],
  
    backendWebsites: <PricingPlan[]>[
      {
        id: "backend-basic",
        name: "Backend Basic (Vercel Hosted)",
        bestFor: "Web apps that need real functionality — logins, admin dashboards, and APIs.",
        oneTime: "Starting around $5,500 (typical: $4,500 – $9,000)",
        monthly: "$150 – $600 (support & iteration)",
        includes: [
          "Auth system (sign-in / roles as needed)",
          "Dashboards and admin views for your team",
          "APIs + database modeling for your data",
          "Deployed on Vercel with staging & production",
        ],
        notes:
          "Best for tools that replace spreadsheets, manual processes, or third-party dashboards with something custom.",
      },
    ],
  };
  