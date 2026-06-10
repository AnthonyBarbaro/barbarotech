import type { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";
import { AdminListGroupsForUserCommand, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { forbidden, unauthorized } from "./http";

export type AuthContext = {
  sub: string;
  username: string;
  email: string;
  clientId: string;
  scope: string;
  groups: string[];
};

function normalizeGroups(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value !== "string") return [];

  const trimmed = value.trim();
  if (!trimmed) return [];

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      return [];
    }
  }

  return trimmed.split(",").map((item) => item.trim()).filter(Boolean);
}

let cognito: CognitoIdentityProviderClient | undefined;

function getCognito() {
  if (!cognito) {
    cognito = new CognitoIdentityProviderClient({});
  }
  return cognito;
}

async function getCognitoGroups(auth: AuthContext) {
  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  const username = auth.username || auth.sub;

  if (!userPoolId || !username) return [];

  const response = await getCognito().send(
    new AdminListGroupsForUserCommand({
      UserPoolId: userPoolId,
      Username: username,
    })
  );

  return response.Groups?.map((group) => group.GroupName).filter(Boolean) as string[];
}

export function getAuthContext(event: APIGatewayProxyEventV2WithJWTAuthorizer): AuthContext {
  const claims = event.requestContext.authorizer?.jwt?.claims || {};
  const sub = String(claims.sub || "");
  const username = String(claims.username || claims["cognito:username"] || "");
  const email = String(claims.email || "");
  const clientId = String(claims.client_id || "");
  const scope = String(claims.scope || "");
  const groups = normalizeGroups(claims["cognito:groups"]);

  if (!sub) {
    throw new Error("Missing Cognito sub claim.");
  }

  return {
    sub,
    username,
    email,
    clientId,
    scope,
    groups,
  };
}

export function requireAuth(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
  try {
    return getAuthContext(event);
  } catch {
    throw unauthorized();
  }
}

export async function requireAdmin(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
  const auth = requireAuth(event);
  const adminEmail = (process.env.ADMIN_EMAIL || "anthony@barbaro.tech").toLowerCase();
  const adminCognitoSub = process.env.ADMIN_COGNITO_SUB || "";
  const groups = auth.groups.includes("admin") ? auth.groups : await getCognitoGroups(auth);

  if (!groups.includes("admin")) {
    throw forbidden("Admin access is required.");
  }

  const matchesAdminEmail = auth.email.toLowerCase() === adminEmail;
  const matchesAdminSub = Boolean(adminCognitoSub && (auth.sub === adminCognitoSub || auth.username === adminCognitoSub));

  if (!matchesAdminEmail && !matchesAdminSub) {
    throw forbidden(`Admin access is restricted to ${adminEmail}.`);
  }

  return auth;
}

export function requireClient(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
  const auth = requireAuth(event);
  if (!auth.groups.includes("client")) {
    throw forbidden("Client access is required.");
  }
  return auth;
}
