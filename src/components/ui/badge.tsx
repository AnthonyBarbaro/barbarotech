import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-sky-500/20 bg-white/90",
        "px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]",
        className
      )}
      {...props}
    />
  );
}
