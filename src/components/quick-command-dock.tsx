"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getDiscountedSetupPrice,
  getSetupFeePromotionBadgeText,
  getSetupFeePromotionText,
  pricingPackageGroups,
  setupFeePromotion,
} from "@/data/pricing";
import {
  PROMOTION_COLLAPSED_EVENT,
  PROMOTION_COLLAPSED_STORAGE_KEY,
  PROMOTION_EXPANDED_EVENT,
  PROMOTION_OPEN_EVENT,
  type PromotionCollapsedDetail,
} from "@/lib/promotion-events";
import { cn } from "@/lib/utils";

type Promo = {
  badge: string;
  title: string;
  description: string;
  quoteContext: string;
  salePricing?: {
    originalSetup: string;
    saleSetup: string;
    monthlyCare: string;
    savings: string | null;
  };
};

const STARTER_PACKAGE = pricingPackageGroups[0]?.packages[0];
const STARTER_ORIGINAL_SETUP = STARTER_PACKAGE?.setupPrice ?? "$1,250";
const STARTER_SALE_SETUP = getDiscountedSetupPrice(STARTER_ORIGINAL_SETUP) ?? STARTER_ORIGINAL_SETUP;
const STARTER_MONTHLY_CARE = STARTER_PACKAGE?.monthlyPrice ?? "$99/mo";
const STARTER_SAVINGS = `$${(
  Number(STARTER_ORIGINAL_SETUP.replace(/[^0-9]/g, "")) -
  Number(STARTER_SALE_SETUP.replace(/[^0-9]/g, ""))
).toLocaleString("en-US")}`;

const PROMOS: Promo[] = [
  {
    badge: "Free Custom Demo",
    title: "See a custom direction for your website before you commit.",
    description:
      "Tell me about the business and I will build something you can react to. If you do not move forward, it costs nothing.",
    quoteContext: "Free custom website demo",
  },
  {
    badge: setupFeePromotion.enabled ? setupFeePromotion.label : "Website Packages",
    title: setupFeePromotion.enabled
      ? "Website package flash sale."
      : `Website projects from ${STARTER_ORIGINAL_SETUP}.`,
    description:
      setupFeePromotion.enabled
        ? `${getSetupFeePromotionText()}. Monthly care is unchanged.`
        : `Start with 40%. Monthly care begins the month after launch from ${STARTER_MONTHLY_CARE}.`,
    quoteContext: "Website package consultation",
    salePricing: setupFeePromotion.enabled
      ? {
          originalSetup: STARTER_ORIGINAL_SETUP,
          saleSetup: STARTER_SALE_SETUP,
          monthlyCare: STARTER_MONTHLY_CARE,
          savings: STARTER_SAVINGS,
        }
      : undefined,
  },
  {
    badge: "Website Sprint",
    title: "Need a faster, cleaner website without agency overhead?",
    description:
      "Book a quick review and get a focused plan to improve UX, speed, and conversion flow in priority order.",
    quoteContext: "Website optimization sprint",
  },
  {
    badge: "AI Automation",
    title: "Turn repetitive operations into a practical AI workflow.",
    description:
      "I can map one high-impact process and show exactly where automation saves time and improves execution.",
    quoteContext: "AI workflow automation consult",
  },
  {
    badge: "Ecommerce Upgrade",
    title: "Shopify store underperforming on mobile?",
    description:
      "Get a conversion-focused storefront audit and a clear implementation plan for higher quality user flow.",
    quoteContext: "Shopify UX and conversion audit",
  },
  {
    badge: "Build Partner",
    title: "Have a product idea that needs full-stack execution?",
    description:
      "Use a short call to validate scope, stack direction, and timeline before spending money in the wrong place.",
    quoteContext: "Full-stack product planning",
  },
];

export function QuickCommandDock() {
  const [collapsed, setCollapsed] = useState(false);
  const [isRetiring, setIsRetiring] = useState(false);
  const [isEngaged, setIsEngaged] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const [activityVersion, setActivityVersion] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const retireTimerRef = useRef<number | null>(null);
  const focusPanelRef = useRef(false);
  const pathname = usePathname() ?? "/";
  const hasContextualActions =
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/services/shopify-developer");
  const promo = PROMOS[promoIndex] ?? PROMOS[0];
  const canShowHere = !hasContextualActions || forceOpen;
  const showPanel = entered && canShowHere && !collapsed && !isRetiring;
  const keepRetiringPanelMounted = entered && isRetiring;

  const markActivity = useCallback(() => {
    setActivityVersion((current) => current + 1);
  }, []);

  const collapseToNavigation = useCallback((focusTrigger = false) => {
    if (retireTimerRef.current !== null) {
      window.clearTimeout(retireTimerRef.current);
    }

    setIsEngaged(false);
    setIsRetiring(true);
    setForceOpen(false);

    try {
      window.sessionStorage.setItem(PROMOTION_COLLAPSED_STORAGE_KEY, "true");
    } catch {
      // The navigation trigger still works for the current page if storage is unavailable.
    }

    window.dispatchEvent(
      new CustomEvent<PromotionCollapsedDetail>(PROMOTION_COLLAPSED_EVENT, {
        detail: { focusTrigger },
      })
    );

    retireTimerRef.current = window.setTimeout(() => {
      setCollapsed(true);
      setIsRetiring(false);
      retireTimerRef.current = null;
    }, 320);
  }, []);

  useEffect(() => {
    const updateEntry = () => {
      const entryPoint = Math.min(520, window.innerHeight * 0.65);
      setEntered(window.scrollY > entryPoint);
    };

    const syncFrame = window.requestAnimationFrame(() => {
      try {
        setCollapsed(
          window.sessionStorage.getItem(PROMOTION_COLLAPSED_STORAGE_KEY) === "true"
        );
      } catch {
        setCollapsed(false);
      }
      updateEntry();
    });

    window.addEventListener("scroll", updateEntry, { passive: true });
    return () => {
      window.cancelAnimationFrame(syncFrame);
      window.removeEventListener("scroll", updateEntry);
    };
  }, []);

  useEffect(() => {
    const openPromotion = () => {
      if (retireTimerRef.current !== null) {
        window.clearTimeout(retireTimerRef.current);
        retireTimerRef.current = null;
      }

      try {
        window.sessionStorage.removeItem(PROMOTION_COLLAPSED_STORAGE_KEY);
      } catch {
        // The offer can still reopen if storage is unavailable.
      }

      focusPanelRef.current = true;
      setForceOpen(true);
      setEntered(true);
      setCollapsed(false);
      setIsRetiring(false);
      setIsEngaged(false);
      markActivity();
      window.dispatchEvent(new Event(PROMOTION_EXPANDED_EVENT));
    };

    window.addEventListener(PROMOTION_OPEN_EVENT, openPromotion);
    return () => window.removeEventListener(PROMOTION_OPEN_EVENT, openPromotion);
  }, [markActivity]);

  useEffect(() => {
    if (!showPanel || !focusPanelRef.current) return;
    focusPanelRef.current = false;
    panelRef.current?.focus();
  }, [showPanel]);

  useEffect(() => {
    if (!showPanel || isEngaged) return;

    const idleTimer = window.setTimeout(() => collapseToNavigation(false), 5000);
    return () => window.clearTimeout(idleTimer);
  }, [activityVersion, collapseToNavigation, isEngaged, showPanel]);

  useEffect(() => {
    if (!showPanel || isEngaged || PROMOS.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rotationId = window.setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % PROMOS.length);
    }, 12000);

    return () => window.clearInterval(rotationId);
  }, [isEngaged, showPanel]);

  useEffect(
    () => () => {
      if (retireTimerRef.current !== null) {
        window.clearTimeout(retireTimerRef.current);
      }
    },
    []
  );

  if (!showPanel && !keepRetiringPanelMounted) return null;

  return (
    <aside
      className={cn(
        "quick-command-shell pointer-events-none fixed inset-x-0 bottom-5 z-40 hidden justify-end px-6 lg:flex",
        forceOpen && "quick-command-shell--forced"
      )}
    >
      <div
        ref={panelRef}
        id="barbarotech-promotion"
        tabIndex={-1}
        role="region"
        aria-label="Current website offer"
        onPointerEnter={() => {
          setIsEngaged(true);
          markActivity();
        }}
        onPointerLeave={() => {
          setIsEngaged(false);
          markActivity();
        }}
        onPointerDown={markActivity}
        onFocusCapture={() => {
          setIsEngaged(true);
          markActivity();
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsEngaged(false);
            markActivity();
          }
        }}
        onKeyDown={markActivity}
        className={cn(
          "quick-command-panel pointer-events-auto",
          isRetiring && "quick-command-panel--retiring",
          isEngaged && "quick-command-panel--engaged"
        )}
      >
        <span
          key={activityVersion}
          className="quick-command-countdown"
          aria-hidden="true"
        />
        <div className="quick-command-copy min-w-0" aria-live="polite" aria-atomic="true">
          <p className="quick-command-badge">{promo.badge}</p>
          <p className="quick-command-title">{promo.title}</p>
          {promo.salePricing ? (
            <div className="quick-command-pricing">
              <span className="quick-command-original">
                {promo.salePricing.originalSetup}
              </span>
              <span className="quick-command-sale">{promo.salePricing.saleSetup}</span>
              <span className="quick-command-sale">
                {getSetupFeePromotionBadgeText()}
              </span>
              {promo.salePricing.savings ? (
                <span className="quick-command-meta">
                  Save {promo.salePricing.savings}
                </span>
              ) : null}
              <span className="quick-command-meta">+ {promo.salePricing.monthlyCare} care</span>
            </div>
          ) : null}
          <p className="quick-command-description">{promo.description}</p>
        </div>

        <div className="quick-command-actions">
          <button
            type="button"
            onClick={() => {
              setPromoIndex((prev) => (prev + 1) % PROMOS.length);
              markActivity();
            }}
            className="quick-command-action quick-command-action--quiet"
            aria-label="Show next promotion"
          >
            Next
          </button>
          <Link
            href={`/contact/?context=${encodeURIComponent(promo.quoteContext)}`}
            className="quick-command-action quick-command-action--secondary"
          >
            Get free demo
          </Link>
          <Link
            href="/contact/#book-call"
            className="button-shine quick-command-action quick-command-action--primary"
          >
            Book call
          </Link>
          <button
            type="button"
            onClick={() => collapseToNavigation(true)}
            className="quick-command-action quick-command-action--close"
            aria-label="Move this offer to the navigation"
          >
            ×
          </button>
        </div>
      </div>
    </aside>
  );
}
