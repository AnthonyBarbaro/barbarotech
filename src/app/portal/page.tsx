import type { Metadata } from "next";
import { AppShell } from "@/components/portal/app-shell";
import { ClientOverviewMock } from "@/components/portal/mock/client-portal";
import { clientNavItems } from "@/lib/portal/nav";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "BarbaroTech Client Portal for requests, retainers, billing, files, and updates.",
};

export default function PortalPage() {
  return (
    <AppShell
      title="BarbaroTech"
      subtitle="Client Portal"
      eyebrow="Client Portal"
      pageTitle="Client Portal"
      description="Review your care plan, billing status, open requests, files, and next steps with BarbaroTech."
      navItems={clientNavItems}
      actionHref="/portal/requests/new/"
      actionLabel="New Request"
    >
      <ClientOverviewMock />
    </AppShell>
  );
}
