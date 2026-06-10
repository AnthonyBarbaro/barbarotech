import type { Metadata } from "next";
import { AppShell } from "@/components/portal/app-shell";
import { ClientBillingLive } from "@/components/portal/live/client-live";
import { clientNavItems } from "@/lib/portal/nav";

export const metadata: Metadata = {
  title: "Billing | Client Portal",
  description: "Review BarbaroTech retainer and billing status.",
};

export default function PortalBillingPage() {
  return (
    <AppShell
      title="BarbaroTech"
      subtitle="Client Portal"
      eyebrow="Billing"
      pageTitle="Retainer and billing"
      description="Review your current care plan and open the Stripe Billing Portal for invoices, payment methods, and billing details."
      navItems={clientNavItems}
    >
      <ClientBillingLive />
    </AppShell>
  );
}
