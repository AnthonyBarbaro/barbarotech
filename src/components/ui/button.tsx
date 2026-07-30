import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "button-shine inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold tracking-[0.01em] " +
  "transition-[background-color,border-color,color,box-shadow] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02060b] " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "border-cyan-200 bg-cyan-300 text-[#02060b] shadow-[0_10px_30px_rgba(34,211,238,0.16)] hover:border-white hover:bg-white",
  secondary:
    "border-cyan-200/30 bg-[#07111d]/90 text-cyan-100 hover:border-cyan-200/70 hover:bg-[#0a1725]",
  ghost: "border-transparent bg-transparent text-slate-300 hover:border-cyan-200/20 hover:text-white",
};

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  className,
  variant = "primary",
  href,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: Variant }) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      className={cn(base, variants[variant], className)}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      {...props}
    />
  );
}
