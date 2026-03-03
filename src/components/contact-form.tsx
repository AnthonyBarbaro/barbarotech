"use client";

import { useMemo, useState } from "react";
import { SERVICE_PLAN_OPTIONS } from "@/data/contact";
import { formatUsPhone } from "@/lib/forms";
import { Button } from "@/components/ui/button";

type FormState = {
  name: string;
  business: string;
  email: string;
  phone: string;
  website: string;
  platform: string;
  selectedPlan: string;
  customPlan: string;
  timeline: string;
  budget: string;
  message: string;
  fax: string;
};

const INPUT_CLASS =
  "w-full rounded-2xl border border-slate-900/10 bg-white/90 px-3.5 py-2.5 text-sm text-slate-900 " +
  "placeholder:text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] focus:outline-none focus:ring-4 focus:ring-sky-300/30";

function getInitialPlan(defaultPlan: string) {
  const trimmed = defaultPlan.trim();
  if (!trimmed) {
    return {
      selectedPlan: "Not sure yet",
      customPlan: "",
    };
  }

  if (SERVICE_PLAN_OPTIONS.includes(trimmed as (typeof SERVICE_PLAN_OPTIONS)[number])) {
    return {
      selectedPlan: trimmed,
      customPlan: "",
    };
  }

  return {
    selectedPlan: "Other",
    customPlan: trimmed,
  };
}

export function ContactForm({ defaultPlan = "" }: { defaultPlan?: string }) {
  const initialPlan = useMemo(() => getInitialPlan(defaultPlan), [defaultPlan]);

  const [state, setState] = useState<FormState>({
    name: "",
    business: "",
    email: "",
    phone: "",
    website: "",
    platform: "",
    selectedPlan: initialPlan.selectedPlan,
    customPlan: initialPlan.customPlan,
    timeline: "",
    budget: "",
    message: "",
    fax: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const finalPlan = state.selectedPlan === "Other" ? state.customPlan.trim() : state.selectedPlan;

  const canSubmit = useMemo(() => {
    return (
      state.name.trim().length > 0 &&
      state.email.trim().length > 0 &&
      state.message.trim().length > 0 &&
      finalPlan.length > 0 &&
      state.fax.trim().length === 0
    );
  }, [finalPlan, state]);

  const update =
    (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const rawValue = event.target.value;

      setState((prev) => {
        if (key === "phone") {
          return { ...prev, phone: formatUsPhone(rawValue) };
        }

        if (key === "selectedPlan") {
          return {
            ...prev,
            selectedPlan: rawValue,
            customPlan: rawValue === "Other" ? prev.customPlan : "",
          };
        }

        return { ...prev, [key]: rawValue };
      });

      if (status !== "idle") {
        setStatus("idle");
        setFeedback("");
      }
    };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit || status === "submitting") return;

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          business: state.business,
          email: state.email,
          phone: state.phone,
          website: state.website,
          platform: state.platform,
          plan: finalPlan,
          timeline: state.timeline,
          budget: state.budget,
          message: state.message,
          fax: state.fax,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to send request.");
      }

      setStatus("success");
      setFeedback("Your quote request was sent. I will get back to you shortly.");
      setState({
        name: "",
        business: "",
        email: "",
        phone: "",
        website: "",
        platform: "",
        selectedPlan: initialPlan.selectedPlan,
        customPlan: initialPlan.customPlan,
        timeline: "",
        budget: "",
        message: "",
        fax: "",
      });
    } catch (error) {
      setStatus("error");
      const message = error instanceof Error ? error.message : "Failed to send request.";
      setFeedback(message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={state.fax}
        onChange={update("fax")}
      />

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
          placeholder="Phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={14}
          value={state.phone}
          onChange={update("phone")}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={INPUT_CLASS}
          placeholder="Current website"
          value={state.website}
          onChange={update("website")}
        />
        <input
          className={INPUT_CLASS}
          placeholder="Platform (Shopify, Wix, WordPress, Custom)"
          value={state.platform}
          onChange={update("platform")}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">Service / Plan *</label>
        <select className={INPUT_CLASS} value={state.selectedPlan} onChange={update("selectedPlan")}>
          {SERVICE_PLAN_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {state.selectedPlan === "Other" && (
          <input
            className={INPUT_CLASS}
            placeholder="Describe the service you need"
            value={state.customPlan}
            onChange={update("customPlan")}
          />
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={INPUT_CLASS}
          placeholder="Timeline (ASAP, 2 weeks, etc.)"
          value={state.timeline}
          onChange={update("timeline")}
        />
        <input className={INPUT_CLASS} placeholder="Budget" value={state.budget} onChange={update("budget")} />
      </div>

      <textarea
        className={`${INPUT_CLASS} min-h-[140px]`}
        placeholder="What do you want built or improved? *"
        value={state.message}
        onChange={update("message")}
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
          {feedback || "Required fields: name, email, service/plan, and message."}
        </p>

        <Button type="submit" variant="primary" disabled={!canSubmit || status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send Request →"}
        </Button>
      </div>
    </form>
  );
}
