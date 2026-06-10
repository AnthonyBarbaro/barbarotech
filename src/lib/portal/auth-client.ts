"use client";

const tokenStorageKey = "barbarotech.portal.tokens";
const stateStorageKey = "barbarotech.portal.oauth.state";
const verifierStorageKey = "barbarotech.portal.oauth.verifier";
const returnToStorageKey = "barbarotech.portal.oauth.returnTo";

export type PortalTokens = {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  expiresAt: number;
};

export type PortalUser = {
  sub: string;
  email: string;
  groups: string[];
};

function notifyAuthChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("barbarotech:auth"));
  }
}

function base64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function randomString(length = 64) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return base64Url(bytes);
}

async function sha256(value: string) {
  const encoded = new TextEncoder().encode(value);
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encoded));
}

function getCognitoConfig() {
  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN || "";
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";
  const redirectUri =
    process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI ||
    (typeof window !== "undefined" ? `${window.location.origin}/auth/callback/` : "");
  const logoutUri =
    process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URI ||
    (typeof window !== "undefined" ? `${window.location.origin}/` : "");

  return {
    domain: domain.replace(/\/+$/, ""),
    clientId,
    redirectUri,
    logoutUri,
  };
}

export function isCognitoConfigured() {
  const config = getCognitoConfig();
  return Boolean(config.domain && config.clientId && config.redirectUri);
}

export async function startManagedLogin(returnTo = "/portal/") {
  const config = getCognitoConfig();
  if (!isCognitoConfigured()) {
    throw new Error("Cognito Managed Login is missing NEXT_PUBLIC_COGNITO_DOMAIN or NEXT_PUBLIC_COGNITO_CLIENT_ID.");
  }

  const verifier = randomString(48);
  const challenge = base64Url(await sha256(verifier));
  const state = randomString(24);

  sessionStorage.setItem(verifierStorageKey, verifier);
  sessionStorage.setItem(stateStorageKey, state);
  sessionStorage.setItem(returnToStorageKey, returnTo);

  const params = new URLSearchParams({
    client_id: config.clientId,
    response_type: "code",
    redirect_uri: config.redirectUri,
    scope: "openid email profile",
    code_challenge_method: "S256",
    code_challenge: challenge,
    state,
  });

  window.location.href = `${config.domain}/oauth2/authorize?${params.toString()}`;
}

export async function completeManagedLogin(code: string, state: string) {
  const config = getCognitoConfig();
  const expectedState = sessionStorage.getItem(stateStorageKey);
  const verifier = sessionStorage.getItem(verifierStorageKey);

  if (!expectedState || expectedState !== state) {
    throw new Error("Login state did not match. Start Managed Login again.");
  }

  if (!verifier) {
    throw new Error("Missing PKCE verifier. Start Managed Login again.");
  }

  const response = await fetch(`${config.domain}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: config.clientId,
      code,
      redirect_uri: config.redirectUri,
      code_verifier: verifier,
    }),
  });

  if (!response.ok) {
    throw new Error("Cognito token exchange failed.");
  }

  const tokenResponse = (await response.json()) as {
    access_token: string;
    id_token: string;
    refresh_token?: string;
    expires_in: number;
  };

  const tokens: PortalTokens = {
    accessToken: tokenResponse.access_token,
    idToken: tokenResponse.id_token,
    refreshToken: tokenResponse.refresh_token,
    expiresAt: Date.now() + tokenResponse.expires_in * 1000,
  };

  localStorage.setItem(tokenStorageKey, JSON.stringify(tokens));
  sessionStorage.removeItem(verifierStorageKey);
  sessionStorage.removeItem(stateStorageKey);
  notifyAuthChanged();

  return sessionStorage.getItem(returnToStorageKey) || "/portal/";
}

export function getPortalTokens() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(tokenStorageKey);
  if (!raw) return null;

  try {
    const tokens = JSON.parse(raw) as PortalTokens;
    if (!tokens.accessToken || tokens.expiresAt <= Date.now()) return null;
    return tokens;
  } catch {
    return null;
  }
}

function decodeJwtPayload(token: string) {
  const [, payload] = token.split(".");
  if (!payload) return null;

  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    return JSON.parse(atob(padded)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function normalizeGroups(value: unknown) {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") return value.split(",").map((group) => group.trim()).filter(Boolean);
  return [];
}

export function getPortalUser(): PortalUser | null {
  const tokens = getPortalTokens();
  if (!tokens) return null;

  const claims = decodeJwtPayload(tokens.idToken) || decodeJwtPayload(tokens.accessToken);
  if (!claims) return null;

  return {
    sub: String(claims.sub || ""),
    email: String(claims.email || claims.username || ""),
    groups: normalizeGroups(claims["cognito:groups"]),
  };
}

export function getAdminEmail() {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "anthony@barbaro.tech").toLowerCase();
}

export function isAnthonyAdmin(user = getPortalUser()) {
  return Boolean(user?.email && user.email.toLowerCase() === getAdminEmail());
}

export function clearPortalTokens() {
  localStorage.removeItem(tokenStorageKey);
  sessionStorage.removeItem(verifierStorageKey);
  sessionStorage.removeItem(stateStorageKey);
  sessionStorage.removeItem(returnToStorageKey);
  notifyAuthChanged();
}

export function signOutManagedLogin() {
  const config = getCognitoConfig();
  clearPortalTokens();

  if (!isCognitoConfigured()) {
    window.location.href = "/";
    return;
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    logout_uri: config.logoutUri,
  });

  window.location.href = `${config.domain}/logout?${params.toString()}`;
}

export function getAuthHeader() {
  const tokens = getPortalTokens();
  return tokens ? { Authorization: `Bearer ${tokens.accessToken}` } : {};
}
