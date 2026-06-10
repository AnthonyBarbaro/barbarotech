"use client";

import { getAuthHeader } from "./auth-client";

export class PortalApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
  }
}

export function getApiBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
}

export function isApiConfigured() {
  return Boolean(getApiBaseUrl());
}

export async function portalApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    throw new PortalApiError("NEXT_PUBLIC_API_BASE_URL is not configured.", 0);
  }

  const headers = new Headers(init.headers);
  const authHeaders = getAuthHeader();
  Object.entries(authHeaders).forEach(([key, value]) => headers.set(key, value));

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    let message = `API request failed with status ${response.status}.`;
    try {
      const payload = (await response.json()) as { error?: string };
      if (payload.error) message = payload.error;
    } catch {
      const text = await response.text();
      if (text) message = text;
    }
    throw new PortalApiError(message, response.status);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}
