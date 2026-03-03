"use client";

import { useMemo, useState } from "react";
import {
  CALL_TIME_SLOTS,
  formatTimeZoneOptionLabel,
  getUpcomingCallDates,
  normalizeTimeZone,
  TIMEZONE_OPTIONS,
  type CallTimeSlot,
} from "@/data/contact";
import { formatUsPhone, isValidUsPhone } from "@/lib/forms";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CallFormState = {
  name: string;
  email: string;
  business: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  method: "Zoom" | "Phone";
  notes: string;
  fax: string;
};

type DateParts = {
  year: number;
  month: number;
  day: number;
};

type SlotDisplay = {
  localTimeLabel: string;
  localDateLabel: string;
  referenceLabel: string;
};

const INPUT_CLASS =
  "w-full rounded-2xl border border-slate-900/10 bg-white/90 px-3.5 py-2.5 text-sm text-slate-900 " +
  "placeholder:text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] focus:outline-none focus:ring-4 focus:ring-sky-300/30";

const PACIFIC_TIME_ZONE = "America/Los_Angeles";

const METHOD_OPTIONS: Array<{
  value: "Zoom" | "Phone";
  label: string;
  detail: string;
  tag: string;
}> = [
  {
    value: "Zoom",
    label: "Zoom Meeting",
    detail: "Best for strategy walkthroughs and screen share.",
    tag: "Most Popular",
  },
  {
    value: "Phone",
    label: "Phone Call",
    detail: "Quick call if you prefer no video.",
    tag: "Audio Only",
  },
];

function parseIsoDate(value: string): DateParts | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (!year || !month || !day) return null;

  return { year, month, day };
}

function getTimeZoneOffsetMs(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    hourCycle: "h23",
  }).formatToParts(date);

  const values: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  }

  const asUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second)
  );

  return asUtc - date.getTime();
}

function zonedTimeToUtc(dateParts: DateParts, hour: number, minute: number, timeZone: string) {
  const guessUtc = Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, hour, minute, 0);
  const firstOffset = getTimeZoneOffsetMs(new Date(guessUtc), timeZone);
  let result = new Date(guessUtc - firstOffset);

  const secondOffset = getTimeZoneOffsetMs(result, timeZone);
  if (secondOffset !== firstOffset) {
    result = new Date(guessUtc - secondOffset);
  }

  return result;
}

function getSlotDisplay(slot: CallTimeSlot, dateValue: string, timeZone: string): SlotDisplay {
  const parsed = parseIsoDate(dateValue);
  const now = new Date();

  const dateParts = parsed || {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };

  const hour = Math.floor(slot.ptMinutes / 60);
  const minute = slot.ptMinutes % 60;

  const instant = zonedTimeToUtc(dateParts, hour, minute, PACIFIC_TIME_ZONE);

  const localTimeLabel = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(instant);

  const localDateLabel = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(instant);

  return {
    localTimeLabel,
    localDateLabel,
    referenceLabel: `${slot.ptLabel} PT / ${slot.etLabel} ET`,
  };
}

export function CallBookingForm({ context }: { context?: string }) {
  const dateOptions = useMemo(() => getUpcomingCallDates(7), []);

  const detectedTimeZone = useMemo(() => {
    const raw = Intl.DateTimeFormat().resolvedOptions().timeZone || PACIFIC_TIME_ZONE;
    return normalizeTimeZone(raw);
  }, []);

  const [state, setState] = useState<CallFormState>({
    name: "",
    email: "",
    business: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    timezone: detectedTimeZone,
    method: "Zoom",
    notes: "",
    fax: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const selectedDate = dateOptions.find((date) => date.value === state.preferredDate);
  const selectedSlot = CALL_TIME_SLOTS.find((slot) => slot.id === state.preferredTime);
  const previewDateValue = state.preferredDate || dateOptions[0]?.value || "";

  const slotLabels = useMemo(() => {
    const mapped: Record<string, SlotDisplay> = {};
    for (const slot of CALL_TIME_SLOTS) {
      mapped[slot.id] = getSlotDisplay(slot, previewDateValue, state.timezone);
    }
    return mapped;
  }, [previewDateValue, state.timezone]);

  const selectedSlotDisplay = selectedSlot ? slotLabels[selectedSlot.id] : null;

  const timeZoneOptions = useMemo(() => {
    const ordered = [...TIMEZONE_OPTIONS] as string[];

    if (!ordered.includes(detectedTimeZone)) {
      ordered.unshift(detectedTimeZone);
    }

    if (state.timezone && !ordered.includes(state.timezone)) {
      ordered.unshift(state.timezone);
    }

    return Array.from(new Set(ordered));
  }, [detectedTimeZone, state.timezone]);

  const requiresPhone = state.method === "Phone";

  const canSubmit = useMemo(() => {
    const hasRequired =
      state.name.trim().length > 0 &&
      state.email.trim().length > 0 &&
      state.preferredDate.trim().length > 0 &&
      state.preferredTime.trim().length > 0 &&
      state.fax.trim().length === 0;

    if (!hasRequired) return false;
    if (requiresPhone && !isValidUsPhone(state.phone)) return false;

    return true;
  }, [requiresPhone, state]);

  const update =
    (key: keyof CallFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const rawValue = event.target.value;

      setState((prev) => {
        if (key === "phone") {
          return { ...prev, phone: formatUsPhone(rawValue) };
        }

        if (key === "timezone") {
          return { ...prev, timezone: normalizeTimeZone(rawValue) };
        }

        return { ...prev, [key]: rawValue };
      });

      if (status !== "idle") {
        setStatus("idle");
        setFeedback("");
      }
    };

  function selectMethod(method: "Zoom" | "Phone") {
    setState((prev) => ({ ...prev, method }));
    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  }

  function selectDate(value: string) {
    setState((prev) => ({ ...prev, preferredDate: value }));
    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  }

  function selectTime(value: string) {
    setState((prev) => ({ ...prev, preferredTime: value }));
    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  }

  function applyLocalTimezone() {
    setState((prev) => ({ ...prev, timezone: detectedTimeZone }));
    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit || status === "submitting") return;

    setStatus("submitting");
    setFeedback("");

    const resolvedPreferredTime = selectedSlot && selectedSlotDisplay
      ? `${selectedSlotDisplay.localTimeLabel} (${selectedSlotDisplay.localDateLabel}) | ${selectedSlotDisplay.referenceLabel}`
      : state.preferredTime;

    try {
      const response = await fetch("/api/call-request/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...state,
          preferredTime: resolvedPreferredTime,
          context: context || "",
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to send call request.");
      }

      setStatus("success");
      setFeedback("Call request sent. I will confirm this slot or send the closest option.");
      setState((prev) => ({
        ...prev,
        name: "",
        email: "",
        business: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        notes: "",
        fax: "",
      }));
    } catch (error) {
      setStatus("error");
      const message = error instanceof Error ? error.message : "Failed to send call request.";
      setFeedback(message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={state.fax}
        onChange={update("fax")}
      />

      <div className="rounded-2xl border border-slate-900/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.98),rgba(236,249,255,0.72))] p-3 sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-700">Meeting Type</label>
            <p className="text-xs text-slate-500">Choose the call format you prefer.</p>
          </div>
          <span className="rounded-full border border-slate-900/15 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
            Step 1
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {METHOD_OPTIONS.map((option) => {
            const selected = state.method === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => selectMethod(option.value)}
                className={cn(
                  "rounded-2xl border px-3 py-3 text-left transition",
                  selected
                    ? "border-cyan-400/45 bg-slate-900 text-white shadow-[0_10px_22px_rgba(15,23,42,0.3)]"
                    : "border-slate-900/10 bg-white text-slate-600 hover:border-slate-900/20 hover:text-slate-900"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold">{option.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]",
                      selected
                        ? "border border-cyan-300/45 bg-cyan-400/20 text-cyan-100"
                        : "border border-slate-900/10 bg-slate-100 text-slate-500"
                    )}
                  >
                    {selected ? "Selected" : option.tag}
                  </span>
                </div>
                <p className={cn("mt-1.5 text-xs", selected ? "text-slate-200" : "text-slate-500")}>
                  {option.detail}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 rounded-2xl border border-slate-900/10 bg-white/80 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">Pick a Date *</label>
          <span className="rounded-full border border-slate-900/15 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
            Step 2
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {dateOptions.map((date) => {
            const selected = state.preferredDate === date.value;
            return (
              <button
                key={date.value}
                type="button"
                onClick={() => selectDate(date.value)}
                className={cn(
                  "rounded-2xl border px-3 py-2 text-left transition",
                  selected
                    ? "border-cyan-500/40 bg-cyan-50 text-slate-900"
                    : "border-slate-900/10 bg-white text-slate-600 hover:border-slate-900/20 hover:text-slate-900"
                )}
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em]">{date.weekday}</div>
                <div className="text-sm font-semibold">{date.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 rounded-2xl border border-slate-900/10 bg-white/80 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">Timezone</label>
          <span className="rounded-full border border-slate-900/15 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
            Step 3
          </span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <select className={INPUT_CLASS} value={state.timezone} onChange={update("timezone")}>
            {timeZoneOptions.map((timeZone) => (
              <option key={timeZone} value={timeZone}>
                {formatTimeZoneOptionLabel(timeZone)}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={applyLocalTimezone}
            className="rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900/20 hover:text-slate-900"
          >
            Use My Local Time
          </button>
        </div>
        <p className="text-[11px] text-slate-500">
          Detected timezone: <span className="font-semibold text-slate-700">{formatTimeZoneOptionLabel(detectedTimeZone)}</span>
        </p>
      </div>

      <div className="space-y-2 rounded-2xl border border-slate-900/10 bg-white/80 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">Pick a Time *</label>
          <span className="rounded-full border border-slate-900/15 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
            Step 4
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {CALL_TIME_SLOTS.map((slot) => {
            const selected = state.preferredTime === slot.id;
            const display = slotLabels[slot.id];
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => selectTime(slot.id)}
                className={cn(
                  "rounded-2xl border px-3 py-2 text-left transition",
                  selected
                    ? "border-cyan-500/40 bg-cyan-50 text-slate-900"
                    : "border-slate-900/10 bg-white text-slate-600 hover:border-slate-900/20 hover:text-slate-900"
                )}
              >
                <div className="text-sm font-semibold">{display.localTimeLabel}</div>
                <div className={cn("text-xs", selected ? "text-slate-600" : "text-slate-500")}>{display.localDateLabel}</div>
                <div className={cn("text-[11px]", selected ? "text-slate-500" : "text-slate-400")}>{display.referenceLabel}</div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && selectedSlotDisplay && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-3 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700">Selected Slot</p>
          <p className="text-sm font-semibold text-emerald-900">
            {selectedSlotDisplay.localDateLabel} at {selectedSlotDisplay.localTimeLabel}
          </p>
          <p className="text-xs text-emerald-800/80">{selectedSlotDisplay.referenceLabel}</p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={INPUT_CLASS}
          placeholder="Name *"
          autoComplete="name"
          value={state.name}
          onChange={update("name")}
        />
        <input
          className={INPUT_CLASS}
          placeholder="Business"
          autoComplete="organization"
          value={state.business}
          onChange={update("business")}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={INPUT_CLASS}
          placeholder="Email *"
          autoComplete="email"
          type="email"
          value={state.email}
          onChange={update("email")}
        />
        <input
          className={INPUT_CLASS}
          placeholder={requiresPhone ? "Phone (required for phone calls)" : "Phone"}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={14}
          value={state.phone}
          onChange={update("phone")}
        />
      </div>

      <textarea
        className={`${INPUT_CLASS} min-h-[100px]`}
        placeholder="Anything specific to cover?"
        value={state.notes}
        onChange={update("notes")}
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={
            status === "error"
              ? "text-xs text-red-600"
              : status === "success"
                ? "text-xs text-emerald-600"
                : "text-xs text-slate-500"
          }
        >
          {feedback || "Required: name, email, date, and time. Phone is required if meeting type is Phone."}
        </p>

        <Button type="submit" variant="secondary" disabled={!canSubmit || status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Request Call →"}
        </Button>
      </div>
    </form>
  );
}
