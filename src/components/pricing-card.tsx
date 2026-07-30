import {
  getDiscountedSetupPrice,
  getSetupFeePromotionBadgeText,
  setupFeePromotion,
  type PricingPackage,
} from "@/data/pricing";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function getPriceTextClass(value: string) {
  if (value.length > 16) {
    return "text-xl leading-snug [overflow-wrap:anywhere]";
  }

  if (value.length > 10) {
    return "text-2xl leading-tight [overflow-wrap:anywhere]";
  }

  return "text-3xl leading-none";
}

export function PricingCard({ plan }: { plan: PricingPackage }) {
  const discountedSetupPrice = getDiscountedSetupPrice(plan.setupPrice);
  const packageLabel = plan.offerLabel ?? (plan.featured ? "Featured package" : null);

  return (
    <Card
      className={cn(
        "flex h-full flex-col overflow-hidden bg-[#07111d]/95",
        (plan.featured || plan.offerLabel) && "border-cyan-200/60 bg-[#091725]"
      )}
    >
      {packageLabel ? (
        <div
          className={cn(
            "border-b border-cyan-200/20 px-5 py-2 text-center text-xs font-bold",
            plan.offerLabel
              ? "bg-cyan-300 text-[#02060b]"
              : "bg-cyan-300/12 text-cyan-100"
          )}
        >
          {packageLabel}
        </div>
      ) : null}

      <CardHeader className="pb-0">
        <h3 className="text-2xl font-bold leading-tight text-white">{plan.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{plan.summary}</p>

        <div className="mt-6 grid grid-cols-2 border-y border-cyan-100/10">
          <div className="min-w-0 py-5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold text-slate-400">One-time setup</p>
              {discountedSetupPrice ? (
                <span className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-100">
                  {getSetupFeePromotionBadgeText()}
                </span>
              ) : null}
            </div>
            <p
              className={cn(
                "mt-3 font-extrabold tracking-[-0.03em] text-cyan-100",
                getPriceTextClass(discountedSetupPrice ?? plan.setupPrice)
              )}
            >
              {discountedSetupPrice ?? plan.setupPrice}
            </p>
            {discountedSetupPrice ? (
              <p className="mt-2 text-xs font-semibold text-slate-500 line-through">
                {plan.setupPrice}
              </p>
            ) : null}
          </div>

          <div className="min-w-0 border-l border-cyan-100/10 py-5 pl-4">
            <p className="text-xs font-semibold text-slate-400">Monthly care</p>
            <p
              className={cn(
                "mt-3 font-extrabold tracking-[-0.03em] text-white",
                getPriceTextClass(plan.monthlyPrice)
              )}
            >
              {plan.monthlyPrice}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              {setupFeePromotion.enabled ? "Not discounted" : "Required at launch"}
            </p>
          </div>
        </div>

        <div className="border-b border-cyan-100/10 py-5">
          <p className="text-xs font-semibold text-slate-400">Best for</p>
          <p className="mt-2 text-sm leading-6 text-slate-200">{plan.bestFor}</p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-6 pt-6 md:pt-6">
        <div>
          <p className="text-sm font-bold text-white">Starting scope</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            {plan.highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <ButtonLink
          href={plan.ctaHref}
          variant={plan.featured || plan.offerLabel ? "primary" : "secondary"}
          className="mt-auto w-full"
        >
          {plan.ctaLabel}
        </ButtonLink>
      </CardContent>
    </Card>
  );
}
