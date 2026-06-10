import { CreditCard } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { formatMoney } from "@/lib/portal/format";
import type { PortalRetainer } from "@/lib/portal/types";
import { StatusBadge } from "./status-badge";

export function BillingStatusCard({ retainer }: { retainer: PortalRetainer }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Care Plan</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">{retainer.packageCategory}</h2>
          <p className="mt-1 text-sm text-slate-600">
            {retainer.terms || "Monthly care plan for requests, billing visibility, and next steps."}
          </p>
        </div>
        <StatusBadge value={retainer.billingStatus} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Monthly Retainer</p>
          <p className="mt-1 text-base font-semibold text-slate-950">{formatMoney(retainer.monthlyAmountCents)}</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Setup Fee</p>
          <p className="mt-1 text-base font-semibold text-slate-950">{formatMoney(retainer.setupFeeCents)}</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Next Billing</p>
          <p className="mt-1 text-base font-semibold text-slate-950">
            {retainer.billingStatus === "active" ? "Handled by Stripe" : "Pending checkout"}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <ButtonLink href="/portal/billing/" variant="primary">
          <CreditCard className="h-4 w-4" />
          Open Billing
        </ButtonLink>
        <ButtonLink href="/portal/requests/new/" variant="secondary">
          New Request
        </ButtonLink>
      </div>
    </div>
  );
}
