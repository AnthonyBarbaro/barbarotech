import type { Metadata } from "next";
import Script from "next/script";
import { Container } from "@/components/container";
import { PricingCard } from "@/components/pricing-card";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  additionalCareWork,
  getSetupFeePromotionText,
  monthlyCareIncludes,
  monthlyCarePlans,
  optionalPricingAddOns,
  paymentTerms,
  platformCostNotes,
  pricingAddOns,
  pricingPackageGroups,
  pricingFaqs,
  setupFeePromotion,
} from "@/data/pricing";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Website & Software Pricing",
  description:
    "Explore BarbaroTech website packages and custom software scopes for business websites, restaurants, booking sites, ecommerce stores, premium brands, and operational workflows.",
  alternates: {
    canonical: canonicalUrl("/pricing/"),
  },
  keywords: withBaseKeywords([
    "website pricing",
    "website packages",
    "monthly care plans",
    "business website pricing",
    "restaurant website pricing",
    "booking website pricing",
    "ecommerce website pricing",
    "premium business website pricing",
    "custom software pricing",
  ]),
  openGraph: {
    title: `Website & Software Pricing | ${SITE.brand}`,
    description:
      "Website packages and custom software scopes for business websites, restaurants, booking sites, ecommerce stores, premium brands, and operational workflows.",
    url: canonicalUrl("/pricing/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Website & Software Pricing | ${SITE.brand}`,
    description:
      "Website packages and custom software scopes for business websites, restaurants, booking sites, ecommerce stores, premium brands, and operational workflows.",
    images: ["/og.png"],
  },
};

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
    <main className="text-slate-900">
      <Script
        id="pricing-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="section-shell border-b border-slate-900/10">
        <div className="ambient-orb right-[-5rem] top-10 h-56 w-56 bg-sky-300/70" />
        <div className="ambient-orb ambient-orb--slow left-[-5rem] bottom-[-4rem] h-52 w-52 bg-blue-300/60" />
        <Container className="relative z-10 py-16 md:py-20">
          <Reveal className="max-w-4xl space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge>Setup Pricing</Badge>
              <Badge>Monthly Care</Badge>
              <Badge>Upgrade Paths</Badge>
              {setupFeePromotion.enabled ? (
                <Badge>
                  {setupFeePromotion.label}: {getSetupFeePromotionText()}
                </Badge>
              ) : null}
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Website & Software Pricing</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Website and software packages built
              <br />
              <span className="text-gradient">for real business growth.</span>
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              Clear launch pricing, monthly care options, and upgrade paths for business websites,
              restaurants, booking sites, ecommerce stores, premium brands, and custom software scopes.
            </p>
            {setupFeePromotion.enabled ? (
              <div className="max-w-3xl rounded-3xl border border-cyan-300/30 bg-white/85 px-5 py-4 shadow-[0_18px_44px_rgba(8,17,40,0.08)]">
                <p className="text-sm font-semibold text-slate-900">
                  {setupFeePromotion.label}: {getSetupFeePromotionText()}.
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  This discount applies to setup fees only. Monthly care, add-ons, third-party costs,
                  and usage-based expenses are not discounted.
                </p>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact/?intent=quote">Request a Quote</ButtonLink>
              <ButtonLink href="/contact/?intent=call" variant="secondary">
                Book a Call
              </ButtonLink>
            </div>
            <p className="max-w-2xl text-sm text-slate-500">
              Final pricing depends on scope, integrations, content, and launch timeline.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-8 md:py-10">
          <Reveal className="flex flex-wrap gap-2">
            {pricingPackageGroups.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="inline-flex rounded-full border border-slate-900/10 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-600 transition hover:border-sky-500/40 hover:text-slate-900"
              >
                {group.title.replace(" Websites", "").replace(" Stores", "")}
              </a>
            ))}
          </Reveal>
        </Container>
      </section>

      {pricingPackageGroups.map((group, groupIndex) => (
        <section key={group.id} id={group.id} className="scroll-mt-28 border-b border-slate-900/10">
          <Container className="py-12 md:py-16">
            <Reveal className="mb-7 grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {group.eyebrow}
                </p>
                <h2 className="text-3xl font-semibold md:text-4xl">{group.title}</h2>
                <p className="max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                  {group.description}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Best For</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {group.bestFor.slice(0, 8).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-900/10 bg-white px-2.5 py-1 text-xs text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid gap-5 lg:grid-cols-3">
              {group.packages.map((plan, idx) => (
                <Reveal key={plan.slug} delay={(idx + groupIndex) * 60}>
                  <PricingCard plan={plan} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section className="section-shell border-b border-slate-900/10">
        <Container className="relative z-10 py-12 md:py-16">
          <Reveal className="mb-7 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Optional Add-On</p>
            <h2 className="text-3xl font-semibold md:text-4xl">AI concierge for guided website conversations.</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              Add this after the core website scope is clear. It can answer common questions, route visitors
              to services, and help prepare lead summaries without giving legal, medical, financial, or
              regulated advice.
            </p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            {optionalPricingAddOns.map((plan) => (
              <Reveal key={plan.slug}>
                <PricingCard plan={plan} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="pricing-faq" className="scroll-mt-28 border-b border-slate-900/10">
        <Container className="py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Monthly Care
              </p>
              <h2 className="text-3xl font-semibold md:text-4xl">What monthly care covers.</h2>
              <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                Monthly care starts at launch and keeps the website supported after the initial build.
                Additional work outside the included monthly edit time is billed at {additionalCareWork}.
              </p>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {monthlyCarePlans.map((plan) => (
                  <div key={plan.name} className="rounded-2xl border border-slate-900/10 bg-white/85 px-4 py-3">
                    <h3 className="text-sm font-semibold text-slate-900">{plan.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-sky-700">{plan.editingLimit}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{plan.description}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <Card>
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900">Care plan coverage may include</h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {monthlyCareIncludes.map((item) => (
                      <div key={item} className="flex gap-2 rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-sm text-slate-600">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/80" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-12 md:py-16">
          <Reveal className="mb-7 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Add-Ons</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Standard add-ons and upgrade ranges.</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              Add-ons are scoped into the quote when the project needs more pages, content, integrations,
              product work, or a faster launch timeline.
            </p>
          </Reveal>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {pricingAddOns.map((addOn, idx) => (
              <Reveal key={addOn.name} delay={(idx % 6) * 45}>
                <div className="h-full rounded-2xl border border-slate-900/10 bg-white/85 px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-slate-900">{addOn.name}</h3>
                    <span className="shrink-0 rounded-full border border-slate-900/10 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {addOn.price}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{addOn.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-12 md:py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <Card className="h-full">
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Third-Party Costs
                    </p>
                    <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                      Platform costs stay separate.
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-600">
                      Third-party costs are separate and billed directly to the client when applicable.
                      These costs vary by provider and can change over time.
                    </p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {platformCostNotes.map((note) => (
                      <div key={note} className="rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-sm text-slate-600">
                        {note}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={120}>
              <Card className="h-full">
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Payment Terms
                    </p>
                    <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                      Typical payment structure.
                    </h2>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {paymentTerms.map((term) => (
                      <li key={term} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/80" />
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-12 md:py-16">
          <Reveal className="mb-7 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Pricing FAQ</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Common pricing questions.</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {pricingFaqs.map((faq, idx) => (
              <Reveal key={faq.question} delay={(idx % 4) * 70}>
                <Card className="h-full">
                  <CardContent className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell">
        <Container className="py-12 md:py-16">
          <Reveal>
            <div className="glass-panel rounded-3xl p-7 md:p-9">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Next Step</p>
                  <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                    Not sure which package fits?
                  </h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                    Send the project details and I&apos;ll recommend the right launch path.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/contact/?intent=quote">Request a Quote</ButtonLink>
                  <ButtonLink href="/contact/?intent=call" variant="secondary">
                    Book a Call
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
