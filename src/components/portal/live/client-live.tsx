"use client";

import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Clock, CreditCard, ListChecks, RefreshCcw, Send, Sparkles, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
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
  maxAttachmentSizeBytes,
  requestPriorities,
  requestStatuses,
  scopeTypes,
} from "@/lib/portal/constants";
import { portalApi } from "@/lib/portal/api-client";
import { formatDate, formatMoney } from "@/lib/portal/format";
import type { PortalAttachment, PortalClient, PortalRequest, PortalRetainer, ScopeType } from "@/lib/portal/types";
import { LiveGate } from "./live-gate";

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-200/60";

const cardClass = "rounded-lg border border-slate-200 bg-white p-5 shadow-sm";

type SummaryResponse = {
  client: PortalClient;
  retainers: PortalRetainer[];
  requests: PortalRequest[];
};

type RetainersResponse = {
  retainers: PortalRetainer[];
};

type RequestsResponse = {
  requests: PortalRequest[];
};

type UploadResponse = {
  attachment: PortalAttachment & {
    s3Key: string;
  };
  upload: {
    url: string;
    fields: Record<string, string>;
  };
};

function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
      {message}
    </div>
  );
}

function LoadingCard({ label = "Loading live portal data..." }: { label?: string }) {
  return (
    <div className={cardClass}>
      <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
        <RefreshCcw className="h-4 w-4 animate-spin text-sky-700" />
        {label}
      </div>
    </div>
  );
}

function validateFiles(files: File[]) {
  for (const file of files) {
    const allowed = allowedAttachmentMimeTypes.includes(
      file.type as (typeof allowedAttachmentMimeTypes)[number]
    );
    if (!allowed) return `${file.name} is not an allowed file type.`;
    if (file.size <= 0 || file.size > maxAttachmentSizeBytes) {
      return `${file.name} must be 10 MB or less.`;
    }
  }

  return "";
}

export function ClientOverviewLive() {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      setSummary(await portalApi<SummaryResponse>("/portal/summary"));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load portal summary.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const retainer = summary?.retainers[0];
  const openRequests = summary?.requests.filter((request) => request.status !== "Done") || [];
  const nextResponse = openRequests[0]?.targetResponseAt ? formatDate(openRequests[0].targetResponseAt) : "Not set";

  return (
    <LiveGate mode="client" returnTo="/portal/">
      <div className="space-y-6">
        <ErrorMessage message={error} />
        {loading ? <LoadingCard /> : null}

        {summary ? (
          <>
            <PortalAlert title="Welcome">
              The Client Portal is for requests, billing, files, and updates. Portal access starts after admin invite.
            </PortalAlert>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Care Plan"
                value={retainer?.packageCategory || "Not active"}
                detail={retainer ? "Custom retainer" : "BarbaroTech will add your care plan"}
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
            ) : !loading ? (
              <EmptyState icon={ListChecks} title="No open requests" description="New requests will appear here after you submit them." />
            ) : null}
          </>
        ) : null}
      </div>
    </LiveGate>
  );
}

export function ClientBillingLive() {
  const [retainers, setRetainers] = useState<PortalRetainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await portalApi<RetainersResponse>("/portal/retainers");
      setRetainers(data.retainers);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load billing.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function openBillingPortal() {
    setPortalLoading(true);
    setError("");

    try {
      const data = await portalApi<{ url: string }>("/portal/billing/portal-session", { method: "POST" });
      window.location.href = data.url;
    } catch (portalError) {
      setError(portalError instanceof Error ? portalError.message : "Could not open Stripe Billing Portal.");
    } finally {
      setPortalLoading(false);
    }
  }

  const primaryRetainer = retainers[0];

  return (
    <LiveGate mode="client" returnTo="/portal/billing/">
      <div className="space-y-6">
        <PortalAlert title="Stripe Billing Portal">
          Stripe Billing Portal is only for payment methods, billing details, and invoices in v1. Plan changes,
          cancellations, scope changes, and custom pricing are handled by BarbaroTech admin.
        </PortalAlert>

        <ErrorMessage message={error} />
        {loading ? <LoadingCard label="Loading billing..." /> : null}

        {primaryRetainer ? <BillingStatusCard retainer={primaryRetainer} /> : null}

        {retainers.length ? (
          <DataTable
            rows={retainers}
            columns={[
              { key: "package", header: "Care Plan", render: (row) => row.packageCategory },
              { key: "quote", header: "Quote", render: (row) => <StatusBadge value={row.quoteStatus} /> },
              { key: "billing", header: "Billing", render: (row) => <StatusBadge value={row.billingStatus} /> },
              { key: "monthly", header: "Monthly", render: (row) => formatMoney(row.monthlyAmountCents) },
              { key: "setup", header: "Setup", render: (row) => formatMoney(row.setupFeeCents) },
            ]}
          />
        ) : !loading ? (
          <EmptyState icon={CreditCard} title="No billing yet" description="Your care plan and billing status will appear here after setup." />
        ) : null}

        <div className={cardClass}>
          <h2 className="text-lg font-semibold text-slate-950">Hosted billing actions</h2>
          <p className="mt-1 text-sm text-slate-600">
            Open Stripe Billing Portal for invoices, payment methods, and billing details.
          </p>
          <Button type="button" className="mt-4" variant="primary" onClick={openBillingPortal} disabled={portalLoading}>
            <CreditCard className="h-4 w-4" />
            {portalLoading ? "Opening..." : "Open Stripe Billing Portal"}
          </Button>
        </div>
      </div>
    </LiveGate>
  );
}

export function ClientRequestsLive() {
  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await portalApi<RequestsResponse>("/portal/requests");
      setRequests(data.requests);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load requests.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const groupedRequests = useMemo(
    () =>
      requestStatuses.map((status) => ({
        status,
        requests: requests.filter((request) => request.status === status),
      })),
    [requests]
  );

  return (
    <LiveGate mode="client" returnTo="/portal/requests/">
      <div className="space-y-6">
        <ErrorMessage message={error} />
        {loading ? <LoadingCard label="Loading requests..." /> : null}

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
        ) : !loading ? (
          <EmptyState icon={ListChecks} title="No requests yet" description="Submit your first request when you need a site update or review." />
        ) : null}
      </div>
    </LiveGate>
  );
}

export function ClientNewRequestLive() {
  const router = useRouter();
  const [retainers, setRetainers] = useState<PortalRetainer[]>([]);
  const [form, setForm] = useState({
    retainerId: "",
    title: "",
    priority: "Normal",
    scopeType: "Needs approval" as ScopeType,
    description: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Files are uploaded privately after the request is created.");

  const loadRetainers = useCallback(async () => {
    try {
      const data = await portalApi<RetainersResponse>("/portal/retainers");
      setRetainers(data.retainers);
      if (data.retainers[0]) {
        setForm((current) => (current.retainerId ? current : { ...current, retainerId: data.retainers[0].id }));
      }
    } catch {
      setRetainers([]);
    }
  }, []);

  useEffect(() => {
    void loadRetainers();
  }, [loadRetainers]);

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files || []);
    const fileError = validateFiles(selectedFiles);
    setFiles(selectedFiles);
    setError(fileError);
    setStatus(
      selectedFiles.length
        ? `${selectedFiles.length} file${selectedFiles.length === 1 ? "" : "s"} ready for private upload.`
        : "Files are uploaded privately after the request is created."
    );
  }

  async function uploadFiles(requestId: string) {
    for (const file of files) {
      const presign = await portalApi<UploadResponse>("/portal/uploads/presign", {
        method: "POST",
        body: JSON.stringify({
          requestId,
          filename: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
        }),
      });

      const formData = new FormData();
      Object.entries(presign.upload.fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);

      const upload = await fetch(presign.upload.url, {
        method: "POST",
        body: formData,
      });

      if (!upload.ok) {
        throw new Error(`Could not upload ${file.name}.`);
      }
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fileError = validateFiles(files);
    if (fileError) {
      setError(fileError);
      return;
    }

    setSubmitting(true);
    setError("");
    setStatus("Creating request...");

    try {
      const data = await portalApi<{ request: PortalRequest }>("/portal/requests", {
        method: "POST",
        body: JSON.stringify({
          retainerId: form.retainerId || undefined,
          title: form.title,
          priority: form.priority,
          scopeType: form.scopeType,
          description: form.description,
        }),
      });

      if (files.length) {
        setStatus("Uploading files privately...");
        await uploadFiles(data.request.id);
      }

      setStatus("Request submitted.");
      router.push("/portal/requests/");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not submit request.");
      setStatus("Request was not submitted.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <LiveGate mode="client" returnTo="/portal/requests/new/">
      <div className="max-w-3xl space-y-5">
        <PortalAlert title="Scope review">
          BarbaroTech will confirm whether this is included in your current care plan or needs separate approval.
        </PortalAlert>
        <ErrorMessage message={error} />

        <form className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
          <label className="text-sm font-semibold text-slate-800">
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
            <label className="text-sm font-semibold text-slate-800">
              Care plan
              <select
                className={inputClass}
                value={form.retainerId}
                onChange={(event) => setForm((current) => ({ ...current, retainerId: event.target.value }))}
              >
                <option value="">No care plan selected</option>
                {retainers.map((retainer) => (
                  <option key={retainer.id} value={retainer.id}>
                    {retainer.packageCategory}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-800">
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

          <label className="text-sm font-semibold text-slate-800">
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

          <label className="text-sm font-semibold text-slate-800">
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
              Private S3 upload. Max 10 MB per file.
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
            <p className="text-sm text-slate-500">{status}</p>
            <Button type="submit" variant="primary" disabled={submitting}>
              <Send className="h-4 w-4" />
              {submitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </div>
    </LiveGate>
  );
}
