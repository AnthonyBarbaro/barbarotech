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

  return (
    <main className="signal-page">
      <Script
        id="services-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
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
                <span className="font-mono text-[10px] text-cyan-300">5 paths</span>
              </div>

              <ol className="divide-y divide-cyan-100/10">
                {WEBSITE_SERVICE_PATHS.map((service, index) => (
                  <li key={service.id}>
                    <Link
                      href={`/pricing/#${service.id}`}
                      className="group grid min-h-16 grid-cols-[2rem_1fr_auto] items-center gap-3 py-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      <span className="font-mono text-[10px] text-cyan-300" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
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

          <ol className="signal-rail mt-12 border-y border-cyan-100/10">
            {WEBSITE_SERVICE_PATHS.map((service, index) => (
              <li key={service.id} className="border-b border-cyan-100/10 last:border-b-0">
                <Reveal delay={index * 60}>
                  <article className="group grid gap-5 py-7 sm:grid-cols-[3rem_1fr] lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-9">
                    <div className="font-mono text-xs text-cyan-300 lg:col-span-1">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="lg:col-span-3">
                      <p className="text-xs font-semibold text-cyan-200/70">{service.eyebrow}</p>
                      <h3 className="mt-2 text-xl font-bold leading-tight text-[#effbff] md:text-2xl">
                        {service.name}
                      </h3>
                    </div>

                    <div className="sm:col-start-2 lg:col-span-5 lg:col-start-auto">
                      <p className="signal-copy text-sm lg:text-base">{service.description}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        Best for: {service.bestFor}
                      </p>
                    </div>

                    <div className="sm:col-start-2 lg:col-span-2 lg:col-start-auto lg:text-right">
                      <p className="font-mono text-base text-cyan-100">{service.setupPrice}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        + {service.monthlyPrice} required care
                      </p>
                    </div>

                    <div className="sm:col-start-2 lg:col-span-1 lg:col-start-auto lg:justify-self-end">
                      <Link
                        href={`/pricing/#${service.id}`}
                        aria-label={`See ${service.name} details`}
                        className="signal-link inline-flex min-h-11 items-center gap-2 py-2 font-semibold"
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
