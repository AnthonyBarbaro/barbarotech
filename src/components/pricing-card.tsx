import { PricingPlan } from "@/data/pricing";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { buildMailtoHref } from "@/lib/mailto";
import { SITE } from "@/lib/site";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const href = buildMailtoHref({
    to: SITE.contact.textEmail,
    subject: `${SITE.brand} — pricing inquiry: ${plan.name}`,
    body:
      `Plan: ${plan.name}\n` +
      `Name:\nBusiness:\nIndustry:\nTimeline:\nBudget:\n` +
      `Notes:\n`,
  });

  return (
    <Card className="h-full flex flex-col border-black/10 bg-white/90 shadow-sm transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-black">
            {plan.name}
          </h3>

          {/* Small black pill badge */}
          <span className="inline-flex items-center rounded-full bg-black px-2.5 py-0.5 text-[11px] font-medium text-white uppercase tracking-wide">
            {plan.monthly ? "Build + Support" : "One-time Build"}
          </span>
        </div>

        <p className="text-xs text-black/60">{plan.bestFor}</p>
      </CardHeader>

      <CardContent className="flex h-full flex-col gap-4 pt-0">
        {/* PRICE BLOCK */}
        <div className="space-y-1">
          <div className="text-[11px] font-medium uppercase tracking-wide text-black/50">
            One-time
          </div>
          <div className="text-2xl font-semibold text-black">
            {plan.oneTime}
          </div>

          {plan.monthly && (
            <div className="text-xs text-black/70">
              Monthly:&nbsp;
              <span className="font-medium">{plan.monthly}</span>
            </div>
          )}
        </div>

        {/* FEATURES */}
        {plan.includes?.length > 0 && (
          <ul className="space-y-1.5 text-xs text-black/70">
            {plan.includes.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-black/40" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* NOTES */}
        {plan.notes && (
          <p className="text-[11px] text-black/50 mt-1">
            {plan.notes}
          </p>
        )}

        {/* CTA BUTTON */}
        <ButtonLink
          href={href}
          variant="secondary"
          className="mt-auto w-full text-xs md:text-sm"
        >
          Text about this plan
        </ButtonLink>
      </CardContent>
    </Card>
  );
}
