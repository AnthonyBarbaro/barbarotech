/*
THESIS: A service page is a routed decision path from fit to scope to direct contact, not a brochure assembled from equal cards.
OWN-WORLD: Signal-black fields, cyan wayfinding nodes, cobalt depth, large cool-white type, and stable dark reading planes.
STORY: Confirm the service fits, understand its outcomes and delivery flow, inspect the likely scope, resolve objections, then contact Anthony.
FIRST VIEWPORT: The service promise fills the left field while a stable fit panel sits on the right; quote and call actions remain visible early on mobile.
FORM: User-approved Conversion Current with Proof Orbit’s one-builder model; user-pinned direction, no seed roll. A vertical current carries the visitor through the detail.
*/
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { PROJECTS } from "@/data/projects";
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
  const related = service.relatedSlugs
    .flatMap((relatedSlug) => {
      const relatedService = getServiceBySlug(relatedSlug);
      return relatedService ? [relatedService] : [];
    })
    .slice(0, 2);
  const proofProjects = service.proof.flatMap((proof) => {
    const project = PROJECTS.find((candidate) => candidate.slug === proof.projectSlug);
    return project ? [{ ...proof, project }] : [];
  });
  const wordCount = estimateWordCount([
    service.summary,
    service.audience,
    ...service.outcomes,
    ...service.considerations.flatMap((item) => [item.title, item.detail]),
    ...service.deliverables,
    ...service.process,
    ...service.proof.map((item) => item.relevance),
    ...service.faqs.flatMap((item) => [item.question, item.answer]),
  ]);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: canonical,
    provider: {
      "@type": "Person",
      "@id": `${SITE.url}/about/#person`,
      name: SITE.owner,
      alternateName: SITE.brand,
      url: canonicalUrl("/about/"),
    },
    areaServed:
      service.category === "San Diego web design"
        ? {
            "@type": "City",
            name: "San Diego",
            containedInPlace: {
              "@type": "State",
              name: "California",
            },
          }
        : "United States",
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

  const quoteHref = `/contact/?context=${encodeURIComponent(service.title)}`;

  return (
    <main className="signal-page">
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

      <section className="signal-hero border-b border-cyan-100/10">
        <Container className="relative z-10 grid min-h-[calc(100svh-9rem)] items-center gap-12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <Reveal className="lg:col-span-8">
            <Link
              href="/services/"
              className="signal-link inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold"
            >
              <span aria-hidden="true">←</span>
              Back to Services
            </Link>

            <div className="mt-7 flex flex-wrap gap-2">
              <span className="signal-chip">{service.shortTitle}</span>
              <span className="signal-chip">Freelance</span>
              <span className="signal-chip">Professional Delivery</span>
            </div>

            <h1 className="display-title mt-7 max-w-5xl text-balance">{service.title}</h1>
            <p className="signal-copy mt-7 max-w-3xl text-base md:text-lg">{service.summary}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={quoteHref} className="signal-cta min-h-11">
                Request a Quote
                <span aria-hidden="true">↗</span>
              </Link>
              <Link
                href="/contact/#book-call"
                className="signal-link inline-flex min-h-11 items-center justify-center rounded-full border border-cyan-100/20 px-5 py-2.5"
              >
                Book a Call
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4">
            <aside className="signal-panel-strong p-6 sm:p-7" aria-labelledby="best-fit-title">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.8)]"
                />
                <p className="text-xs font-semibold text-cyan-200/70">Direct fit check</p>
              </div>
              <h2 id="best-fit-title" className="mt-6 text-2xl font-bold text-[#effbff]">
                Best Fit
              </h2>
              <p className="signal-copy mt-4 text-sm md:text-base">{service.audience}</p>
              <div className="signal-rule mt-7" />
              <p className="mt-5 text-sm font-semibold text-cyan-100">You work directly with Anthony.</p>
            </aside>
          </Reveal>
        </Container>
      </section>

      <section className="signal-section border-b border-cyan-100/10" aria-labelledby="outcomes-title">
        <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <Reveal className="lg:col-span-7">
            <p className="signal-kicker">What You Get</p>
            <h2 id="outcomes-title" className="section-title mt-5 text-balance">
              A build shaped around outcomes, not busywork.
            </h2>

            <ul className="signal-rail mt-10 border-y border-cyan-100/10">
              {service.outcomes.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[1.25rem_1fr] gap-4 border-b border-cyan-100/10 py-5 last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.6)]"
                  />
                  <span className="signal-copy text-base text-cyan-50">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5 lg:pt-16">
            <div className="signal-panel-strong p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-[#effbff]">Delivery Flow</h2>
              <ol className="relative mt-8 space-y-8 before:absolute before:bottom-3 before:left-[0.88rem] before:top-3 before:w-px before:bg-cyan-200/15">
                {service.process.map((step) => (
                  <li key={step} className="relative grid grid-cols-[2rem_1fr] gap-4">
                    <span className="relative z-10 mt-2 block h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.6)]" aria-hidden="true" />
                    <p className="signal-copy pt-0.5 text-sm text-cyan-50">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Container>
      </section>

      <section
        className="signal-section border-b border-cyan-100/10"
        aria-labelledby="considerations-title"
      >
        <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <Reveal className="lg:col-span-5">
            <p className="signal-kicker">How I Approach It</p>
            <h2 id="considerations-title" className="section-title mt-5 text-balance">
              Decisions that shape the right build.
            </h2>
            <p className="signal-copy mt-6 max-w-md">
              These are the practical tradeoffs I would resolve before adding pages, software, or
              complexity to the scope.
            </p>
          </Reveal>

          <div className="signal-rail lg:col-span-7">
            {service.considerations.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 70}
                className="border-b border-cyan-100/10 last:border-b-0"
              >
                <article className="py-6 sm:px-2 sm:py-7">
                  <h3 className="text-lg font-bold text-cyan-50">{item.title}</h3>
                  <p className="signal-copy mt-3 text-sm md:text-base">{item.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="signal-section border-b border-cyan-100/10" aria-labelledby="deliverables-title">
        <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <Reveal className="lg:col-span-5">
            <p className="text-sm font-semibold text-cyan-200">Scope</p>
            <h2 id="deliverables-title" className="section-title mt-5">
              Typical deliverables
            </h2>
            <p className="signal-copy mt-6 max-w-md">
              The exact scope is confirmed before implementation so the work, handoff, and next step stay
              clear.
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-7">
            <ul className="signal-rail border-y border-cyan-100/10">
              {service.deliverables.map((deliverable) => (
                <li
                  key={deliverable}
                  className="group grid min-h-20 grid-cols-1 items-center border-b border-cyan-100/10 py-4 last:border-b-0"
                >
                  <p className="text-base font-semibold leading-relaxed text-cyan-50">{deliverable}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {proofProjects.length > 0 && (
        <section
          className="signal-section border-b border-cyan-100/10"
          aria-labelledby="relevant-work-title"
        >
          <Container className="py-20 lg:py-28">
            <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="signal-kicker">Relevant Work</p>
                <h2 id="relevant-work-title" className="section-title mt-5 text-balance">
                  Proof connected to this service.
                </h2>
              </div>
              <p className="signal-copy lg:col-span-5">
                These are shipped projects from the portfolio—not stock examples or invented client
                results.
              </p>
            </Reveal>

            <div className="signal-rail mt-10 border-y border-cyan-100/10">
              {proofProjects.map(({ project, relevance }, index) => (
                <Reveal
                  key={project.slug}
                  delay={index * 80}
                  className="border-b border-cyan-100/10 last:border-b-0"
                >
                  <article className="grid gap-5 py-7 lg:grid-cols-12 lg:items-center lg:gap-8">
                    <div className="lg:col-span-4">
                      <h3 className="text-xl font-bold text-cyan-50">{project.title}</h3>
                      <p className="mt-2 text-xs font-semibold text-cyan-200">
                        {project.tech.slice(0, 3).join(" · ")}
                      </p>
                    </div>
                    <div className="lg:col-span-6">
                      <p className="signal-copy text-sm md:text-base">{relevance}</p>
                    </div>
                    <div className="lg:col-span-2 lg:justify-self-end">
                      <Link
                        href={`/projects/${project.slug}/`}
                        className="signal-link inline-flex min-h-11 items-center gap-2 py-2 font-semibold"
                      >
                        View project
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="signal-section border-b border-cyan-100/10" aria-labelledby="faq-title">
        <Container className="py-20 lg:py-28">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="signal-kicker">FAQ</p>
              <h2 id="faq-title" className="section-title mt-5">
                Common questions
              </h2>
            </div>
            <p className="signal-copy lg:col-span-5">
              A few practical answers before you decide whether this is the right service path.
            </p>
          </Reveal>

          <div className="mt-10 space-y-3">
            {service.faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 80}>
                <details className="signal-panel group">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-base font-bold text-[#effbff] marker:content-none focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300 sm:px-7 sm:text-lg">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-xl font-normal text-cyan-300 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="border-t border-cyan-100/10 px-5 py-5 sm:px-7">
                    <p className="signal-copy max-w-3xl text-sm md:text-base">{faq.answer}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="signal-section">
        <Container className="py-16 md:py-24">
          <Reveal>
            <div className="signal-panel-strong grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:p-10">
              <div className="lg:col-span-8">
                <p className="text-sm font-semibold text-cyan-200">Next Step</p>
                <h2 className="section-title mt-4 max-w-3xl text-balance">
                  Want this implemented for your business?
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
                <Link href={quoteHref} className="signal-cta min-h-11">
                  Get a Quote
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  href="/contact/#book-call"
                  className="signal-link inline-flex min-h-11 items-center justify-center rounded-full border border-cyan-100/20 px-5 py-2.5"
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </Reveal>

          {related.length > 0 && (
            <nav className="mt-16" aria-labelledby="related-services-title">
              <Reveal>
                <p className="text-sm font-semibold text-cyan-200">Related Service</p>
                <h2 id="related-services-title" className="section-title mt-4 text-balance">
                  Explore another service
                </h2>
              </Reveal>

              <div className="signal-rail mt-8 grid border-y border-cyan-100/10 md:grid-cols-2">
                {related.map((item, index) => (
                  <Reveal
                    key={item.slug}
                    delay={index * 90}
                    className="border-b border-cyan-100/10 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                  >
                    <Link
                      href={`/services/${item.slug}/`}
                      className="group flex h-full min-h-44 flex-col justify-between gap-5 px-1 py-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 md:px-7"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-[#effbff]">{item.title}</h3>
                        <p className="signal-copy mt-3 text-sm">{item.summary}</p>
                      </div>
                      <span className="signal-link inline-flex min-h-11 items-center gap-2 py-2 font-semibold">
                        View service
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </nav>
          )}
        </Container>
      </section>
    </main>
  );
}
