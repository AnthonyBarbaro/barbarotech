export type PortfolioSite = {
  name: string;
  href: string;
  displayUrl: string;
  logo: string;
  logoAlt: string;
  type: string;
  summary: string;
  mark: "square" | "wide";
  surface: "white" | "ink" | "blue";
};

export const PORTFOLIO_SITES: PortfolioSite[] = [
  {
    name: "PartnerSwipe",
    href: "https://partnerswipe-production.up.railway.app/",
    displayUrl: "partnerswipe-production.up.railway.app",
    logo: "/portfolio-logos/partner-swipe.png",
    logoAlt: "PartnerSwipe Payment Processing logo",
    type: "Financial services website",
    summary: "A clear product and partner website for a payment-processing company.",
    mark: "wide",
    surface: "white",
  },
  {
    name: "Wagyu Shawarma Grill",
    href: "https://wagyu-shawarma-production.up.railway.app/",
    displayUrl: "wagyu-shawarma-production.up.railway.app",
    logo: "/portfolio-logos/wagyu-shawarma.png",
    logoAlt: "Wagyu Shawarma Grill logo",
    type: "Restaurant website",
    summary: "A menu-led restaurant site with deals, catering, and online-order paths.",
    mark: "wide",
    surface: "white",
  },
  {
    name: "Capital Collective",
    href: "https://www.capitalcollective.agency/",
    displayUrl: "capitalcollective.agency",
    logo: "/portfolio-logos/capital-collective.jpg",
    logoAlt: "Capital Collective logo",
    type: "Recruiting website",
    summary: "A focused recruiting and application site for life-insurance careers.",
    mark: "square",
    surface: "ink",
  },
  {
    name: "Farida Law San Diego",
    href: "https://faridalawsd.com/",
    displayUrl: "faridalawsd.com",
    logo: "/portfolio-logos/farida-law.png",
    logoAlt: "Farida Law scales mark",
    type: "Static business website",
    summary: "A trust-focused legal website with consultation and client-intake flows.",
    mark: "square",
    surface: "ink",
  },
  {
    name: "Buzz Cannabis",
    href: "https://buzzcannabis.com/",
    displayUrl: "buzzcannabis.com",
    logo: "/portfolio-logos/buzz-cannabis.png",
    logoAlt: "Buzz Cannabis bee logo",
    type: "Premium multi-location website",
    summary: "A store-aware retail experience spanning menus, specials, brands, and locations.",
    mark: "square",
    surface: "white",
  },
  {
    name: "J. Barbaro Clothiers",
    href: "https://jbarbaro.com/",
    displayUrl: "jbarbaro.com",
    logo: "/portfolio-logos/j-barbaro.png",
    logoAlt: "J. Barbaro Clothiers logo",
    type: "Premium ecommerce website",
    summary: "A product-rich menswear storefront with shopping, search, and appointment paths.",
    mark: "wide",
    surface: "white",
  },
  {
    name: "Golden Bagel Cafe",
    href: "https://goldenbagel.vercel.app/",
    displayUrl: "goldenbagelcafe.com",
    logo: "/portfolio-logos/golden-bagel.png",
    logoAlt: "Golden Bagel Cafe logo",
    type: "Restaurant website",
    summary: "A local cafe website built around the menu, location, and online ordering.",
    mark: "wide",
    surface: "white",
  },
  {
    name: "Goso Gummies",
    href: "https://gosogummies.com/",
    displayUrl: "gosogummies.com",
    logo: "/portfolio-logos/goso-gummies.png",
    logoAlt: "Goso Gummies logo",
    type: "Shopify redesign and plugin work",
    summary: "A mobile-first Shopify redesign with custom theme and plugin work for a candy brand.",
    mark: "wide",
    surface: "white",
  },
];
