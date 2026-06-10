import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-5 py-8 text-center">
      <Icon className="mx-auto h-8 w-8 text-slate-400" />
      <h3 className="mt-3 text-base font-semibold text-slate-950">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-slate-600">{description}</p>
    </div>
  );
}
