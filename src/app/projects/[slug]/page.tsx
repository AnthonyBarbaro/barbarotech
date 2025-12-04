import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PROJECTS } from "@/data/projects";

export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 🔥 FIX: unwrap params
  const { slug } = await params;

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="bg-white text-black">
      {/* Header */}
      <section className="border-b border-black/10 bg-white">
        <Container className="py-10 space-y-4">
          <Link href="/projects" className="text-sm text-black/70 hover:text-black">
            ← Back to Projects
          </Link>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {project.title}
          </h1>

          <p className="text-black/70 max-w-2xl">{project.summary}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t} className="border-black/10 bg-black/[0.04] text-black/80">
                {t}
              </Badge>
            ))}
          </div>
        </Container>
      </section>

      {/* Image + Overview */}
      <section className="bg-zinc-50 border-b border-black/10">
        <Container className="py-12 grid gap-6 md:grid-cols-[1.2fr_.8fr]">
          {/* Text content */}
          <Card className="border-black/10 bg-white">
            <CardContent className="p-6 space-y-3">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="text-black/70 leading-relaxed">{project.description}</p>

              <h3 className="pt-4 text-lg font-semibold">Highlights</h3>
              <ul className="space-y-2 text-sm text-black/70">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-black/40" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Image */}
          <Card className="border-black/10 bg-white overflow-hidden">
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
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </main>
  );
}
