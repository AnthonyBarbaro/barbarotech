import type { Metadata } from "next";
import { AppShell } from "@/components/portal/app-shell";
import { AdminRequestsMock } from "@/components/portal/mock/admin-portal";
import { adminNavItems } from "@/lib/portal/nav";

export const metadata: Metadata = {
  title: "Requests | Admin",
  description: "BarbaroTech admin kanban queue for client requests.",
};

export default function AdminRequestsPage() {
  return (
    <AppShell
      title="BarbaroTech"
      subtitle="Admin"
      eyebrow="Requests"
      pageTitle="Kanban queue"
      description="Review client requests, scope type, internal notes, and the next step before work begins."
      navItems={adminNavItems}
    >
      <AdminRequestsMock />
    </AppShell>
  );
}
