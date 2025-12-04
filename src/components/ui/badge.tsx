import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-black/10 bg-black/[0.04]",
        "px-3 py-1 text-xs text-black/80",
        className
      )}
      {...props}
    />
  );
}
