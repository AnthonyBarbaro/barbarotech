export type PricingPlan = {
    id: string;
    name: string;
    bestFor: string;
    oneTime: string;
    monthly?: string;
    includes: string[];
    notes?: string;
  };
  
  export const PRICING = {
    staticWebsites: <PricingPlan[]>[
      {
        id: "starter",
        name: "Static Starter",
        bestFor: "Simple clean sites for small businesses.",
        oneTime: "$750 – $1,500",
        monthly: "$25 – $75",
        includes: [
          "Mobile-first design",
          "SEO-ready layout",
          "Fast hosting + static export",
          "Contact form to your phone (vtext)"
        ],
      },
      {
        id: "pro",
        name: "Static Pro",
        bestFor: "More pages, better structure, stronger design.",
        oneTime: "$1,800 – $3,500",
        monthly: "$75 – $150",
        includes: [
          "Everything in Starter",
          "Custom sections & branding",
          "Cleaner UI polish",
          "Advanced SEO structure"
        ],
      },
    ],
  
    backendWebsites: <PricingPlan[]>[
      {
        id: "backend-basic",
        name: "Backend Basic (Vercel Hosted)",
        bestFor: "Apps that need logins, admin tools, or API logic.",
        oneTime: "$4,500 – $9,000",
        monthly: "$150 – $600",
        includes: [
          "Auth system",
          "Dashboards",
          "APIs + database",
          "Deployed on Vercel"
        ],
      },
    ],
  };
  