"use client";

import { useMemo, useState } from "react";
import { SITE } from "@/lib/site";
import { buildMailtoHref } from "@/lib/mailto";
import { Button } from "@/components/ui/button";

type FormState = {
  name: string;
  business: string;
  email: string;
  phone: string;
  website: string;
  platform: string;
  plan: string;
  timeline: string;
  budget: string;
  message: string;
  // honeypot to catch bots
  fax: string;
};

export function ContactForm({ defaultPlan = "" }: { defaultPlan?: string }) {
  const [state, setState] = useState<FormState>({
    name: "",
    business: "",
    email: "",
    phone: "",
    website: "",
    platform: "",
    plan: defaultPlan,
    timeline: "",
    budget: "",
    message: "",
    fax: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">(
    "idle"
  );

  const canSubmit = useMemo(
    () =>
      state.name.trim().length > 0 &&
      state.message.trim().length > 0 &&
      state.fax.trim().length === 0, // honeypot must be empty
    [state.name, state.message, state.fax]
  );

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState((prev) => ({ ...prev, [key]: e.target.value }));
      if (status === "submitted") setStatus("idle");
    };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");

    // Build email body
    const lines = [
      `Name: ${state.name}`,
      `Business: ${state.business || "(blank)"}`,
      `Email: ${state.email || "(blank)"}`,
      `Phone: ${state.phone || "(blank)"}`,
      `Website: ${state.website || "(blank)"}`,
      `Platform: ${state.platform || "(blank)"}`,
      `Plan/Service: ${state.plan || "(blank)"}`,
      `Timeline: ${state.timeline || "(blank)"}`,
      `Budget: ${state.budget || "(blank)"}`,
      "",
      "Message:",
      state.message || "(blank)",
    ];

    const href = buildMailtoHref({
      to: SITE.contact.textEmail,
      cc: SITE.contact.fallbackEmail,
      subject: `${SITE.brand} — quote request`,
      body: lines.join("\n"),
    });

    // Trigger the email client (this will send to vtext)
    window.location.href = href;

    setStatus("submitted");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* honeypot field (hidden from users) */}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={state.fax}
        onChange={update("fax")}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="Name *"
          value={state.name}
          onChange={update("name")}
        />
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="Business"
          value={state.business}
          onChange={update("business")}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="Email (for reply)"
          type="email"
          value={state.email}
          onChange={update("email")}
        />
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="Phone (optional)"
          value={state.phone}
          onChange={update("phone")}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="Current website (optional)"
          value={state.website}
          onChange={update("website")}
        />
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="Platform (Shopify/Wix/WordPress/Custom)"
          value={state.platform}
          onChange={update("platform")}
        />
      </div>

      <input
        className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
        placeholder="Service / Plan (prefilled from pricing)"
        value={state.plan}
        onChange={update("plan")}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="Timeline (example: ASAP / 2 weeks)"
          value={state.timeline}
          onChange={update("timeline")}
        />
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="Budget (optional)"
          value={state.budget}
          onChange={update("budget")}
        />
      </div>

      <textarea
        className="w-full min-h-[140px] rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-sky-200"
        placeholder="What do you want built or changed? *"
        value={state.message}
        onChange={update("message")}
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-black/50">
          {status === "submitted"
            ? "✅ Opened your email app. Once you send it, it will go straight to my phone."
            : "Fields marked * are required. Submitting opens your email app to send the request."}
        </p>
        <Button
          type="submit"
          variant="primary"
          disabled={!canSubmit || status === "submitting"}
        >
          {status === "submitting" ? "Preparing email…" : "Send request →"}
        </Button>
      </div>
    </form>
  );
}
