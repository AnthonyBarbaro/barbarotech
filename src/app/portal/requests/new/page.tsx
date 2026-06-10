import type { Metadata } from "next";
import { AppShell } from "@/components/portal/app-shell";
import { ClientNewRequestLive } from "@/components/portal/live/client-live";
import { clientNavItems } from "@/lib/portal/nav";

export const metadata: Metadata = {
  title: "New Request | Client Portal",
  description: "Submit a new BarbaroTech client request.",
};

export default function NewPortalRequestPage() {
  return (
    <AppShell
      title="BarbaroTech"
      subtitle="Client Portal"
      eyebrow="New Request"
      pageTitle="Submit a request"
      description="Share what needs to change, add helpful context, and attach files for BarbaroTech review."
      navItems={clientNavItems}
    >
      <ClientNewRequestLive />
    </AppShell>
  );
}
