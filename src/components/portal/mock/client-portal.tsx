"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Clock, CreditCard, ListChecks, Send, Sparkles, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BillingStatusCard } from "@/components/portal/billing-status-card";
import { DataTable } from "@/components/portal/data-table";
import { EmptyState } from "@/components/portal/empty-state";
import { MetricCard } from "@/components/portal/metric-card";
import { NextStepCard } from "@/components/portal/next-step-card";
import { PortalAlert } from "@/components/portal/alert";
import { StatusBadge } from "@/components/portal/status-badge";
import {
  allowedAttachmentMimeTypes,
  requestPriorities,
  requestStatuses,
  scopeTypes,
} from "@/lib/portal/constants";
import { portalRequests, portalRetainers } from "@/lib/portal/mock-data";
import { formatDate, formatMoney } from "@/lib/portal/format";
import type { PortalRequest, ScopeType } from "@/lib/portal/types";

const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-200/60";

const cardClass = "rounded-lg border border-slate-200 bg-white p-5 shadow-sm";

function Notice({ message, tone = "sky" }: { message: string; tone?: "sky" | "emerald" }) {
  const toneClass =
    tone === "emerald"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-sky-200 bg-sky-50 text-sky-900";

  return <div className={`rounded-lg border px-4 py-3 text-sm font-semibold ${toneClass}`}>{message}</div>;
}

export function ClientOverviewMock() {
  const retainer = portalRetainers[0];
  const openRequests = portalRequests.filter((request) => request.status !== "Done");
  const nextResponse = openRequests[0]?.targetResponseAt ? formatDate(openRequests[0].targetResponseAt) : "Not set";

  return (
    <div className="space-y-6">
      <PortalAlert title="Portal preview">
        Review your care plan, billing status, requests, and next step using sample data.
      </PortalAlert>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Care Plan"
          value={retainer?.packageCategory || "Not active"}
          detail={retainer ? "Current retainer" : "BarbaroTech will add your care plan"}
          icon={Sparkles}
        />
        <MetricCard
          label="Billing"
          value={retainer?.billingStatus ? retainer.billingStatus.replace(/_/g, " ") : "Not linked"}
          detail="Stripe-hosted billing"
          icon={CreditCard}
        />
        <MetricCard label="Open Requests" value={String(openRequests.length)} detail="Currently active" icon={ListChecks} />
        <MetricCard label="Next Response" value={nextResponse} detail="Target response window" icon={Clock} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        {retainer ? (
          <BillingStatusCard retainer={retainer} />
        ) : (
          <EmptyState icon={Sparkles} title="No care plan yet" description="Your care plan will appear here once BarbaroTech creates it." />
        )}
        <NextStepCard
          title="Next Step"
          description="Submit requests here and use billing for invoices, payment methods, and care plan status."
          href="/portal/requests/new/"
          action="New Request"
        />
      </div>

      {openRequests.length ? (
        <section className={cardClass}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Open Requests</p>
              <h2 className="mt-1 text-lg font-semibold text-slate-950">Current request list</h2>
            </div>
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {openRequests.map((request) => (
              <article key={request.id} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <StatusBadge value={request.status} />
                  <span className="text-xs font-semibold text-slate-500">{request.priority}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-slate-950">{request.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{request.nextStep}</p>
                <p className="mt-3 text-xs text-slate-500">Last updated {formatDate(request.updatedAt)}</p>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <EmptyState icon={ListChecks} title="No open requests" description="New requests will appear here after you submit them." />
      )}
    </div>
  );
}

export function ClientBillingMock() {
  const [notice, setNotice] = useState("");
  const primaryRetainer = portalRetainers[0];

  return (
    <div className="space-y-6">
      <PortalAlert title="Stripe-hosted billing">
        Billing actions use Stripe-hosted pages in the live portal. No custom payment form is shown here.
      </PortalAlert>

      {notice ? <Notice message={notice} tone="emerald" /> : null}

      {primaryRetainer ? <BillingStatusCard retainer={primaryRetainer} /> : null}

      {portalRetainers.length ? (
        <DataTable
          rows={portalRetainers}
          columns={[
            { key: "package", header: "Care Plan", render: (row) => row.packageCategory },
            { key: "quote", header: "Quote", render: (row) => <StatusBadge value={row.quoteStatus} /> },
            { key: "billing", header: "Billing", render: (row) => <StatusBadge value={row.billingStatus} /> },
            { key: "monthly", header: "Monthly", render: (row) => formatMoney(row.monthlyAmountCents) },
            { key: "setup", header: "Setup", render: (row) => formatMoney(row.setupFeeCents) },
          ]}
        />
      ) : (
        <EmptyState icon={CreditCard} title="No billing yet" description="Your care plan and billing status will appear here after setup." />
      )}

      <div className={cardClass}>
        <h2 className="text-lg font-semibold text-slate-950">Hosted billing actions</h2>
        <p className="mt-1 text-sm text-slate-600">
          Open Stripe Billing Portal for invoices, payment methods, and billing details after live setup.
        </p>
        <Button
          type="button"
          className="mt-4"
          variant="primary"
          onClick={() => setNotice("Billing portal handoff is shown as a static preview.")}
        >
          <CreditCard className="h-4 w-4" />
          Preview Billing Handoff
        </Button>
      </div>
    </div>
  );
}

export function ClientRequestsMock() {
  const [requests] = useState<PortalRequest[]>(portalRequests);
  const groupedRequests = useMemo(
    () =>
      requestStatuses.map((status) => ({
        status,
        requests: requests.filter((request) => request.status === status),
      })),
    [requests]
  );

  return (
    <div className="space-y-6">
      <PortalAlert title="Request board">
        Track request status, scope, and next step from one client-facing view.
      </PortalAlert>

      <div className="grid gap-3 lg:grid-cols-3 2xl:grid-cols-6">
        {groupedRequests.map((column) => (
          <section key={column.status} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <StatusBadge value={column.status} />
              <span className="text-xs font-semibold text-slate-500">{column.requests.length}</span>
            </div>
            <div className="mt-3 space-y-2">
              {column.requests.map((request) => (
                <article key={request.id} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-950">{request.title}</p>
                  <p className="mt-1 text-xs text-slate-600">{request.nextStep}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {requests.length ? (
        <DataTable
          rows={requests}
          columns={[
            { key: "title", header: "Request", render: (row) => <span className="font-semibold text-slate-950">{row.title}</span> },
            { key: "status", header: "Status", render: (row) => <StatusBadge value={row.status} /> },
            { key: "priority", header: "Priority", render: (row) => row.priority },
            { key: "scope", header: "Scope", render: (row) => row.scopeType },
            { key: "next", header: "Next Step", render: (row) => row.nextStep },
            { key: "updated", header: "Last Updated", render: (row) => formatDate(row.updatedAt) },
          ]}
        />
      ) : (
        <EmptyState icon={ListChecks} title="No requests yet" description="Submit your first request when you need a site update or review." />
      )}
    </div>
  );
}

export function ClientNewRequestMock() {
  const [form, setForm] = useState({
    retainerId: portalRetainers[0]?.id || "",
    title: "",
    priority: "Normal",
    scopeType: "Needs approval" as ScopeType,
    description: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [notice, setNotice] = useState("");

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(event.target.files || []));
    setNotice("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Request saved in this static preview. Live submission will be connected in a later phase.");
    setForm((current) => ({
      ...current,
      title: "",
      description: "",
      priority: "Normal",
      scopeType: "Needs approval",
    }));
    setFiles([]);
    event.currentTarget.reset();
  }

  return (
    <div className="max-w-3xl space-y-5">
      <PortalAlert title="Scope review">
        BarbaroTech will confirm whether this is included in your current care plan or needs separate approval.
      </PortalAlert>
      {notice ? <Notice message={notice} tone="emerald" /> : null}

      <form className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-slate-800">
          Request title
          <input
            className={inputClass}
            placeholder="Update homepage promotion"
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            required
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-800">
            Care plan
            <select
              className={inputClass}
              value={form.retainerId}
              onChange={(event) => setForm((current) => ({ ...current, retainerId: event.target.value }))}
            >
              <option value="">No care plan selected</option>
              {portalRetainers.map((retainer) => (
                <option key={retainer.id} value={retainer.id}>
                  {retainer.packageCategory}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold text-slate-800">
            Priority
            <select
              className={inputClass}
              value={form.priority}
              onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}
            >
              {requestPriorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block text-sm font-semibold text-slate-800">
          Scope type
          <select
            className={inputClass}
            value={form.scopeType}
            onChange={(event) => setForm((current) => ({ ...current, scopeType: event.target.value as ScopeType }))}
          >
            {scopeTypes.map((scope) => (
              <option key={scope} value={scope}>
                {scope}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-800">
          Request details
          <textarea
            className={`${inputClass} min-h-[150px]`}
            placeholder="Share what needs to change, where it appears, and any timing notes."
            value={form.description}
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            required
          />
        </label>

        <label className="block rounded-lg border border-dashed border-slate-300 bg-white px-4 py-5 text-center">
          <UploadCloud className="mx-auto h-7 w-7 text-slate-400" />
          <span className="mt-2 block text-sm font-semibold text-slate-950">Attach request files</span>
          <span className="mt-1 block text-xs text-slate-500">
            Files stay local in this static preview. Live private uploads are added later.
          </span>
          <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
            PNG / JPG / WEBP / PDF / TXT / ZIP
          </span>
          <input
            className="sr-only"
            type="file"
            multiple
            accept={allowedAttachmentMimeTypes.join(",")}
            onChange={handleFiles}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {files.length
              ? `${files.length} file${files.length === 1 ? "" : "s"} selected for preview.`
              : "No files selected."}
          </p>
          <Button type="submit" variant="primary">
            <Send className="h-4 w-4" />
            Submit Request
          </Button>
        </div>
      </form>
    </div>
  );
}
