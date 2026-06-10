import type { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";
import { describe, expect, it } from "vitest";
import { getAuthContext, requireAdmin } from "../lib/auth";

function eventWithGroups(groups: unknown, email = "anthony@barbaro.tech") {
  return {
    requestContext: {
      authorizer: {
        jwt: {
          claims: {
            sub: "cognito-sub-1",
            username: "anthony",
            email,
            client_id: "portal-client",
            scope: "openid email",
            "cognito:groups": groups,
          },
        },
      },
    },
  } as unknown as APIGatewayProxyEventV2WithJWTAuthorizer;
}

describe("getAuthContext", () => {
  it("parses comma-separated Cognito groups", () => {
    const auth = getAuthContext(eventWithGroups("admin,client"));
    expect(auth.groups).toEqual(["admin", "client"]);
  });

  it("parses JSON-array Cognito groups", () => {
    const auth = getAuthContext(eventWithGroups('["client"]'));
    expect(auth.groups).toEqual(["client"]);
  });

  it("keeps required JWT claims", () => {
    const auth = getAuthContext(eventWithGroups("client"));
    expect(auth.sub).toBe("cognito-sub-1");
    expect(auth.clientId).toBe("portal-client");
    expect(auth.scope).toBe("openid email");
  });

  it("allows only Anthony through admin authorization", async () => {
    const auth = await requireAdmin(eventWithGroups("admin"));
    expect(auth.email).toBe("anthony@barbaro.tech");
  });

  it("rejects admin group members with a different email", async () => {
    try {
      await requireAdmin(eventWithGroups("admin", "someone@example.com"));
      throw new Error("Expected requireAdmin to reject a non-Anthony admin.");
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 403,
      });
    }
  });

  it("allows Anthony by Cognito sub when the access token has no email claim", async () => {
    process.env.ADMIN_COGNITO_SUB = "cognito-sub-1";
    const auth = await requireAdmin(eventWithGroups("admin", ""));
    expect(auth.sub).toBe("cognito-sub-1");
    delete process.env.ADMIN_COGNITO_SUB;
  });
});
