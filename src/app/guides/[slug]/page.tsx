/*
THESIS: Every guide resolves one business decision with an answer, a worksheet, and evidence-based next steps—not keyword repetition.
OWN-WORLD: Signal-black reading planes, cyan navigation rails, cool-white type, and restrained checklist controls.
STORY: Get the direct answer, use the checklist, understand the tradeoffs, follow related decisions, and contact Anthony only when useful.
FIRST VIEWPORT: The question and direct answer dominate; a compact contents panel makes the long-form page easy to scan.
FORM: Decision Desk, candidate three in the Read surface set; signal ff8b52a7. The worksheet is the article's central artifact.
*/
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { getGuideBySlug, GUIDES } from "@/data/guides";
import { getServiceBySlug } from "@/data/services";
import { SITE } from "@/lib/site";
import { canonicalUrl, estimateWordCount, withBaseKeywords } from "@/lib/seo";

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const url = canonicalUrl(`/guides/${guide.slug}/`);

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: url,
    },
    keywords: withBaseKeywords(guide.keywords),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${guide.title} | ${SITE.brand}`,
      description: guide.description,
      url,
      siteName: SITE.brand,
      images: [{ url: "/og.png" }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} | ${SITE.brand}`,
      description: guide.description,
      images: ["/og.png"],
    },
  };
}

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GuideSlugPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const canonical = canonicalUrl(`/guides/${guide.slug}/`);
  const relatedGuides = guide.relatedGuideSlugs.flatMap((relatedSlug) => {
    const relatedGuide = getGuideBySlug(relatedSlug);
    return relatedGuide ? [relatedGuide] : [];
  });
  const relatedServices = guide.relatedServiceSlugs.flatMap((serviceSlug) => {
    const service = getServiceBySlug(serviceSlug);
    return service ? [service] : [];
  });
  const wordCount = estimateWordCount([
    guide.summary,
    guide.directAnswer,
    ...guide.checklist,
    ...guide.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.points ?? []),
    ]),
    ...guide.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    url: canonical,
    mainEntityOfPage: canonical,
    inLanguage: "en-US",
    wordCount,
    author: {
      "@type": "Person",
      "@id": `${SITE.url}/about/#person`,
      name: SITE.owner,
      url: canonicalUrl("/about/"),
    },
    publisher: {
      "@type": "Person",
      "@id": `${SITE.url}/about/#person`,
      name: SITE.owner,
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE.brand,
      url: SITE.url,
    },
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
        name: "Guides",
        item: canonicalUrl("/guides/"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.shortTitle,
        item: canonical,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
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
        id="guide-article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id="guide-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="guide-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article>
        <header className="signal-hero border-b border-cyan-100/10">
          <Container className="relative z-10 grid gap-12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-24">
            <Reveal className="lg:col-span-8">
              <Link
                href="/guides/"
                className="signal-link inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold"
              >
                <span aria-hidden="true">←</span>
                All Guides
              </Link>

              <div className="mt-7 flex flex-wrap gap-2">
                <span className="signal-chip">{guide.category}</span>
                <span className="signal-chip">Practical checklist</span>
              </div>

              <h1 className="display-title mt-7 max-w-5xl text-balance">{guide.title}</h1>
              <p className="signal-copy mt-7 max-w-3xl text-base md:text-lg">{guide.summary}</p>

              <p className="mt-7 text-sm leading-6 text-slate-400">
                Written by{" "}
                <Link href="/about/" rel="author" className="signal-link font-semibold">
                  {SITE.owner}
                </Link>
                , independent designer and developer in San Diego.
              </p>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-4 lg:pt-12">
              <nav className="signal-panel-strong p-6 sm:p-7" aria-label="On this page">
                <p className="text-sm font-semibold text-cyan-50">On this page</p>
                <ul className="mt-5 divide-y divide-cyan-100/10 border-y border-cyan-100/10">
                  <li>
                    <Link href="#direct-answer" className="signal-link flex min-h-11 items-center py-2.5 text-sm">
                      Direct answer
                    </Link>
                  </li>
                  <li>
                    <Link href="#checklist" className="signal-link flex min-h-11 items-center py-2.5 text-sm">
                      {guide.checklistTitle}
                    </Link>
                  </li>
                  {guide.sections.map((section) => (
                    <li key={section.id}>
                      <Link
                        href={`#${section.id}`}
                        className="signal-link flex min-h-11 items-center py-2.5 text-sm"
                      >
                        {section.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          </Container>
        </header>

        <section id="direct-answer" className="signal-section scroll-mt-24 border-b border-cyan-100/10">
          <Container className="grid gap-10 py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
            <Reveal className="lg:col-span-4">
              <p className="signal-kicker">Direct answer</p>
              <h2 className="section-title mt-5 text-balance">Start here.</h2>
            </Reveal>
            <Reveal delay={90} className="lg:col-span-8">
              <p className="max-w-3xl text-xl font-semibold leading-relaxed text-cyan-50 md:text-2xl">
                {guide.directAnswer}
              </p>
            </Reveal>
          </Container>
        </section>

        <section id="checklist" className="signal-section scroll-mt-24 border-b border-cyan-100/10">
          <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:gap-14 lg:py-28">
            <Reveal className="lg:col-span-4">
              <p className="signal-kicker">Working document</p>
              <h2 className="section-title mt-5 text-balance">{guide.checklistTitle}</h2>
              <p className="signal-copy mt-6 max-w-sm text-sm md:text-base">
                Copy this list into your project notes and verify each item before committing money,
                access, or a launch date.
              </p>
            </Reveal>

            <Reveal delay={90} className="lg:col-span-8">
              <ul className="signal-rail border-y border-cyan-100/10">
                {guide.checklist.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[1.5rem_1fr] gap-4 border-b border-cyan-100/10 py-5 last:border-b-0"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-3.5 w-3.5 rounded-[4px] border border-cyan-200/50"
                    />
                    <span className="text-base font-semibold leading-relaxed text-cyan-50">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>

        {guide.sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="signal-section scroll-mt-24 border-b border-cyan-100/10"
          >
            <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:gap-14 lg:py-28">
              <Reveal className="lg:col-span-4">
                <p className="text-sm font-semibold text-cyan-200">Decision detail</p>
                <h2 className="section-title mt-5 text-balance">{section.title}</h2>
              </Reveal>

              <Reveal delay={90} className="lg:col-span-8">
                <div className="max-w-3xl space-y-6">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="signal-copy text-base md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.points && (
                  <ul className="signal-rail mt-9 max-w-3xl border-y border-cyan-100/10">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="grid grid-cols-[1rem_1fr] gap-4 border-b border-cyan-100/10 py-4 last:border-b-0"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-2 w-2 rounded-full bg-cyan-300"
                        />
                        <span className="text-base leading-relaxed text-cyan-50">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {index === 0 && relatedServices[0] && (
                  <p className="mt-10 border-t border-cyan-100/10 pt-6 text-sm leading-6 text-slate-400">
                    Related service:{" "}
                    <Link
                      href={`/services/${relatedServices[0].slug}/`}
                      className="signal-link font-semibold"
                    >
                      {relatedServices[0].shortTitle}
                    </Link>
                  </p>
                )}
              </Reveal>
            </Container>
          </section>
        ))}

        <section className="signal-section border-b border-cyan-100/10" aria-labelledby="guide-faq-title">
          <Container className="py-20 lg:py-28">
            <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="signal-kicker">FAQ</p>
                <h2 id="guide-faq-title" className="section-title mt-5">
                  Related questions
                </h2>
              </div>
              <p className="signal-copy lg:col-span-5">
                Short answers to the follow-up questions that often appear during this decision.
              </p>
            </Reveal>

            <div className="mt-10 space-y-3">
              {guide.faqs.map((faq, index) => (
                <Reveal key={faq.question} delay={index * 80}>
                  <details className="signal-panel group">
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-base font-bold text-cyan-50 marker:content-none focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300 sm:px-7 sm:text-lg">
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
                  <p className="text-sm font-semibold text-cyan-200">Apply this to your project</p>
                  <h2 className="section-title mt-4 max-w-3xl text-balance">
                    Need a scope built around the real decision?
                  </h2>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
                  <Link
                    href={`/contact/?context=${encodeURIComponent(guide.title)}`}
                    className="signal-cta min-h-11"
                  >
                    Ask Anthony
                    <span aria-hidden="true">↗</span>
                  </Link>
                  <Link
                    href="/pricing/"
                    className="signal-link inline-flex min-h-11 items-center justify-center rounded-full border border-cyan-100/20 px-5 py-2.5"
                  >
                    View pricing
                  </Link>
                </div>
              </div>
            </Reveal>

            <nav className="mt-16" aria-labelledby="related-guides-title">
              <Reveal>
                <p className="text-sm font-semibold text-cyan-200">Continue planning</p>
                <h2 id="related-guides-title" className="section-title mt-4 text-balance">
                  Related guides
                </h2>
              </Reveal>

              <div className="signal-rail mt-8 grid border-y border-cyan-100/10 md:grid-cols-2">
                {relatedGuides.map((relatedGuide, index) => (
                  <Reveal
                    key={relatedGuide.slug}
                    delay={index * 90}
                    className="border-b border-cyan-100/10 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                  >
                    <Link
                      href={`/guides/${relatedGuide.slug}/`}
                      className="group flex h-full min-h-44 flex-col justify-between gap-5 px-1 py-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 md:px-7"
                    >
                      <span>
                        <span className="block text-xl font-bold text-cyan-50">
                          {relatedGuide.title}
                        </span>
                        <span className="signal-copy mt-3 block text-sm">
                          {relatedGuide.description}
                        </span>
                      </span>
                      <span className="signal-link inline-flex min-h-11 items-center gap-2 py-2 font-semibold">
                        Read guide
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </nav>
          </Container>
        </section>
      </article>
    </main>
  );
}
