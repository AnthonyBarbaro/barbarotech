import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

const id = () =>
  text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()::text`);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

export const clientAccessStatus = pgEnum("client_access_status", [
  "invited",
  "active",
  "disabled",
]);

export const retainerQuoteStatus = pgEnum("retainer_quote_status", [
  "draft",
  "sent",
  "accepted",
  "expired",
  "void",
]);

export const retainerBillingStatus = pgEnum("retainer_billing_status", [
  "draft",
  "checkout_created",
  "pending_payment",
  "incomplete",
  "active",
  "past_due",
  "unpaid",
  "canceled",
]);

export const requestStatus = pgEnum("request_status", [
  "New",
  "Reviewing",
  "Approved",
  "In Progress",
  "Waiting",
  "Done",
]);

export const requestScopeType = pgEnum("request_scope_type", [
  "Included in retainer",
  "Needs approval",
  "Out of scope",
  "Quoted separately",
]);

export const webhookProcessingStatus = pgEnum("webhook_processing_status", [
  "processing",
  "processed",
  "failed",
  "ignored",
]);

export const clients = pgTable(
  "clients",
  {
    id: id(),
    businessName: text("business_name").notNull(),
    contactName: text("contact_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    accessStatus: clientAccessStatus("access_status").notNull().default("invited"),
    cognitoUserId: text("cognito_user_id"),
    stripeCustomerId: text("stripe_customer_id"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("clients_cognito_user_id_unique").on(table.cognitoUserId),
    uniqueIndex("clients_stripe_customer_id_unique").on(table.stripeCustomerId),
    index("clients_access_status_idx").on(table.accessStatus),
  ]
);

export const retainers = pgTable(
  "retainers",
  {
    id: id(),
    clientId: text("client_id")
      .notNull()
      .references(() => clients.id, { onDelete: "cascade" }),
    packageCategory: text("package_category").notNull(),
    quoteStatus: retainerQuoteStatus("quote_status").notNull().default("draft"),
    billingStatus: retainerBillingStatus("billing_status").notNull().default("draft"),
    monthlyAmountCents: integer("monthly_amount_cents").notNull(),
    setupFeeCents: integer("setup_fee_cents").notNull().default(0),
    terms: text("terms"),
    stripeCheckoutSessionId: text("stripe_checkout_session_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    ...timestamps,
  },
  (table) => [
    index("retainers_client_id_idx").on(table.clientId),
    index("retainers_billing_status_idx").on(table.billingStatus),
    index("retainers_stripe_subscription_id_idx").on(table.stripeSubscriptionId),
  ]
);

export const workRequests = pgTable(
  "work_requests",
  {
    id: id(),
    clientId: text("client_id")
      .notNull()
      .references(() => clients.id, { onDelete: "cascade" }),
    retainerId: text("retainer_id").references(() => retainers.id, { onDelete: "set null" }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    status: requestStatus("status").notNull().default("New"),
    priority: text("priority").notNull().default("Normal"),
    scopeType: requestScopeType("scope_type").notNull().default("Needs approval"),
    nextStep: text("next_step").notNull().default("BarbaroTech is reviewing scope."),
    clientVisibleNote: text("client_visible_note"),
    internalAdminNote: text("internal_admin_note"),
    lastUpdatedBy: text("last_updated_by").notNull().default("BarbaroTech"),
    targetResponseAt: timestamp("target_response_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    index("work_requests_client_id_idx").on(table.clientId),
    index("work_requests_status_idx").on(table.status),
    index("work_requests_updated_at_idx").on(table.updatedAt),
  ]
);

export const requestAttachments = pgTable(
  "request_attachments",
  {
    id: id(),
    requestId: text("request_id")
      .notNull()
      .references(() => workRequests.id, { onDelete: "cascade" }),
    clientId: text("client_id")
      .notNull()
      .references(() => clients.id, { onDelete: "cascade" }),
    s3Key: text("s3_key").notNull(),
    filename: text("filename").notNull(),
    mimeType: text("mime_type").notNull(),
    sizeBytes: integer("size_bytes").notNull(),
    ...timestamps,
  },
  (table) => [index("request_attachments_request_id_idx").on(table.requestId)]
);

export const webhookEvents = pgTable(
  "webhook_events",
  {
    id: id(),
    stripeEventId: text("stripe_event_id").notNull(),
    eventType: text("event_type").notNull(),
    processedAt: timestamp("processed_at", { withTimezone: true }),
    status: webhookProcessingStatus("status").notNull().default("processing"),
    error: text("error"),
    ...timestamps,
  },
  (table) => [uniqueIndex("webhook_events_stripe_event_id_unique").on(table.stripeEventId)]
);

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
export type Retainer = typeof retainers.$inferSelect;
export type NewRetainer = typeof retainers.$inferInsert;
export type WorkRequest = typeof workRequests.$inferSelect;
export type NewWorkRequest = typeof workRequests.$inferInsert;
