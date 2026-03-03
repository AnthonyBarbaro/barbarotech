import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected websites, automations, and full-stack builds by BarbaroTech.",
  alternates: {
    canonical: canonicalUrl("/projects/"),
  },
  keywords: withBaseKeywords([
    "software development portfolio",
    "website case studies",
    "AI automation projects",
    "full-stack project examples",
  ]),
  openGraph: {
    title: `Projects | ${SITE.brand}`,
    description: "Selected websites, AI automations, and full-stack builds by BarbaroTech.",
    url: canonicalUrl("/projects/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${SITE.brand}`,
    description: "Selected websites, AI automations, and full-stack builds by BarbaroTech.",
    images: ["/og.png"],
  },
};

const featuredCount = PROJECTS.filter((project) => project.featured).length;

export default function ProjectsPage() {
  return (
    <main className="text-slate-900">
      <section className="section-shell border-b border-slate-900/10">
        <div className="ambient-orb left-[-4rem] top-12 h-44 w-44 bg-sky-300/70" />
        <Container className="relative z-10 py-16 md:py-20">
          <Reveal className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Projects
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Real builds.
              <br />
              <span className="text-gradient">Production outcomes.</span>
            </h1>
            <p className="max-w-2xl text-slate-600">
              A focused set of projects across web platforms, ecommerce, automation, and backend systems.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="glass-panel rounded-2xl px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">Projects</div>
              <div className="text-2xl font-semibold text-slate-900">{PROJECTS.length}</div>
            </div>
            <div className="glass-panel rounded-2xl px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">Featured</div>
              <div className="text-2xl font-semibold text-slate-900">{featuredCount}</div>
            </div>
            <div className="glass-panel rounded-2xl px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">Focus</div>
              <div className="text-2xl font-semibold text-slate-900">Speed + UX</div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-14 md:py-16">
          {PROJECTS.length === 0 ? (
            <Reveal>
              <p className="text-slate-600">No projects have been added yet.</p>
            </Reveal>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project, idx) => (
                <Reveal key={project.slug} delay={(idx % 6) * 80}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="section-shell">
        <Container className="py-14 md:py-16">
          <Reveal>
            <div className="glass-panel rounded-3xl p-8 md:p-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Build Something New
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                    Want this level of polish for your business?
                  </h2>
                  <p className="max-w-2xl text-slate-600">
                    Share what you need and get a clear scope, timeline, and quote.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/contact/">Start Here</ButtonLink>
                  <ButtonLink href="/pricing/" variant="secondary">
                    View Pricing
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
