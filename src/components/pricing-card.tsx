import { PricingPlan } from "@/data/pricing";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { buildMailtoHref } from "@/lib/mailto";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const href = buildMailtoHref({
    to: SITE.contact.textEmail,
    subject: `${SITE.brand} — pricing inquiry: ${plan.name}`,
    body:
      `Plan: ${plan.name}\n` +
      `Name:\nBusiness:\nCurrent website link (if any):\nPlatform (Shopify/Wix/etc):\n` +
      `What you want changed:\nTimeline:\nBudget:\n\nNotes:\n`,
  });

  return (
    <Card
      className={cn(
        "h-full flex flex-col border-black/10 bg-white/90 shadow-sm transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:shadow-lg",
        plan.popular && "border-black shadow-md"
      )}
    >
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-black leading-snug">
              {plan.name}
            </h3>
            <p className="text-xs text-black/60 mt-1">{plan.bestFor}</p>
          </div>

          <span className={cn(
            "shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide",
            plan.popular ? "bg-black text-white" : "bg-black/[0.06] text-black/70 border border-black/10"
          )}>
            {plan.popular ? "Most popular" : plan.monthly ? "Build + support" : "One-time"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex h-full flex-col gap-4 pt-0">
        <div className="space-y-1">
          <div className="text-[11px] font-medium uppercase tracking-wide text-black/50">
            One-time
          </div>
          <div className="text-xl md:text-2xl font-semibold text-black">
            {plan.oneTime}
          </div>

          {plan.monthly && (
            <div className="text-xs text-black/70">
              Monthly:&nbsp;<span className="font-medium">{plan.monthly}</span>
            </div>
          )}

          {plan.timeline && (
            <div className="text-xs text-black/60">
              Typical timeline:&nbsp;<span className="font-medium text-black/80">{plan.timeline}</span>
            </div>
          )}
        </div>

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

        {plan.deliverables?.length ? (
          <details className="rounded-xl border border-black/10 bg-zinc-50 p-3">
            <summary className="cursor-pointer text-xs font-medium text-black/70 hover:text-black">
              What you’ll get (details)
            </summary>
            <ul className="mt-2 space-y-1.5 text-xs text-black/70">
              {plan.deliverables.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-black/30" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </details>
        ) : null}

        {plan.notes && (
          <p className="text-[11px] text-black/50">{plan.notes}</p>
        )}

        <ButtonLink href={href} variant="secondary" className="mt-auto w-full">
          Text about this plan
        </ButtonLink>
      </CardContent>
    </Card>
  );
}
