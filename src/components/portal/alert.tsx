import type { ReactNode } from "react";

export function PortalAlert({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950">
      <p className="font-semibold">{title}</p>
      <div className="mt-1 text-sky-900">{children}</div>
    </div>
  );
}
