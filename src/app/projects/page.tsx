import { PROJECTS } from "@/data/projects";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";

export const metadata = {
  title: "Projects | BarbaroTech",
  description: "A showcase of software, websites, automations, and full-stack apps built by BarbaroTech.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-white text-black">
      {/* HEADER */}
      <section className="border-b border-black/10 bg-white">
        <Container className="py-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Projects
          </h1>
          <p className="text-black/70 max-w-2xl text-sm md:text-base">
            A collection of professional websites, automations, dashboards, and full-stack
            applications I’ve built for businesses — including smoke shops, liquor stores,
            gas stations, and internal tooling.
          </p>
        </Container>
      </section>

      {/* PROJECT GRID */}
      <section className="bg-zinc-50 border-b border-black/10">
        <Container className="py-14">
          {PROJECTS.length === 0 ? (
            <p className="text-black/50">No projects added yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <Container className="py-14">
          <div className="rounded-2xl border border-black/10 bg-zinc-50 p-8 md:p-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-black">
                Want something like this?
              </h3>
              <p className="text-black/70 text-sm">
                Text me what you need built — website or full-stack app — and I’ll get back
                with a clean quote.
              </p>
            </div>

            <a
              href={`mailto:${process.env.NEXT_PUBLIC_TEXT_EMAIL}`}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 
              bg-black text-white hover:bg-black/90 text-sm font-medium shadow-sm transition"
            >
              Text for a Quote →
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
