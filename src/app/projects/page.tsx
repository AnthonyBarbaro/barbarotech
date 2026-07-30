import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { ProjectMedia } from "@/components/project-media";
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

const leadProject = PROJECTS.find((project) => project.featured) ?? PROJECTS[0];
const archiveProjects = leadProject
  ? PROJECTS.filter((project) => project.slug !== leadProject.slug)
  : PROJECTS;

export default function ProjectsPage() {
  return (
    <main className="signal-page">
      <section className="signal-hero">
        <Container className="relative z-10 py-14 sm:py-20 lg:py-24">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="signal-kicker">Selected work</p>
              <h1 className="display-title mt-5 max-w-[12ch]">
                See the work.
                <span className="block text-cyan-300">Then read the build.</span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-1">
              <p className="signal-copy">
                Websites, storefronts, and custom systems designed and built directly by
                Anthony. Each project opens into the problem, decisions, and shipped result.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact/?intent=quote">Start a project</ButtonLink>
                <a
                  href="#project-library"
                  className="signal-link inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold"
                >
                  Browse projects <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </Reveal>

          {leadProject ? (
            <Reveal delay={120} className="mt-12 sm:mt-16">
              <div className="signal-panel-strong project-frame overflow-hidden p-2 sm:p-3">
                <ProjectMedia
                  project={leadProject}
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                />
              </div>
              <div className="grid gap-5 border-b border-cyan-200/15 py-6 sm:py-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="signal-chip">Featured build</span>
                    <span className="font-mono text-[10px] text-slate-500">
                      {String(PROJECTS.indexOf(leadProject) + 1).padStart(2, "0")} /{" "}
                      {String(PROJECTS.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.025em] text-white sm:text-4xl">
                    <Link
                      href={`/projects/${leadProject.slug}/`}
                      className="transition-colors hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      {leadProject.title}
                    </Link>
                  </h2>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-base leading-7 text-slate-300">{leadProject.summary}</p>
                  <Link
                    href={`/projects/${leadProject.slug}/`}
                    className="signal-link mt-4 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold"
                  >
                    Open case study <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      <section id="project-library" className="signal-section signal-section--quiet scroll-mt-24">
        <Container className="py-16 sm:py-20 lg:py-24">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="signal-kicker">Project library</p>
              <h2 className="section-title mt-5 max-w-[13ch]">
                Real surfaces. Clear build notes.
              </h2>
            </div>
            <p className="signal-copy max-w-xl lg:col-span-5">
              Each preview keeps the interface front and center, with the problem, build
              notes, and shipped result one click away.
            </p>
          </Reveal>

          {PROJECTS.length === 0 ? (
            <Reveal className="signal-panel mt-12 p-6">
              <p className="signal-copy">No projects have been added yet.</p>
            </Reveal>
          ) : (
            <div className="mt-12 grid gap-x-8 gap-y-14 lg:grid-cols-2 lg:gap-y-18">
              {archiveProjects.map((project, index) => {
                const projectNumber = PROJECTS.indexOf(project) + 1;

                return (
                  <Reveal key={project.slug} delay={(index % 2) * 80}>
                    <article className="border-t border-cyan-200/15 pt-5">
                      <ProjectMedia
                        project={project}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="project-frame"
                      />

                      <div className="mt-5 flex items-center justify-between gap-4">
                        <p className="font-mono text-[10px] tracking-[0.08em] text-cyan-300">
                          Project {String(projectNumber).padStart(2, "0")}
                        </p>
                        <p className="font-mono text-[10px] text-slate-500">
                          {project.video ? "Demo video" : "Case study"}
                        </p>
                      </div>

                      <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-[-0.025em] text-white sm:text-3xl">
                        <Link
                          href={`/projects/${project.slug}/`}
                          className="transition-colors hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                        >
                          {project.title}
                        </Link>
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                        {project.summary}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((tech) => (
                          <span key={tech} className="signal-chip">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/projects/${project.slug}/`}
                        className="signal-link mt-5 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold"
                      >
                        View project <span aria-hidden="true">→</span>
                      </Link>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      <section className="signal-section">
        <Container className="py-16 sm:py-20 lg:py-24">
          <Reveal className="grid gap-8 border-y border-cyan-200/15 py-10 sm:py-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="signal-kicker">Your project next</p>
              <h2 className="section-title mt-5 max-w-[13ch]">
                Bring the goal. I&apos;ll map the build.
              </h2>
              <p className="signal-copy mt-5 max-w-2xl">
                Tell me what needs to work, what already exists, and where the current
                experience falls short.
              </p>
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
