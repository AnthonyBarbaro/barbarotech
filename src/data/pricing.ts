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
  offerLabel?: string;
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
  enabled: false,
  label: "Flash Sale",
  percentOff: 25,
  appliesTo: "Setup fees only. Monthly care pricing is unchanged.",
};

export const limitedStarterOfferEnabled = true;

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
    title: "Starter Website",
    eyebrow: "Small Business Launch",
    description:
      "A clean, template-based website for businesses that need a credible first launch without a large upfront build.",
    templateType: "bt-static-info-template",
    bestFor: [
      "New businesses",
      "Local services",
      "Consultants",
      "Independent professionals",
      "Simple company websites",
    ],
    packages: [
      ...(limitedStarterOfferEnabled
        ? [
            definePackage({
              slug: "static-starter-kit",
              name: "Starter Website",
              setupPrice: "$399",
              monthlyPrice: "$80/mo",
              summary:
                "A fast, template-based website with up to three pages and a clear contact path.",
              bestFor:
                "New and small businesses that need a professional website without custom features.",
              highlights: [
                "Up to 3 template-based pages",
                "Mobile-friendly design",
                "Client-supplied copy and images",
                "Basic SEO setup",
                "Hosting, updates, and support",
              ],
              ctaLabel: "Claim Starter Price",
              offerLabel: "Limited-time starting price",
            }),
          ]
        : [
            definePackage({
              slug: "static-starter",
              name: "Business Website",
              setupPrice: "$1,250+",
              monthlyPrice: "$149/mo",
              summary:
                "A focused business website with clear services, proof, and a direct contact path.",
              bestFor: "Small businesses that need a tailored website and ongoing support.",
              highlights: [
                "Tailored page structure",
                "Mobile-friendly design",
                "Client-supplied copy and images",
                "Basic SEO setup",
                "Hosting, updates, and support",
              ],
            }),
          ]),
    ],
  },
  {
    id: "restaurant-websites",
    title: "Restaurant Website",
    eyebrow: "Restaurants and Food Brands",
    description:
      "A mobile-first restaurant website that makes the menu, location, and order-now path easy to find.",
    templateType: "bt-restaurant-pos-template",
    bestFor: [
      "Restaurants",
      "Cafes",
      "Bakeries",
      "Food trucks",
      "Caterers",
    ],
    packages: [
      definePackage({
        slug: "restaurant-website",
        name: "Restaurant Website",
        setupPrice: "$1,500+",
        monthlyPrice: "$199/mo",
        summary: "A focused restaurant launch built around menu visibility and customer action.",
        bestFor: "Food businesses that need the essentials online and easy to maintain.",
        highlights: [
          "Menu, hours, and location",
          "External order-online link",
          "Gallery or review section",
          "Direct contact path",
          "Monthly menu and website care",
        ],
      }),
    ],
  },
  {
    id: "booking-websites",
    title: "Booking Website",
    eyebrow: "Appointment Businesses",
    description:
      "A service website that moves visitors from services and proof to a clear booking action.",
    templateType: "bt-booking-service-template",
    bestFor: [
      "Barbers",
      "Salons",
      "Med spas",
      "Consultants",
      "Photographers",
      "Trainers",
      "Appointment businesses",
    ],
    packages: [
      definePackage({
        slug: "booking-website",
        name: "Booking Website",
        setupPrice: "$1,500+",
        monthlyPrice: "$199/mo",
        summary: "A focused service website with a clear book-now or appointment-request path.",
        bestFor: "Service businesses using an existing booking link or a simple request flow.",
        highlights: [
          "Services and booking path",
          "Existing booking-link connection",
          "Team, gallery, or reviews",
          "Contact and local search setup",
          "Monthly website and booking care",
        ],
      }),
    ],
  },
  {
    id: "ecommerce-stores",
    title: "Online Store",
    eyebrow: "Shopify and WooCommerce",
    description:
      "A polished storefront connected to an existing Shopify or WooCommerce store.",
    templateType: "bt-ecommerce-woocommerce-template",
    bestFor: [
      "Shopify stores",
      "WooCommerce stores",
      "Boutiques",
      "Specialty retail",
      "Product brands",
    ],
    packages: [
      definePackage({
        slug: "online-store",
        name: "Online Store",
        setupPrice: "$3,500+",
        monthlyPrice: "$349/mo",
        summary: "A focused storefront with product discovery and hosted checkout flows.",
        bestFor: "Product businesses with an existing Shopify or WooCommerce backend.",
        highlights: [
          "Home, shop, and product pages",
          "Collections and search",
          "Cart and hosted checkout",
          "Core product search setup",
          "Monthly storefront support",
        ],
      }),
    ],
  },
  {
    id: "premium-business-websites",
    title: "Premium Website",
    eyebrow: "Higher-Touch Brand Sites",
    description:
      "A higher-touch website for businesses that need stronger positioning, content, and visual direction.",
    templateType: "bt-premium-business-template",
    bestFor: [
      "Established service businesses",
      "Law firms",
      "Agencies",
      "Technology companies",
      "B2B companies",
      "High-value brands",
    ],
    packages: [
      definePackage({
        slug: "premium-website",
        name: "Premium Website",
        setupPrice: "$5,500+",
        monthlyPrice: "$499+/mo",
        summary: "A more original, content-rich website with deeper strategy and ongoing support.",
        bestFor: "Businesses that need a distinctive presence and stronger lead generation.",
        highlights: [
          "Strategy and visual direction",
          "Services, proof, and team content",
          "Case-study or insight structure",
          "Lead-focused page flow",
          "Higher-touch monthly care",
        ],
      }),
    ],
  },
  {
    id: "custom-software",
    title: "Custom Software",
    eyebrow: "Anything Beyond the Packages",
    description:
      "Custom workflows, tools, automations, and deeper integrations are scoped after a short discovery conversation.",
    templateType: "bt-custom-software-scope",
    bestFor: [
      "Internal tools",
      "Workflow automation",
      "Custom integrations",
      "Web applications",
    ],
    packages: [
      definePackage({
        slug: "custom-software-scope",
        name: "Custom Software",
        setupPrice: "Upon request",
        monthlyPrice: "Quoted with the build",
        summary:
          "A scoped build for a workflow, internal tool, automation, or integration.",
        bestFor: "Businesses that need something beyond a standard website.",
        highlights: [
          "Short discovery and scope",
          "Clear build recommendation",
          "Custom development",
          "Integration planning",
          "Ongoing care quoted up front",
        ],
        ctaLabel: "Discuss a Custom Build",
      }),
    ],
  },
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
  "Uptime and contact-path checks",
  "Included content edit time",
  "Source-controlled updates",
  "Direct technical support",
  "Practical improvement recommendations",
];

export const monthlyCarePlans: MonthlyCarePlan[] = [
  ...(limitedStarterOfferEnabled
    ? [
        {
          name: "Starter Kit care",
          editingLimit: "Up to 15 minutes/month",
          description:
            "Required with the limited-time Starter Kit for routine checks and one small content edit.",
        },
      ]
    : []),
  {
    name: "Starter care",
    editingLimit: "Up to 30 minutes/month",
    description: "For light content updates and routine checks after launch.",
  },
  {
    name: "Growth care",
    editingLimit: "Up to 2 hours/month",
    description: "For regular edits, small improvements, and lead-flow checks.",
  },
  {
    name: "Advanced care",
    editingLimit: "Up to 5 hours/month",
    description: "For higher-touch support, improvement planning, and more frequent changes.",
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
  "The setup payment schedule is confirmed before work begins",
  "Monthly care begins at launch",
  "Extra pages, content, and integrations are approved before they are added",
  "Third-party platform, app, and usage fees stay separate",
];

export const pricingFaqs: PricingFaq[] = [
  {
    question: "Why is there a setup price and a monthly care plan?",
    answer:
      "The setup price covers strategy, design, development, content structure, launch work, and initial QA. Monthly care begins at launch and keeps the site monitored, supported, and ready for small improvements.",
  },
  {
    question: "Can I add more pages or features?",
    answer:
      "Yes. Choose the closest starting package. Extra pages, content, booking tools, store features, or integrations are added to the quote only when your project needs them.",
  },
  {
    question: "Do I have to use a monthly care plan?",
    answer:
      "Yes. Website packages include a required monthly care plan that begins at launch. It covers ongoing monitoring, technical support, included edit time, and practical improvements based on the selected package.",
  },
  {
    question: "Are Shopify, WooCommerce, booking tools, or POS costs included?",
    answer:
      "No. Third-party platform costs are separate and are billed directly to the client when applicable. The package covers the website work and the agreed integration scope.",
  },
  {
    question: "Can I start smaller and grow later?",
    answer:
      "Yes. The packages are designed as starting points. Your website can add pages, integrations, or a higher level of monthly support as the business grows.",
  },
  {
    question: "Do you work with existing websites?",
    answer:
      "Yes. Existing websites can be remodeled, expanded, moved into a stronger structure, or supported through a monthly care plan when the current setup is a good fit.",
  },
  {
    question: "What happens after I request a quote?",
    answer:
      "Send the project details and the closest package if you know it. I will recommend the right starting point, include any needed extras, and return a clear scope and price.",
  },
];

export const allPricingPackages = pricingPackageGroups.flatMap((group) => group.packages);

export const pricingPackageOptions = [
  ...allPricingPackages.map((pricingPackage) => pricingPackage.name),
];

export const legacyPlanLabels: Record<string, string> = {
  starter: "Starter Website",
  pro: "Starter Website",
  "tune-up": "Existing Site Tune-Up",
  remodel: "Website Remodel",
  shopify: "Online Store",
  migration: "Platform Migration",
  maintenance: "Monthly Care Plan",
  "backend-basic": "Premium Website",
  "static-starter": "Starter Website",
  "static-growth": "Starter Website",
  "static-custom": "Starter Website",
  "restaurant-starter": "Restaurant Website",
  "restaurant-growth": "Restaurant Website",
  "restaurant-pos-api": "Restaurant Website",
  "booking-starter": "Booking Website",
  "booking-pro": "Booking Website",
  "booking-api": "Booking Website",
  "commerce-starter": "Online Store",
  "commerce-growth": "Online Store",
  "commerce-advanced": "Online Store",
  "premium-launch": "Premium Website",
  "premium-growth": "Premium Website",
  "premium-authority": "Premium Website",
  "ai-concierge-addon": "Custom Feature Request",
  "Static Pro": "Starter Website",
  "Existing Site Tune-Up": "Existing Site Tune-Up",
  "Website Remodel (Redesign)": "Website Remodel",
  "Shopify / Ecommerce Enhancements": "Online Store",
  "Platform Migration (Move Sites)": "Platform Migration",
  "Monthly Site Care": "Monthly Care Plan",
  "Backend Basic (Vercel Hosted)": "Premium Website",
};

export function getPricingPackageBySlug(slug: string) {
  return allPricingPackages.find(
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
