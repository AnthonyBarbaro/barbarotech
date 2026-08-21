/*
THESIS: BarbaroTech offers a small set of clear website starting points, with extras scoped only when the project needs them.
OWN-WORLD: Signal-black space, cyan wayfinding, direct pricing, and one accountable builder from scope through monthly care.
STORY: Choose the closest website type, understand the starting investment, and send one quote request.
FIRST VIEWPORT: The five launch paths and the single primary action are visible without introducing a tier maze.
*/
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { pricingPackageGroups } from "@/data/pricing";
import { SERVICE_CATEGORIES, SERVICE_LANDINGS } from "@/data/services";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Website Services",
  description:
    "Simple website packages for small businesses, restaurants, appointment businesses, online stores, and established brands—built and supported directly by Anthony Barbaro.",
  alternates: {
    canonical: canonicalUrl("/services/"),
  },
  keywords: withBaseKeywords([
    "small business website services",
    "restaurant website developer",
    "booking website developer",
    "ecommerce website developer",
    "premium business website",
  ]),
  openGraph: {
    title: `Website Services | ${SITE.brand}`,
    description:
      "Five clear website starting points with direct delivery, transparent setup pricing, and ongoing monthly care.",
    url: canonicalUrl("/services/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Website Services | ${SITE.brand}`,
    description:
      "Five clear website starting points with direct delivery, transparent setup pricing, and ongoing monthly care.",
    images: ["/og.png"],
  },
};

const WEBSITE_SERVICE_IDS = [
  "business-websites",
  "restaurant-websites",
  "booking-websites",
  "ecommerce-stores",
  "premium-business-websites",
] as const;

const WEBSITE_SERVICE_PATHS = WEBSITE_SERVICE_IDS.flatMap((id) => {
  const group = pricingPackageGroups.find((candidate) => candidate.id === id);
  if (!group) return [];

  const pricingPackage = group.packages[0];
  if (!pricingPackage) return [];

  return [
    {
      id: group.id,
      name: group.title,
      eyebrow: group.eyebrow,
      description: group.description,
      bestFor: pricingPackage.bestFor,
      setupPrice: pricingPackage.setupPrice,
      monthlyPrice: pricingPackage.monthlyPrice,
    },
  ];
});

const CUSTOM_SOFTWARE_PATH = pricingPackageGroups.find(
  (group) => group.id === "custom-software"
);

const DISCOVERY_SERVICE_GROUPS = SERVICE_CATEGORIES.map((category) => ({
  category,
  id: category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  services: SERVICE_LANDINGS.filter((service) => service.category === category).sort(
    (a, b) => a.priority - b.priority
  ),
}));

export default function ServicesPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BarbaroTech Website Services",
    itemListElement: WEBSITE_SERVICE_PATHS.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: canonicalUrl(`/pricing/#${service.id}`),
    })),
  };
  const discoveryServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BarbaroTech Service Guides",
    itemListElement: SERVICE_LANDINGS.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: canonicalUrl(`/services/${service.slug}/`),
    })),
  };

  return (
    <main className="signal-page">
      <Script
        id="services-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Script
        id="service-guides-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(discoveryServiceJsonLd) }}
      />

      <section className="signal-hero border-b border-cyan-100/10">
        <Container className="relative z-10 grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-10">
          <Reveal className="lg:col-span-7">
            <p className="signal-kicker">Website services · one builder</p>
            <h1 className="display-title mt-6 max-w-[13ch] text-balance">
              Five clear ways to launch.
              <span className="mt-1 block text-cyan-300">One person making it work.</span>
            </h1>
            <p className="signal-copy mt-7 max-w-2xl text-base md:text-lg">
              Pick the website type closest to your business. I&apos;ll shape the pages, features,
              and launch plan around what you actually need—without making you sort through a
              complicated package maze.
            </p>

            <div className="mt-8">
              <Link href="/contact/?intent=quote" className="signal-cta min-h-11">
                Request a quote
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="signal-rule mt-9 max-w-2xl" />
            <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-400">
              Setup covers the build. Required monthly care covers hosting, support, updates, and
              ongoing improvements. Extra pages or integrations are quoted only when they help.
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <aside className="signal-panel-strong p-5 sm:p-7" aria-labelledby="service-index-title">
              <div className="flex items-center justify-between gap-4 border-b border-cyan-100/10 pb-5">
                <h2 id="service-index-title" className="text-sm font-semibold text-cyan-50">
                  Choose the closest starting point
                </h2>
                <span className="font-mono text-[10px] text-cyan-300">Website paths</span>
              </div>

              <ol className="divide-y divide-cyan-100/10">
                {WEBSITE_SERVICE_PATHS.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/pricing/#${service.id}`}
                      className="group grid min-h-16 grid-cols-[1fr_auto] items-center gap-3 py-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-cyan-50">
                          {service.name}
                        </span>
                        <span className="mt-1 block text-xs text-slate-400">
                          {service.setupPrice} + {service.monthlyPrice} care
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-cyan-300 transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </aside>
          </Reveal>
        </Container>
      </section>

      <section className="signal-section" aria-labelledby="service-paths-title">
        <Container className="py-20 md:py-28">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="signal-kicker">Simple starting points</p>
              <h2 id="service-paths-title" className="section-title mt-5 text-balance">
                Start close. Shape the rest together.
              </h2>
            </div>
            <p className="signal-copy lg:col-span-5">
              These are not rigid boxes. They give us a useful starting scope, then I account for
              anything your business needs before the build begins.
            </p>
          </Reveal>

          <ol className="services-path-rail signal-rail mt-12 border-y border-cyan-100/10">
            {WEBSITE_SERVICE_PATHS.map((service, index) => (
              <li key={service.id} className="border-b border-cyan-100/10 last:border-b-0">
                <Reveal delay={index * 60}>
                  <article className="services-path-row group grid gap-5 py-7 lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-9">
                    <div className="lg:col-span-4">
                      <p className="services-path-eyebrow text-xs font-semibold">{service.eyebrow}</p>
                      <h3 className="services-path-title mt-2 text-xl font-bold leading-tight md:text-2xl">
                        {service.name}
                      </h3>
                    </div>

                    <div className="lg:col-span-5">
                      <p className="services-path-description signal-copy text-sm lg:text-base">{service.description}</p>
                      <p className="services-path-best mt-2 text-xs leading-5">
                        Best for: {service.bestFor}
                      </p>
                    </div>

                    <div className="lg:col-span-2 lg:text-right">
                      <p className="services-path-price font-mono text-base">{service.setupPrice}</p>
                      <p className="services-path-monthly mt-1 text-xs">
                        + {service.monthlyPrice} required care
                      </p>
                    </div>

                    <div className="sm:col-start-2 lg:col-span-1 lg:col-start-auto lg:justify-self-end">
                      <Link
                        href={`/pricing/#${service.id}`}
                        aria-label={`See ${service.name} details`}
                        className="services-path-link signal-link inline-flex min-h-11 items-center gap-2 py-2 font-semibold"
                      >
                        Details
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="signal-section border-t border-cyan-100/10" aria-labelledby="service-guides-title">
        <Container className="py-20 md:py-28">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="signal-kicker">Explore by need</p>
              <h2 id="service-guides-title" className="section-title mt-5 text-balance">
                Specific answers for specific projects.
              </h2>
            </div>
            <p className="signal-copy lg:col-span-5">
              Each guide covers a distinct buying decision, implementation path, or project type
              and connects it to relevant shipped work.
            </p>
          </Reveal>

          <div className="mt-14 space-y-14">
            {DISCOVERY_SERVICE_GROUPS.map((group) => (
              <section key={group.category} aria-labelledby={`service-group-${group.id}`}>
                <Reveal>
                  <h3
                    id={`service-group-${group.id}`}
                    className="text-xl font-bold text-cyan-50 md:text-2xl"
                  >
                    {group.category}
                  </h3>
                </Reveal>

                <div className="signal-rail mt-5 border-y border-cyan-100/10">
                  {group.services.map((service, index) => (
                    <Reveal
                      key={service.slug}
                      delay={index * 45}
                      className="border-b border-cyan-100/10 last:border-b-0"
                    >
                      <Link
                        href={`/services/${service.slug}/`}
                        className="group grid min-h-28 gap-4 py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 md:grid-cols-12 md:items-center md:gap-6 md:px-2"
                      >
                        <span className="md:col-span-4">
                          <span className="block text-lg font-bold text-cyan-50">
                            {service.shortTitle}
                          </span>
                          <span className="mt-2 block font-mono text-[10px] text-cyan-300">
                            {service.navLabel}
                          </span>
                        </span>
                        <span className="signal-copy text-sm md:col-span-7 md:text-base">
                          {service.description}
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-cyan-300 transition-transform group-hover:translate-x-1 md:col-span-1 md:justify-self-end"
                        >
                          →
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 grid gap-5 border-y border-cyan-100/10 py-7 md:grid-cols-[1fr_auto] md:items-center md:gap-10">
              <div>
                <h3 className="text-xl font-bold text-cyan-50">Planning before you choose a service?</h3>
                <p className="signal-copy mt-3 text-sm md:text-base">
                  Use the buyer guides to compare providers, review proposals, estimate costs, and
                  protect ownership before a build begins.
                </p>
              </div>
              <Link
                href="/guides/"
                className="signal-link inline-flex min-h-11 items-center gap-2 py-2 font-semibold"
              >
                Open planning guides
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="signal-section border-t border-cyan-100/10">
        <Container className="py-16 md:py-24">
          <Reveal>
            <div className="signal-panel-strong grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:p-10">
              <div className="lg:col-span-8">
                <p className="signal-kicker">Need something beyond a website?</p>
                <h2 className="section-title mt-4 max-w-3xl text-balance">
                  Custom software stays a conversation, not another pricing maze.
                </h2>
                <p className="signal-copy mt-5 max-w-2xl">
                  {CUSTOM_SOFTWARE_PATH?.description ??
                    "Custom tools, workflows, and integrations are scoped after a short discovery conversation."}
                </p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <Link
                  href="/pricing/#custom-software"
                  className="signal-link inline-flex min-h-11 items-center gap-2 py-2 font-semibold"
                >
                  See how custom work is scoped
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
