"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { resolveContactPlanLabel, SERVICE_PLAN_OPTIONS } from "@/data/contact";
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
  "min-h-12 w-full rounded-[10px] border border-[#0a5b89]/25 bg-[#f4fbff]/95 px-4 py-3 text-sm text-[#071a2d] " +
  "placeholder:text-[#648297] transition-colors focus:border-[#8edcff]/65 focus:outline-none focus:ring-4 " +
  "focus:ring-[#8edcff]/10 disabled:cursor-not-allowed disabled:opacity-50";

function getInitialPlan(defaultPlan: string) {
  const trimmed = resolveContactPlanLabel(defaultPlan);
  if (!trimmed) {
    return {
      selectedPlan: "Not sure yet",
      customPlan: "",
    };
  }

  if (SERVICE_PLAN_OPTIONS.includes(trimmed)) {
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

export function ContactForm() {
  const searchParams = useSearchParams();
  const queryPlan = searchParams.get("plan") ?? searchParams.get("context") ?? "";
  const initialPlan = useMemo(() => getInitialPlan(queryPlan), [queryPlan]);

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

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      selectedPlan: initialPlan.selectedPlan,
      customPlan: initialPlan.customPlan,
    }));
  }, [initialPlan]);

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
      setFeedback("Your demo request was sent. I will get back to you shortly.");
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
    <form onSubmit={handleSubmit} className="space-y-4">
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
          aria-label="Name"
          autoComplete="name"
          value={state.name}
          onChange={update("name")}
        />
        <input
          className={INPUT_CLASS}
          placeholder="Business"
          aria-label="Business name"
          autoComplete="organization"
          value={state.business}
          onChange={update("business")}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={INPUT_CLASS}
          placeholder="Email *"
          aria-label="Email address"
          autoComplete="email"
          type="email"
          value={state.email}
          onChange={update("email")}
        />
        <input
          className={INPUT_CLASS}
          placeholder="Phone"
          aria-label="Phone number"
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
          aria-label="Current website"
          value={state.website}
          onChange={update("website")}
        />
        <input
          className={INPUT_CLASS}
          placeholder="Platform (Shopify, Wix, WordPress, Custom)"
          aria-label="Current website platform"
          value={state.platform}
          onChange={update("platform")}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#164f72]">What should I demo? *</label>
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
            aria-label="Describe the service you need"
            value={state.customPlan}
            onChange={update("customPlan")}
          />
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={INPUT_CLASS}
          placeholder="Timeline (ASAP, 2 weeks, etc.)"
          aria-label="Preferred timeline"
          value={state.timeline}
          onChange={update("timeline")}
        />
        <input className={INPUT_CLASS} placeholder="Budget" aria-label="Budget" value={state.budget} onChange={update("budget")} />
      </div>

      <textarea
        className={`${INPUT_CLASS} min-h-[140px]`}
        placeholder="What do you want built or improved? *"
        aria-label="Project details"
        value={state.message}
        onChange={update("message")}
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={
            status === "error"
              ? "rounded-[12px] border border-rose-300/25 bg-rose-400/10 px-3 py-2 text-xs leading-relaxed text-rose-200"
              : status === "success"
                ? "rounded-[12px] border border-[#0a5b89]/25 bg-[#bfeaff]/50 px-3 py-2 text-xs leading-relaxed text-[#075f91]"
                : "text-xs leading-relaxed text-[#3d6077]"
          }
        >
          {feedback || "Required fields: name, email, project type, and message."}
        </p>

        <Button
          type="submit"
          variant="primary"
          className="min-h-12 shrink-0 px-6"
          disabled={!canSubmit || status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Request Free Demo →"}
        </Button>
      </div>
    </form>
  );
}
