"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const contactHref = "/contact?ref=nav";

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-black"
        >
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-sky-300" />
          <span>{SITE.brand}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative transition-colors",
                  active ? "text-black" : "text-black/70 hover:text-black"
                )}
              >
                <span>{item.label}</span>
                {/* blue underline on hover / active */}
                <span
                  className={cn(
                    "pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-sky-500 via-sky-400 to-transparent transition-transform duration-200 origin-left",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <ButtonLink href={contactHref} variant="primary">
            Get a quote
          </ButtonLink>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center rounded-full border border-black/10 bg-white/90 p-2 text-black/70 shadow-sm hover:text-black hover:border-black/20 transition"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span className="relative flex h-3 w-4 items-center justify-center">
            <span
              className={cn(
                "absolute h-0.5 w-4 rounded-full bg-black transition-transform duration-200",
                open ? "translate-y-0 rotate-45" : "-translate-y-1"
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-4 rounded-full bg-black transition-opacity duration-150",
                open ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-4 rounded-full bg-black transition-transform duration-200",
                open ? "translate-y-0 -rotate-45" : "translate-y-1"
              )}
            />
          </span>
        </button>
      </Container>

      {/* Mobile menu panel */}
      <div
        className={cn(
          "md:hidden border-t border-black/10 bg-white/95 backdrop-blur-sm shadow-sm overflow-hidden transition-[max-height,opacity] duration-200",
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <Container className={cn("flex flex-col gap-3", open && "py-3")}>
          <nav className="flex flex-col gap-1 text-sm">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-2 py-1.5 transition-colors",
                    active
                      ? "bg-sky-50 text-black font-medium"
                      : "text-black/70 hover:text-black hover:bg-zinc-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <ButtonLink href={contactHref} className="w-full">
            Get a quote
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
