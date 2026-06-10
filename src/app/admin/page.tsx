import type { Metadata } from "next";
import { AppShell } from "@/components/portal/app-shell";
import { AdminOverviewLive } from "@/components/portal/live/admin-live";
import { adminNavItems } from "@/lib/portal/nav";

export const metadata: Metadata = {
  title: "Admin | BarbaroTech",
  description: "BarbaroTech admin dashboard for clients, retainers, billing, and requests.",
};

export default function AdminPage() {
  return (
    <AppShell
      title="BarbaroTech"
      subtitle="Admin"
      eyebrow="Admin"
      pageTitle="Operations overview"
      description="Manage clients, custom retainers, checkout links, billing status, and the request kanban queue."
      navItems={adminNavItems}
      actionHref="/admin/clients/"
      actionLabel="Manage Clients"
    >
      <AdminOverviewLive />
    </AppShell>
  );
}
