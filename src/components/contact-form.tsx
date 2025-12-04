"use client";

import { useMemo, useState } from "react";
import { SITE } from "@/lib/site";
import { buildMailtoHref } from "@/lib/mailto";
import { Button } from "@/components/ui/button";

type FormState = {
  name: string;
  business: string;
  industry: string;
  service: string;
  timeline: string;
  budget: string;
  message: string;
};

const initial: FormState = {
  name: "",
  business: "",
  industry: "",
  service: "",
  timeline: "",
  budget: "",
  message: "",
};

function compact(label: string, value: string) {
  return `${label}: ${value || "(blank)"}`;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);

  const onChange = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const smsBody = [
    compact("Name", form.name),
    compact("Biz", form.business),
    compact("Industry", form.industry),
    compact("Service", form.service),
    compact("Timeline", form.timeline),
    compact("Budget", form.budget),
    compact("Msg", form.message),
  ].join("\n");

  const href = buildMailtoHref({
    to: SITE.contact.textEmail,
    subject: `${SITE.brand} inquiry`,
    body: smsBody,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = href;
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <input
        className="w-full rounded-xl bg-white/5 px-3 py-2 border border-white/10 text-sm"
        placeholder="Name"
        value={form.name}
        onChange={(e) => onChange("name", e.target.value)}
      />

      <input
        className="w-full rounded-xl bg-white/5 px-3 py-2 border border-white/10 text-sm"
        placeholder="Business"
        value={form.business}
        onChange={(e) => onChange("business", e.target.value)}
      />

      <input
        className="w-full rounded-xl bg-white/5 px-3 py-2 border border-white/10 text-sm"
        placeholder="Industry (Smoke shop, Gas station, etc.)"
        value={form.industry}
        onChange={(e) => onChange("industry", e.target.value)}
      />

      <input
        className="w-full rounded-xl bg-white/5 px-3 py-2 border border-white/10 text-sm"
        placeholder="Service (Static / Backend)"
        value={form.service}
        onChange={(e) => onChange("service", e.target.value)}
      />

      <input
        className="w-full rounded-xl bg-white/5 px-3 py-2 border border-white/10 text-sm"
        placeholder="Timeline"
        value={form.timeline}
        onChange={(e) => onChange("timeline", e.target.value)}
      />

      <input
        className="w-full rounded-xl bg-white/5 px-3 py-2 border border-white/10 text-sm"
        placeholder="Budget"
        value={form.budget}
        onChange={(e) => onChange("budget", e.target.value)}
      />

      <textarea
        className="w-full rounded-xl bg-white/5 px-3 py-2 border border-white/10 text-sm min-h-[100px]"
        placeholder="Message"
        value={form.message}
        onChange={(e) => onChange("message", e.target.value)}
      />

      <Button type="submit" variant="primary">
        Send
      </Button>
    </form>
  );
}
