"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getDiscountedSetupPrice,
  getSetupFeePromotionBadgeText,
  getSetupFeePromotionText,
  pricingPackageGroups,
  setupFeePromotion,
} from "@/data/pricing";

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
    badge: setupFeePromotion.enabled ? setupFeePromotion.label : "Website Packages",
    title: setupFeePromotion.enabled
      ? "Website package flash sale."
      : `Website projects from ${STARTER_ORIGINAL_SETUP}.`,
    description:
      setupFeePromotion.enabled
        ? `${getSetupFeePromotionText()}. Monthly care is unchanged.`
        : `Start with 40%. Monthly care begins at launch from ${STARTER_MONTHLY_CARE}.`,
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
  const [hidden, setHidden] = useState(false);
  const [entered, setEntered] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const pathname = usePathname() ?? "/";
  const hasContextualActions =
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/projects");
  const promo = PROMOS[promoIndex] ?? PROMOS[0];

  useEffect(() => {
    const updateEntry = () => {
      const entryPoint = Math.min(520, window.innerHeight * 0.65);
      setEntered(window.scrollY > entryPoint);
    };

    updateEntry();
    window.addEventListener("scroll", updateEntry, { passive: true });
    return () => window.removeEventListener("scroll", updateEntry);
  }, []);

  useEffect(() => {
    if (hidden || PROMOS.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rotationId = window.setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % PROMOS.length);
    }, 12000);

    return () => window.clearInterval(rotationId);
  }, [hidden]);

  const onDismiss = () => {
    setHidden(true);
  };

  if (hidden || !entered || hasContextualActions) return null;

  return (
    <aside className="pointer-events-none fixed inset-x-0 bottom-5 z-40 hidden justify-end px-6 lg:flex">
      <div
        aria-label="Promotion"
        className="pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-4 rounded-2xl border border-cyan-200/25 bg-[#07111d]/95 px-4 py-3 shadow-[0_18px_46px_rgba(0,0,0,0.38)] backdrop-blur-xl"
      >
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.07em] text-cyan-300">{promo.badge}</p>
          <p className="text-sm font-bold text-white">
            {promo.title}
          </p>
          {promo.salePricing ? (
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 line-through">
                {promo.salePricing.originalSetup}
              </span>
              <span className="font-mono text-sm text-cyan-200">{promo.salePricing.saleSetup}</span>
              <span className="font-mono text-xs text-cyan-300">
                {getSetupFeePromotionBadgeText()}
              </span>
              {promo.salePricing.savings ? (
                <span className="font-mono text-xs text-slate-400">
                  Save {promo.salePricing.savings}
                </span>
              ) : null}
              <span className="text-xs text-slate-400">+ {promo.salePricing.monthlyCare} care</span>
            </div>
          ) : null}
          <p className="max-w-xl text-xs leading-5 text-slate-400">
            {promo.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setPromoIndex((prev) => (prev + 1) % PROMOS.length)}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-cyan-200/20 bg-transparent px-3 text-xs font-semibold text-slate-300 transition-colors hover:border-cyan-200/50 hover:text-white"
            aria-label="Show next promotion"
          >
            Next
          </button>
          <Link
            href={`/contact/?context=${encodeURIComponent(promo.quoteContext)}`}
            className="button-shine inline-flex h-11 items-center rounded-xl border border-cyan-200/30 bg-[#0a1725] px-3.5 text-xs font-bold text-cyan-100 transition-colors hover:border-cyan-200/70"
          >
            Request quote
          </Link>
          <Link
            href="/contact/#book-call"
            className="button-shine inline-flex h-11 items-center rounded-xl border border-cyan-200 bg-cyan-300 px-3.5 text-xs font-bold text-[#02060b] transition-colors hover:bg-white"
          >
            Book call
          </Link>
          <button
            type="button"
            onClick={onDismiss}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-200/20 bg-transparent text-sm font-semibold text-slate-400 transition-colors hover:border-cyan-200/50 hover:text-white"
            aria-label="Dismiss promotion"
          >
            ×
          </button>
        </div>
      </div>
    </aside>
  );
}
