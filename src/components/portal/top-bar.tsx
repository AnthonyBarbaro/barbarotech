import { ButtonLink } from "@/components/ui/button";

export function TopBar({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="border-b border-slate-200 bg-white px-5 py-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{eyebrow}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">{title}</h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {actionHref && actionLabel ? (
            <ButtonLink href={actionHref} variant="primary">
              {actionLabel}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </div>
  );
}
