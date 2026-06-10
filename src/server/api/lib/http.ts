import type { APIGatewayProxyResultV2 } from "aws-lambda";

export function json(
  body: unknown,
  statusCode = 200,
  headers: Record<string, string> = {}
): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  };
}

export function badRequest(message: string) {
  return json({ error: message }, 400);
}

export function unauthorized(message = "Unauthorized") {
  return json({ error: message }, 401);
}

export function forbidden(message = "Forbidden") {
  return json({ error: message }, 403);
}

export function notFound(message = "Not found") {
  return json({ error: message }, 404);
}

export function parseJsonBody<T>(body: string | undefined | null): T {
  if (!body) return {} as T;
  return JSON.parse(body) as T;
}
