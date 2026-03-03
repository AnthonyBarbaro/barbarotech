export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function formatUsPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 10);
  if (!digits) return "";

  if (digits.length <= 3) {
    return `(${digits}`;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function isValidUsPhone(value: string) {
  return onlyDigits(value).length === 10;
}
