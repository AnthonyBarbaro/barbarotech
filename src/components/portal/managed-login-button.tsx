"use client";

import { useSyncExternalStore } from "react";
import { LogIn, LogOut, ShieldCheck } from "lucide-react";
import {
  getPortalTokens,
  isCognitoConfigured,
  signOutManagedLogin,
  startManagedLogin,
} from "@/lib/portal/auth-client";

function readLoginSnapshot() {
  if (typeof window === "undefined") return JSON.stringify({ configured: false, signedIn: false });
  return JSON.stringify({
    configured: isCognitoConfigured(),
    signedIn: Boolean(getPortalTokens()),
  });
}

function subscribeToLogin(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", callback);
  window.addEventListener("barbarotech:auth", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("barbarotech:auth", callback);
  };
}

export function ManagedLoginButton({ returnTo = "/portal/" }: { returnTo?: string }) {
  const { configured, signedIn } = JSON.parse(
    useSyncExternalStore(subscribeToLogin, readLoginSnapshot, () =>
      JSON.stringify({ configured: false, signedIn: false })
    )
  ) as { configured: boolean; signedIn: boolean };

  if (!configured) {
    return (
      <span
        className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800"
        title="Set NEXT_PUBLIC_COGNITO_DOMAIN and NEXT_PUBLIC_COGNITO_CLIENT_ID to enable Managed Login."
      >
        <ShieldCheck className="h-3.5 w-3.5" />
        Login setup needed
      </span>
    );
  }

  if (signedIn) {
    return (
      <button
        type="button"
        onClick={signOutManagedLogin}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
      >
        <LogOut className="h-3.5 w-3.5" />
        Sign Out
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => startManagedLogin(returnTo)}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
    >
      <LogIn className="h-3.5 w-3.5" />
      Managed Login
    </button>
  );
}
