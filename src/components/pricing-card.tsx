import { PricingPlan } from "@/data/pricing";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const contactHref = `/contact/?plan=${encodeURIComponent(plan.name)}&planId=${encodeURIComponent(
    plan.id
  )}`;

  const previewIncludes = plan.includes.slice(0, 3);
  const remainingItems = Math.max(plan.includes.length - previewIncludes.length, 0);

  return (
    <Card className={cn("h-full flex flex-col", plan.popular && "ring-2 ring-cyan-300/45")}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug text-slate-900">{plan.name}</h3>
          {plan.popular ? (
            <span className="shrink-0 rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
              Recommended
            </span>
          ) : null}
        </div>

        <p className="text-sm text-slate-600">{plan.bestFor}</p>

        <div className="rounded-2xl border border-slate-900/10 bg-white/90 px-3.5 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">Starting investment</p>
          <p className="mt-1 text-lg font-semibold text-slate-900 md:text-xl">{plan.oneTime}</p>

          {plan.monthly && (
            <p className="mt-1 text-xs text-slate-600">
              Optional monthly support: <span className="font-semibold text-slate-900">{plan.monthly}</span>
            </p>
          )}

          {plan.timeline && (
            <p className="mt-1 text-xs text-slate-600">
              Typical timeline: <span className="font-semibold text-slate-900">{plan.timeline}</span>
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="mt-auto flex h-full flex-col gap-4 pt-0">
        <ul className="space-y-1.5 text-sm text-slate-600">
          {previewIncludes.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500/80" />
              <span>{item}</span>
            </li>
          ))}
          {remainingItems > 0 ? (
            <li className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              +{remainingItems} more items included in final scope
            </li>
          ) : null}
        </ul>

        <ButtonLink href={contactHref} variant="secondary" className="mt-auto w-full">
          Select Package →
        </ButtonLink>
      </CardContent>
    </Card>
  );
}
