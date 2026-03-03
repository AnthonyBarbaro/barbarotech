export type ServiceLanding = {
  slug: string;
  navLabel: string;
  title: string;
  shortTitle: string;
  description: string;
  summary: string;
  audience: string;
  outcomes: string[];
  deliverables: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
  keywords: string[];
};

export const SERVICE_LANDINGS: ServiceLanding[] = [
  {
    slug: "freelance-web-developer-san-diego",
    navLabel: "Web Dev",
    title: "Freelance Web Developer in San Diego",
    shortTitle: "Freelance Web Developer",
    description:
      "Hire Anthony Barbaro as a freelance web developer in San Diego for fast, conversion-focused websites and full-stack builds.",
    summary:
      "I design and ship high-performance websites for businesses that need cleaner UX, faster load times, and stronger conversion flow.",
    audience:
      "Business owners and teams that need a professional website partner without the overhead of a full agency retainer.",
    outcomes: [
      "Clear messaging hierarchy and conversion-focused layout",
      "Fast, mobile-first performance and technical SEO foundations",
      "Maintainable codebase with room for future feature growth",
    ],
    deliverables: [
      "Discovery and page architecture",
      "UI implementation in Next.js + TypeScript",
      "On-page SEO setup (titles, descriptions, schema, canonicals)",
      "Launch support and post-launch iteration plan",
    ],
    process: [
      "Align on scope, audience, and measurable goals.",
      "Design and build the highest-impact pages first.",
      "QA, performance tuning, and launch with clear handoff.",
    ],
    faqs: [
      {
        question: "Do you work only with San Diego companies?",
        answer:
          "No. I work with local San Diego businesses and remote teams across the U.S., but local clients often benefit from faster collaboration windows.",
      },
      {
        question: "Can you improve an existing site instead of rebuilding?",
        answer:
          "Yes. Many projects are focused remodels where we improve performance, content structure, and conversion paths without a full rebuild.",
      },
    ],
    keywords: [
      "freelance web developer San Diego",
      "San Diego web developer",
      "freelance software engineer San Diego",
      "hire web developer",
    ],
  },
  {
    slug: "ai-automation-freelancer",
    navLabel: "AI Automation",
    title: "AI Automation Freelancer for Business Workflows",
    shortTitle: "AI Automation Freelancer",
    description:
      "AI automation freelancer services for business teams. Build practical workflow automation, API integrations, and internal AI-assisted tools.",
    summary:
      "I build practical AI automation systems that reduce repetitive operations, speed up responses, and improve execution quality.",
    audience:
      "Operations-heavy teams that want to automate manual workflows and connect AI to tools they already use.",
    outcomes: [
      "Reduced manual task load and shorter turnaround times",
      "More consistent data handling across systems",
      "Actionable AI features integrated into real workflows",
    ],
    deliverables: [
      "Workflow mapping and bottleneck review",
      "Automation implementation (APIs, triggers, routing)",
      "AI-assisted prompts and guardrails for reliability",
      "Operational handoff with monitoring recommendations",
    ],
    process: [
      "Audit the existing workflow and identify repetitive work.",
      "Build a focused automation pilot with measurable impact.",
      "Expand and harden the system after successful validation.",
    ],
    faqs: [
      {
        question: "Is this just chatbot setup?",
        answer:
          "No. The focus is operational automation: intake, routing, data sync, reporting, and task acceleration where AI adds practical value.",
      },
      {
        question: "Can AI automation connect to our existing tools?",
        answer:
          "Yes. Typical integrations include CRM systems, Google tools, forms, inventory feeds, and internal APIs.",
      },
    ],
    keywords: [
      "AI automation freelancer",
      "freelance AI developer",
      "workflow automation consultant",
      "business process automation",
    ],
  },
  {
    slug: "shopify-freelancer",
    navLabel: "Shopify",
    title: "Shopify Freelancer for Custom Theme and UX Improvements",
    shortTitle: "Shopify Freelancer",
    description:
      "Shopify freelancer services for custom theme edits, performance improvements, and conversion-focused ecommerce UX.",
    summary:
      "I help ecommerce brands improve Shopify storefront UX, speed, and conversion paths with clean, maintainable implementation.",
    audience:
      "Shopify store owners who need professional customization beyond page builders and generic templates.",
    outcomes: [
      "Higher quality product discovery and cart flow",
      "Faster storefront performance on mobile devices",
      "Cleaner theme code for easier long-term maintenance",
    ],
    deliverables: [
      "Storefront UX audit and priority roadmap",
      "Custom section/theme implementation",
      "Performance and usability optimization",
      "Post-launch support for iteration and fixes",
    ],
    process: [
      "Review storefront analytics and friction points.",
      "Implement high-impact changes in theme code.",
      "Validate performance and conversion path improvements.",
    ],
    faqs: [
      {
        question: "Do you work with existing Shopify themes?",
        answer:
          "Yes. I can improve and extend your current theme, or build custom sections tailored to your catalog and sales flow.",
      },
      {
        question: "Can you support ongoing Shopify updates?",
        answer:
          "Yes. Ongoing support is available for theme updates, conversion testing, new sections, and issue resolution.",
      },
    ],
    keywords: [
      "Shopify freelancer",
      "Shopify developer freelancer",
      "Shopify theme customization",
      "ecommerce conversion optimization",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICE_LANDINGS.find((service) => service.slug === slug);
}
