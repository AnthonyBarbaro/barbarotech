"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { buildMailtoHref } from "@/lib/mailto";
import { Button } from "@/components/ui/button";

type FormState = {
  name: string;
  business: string;
  website: string;
  platform: string;
  service: string; // plan / service type
  timeline: string;
  budget: string;
  message: string;
};

const empty: FormState = {
  name: "",
  business: "",
  website: "",
  platform: "",
  service: "",
  timeline: "",
  budget: "",
  message: "",
};

function line(label: string, value: string) {
  return `${label}: ${value || "(blank)"}`;
}

export function ContactForm({ defaultPlan = "" }: { defaultPlan?: string }) {
  const [form, setForm] = useState<FormState>(() => ({
    ...empty,
    service: defaultPlan,
  }));

  const set = (key: keyof FormState, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const body = [
      line("Name", form.name),
      line("Business", form.business),
      line("Website", form.website),
      line("Platform", form.platform),
      line("Plan/Service", form.service),
      line("Timeline", form.timeline),
      line("Budget", form.budget),
      "",
      "Message:",
      form.message || "(blank)",
    ].join("\n");

    const href = buildMailtoHref({
      to: SITE.contact.textEmail, // vtext to phone
      subject: `${SITE.brand} quote request`,
      body,
    });

    window.location.href = href;
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
          placeholder="Name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
        />
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
          placeholder="Business"
          value={form.business}
          onChange={(e) => set("business", e.target.value)}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
          placeholder="Current website (optional)"
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
        />
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
          placeholder="Platform (Shopify/Wix/WordPress/Custom)"
          value={form.platform}
          onChange={(e) => set("platform", e.target.value)}
        />
      </div>

      <input
        className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
        placeholder="Service / Plan (prefilled if you clicked a plan)"
        value={form.service}
        onChange={(e) => set("service", e.target.value)}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
          placeholder="Timeline"
          value={form.timeline}
          onChange={(e) => set("timeline", e.target.value)}
        />
        <input
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
          placeholder="Budget"
          value={form.budget}
          onChange={(e) => set("budget", e.target.value)}
        />
      </div>

      <textarea
        className="w-full min-h-[120px] rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
        placeholder="What do you want built or changed?"
        value={form.message}
        onChange={(e) => set("message", e.target.value)}
      />

      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        Send request →
      </Button>
    </form>
  );
}
