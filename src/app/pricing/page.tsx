import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PricingCard } from "@/components/pricing-card";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { PRICING } from "@/data/pricing";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for websites, redesigns, ecommerce upgrades, and backend applications.",
  alternates: {
    canonical: canonicalUrl("/pricing/"),
  },
  keywords: withBaseKeywords([
    "website pricing",
    "web development packages",
    "Shopify pricing",
    "custom app pricing",
  ]),
  openGraph: {
    title: `Pricing | ${SITE.brand}`,
    description:
      "Transparent pricing packages for websites, redesigns, ecommerce work, and custom web applications.",
    url: canonicalUrl("/pricing/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Pricing | ${SITE.brand}`,
    description:
      "Transparent pricing packages for websites, redesigns, ecommerce work, and custom web applications.",
    images: ["/og.png"],
  },
};

const FLOW_POINTS = [
  {
    title: "Start with a package",
    detail: "Pick the closest option. It gives us a clean baseline for scope and cost.",
  },
  {
    title: "Adjust to your needs",
    detail: "I tailor pages, features, and timeline based on your actual goals.",
  },
  {
    title: "Get a final quote",
    detail: "You receive a direct quote with deliverables, timeline, and next steps.",
  },
];

const SECTIONS = [
  {
    title: "New Website Builds",
    description: "For businesses launching a new site or replacing an outdated one.",
    plans: PRICING.staticWebsites,
    grid: "lg:grid-cols-2",
  },
  {
    title: "Upgrades & Ongoing Work",
    description: "For remodels, platform updates, ecommerce improvements, and monthly support.",
    plans: PRICING.existingSites,
    grid: "lg:grid-cols-3",
  },
  {
    title: "Custom Web Applications",
    description: "For internal tools, dashboards, and full-stack business systems.",
    plans: PRICING.backendWebsites,
    grid: "lg:grid-cols-2",
  },
] as const;

export default function PricingPage() {
  return (
    <main className="text-slate-900">
      <section className="section-shell border-b border-slate-900/10">
        <div className="ambient-orb right-[-5rem] top-10 h-56 w-56 bg-sky-300/70" />
        <Container className="relative z-10 py-16 md:py-20">
          <Reveal className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Pricing</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Simple pricing.
              <br />
              <span className="text-gradient">Clear starting points.</span>
            </h1>
            <p className="max-w-2xl text-slate-600">
              Use these packages to quickly estimate investment. Final pricing is always based on your
              exact scope.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact/">Request a Quote</ButtonLink>
              <ButtonLink href="/projects/" variant="secondary">
                See Project Quality
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-10 md:py-12">
          <div className="grid gap-3 md:grid-cols-3">
            {FLOW_POINTS.map((point, idx) => (
              <Reveal key={point.title} delay={idx * 70}>
                <div className="rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                    Step {idx + 1}
                  </p>
                  <h2 className="mt-1 text-base font-semibold text-slate-900">{point.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{point.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {SECTIONS.map((section, sectionIndex) => (
        <section key={section.title} className="border-b border-slate-900/10">
          <Container className="py-12 md:py-14">
            <Reveal className="mb-6 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Section {sectionIndex + 1}
              </p>
              <h2 className="text-2xl font-semibold md:text-3xl">{section.title}</h2>
              <p className="max-w-2xl text-sm text-slate-600 md:text-base">{section.description}</p>
            </Reveal>

            <div className={`grid gap-5 md:grid-cols-2 ${section.grid}`}>
              {section.plans.map((plan, idx) => (
                <Reveal key={plan.id} delay={(idx % 4) * 70}>
                  <PricingCard plan={plan} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section className="section-shell">
        <Container className="py-12 md:py-14">
          <Reveal>
            <div className="glass-panel rounded-3xl p-7 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Need Help Choosing?</p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900 md:text-2xl">
                    I can recommend the right package in one reply.
                  </h3>
                </div>
                <ButtonLink href="/contact/">Start Here</ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
