/*
THESIS: One clear signal runs through every package, project, and next step: clients work directly with Anthony. This replaces the category-default stack of interchangeable agency cards.
OWN-WORLD: Signal-black fields, cyan-to-cobalt currents, precise trace lines, forceful Archivo headlines, and mono reserved for prices, states, and process data.
STORY: Understand the offer, see one accountable builder behind real work, choose a starting path, then request a quote or call.
FIRST VIEWPORT: A left-anchored offer occupies the upper field while a diagonal particle current resolves into Websites, Stores, and Software choices; the primary quote action stays beside the promise.
FORM: User-approved Conversion Current composition with Proof Orbit’s one-builder model; user-pinned direction, no seed roll. The current becomes navigation and pricing structure, then opens into real project proof.
*/
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { ServiceOrbit } from "@/components/service-orbit";
import {
  getDiscountedSetupPrice,
  getSetupFeePromotionText,
  getPricingPackageBySlug,
  limitedStarterOfferEnabled,
  pricingPackageGroups,
  setupFeePromotion,
} from "@/data/pricing";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Conversion-Focused Website Packages",
  description:
    "BarbaroTech builds conversion-focused website packages and custom software scopes with clear pricing, monthly care, and launch paths for growing businesses.",
  alternates: {
    canonical: canonicalUrl("/"),
  },
  keywords: withBaseKeywords([
    "conversion focused website",
    "website packages",
    "business website packages",
    "restaurant website packages",
    "booking website packages",
    "ecommerce website packages",
    "custom software development",
    "monthly care plans",
    "website pricing",
  ]),
  openGraph: {
    title: `${SITE.brand} | Conversion-Focused Website Packages`,
    description:
      "Website packages and custom software scopes with clear setup pricing, monthly care, and launch paths built to turn visitors into qualified requests.",
    url: canonicalUrl("/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} | Conversion-Focused Website Packages`,
    description:
      "Website packages and custom software scopes with clear setup pricing, monthly care, and launch paths built to turn visitors into qualified requests.",
    images: ["/og.png"],
  },
};

const CONVERSION_OUTCOMES = [
  {
    title: "A clear buying path",
    detail:
      "Visitors can quickly understand what you offer, which package fits, what it starts at, and how to request the next step.",
  },
  {
    title: "Stronger request quality",
    detail:
      "Package CTAs, pricing anchors, and scope prompts help filter casual browsing from serious project conversations.",
  },
  {
    title: "Launch plus retention",
    detail:
      "Monthly care keeps the website supported after launch, so it can keep improving instead of going stale.",
  },
  {
    title: "Proof before the pitch",
    detail:
      "Case studies, process clarity, and transparent terms reduce friction before a client reaches out.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Choose a launch path",
    detail: "Start with the closest package so the first conversation has a clear scope and price anchor.",
  },
  {
    step: "02",
    title: "Approve scope",
    detail: "Confirm pages, content, integrations, timeline, care plan, and third-party costs before work begins.",
  },
  {
    step: "03",
    title: "Launch with intent",
    detail: "Build the site around requests, booking actions, ecommerce flow, or premium lead capture.",
  },
  {
    step: "04",
    title: "Improve monthly",
    detail: "Monthly care covers edits, checks, technical upkeep, and practical next-step recommendations.",
  },
];

const OBJECTION_HANDLERS = [
  {
    title: "Not sure which package fits?",
    detail: "Use the quote request and I will recommend the right starting point based on your project details.",
  },
  {
    title: "Have an existing site?",
    detail: "The scope can become a remodel, migration, care plan, or a cleaner package rebuild.",
  },
  {
    title: "Need integrations?",
    detail: "Booking, ecommerce, analytics, CRM, email, SMS, and provider integrations can be scoped as add-ons.",
  },
];

const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured).slice(0, 3);

const PACKAGE_PREVIEW_COPY: Record<string, { description: string; bestFor: string }> = {
  "business-websites": {
    description: "A fast, template-based website with clear pages, search basics, and ongoing care.",
    bestFor: "New businesses and simple company websites.",
  },
  "restaurant-websites": {
    description: "Menu-first restaurant sites with ordering CTAs, location details, reviews, and monthly content care.",
    bestFor: "Restaurants, cafes, food trucks, and local food brands.",
  },
  "booking-websites": {
    description: "Booking-focused sites that guide visitors from services to a clear appointment request.",
    bestFor: "Appointment-based businesses and local providers.",
  },
  "ecommerce-stores": {
    description: "A polished storefront connected to an existing Shopify or WooCommerce store.",
    bestFor: "Product businesses that need a stronger shopping experience.",
  },
  "premium-business-websites": {
    description: "Higher-touch strategy, visual direction, content structure, and monthly support.",
    bestFor: "Established businesses that need a more distinctive website.",
  },
  "custom-software": {
    description: "Scoped software builds for workflows, internal tools, automations, and integrations.",
    bestFor: "Businesses that need custom software beyond a standard website.",
  },
};

function getPackagePreviewPrice(setupPrice: string, monthlyPrice: string) {
  if (setupPrice.toLowerCase().includes("request")) return setupPrice;

  return `${getDiscountedSetupPrice(setupPrice) ?? setupPrice} build / ${monthlyPrice} care`;
}

const PACKAGE_PREVIEW = pricingPackageGroups.flatMap((group) => {
  const starterPackage = group.packages[0];
  const copy = PACKAGE_PREVIEW_COPY[group.id];

  if (!starterPackage || !copy) return [];

  return [
    {
      id: group.id,
      title: group.title,
      setupPrice: starterPackage.setupPrice,
      monthlyPrice: starterPackage.monthlyPrice,
      discountedSetupPrice: getDiscountedSetupPrice(starterPackage.setupPrice),
      price: getPackagePreviewPrice(starterPackage.setupPrice, starterPackage.monthlyPrice),
      contactHref: starterPackage.ctaHref,
      ...copy,
    },
  ];
});

const BANNER_SERVICES = [
  ...PACKAGE_PREVIEW.map((item) => {
    const basePrice = item.discountedSetupPrice ?? item.setupPrice;
    return basePrice.toLowerCase().includes("request")
      ? `${item.title} upon request`
      : `${item.title} from ${basePrice}`;
  }),
  ...(setupFeePromotion.enabled
    ? [`${getSetupFeePromotionText()} - monthly unchanged`, "Setup fees only"]
    : ["Monthly care begins at launch"]),
];

const STARTER_PACKAGE = pricingPackageGroups[0]?.packages[0];
const STARTER_SETUP_PRICE = STARTER_PACKAGE
  ? getDiscountedSetupPrice(STARTER_PACKAGE.setupPrice) ?? STARTER_PACKAGE.setupPrice
  : "$1,250";
const STARTER_MONTHLY_PRICE = STARTER_PACKAGE?.monthlyPrice ?? "$99/mo";

const HOME_OFFER_CONFIG = [
  {
    slug: limitedStarterOfferEnabled ? "static-starter-kit" : "static-starter",
    title: "Starter Website",
    description:
      "A simple template-based site with up to three pages, mobile design, basic SEO, and one direct inquiry path.",
    bestFor: "New businesses that need a clean site without custom features or complex integrations.",
  },
  {
    slug: "restaurant-website",
    title: "Restaurant Website",
    description: "A mobile-first site for menus, hours, locations, and external ordering.",
    bestFor: "Restaurants, cafes, food trucks, and local food brands.",
  },
  {
    slug: "booking-website",
    title: "Booking Website",
    description:
      "A service website with clear offerings, proof, and a direct booking or appointment-request path.",
    bestFor: "Salons, consultants, trainers, and appointment-based businesses.",
  },
  {
    slug: "online-store",
    title: "Online Store",
    description:
      "A Shopify or WooCommerce storefront with core product discovery and hosted checkout.",
    bestFor: "Product businesses with an existing commerce backend.",
  },
  {
    slug: "premium-website",
    title: "Premium Website",
    description:
      "A higher-touch website with stronger strategy, visual direction, proof, and lead flow.",
    bestFor: "Established businesses that need a more distinctive online presence.",
  },
];

const HOME_OFFERS = HOME_OFFER_CONFIG.flatMap((offer) => {
  const plan = getPricingPackageBySlug(offer.slug);
  if (!plan) return [];

  return [
    {
      ...offer,
      setupPrice: plan.setupPrice,
      monthlyPrice: plan.monthlyPrice,
      contactHref: plan.ctaHref,
    },
  ];
});

const HERO_PATH_IDS = ["business-websites", "ecommerce-stores", "custom-software"];
const HERO_PATHS = HERO_PATH_IDS.flatMap((id) => {
  const path = PACKAGE_PREVIEW.find((item) => item.id === id);
  return path ? [path] : [];
});

export default function HomePage() {
  return (
    <main className="signal-page">
      <section className="signal-hero">
        <Container className="relative z-10 py-10 sm:py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <Reveal>
              <p className="signal-kicker">Anthony Barbaro / solo web studio</p>
              <h1 className="display-title mt-6">
                Conversion-focused websites with clear packages,{" "}
                <span className="signal-accent">pricing, and next steps.</span>
              </h1>
              <p className="signal-copy mt-6">
                I design and build websites, stores, and web applications for businesses that need
                better mobile flow, stronger requests, and one accountable person from brief to launch.
              </p>

              {STARTER_PACKAGE?.offerLabel ? (
                <a
                  href="/pricing/#business-websites"
                  className="mt-5 flex max-w-2xl items-start gap-3 border-y border-cyan-200/15 py-3 text-sm leading-6 text-cyan-100 transition-colors hover:text-white"
                >
                  <span className="signal-node mt-1.5 shrink-0" aria-hidden="true" />
                  <span>
                    <strong>{STARTER_PACKAGE.offerLabel}:</strong> {STARTER_PACKAGE.name} for{" "}
                    {STARTER_SETUP_PRICE} setup + required {STARTER_MONTHLY_PRICE} care.
                  </span>
                </a>
              ) : null}

              {setupFeePromotion.enabled ? (
                <p className="mt-5 max-w-2xl border-l border-cyan-300/55 pl-4 text-sm leading-6 text-cyan-100">
                  {setupFeePromotion.label}: {getSetupFeePromotionText()}. Setup fees only; monthly care stays the same.
                </p>
              ) : null}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={STARTER_PACKAGE?.ctaHref ?? "/contact/?intent=quote"}>
                  Request a quote
                </ButtonLink>
                <ButtonLink href="/projects/" variant="secondary">
                  See real work
                </ButtonLink>
                <ButtonLink href="/pricing/" variant="ghost">
                  Compare packages
                </ButtonLink>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs leading-5 text-slate-400">
                <span>Business sites from {STARTER_SETUP_PRICE}</span>
                <span aria-hidden="true" className="text-cyan-300">/</span>
                <span>Monthly care from {STARTER_MONTHLY_PRICE}</span>
                <span aria-hidden="true" className="text-cyan-300">/</span>
                <span>Work directly with Anthony</span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ServiceOrbit />
            </Reveal>
          </div>

          <Reveal delay={180} className="service-current mt-12 grid gap-3 md:grid-cols-3">
            {HERO_PATHS.map((path) => (
              <a
                key={path.id}
                href={`/pricing/#${path.id}`}
                className="group min-h-28 rounded-2xl border border-cyan-200/20 bg-[#07111d]/92 px-5 py-4 transition-colors hover:border-cyan-200/60 hover:bg-[#0a1725]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-white">{path.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{path.bestFor}</p>
                  </div>
                  <span className="signal-node mt-1 shrink-0" aria-hidden="true" />
                </div>
                <p className="mt-3 font-mono text-xs text-cyan-200">{path.price}</p>
              </a>
            ))}
          </Reveal>

          <Reveal delay={240} className="signal-rail mt-9 px-4 py-3">
            <div className="ticker">
              <div className="ticker-track">
                {[...BANNER_SERVICES, ...BANNER_SERVICES].map((service, index) => (
                  <span key={`${service}-${index}`} className="font-mono text-[10px] leading-5 text-slate-400">
                    {service}
                    <span className="ml-3 text-cyan-300" aria-hidden="true">•</span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="featured-work" className="signal-section signal-section--quiet scroll-mt-24">
        <Container className="py-16 md:py-24">
          <Reveal className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="signal-kicker">Selected work</p>
              <h2 className="section-title mt-5">Real projects, presented clearly.</h2>
            </div>
            <div className="max-w-2xl lg:pb-2">
              <p className="signal-copy">
                Three builds designed and delivered directly by Anthony. Open a case study for the
                problem, approach, stack, and outcome.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 border-b border-cyan-200/15 md:mt-14">
            {FEATURED_PROJECTS.map((project, index) => (
              <Reveal key={project.slug} delay={index * 70}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 flex justify-start">
            <ButtonLink href="/projects/" variant="secondary">View all projects</ButtonLink>
          </Reveal>
        </Container>
      </section>

      <section id="package-paths" className="signal-section scroll-mt-24">
        <Container className="py-16 md:py-24">
          <Reveal className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="signal-kicker">Simple starting prices</p>
              <h2 className="section-title mt-5">Start focused. Grow when the work needs it.</h2>
              <p className="signal-copy mt-5">
                Pick the website closest to your business. Each starting price pairs a one-time
                setup with required monthly care, and extra work is added only when needed.
              </p>
              <ButtonLink href="/pricing/" variant="secondary" className="mt-7">
                Compare full pricing
              </ButtonLink>
            </div>

            <div className="divide-y divide-cyan-200/15 border-y border-cyan-200/15">
              {HOME_OFFERS.map((item, index) => (
                <Reveal key={item.slug} delay={index * 50}>
                  <div className="grid gap-4 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <h3 className="text-xl font-extrabold tracking-[-0.02em] text-white">{item.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">{item.description}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Best for {item.bestFor}</p>
                    </div>
                    <div className="sm:min-w-44 sm:text-right">
                      <p className="font-mono text-lg text-cyan-100">{item.setupPrice}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        Required care from {item.monthlyPrice}
                      </p>
                      <a href={item.contactHref} className="signal-link mt-3 inline-flex text-sm">
                        Start here
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="conversion-outcomes" className="signal-section signal-section--deep scroll-mt-24">
        <Container className="py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <p className="signal-kicker">What conversion means here</p>
              <h2 className="section-title mt-5">Built around the actions that move a business.</h2>
              <p className="signal-copy mt-5">
                A higher-converting site is not just more visual. It makes the offer obvious,
                handles doubt honestly, and gives serious visitors a clear next step.
              </p>
            </Reveal>

            <div className="border-t border-cyan-200/20">
              {CONVERSION_OUTCOMES.map((item, index) => (
                <Reveal key={item.title} delay={index * 60}>
                  <div className="grid gap-3 border-b border-cyan-200/15 py-6 sm:grid-cols-[0.42fr_0.58fr]">
                    <h3 className="text-lg font-extrabold text-white">{item.title}</h3>
                    <p className="text-sm leading-7 text-slate-400">{item.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="process" className="signal-section scroll-mt-24">
        <Container className="py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Reveal>
                <p className="signal-kicker">From scope to care</p>
                <h2 className="section-title mt-5">A direct path from idea to launch.</h2>
                <p className="signal-copy mt-5">
                  Clear decisions up front reduce rework and make room for better design and development.
                </p>
              </Reveal>

              <div className="relative mt-10 border-l border-cyan-200/25 pl-7">
                {PROCESS.map((item, index) => (
                  <Reveal key={item.step} delay={index * 70} className="relative pb-8 last:pb-0">
                    <span className="absolute -left-[2.15rem] top-1 grid h-4 w-4 place-items-center rounded-full border border-cyan-200/40 bg-[#02060b]">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    </span>
                    <p className="font-mono text-[10px] text-cyan-300">Step {item.step}</p>
                    <h3 className="mt-2 text-xl font-extrabold text-white">{item.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">{item.detail}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={100}>
              <div className="signal-panel-strong p-6 md:p-7">
                <h3 className="text-2xl font-extrabold tracking-[-0.025em] text-white">Before you reach out.</h3>
                <div className="mt-5 divide-y divide-cyan-200/15 border-y border-cyan-200/15">
                  {OBJECTION_HANDLERS.map((item) => (
                    <div key={item.title} className="py-5">
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
                    </div>
                  ))}
                </div>
                <ButtonLink href="/pricing/#pricing-faq" variant="secondary" className="mt-6 w-full">
                  Read the pricing FAQ
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

    </main>
  );
}
