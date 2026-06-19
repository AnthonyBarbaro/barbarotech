import type { PortalClient, PortalRequest, PortalRetainer, RequestStatus } from "./types";

export const portalClient: PortalClient = {
  id: "client-demo-market",
  businessName: "Demo Market",
  contactName: "Client Preview",
  email: "client-preview@example.com",
  phone: "(619) 555-0148",
  accessStatus: "active",
};

export const portalRetainers: PortalRetainer[] = [
  {
    id: "retainer-growth-care",
    clientId: portalClient.id,
    packageCategory: "Website Care",
    quoteStatus: "accepted",
    billingStatus: "active",
    monthlyAmountCents: 24900,
    setupFeeCents: 50000,
    terms: "Monthly care plan for site updates, request review, and billing visibility.",
    nextBillingDate: "2026-07-01",
  },
];

export const portalRequests: PortalRequest[] = [
  {
    id: "request-homepage-hours",
    clientId: portalClient.id,
    retainerId: "retainer-growth-care",
    title: "Update homepage hours",
    description: "Change holiday hours and add a short note near the contact section.",
    status: "Reviewing",
    priority: "Normal",
    scopeType: "Included in retainer",
    nextStep: "BarbaroTech is reviewing scope.",
    clientVisibleNote: "This request is included in your current care plan.",
    lastUpdatedBy: "BarbaroTech",
    targetResponseAt: "2026-06-19T16:00:00-07:00",
    updatedAt: "2026-06-18",
    createdAt: "2026-06-17",
  },
  {
    id: "request-promo-banner",
    clientId: portalClient.id,
    retainerId: "retainer-growth-care",
    title: "Add summer promotion banner",
    description: "Create a seasonal homepage banner and link it to the specials section.",
    status: "New",
    priority: "High",
    scopeType: "Needs approval",
    nextStep: "This may need separate approval before work begins.",
    clientVisibleNote: "BarbaroTech will confirm scope before starting.",
    lastUpdatedBy: "Client",
    targetResponseAt: "2026-06-20T12:00:00-07:00",
    updatedAt: "2026-06-19",
    createdAt: "2026-06-19",
  },
  {
    id: "request-footer-polish",
    clientId: portalClient.id,
    retainerId: "retainer-growth-care",
    title: "Footer polish",
    description: "Tighten spacing and update social links in the footer.",
    status: "Done",
    priority: "Low",
    scopeType: "Included in retainer",
    nextStep: "No client action needed.",
    clientVisibleNote: "Completed and ready for review.",
    lastUpdatedBy: "BarbaroTech",
    updatedAt: "2026-06-15",
    createdAt: "2026-06-14",
  },
];

export const adminClients: PortalClient[] = [
  portalClient,
  {
    id: "client-demo-law",
    businessName: "Demo Law Office",
    contactName: "Admin Preview",
    email: "law-preview@example.com",
    phone: "(619) 555-0199",
    accessStatus: "active",
  },
  {
    id: "client-demo-studio",
    businessName: "Demo Studio",
    contactName: "Billing Preview",
    email: "studio-preview@example.com",
    phone: "(858) 555-0162",
    accessStatus: "disabled",
  },
];

export const adminRetainers: PortalRetainer[] = [
  ...portalRetainers,
  {
    id: "retainer-law-care",
    clientId: "client-demo-law",
    packageCategory: "Hosting / Monitoring",
    quoteStatus: "accepted",
    billingStatus: "active",
    monthlyAmountCents: 39900,
    setupFeeCents: 0,
    terms: "Monthly hosting, updates, monitoring, and request review.",
    nextBillingDate: "Jul 1, 2026",
  },
  {
    id: "retainer-studio-support",
    clientId: "client-demo-studio",
    packageCategory: "Content Support",
    quoteStatus: "sent",
    billingStatus: "pending_payment",
    monthlyAmountCents: 59900,
    setupFeeCents: 0,
    terms: "Content support retainer for page updates, launch support, and request review.",
    nextBillingDate: "Pending checkout",
  },
];

export const adminRequests: PortalRequest[] = [
  ...portalRequests,
  {
    id: "request-law-services",
    clientId: "client-demo-law",
    retainerId: "retainer-law-care",
    title: "Refresh service page copy",
    description: "Update the service page intro and add a short section for consultation requests.",
    status: "Approved",
    priority: "Normal",
    scopeType: "Included in retainer",
    nextStep: "Ready for the next content update window.",
    clientVisibleNote: "Approved for the current care plan.",
    internalAdminNote: "Use the compact content layout.",
    lastUpdatedBy: "BarbaroTech",
    targetResponseAt: "2026-06-21T10:00:00-07:00",
    updatedAt: "2026-06-18",
    createdAt: "2026-06-16",
  },
  {
    id: "request-studio-gallery",
    clientId: "client-demo-studio",
    retainerId: "retainer-studio-support",
    title: "Add gallery images",
    description: "Prepare a new gallery section after the next batch of images is approved.",
    status: "Waiting",
    priority: "High",
    scopeType: "Needs approval",
    nextStep: "Waiting for final image selections.",
    clientVisibleNote: "Send final image choices before the next step.",
    internalAdminNote: "Confirm file sizes before implementation.",
    lastUpdatedBy: "Client",
    targetResponseAt: "2026-06-22T13:00:00-07:00",
    updatedAt: "2026-06-19",
    createdAt: "2026-06-18",
  },
];

export const requestColumns: RequestStatus[] = [
  "New",
  "Reviewing",
  "Approved",
  "In Progress",
  "Waiting",
  "Done",
];

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function getClientById(id: string) {
  return adminClients.find((client) => client.id === id);
}

export function getRetainersForClient(clientId: string) {
  return adminRetainers.filter((retainer) => retainer.clientId === clientId);
}

export function getRequestsForClient(clientId: string) {
  return adminRequests.filter((request) => request.clientId === clientId);
}
