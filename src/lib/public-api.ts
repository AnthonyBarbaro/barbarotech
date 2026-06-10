export function getPublicApiEndpoint(apiPath: string, localFallback: string) {
  const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
  if (!baseUrl) return localFallback;

  const normalizedPath = apiPath.startsWith("/") ? apiPath : `/${apiPath}`;
  return `${baseUrl}${normalizedPath}`;
}
