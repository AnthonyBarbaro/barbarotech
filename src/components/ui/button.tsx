import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium " +
  "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-black text-white hover:bg-black/90 shadow-sm hover:shadow",
  secondary:
    "bg-white text-black border border-black/10 hover:bg-zinc-50 shadow-sm hover:shadow",
  ghost: "bg-transparent text-black hover:bg-black/5",
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
  const isExternal = href.startsWith("http");

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
