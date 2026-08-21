import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { ProjectMedia } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
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
  const usableLinks = links.filter((link) => link.href && link.href !== "#");
  const priority = ["Live", "Website", "Demo"];

  for (const key of priority) {
    const found = usableLinks.find((link) =>
      link.label.toLowerCase().includes(key.toLowerCase())
    );
    if (found) return found;
  }

  return usableLinks[0];
}

export default async function ProjectSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) notFound();

  const related = pickRelatedProjects(project.slug);
  const canonical = canonicalUrl(`/projects/${project.slug}/`);
  const projectLinks = project.links.filter((link) => link.href && link.href !== "#");
  const primaryLink = getPrimaryLink(projectLinks);
  const metrics = project.metrics?.slice(0, 3) ?? [];
  const resultItems = project.results?.slice(0, 4) ?? [];
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
      "@id": `${SITE.url}/about/#person`,
      name: SITE.owner,
    },
    publisher: {
      "@type": "Person",
      "@id": `${SITE.url}/about/#person`,
      name: SITE.owner,
      alternateName: SITE.brand,
      url: canonicalUrl("/about/"),
    },
  };

  return (
    <main className="signal-page">
      <Script
        id="project-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="signal-hero">
        <Container className="relative z-10 py-10 sm:py-14 lg:py-20">
          <Reveal>
            <Link
              href="/projects/"
              className="signal-link inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold"
            >
              <span aria-hidden="true">←</span> Project library
            </Link>
          </Reveal>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <p className="signal-kicker">Case study</p>
              <h1 className="display-title mt-5 max-w-[13ch]">{project.title}</h1>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-4 lg:pb-1">
              <p className="signal-copy">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {primaryLink ? (
                  <ButtonLink href={primaryLink.href}>
                    View {primaryLink.label} <span aria-hidden="true">↗</span>
                  </ButtonLink>
                ) : null}
                <ButtonLink href="/contact/?intent=quote" variant="secondary">
                  Build something similar
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={130} className="mt-10 sm:mt-12">
            <div
              className={`signal-panel-strong project-frame overflow-hidden p-2 sm:p-3 ${
                project.video ? "project-frame--player" : ""
              }`}
            >
              <ProjectMedia
                project={project}
                mode="player"
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>
          </Reveal>

          <Reveal delay={170} className="mt-4 border-y border-cyan-200/15">
            <div className="grid gap-5 py-5 lg:grid-cols-12 lg:items-center">
              <div className="flex flex-wrap gap-2 lg:col-span-7">
                {project.tech.map((tech) => (
                  <span key={tech} className="signal-chip">
                    {tech}
                  </span>
                ))}
              </div>
              {metrics.length > 0 ? (
                <dl className="grid gap-4 sm:grid-cols-3 lg:col-span-5">
                  {metrics.map((metric) => (
                    <div key={`${metric.label}-${metric.value}`}>
                      <dt className="font-mono text-[9px] text-slate-500">
                        {metric.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-cyan-100">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="signal-section signal-section--quiet">
        <Container className="py-16 sm:py-20 lg:py-24">
          <Reveal className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="signal-kicker">Inside the build</p>
              <h2 className="section-title mt-5 max-w-[11ch]">
                Need, decision, shipped result.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="signal-copy text-lg">{project.description}</p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-10 border-t border-cyan-200/15 pt-10 sm:mt-16 sm:pt-14 lg:grid-cols-12">
            {project.problem ? (
              <Reveal className="lg:col-span-5">
                <p className="font-mono text-[10px] tracking-[0.08em] text-cyan-300">
                  The need
                </p>
                <h3 className="mt-4 text-2xl font-extrabold text-white">
                  What had to change
                </h3>
                <p className="signal-copy mt-4">{project.problem}</p>
              </Reveal>
            ) : null}

            {project.solution ? (
              <Reveal delay={90} className="lg:col-span-6 lg:col-start-7">
                <p className="font-mono text-[10px] tracking-[0.08em] text-cyan-300">
                  The build
                </p>
                <h3 className="mt-4 text-2xl font-extrabold text-white">
                  What I made
                </h3>
                <p className="signal-copy mt-4">{project.solution}</p>
              </Reveal>
            ) : null}
          </div>

          {resultItems.length > 0 ? (
            <Reveal className="mt-12 sm:mt-16">
              <div className="grid gap-6 border-y border-cyan-200/15 py-8 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-4">
                  <p className="signal-kicker">Shipped result</p>
                  <h3 className="mt-4 text-2xl font-extrabold text-white">
                    What came out of the work
                  </h3>
                </div>
                <ul className="grid gap-x-8 lg:col-span-7 lg:col-start-6 lg:grid-cols-2">
                  {resultItems.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border-b border-cyan-200/10 py-4 text-sm leading-6 text-slate-200"
                    >
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      <section className="signal-section">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="signal-kicker">Build ledger</p>
              <h2 className="section-title mt-5 max-w-[12ch]">
                The details behind the surface.
              </h2>
              <ul className="mt-8 divide-y divide-cyan-200/10 border-t border-cyan-200/10">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-4 py-5 text-base leading-7 text-slate-200"
                  >
                    <span
                      className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-cyan-300"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-4 lg:col-start-9 lg:pt-20">
              <div className="border-y border-cyan-200/15 py-6">
                <h3 className="text-xl font-extrabold text-white">Project access</h3>
                {projectLinks.length > 0 ? (
                  <div className="mt-4 divide-y divide-cyan-200/10">
                    {projectLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="signal-link flex min-h-12 w-full items-center justify-between gap-4 py-3"
                      >
                        <span>{link.label}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm leading-6 text-slate-400">
                    This build does not have a public external link.
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="signal-section signal-section--quiet">
          <Container className="py-16 sm:py-20 lg:py-24">
            <Reveal className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="signal-kicker">More work</p>
                <h2 className="section-title mt-5 max-w-[11ch]">
                  Keep browsing the builds.
                </h2>
              </div>
              <Link
                href="/projects/"
                className="signal-link inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold"
              >
                Full project library <span aria-hidden="true">→</span>
              </Link>
            </Reveal>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 70}>
                  <article>
                    <ProjectMedia
                      project={item}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="project-frame"
                    />
                    <h3 className="mt-4 text-lg font-extrabold leading-tight text-white">
                      <Link
                        href={`/projects/${item.slug}/`}
                        className="transition-colors hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <Link
                      href={`/projects/${item.slug}/`}
                      className="signal-link mt-2 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold"
                    >
                      Open case study <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="signal-section">
        <Container className="py-16 sm:py-20 lg:py-24">
          <Reveal className="grid gap-8 border-y border-cyan-200/15 py-10 sm:py-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="signal-kicker">A similar problem?</p>
              <h2 className="section-title mt-5 max-w-[14ch]">
                Bring the goal. I&apos;ll map the right build.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <ButtonLink href="/contact/?intent=quote">Request a quote</ButtonLink>
              <ButtonLink href="/pricing/" variant="secondary">
                View pricing
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
