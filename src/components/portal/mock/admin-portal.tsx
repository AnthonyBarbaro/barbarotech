"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AlertTriangle, CreditCard, ListChecks, Plus, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortalAlert } from "@/components/portal/alert";
import { DataTable } from "@/components/portal/data-table";
import { EmptyState } from "@/components/portal/empty-state";
import { MetricCard } from "@/components/portal/metric-card";
import { StatusBadge } from "@/components/portal/status-badge";
import { clientAccessStatuses, requestPriorities, requestStatuses, scopeTypes } from "@/lib/portal/constants";
import {
  adminClients,
  adminRequests,
  adminRetainers,
  getRequestsForClient,
  getRetainersForClient,
} from "@/lib/portal/mock-data";
import { formatDate, formatMoney } from "@/lib/portal/format";
import type {
  ClientAccessStatus,
  PortalClient,
  PortalRequest,
  PortalRetainer,
  RequestStatus,
  ScopeType,
} from "@/lib/portal/types";

const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-200/60";

const cardClass = "rounded-lg border border-slate-200 bg-white p-5 shadow-sm";

type ClientDetail = {
  client: PortalClient;
  retainers: PortalRetainer[];
  requests: PortalRequest[];
};

function Notice({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
      {message}
    </div>
  );
}

function clientNameById(clients: PortalClient[], clientId: string) {
  return clients.find((client) => client.id === clientId)?.businessName || "Unknown client";
}

function dollarsToCents(value: string) {
  const dollars = Number(value || 0);
  return Number.isFinite(dollars) ? Math.round(dollars * 100) : 0;
}

function createClientDetail(client: PortalClient): ClientDetail {
  return {
    client,
    retainers: getRetainersForClient(client.id),
    requests: getRequestsForClient(client.id),
  };
}

export function AdminOverviewMock() {
  const monthlyRevenue = adminRetainers
    .filter((retainer) => retainer.billingStatus === "active")
    .reduce((sum, retainer) => sum + retainer.monthlyAmountCents, 0);
  const needsBilling = adminRetainers.filter(
    (retainer) => retainer.billingStatus === "pending_payment" || retainer.billingStatus === "past_due"
  ).length;
  const openRequests = adminRequests.filter((request) => request.status !== "Done").length;

  return (
    <div className="space-y-6">
      <PortalAlert title="Admin preview">
        Review the static admin dashboard shell with sample clients, retainers, billing, and requests.
      </PortalAlert>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active MRR" value={formatMoney(monthlyRevenue)} detail="Accepted retainers" icon={CreditCard} />
        <MetricCard label="Clients" value={String(adminClients.length)} detail="Invited and active" icon={Users} />
        <MetricCard label="Open Requests" value={String(openRequests)} detail="Client-visible queue" icon={ListChecks} />
        <MetricCard label="Billing Review" value={String(needsBilling)} detail="Needs next step" icon={AlertTriangle} />
      </div>

      <DataTable
        rows={adminRetainers}
        columns={[
          { key: "client", header: "Client", render: (row) => clientNameById(adminClients, row.clientId) },
          { key: "package", header: "Care Plan", render: (row) => row.packageCategory },
          { key: "billing", header: "Billing", render: (row) => <StatusBadge value={row.billingStatus} /> },
          { key: "quote", header: "Quote", render: (row) => <StatusBadge value={row.quoteStatus} /> },
          { key: "monthly", header: "Monthly", render: (row) => formatMoney(row.monthlyAmountCents) },
        ]}
      />
    </div>
  );
}

export function AdminClientsMock() {
  const [clients, setClients] = useState<PortalClient[]>(adminClients);
  const [selectedDetail, setSelectedDetail] = useState<ClientDetail | null>(createClientDetail(adminClients[0]));
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

  const selectedClient = selectedDetail?.client || null;

  function selectClient(client: PortalClient) {
    setSelectedDetail(createClientDetail(client));
    setNotice("");
  }

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

  function handleCreateClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client: PortalClient = {
      id: `client-preview-${Date.now()}`,
      businessName: newClient.businessName,
      contactName: newClient.contactName,
      email: newClient.email.toLowerCase(),
      phone: newClient.phone || null,
      accessStatus: "invited",
    };

    setClients((current) => [client, ...current]);
    setSelectedDetail({ client, retainers: [], requests: [] });
    setNewClient({ businessName: "", contactName: "", email: "", phone: "" });
    setNotice(`${client.businessName} was added to the static preview.`);
  }

  function handleUpdateClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedClient) return;

    setClients((current) => current.map((client) => (client.id === selectedClient.id ? selectedClient : client)));
    setNotice(`${selectedClient.businessName} was updated in the static preview.`);
  }

  function handleInviteClient() {
    if (!selectedClient) return;
    const updatedClient = { ...selectedClient, accessStatus: "invited" as ClientAccessStatus };

    setSelectedDetail((current) => (current ? { ...current, client: updatedClient } : current));
    setClients((current) => current.map((client) => (client.id === updatedClient.id ? updatedClient : client)));
    setNotice(`Invite marked as ready for ${updatedClient.businessName}.`);
  }

  function handleCreateRetainer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedClient) return;

    const retainer: PortalRetainer = {
      id: `retainer-preview-${Date.now()}`,
      clientId: selectedClient.id,
      packageCategory: newRetainer.packageCategory,
      quoteStatus: "draft",
      billingStatus: "draft",
      monthlyAmountCents: dollarsToCents(newRetainer.monthlyAmount),
      setupFeeCents: dollarsToCents(newRetainer.setupFee),
      terms: newRetainer.terms || null,
      nextBillingDate: "Pending checkout",
    };

    setSelectedDetail((current) =>
      current ? { ...current, retainers: [retainer, ...current.retainers] } : current
    );
    setNewRetainer({ packageCategory: "Website Care", monthlyAmount: "", setupFee: "", terms: "" });
    setNotice(`${retainer.packageCategory} retainer was added to the static preview.`);
  }

  return (
    <div className="space-y-5">
      <PortalAlert title="Client management preview">
        Create clients, edit access, and draft retainers locally while the production API remains disconnected.
      </PortalAlert>

      {notice ? <Notice message={notice} /> : null}

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
              <label className="block text-sm font-semibold text-slate-800">
                Business name
                <input
                  className={inputClass}
                  value={newClient.businessName}
                  onChange={(event) => setNewClient((current) => ({ ...current, businessName: event.target.value }))}
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-slate-800">
                Contact name
                <input
                  className={inputClass}
                  value={newClient.contactName}
                  onChange={(event) => setNewClient((current) => ({ ...current, contactName: event.target.value }))}
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-slate-800">
                Email
                <input
                  className={inputClass}
                  type="email"
                  value={newClient.email}
                  onChange={(event) => setNewClient((current) => ({ ...current, email: event.target.value }))}
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-slate-800">
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
                      onClick={() => selectClient(row)}
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
          ) : (
            <EmptyState icon={Users} title="No clients yet" description="Create your first client to start portal access." />
          )}
        </div>

        <div className="space-y-5">
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
                  <label className="block text-sm font-semibold text-slate-800">
                    Business name
                    <input
                      className={inputClass}
                      value={selectedClient.businessName}
                      onChange={(event) => updateSelectedClient("businessName", event.target.value)}
                      required
                    />
                  </label>
                  <label className="block text-sm font-semibold text-slate-800">
                    Contact name
                    <input
                      className={inputClass}
                      value={selectedClient.contactName}
                      onChange={(event) => updateSelectedClient("contactName", event.target.value)}
                      required
                    />
                  </label>
                  <label className="block text-sm font-semibold text-slate-800">
                    Email
                    <input
                      className={inputClass}
                      type="email"
                      value={selectedClient.email}
                      onChange={(event) => updateSelectedClient("email", event.target.value)}
                      required
                    />
                  </label>
                  <label className="block text-sm font-semibold text-slate-800">
                    Phone
                    <input
                      className={inputClass}
                      value={selectedClient.phone || ""}
                      onChange={(event) => updateSelectedClient("phone", event.target.value)}
                    />
                  </label>
                  <label className="block text-sm font-semibold text-slate-800">
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
                  Build the quote here, then create the Stripe Checkout handoff from Billing.
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <label className="block text-sm font-semibold text-slate-800">
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
                  <label className="block text-sm font-semibold text-slate-800">
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
                  <label className="block text-sm font-semibold text-slate-800">
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
                  <label className="block text-sm font-semibold text-slate-800 md:col-span-2">
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
  );
}

export function AdminBillingMock() {
  const [retainers, setRetainers] = useState<PortalRetainer[]>(adminRetainers);
  const [notice, setNotice] = useState("");

  function createCheckout(retainerId: string) {
    setRetainers((current) =>
      current.map((retainer) =>
        retainer.id === retainerId
          ? { ...retainer, quoteStatus: "sent", billingStatus: "checkout_created", nextBillingDate: "Pending checkout" }
          : retainer
      )
    );
    setNotice("Stripe Checkout handoff was prepared in the static preview.");
  }

  return (
    <div className="space-y-5">
      <PortalAlert title="Stripe-hosted billing">
        Admin creates custom retainers. Clients accept through Stripe Checkout in the live portal.
      </PortalAlert>

      {notice ? <Notice message={notice} /> : null}

      <DataTable
        rows={retainers}
        columns={[
          { key: "client", header: "Client", render: (row) => clientNameById(adminClients, row.clientId) },
          { key: "package", header: "Care Plan", render: (row) => row.packageCategory },
          { key: "quote", header: "Quote", render: (row) => <StatusBadge value={row.quoteStatus} /> },
          { key: "billing", header: "Billing", render: (row) => <StatusBadge value={row.billingStatus} /> },
          { key: "monthly", header: "Monthly", render: (row) => formatMoney(row.monthlyAmountCents) },
          { key: "setup", header: "Setup", render: (row) => formatMoney(row.setupFeeCents) },
          {
            key: "action",
            header: "Checkout",
            render: (row) => (
              <Button type="button" variant="secondary" onClick={() => createCheckout(row.id)} className="px-3 py-2 text-xs">
                Prepare
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}

export function AdminRequestsMock() {
  const [requests, setRequests] = useState<PortalRequest[]>(adminRequests);
  const [selectedRequest, setSelectedRequest] = useState<PortalRequest | null>(adminRequests[0] || null);
  const [notice, setNotice] = useState("");

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

  function handleUpdateRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedRequest) return;

    setRequests((current) =>
      current.map((request) =>
        request.id === selectedRequest.id
          ? { ...selectedRequest, lastUpdatedBy: "BarbaroTech", updatedAt: new Date().toISOString() }
          : request
      )
    );
    setNotice(`${selectedRequest.title} was updated in the static preview.`);
  }

  return (
    <div className="space-y-5">
      <PortalAlert title="Request operations preview">
        Review client requests, adjust scope, and set the next step without connecting a live API.
      </PortalAlert>

      {notice ? <Notice message={notice} /> : null}

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
                  onClick={() => {
                    setSelectedRequest(request);
                    setNotice("");
                  }}
                  className="block w-full rounded-md border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-sky-200 hover:bg-sky-50"
                >
                  <p className="text-sm font-semibold text-slate-950">{request.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{clientNameById(adminClients, request.clientId)}</p>
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
              <p className="mt-1 text-sm text-slate-600">{clientNameById(adminClients, selectedRequest.clientId)}</p>
            </div>
            <StatusBadge value={selectedRequest.status} />
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <label className="block text-sm font-semibold text-slate-800">
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
            <label className="block text-sm font-semibold text-slate-800">
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
            <label className="block text-sm font-semibold text-slate-800">
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
            <label className="block text-sm font-semibold text-slate-800 lg:col-span-3">
              Next step
              <input
                className={inputClass}
                value={selectedRequest.nextStep}
                onChange={(event) => updateSelectedRequest("nextStep", event.target.value)}
              />
            </label>
            <label className="block text-sm font-semibold text-slate-800 lg:col-span-2">
              Client-visible note
              <textarea
                className={`${inputClass} min-h-28`}
                value={selectedRequest.clientVisibleNote || ""}
                onChange={(event) => updateSelectedRequest("clientVisibleNote", event.target.value)}
              />
            </label>
            <label className="block text-sm font-semibold text-slate-800">
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
      ) : (
        <EmptyState icon={ListChecks} title="No requests yet" description="Client requests will appear here after submission." />
      )}

      {requests.length ? (
        <DataTable
          rows={requests}
          columns={[
            { key: "title", header: "Request", render: (row) => <span className="font-semibold text-slate-950">{row.title}</span> },
            { key: "client", header: "Client", render: (row) => clientNameById(adminClients, row.clientId) },
            { key: "status", header: "Status", render: (row) => <StatusBadge value={row.status} /> },
            { key: "scope", header: "Scope", render: (row) => row.scopeType },
            { key: "updated", header: "Updated", render: (row) => formatDate(row.updatedAt) },
          ]}
        />
      ) : null}
    </div>
  );
}
