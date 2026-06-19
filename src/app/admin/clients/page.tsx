import type { Metadata } from "next";
import { AppShell } from "@/components/portal/app-shell";
import { AdminClientsMock } from "@/components/portal/mock/admin-portal";
import { adminNavItems } from "@/lib/portal/nav";

export const metadata: Metadata = {
  title: "Clients | Admin",
  description: "Manage BarbaroTech clients and portal access.",
};

export default function AdminClientsPage() {
  return (
    <AppShell
      title="BarbaroTech"
      subtitle="Admin"
      eyebrow="Clients"
      pageTitle="Client CRM"
      description="Create clients, invite portal access, review care plans, and open custom retainer billing."
      navItems={adminNavItems}
    >
      <AdminClientsMock />
    </AppShell>
  );
}
