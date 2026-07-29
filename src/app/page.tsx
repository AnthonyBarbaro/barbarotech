import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import {
  getDiscountedSetupPrice,
  getSetupFeePromotionBadgeText,
  getSetupFeePromotionText,
  pricingPackageGroups,
  setupFeePromotion,
} from "@/data/pricing";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "High-Converting Website Packages",
  description:
    "BarbaroTech builds high-converting website packages and custom software scopes with clear pricing, monthly care, and launch paths for growing businesses.",
  alternates: {
    canonical: canonicalUrl("/"),
  },
  keywords: withBaseKeywords([
    "high converting website",
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
    title: `${SITE.brand} | High-Converting Website Packages`,
    description:
      "Website packages and custom software scopes with clear setup pricing, monthly care, and launch paths built to turn visitors into qualified requests.",
    url: canonicalUrl("/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} | High-Converting Website Packages`,
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
      "Monthly care keeps the website supported after launch, so the site can keep improving instead of going stale.",
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
    detail: "Use monthly care for edits, checks, technical upkeep, and practical next-step recommendations.",
  },
];

const TRUST_POINTS = [
  "Transparent setup pricing",
  "Monthly care explained up front",
  "Static-friendly contact fallback",
  "No custom payment forms",
  "Setup sale clearly scoped",
  "Project proof included",
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
    description: "Credible service-business websites with clear pages, SEO basics, and launch support.",
    bestFor: "Local service businesses and simple company websites.",
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
    description: "Premium storefronts for Shopify or WooCommerce-backed product businesses.",
    bestFor: "Stores that need better product discovery and launch support.",
  },
  "premium-business-websites": {
    description: "Higher-touch website strategy, design, content structure, and monthly growth retainers.",
    bestFor: "High-value local, B2B, and authority-driven brands.",
  },
  "custom-software": {
    description: "Scoped software builds for workflows, internal tools, automations, and integrations.",
    bestFor: "Businesses that need custom software beyond a standard website.",
  },
};

function getPackagePreviewPrice(setupPrice: string, monthlyPrice: string) {
  if (setupPrice.toLowerCase().includes("request")) return setupPrice;

  return `${getDiscountedSetupPrice(setupPrice) ?? setupPrice} + ${monthlyPrice}`;
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
    const basePrice = item.price.split(" + ")[0];
    return basePrice.toLowerCase().includes("request")
      ? `${item.title} upon request`
      : `${item.title} from ${basePrice}`;
  }),
  ...(setupFeePromotion.enabled
    ? [`${getSetupFeePromotionText()} - monthly unchanged`, "Setup fees only"]
    : ["Monthly care starts at launch"]),
];

const STARTER_PACKAGE = pricingPackageGroups[0]?.packages[0];
const STARTER_SETUP_PRICE = STARTER_PACKAGE
  ? getDiscountedSetupPrice(STARTER_PACKAGE.setupPrice) ?? STARTER_PACKAGE.setupPrice
  : "$1,500";
const STARTER_MONTHLY_PRICE = STARTER_PACKAGE?.monthlyPrice ?? "$149/mo";

const HERO_METRICS = [
  {
    label: setupFeePromotion.enabled ? "Sale Entry" : "Entry Package",
    value: `${STARTER_SETUP_PRICE} + ${STARTER_MONTHLY_PRICE}`,
  },
  { label: "Launch Paths", value: "6 Build Types" },
  { label: "Monthly Care", value: "Built In" },
  { label: "Next Step", value: "Quote or Call" },
];

export default function HomePage() {
  return (
    <main className="text-slate-900">
      <section className="section-shell border-b border-slate-900/10">
        <div className="ambient-orb left-[-5rem] top-10 h-48 w-48 bg-sky-300/70" />
        <div className="ambient-orb ambient-orb--slow right-[-6rem] top-24 h-56 w-56 bg-blue-300/60" />

        <Container className="relative z-10 py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <Reveal className="space-y-7">
              <div className="flex flex-wrap gap-2">
                <Badge>Website Packages</Badge>
                <Badge>Monthly Care</Badge>
                <Badge>Built To Convert</Badge>
                {setupFeePromotion.enabled ? (
                  <Badge>
                    {setupFeePromotion.label}: {getSetupFeePromotionText()}
                  </Badge>
                ) : null}
              </div>

              <div className="max-w-4xl space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  BarbaroTech
                </p>
                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
                  High-converting websites
                  <br />
                  with clear packages,
                  <br />
                  <span className="text-gradient">pricing, and next steps.</span>
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                  {SITE.owner} builds website packages for businesses that need more qualified requests,
                  better mobile flow, clearer pricing, and a site that keeps improving after launch.
                </p>
                {setupFeePromotion.enabled ? (
                  <p className="max-w-2xl rounded-2xl border border-cyan-300/30 bg-cyan-50 px-4 py-3 text-sm font-medium text-slate-700">
                    {setupFeePromotion.label}: {getSetupFeePromotionText()}. Monthly care pricing stays the same.
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink href={STARTER_PACKAGE?.ctaHref ?? "/contact/?intent=quote"}>
                  Request a Quote
                </ButtonLink>
                <ButtonLink href="/pricing/" variant="secondary">
                  View Packages
                </ButtonLink>
                <ButtonLink href="/contact/#book-call" variant="ghost">
                  Book a Call
                </ButtonLink>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
                {HERO_METRICS.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {metric.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">{metric.value}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="overflow-hidden rounded-3xl border border-slate-900/12 bg-slate-950 text-white shadow-[0_24px_70px_rgba(6,20,46,0.22)]">
                <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4 md:px-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
                      Package Menu
                    </p>
                    <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-100">
                      Quote Ready
                    </span>
                  </div>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-300">
                    Pick the closest build type. Each path has setup pricing, monthly care, and a clear quote step.
                  </p>
                  {setupFeePromotion.enabled ? (
                    <p className="mt-3 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100">
                      {getSetupFeePromotionText()}. Monthly care is not discounted.
                    </p>
                  ) : null}
                </div>

                <div className="divide-y divide-white/10">
                  {PACKAGE_PREVIEW.map((item, idx) => (
                    <a
                      key={item.id}
                      href={`/pricing/#${item.id}`}
                      className="block px-5 py-3 transition hover:bg-white/[0.04] md:px-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan-400 text-xs font-semibold text-slate-950">
                              {idx + 1}
                            </span>
                            <h2 className="text-base font-semibold text-white">{item.title}</h2>
                          </div>
                          <p className="mt-1 text-sm text-slate-300">{item.bestFor}</p>
                        </div>
                        {item.discountedSetupPrice ? (
                          <div className="shrink-0 text-right">
                            <div className="flex flex-wrap items-center justify-end gap-1.5">
                              <span className="text-xs font-semibold text-slate-400 line-through">
                                {item.setupPrice}
                              </span>
                              <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-xs font-semibold text-cyan-100">
                                {item.discountedSetupPrice}
                              </span>
                              <span className="rounded-full bg-cyan-300 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-950">
                                {getSetupFeePromotionBadgeText()}
                              </span>
                            </div>
                            <p className="mt-1 text-[11px] font-medium text-slate-400">
                              + {item.monthlyPrice} monthly care
                            </p>
                          </div>
                        ) : (
                          <span className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-cyan-100">
                            {item.price}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>

                <div className="grid gap-3 border-t border-white/10 bg-white/[0.03] p-5 md:grid-cols-2 md:p-6">
                  <ButtonLink href={STARTER_PACKAGE?.ctaHref ?? "/contact/?intent=quote"} className="w-full">
                    Start With Business Website
                  </ButtonLink>
                  <ButtonLink href="/pricing/" variant="secondary" className="w-full">
                    Compare Packages
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220} className="mt-10 rounded-2xl border border-slate-900/12 bg-slate-950 px-4 py-3 text-white md:px-5">
            <div className="ticker">
              <div className="ticker-track">
                {[...BANNER_SERVICES, ...BANNER_SERVICES].map((service, idx) => (
                  <span
                    key={`${service}-${idx}`}
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs md:text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-12 md:py-16">
          <Reveal className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Choose Your Launch Path
              </p>
              <h2 className="text-3xl font-semibold md:text-4xl">Website and software packages for every stage.</h2>
              <p className="max-w-2xl text-slate-600">
                Start with the right package, then expand with add-ons, monthly care, and integrations
                when the project needs them.
              </p>
            </div>
            <ButtonLink href="/pricing/" variant="secondary">
              Compare All Pricing
            </ButtonLink>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {PACKAGE_PREVIEW.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 60}>
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col gap-4 p-5 md:p-5">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold leading-tight text-slate-900">{item.title}</h3>
                      {item.discountedSetupPrice ? (
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="text-xs font-semibold text-slate-500 line-through">
                              {item.setupPrice}
                            </span>
                            <span className="text-sm font-semibold text-sky-700">{item.discountedSetupPrice}</span>
                            <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-cyan-700">
                              {getSetupFeePromotionBadgeText()}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-slate-500">
                            + {item.monthlyPrice} monthly care. Monthly care pricing is unchanged.
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm font-semibold text-sky-700">
                          {item.price.toLowerCase().includes("request") ? item.price : `Starting at ${item.price}`}
                        </p>
                      )}
                      <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                      <p className="text-xs leading-relaxed text-slate-500">Best for: {item.bestFor}</p>
                    </div>
                    <div className="mt-auto flex flex-col gap-2">
                      <a
                        href={`/pricing/#${item.id}`}
                        className="inline-flex justify-center rounded-full border border-slate-900/10 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700 transition hover:border-sky-500/40 hover:text-sky-700"
                      >
                        See Package
                      </a>
                      <a
                        href={item.contactHref}
                        className="inline-flex justify-center rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-slate-800"
                      >
                        Request Quote
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell border-b border-slate-900/10">
        <div className="ambient-orb right-[-5rem] bottom-[-4rem] h-52 w-52 bg-sky-300/70" />
        <Container className="relative z-10 py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Why It Converts
              </p>
              <h2 className="text-3xl font-semibold md:text-4xl">Built around the actions that make money.</h2>
              <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                A high-converting site is not just prettier. It makes the offer obvious, reduces doubt,
                and gives serious visitors a simple way to take the next step.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {TRUST_POINTS.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-slate-900/10 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {CONVERSION_OUTCOMES.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 70}>
                  <Card className="h-full">
                    <CardContent className="space-y-2 p-5 md:p-6">
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600">{item.detail}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-12 md:py-16">
          <Reveal className="mb-8 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Project Proof
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">Real builds behind the offer.</h2>
            <p className="max-w-2xl text-slate-600">
              Selected work across service businesses, ecommerce, local SEO, automation, and operational systems.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_PROJECTS.map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <Reveal className="mb-8 space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Launch Process
                </p>
                <h2 className="text-3xl font-semibold md:text-4xl">A sales-ready path from scope to care.</h2>
                <p className="max-w-2xl text-slate-600">
                  The process is built to keep decisions clear, reduce back-and-forth, and get the site live
                  with a plan for what happens next.
                </p>
              </Reveal>

              <div className="grid gap-4 md:grid-cols-2">
                {PROCESS.map((item, idx) => (
                  <Reveal key={item.step} delay={idx * 70}>
                    <Card className="h-full">
                      <CardContent className="space-y-3 p-5 md:p-6">
                        <div className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                          {item.step}
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-slate-600">{item.detail}</p>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={120}>
              <div className="glass-panel rounded-3xl p-6 md:p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Common Questions
                </p>
                <div className="mt-5 space-y-3">
                  {OBJECTION_HANDLERS.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-900/10 bg-white/85 px-4 py-3">
                      <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.detail}</p>
                    </div>
                  ))}
                </div>
                <ButtonLink href="/pricing/#pricing-faq" variant="secondary" className="mt-5 w-full">
                  Read Pricing FAQ
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section-shell">
        <div className="ambient-orb left-[20%] bottom-[-4rem] h-44 w-44 bg-sky-300/70" />
        <Container className="relative z-10 py-14 md:py-16">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-slate-900/12 bg-slate-950 text-white shadow-[0_24px_70px_rgba(6,20,46,0.2)]">
              <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="p-7 md:p-9">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100">
                    Next Step
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
                    Turn the site into a real sales asset.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
                    Send the project details and I&apos;ll recommend the best package, care plan, add-ons,
                    timeline, and quote path.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonLink href={STARTER_PACKAGE?.ctaHref ?? "/contact/?intent=quote"}>
                      Request a Quote
                    </ButtonLink>
                    <ButtonLink href="/contact/#book-call" variant="secondary">
                      Book a Call
                    </ButtonLink>
                  </div>
                </div>
                <div className="border-t border-white/10 bg-white/[0.04] p-7 md:p-9 lg:border-l lg:border-t-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
                    What to send
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-300">
                    <li>Current website or business name</li>
                    <li>Best-fit package if you already know it</li>
                    <li>Pages, services, products, or booking needs</li>
                    <li>Ideal launch timeline and budget range</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
