"use client";

import { useMemo, useState } from "react";
import { SITE } from "@/lib/site";
import { buildMailtoHref } from "@/lib/mailto";
import { Button } from "@/components/ui/button";

type CallFormState = {
  name: string;
  email: string;
  business: string;
  preferredDate: string; // yyyy-mm-dd
  preferredTime: string; // free text (e.g. “3:00pm”)
  timezone: string;
  method: "Zoom" | "Phone";
  notes: string;
  // honeypot for bots
  fax: string;
};

export function CallBookingForm({ context }: { context?: string }) {
  const [state, setState] = useState<CallFormState>({
    name: "",
    email: "",
    business: "",
    preferredDate: "",
    preferredTime: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    method: "Zoom",
    notes: "",
    fax: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">(
    "idle"
  );

  const canSubmit = useMemo(() => {
    return (
      state.name.trim().length > 0 &&
      state.email.trim().length > 0 &&
      state.preferredDate.trim().length > 0 &&
      state.preferredTime.trim().length > 0 &&
      state.fax.trim().length === 0 // honeypot must stay empty
    );
  }, [state]);

  const update =
    (key: keyof CallFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setState((prev) => ({ ...prev, [key]: e.target.value }));
      if (status === "submitted") setStatus("idle");
    };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");

    const lines = [
      `Call request for: ${context || "(general inquiry)"}`,
      "",
      `Name: ${state.name}`,
      `Business: ${state.business || "(blank)"}`,
      `Email: ${state.email}`,
      `Preferred method: ${state.method}`,
      "",
      `Preferred date: ${state.preferredDate}`,
      `Preferred time: ${state.preferredTime}`,
      `Time zone: ${state.timezone || "(not specified)"}`,
      "",
      "Notes:",
      state.notes || "(blank)",
    ];

    const href = buildMailtoHref({
      // For Zoom meetings, email is better than SMS
      to: SITE.contact.fallbackEmail,
      subject: `${SITE.brand} — call request from ${state.name}`,
      body: lines.join("\n"),
    });

    window.location.href = href;
    setStatus("submitted");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* honeypot (hidden from humans, visible to bots) */}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={state.fax}
        onChange={update("fax")}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm
                     text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="Name *"
          value={state.name}
          onChange={update("name")}
        />
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm
                     text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="Business (optional)"
          value={state.business}
          onChange={update("business")}
        />
      </div>

      <input
        className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm
                   text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
        placeholder="Email (for Zoom link / confirmation) *"
        type="email"
        value={state.email}
        onChange={update("email")}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <div className="text-xs text-black/70 font-medium">Preferred date *</div>
          <input
            type="date"
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm
                       text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
            value={state.preferredDate}
            onChange={update("preferredDate")}
          />
        </div>
        <div className="space-y-1">
          <div className="text-xs text-black/70 font-medium">Preferred time *</div>
          <input
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm
                       text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="e.g. 3:00pm"
            value={state.preferredTime}
            onChange={update("preferredTime")}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm
                     text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="Time zone"
          value={state.timezone}
          onChange={update("timezone")}
        />
        <select
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm
                     text-black focus:outline-none focus:ring-2 focus:ring-sky-200"
          value={state.method}
          onChange={update("method")}
        >
          <option value="Zoom">Zoom</option>
          <option value="Phone">Phone</option>
        </select>
      </div>

      <textarea
        className="w-full min-h-[90px] rounded-xl border border-black/10 bg-white px-3 py-2 text-sm
                   text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
        placeholder="Anything specific you want to cover?"
        value={state.notes}
        onChange={update("notes")}
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-black/50">
          {status === "submitted"
            ? "✅ Opened your email app with a pre-filled call request."
            : "I’ll confirm the time or propose the closest available slot."}
        </p>
        <Button
          type="submit"
          variant="secondary"
          disabled={!canSubmit || status === "submitting"}
        >
          {status === "submitting" ? "Preparing email…" : "Request this call →"}
        </Button>
      </div>
    </form>
  );
}
