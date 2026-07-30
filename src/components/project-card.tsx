import Link from "next/link";
import { ProjectMedia } from "@/components/project-media";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const href = `/projects/${project.slug}/`;
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <article className="group grid gap-6 border-t border-cyan-200/15 py-8 md:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)] md:items-center md:gap-10 md:py-10 lg:gap-14">
      <Link
        href={href}
        className="project-frame relative block overflow-hidden rounded-2xl border border-cyan-100/15 bg-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300"
        aria-label={`View ${project.title} case study`}
      >
        <ProjectMedia
          project={project}
          sizes="(max-width: 767px) 100vw, 58vw"
          className="h-full rounded-none border-0"
        />
      </Link>

      <div className="min-w-0 md:pr-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-300">
          Project {projectNumber}
        </p>
        <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-[-0.025em] text-white sm:text-3xl">
          <Link
            href={href}
            className="transition-colors hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">{project.summary}</p>
        <Link
          href={href}
          className="signal-link mt-6 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold"
        >
          View case study <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
