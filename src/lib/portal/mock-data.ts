import type { PortalClient, PortalRequest, PortalRetainer, RequestStatus } from "./types";

export const portalClient: PortalClient = {
  id: "client-island-view",
  businessName: "Island View Market",
  contactName: "Anthony Demo",
  email: "client@example.com",
  phone: "(619) 555-0148",
  accessStatus: "invited",
};

export const portalRetainers: PortalRetainer[] = [
  {
    id: "retainer-growth-care",
    clientId: portalClient.id,
    packageCategory: "Website Care",
    quoteStatus: "sent",
    billingStatus: "pending_payment",
    monthlyAmountCents: 24900,
    setupFeeCents: 50000,
    terms: "Monthly care plan for site updates, request review, and billing visibility.",
    nextBillingDate: "Pending checkout",
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
    targetResponseAt: "Today by 4:00 PM",
    updatedAt: "2026-06-09",
    createdAt: "2026-06-08",
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
    targetResponseAt: "Tomorrow by 12:00 PM",
    updatedAt: "2026-06-09",
    createdAt: "2026-06-09",
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
    updatedAt: "2026-06-07",
    createdAt: "2026-06-06",
  },
];

export const adminClients: PortalClient[] = [
  portalClient,
  {
    id: "client-farida-law",
    businessName: "Farida Law",
    contactName: "Farida Demo",
    email: "farida@example.com",
    phone: "(619) 555-0199",
    accessStatus: "active",
  },
  {
    id: "client-smoking-bee",
    businessName: "The Smoking Bee",
    contactName: "Shopify Demo",
    email: "bee@example.com",
    phone: "(858) 555-0162",
    accessStatus: "disabled",
  },
];

export const adminRetainers: PortalRetainer[] = [
  ...portalRetainers,
  {
    id: "retainer-law-care",
    clientId: "client-farida-law",
    packageCategory: "Hosting / Monitoring",
    quoteStatus: "accepted",
    billingStatus: "active",
    monthlyAmountCents: 39900,
    setupFeeCents: 0,
    terms: "Monthly hosting, updates, monitoring, and request review.",
    nextBillingDate: "Jul 1, 2026",
  },
  {
    id: "retainer-shopify-support",
    clientId: "client-smoking-bee",
    packageCategory: "Shopify Support",
    quoteStatus: "accepted",
    billingStatus: "past_due",
    monthlyAmountCents: 59900,
    setupFeeCents: 0,
    terms: "Shopify support retainer for theme improvements and conversion updates.",
    nextBillingDate: "Past due",
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
  return portalRequests.filter((request) => request.clientId === clientId);
}
