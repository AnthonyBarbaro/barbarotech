import { Container } from "@/components/container";
import {
  getDiscountedSetupPrice,
  getSetupFeePromotionBadgeText,
  pricingPackageGroups,
  setupFeePromotion,
} from "@/data/pricing";

export function SaleHeroBanner() {
  if (!setupFeePromotion.enabled) return null;

  const starterPackage = pricingPackageGroups[0]?.packages[0];
  const originalSetupPrice = starterPackage?.setupPrice ?? "$1,500";
  const saleSetupPrice = getDiscountedSetupPrice(originalSetupPrice) ?? originalSetupPrice;
  const monthlyPrice = starterPackage?.monthlyPrice ?? "$149/mo";
  const originalAmount = Number(originalSetupPrice.replace(/[^0-9]/g, ""));
  const saleAmount = Number(saleSetupPrice.replace(/[^0-9]/g, ""));
  const savingsAmount =
    Number.isFinite(originalAmount) && Number.isFinite(saleAmount)
      ? `$${(originalAmount - saleAmount).toLocaleString("en-US")}`
      : null;

  return (
    <section className="relative overflow-hidden border-b border-cyan-200/15 bg-[#07111d] text-white">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.13),transparent_70%)]" />
      <Container className="py-2 md:py-3">
        <div className="relative z-10 flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
            <span className="font-mono text-[11px] tracking-[0.08em] text-cyan-300">
              {setupFeePromotion.label}
            </span>
            <span className="font-semibold text-slate-100">Website packages from</span>
            <span className="hidden text-xs font-semibold text-slate-500 line-through sm:inline">
              {originalSetupPrice}
            </span>
            <span className="font-mono text-sm text-cyan-200">{saleSetupPrice}</span>
            <span className="font-mono text-xs text-cyan-300">
              {getSetupFeePromotionBadgeText()}
            </span>
            <span className="text-xs text-slate-400">+ {monthlyPrice} care</span>
          </div>
          <p className="font-mono text-[11px] leading-4 text-slate-400 md:text-right">
            Setup fee only{ savingsAmount ? ` / save ${savingsAmount}` : ""} / monthly unchanged
          </p>
        </div>
      </Container>
    </section>
  );
}
