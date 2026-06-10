"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { QuickCommandDock } from "@/components/quick-command-dock";
import { SiteEffects } from "@/components/site-effects";

function isDashboardPath(pathname: string) {
  return pathname === "/portal" ||
    pathname.startsWith("/portal/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/");
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";

  if (isDashboardPath(pathname)) {
    return (
      <div className="min-h-screen bg-slate-100">
        {children}
      </div>
    );
  }

  return (
    <>
      <SiteEffects />
      <div className="app-shell flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-grid-light pb-24 md:pb-28">
          {children}
        </main>
        <Footer />
      </div>
      <QuickCommandDock />
    </>
  );
}
