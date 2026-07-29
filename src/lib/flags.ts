function parseBooleanEnv(value: string | undefined, fallback: boolean) {
  if (!value) return fallback;

  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;

  return fallback;
}

export function isContactIntakeEnabled() {
  const isStaticExport =
    process.env.STATIC_EXPORT === "1" || process.env.STATIC_EXPORT?.toLowerCase() === "true";

  if (isStaticExport) return false;

  return parseBooleanEnv(
    process.env.CONTACT_INTAKE_ENABLED ?? process.env.NEXT_PUBLIC_CONTACT_INTAKE_ENABLED,
    false
  );
}
