import type { Metadata } from "next";
import { AppShell } from "@/components/portal/app-shell";
import { ClientRequestsMock } from "@/components/portal/mock/client-portal";
import { clientNavItems } from "@/lib/portal/nav";

export const metadata: Metadata = {
  title: "Requests | Client Portal",
  description: "Review BarbaroTech request status, next steps, scope, and updates.",
};

export default function PortalRequestsPage() {
  return (
    <AppShell
      title="BarbaroTech"
      subtitle="Client Portal"
      eyebrow="Requests"
      pageTitle="Request list"
      description="Track what is open, what BarbaroTech is reviewing, and what action is needed next."
      navItems={clientNavItems}
      actionHref="/portal/requests/new/"
      actionLabel="New Request"
    >
      <ClientRequestsMock />
    </AppShell>
  );
}
