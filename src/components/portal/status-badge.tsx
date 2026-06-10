import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const toneByStatus: Record<string, string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-800",
  invited: "border-sky-200 bg-sky-50 text-sky-800",
  disabled: "border-slate-200 bg-slate-100 text-slate-700",
  pending_payment: "border-amber-200 bg-amber-50 text-amber-800",
  past_due: "border-red-200 bg-red-50 text-red-800",
  unpaid: "border-red-200 bg-red-50 text-red-800",
  canceled: "border-slate-200 bg-slate-100 text-slate-700",
  New: "border-sky-200 bg-sky-50 text-sky-800",
  Reviewing: "border-amber-200 bg-amber-50 text-amber-800",
  Approved: "border-indigo-200 bg-indigo-50 text-indigo-800",
  "In Progress": "border-cyan-200 bg-cyan-50 text-cyan-800",
  Waiting: "border-orange-200 bg-orange-50 text-orange-800",
  Done: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

function labelFor(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace("Id", "ID");
}

export function StatusBadge({
  value,
  children,
  className,
}: {
  value: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        toneByStatus[value] || "border-slate-200 bg-white text-slate-700",
        className
      )}
    >
      {children || labelFor(value)}
    </span>
  );
}
