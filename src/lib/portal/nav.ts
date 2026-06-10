import {
  BriefcaseBusiness,
  CreditCard,
  LayoutDashboard,
  ListChecks,
  Users,
} from "lucide-react";
import type { DashboardNavItem } from "./types";

export const clientNavItems: DashboardNavItem[] = [
  { href: "/portal/", label: "Overview", icon: LayoutDashboard },
  { href: "/portal/requests/", label: "Requests", icon: ListChecks },
  { href: "/portal/billing/", label: "Billing", icon: CreditCard },
];

export const adminNavItems: DashboardNavItem[] = [
  { href: "/admin/", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/clients/", label: "Clients", icon: Users },
  { href: "/admin/requests/", label: "Requests", icon: ListChecks },
  { href: "/admin/billing/", label: "Billing", icon: CreditCard },
  { href: "/portal/", label: "Client View", icon: BriefcaseBusiness },
];
