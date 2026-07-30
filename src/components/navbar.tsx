"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";
import {
  getDiscountedSetupPrice,
  pricingPackageGroups,
  setupFeePromotion,
} from "@/data/pricing";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/services/", label: "Services" },
  { href: "/projects/", label: "Projects" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

const NAV_BASE_PRICE = pricingPackageGroups[0]?.packages[0]?.setupPrice ?? "$1,250";
const NAV_STARTING_PRICE = getDiscountedSetupPrice(NAV_BASE_PRICE) ?? NAV_BASE_PRICE;
const NAV_PRICE_LABEL = setupFeePromotion.enabled
  ? `Sale from ${NAV_STARTING_PRICE}`
  : `Sites from ${NAV_STARTING_PRICE}`;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const isActive = (href: string) => {
    const trimmed = href.endsWith("/") ? href.slice(0, -1) : href;
    return pathname === href || pathname === trimmed || pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-cyan-200/15 bg-[#02060b]/88 backdrop-blur-xl">
        <Container className="flex h-[72px] items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex min-h-11 items-center gap-3"
            aria-label={`${SITE.brand} home`}
          >
            <span className="relative grid h-8 w-8 place-items-center" aria-hidden="true">
              <span className="absolute inset-0 rounded-full border border-cyan-200/25 transition-transform duration-300 group-hover:scale-110" />
              <span className="signal-node" />
            </span>
            <span className="text-base font-extrabold tracking-[-0.025em] text-white">
              Barbaro<span className="text-cyan-300">Tech</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex min-h-11 items-center px-3 text-sm font-semibold transition-colors",
                    active ? "text-white" : "text-slate-400 hover:text-cyan-100"
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 bottom-1 h-px origin-left bg-cyan-300 transition-transform duration-200",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="font-mono text-[10px] tracking-[0.06em] text-slate-400">
              {NAV_PRICE_LABEL}
            </span>
            <ButtonLink href="/contact/?intent=quote">Request a quote</ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="flex min-h-11 items-center gap-2.5 rounded-xl border border-cyan-200/25 bg-[#07111d] px-3.5 text-xs font-bold text-cyan-100 transition-colors hover:border-cyan-200/55 hover:bg-[#0a1725] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 lg:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className="relative block h-4 w-4" aria-hidden="true">
              <span
                className={cn(
                  "absolute left-0 top-[5px] h-px w-4 bg-current transition-transform duration-200",
                  open && "translate-y-[3px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-[5px] left-0 h-px w-4 bg-current transition-transform duration-200",
                  open && "-translate-y-[3px] -rotate-45"
                )}
              />
            </span>
          </button>
        </Container>
      </header>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-[72px] z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Dismiss navigation backdrop"
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-[#02060b]/58 backdrop-blur-md transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
        />

        <aside
          id="mobile-navigation"
          aria-label="Mobile navigation panel"
          aria-hidden={!open}
          className={cn(
            "absolute inset-y-0 right-0 flex w-[min(82vw,22rem)] flex-col border-l border-cyan-200/20 bg-[#040a12] shadow-[-24px_0_64px_rgba(0,0,0,0.42)] transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="border-b border-cyan-200/12 px-5 py-5">
            <p className="font-mono text-[10px] tracking-[0.08em] text-cyan-300">
              Direct navigation
            </p>
            <p className="mt-2 text-sm text-slate-400">Anthony Barbaro / solo web studio</p>
          </div>

          <nav className="grid px-5" aria-label="Mobile navigation">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 items-center justify-between border-b border-cyan-200/10 text-xl font-bold transition-colors",
                    active ? "text-cyan-200" : "text-slate-200 hover:text-white"
                  )}
                >
                  {item.label}
                  <span className="text-sm text-cyan-300" aria-hidden="true">
                    →
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-cyan-200/12 p-5">
            <span className="font-mono text-xs text-slate-400">{NAV_PRICE_LABEL}</span>
            <ButtonLink
              href="/contact/?intent=quote"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="mt-4 w-full"
            >
              Request a quote
            </ButtonLink>
          </div>
        </aside>
      </div>
    </>
  );
}
