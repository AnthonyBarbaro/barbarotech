export type PricingPackage = {
  slug: string;
  name: string;
  setupPrice: string;
  monthlyPrice: string;
  summary: string;
  bestFor: string;
  highlights: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
};

export type PricingPackageGroup = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  templateType: string;
  bestFor: string[];
  packages: PricingPackage[];
};

export type PricingAddOn = {
  name: string;
  price: string;
  detail: string;
};

export type MonthlyCarePlan = {
  name: string;
  editingLimit: string;
  description: string;
};

export type PricingFaq = {
  question: string;
  answer: string;
};

type PricingPackageInput = Omit<PricingPackage, "ctaHref" | "ctaLabel"> & {
  ctaLabel?: string;
  ctaHref?: string;
};

// Change percentOff here to update the flash sale across pricing surfaces.
export const setupFeePromotion = {
  enabled: true,
  label: "Flash Sale",
  percentOff: 25,
  appliesTo: "Setup fees only. Monthly care pricing is unchanged.",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function getSetupFeePromotionText() {
  return `${setupFeePromotion.percentOff}% off setup fees`;
}

export function getSetupFeePromotionBadgeText() {
  return `${setupFeePromotion.percentOff}% off`;
}

export function getDiscountedSetupPrice(setupPrice: string) {
  if (!setupFeePromotion.enabled || !setupPrice.includes("$")) return null;

  const discountMultiplier = (100 - setupFeePromotion.percentOff) / 100;

  return setupPrice.replace(/\$(\d[\d,]*)/g, (_, amount: string) => {
    const numericAmount = Number(amount.replace(/,/g, ""));
    if (!Number.isFinite(numericAmount)) return `$${amount}`;

    return formatCurrency(numericAmount * discountMultiplier);
  });
}

export function pricingQuoteHref(planSlug: string) {
  return `/contact/?plan=${encodeURIComponent(planSlug)}`;
}

function definePackage({
  ctaLabel = "Request Quote",
  ctaHref,
  ...pricingPackage
}: PricingPackageInput): PricingPackage {
  return {
    ...pricingPackage,
    ctaLabel,
    ctaHref: ctaHref ?? pricingQuoteHref(pricingPackage.slug),
  };
}

export const pricingPackageGroups: PricingPackageGroup[] = [
  {
    id: "business-websites",
    title: "Business Websites",
    eyebrow: "Local Service Websites",
    description:
      "Clean, fast company websites for service businesses that need credibility, clear calls to action, and monthly care after launch.",
    templateType: "bt-static-info-template",
    bestFor: [
      "Contractors",
      "Consultants",
      "Accountants",
      "Lawyers",
      "Doctors and dentists",
      "Cleaners and landscapers",
      "Mechanics",
      "Agencies",
      "Real estate agents",
      "Local service businesses",
      "Simple company websites",
    ],
    packages: [
      definePackage({
        slug: "static-starter",
        name: "Static Starter",
        setupPrice: "$1,500",
        monthlyPrice: "$149/mo",
        summary: "Good for simple service-business websites.",
        bestFor: "A focused launch with up to 5 standard pages.",
        highlights: [
          "Up to 5 standard pages",
          "Responsive design",
          "Basic SEO setup",
          "Contact CTA",
          "Launch support",
          "Monthly care",
        ],
      }),
      definePackage({
        slug: "static-growth",
        name: "Static Growth",
        setupPrice: "$2,500",
        monthlyPrice: "$249/mo",
        summary:
          "Good for businesses that need more polish, content sections, service pages, project examples, or stronger SEO structure.",
        bestFor: "A stronger content structure with up to 8 standard pages.",
        highlights: [
          "Up to 8 standard pages",
          "Improved content layout",
          "Stronger service sections",
          "Project examples",
          "Analytics setup",
          "Monthly care",
        ],
        featured: true,
      }),
      definePackage({
        slug: "static-custom",
        name: "Static Custom",
        setupPrice: "$4,000+",
        monthlyPrice: "$399/mo",
        summary:
          "Good for more custom layouts, extra pages, stronger visual direction, or a more complete brand presence.",
        bestFor: "A more custom brand presence with higher-touch monthly care.",
        highlights: [
          "Custom sections",
          "Expanded SEO structure",
          "Extra pages",
          "Stronger visual direction",
          "More advanced animations",
          "Higher-touch monthly care",
        ],
      }),
    ],
  },
  {
    id: "restaurant-websites",
    title: "Restaurant Websites",
    eyebrow: "Food and Hospitality",
    description:
      "Restaurant websites that make menus, locations, ordering links, reviews, and catering requests easy to find on mobile.",
    templateType: "bt-restaurant-pos-template",
    bestFor: [
      "Restaurants",
      "Cafes",
      "Bakeries",
      "Pizza shops",
      "Food trucks",
      "Ghost kitchens",
      "Catering businesses",
      "Local food brands",
    ],
    packages: [
      definePackage({
        slug: "restaurant-starter",
        name: "Restaurant Starter",
        setupPrice: "$2,500",
        monthlyPrice: "$249/mo",
        summary: "A clean restaurant launch built around menu visibility and order-online calls to action.",
        bestFor: "Restaurants that need the essentials online quickly.",
        highlights: [
          "Homepage",
          "Menu",
          "Order-online CTA",
          "Gallery",
          "Hours and location",
          "Reviews and contact",
          "External ordering links first",
        ],
      }),
      definePackage({
        slug: "restaurant-growth",
        name: "Restaurant Growth",
        setupPrice: "$4,500",
        monthlyPrice: "$399/mo",
        summary: "A more complete restaurant presence with stronger menu, promotion, and local SEO sections.",
        bestFor: "Restaurants that need better presentation and ongoing content support.",
        highlights: [
          "Stronger menu presentation",
          "Catering section",
          "Promotions",
          "Google Maps section",
          "Review CTAs",
          "Better SEO",
          "Monthly menu/content support",
        ],
        featured: true,
      }),
      definePackage({
        slug: "restaurant-pos-api",
        name: "POS/API Advanced",
        setupPrice: "$7,500+",
        monthlyPrice: "$699/mo",
        summary:
          "Advanced restaurant planning for supported POS providers, menu sync needs, and custom integration scope.",
        bestFor: "Restaurants that need provider coordination beyond standard ordering links.",
        highlights: [
          "Custom POS/API planning",
          "Provider coordination",
          "Menu sync scaffolding",
          "Advanced integrations where supported",
          "Integration scope review",
          "Provider access required",
        ],
      }),
    ],
  },
  {
    id: "booking-websites",
    title: "Booking Websites",
    eyebrow: "Appointment-Based Services",
    description:
      "Booking-focused websites that guide visitors from service discovery to a clear book-now request or scheduling flow.",
    templateType: "bt-booking-service-template",
    bestFor: [
      "Barbers",
      "Salons",
      "Tailors",
      "Med spas",
      "Consultants",
      "Repair shops",
      "Photographers",
      "Trainers",
      "Auto detailers",
      "Therapists",
      "Clinics",
      "Appointment-based businesses",
    ],
    packages: [
      definePackage({
        slug: "booking-starter",
        name: "Booking Starter",
        setupPrice: "$2,500",
        monthlyPrice: "$249/mo",
        summary: "A focused booking site with clear service pages and a direct book-now path.",
        bestFor: "Service businesses using an existing booking link or scheduling tool.",
        highlights: [
          "Services",
          "Book-now CTA",
          "Booking link integration",
          "Gallery",
          "Reviews",
          "Contact",
          "Local SEO basics",
        ],
      }),
      definePackage({
        slug: "booking-pro",
        name: "Booking Pro",
        setupPrice: "$4,500",
        monthlyPrice: "$399/mo",
        summary: "A stronger booking experience with staff, services, proof, analytics, and lead capture.",
        bestFor: "Teams that need more trust-building content before the booking step.",
        highlights: [
          "Staff profiles",
          "Service detail pages",
          "Before/after gallery",
          "Lead capture",
          "Google Maps",
          "Analytics",
          "Stronger booking CTAs",
        ],
        featured: true,
      }),
      definePackage({
        slug: "booking-api",
        name: "Booking API",
        setupPrice: "$8,500+",
        monthlyPrice: "$799/mo",
        summary:
          "Advanced scheduling work for custom availability, provider integrations, and client handoff flows where supported.",
        bestFor: "Appointment businesses with custom scheduling requirements.",
        highlights: [
          "Custom availability flow",
          "Advanced scheduling integration",
          "Provider API work",
          "Webhooks where supported",
          "CRM/email/SMS handoff",
          "Provider access and client requirements review",
        ],
      }),
    ],
  },
  {
    id: "ecommerce-stores",
    title: "Ecommerce Stores",
    eyebrow: "Product and Retail",
    description:
      "Premium storefront builds for product brands that need stronger product discovery, shopping flow, and launch support.",
    templateType: "bt-commerce-template",
    bestFor: [
      "Shopify stores",
      "WooCommerce stores",
      "Boutiques",
      "Apparel brands",
      "Specialty retail",
      "Home goods",
      "Local retailers",
      "Product brands",
      "Stores that need a premium frontend",
    ],
    packages: [
      definePackage({
        slug: "commerce-starter",
        name: "Commerce Starter",
        setupPrice: "$5,000",
        monthlyPrice: "$499/mo",
        summary: "A complete starter storefront for Shopify or WooCommerce-backed stores.",
        bestFor: "Product businesses launching or upgrading the core shopping experience.",
        highlights: [
          "Home",
          "Shop",
          "Product pages",
          "Collections/categories",
          "Checkout redirect",
          "Basic product SEO",
          "Responsive design",
          "Launch support",
        ],
      }),
      definePackage({
        slug: "commerce-growth",
        name: "Commerce Growth",
        setupPrice: "$8,500",
        monthlyPrice: "$799/mo",
        summary: "A stronger ecommerce build for larger catalogs, better product layouts, and monthly store support.",
        bestFor: "Stores that need better merchandising, product templates, and conversion flow.",
        highlights: [
          "Stronger collection pages",
          "Advanced product layouts",
          "Filtering",
          "Analytics",
          "Email capture",
          "SEO product templates",
          "Monthly store support",
        ],
        featured: true,
      }),
      definePackage({
        slug: "commerce-advanced",
        name: "Commerce Advanced",
        setupPrice: "$15,000+",
        monthlyPrice: "$1,499/mo",
        summary:
          "A high-touch commerce engagement for custom features, complex products, and provider-specific integration work.",
        bestFor: "Established stores with complex product, subscription, or integration requirements.",
        highlights: [
          "Custom commerce features",
          "Advanced filtering",
          "Custom carts where appropriate",
          "Subscriptions or complex product support",
          "Account experience planning",
          "Provider-specific API work",
          "Higher-touch retainers",
        ],
      }),
    ],
  },
  {
    id: "premium-business-websites",
    title: "Premium Business Websites",
    eyebrow: "Authority and Lead Generation",
    description:
      "Premium website engagements for higher-value businesses that need stronger positioning, richer content, and ongoing iteration.",
    templateType: "bt-premium-business-template",
    bestFor: [
      "Construction companies",
      "Architecture firms",
      "Law firms",
      "Finance firms",
      "Insurance agencies",
      "Doctors",
      "Med spas",
      "Cannabis businesses",
      "Agencies",
      "Technology companies",
      "Consultants",
      "Real estate groups",
      "Luxury service businesses",
      "High-value B2B/local service companies",
    ],
    packages: [
      definePackage({
        slug: "premium-launch",
        name: "Premium Launch",
        setupPrice: "$7,500-$12,500",
        monthlyPrice: "$699-$1,199/mo",
        summary: "Premium strategy and launch execution for businesses that need a sharper market presence.",
        bestFor: "A premium launch with better positioning, pages, and lead capture.",
        highlights: [
          "Premium website strategy",
          "Stronger visual design",
          "Service pages",
          "Case-study structure",
          "Team/about pages",
          "Lead forms",
          "Analytics",
          "SEO-ready launch",
        ],
      }),
      definePackage({
        slug: "premium-growth",
        name: "Premium Growth",
        setupPrice: "$12,500-$20,000",
        monthlyPrice: "$1,199-$2,000/mo",
        summary: "A growth-focused website engagement with landing pages, content structure, and conversion tracking.",
        bestFor: "Businesses that want stronger lead capture and ongoing improvement.",
        highlights: [
          "Landing pages",
          "Content/SEO structure",
          "Case studies",
          "Stronger lead capture",
          "CRM/email handoff",
          "Conversion tracking",
          "Ongoing iteration",
        ],
        featured: true,
      }),
      definePackage({
        slug: "premium-authority",
        name: "Premium Authority",
        setupPrice: "$20,000-$40,000+",
        monthlyPrice: "$2,000-$5,000+/mo",
        summary: "A high-touch authority build with deeper integrations, campaigns, analytics, and retainers.",
        bestFor: "Established brands that need a more complete digital growth system.",
        highlights: [
          "Custom design systems",
          "Authority content structure",
          "Campaign landing pages",
          "Advanced analytics",
          "Deeper integrations",
          "Ongoing SEO/content/CRO support",
          "High-touch monthly retainers",
        ],
      }),
    ],
  },
  {
    id: "custom-software",
    title: "Custom Software",
    eyebrow: "Scoped Software Builds",
    description:
      "Custom software work for businesses that need a workflow, internal tool, automation, integration, or platform feature beyond a standard website package.",
    templateType: "bt-custom-software-scope",
    bestFor: [
      "Internal tools",
      "Workflow automation",
      "Client request systems",
      "Inventory workflows",
      "CRM handoffs",
      "Reporting tools",
      "Custom integrations",
      "AI-assisted operations",
      "Business process software",
    ],
    packages: [
      definePackage({
        slug: "custom-software-scope",
        name: "Custom Software Scope",
        setupPrice: "Upon request",
        monthlyPrice: "Care quoted after discovery",
        summary:
          "A scoped software engagement for custom workflows, internal tools, automations, and integrations.",
        bestFor: "Businesses that need software built around a specific operational workflow.",
        highlights: [
          "Discovery and requirements mapping",
          "Workflow and data model planning",
          "Custom UI or internal tool build",
          "API and automation planning",
          "AI features where useful",
          "Care plan quoted after scope is clear",
        ],
        ctaLabel: "Request Software Scope",
      }),
    ],
  },
];

export const optionalPricingAddOns = [
  definePackage({
    slug: "ai-concierge-addon",
    name: "AI Concierge Add-On",
    setupPrice: "$2,500-$7,500",
    monthlyPrice: "$250-$750/mo plus usage",
    summary:
      "A guided AI website concierge that can answer common questions, route visitors to services, and help prepare lead summaries.",
    bestFor: "Businesses that want a guided website assistant after the core website scope is clear.",
    highlights: [
      "Common question guidance",
      "Visitor routing to services",
      "Lead summary preparation",
      "Scope and usage planning",
      "No legal, medical, financial, or regulated advice",
    ],
    ctaLabel: "Ask About This Add-On",
  }),
];

export const pricingAddOns: PricingAddOn[] = [
  {
    name: "Additional standard page",
    price: "$250-$500",
    detail: "Useful when a launch needs more standard content pages than the selected package includes.",
  },
  {
    name: "Custom landing page",
    price: "$500-$1,500",
    detail: "Focused page for a service, campaign, offer, or location-specific request.",
  },
  {
    name: "SEO location or service page",
    price: "$300-$750",
    detail: "Structured page for a target service, city, or search-intent opportunity.",
  },
  {
    name: "Product upload",
    price: "$15-$35 per product",
    detail: "Simple product entry when product details are already prepared.",
  },
  {
    name: "Complex variable product",
    price: "$35-$100 per product",
    detail: "Product setup with variants, options, or more detailed configuration.",
  },
  {
    name: "Additional business location",
    price: "$500-$1,500",
    detail: "Location page or section with local content, map, and contact details.",
  },
  {
    name: "Staff profile setup",
    price: "$100-$250 each",
    detail: "Profile content and layout for team members, providers, or specialists.",
  },
  {
    name: "Copywriting",
    price: "$150-$400 per page",
    detail: "Client-facing page copy based on the approved scope and source material.",
  },
  {
    name: "Analytics and advertising pixels",
    price: "$500-$1,500",
    detail: "Setup for measurement, conversion tracking, or advertising readiness.",
  },
  {
    name: "Email, SMS, or CRM integration",
    price: "$750-$3,000",
    detail: "Connect lead capture to supported communication or client-management tools.",
  },
  {
    name: "Custom API integration",
    price: "$1,500-$10,000+",
    detail: "Custom provider integration work after access, scope, and reliability are reviewed.",
  },
  {
    name: "Rush delivery",
    price: "Add 25%-40%",
    detail: "Applies when the timeline requires priority scheduling or compressed review cycles.",
  },
  {
    name: "Monthly SEO/content work",
    price: "$500-$2,500/mo",
    detail: "Ongoing content, search structure, and improvement work beyond monthly care.",
  },
];

export const monthlyCareIncludes = [
  "Hosting and deployment management",
  "SSL/domain launch support",
  "Security and dependency updates",
  "Uptime checks",
  "Analytics checks",
  "Small content edits",
  "Form and lead-flow monitoring",
  "Git/source-control management",
  "Technical support",
  "Monthly improvement recommendations",
];

export const monthlyCarePlans: MonthlyCarePlan[] = [
  {
    name: "Starter care",
    editingLimit: "Up to 30 minutes/month",
    description: "For light content updates and basic launch support after the site goes live.",
  },
  {
    name: "Growth care",
    editingLimit: "Up to 2 hours/month",
    description: "For businesses that expect regular edits, small improvements, and lead-flow checks.",
  },
  {
    name: "Advanced care",
    editingLimit: "Up to 5 hours/month",
    description: "For higher-touch support, improvement planning, and more frequent website changes.",
  },
];

export const additionalCareWork = "$125/hour";

export const platformCostNotes = [
  "Domain registration",
  "Email inboxes",
  "Shopify plan",
  "WooCommerce hosting/extensions",
  "Vercel or other hosting when needed",
  "Booking tools",
  "POS systems",
  "SMS/email tools",
  "Payment-processing fees",
  "Paid plugins/apps",
  "Advertising spend",
];

export const paymentTerms = [
  "50% deposit to begin",
  "25% after design/content approval",
  "25% before launch",
  "Monthly care begins at launch",
  "Third-party platform, app, hosting, SMS, email, and payment-processing fees are separate",
];

export const pricingFaqs: PricingFaq[] = [
  {
    question: "Why is there a setup price and a monthly care plan?",
    answer:
      "The setup price covers strategy, design, development, content structure, launch work, and initial QA. Monthly care starts at launch and keeps the site supported, monitored, and ready for small improvements.",
  },
  {
    question: "Can I start smaller and upgrade later?",
    answer:
      "Yes. Many clients start with the package that matches the current project and then add pages, stronger SEO structure, integrations, or a higher care plan later.",
  },
  {
    question: "Do I have to use a monthly care plan?",
    answer:
      "Most packages include monthly care because the site still needs support after launch. If your project has unusual requirements, mention that in the quote request and I can recommend the right next step.",
  },
  {
    question: "Does the flash sale discount monthly care too?",
    answer:
      "No. The flash sale applies to setup fees only. Monthly care, add-ons, third-party platform costs, and usage-based expenses stay at their listed or scoped rates.",
  },
  {
    question: "Are Shopify, WooCommerce, booking tools, or POS costs included?",
    answer:
      "No. Third-party platform costs are separate and are billed directly to the client when applicable. The package covers the website work and the agreed integration scope.",
  },
  {
    question: "How fast can a site launch?",
    answer:
      "Timeline depends on scope, content readiness, revisions, integrations, and launch requirements. A focused business website can move quickly, while ecommerce, booking, and premium builds need more planning.",
  },
  {
    question: "Do you work with existing websites?",
    answer:
      "Yes. Existing websites can be remodeled, expanded, moved into a stronger structure, or supported through a monthly care plan when the current setup is a good fit.",
  },
  {
    question: "Can you connect forms, analytics, booking tools, or ecommerce?",
    answer:
      "Yes. Standard links and embeds are straightforward. Deeper provider integrations depend on provider access, supported features, client requirements, and final scope.",
  },
  {
    question: "Do you build custom software too?",
    answer:
      "Yes. Custom software is available upon request for scoped workflows, internal tools, automation, reporting, AI-assisted operations, and integrations beyond a standard website package.",
  },
  {
    question: "What happens after I request a quote?",
    answer:
      "Send the project details, preferred package, timeline, and current website if you have one. I will review the request and recommend the right launch path, quote range, and next step.",
  },
];

export const allPricingPackages = pricingPackageGroups.flatMap((group) => group.packages);

export const pricingPackageOptions = [
  ...allPricingPackages.map((pricingPackage) => pricingPackage.name),
  ...optionalPricingAddOns.map((pricingPackage) => pricingPackage.name),
];

export const legacyPlanLabels: Record<string, string> = {
  starter: "Static Starter",
  pro: "Static Growth",
  "tune-up": "Existing Site Tune-Up",
  remodel: "Website Remodel",
  shopify: "Commerce Starter",
  migration: "Platform Migration",
  maintenance: "Monthly Care Plan",
  "backend-basic": "Premium Growth",
  "Static Pro": "Static Growth",
  "Existing Site Tune-Up": "Existing Site Tune-Up",
  "Website Remodel (Redesign)": "Website Remodel",
  "Shopify / Ecommerce Enhancements": "Commerce Starter",
  "Platform Migration (Move Sites)": "Platform Migration",
  "Monthly Site Care": "Monthly Care Plan",
  "Backend Basic (Vercel Hosted)": "Premium Growth",
};

export function getPricingPackageBySlug(slug: string) {
  return [...allPricingPackages, ...optionalPricingAddOns].find(
    (pricingPackage) => pricingPackage.slug === slug
  );
}

export function getPricingGroupById(groupId: string) {
  return pricingPackageGroups.find((group) => group.id === groupId);
}

export function getPlanLabelFromParam(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const directPackage = getPricingPackageBySlug(trimmed);
  if (directPackage) return directPackage.name;

  return legacyPlanLabels[trimmed] ?? trimmed;
}
