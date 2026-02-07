import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  // trailingSlash: true => always link with a trailing slash for best static hosting behavior
  const href = `/projects/${project.slug}/`;

  // Optional fields (won’t break if you haven’t added them yet)
  const metrics = project.metrics?.slice(0, 2) ?? [];
  const topHighlights = project.highlights?.slice(0, 2) ?? [];
  const topLinks = project.links?.slice(0, 2) ?? [];

  return (
    <Card className="group h-full overflow-hidden border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-sky-300/70">
      {/* Preview */}
      <div className="relative aspect-[16/9] bg-zinc-100">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="rounded-2xl border border-black/10 bg-white/80 px-4 py-2 text-xs text-black/60">
              Preview coming soon
            </div>
          </div>
        )}

        {/* Subtle overlay on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-tr from-black/0 via-black/0 to-black/20" />

        {/* Top-left tags */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {project.featured ? (
            <span className="inline-flex items-center rounded-full bg-black px-2.5 py-1 text-[11px] font-medium text-white shadow-sm">
              Featured
            </span>
          ) : null}

          <span className="inline-flex items-center rounded-full border border-black/10 bg-white/90 px-2.5 py-1 text-[11px] font-medium text-black/70 shadow-sm">
            Case study
          </span>
        </div>

        {/* Bottom-right “View” chip */}
        <div className="absolute bottom-3 right-3">
          <Link
            href={href}
            className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-[11px] font-medium text-black/70 shadow-sm transition hover:bg-white hover:border-sky-300/70 hover:text-black"
          >
            View <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title + summary */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-black leading-snug">
            {project.title}
          </h3>
          <p className="text-sm text-black/70 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 5).map((tech) => (
            <Badge
              key={tech}
              className="border-black/10 bg-black/[0.04] text-black/80"
            >
              {tech}
            </Badge>
          ))}
          {project.tech.length > 5 ? (
            <span className="text-xs text-black/50 self-center">
              +{project.tech.length - 5} more
            </span>
          ) : null}
        </div>

        {/* Metrics (optional) */}
        {metrics.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((m) => (
              <div
                key={`${m.label}-${m.value}`}
                className="rounded-xl border border-black/10 bg-zinc-50 px-3 py-2"
              >
                <div className="text-[11px] text-black/60">{m.label}</div>
                <div className="text-sm font-semibold text-black">{m.value}</div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Highlights (optional) */}
        {topHighlights.length > 0 ? (
          <ul className="space-y-1 text-sm text-black/70">
            {topHighlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Footer: external links + CTA */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap gap-4 text-sm">
            {topLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-black/70 hover:text-black transition underline underline-offset-4 decoration-black/20 hover:decoration-sky-400/60"
              >
                {link.label}
              </a>
            ))}
          </div>

          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-zinc-50 px-3 py-2 text-sm font-medium text-black hover:bg-white hover:border-sky-300/70 transition"
          >
            View case study →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
