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
    <Card className="h-full">
      <CardHeader className="space-y-2">
        <h3 className="text-lg font-semibold">{plan.name}</h3>
        <p className="text-sm text-white/70">{plan.bestFor}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="text-sm text-white/70">One-time</div>
          <div className="text-2xl font-semibold">{plan.oneTime}</div>
          {plan.monthly && (
            <div className="text-sm text-white/70">Monthly: {plan.monthly}</div>
          )}
        </div>

        <ul className="space-y-2 text-sm text-white/80">
          {plan.includes.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/75" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {plan.notes && <p className="text-xs text-white/60">{plan.notes}</p>}

        <ButtonLink href={href} variant="secondary" className="w-full">
          Text about this plan
        </ButtonLink>
      </CardContent>
    </Card>
  );
}
