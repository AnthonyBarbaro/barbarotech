"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getDiscountedSetupPrice,
  getSetupFeePromotionBadgeText,
  getSetupFeePromotionText,
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

const STARTER_ORIGINAL_SETUP = "$1,500";
const STARTER_SALE_SETUP = getDiscountedSetupPrice(STARTER_ORIGINAL_SETUP) ?? STARTER_ORIGINAL_SETUP;
const STARTER_MONTHLY_CARE = "$149/mo";
const STARTER_SAVINGS = `$${(
  Number(STARTER_ORIGINAL_SETUP.replace(/[^0-9]/g, "")) -
  Number(STARTER_SALE_SETUP.replace(/[^0-9]/g, ""))
).toLocaleString("en-US")}`;

const PROMOS: Promo[] = [
  {
    badge: setupFeePromotion.enabled ? setupFeePromotion.label : "Website Packages",
    title: setupFeePromotion.enabled
      ? "Website package flash sale."
      : "Website packages from $1,500 plus monthly care.",
    description:
      setupFeePromotion.enabled
        ? `${getSetupFeePromotionText()}. Monthly care is unchanged.`
        : "Choose a launch path for a business site, restaurant, booking site, ecommerce store, or premium brand.",
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
  const [promoIndex, setPromoIndex] = useState(0);
  const promo = PROMOS[promoIndex] ?? PROMOS[0];

  useEffect(() => {
    if (hidden || PROMOS.length <= 1) return;

    const rotationId = window.setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % PROMOS.length);
    }, 12000);

    return () => window.clearInterval(rotationId);
  }, [hidden]);

  const onDismiss = () => {
    setHidden(true);
  };

  if (hidden) return null;

  return (
    <aside className="pointer-events-none fixed inset-x-0 bottom-5 z-40 hidden justify-center px-6 lg:flex">
      <div
        aria-label="Promotion"
        className="pointer-events-auto glass-panel flex w-full max-w-4xl items-center justify-between gap-4 rounded-2xl border border-slate-900/15 px-4 py-3 shadow-[0_16px_40px_rgba(6,20,46,0.15)]"
      >
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-700">{promo.badge}</p>
          <p className="text-sm font-semibold text-slate-900">
            {promo.title}
          </p>
          {promo.salePricing ? (
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 line-through">
                {promo.salePricing.originalSetup}
              </span>
              <span className="text-sm font-semibold text-sky-700">{promo.salePricing.saleSetup}</span>
              <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-cyan-700">
                {getSetupFeePromotionBadgeText()}
              </span>
              {promo.salePricing.savings ? (
                <span className="rounded-full border border-slate-900/10 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600">
                  Save {promo.salePricing.savings}
                </span>
              ) : null}
              <span className="text-xs text-slate-500">+ {promo.salePricing.monthlyCare} monthly care</span>
            </div>
          ) : null}
          <p className="text-xs text-slate-600">
            {promo.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setPromoIndex((prev) => (prev + 1) % PROMOS.length)}
            className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-900/12 bg-white/85 px-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600 transition hover:text-slate-900"
            aria-label="Show next promotion"
          >
            Next
          </button>
          <Link
            href={`/contact/?context=${encodeURIComponent(promo.quoteContext)}`}
            className="button-shine inline-flex items-center rounded-xl border border-slate-900/14 bg-white/90 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-800 transition-all duration-300 hover:border-slate-900/22 hover:bg-white"
          >
            Request Quote
          </Link>
          <Link
            href="/contact/#book-call"
            className="button-shine inline-flex items-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_10px_26px_rgba(8,145,178,0.35)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Book Call
          </Link>
          <button
            type="button"
            onClick={onDismiss}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-900/12 bg-white/85 text-xs font-semibold text-slate-600 transition hover:text-slate-900"
            aria-label="Dismiss promotion"
          >
            X
          </button>
        </div>
      </div>
    </aside>
  );
}
