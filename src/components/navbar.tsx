"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { SITE } from "@/lib/site";
import {
  PROMOTION_COLLAPSED_EVENT,
  PROMOTION_COLLAPSED_STORAGE_KEY,
  PROMOTION_EXPANDED_EVENT,
  PROMOTION_OPEN_EVENT,
  type PromotionCollapsedDetail,
} from "@/lib/promotion-events";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/services/", label: "Services" },
  { href: "/projects/", label: "Work" },
  { href: "/services/shopify-developer/", label: "Shopify" },
  { href: "/blog/", label: "Blog" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [promotionInNav, setPromotionInNav] = useState(false);
  const promotionTriggerRef = useRef<HTMLButtonElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const focusPromotionTriggerRef = useRef(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const showPromotionTrigger = (event: Event) => {
      const detail = (event as CustomEvent<PromotionCollapsedDetail>).detail;
      focusPromotionTriggerRef.current = Boolean(detail?.focusTrigger);
      setPromotionInNav(true);
    };
    const hidePromotionTrigger = () => setPromotionInNav(false);

    window.addEventListener(PROMOTION_COLLAPSED_EVENT, showPromotionTrigger);
    window.addEventListener(PROMOTION_EXPANDED_EVENT, hidePromotionTrigger);

    const syncFrame = window.requestAnimationFrame(() => {
      try {
        setPromotionInNav(
          window.sessionStorage.getItem(PROMOTION_COLLAPSED_STORAGE_KEY) === "true"
        );
      } catch {
        setPromotionInNav(false);
      }
    });

    return () => {
      window.cancelAnimationFrame(syncFrame);
      window.removeEventListener(PROMOTION_COLLAPSED_EVENT, showPromotionTrigger);
      window.removeEventListener(PROMOTION_EXPANDED_EVENT, hidePromotionTrigger);
    };
  }, []);

  useEffect(() => {
    if (!promotionInNav || !focusPromotionTriggerRef.current) return;
    focusPromotionTriggerRef.current = false;
    promotionTriggerRef.current?.focus();
  }, [promotionInNav]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const menuTrigger = menuTriggerRef.current;
    menuTrigger?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const controls = [menuTriggerRef.current, ...Array.from(mobileMenuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])].filter((element): element is HTMLElement => element !== null);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      menuTrigger?.focus();
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    const trimmed = href.endsWith("/") ? href.slice(0, -1) : href;
    if (href === "/services/" && pathname.startsWith("/services/shopify-developer")) return false;
    return pathname === href || pathname === trimmed || pathname.startsWith(href);
  };

  const openPromotion = () => {
    setPromotionInNav(false);
    setOpen(false);
    window.dispatchEvent(new Event(PROMOTION_OPEN_EVENT));
  };

  return (
    <>
      <header className="portfolio-nav">
        <Container className="portfolio-container flex h-[72px] items-center justify-between gap-5">
          <Link href="/" className="portfolio-wordmark" aria-label={`${SITE.brand} home`}>
            <strong>
              Barbaro<span>Tech</span>
            </strong>
          </Link>

          <nav className="portfolio-nav-links" aria-label="Primary navigation">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) && !item.href.includes("#") ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="portfolio-nav-actions">
            <ThemeToggle />
            {promotionInNav ? (
              <button
                ref={promotionTriggerRef}
                type="button"
                className="portfolio-nav-offer"
                onClick={openPromotion}
                aria-label="Open the current website offer"
                aria-controls="barbarotech-promotion"
              >
                <span className="portfolio-nav-offer-signal" aria-hidden="true" />
                <span>Offer</span>
              </button>
            ) : null}
            <Link className="portfolio-nav-cta" href="/contact/?context=Free%20custom%20website%20demo">
              Get a free demo <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <button
            ref={menuTriggerRef}
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="portfolio-menu-button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className="portfolio-menu-icon" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
        </Container>
      </header>

      <div
        className={cn("portfolio-mobile-shell", open && "portfolio-mobile-shell--open")}
        aria-hidden={!open}
        inert={!open}
      >
        <button
          type="button"
          className="portfolio-mobile-backdrop"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
          aria-label="Close navigation menu"
        />
        <aside ref={mobileMenuRef} id="mobile-navigation" className="portfolio-mobile-menu" aria-label="Navigation menu">
          <div>
            <p>Display</p>
            <span className="portfolio-mobile-menu-actions">
              <ThemeToggle />
            </span>
          </div>
          <nav aria-label="Mobile navigation">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                {item.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
          {promotionInNav ? (
            <button
              type="button"
              onClick={openPromotion}
              tabIndex={open ? 0 : -1}
              className="portfolio-mobile-offer"
              aria-controls="barbarotech-promotion"
            >
              <span>
                <strong>Current offer</strong>
                <small>Open website packages and the free demo offer</small>
              </span>
              <span aria-hidden="true">→</span>
            </button>
          ) : null}
          <Link
            href="/contact/?context=Free%20custom%20website%20demo"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="portfolio-mobile-cta"
          >
            Get a free demo <span aria-hidden="true">↗</span>
          </Link>
        </aside>
      </div>
    </>
  );
}
