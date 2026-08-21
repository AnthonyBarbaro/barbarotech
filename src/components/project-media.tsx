import Image from "next/image";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectMediaProps = {
  project: Project;
  mode?: "poster" | "player";
  priority?: boolean;
  sizes: string;
  className?: string;
  imageClassName?: string;
};

export function ProjectMedia({
  project,
  mode = "poster",
  priority = false,
  sizes,
  className,
  imageClassName,
}: ProjectMediaProps) {
  const video = project.video;
  const showVideo = mode === "player" && Boolean(video);
  const poster = video?.poster ?? project.image;
  const mediaLabel =
    video?.label ?? (video ? (showVideo ? "Project demo" : "Demo available") : "Project preview");

  return (
    <div
      className={cn(
        "group/media overflow-hidden rounded-xl border border-cyan-100/15 bg-[#050505]",
        className
      )}
    >
      <div className="flex h-10 items-center justify-between gap-4 border-b border-cyan-100/10 bg-[#0d0d0f] px-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200/65" />
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400/45" />
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500/40" />
        </div>
        <span className="truncate font-mono text-[9px] tracking-[0.08em] text-slate-400">
          {mediaLabel}
        </span>
      </div>

      <div className="relative aspect-video overflow-hidden bg-slate-950">
        {showVideo && video ? (
          <video
            controls
            playsInline
            preload="metadata"
            poster={poster}
            aria-label={`${project.title} demo video`}
            className="h-full w-full bg-slate-950 object-cover"
          >
            <source src={video.src} type={video.type ?? "video/mp4"} />
            {video.captions ? (
              <track
                kind="captions"
                src={video.captions}
                srcLang="en"
                label="English"
                default
              />
            ) : null}
            Your browser does not support embedded video.
          </video>
        ) : poster ? (
          <Image
            src={poster}
            alt={project.imageAlt ?? `${project.title} preview`}
            fill
            priority={priority}
            sizes={sizes}
            style={{ objectPosition: project.imagePosition }}
            className={cn(
              project.imageFit === "contain" ? "object-contain" : "object-cover",
              "transition-transform duration-700 group-hover/media:scale-[1.02]",
              imageClassName
            )}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-slate-400">
            Project preview coming soon
          </div>
        )}

        {!showVideo ? (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/25 via-transparent to-transparent"
            aria-hidden="true"
          />
        ) : null}
      </div>
    </div>
  );
}
