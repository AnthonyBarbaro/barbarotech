import type { LucideIcon } from "lucide-react";

export type ClientAccessStatus = "invited" | "active" | "disabled";

export type RetainerQuoteStatus = "draft" | "sent" | "accepted" | "expired" | "void";

export type RetainerBillingStatus =
  | "draft"
  | "checkout_created"
  | "pending_payment"
  | "incomplete"
  | "active"
  | "past_due"
  | "unpaid"
  | "canceled";

export type RequestStatus = "New" | "Reviewing" | "Approved" | "In Progress" | "Waiting" | "Done";

export type ScopeType =
  | "Included in retainer"
  | "Needs approval"
  | "Out of scope"
  | "Quoted separately";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type PortalClient = {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  accessStatus: ClientAccessStatus;
  cognitoUserId?: string | null;
  stripeCustomerId?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type PortalRetainer = {
  id: string;
  clientId: string;
  packageCategory: string;
  quoteStatus: RetainerQuoteStatus;
  billingStatus: RetainerBillingStatus;
  monthlyAmountCents: number;
  setupFeeCents: number;
  terms?: string | null;
  stripeCheckoutSessionId?: string | null;
  stripeSubscriptionId?: string | null;
  createdAt?: string;
  updatedAt?: string;
  nextBillingDate?: string;
};

export type PortalRequest = {
  id: string;
  clientId: string;
  retainerId?: string;
  title: string;
  description: string;
  status: RequestStatus;
  priority: "Low" | "Normal" | "High" | "Urgent";
  scopeType: ScopeType;
  nextStep: string;
  clientVisibleNote?: string;
  internalAdminNote?: string;
  lastUpdatedBy: string;
  targetResponseAt?: string;
  updatedAt: string;
  createdAt: string;
};

export type PortalAttachment = {
  id: string;
  requestId: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
};
