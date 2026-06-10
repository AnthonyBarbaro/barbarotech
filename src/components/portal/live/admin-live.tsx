"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { AlertTriangle, CreditCard, ListChecks, Plus, RefreshCcw, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortalAlert } from "@/components/portal/alert";
import { DataTable } from "@/components/portal/data-table";
import { EmptyState } from "@/components/portal/empty-state";
import { MetricCard } from "@/components/portal/metric-card";
import { StatusBadge } from "@/components/portal/status-badge";
import { clientAccessStatuses, requestPriorities, requestStatuses, scopeTypes } from "@/lib/portal/constants";
import { portalApi } from "@/lib/portal/api-client";
import { formatDate, formatMoney } from "@/lib/portal/format";
import type {
  ClientAccessStatus,
  PortalClient,
  PortalRequest,
  PortalRetainer,
  RequestStatus,
  ScopeType,
} from "@/lib/portal/types";
import { LiveGate } from "./live-gate";

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-200/60";

const cardClass = "rounded-lg border border-slate-200 bg-white p-5 shadow-sm";

type ClientsResponse = {
  clients: PortalClient[];
};

type ClientDetailResponse = {
  client: PortalClient;
  retainers: PortalRetainer[];
  requests: PortalRequest[];
};

type BillingResponse = {
  clients: PortalClient[];
  retainers: PortalRetainer[];
};

type RequestsResponse = {
  requests: PortalRequest[];
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

function dollarsToCents(value: string) {
  return Math.round(Number(value || 0) * 100);
}

function clientNameById(clients: PortalClient[], clientId: string) {
  return clients.find((client) => client.id === clientId)?.businessName || "Unknown client";
}

export function AdminOverviewLive() {
  const [clients, setClients] = useState<PortalClient[]>([]);
  const [retainers, setRetainers] = useState<PortalRetainer[]>([]);
  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [clientData, billingData, requestData] = await Promise.all([
        portalApi<ClientsResponse>("/admin/clients"),
        portalApi<BillingResponse>("/admin/billing"),
        portalApi<RequestsResponse>("/admin/requests"),
      ]);

      setClients(clientData.clients);
      setRetainers(billingData.retainers);
      setRequests(requestData.requests);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load admin overview.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const monthlyRevenue = retainers
    .filter((retainer) => retainer.billingStatus === "active")
    .reduce((sum, retainer) => sum + retainer.monthlyAmountCents, 0);
  const pastDue = retainers.filter((retainer) => retainer.billingStatus === "past_due").length;
  const openRequests = requests.filter((request) => request.status !== "Done").length;

  return (
    <LiveGate mode="admin" returnTo="/admin/">
      <div className="space-y-6">
        <ErrorMessage message={error} />
        {loading ? <LoadingCard /> : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Active MRR" value={formatMoney(monthlyRevenue)} detail="Accepted retainers" icon={CreditCard} />
          <MetricCard label="Clients" value={String(clients.length)} detail="Invited and active" icon={Users} />
          <MetricCard label="Open Requests" value={String(openRequests)} detail="Client-visible queue" icon={ListChecks} />
          <MetricCard label="Past Due" value={String(pastDue)} detail="Needs billing review" icon={AlertTriangle} />
        </div>

        <DataTable
          rows={retainers}
          columns={[
            { key: "client", header: "Client", render: (row) => clientNameById(clients, row.clientId) },
            { key: "package", header: "Care Plan", render: (row) => row.packageCategory },
            { key: "billing", header: "Billing", render: (row) => <StatusBadge value={row.billingStatus} /> },
            { key: "quote", header: "Quote", render: (row) => <StatusBadge value={row.quoteStatus} /> },
            { key: "monthly", header: "Monthly", render: (row) => formatMoney(row.monthlyAmountCents) },
          ]}
        />
      </div>
    </LiveGate>
  );
}

export function AdminClientsLive() {
  const [clients, setClients] = useState<PortalClient[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<ClientDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [newClient, setNewClient] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
  });
  const [newRetainer, setNewRetainer] = useState({
    packageCategory: "Website Care",
    monthlyAmount: "",
    setupFee: "",
    terms: "",
  });

  const loadClients = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await portalApi<ClientsResponse>("/admin/clients");
      setClients(data.clients);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load clients.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadClientDetail = useCallback(async (clientId: string) => {
    setDetailLoading(true);
    setError("");

    try {
      const data = await portalApi<ClientDetailResponse>(`/admin/clients/${clientId}`);
      setSelectedDetail(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load client details.");
    } finally {
      setDetailLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadClients();
  }, [loadClients]);

  const selectedClient = selectedDetail?.client || null;

  function updateSelectedClient<K extends keyof PortalClient>(field: K, value: PortalClient[K]) {
    setSelectedDetail((current) => {
      if (!current) return current;
      return {
        ...current,
        client: {
          ...current.client,
          [field]: value,
        },
      };
    });
  }

  async function handleCreateClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    setError("");

    try {
      const data = await portalApi<{ client: PortalClient }>("/admin/clients", {
        method: "POST",
        body: JSON.stringify(newClient),
      });

      setNewClient({ businessName: "", contactName: "", email: "", phone: "" });
      setNotice(`${data.client.businessName} was created.`);
      await loadClients();
      await loadClientDetail(data.client.id);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Could not create client.");
    }
  }

  async function handleUpdateClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedClient) return;

    setNotice("");
    setError("");

    try {
      const data = await portalApi<{ client: PortalClient }>(`/admin/clients/${selectedClient.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          businessName: selectedClient.businessName,
          contactName: selectedClient.contactName,
          email: selectedClient.email,
          phone: selectedClient.phone || "",
          accessStatus: selectedClient.accessStatus,
        }),
      });

      setSelectedDetail((current) => (current ? { ...current, client: data.client } : current));
      setClients((current) => current.map((client) => (client.id === data.client.id ? data.client : client)));
      setNotice(`${data.client.businessName} was updated.`);
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Could not update client.");
    }
  }

  async function handleInviteClient() {
    if (!selectedClient) return;
    setNotice("");
    setError("");

    try {
      const data = await portalApi<{ client: PortalClient }>(`/admin/clients/${selectedClient.id}/invite`, {
        method: "POST",
      });
      setSelectedDetail((current) => (current ? { ...current, client: data.client } : current));
      setNotice(`Invite was sent for ${data.client.businessName}.`);
      await loadClients();
    } catch (inviteError) {
      setError(inviteError instanceof Error ? inviteError.message : "Could not invite client.");
    }
  }

  async function handleCreateRetainer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedClient) return;

    setNotice("");
    setError("");

    try {
      const data = await portalApi<{ retainer: PortalRetainer }>(`/admin/clients/${selectedClient.id}/retainers`, {
        method: "POST",
        body: JSON.stringify({
          packageCategory: newRetainer.packageCategory,
          monthlyAmountCents: dollarsToCents(newRetainer.monthlyAmount),
          setupFeeCents: dollarsToCents(newRetainer.setupFee),
          terms: newRetainer.terms,
        }),
      });

      setNewRetainer({ packageCategory: "Website Care", monthlyAmount: "", setupFee: "", terms: "" });
      setSelectedDetail((current) =>
        current ? { ...current, retainers: [data.retainer, ...current.retainers] } : current
      );
      setNotice(`${data.retainer.packageCategory} retainer was created.`);
    } catch (retainerError) {
      setError(retainerError instanceof Error ? retainerError.message : "Could not create retainer.");
    }
  }

  return (
    <LiveGate mode="admin" returnTo="/admin/clients/">
      <div className="space-y-5">
        <PortalAlert title="Live client management">
          Create clients, edit access, send Cognito invites, and create custom retainers from the live API.
        </PortalAlert>

        <ErrorMessage message={error} />
        {notice ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            {notice}
          </div>
        ) : null}

        <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5">
            <form className={cardClass} onSubmit={handleCreateClient}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">Create client</h2>
                  <p className="mt-1 text-sm text-slate-600">Portal access starts after you send an invite.</p>
                </div>
                <Plus className="h-5 w-5 text-sky-700" />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-800">
                  Business name
                  <input
                    className={inputClass}
                    value={newClient.businessName}
                    onChange={(event) => setNewClient((current) => ({ ...current, businessName: event.target.value }))}
                    required
                  />
                </label>
                <label className="text-sm font-semibold text-slate-800">
                  Contact name
                  <input
                    className={inputClass}
                    value={newClient.contactName}
                    onChange={(event) => setNewClient((current) => ({ ...current, contactName: event.target.value }))}
                    required
                  />
                </label>
                <label className="text-sm font-semibold text-slate-800">
                  Email
                  <input
                    className={inputClass}
                    type="email"
                    value={newClient.email}
                    onChange={(event) => setNewClient((current) => ({ ...current, email: event.target.value }))}
                    required
                  />
                </label>
                <label className="text-sm font-semibold text-slate-800">
                  Phone
                  <input
                    className={inputClass}
                    value={newClient.phone}
                    onChange={(event) => setNewClient((current) => ({ ...current, phone: event.target.value }))}
                  />
                </label>
              </div>
              <Button type="submit" className="mt-4" variant="primary">
                <Plus className="h-4 w-4" />
                Create Client
              </Button>
            </form>

            {loading ? <LoadingCard label="Loading clients..." /> : null}

            {clients.length ? (
              <DataTable
                rows={clients}
                columns={[
                  {
                    key: "business",
                    header: "Client",
                    render: (row) => (
                      <button
                        type="button"
                        onClick={() => loadClientDetail(row.id)}
                        className="text-left font-semibold text-slate-950 hover:text-sky-700"
                      >
                        {row.businessName}
                      </button>
                    ),
                  },
                  { key: "contact", header: "Contact", render: (row) => row.contactName },
                  { key: "email", header: "Email", render: (row) => row.email },
                  { key: "access", header: "Access", render: (row) => <StatusBadge value={row.accessStatus} /> },
                ]}
              />
            ) : !loading ? (
              <EmptyState icon={Users} title="No clients yet" description="Create your first client to start portal access." />
            ) : null}
          </div>

          <div className="space-y-5">
            {detailLoading ? <LoadingCard label="Loading client details..." /> : null}

            {selectedClient ? (
              <>
                <form className={cardClass} onSubmit={handleUpdateClient}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950">{selectedClient.businessName}</h2>
                      <p className="mt-1 text-sm text-slate-600">Edit client details and portal access.</p>
                    </div>
                    <StatusBadge value={selectedClient.accessStatus} />
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <label className="text-sm font-semibold text-slate-800">
                      Business name
                      <input
                        className={inputClass}
                        value={selectedClient.businessName}
                        onChange={(event) => updateSelectedClient("businessName", event.target.value)}
                        required
                      />
                    </label>
                    <label className="text-sm font-semibold text-slate-800">
                      Contact name
                      <input
                        className={inputClass}
                        value={selectedClient.contactName}
                        onChange={(event) => updateSelectedClient("contactName", event.target.value)}
                        required
                      />
                    </label>
                    <label className="text-sm font-semibold text-slate-800">
                      Email
                      <input
                        className={inputClass}
                        type="email"
                        value={selectedClient.email}
                        onChange={(event) => updateSelectedClient("email", event.target.value)}
                        required
                      />
                    </label>
                    <label className="text-sm font-semibold text-slate-800">
                      Phone
                      <input
                        className={inputClass}
                        value={selectedClient.phone || ""}
                        onChange={(event) => updateSelectedClient("phone", event.target.value)}
                      />
                    </label>
                    <label className="text-sm font-semibold text-slate-800">
                      Access
                      <select
                        className={inputClass}
                        value={selectedClient.accessStatus}
                        onChange={(event) =>
                          updateSelectedClient("accessStatus", event.target.value as ClientAccessStatus)
                        }
                      >
                        {clientAccessStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button type="submit" variant="primary">
                      Save Client
                    </Button>
                    <Button type="button" variant="secondary" onClick={handleInviteClient}>
                      <Send className="h-4 w-4" />
                      Send Invite
                    </Button>
                  </div>
                </form>

                <form className={cardClass} onSubmit={handleCreateRetainer}>
                  <h2 className="text-lg font-semibold text-slate-950">Create custom retainer</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Build the quote here, then create the Stripe Checkout link from Billing.
                  </p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <label className="text-sm font-semibold text-slate-800">
                      Care plan
                      <input
                        className={inputClass}
                        value={newRetainer.packageCategory}
                        onChange={(event) =>
                          setNewRetainer((current) => ({ ...current, packageCategory: event.target.value }))
                        }
                        required
                      />
                    </label>
                    <label className="text-sm font-semibold text-slate-800">
                      Monthly retainer
                      <input
                        className={inputClass}
                        inputMode="decimal"
                        placeholder="249"
                        value={newRetainer.monthlyAmount}
                        onChange={(event) =>
                          setNewRetainer((current) => ({ ...current, monthlyAmount: event.target.value }))
                        }
                        required
                      />
                    </label>
                    <label className="text-sm font-semibold text-slate-800">
                      Setup fee
                      <input
                        className={inputClass}
                        inputMode="decimal"
                        placeholder="500"
                        value={newRetainer.setupFee}
                        onChange={(event) =>
                          setNewRetainer((current) => ({ ...current, setupFee: event.target.value }))
                        }
                      />
                    </label>
                    <label className="text-sm font-semibold text-slate-800 md:col-span-2">
                      Terms
                      <textarea
                        className={`${inputClass} min-h-24`}
                        value={newRetainer.terms}
                        onChange={(event) => setNewRetainer((current) => ({ ...current, terms: event.target.value }))}
                      />
                    </label>
                  </div>
                  <Button type="submit" className="mt-4" variant="primary">
                    Create Retainer
                  </Button>
                </form>

                <DataTable
                  rows={selectedDetail?.retainers || []}
                  columns={[
                    { key: "package", header: "Care Plan", render: (row) => row.packageCategory },
                    { key: "quote", header: "Quote", render: (row) => <StatusBadge value={row.quoteStatus} /> },
                    { key: "billing", header: "Billing", render: (row) => <StatusBadge value={row.billingStatus} /> },
                    { key: "monthly", header: "Monthly", render: (row) => formatMoney(row.monthlyAmountCents) },
                  ]}
                />
              </>
            ) : (
              <EmptyState icon={Users} title="Select a client" description="Choose a client to edit details, invite access, or create a retainer." />
            )}
          </div>
        </div>
      </div>
    </LiveGate>
  );
}

export function AdminBillingLive() {
  const [clients, setClients] = useState<PortalClient[]>([]);
  const [retainers, setRetainers] = useState<PortalRetainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoadingId, setCheckoutLoadingId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await portalApi<BillingResponse>("/admin/billing");
      setClients(data.clients);
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

  async function createCheckout(retainerId: string) {
    setCheckoutLoadingId(retainerId);
    setCheckoutUrl("");
    setError("");

    try {
      const data = await portalApi<{ retainer: PortalRetainer; checkoutUrl: string | null }>(
        `/admin/retainers/${retainerId}/checkout`,
        { method: "POST" }
      );

      setRetainers((current) =>
        current.map((retainer) => (retainer.id === data.retainer.id ? data.retainer : retainer))
      );
      if (data.checkoutUrl) {
        setCheckoutUrl(data.checkoutUrl);
        window.open(data.checkoutUrl, "_blank", "noreferrer");
      }
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Could not create Stripe Checkout.");
    } finally {
      setCheckoutLoadingId("");
    }
  }

  return (
    <LiveGate mode="admin" returnTo="/admin/billing/">
      <div className="space-y-5">
        <PortalAlert title="Stripe-hosted billing">
          Admin creates custom retainers. Clients accept through Stripe Checkout. Stripe Billing Portal is limited
          to invoices, payment methods, and billing details in v1.
        </PortalAlert>

        <ErrorMessage message={error} />
        {checkoutUrl ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            Checkout created:{" "}
            <a className="font-semibold underline" href={checkoutUrl} target="_blank" rel="noreferrer">
              open Stripe Checkout
            </a>
          </div>
        ) : null}
        {loading ? <LoadingCard label="Loading billing..." /> : null}

        <DataTable
          rows={retainers}
          columns={[
            { key: "client", header: "Client", render: (row) => clientNameById(clients, row.clientId) },
            { key: "package", header: "Care Plan", render: (row) => row.packageCategory },
            { key: "quote", header: "Quote", render: (row) => <StatusBadge value={row.quoteStatus} /> },
            { key: "billing", header: "Billing", render: (row) => <StatusBadge value={row.billingStatus} /> },
            { key: "monthly", header: "Monthly", render: (row) => formatMoney(row.monthlyAmountCents) },
            { key: "setup", header: "Setup", render: (row) => formatMoney(row.setupFeeCents) },
            {
              key: "action",
              header: "Checkout",
              render: (row) => (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => createCheckout(row.id)}
                  disabled={checkoutLoadingId === row.id}
                  className="px-3 py-2 text-xs"
                >
                  {checkoutLoadingId === row.id ? "Creating..." : "Create"}
                </Button>
              ),
            },
          ]}
        />
      </div>
    </LiveGate>
  );
}

export function AdminRequestsLive() {
  const [clients, setClients] = useState<PortalClient[]>([]);
  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<PortalRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [requestData, clientData] = await Promise.all([
        portalApi<RequestsResponse>("/admin/requests"),
        portalApi<ClientsResponse>("/admin/clients"),
      ]);

      setRequests(requestData.requests);
      setClients(clientData.clients);
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

  function updateSelectedRequest<K extends keyof PortalRequest>(field: K, value: PortalRequest[K]) {
    setSelectedRequest((current) => (current ? { ...current, [field]: value } : current));
  }

  async function handleUpdateRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedRequest) return;
    setError("");
    setNotice("");

    try {
      const data = await portalApi<{ request: PortalRequest }>(`/admin/requests/${selectedRequest.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: selectedRequest.status,
          priority: selectedRequest.priority,
          scopeType: selectedRequest.scopeType,
          nextStep: selectedRequest.nextStep,
          clientVisibleNote: selectedRequest.clientVisibleNote || "",
          internalAdminNote: selectedRequest.internalAdminNote || "",
        }),
      });

      setRequests((current) => current.map((request) => (request.id === data.request.id ? data.request : request)));
      setSelectedRequest(data.request);
      setNotice(`${data.request.title} was updated.`);
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Could not update request.");
    }
  }

  return (
    <LiveGate mode="admin" returnTo="/admin/requests/">
      <div className="space-y-5">
        <ErrorMessage message={error} />
        {notice ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            {notice}
          </div>
        ) : null}
        {loading ? <LoadingCard label="Loading requests..." /> : null}

        <div className="grid gap-3 xl:grid-cols-3 2xl:grid-cols-6">
          {groupedRequests.map((column) => (
            <section key={column.status} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <StatusBadge value={column.status} />
                <span className="text-xs font-semibold text-slate-500">{column.requests.length}</span>
              </div>
              <div className="mt-3 space-y-3">
                {column.requests.map((request) => (
                  <button
                    key={request.id}
                    type="button"
                    onClick={() => setSelectedRequest(request)}
                    className="block w-full rounded-md border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-sky-200 hover:bg-sky-50"
                  >
                    <p className="text-sm font-semibold text-slate-950">{request.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{clientNameById(clients, request.clientId)}</p>
                    <p className="mt-2 text-xs text-slate-700">{request.scopeType}</p>
                    <p className="mt-2 text-xs text-slate-500">{request.nextStep}</p>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>

        {selectedRequest ? (
          <form className={cardClass} onSubmit={handleUpdateRequest}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">{selectedRequest.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{clientNameById(clients, selectedRequest.clientId)}</p>
              </div>
              <StatusBadge value={selectedRequest.status} />
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <label className="text-sm font-semibold text-slate-800">
                Status
                <select
                  className={inputClass}
                  value={selectedRequest.status}
                  onChange={(event) => updateSelectedRequest("status", event.target.value as RequestStatus)}
                >
                  {requestStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-800">
                Priority
                <select
                  className={inputClass}
                  value={selectedRequest.priority}
                  onChange={(event) => updateSelectedRequest("priority", event.target.value as PortalRequest["priority"])}
                >
                  {requestPriorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-800">
                Scope
                <select
                  className={inputClass}
                  value={selectedRequest.scopeType}
                  onChange={(event) => updateSelectedRequest("scopeType", event.target.value as ScopeType)}
                >
                  {scopeTypes.map((scope) => (
                    <option key={scope} value={scope}>
                      {scope}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              <label className="text-sm font-semibold text-slate-800 lg:col-span-3">
                Next step
                <input
                  className={inputClass}
                  value={selectedRequest.nextStep}
                  onChange={(event) => updateSelectedRequest("nextStep", event.target.value)}
                />
              </label>
              <label className="text-sm font-semibold text-slate-800 lg:col-span-2">
                Client-visible note
                <textarea
                  className={`${inputClass} min-h-28`}
                  value={selectedRequest.clientVisibleNote || ""}
                  onChange={(event) => updateSelectedRequest("clientVisibleNote", event.target.value)}
                />
              </label>
              <label className="text-sm font-semibold text-slate-800">
                Internal admin note
                <textarea
                  className={`${inputClass} min-h-28`}
                  value={selectedRequest.internalAdminNote || ""}
                  onChange={(event) => updateSelectedRequest("internalAdminNote", event.target.value)}
                />
              </label>
            </div>

            <Button type="submit" className="mt-4" variant="primary">
              Save Request
            </Button>
          </form>
        ) : requests.length ? (
          <EmptyState icon={ListChecks} title="Select a request" description="Choose a request card to update status, scope, and next step." />
        ) : !loading ? (
          <EmptyState icon={ListChecks} title="No requests yet" description="Client requests will appear here after submission." />
        ) : null}

        {requests.length ? (
          <DataTable
            rows={requests}
            columns={[
              { key: "title", header: "Request", render: (row) => <span className="font-semibold text-slate-950">{row.title}</span> },
              { key: "client", header: "Client", render: (row) => clientNameById(clients, row.clientId) },
              { key: "status", header: "Status", render: (row) => <StatusBadge value={row.status} /> },
              { key: "scope", header: "Scope", render: (row) => row.scopeType },
              { key: "updated", header: "Updated", render: (row) => formatDate(row.updatedAt) },
            ]}
          />
        ) : null}
      </div>
    </LiveGate>
  );
}
