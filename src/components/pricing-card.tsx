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
        "pricing-package-card flex h-full flex-col overflow-hidden",
        (plan.featured || plan.offerLabel) && "pricing-package-card--featured"
      )}
    >
      {packageLabel ? (
        <div
          className={cn(
            "pricing-card-badge border-b px-5 py-2 text-center text-xs font-bold",
            plan.offerLabel
              ? "pricing-card-badge--offer"
              : "pricing-card-badge--featured"
          )}
        >
          {packageLabel}
        </div>
      ) : null}

      <CardHeader className="pb-0">
        <h3 className="pricing-card-title text-2xl font-bold leading-tight">{plan.name}</h3>
        <p className="pricing-card-copy mt-3 text-sm leading-6">{plan.summary}</p>

        <div className="mt-6 grid grid-cols-2 border-y border-cyan-100/10">
          <div className="min-w-0 py-5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="pricing-card-label text-xs font-semibold">One-time setup</p>
              {discountedSetupPrice ? (
                <span className="pricing-card-promo rounded-full border px-2 py-0.5 text-[10px] font-semibold">
                  {getSetupFeePromotionBadgeText()}
                </span>
              ) : null}
            </div>
            <p
              className={cn(
                "pricing-card-setup-price mt-3 font-extrabold tracking-[-0.03em]",
                getPriceTextClass(discountedSetupPrice ?? plan.setupPrice)
              )}
            >
              {discountedSetupPrice ?? plan.setupPrice}
            </p>
            {discountedSetupPrice ? (
              <p className="pricing-card-note mt-2 text-xs font-semibold line-through">
                {plan.setupPrice}
              </p>
            ) : null}
          </div>

          <div className="min-w-0 border-l border-cyan-100/10 py-5 pl-4">
            <p className="pricing-card-label text-xs font-semibold">Monthly care</p>
            <p
              className={cn(
                "pricing-card-monthly-price mt-3 font-extrabold tracking-[-0.03em]",
                getPriceTextClass(plan.monthlyPrice)
              )}
            >
              {plan.monthlyPrice}
            </p>
            <p className="pricing-card-note mt-2 text-xs">
              {setupFeePromotion.enabled ? "Not discounted" : "Starts the following month"}
            </p>
          </div>
        </div>

        <div className="border-b border-cyan-100/10 py-5">
          <p className="pricing-card-label text-xs font-semibold">Best for</p>
          <p className="pricing-card-best-for mt-2 text-sm leading-6">{plan.bestFor}</p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-6 pt-6 md:pt-6">
        <div>
          <p className="pricing-card-title text-sm font-bold">Starting scope</p>
          <ul className="pricing-card-copy mt-4 space-y-3 text-sm leading-6">
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
