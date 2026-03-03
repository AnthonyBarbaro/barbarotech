import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICE_LANDINGS } from "@/data/services";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Freelance Services",
  description:
    "Freelance web development, AI automation, and Shopify services by Anthony Barbaro for businesses that need fast, measurable execution.",
  alternates: {
    canonical: canonicalUrl("/services/"),
  },
  keywords: withBaseKeywords([
    "freelance web developer",
    "AI automation freelancer",
    "Shopify freelancer",
    "freelance software engineer",
  ]),
  openGraph: {
    title: `Freelance Services | ${SITE.brand}`,
    description:
      "Freelance web development, AI automation, and Shopify services for businesses that need clean execution and measurable outcomes.",
    url: canonicalUrl("/services/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Freelance Services | ${SITE.brand}`,
    description:
      "Freelance web development, AI automation, and Shopify services for businesses that need clean execution and measurable outcomes.",
    images: ["/og.png"],
  },
};

export default function ServicesPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BarbaroTech Services",
    itemListElement: SERVICE_LANDINGS.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: canonicalUrl(`/services/${service.slug}/`),
    })),
  };

  return (
    <main className="text-slate-900">
      <Script
        id="services-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="section-shell border-b border-slate-900/10">
        <div className="ambient-orb right-[-4rem] top-10 h-52 w-52 bg-sky-300/70" />
        <Container className="relative z-10 py-16 md:py-20">
          <Reveal className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Freelance Delivery</Badge>
              <Badge>SEO + Performance</Badge>
              <Badge>Business Outcomes</Badge>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Services</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Focused freelance services.
              <br />
              <span className="text-gradient">No bloated agency process.</span>
            </h1>
            <p className="max-w-2xl text-slate-600">
              Choose the area that fits your goals. Every engagement is structured around clear scope,
              fast implementation, and measurable improvements.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact/">Request a Quote</ButtonLink>
              <ButtonLink href="/contact/#book-call" variant="secondary">
                Book a Call
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-14 md:py-16">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SERVICE_LANDINGS.map((service, idx) => (
              <Reveal key={service.slug} delay={idx * 90}>
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {service.navLabel}
                    </p>
                    <h2 className="text-xl font-semibold text-slate-900">{service.title}</h2>
                    <p className="text-sm leading-relaxed text-slate-600">{service.summary}</p>
                    <div className="pt-2">
                      <Link
                        href={`/services/${service.slug}/`}
                        className="inline-flex items-center text-sm font-semibold text-sky-700 transition hover:text-sky-800"
                      >
                        View service page →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
