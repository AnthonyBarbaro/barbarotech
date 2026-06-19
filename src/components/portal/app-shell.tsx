import type { ReactNode } from "react";
import type { DashboardNavItem } from "@/lib/portal/types";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

export function AppShell({
  title,
  subtitle,
  eyebrow,
  pageTitle,
  description,
  navItems,
  actionHref,
  actionLabel,
  children,
}: {
  title: string;
  subtitle: string;
  eyebrow: string;
  pageTitle: string;
  description: string;
  navItems: DashboardNavItem[];
  actionHref?: string;
  actionLabel?: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-slate-200 bg-slate-100 text-slate-950">
      <div className="mx-auto flex min-h-[760px] max-w-[1480px] flex-col border-x border-slate-200 bg-slate-50 lg:flex-row">
        <Sidebar title={title} subtitle={subtitle} items={navItems} />
        <section className="min-w-0 flex-1">
          <TopBar
            eyebrow={eyebrow}
            title={pageTitle}
            description={description}
            actionHref={actionHref}
            actionLabel={actionLabel}
          />
          <div className="px-5 py-6">{children}</div>
        </section>
      </div>
    </div>
  );
}
