import type { Metadata } from "next";
import { AppShell } from "@/components/portal/app-shell";
import { AdminClientsLive } from "@/components/portal/live/admin-live";
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
      loginReturnTo="/admin/clients/"
    >
      <AdminClientsLive />
    </AppShell>
  );
}
