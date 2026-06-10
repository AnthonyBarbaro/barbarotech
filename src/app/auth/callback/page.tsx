"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { completeManagedLogin } from "@/lib/portal/auth-client";

export default function AuthCallbackPage() {
  const [message, setMessage] = useState("Completing Managed Login...");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const error = params.get("error");

    async function finishLogin() {
      if (error) {
        throw new Error(params.get("error_description") || error);
      }

      if (!code || !state) {
        throw new Error("Missing Cognito authorization code.");
      }

      const returnTo = await completeManagedLogin(code, state);
      window.location.replace(returnTo);
    }

    finishLogin().catch((loginError: unknown) => {
      setFailed(true);
      setMessage(loginError instanceof Error ? loginError.message : "Managed Login failed.");
    });
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-5 text-slate-950">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">BarbaroTech</p>
        <h1 className="mt-2 text-2xl font-semibold">Client Portal</h1>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        {failed ? (
          <Link
            href="/portal/"
            className="mt-5 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
          >
            Back to portal
          </Link>
        ) : null}
      </div>
    </main>
  );
}
