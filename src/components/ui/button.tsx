import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "button-shine inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-5 py-2.5 text-sm font-semibold " +
  "transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-sky-300/35 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-[0_12px_30px_rgba(8,145,178,0.35)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(8,145,178,0.4)]",
  secondary:
    "border-slate-900/10 bg-white/90 text-slate-900 shadow-[0_8px_22px_rgba(8,17,40,0.08)] hover:-translate-y-0.5 hover:border-slate-900/20 hover:bg-white",
  ghost: "border-slate-900/5 bg-white/40 text-slate-700 hover:bg-white/80 hover:text-slate-900",
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
