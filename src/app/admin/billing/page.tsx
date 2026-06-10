import type { Metadata } from "next";
import { AppShell } from "@/components/portal/app-shell";
import { AdminBillingLive } from "@/components/portal/live/admin-live";
import { adminNavItems } from "@/lib/portal/nav";

export const metadata: Metadata = {
  title: "Billing | Admin",
  description: "Admin billing views for custom BarbaroTech retainers.",
};

export default function AdminBillingPage() {
  return (
    <AppShell
      title="BarbaroTech"
      subtitle="Admin"
      eyebrow="Billing"
      pageTitle="Custom retainers"
      description="Create custom quotes, send Stripe Checkout links, and monitor retainer billing status."
      navItems={adminNavItems}
    >
      <AdminBillingLive />
    </AppShell>
  );
}
