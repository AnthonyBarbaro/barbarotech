import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "button-shine inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] border px-5 py-2.5 text-sm font-extrabold tracking-[-0.01em] " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8edcff] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--future-black)] " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "border-[#8edcff] bg-[#8edcff] text-[#050505] shadow-[0_0_28px_rgba(142,220,255,0.24)] hover:-translate-y-px hover:border-[#c8efff] hover:bg-[#c8efff] hover:shadow-[0_0_38px_rgba(142,220,255,0.42)]",
  secondary:
    "border-[#176b9b]/25 bg-white/90 text-[#071a2d] hover:-translate-y-px hover:border-[#8edcff] hover:bg-[#f2faff]",
  ghost: "border-transparent bg-transparent text-current hover:border-current",
};

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button data-variant={variant} className={cn(base, variants[variant], className)} {...props} />;
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
      data-variant={variant}
      className={cn(base, variants[variant], className)}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      {...props}
    />
  );
}
