import Link from "next/link";
import type { DashboardNavItem } from "@/lib/portal/types";

export function Sidebar({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: DashboardNavItem[];
}) {
  return (
    <aside className="border-b border-slate-200 bg-white lg:min-h-full lg:w-64 lg:border-b-0 lg:border-r">
      <div className="px-5 py-5">
        <p className="text-sm font-semibold text-slate-950">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <nav className="flex gap-2 overflow-x-auto px-3 pb-3 lg:grid lg:overflow-visible lg:px-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-w-fit items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 lg:min-w-0"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
