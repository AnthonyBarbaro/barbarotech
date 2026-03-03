import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}/`;
  const metrics = project.metrics?.slice(0, 2) ?? [];
  const topHighlights = project.highlights?.slice(0, 2) ?? [];
  const topTech = project.tech.slice(0, 4);

  return (
    <Card className="group h-full overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-slate-900/10 bg-slate-100">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="rounded-full border border-slate-900/10 bg-white px-4 py-1.5 text-xs text-slate-600">
              Preview coming soon
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-900/15 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-90" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="shimmer-line inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
            Case Study
          </span>
          {project.featured && (
            <span className="inline-flex rounded-full bg-sky-400 px-2.5 py-1 text-[11px] font-semibold text-slate-900">
              Featured
            </span>
          )}
        </div>
      </div>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold leading-tight text-slate-900">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600">
            {project.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {topTech.map((tech) => (
            <Badge key={tech}>
              {tech}
            </Badge>
          ))}
          {project.tech.length > topTech.length && (
            <span className="self-center text-xs text-slate-500">
              +{project.tech.length - topTech.length} more
            </span>
          )}
        </div>

        {metrics.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5">
            {metrics.map((m) => (
              <div
                key={`${m.label}-${m.value}`}
                className="rounded-2xl border border-slate-900/10 bg-[rgba(255,255,255,0.92)] px-3 py-2"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">{m.label}</div>
                <div className="text-sm font-semibold text-slate-900">{m.value}</div>
              </div>
            ))}
          </div>
        ) : null}

        {topHighlights.length > 0 ? (
          <ul className="space-y-1.5 text-sm text-slate-600">
            {topHighlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="pt-1">
          <Link
            href={href}
            className="button-shine inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-sky-500/40 hover:text-sky-700"
          >
            View Project <span aria-hidden>→</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
