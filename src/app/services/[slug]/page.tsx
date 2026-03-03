import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getServiceBySlug, SERVICE_LANDINGS } from "@/data/services";
import { SITE } from "@/lib/site";
import { canonicalUrl, estimateWordCount, withBaseKeywords } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICE_LANDINGS.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const url = canonicalUrl(`/services/${service.slug}/`);

  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: url,
    },
    keywords: withBaseKeywords(service.keywords),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${service.title} | ${SITE.brand}`,
      description: service.description,
      url,
      siteName: SITE.brand,
      images: [{ url: "/og.png" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ${SITE.brand}`,
      description: service.description,
      images: ["/og.png"],
    },
  };
}

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceSlugPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const canonical = canonicalUrl(`/services/${service.slug}/`);
  const related = SERVICE_LANDINGS.filter((item) => item.slug !== service.slug).slice(0, 2);
  const wordCount = estimateWordCount([
    service.summary,
    service.audience,
    ...service.outcomes,
    ...service.deliverables,
    ...service.process,
    ...service.faqs.flatMap((item) => [item.question, item.answer]),
  ]);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: canonical,
    provider: {
      "@type": "Organization",
      name: SITE.brand,
      url: SITE.url,
    },
    areaServed: "United States",
    inLanguage: "en",
    wordCount,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: canonicalUrl("/services/"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.shortTitle,
        item: canonical,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
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
        id="service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id="service-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="service-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="section-shell border-b border-slate-900/10">
        <div className="ambient-orb left-[-4rem] top-12 h-52 w-52 bg-sky-300/70" />
        <Container className="relative z-10 py-14 md:py-18">
          <Reveal className="space-y-4">
            <Link href="/services/" className="inline-flex text-sm font-semibold text-slate-600 transition hover:text-slate-900">
              ← Back to Services
            </Link>
            <div className="flex flex-wrap gap-2">
              <Badge>{service.shortTitle}</Badge>
              <Badge>Freelance</Badge>
              <Badge>Professional Delivery</Badge>
            </div>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{service.title}</h1>
            <p className="max-w-3xl text-slate-600">{service.summary}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`/contact/?context=${encodeURIComponent(service.title)}`}>Request a Quote</ButtonLink>
              <ButtonLink href="/contact/#book-call" variant="secondary">
                Book a Call
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-12 md:py-14">
          <div className="grid gap-5 md:grid-cols-3">
            <Reveal>
              <Card className="h-full">
                <CardContent className="space-y-2">
                  <h2 className="text-lg font-semibold text-slate-900">Best Fit</h2>
                  <p className="text-sm leading-relaxed text-slate-600">{service.audience}</p>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={80}>
              <Card className="h-full">
                <CardContent className="space-y-2">
                  <h2 className="text-lg font-semibold text-slate-900">What You Get</h2>
                  <ul className="space-y-1.5 text-sm text-slate-600">
                    {service.outcomes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={160}>
              <Card className="h-full">
                <CardContent className="space-y-2">
                  <h2 className="text-lg font-semibold text-slate-900">Delivery Flow</h2>
                  <ul className="space-y-1.5 text-sm text-slate-600">
                    {service.process.map((step) => (
                      <li key={step} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                        <span>{step}</span>
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
        <Container className="py-12 md:py-14">
          <Reveal className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Scope</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Typical deliverables</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {service.deliverables.map((deliverable, idx) => (
              <Reveal key={deliverable} delay={idx * 70}>
                <Card>
                  <CardContent>
                    <p className="text-sm text-slate-600">{deliverable}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-12 md:py-14">
          <Reveal className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">FAQ</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Common questions</h2>
          </Reveal>
          <div className="mt-6 space-y-4">
            {service.faqs.map((faq, idx) => (
              <Reveal key={faq.question} delay={idx * 80}>
                <Card>
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
        <Container className="py-12 md:py-14">
          <Reveal className="glass-panel rounded-3xl p-7 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Next Step</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900 md:text-2xl">
                  Want this implemented for your business?
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={`/contact/?context=${encodeURIComponent(service.title)}`}>Get a Quote</ButtonLink>
                <ButtonLink href="/contact/#book-call" variant="secondary">
                  Book a Call
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          {related.length > 0 && (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {related.map((item, idx) => (
                <Reveal key={item.slug} delay={idx * 90}>
                  <Link href={`/services/${item.slug}/`} className="glass-panel block rounded-3xl p-5 transition hover:-translate-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Related Service</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.summary}</p>
                    <span className="mt-3 inline-flex text-sm font-semibold text-sky-700">View service →</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
