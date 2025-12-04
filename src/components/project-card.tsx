import Link from "next/link";
import { Project } from "@/data/projects";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full bg-white border-black/10 shadow-sm transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-black leading-snug">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-black/70 leading-relaxed">
              {project.summary}
            </p>
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="shrink-0 text-sm font-medium text-black/70 hover:text-black transition"
          >
            View →
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        {/* Tech */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 6).map((tech: string) => (
            <Badge key={tech} className="border-black/10 bg-black/[0.04] text-black/80">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 text-sm">
          {project.links.map((link: { label: string; href: string }) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-black/70 hover:text-black transition underline underline-offset-4 decoration-black/20 hover:decoration-black/50"
            >
              {link.label}
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
