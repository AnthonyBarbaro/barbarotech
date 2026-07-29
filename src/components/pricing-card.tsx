import {
  getDiscountedSetupPrice,
  getSetupFeePromotionBadgeText,
  PricingPackage,
  setupFeePromotion,
} from "@/data/pricing";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function getPriceTextClass(value: string) {
  if (value.length > 24) {
    return "text-sm leading-snug [overflow-wrap:anywhere]";
  }

  if (value.length > 12) {
    return "text-lg leading-snug [overflow-wrap:anywhere]";
  }

  return "text-xl";
}

export function PricingCard({ plan }: { plan: PricingPackage }) {
  const previewHighlights = plan.highlights.slice(0, 5);
  const remainingItems = Math.max(plan.highlights.length - previewHighlights.length, 0);
  const discountedSetupPrice = getDiscountedSetupPrice(plan.setupPrice);

  return (
    <Card className={cn("flex h-full flex-col", plan.featured && "ring-2 ring-cyan-300/45")}>
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold leading-snug text-slate-900">{plan.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{plan.summary}</p>
          </div>
          {plan.featured ? (
            <span className="shrink-0 rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
              Popular
            </span>
          ) : null}
        </div>

        <div className="grid gap-2">
          <div className="min-w-0 rounded-2xl border border-slate-900/10 bg-white/90 px-3.5 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">Setup</p>
              {discountedSetupPrice ? (
                <span className="rounded-full bg-cyan-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-cyan-700">
                  {getSetupFeePromotionBadgeText()}
                </span>
              ) : null}
            </div>
            {discountedSetupPrice ? (
              <div className="mt-1 space-y-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-xs font-semibold text-slate-500 line-through">{plan.setupPrice}</span>
                  <span className={cn("font-semibold text-slate-900", getPriceTextClass(discountedSetupPrice))}>
                    {discountedSetupPrice}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Sale setup fee</p>
              </div>
            ) : (
              <p className={cn("mt-1 font-semibold text-slate-900", getPriceTextClass(plan.setupPrice))}>
                {plan.setupPrice}
              </p>
            )}
          </div>
          <div className="min-w-0 rounded-2xl border border-slate-900/10 bg-white/90 px-3.5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
              Monthly Care
            </p>
            <p className={cn("mt-1 font-semibold text-slate-900", getPriceTextClass(plan.monthlyPrice))}>
              {plan.monthlyPrice}
            </p>
            {setupFeePromotion.enabled ? (
              <p className="mt-1 text-xs text-slate-500">Not discounted</p>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-900/10 bg-[rgba(255,255,255,0.72)] px-3.5 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">Best Fit</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{plan.bestFor}</p>
        </div>
      </CardHeader>

      <CardContent className="mt-auto flex h-full flex-col gap-4 pt-0">
        <ul className="space-y-1.5 text-sm text-slate-600">
          {previewHighlights.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/80" />
              <span>{item}</span>
            </li>
          ))}
          {remainingItems > 0 ? (
            <li className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              +{remainingItems} more included in final scope
            </li>
          ) : null}
        </ul>

        <ButtonLink href={plan.ctaHref} variant={plan.featured ? "primary" : "secondary"} className="mt-auto w-full">
          {plan.ctaLabel}
        </ButtonLink>
      </CardContent>
    </Card>
  );
}
