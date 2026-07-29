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
    <section className="relative overflow-hidden border-b border-slate-900/10 bg-[linear-gradient(90deg,#061826_0%,#050816_46%,#0b173d_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_50%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_92%_50%,rgba(37,99,235,0.32),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      <Container className="py-3 md:py-4">
        <div className="relative z-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <span className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.22)]">
                {setupFeePromotion.label}
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold leading-snug md:text-base">
                <span>Website packages from</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/[0.07] px-3 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <span className="text-slate-500 line-through decoration-cyan-300/70 decoration-2">
                    {originalSetupPrice}
                  </span>
                  <span className="text-cyan-200 drop-shadow-[0_0_12px_rgba(103,232,249,0.45)]">
                    {saleSetupPrice}
                  </span>
                  <span className="rounded-full bg-cyan-300 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-950">
                    {getSetupFeePromotionBadgeText()}
                  </span>
                </span>
                <span className="text-slate-300">+ {monthlyPrice} monthly care.</span>
              </div>
              <p className="text-xs text-slate-400">Setup fees only. Monthly care is unchanged.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            {savingsAmount ? (
              <span className="rounded-full border border-cyan-300/30 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                Save {savingsAmount}
              </span>
            ) : null}
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-300">
              Setup Fee Only
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
