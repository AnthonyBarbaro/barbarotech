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
    <section className="site-sale-banner relative overflow-hidden border-b border-[#0a5b89]/25 bg-[#a9e1fb] text-[#071a2d]">
      <Container className="py-2 md:py-3">
        <div className="relative z-10 flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
            <span className="text-[11px] font-black tracking-[0.08em] text-[#075f91]">
              {setupFeePromotion.label}
            </span>
            <span className="font-semibold text-[#071a2d]">Website packages from</span>
            <span className="hidden text-xs font-semibold text-[#4c6d82] line-through sm:inline">
              {originalSetupPrice}
            </span>
            <span className="text-sm font-black text-[#075f91]">{saleSetupPrice}</span>
            <span className="text-xs font-black text-[#075f91]">
              {getSetupFeePromotionBadgeText()}
            </span>
            <span className="text-xs text-[#164f72]">+ {monthlyPrice} care</span>
          </div>
          <p className="text-[11px] font-semibold leading-4 text-[#164f72] md:text-right">
            Setup fee only{ savingsAmount ? ` / save ${savingsAmount}` : ""} / monthly unchanged
          </p>
        </div>
      </Container>
    </section>
  );
}
