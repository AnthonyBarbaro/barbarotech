import { PRICING } from "@/data/pricing";

export type CallTimeSlot = {
  id: string;
  ptMinutes: number;
  ptLabel: string;
  etLabel: string;
};

function format12Hour(totalMinutes: number) {
  let hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const suffix = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  if (hours === 0) hours = 12;
  const minuteText = minutes === 0 ? "00" : String(minutes);
  return `${hours}:${minuteText} ${suffix}`;
}

function buildCallTimeSlots() {
  const slots: CallTimeSlot[] = [];
  const startMinutesPacific = 10 * 60; // 10:00 AM PT
  const endMinutesPacific = 15 * 60; // 3:00 PM PT (6:00 PM ET)

  for (let minutes = startMinutesPacific; minutes <= endMinutesPacific; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const id = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

    slots.push({
      id,
      ptMinutes: minutes,
      ptLabel: format12Hour(minutes),
      etLabel: format12Hour(minutes + 3 * 60),
    });
  }

  return slots;
}

const pricingPlanNames = [
  ...PRICING.staticWebsites,
  ...PRICING.existingSites,
  ...PRICING.backendWebsites,
].map((plan) => plan.name);

export const SERVICE_PLAN_OPTIONS = [
  "Not sure yet",
  ...pricingPlanNames,
  "Custom Web App",
  "Ongoing Maintenance",
  "Other",
] as const;

export const CALL_TIME_SLOTS = buildCallTimeSlots();

export const TIMEZONE_OPTIONS = [
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Phoenix",
  "Pacific/Honolulu",
  "UTC",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
] as const;

const TIMEZONE_ALIASES: Record<string, string> = {
  "Etc/GMT+8": "America/Los_Angeles",
  "Etc/GMT+7": "America/Denver",
  "Etc/GMT+6": "America/Chicago",
  "Etc/GMT+5": "America/New_York",
  "Etc/UTC": "UTC",
};

export function isValidTimeZone(value: string) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

export function normalizeTimeZone(rawValue: string) {
  const trimmed = rawValue.trim();
  if (!trimmed) return "America/Los_Angeles";

  const mapped = TIMEZONE_ALIASES[trimmed] || trimmed;
  if (isValidTimeZone(mapped)) return mapped;

  return "America/Los_Angeles";
}

export function formatTimeZoneOptionLabel(timeZone: string) {
  const city = timeZone.includes("/")
    ? timeZone.split("/").pop()?.replace(/_/g, " ") || timeZone
    : timeZone;

  try {
    const timeZoneName =
      new Intl.DateTimeFormat("en-US", {
        timeZone,
        timeZoneName: "short",
      })
        .formatToParts(new Date())
        .find((part) => part.type === "timeZoneName")?.value || "";

    if (!timeZoneName) {
      return `${city} (${timeZone})`;
    }

    return `${city} (${timeZoneName})`;
  } catch {
    return city;
  }
}

export function getUpcomingCallDates(maxDaysAhead = 7) {
  const dates: Array<{ value: string; label: string; weekday: string }> = [];
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const now = new Date();

  for (let offset = 1; offset <= maxDaysAhead; offset += 1) {
    const date = new Date(now);
    date.setDate(now.getDate() + offset);

    const weekdayIndex = date.getDay();
    if (weekdayIndex === 0 || weekdayIndex === 6) {
      continue;
    }

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const label = formatter.format(date);
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][weekdayIndex] || "";

    dates.push({
      value: `${yyyy}-${mm}-${dd}`,
      label,
      weekday,
    });
  }

  return dates;
}
