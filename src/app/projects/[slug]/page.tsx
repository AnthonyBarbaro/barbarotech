import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { PROJECTS } from "@/data/projects";

/**
 * REQUIRED for `output: "export"`
 * This tells Next.js which /projects/[slug] pages to generate.
 */
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

/**
 * SEO per-project
 * Works with static export because it uses in-memory data.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  // ✅ Works whether params is an object OR a Promise
  const { slug } = await Promise.resolve(params);

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} | Projects`;
  const description = project.summary || project.description?.slice(0, 160);
  const url = `${SITE.url}/projects/${project.slug}/`;

  return {
    title,
    description,
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
  params: Promise<{ slug: string }>; // ✅ Next 16 expects params can be a Promise
};

function pickRelatedProjects(currentSlug: string) {
  return PROJECTS.filter((p) => p.slug !== currentSlug).slice(0, 3);
}

/** Small helper: identify "best" link type if you label them consistently */
function getPrimaryLink(links: { label: string; href: string }[]) {
  const priority = ["Live", "Website", "Demo", "GitHub"];
  for (const key of priority) {
    const found = links.find((l) => l.label.toLowerCase().includes(key.toLowerCase()));
    if (found) return found;
  }
  return links[0];
}

export default async function ProjectSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = pickRelatedProjects(project.slug);

  const canonical = `${SITE.url}/projects/${project.slug}/`;

  // Optional enhanced “project” fields (won’t break if missing)
  const metrics = project.metrics;
  const problem = project.problem;
  const solution = project.solution;
  const results = project.results;

  const primaryLink = project.links?.length ? getPrimaryLink(project.links) : null;

  // JSON-LD structured data (safe + SEO friendly)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: canonical,
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
    <main className="bg-white text-black">
      {/* JSON-LD */}
      <Script
        id="project-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="border-b border-black/10 bg-gradient-to-b from-white via-sky-50 to-white">
        <Container className="py-10 md:py-14 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/projects/"
              className="text-sm text-black/60 hover:text-black transition"
            >
              ← Back to Projects
            </Link>

            <div className="hidden md:flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-sky-400" />
              <span className="text-xs text-black/60">
                Built with modern tooling • shipped end-to-end
              </span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-[1.2fr_.8fr] items-start">
            {/* Left */}
            <div className="space-y-5">
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                  {project.title}
                </h1>
                <div className="h-px w-28 bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
                <p className="text-black/70 max-w-2xl leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 10).map((t) => (
                  <Badge
                    key={t}
                    className="border-black/10 bg-white/80 text-black/80 hover:bg-white transition"
                  >
                    {t}
                  </Badge>
                ))}
              </div>

              {/* Primary actions */}
              <div className="flex flex-wrap gap-3 pt-1">
                {primaryLink ? (
                  <a
                    href={primaryLink.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-black text-white hover:bg-black/90 text-sm font-medium shadow-sm transition"
                  >
                    View {primaryLink.label} →
                  </a>
                ) : null}

                <ButtonLink
                  href={`/contact/?ref=project&plan=${encodeURIComponent(project.title)}`}
                  variant="secondary"
                >
                  Get a quote →
                </ButtonLink>

                <ButtonLink href="/pricing/" variant="ghost">
                  Pricing
                </ButtonLink>
              </div>

              {/* Metrics */}
              {metrics?.length ? (
                <div className="grid gap-3 sm:grid-cols-3 pt-3">
                  {metrics.slice(0, 3).map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-black/10 bg-white/80 px-4 py-3"
                    >
                      <div className="text-xs text-black/60">{m.label}</div>
                      <div className="text-lg font-semibold text-black">{m.value}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-3 pt-3">
                  <div className="rounded-2xl border border-black/10 bg-white/80 px-4 py-3">
                    <div className="text-xs text-black/60">Focus</div>
                    <div className="text-lg font-semibold text-black">Performance</div>
                  </div>
                  <div className="rounded-2xl border border-black/10 bg-white/80 px-4 py-3">
                    <div className="text-xs text-black/60">Approach</div>
                    <div className="text-lg font-semibold text-black">Clean UI</div>
                  </div>
                  <div className="rounded-2xl border border-black/10 bg-white/80 px-4 py-3">
                    <div className="text-xs text-black/60">Delivery</div>
                    <div className="text-lg font-semibold text-black">End-to-end</div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Preview */}
            <Card className="border-black/10 bg-white overflow-hidden shadow-sm">
              <CardContent className="p-0">
                <div className="relative aspect-[16/10] bg-zinc-100">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-black/50">
                      No image yet
                    </div>
                  )}

                  {/* subtle overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/0 via-black/0 to-black/10" />
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* DETAILS */}
      <section className="bg-zinc-50 border-b border-black/10">
        <Container className="py-12 space-y-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Overview */}
            <Card className="border-black/10 bg-white shadow-sm lg:col-span-2">
              <CardContent className="p-6 md:p-7 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Overview</h2>
                  <p className="text-black/70 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Problem / Solution / Results */}
                <div className="grid gap-4 md:grid-cols-3 pt-2">
                  <div className="rounded-2xl border border-black/10 bg-zinc-50 p-4">
                    <div className="text-xs font-medium text-black/70">Problem</div>
                    <p className="mt-2 text-sm text-black/70 leading-relaxed">
                      {problem ?? "Needed a clean, fast site that converts and looks premium."}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-black/10 bg-zinc-50 p-4">
                    <div className="text-xs font-medium text-black/70">Solution</div>
                    <p className="mt-2 text-sm text-black/70 leading-relaxed">
                      {solution ?? "Built a modern Next.js site with structured SEO, clean UI, and clear CTAs."}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-black/10 bg-zinc-50 p-4">
                    <div className="text-xs font-medium text-black/70">Results</div>
                    <ul className="mt-2 space-y-2 text-sm text-black/70">
                      {(results ?? ["Fast load times", "Clear conversion paths", "Easy maintenance"]).slice(0, 3).map((r) => (
                        <li key={r} className="flex gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Highlights */}
                <div className="pt-2">
                  <h3 className="text-lg font-semibold">Highlights</h3>
                  <ul className="mt-3 space-y-2 text-sm text-black/70">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-black/40" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Links + Stack */}
            <div className="space-y-6">
              <Card className="border-black/10 bg-white shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-sm font-semibold">Links</h3>

                  {project.links?.length ? (
                    <div className="flex flex-col gap-2">
                      {project.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl border border-black/10 bg-zinc-50 px-3 py-2 text-sm text-black/70 hover:text-black hover:border-sky-300/70 transition"
                        >
                          <span className="font-medium text-black">{l.label}</span>
                          <span className="text-black/60"> — {l.href}</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-black/60">No links added yet.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-black/10 bg-white shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-sm font-semibold">Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <ButtonLink
                      href={`/contact/?ref=project&plan=${encodeURIComponent(project.title)}`}
                      variant="secondary"
                      className="w-full"
                    >
                      Request a quote →
                    </ButtonLink>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* MORE PROJECTS */}
      {related.length ? (
        <section className="bg-white border-b border-black/10">
          <Container className="py-12 space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold">More projects</h2>
                <p className="text-black/70 text-sm max-w-2xl">
                  A few more builds that show how I design, ship, and maintain production-ready work.
                </p>
              </div>
              <Link
                href="/projects/"
                className="text-sm text-black/70 hover:text-black transition"
              >
                View all →
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}/`}
                  className="group rounded-2xl border border-black/10 bg-zinc-50 p-5 hover:border-sky-300/70 hover:bg-white transition"
                >
                  <div className="text-sm font-semibold text-black group-hover:text-black">
                    {p.title}
                  </div>
                  <p className="mt-2 text-sm text-black/70 line-clamp-3">
                    {p.summary}
                  </p>
                  <div className="mt-3 text-xs text-black/60">
                    View project →
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* CTA */}
      <section className="bg-gradient-to-b from-white via-sky-50 to-white">
        <Container className="py-12">
          <div className="rounded-2xl border border-black/10 bg-white/85 backdrop-blur p-8 md:p-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between shadow-sm">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">Want something like this?</h3>
              <p className="text-black/70">
                Tell me what you’re building. I’ll reply with a clean plan, timeline, and quote.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <ButtonLink href="/pricing/">View pricing</ButtonLink>
              <ButtonLink
                href={`/contact/?ref=project&plan=${encodeURIComponent(project.title)}`}
                variant="secondary"
              >
                Get a quote →
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
