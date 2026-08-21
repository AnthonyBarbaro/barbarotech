import type { Metadata } from "next";
import Script from "next/script";
import { Container } from "@/components/container";
import { PricingPackageDeck } from "@/components/pricing-package-deck";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import {
  getSetupFeePromotionText,
  monthlyCareIncludes,
  paymentTerms,
  pricingAddOns,
  pricingFaqs,
  pricingPackageGroups,
  setupFeePromotion,
} from "@/data/pricing";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Simple Website Pricing",
  description:
    "Choose a clear BarbaroTech starting package for a business website, restaurant, booking business, online store, or premium website. Required monthly care is shown up front.",
  alternates: {
    canonical: canonicalUrl("/pricing/"),
  },
  keywords: withBaseKeywords([
    "website pricing",
    "website packages",
    "monthly website care",
    "restaurant website pricing",
    "booking website pricing",
    "ecommerce website pricing",
  ]),
  openGraph: {
    title: `Simple Website Pricing | ${SITE.brand}`,
    description:
      "Five clear website starting points with one-time setup and required monthly care shown together.",
    url: canonicalUrl("/pricing/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Simple Website Pricing | ${SITE.brand}`,
    description:
      "Five clear website starting points with one-time setup and required monthly care shown together.",
    images: ["/og.png"],
  },
};

const websitePackageGroups = pricingPackageGroups.filter(
  (group) => group.id !== "custom-software"
);
const customSoftwareGroup = pricingPackageGroups.find(
  (group) => group.id === "custom-software"
);
const websitePackages = websitePackageGroups.flatMap((group) =>
  group.packages.slice(0, 1).map((plan) => ({ id: group.id, plan }))
);

export default function PricingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="signal-page">
      <Script
        id="pricing-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="signal-hero">
        <Container className="relative z-10 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.75fr] lg:items-center">
            <Reveal>
              <p className="signal-kicker">Simple starting prices</p>
              <h1 className="display-title mt-6">
                Choose the closest build.{" "}
                <span className="signal-accent">I&apos;ll handle the details.</span>
              </h1>
              <p className="signal-copy mt-6">
                Each package shows the one-time setup and required monthly care. If your
                project needs extra pages, content, or integrations, I&apos;ll include them
                in one clear quote.
              </p>
              <ButtonLink href="/contact/?intent=quote" className="mt-7">
                Get my recommendation
              </ButtonLink>
            </Reveal>

            <Reveal delay={110}>
              <div className="signal-panel-strong p-6 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[10px] text-cyan-300">How pricing works</p>
                  <span className="signal-node" aria-hidden="true" />
                </div>
                <div className="mt-5 divide-y divide-cyan-200/15 border-y border-cyan-200/15">
                  <div className="grid grid-cols-[5.5rem_1fr] gap-3 py-4">
                    <span className="font-mono text-[10px] text-slate-500">Setup</span>
                    <p className="text-sm leading-6 text-slate-300">
                      Covers the agreed website build and launch.
                    </p>
                  </div>
                  <div className="grid grid-cols-[5.5rem_1fr] gap-3 py-4">
                    <span className="font-mono text-[10px] text-slate-500">Monthly</span>
                    <p className="text-sm leading-6 text-slate-300">
                      Keeps the site hosted, maintained, and supported.
                    </p>
                  </div>
                  <div className="grid grid-cols-[5.5rem_1fr] gap-3 py-4">
                    <span className="font-mono text-[10px] text-slate-500">Extras</span>
                    <p className="text-sm leading-6 text-slate-300">
                      Added only when your project actually needs them.
                    </p>
                  </div>
                </div>
                {setupFeePromotion.enabled ? (
                  <p className="mt-5 text-sm leading-6 text-cyan-100">
                    {setupFeePromotion.label}: {getSetupFeePromotionText()}. Monthly care
                    stays unchanged.
                  </p>
                ) : null}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="packages" className="signal-section scroll-mt-24">
        <Container className="py-16 md:py-24">
          <Reveal className="max-w-3xl">
            <p className="signal-kicker">Pick by project type</p>
            <h2 className="section-title mt-5">Five clear website packages.</h2>
            <p className="signal-copy mt-5">
              Choose the one that looks closest. The final scope can flex without making you
              compare a long list of tiers and technical options.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <PricingPackageDeck items={websitePackages} />
          </Reveal>

          <Reveal className="mt-10">
            {customSoftwareGroup?.packages[0] ? (
              <div
                id={customSoftwareGroup.id}
                className="flex scroll-mt-28 flex-col gap-5 border-y border-cyan-200/15 py-7 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-lg font-extrabold text-white">
                    Need something outside these packages?
                  </p>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                    Extra pages, content, provider connections, and special features are added
                    to one quote. Workflows, internal tools, and automations start with a short
                    discovery conversation.
                  </p>
                </div>
                <ButtonLink
                  href={customSoftwareGroup.packages[0].ctaHref}
                  variant="secondary"
                  className="shrink-0"
                >
                  Discuss a custom build
                </ButtonLink>
              </div>
            ) : null}
          </Reveal>
        </Container>
      </section>

      <section id="monthly-care" className="signal-section signal-section--deep scroll-mt-24">
        <Container className="py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <Reveal>
              <p className="signal-kicker">Required monthly care</p>
              <h2 className="section-title mt-5">
                Your website stays handled after launch.
              </h2>
              <p className="signal-copy mt-5">
                Monthly care is part of every website package and begins the month after the
                website launches. The amount shown on each package reflects the support that
                type of website needs.
              </p>
              <p className="mt-5 text-sm leading-7 text-slate-400">
                Larger changes are discussed and approved before any extra work begins.
              </p>
              <p className="mt-5 border-l-2 border-cyan-300 pl-4 text-sm leading-7 text-cyan-100">
                Select new clients receive their first two months of monthly website care free.
                Eligibility is confirmed in the project scope before work begins.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="signal-panel-strong p-6 md:p-7">
                <h3 className="text-2xl font-extrabold text-white">
                  What monthly care covers
                </h3>
                <div className="mt-5 grid gap-x-6 sm:grid-cols-2">
                  {monthlyCareIncludes.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 border-b border-cyan-200/12 py-3 text-sm leading-6 text-slate-300"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="add-ons" className="signal-section scroll-mt-24">
        <Container className="py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <Reveal>
              <p className="signal-kicker">Optional add-ons</p>
              <h2 className="section-title mt-5">Add only what the project needs.</h2>
              <p className="signal-copy mt-5">
                Add-ons are scoped alongside the main build so the launch price stays clear.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="pricing-addons-grid">
                {pricingAddOns.map((addOn) => (
                  <article key={addOn.name} className="pricing-addon-card">
                    <h3>{addOn.name}</h3>
                    <p>{addOn.detail}</p>
                    <strong>{addOn.price}</strong>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="signal-section">
        <Container className="py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <Reveal>
              <p className="signal-kicker">Before the build</p>
              <h2 className="section-title mt-5">One quote. No feature maze.</h2>
              <p className="signal-copy mt-5">
                Tell me what the website needs to do. I&apos;ll choose the right foundation,
                add only the work your project needs, and explain the total before we begin.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="signal-panel p-6 md:p-7">
                <h3 className="text-2xl font-extrabold text-white">Simple terms</h3>
                <ul className="mt-5 divide-y divide-cyan-200/12 border-y border-cyan-200/12">
                  {paymentTerms.map((term) => (
                    <li
                      key={term}
                      className="flex gap-3 py-3 text-sm leading-6 text-slate-300"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300"
                        aria-hidden="true"
                      />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-6 text-slate-500">
                  Domain registration, software subscriptions, payment processing, and provider
                  usage fees are billed separately when needed.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="pricing-faq" className="signal-section signal-section--deep scroll-mt-24">
        <Container className="py-16 md:py-24">
          <Reveal className="mb-9">
            <p className="signal-kicker">Pricing FAQ</p>
            <h2 className="section-title mt-5">The important questions.</h2>
          </Reveal>
          <div className="grid gap-x-8 lg:grid-cols-2">
            {pricingFaqs.map((faq, index) => (
              <Reveal key={faq.question} delay={(index % 4) * 60}>
                <details className="group border-b border-cyan-200/15">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold text-white marker:hidden">
                    {faq.question}
                    <span
                      className="font-mono text-cyan-300 transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-5 text-sm leading-7 text-slate-400">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="signal-section">
        <Container className="py-14 md:py-20">
          <Reveal>
            <div className="signal-cta p-7 md:p-10">
              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="signal-kicker">Not sure which one fits?</p>
                  <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-[-0.03em] text-white md:text-5xl">
                    Tell me the goal. I&apos;ll recommend the package.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                    You do not need to figure out every page or feature before reaching out.
                  </p>
                </div>
                <ButtonLink href="/contact/?intent=quote" className="shrink-0">
                  Request a quote
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
