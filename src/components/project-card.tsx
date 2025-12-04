import Link from "next/link";
import { Project } from "@/data/projects";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm text-white/70">{project.summary}</p>
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm text-white/80 hover:text-white"
          >
            View →
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 6).map((tech: string) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          {project.links.map(
            (link: { label: string; href: string }) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white"
              >
                {link.label}
              </a>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
