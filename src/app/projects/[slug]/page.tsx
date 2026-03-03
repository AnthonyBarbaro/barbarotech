import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/lib/site";
import { canonicalUrl, estimateWordCount, withBaseKeywords } from "@/lib/seo";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) return {};

  const title = `${project.title} Case Study`;
  const description = project.summary || project.description.slice(0, 155);
  const url = canonicalUrl(`/projects/${project.slug}/`);
  const keywords = withBaseKeywords([
    project.title,
    "project case study",
    ...project.tech,
  ]);

  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
    },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.brand,
      type: "article",
      images: project.image ? [{ url: project.image }] : [{ url: "/og.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.image ? [project.image] : ["/og.png"],
    },
  };
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

function pickRelatedProjects(currentSlug: string) {
  return PROJECTS.filter((project) => project.slug !== currentSlug).slice(0, 3);
}

function getPrimaryLink(links: { label: string; href: string }[]) {
  const priority = ["Live", "Website", "Demo", "GitHub"];
  for (const key of priority) {
    const found = links.find((link) => link.label.toLowerCase().includes(key.toLowerCase()));
    if (found) return found;
  }
  return links[0];
}

export default async function ProjectSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) notFound();

  const related = pickRelatedProjects(project.slug);
  const canonical = canonicalUrl(`/projects/${project.slug}/`);
  const primaryLink = project.links.length ? getPrimaryLink(project.links) : null;
  const metrics = project.metrics?.slice(0, 3) ?? [];
  const resultItems = project.results?.slice(0, 4) ?? ["Fast loading", "Stronger UX", "Clearer conversion flow"];
  const wordCount = estimateWordCount([
    project.summary,
    project.description,
    ...(project.highlights || []),
    ...(project.results || []),
    ...(project.tech || []),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: canonical,
    inLanguage: "en",
    wordCount,
    author: {
      "@type": "Person",
      name: SITE.owner,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      url: SITE.url,
    },
  };

  return (
    <main className="text-slate-900">
      <Script
        id="project-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="section-shell border-b border-slate-900/10">
        <div className="ambient-orb left-[-5rem] top-12 h-56 w-56 bg-sky-300/70" />
        <Container className="relative z-10 py-12 md:py-16">
          <Reveal className="space-y-4">
            <Link href="/projects/" className="inline-flex text-sm font-semibold text-slate-600 transition hover:text-slate-900">
              ← Back to Projects
            </Link>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{project.title}</h1>
            <p className="max-w-3xl text-slate-600">{project.summary}</p>
          </Reveal>

          <Reveal delay={100} className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </Reveal>

          <Reveal delay={160} className="mt-6 flex flex-wrap gap-3">
            {primaryLink && (
              <a
                href={primaryLink.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(14,165,233,0.4)] transition hover:scale-[1.02]"
              >
                View {primaryLink.label} →
              </a>
            )}
            <ButtonLink href="/contact/" variant="secondary">
              Build Something Similar
            </ButtonLink>
            <ButtonLink href="/pricing/" variant="ghost">
              Pricing
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-12 md:py-14">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <Card>
                <CardContent className="space-y-6">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-900/10 bg-slate-100">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-sm text-slate-500">
                        Preview coming soon
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-slate-900">Overview</h2>
                    <p className="leading-relaxed text-slate-600">{project.description}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-900/10 bg-white px-4 py-3">
                      <div className="text-xs uppercase tracking-wide text-slate-500">Problem</div>
                      <p className="mt-2 text-sm text-slate-600">
                        {project.problem ?? "The business needed a faster, cleaner, and more effective digital experience."}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-900/10 bg-white px-4 py-3">
                      <div className="text-xs uppercase tracking-wide text-slate-500">Solution</div>
                      <p className="mt-2 text-sm text-slate-600">
                        {project.solution ?? "Designed and shipped a focused architecture with strong UI and clear business logic."}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-900/10 bg-white px-4 py-3">
                      <div className="text-xs uppercase tracking-wide text-slate-500">Results</div>
                      <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                        {resultItems.slice(0, 3).map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-slate-900">Highlights</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <div className="space-y-5">
              <Reveal delay={90}>
                <Card>
                  <CardContent className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-900">Project Metrics</h3>
                    {metrics.length > 0 ? (
                      <div className="space-y-2">
                        {metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="rounded-2xl border border-slate-900/10 bg-white px-4 py-3"
                          >
                            <div className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</div>
                            <div className="text-lg font-semibold text-slate-900">{metric.value}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600">Metrics will be added for this project soon.</p>
                    )}
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={140}>
                <Card>
                  <CardContent className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-900">Links</h3>
                    {project.links.length > 0 ? (
                      <div className="space-y-2">
                        {project.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="block rounded-2xl border border-slate-900/10 bg-white px-4 py-3 text-sm text-slate-600 transition hover:border-sky-500/40 hover:text-slate-900"
                          >
                            <span className="font-semibold text-slate-900">{link.label}</span>
                            <span className="ml-1">→</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600">No external links available.</p>
                    )}
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={180}>
                <Card>
                  <CardContent className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-900">Need this quality for your team?</h3>
                    <p className="text-sm text-slate-600">
                      Share your requirements and I will map out scope, timing, and launch strategy.
                    </p>
                    <ButtonLink href="/contact/" className="w-full">
                      Start a Project
                    </ButtonLink>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-b border-slate-900/10">
          <Container className="py-12 md:py-14">
            <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">More Work</p>
                <h2 className="text-2xl font-semibold md:text-3xl">Related projects</h2>
              </div>
              <Link href="/projects/" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                View all →
              </Link>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item, idx) => (
                <Reveal key={item.slug} delay={idx * 80}>
                  <Link
                    href={`/projects/${item.slug}/`}
                    className="glass-panel block rounded-3xl p-5 transition hover:-translate-y-1"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.summary}</p>
                    <span className="mt-3 inline-flex text-sm font-semibold text-sky-700">Open case study →</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
