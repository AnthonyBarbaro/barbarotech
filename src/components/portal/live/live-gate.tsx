"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { LockKeyhole, Settings, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isApiConfigured } from "@/lib/portal/api-client";
import {
  getAdminEmail,
  getPortalTokens,
  getPortalUser,
  isAnthonyAdmin,
  isCognitoConfigured,
  startManagedLogin,
} from "@/lib/portal/auth-client";

type GateMode = "client" | "admin";

type GateSnapshot = {
  ready: boolean;
  apiConfigured: boolean;
  cognitoConfigured: boolean;
  signedIn: boolean;
  anthonyAdmin: boolean;
  adminGroup: boolean;
  adminEmail: string;
  email: string;
};

const serverSnapshot: GateSnapshot = {
  ready: false,
  apiConfigured: false,
  cognitoConfigured: false,
  signedIn: false,
  anthonyAdmin: false,
  adminGroup: false,
  adminEmail: "anthony@barbaro.tech",
  email: "",
};

function readGateSnapshot(): string {
  if (typeof window === "undefined") return JSON.stringify(serverSnapshot);

  const user = getPortalUser();
  const snapshot: GateSnapshot = {
    ready: true,
    apiConfigured: isApiConfigured(),
    cognitoConfigured: isCognitoConfigured(),
    signedIn: Boolean(getPortalTokens()),
    anthonyAdmin: isAnthonyAdmin(user),
    adminGroup: Boolean(user?.groups.includes("admin")),
    adminEmail: getAdminEmail(),
    email: user?.email || "",
  };

  return JSON.stringify(snapshot);
}

function subscribeToAuth(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", callback);
  window.addEventListener("barbarotech:auth", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("barbarotech:auth", callback);
  };
}

function useGateSnapshot() {
  return JSON.parse(
    useSyncExternalStore(subscribeToAuth, readGateSnapshot, () => JSON.stringify(serverSnapshot))
  ) as GateSnapshot;
}

function GateCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof Settings;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <Icon className="h-6 w-6 text-sky-700" />
      <h2 className="mt-3 text-lg font-semibold text-slate-950">{title}</h2>
      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">{description}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

export function LiveGate({
  mode,
  returnTo,
  children,
}: {
  mode: GateMode;
  returnTo: string;
  children: ReactNode;
}) {
  const snapshot = useGateSnapshot();

  if (!snapshot.ready) {
    return (
      <GateCard
        icon={Settings}
        title="Preparing portal"
        description="Checking the live portal connection and Managed Login state."
      />
    );
  }

  if (!snapshot.cognitoConfigured) {
    return (
      <GateCard
        icon={Settings}
        title="Managed Login needs configuration"
        description="Set NEXT_PUBLIC_COGNITO_DOMAIN, NEXT_PUBLIC_COGNITO_CLIENT_ID, NEXT_PUBLIC_COGNITO_REDIRECT_URI, and NEXT_PUBLIC_COGNITO_LOGOUT_URI for this static frontend."
      />
    );
  }

  if (!snapshot.apiConfigured) {
    return (
      <GateCard
        icon={Settings}
        title="Live API needs configuration"
        description="Set NEXT_PUBLIC_API_BASE_URL to the API Gateway endpoint. The frontend will only call that public API URL and will not receive database or Stripe secrets."
      />
    );
  }

  if (!snapshot.signedIn) {
    return (
      <GateCard
        icon={LockKeyhole}
        title="Managed Login required"
        description="Sign in with Cognito Managed Login to access the live Client Portal."
      >
        <Button type="button" onClick={() => startManagedLogin(returnTo)} variant="primary">
          Managed Login
        </Button>
      </GateCard>
    );
  }

  if (mode === "admin" && (!snapshot.anthonyAdmin || !snapshot.adminGroup)) {
    return (
      <GateCard
        icon={ShieldAlert}
        title="Admin access is restricted"
        description={`Only ${snapshot.adminEmail} in the Cognito admin group can open the BarbaroTech admin portal.`}
      >
        {snapshot.email ? (
          <p className="text-sm font-semibold text-slate-700">Signed in as {snapshot.email}</p>
        ) : null}
      </GateCard>
    );
  }

  return <>{children}</>;
}
