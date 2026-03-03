"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/services/", label: "Services" },
  { href: "/projects/", label: "Projects" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  const isActive = (href: string) => {
    const trimmed = href.endsWith("/") ? href.slice(0, -1) : href;
    return pathname === href || pathname === trimmed || pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-white/72 backdrop-blur-2xl">
      <Container className="flex h-[74px] items-center justify-between gap-3">
        <Link href="/" className="group flex items-center gap-2.5 text-slate-900">
          <span className="pulse-ring relative inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />
          <span className="text-base font-semibold tracking-tight">{SITE.brand}</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center md:flex">
          <div className="glass-panel flex items-center gap-1 rounded-full border border-slate-900/10 px-2 py-2">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300",
                    active
                      ? "bg-slate-950 text-white shadow-[0_10px_24px_rgba(9,18,39,0.3)]"
                      : "text-slate-600 hover:bg-white hover:text-slate-900"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <span className="rounded-full border border-slate-900/10 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
            Open for New Builds
          </span>
          <ButtonLink href="/contact/" variant="primary">
            Start a Project
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white/90 p-2 text-slate-700 shadow-sm transition hover:text-slate-900 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span className="relative flex h-3 w-4 items-center justify-center">
            <span
              className={cn(
                "absolute h-0.5 w-4 rounded-full bg-slate-900 transition-transform duration-200",
                open ? "translate-y-0 rotate-45" : "-translate-y-1"
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-4 rounded-full bg-slate-900 transition-opacity duration-150",
                open ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-4 rounded-full bg-slate-900 transition-transform duration-200",
                open ? "translate-y-0 -rotate-45" : "translate-y-1"
              )}
            />
          </span>
        </button>
      </Container>

      <div
        className={cn(
          "overflow-hidden border-t border-slate-900/10 bg-white/90 backdrop-blur transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <Container className={cn("space-y-3", open && "py-4")}>
          <nav className="grid grid-cols-2 gap-2 text-sm">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-2xl border px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.08em] transition",
                    active
                      ? "border-slate-900/20 bg-slate-900 text-white"
                      : "border-slate-900/10 bg-white text-slate-600 hover:border-slate-900/20 hover:text-slate-900"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-slate-900/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
              Open for New Builds
            </span>
            <ButtonLink href="/contact/" onClick={() => setOpen(false)} className="flex-1">
              Start a Project
            </ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  );
}
