import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyEventV2WithJWTAuthorizer,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import type Stripe from "stripe";
import { AdminAddUserToGroupCommand, AdminCreateUserCommand, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { and, desc, eq } from "drizzle-orm";
import { buildBrandedEmail } from "@/lib/email";
import { isContactIntakeEnabled } from "@/lib/flags";
import { getDatabase } from "@/server/db/client";
import {
  clients,
  requestAttachments,
  retainers,
  webhookEvents,
  workRequests,
} from "@/server/db/schema";
import { getClientForCognitoSub } from "./lib/client-context";
import { requireAdmin, requireClient } from "./lib/auth";
import { badRequest, forbidden, json, notFound, parseJsonBody } from "./lib/http";
import { getStripe, getStripeWebhookSecret } from "./lib/stripe";
import { createRequestAttachmentPost } from "./lib/uploads";

type JwtEvent = APIGatewayProxyEventV2WithJWTAuthorizer;

type CreateClientBody = {
  businessName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
};

type PatchClientBody = {
  businessName?: string;
  contactName?: string;
  email?: string;
  phone?: string | null;
  accessStatus?: "invited" | "active" | "disabled";
};

type CreateRetainerBody = {
  packageCategory?: string;
  monthlyAmountCents?: number;
  setupFeeCents?: number;
  terms?: string;
};

type CreateRequestBody = {
  retainerId?: string;
  title?: string;
  description?: string;
  priority?: string;
  scopeType?: "Included in retainer" | "Needs approval" | "Out of scope" | "Quoted separately";
};

type PatchRequestBody = {
  status?: "New" | "Reviewing" | "Approved" | "In Progress" | "Waiting" | "Done";
  priority?: string;
  scopeType?: "Included in retainer" | "Needs approval" | "Out of scope" | "Quoted separately";
  nextStep?: string;
  clientVisibleNote?: string;
  internalAdminNote?: string;
  targetResponseAt?: string;
};

type UploadBody = {
  requestId?: string;
  filename?: string;
  mimeType?: string;
  sizeBytes?: number;
};

type ContactBody = {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  website?: string;
  platform?: string;
  plan?: string;
  timeline?: string;
  budget?: string;
  message?: string;
  fax?: string;
};

type CallRequestBody = {
  name?: string;
  email?: string;
  business?: string;
  phone?: string;
  preferredDate?: string;
  preferredTime?: string;
  timezone?: string;
  method?: string;
  notes?: string;
  context?: string;
  fax?: string;
};

let ses: SESv2Client | undefined;

function routeKey(event: APIGatewayProxyEventV2) {
  const method = event.requestContext.http.method.toUpperCase();
  const path = event.rawPath.replace(/\/+$/, "") || "/";
  return `${method} ${path}`;
}

function getPathPart(event: APIGatewayProxyEventV2, prefix: string) {
  const path = event.rawPath.replace(/\/+$/, "");
  return path.startsWith(prefix) ? path.slice(prefix.length).split("/").filter(Boolean)[0] : "";
}

function isResult(value: unknown): value is APIGatewayProxyResultV2 {
  return Boolean(value && typeof value === "object" && "statusCode" in value);
}

function requiredString(value: unknown, label: string) {
  const text = String(value || "").trim();
  if (!text) throw badRequest(`${label} is required.`);
  return text;
}

function positiveCents(value: unknown, label: string) {
  const cents = Number(value);
  if (!Number.isInteger(cents) || cents <= 0) throw badRequest(`${label} must be a positive cent amount.`);
  return cents;
}

function plainText(body: string, statusCode = 200): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
    body,
  };
}

function getSes() {
  if (!ses) {
    ses = new SESv2Client({});
  }
  return ses;
}

function isValidReplyTo(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendSesEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const from = process.env.SES_FROM_EMAIL || process.env.CONTACT_FROM || process.env.ADMIN_EMAIL || "anthony@barbaro.tech";

  await getSes().send(
    new SendEmailCommand({
      FromEmailAddress: from,
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: replyTo && isValidReplyTo(replyTo) ? [replyTo] : undefined,
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Html: { Data: html, Charset: "UTF-8" },
          },
        },
      },
    })
  );
}

async function handleContact(event: APIGatewayProxyEventV2) {
  if (!isContactIntakeEnabled()) {
    return plainText("Contact forms are temporarily unavailable.", 503);
  }

  const body = parseJsonBody<ContactBody>(event.body);
  const name = String(body.name || "").trim();
  const business = String(body.business || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const website = String(body.website || "").trim();
  const platform = String(body.platform || "").trim();
  const plan = String(body.plan || "").trim();
  const timeline = String(body.timeline || "").trim();
  const budget = String(body.budget || "").trim();
  const message = String(body.message || "").trim();
  const fax = String(body.fax || "").trim();

  if (fax) return plainText("OK");
  if (!name || !email || !message) {
    return plainText("Missing required fields (name, email, message).", 400);
  }

  const html = buildBrandedEmail({
    preheader: `New contact request from ${name}`,
    badge: "Contact Form",
    title: "New Project Inquiry",
    subtitle: "Submitted from barbaro.tech/contact",
    sections: [
      {
        title: "Client Details",
        fields: [
          { label: "Name", value: name },
          { label: "Business", value: business || "-" },
          { label: "Email", value: email },
          { label: "Phone", value: phone || "-" },
          { label: "Website", value: website || "-" },
        ],
      },
      {
        title: "Project Scope",
        fields: [
          { label: "Service / Plan", value: plan || "Not specified" },
          { label: "Platform", value: platform || "Not specified" },
          { label: "Timeline", value: timeline || "Not specified" },
          { label: "Budget", value: budget || "Not specified" },
        ],
      },
    ],
    messageTitle: "Project Notes",
    message,
    footerNote: "Reply directly to this email to respond to the lead.",
  });

  await sendSesEmail({
    to: process.env.CONTACT_TO || process.env.ADMIN_EMAIL || "anthony@barbaro.tech",
    subject: `New Quote Request - ${name}`,
    replyTo: email,
    html,
  });

  return plainText("OK");
}

async function handleCallRequest(event: APIGatewayProxyEventV2) {
  if (!isContactIntakeEnabled()) {
    return plainText("Call booking is temporarily unavailable.", 503);
  }

  const body = parseJsonBody<CallRequestBody>(event.body);
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const business = String(body.business || "").trim();
  const phone = String(body.phone || "").trim();
  const preferredDate = String(body.preferredDate || "").trim();
  const preferredTime = String(body.preferredTime || "").trim();
  const timezone = String(body.timezone || "").trim();
  const method = String(body.method || "Zoom").trim();
  const notes = String(body.notes || "").trim();
  const context = String(body.context || "").trim();
  const fax = String(body.fax || "").trim();

  if (fax) return plainText("OK");
  if (!name || !email || !preferredDate || !preferredTime) {
    return plainText("Missing required fields for call request.", 400);
  }

  if (method.toLowerCase() === "phone" && phone.replace(/\D/g, "").length !== 10) {
    return plainText("A valid phone number is required for phone calls.", 400);
  }

  const html = buildBrandedEmail({
    preheader: `New call request from ${name}`,
    badge: "Call Booking",
    title: "New Call Booking Request",
    subtitle: "Submitted from barbaro.tech/contact",
    sections: [
      {
        title: "Contact Details",
        fields: [
          { label: "Name", value: name },
          { label: "Email", value: email },
          { label: "Business", value: business || "-" },
          { label: "Phone", value: phone || "-" },
          { label: "Context", value: context || "General inquiry" },
        ],
      },
      {
        title: "Requested Slot",
        fields: [
          { label: "Meeting Type", value: method },
          { label: "Preferred Date", value: preferredDate },
          { label: "Preferred Time", value: preferredTime },
          { label: "Timezone", value: timezone || "Not provided" },
        ],
      },
    ],
    messageTitle: "Call Notes",
    message: notes || "No additional notes provided.",
    footerNote: "Reply directly to this email to confirm the meeting.",
  });

  await sendSesEmail({
    to: process.env.CALL_TO || process.env.CONTACT_TO || process.env.ADMIN_EMAIL || "anthony@barbaro.tech",
    subject: `New Call Request - ${name}`,
    replyTo: email,
    html,
  });

  return plainText("OK");
}

async function handleMe(event: JwtEvent) {
  const auth = requireClient(event);
  const client = await getClientForCognitoSub(auth.sub);

  return json({
    user: {
      sub: auth.sub,
      username: auth.username,
      clientId: auth.clientId,
      scope: auth.scope,
      groups: auth.groups,
    },
    client,
  });
}

async function handlePortalSummary(event: JwtEvent) {
  const auth = requireClient(event);
  const client = await getClientForCognitoSub(auth.sub);
  const db = await getDatabase();

  const clientRetainers = await db
    .select()
    .from(retainers)
    .where(eq(retainers.clientId, client.id))
    .orderBy(desc(retainers.updatedAt));

  const clientRequests = await db
    .select()
    .from(workRequests)
    .where(eq(workRequests.clientId, client.id))
    .orderBy(desc(workRequests.updatedAt));

  return json({
    client,
    retainers: clientRetainers,
    requests: clientRequests,
  });
}

async function handlePortalRetainers(event: JwtEvent) {
  const auth = requireClient(event);
  const client = await getClientForCognitoSub(auth.sub);
  const db = await getDatabase();

  return json({
    retainers: await db.select().from(retainers).where(eq(retainers.clientId, client.id)).orderBy(desc(retainers.updatedAt)),
  });
}

async function handleCreatePortalSession(event: JwtEvent) {
  const auth = requireClient(event);
  const client = await getClientForCognitoSub(auth.sub);

  if (!client.stripeCustomerId) {
    throw badRequest("No Stripe billing profile is linked to this client yet.");
  }

  const stripe = await getStripe();
  const session = await stripe.billingPortal.sessions.create({
    customer: client.stripeCustomerId,
    return_url: process.env.PORTAL_RETURN_URL || "https://barbaro.tech/portal/billing/",
  });

  return json({ url: session.url });
}

async function handlePortalRequests(event: JwtEvent) {
  const auth = requireClient(event);
  const client = await getClientForCognitoSub(auth.sub);
  const db = await getDatabase();

  return json({
    requests: await db
      .select()
      .from(workRequests)
      .where(eq(workRequests.clientId, client.id))
      .orderBy(desc(workRequests.updatedAt)),
  });
}

async function handleCreatePortalRequest(event: JwtEvent) {
  const auth = requireClient(event);
  const client = await getClientForCognitoSub(auth.sub);
  const body = parseJsonBody<CreateRequestBody>(event.body);
  const db = await getDatabase();

  if (body.retainerId) {
    const [retainer] = await db
      .select({ id: retainers.id })
      .from(retainers)
      .where(and(eq(retainers.id, body.retainerId), eq(retainers.clientId, client.id)))
      .limit(1);

    if (!retainer) throw forbidden("Retainer does not belong to this client.");
  }

  const [created] = await db
    .insert(workRequests)
    .values({
      clientId: client.id,
      retainerId: body.retainerId || null,
      title: requiredString(body.title, "Request title"),
      description: requiredString(body.description, "Request details"),
      priority: String(body.priority || "Normal"),
      scopeType: body.scopeType || "Needs approval",
      nextStep: "BarbaroTech is reviewing scope.",
      lastUpdatedBy: "Client",
    })
    .returning();

  return json({ request: created }, 201);
}

async function handlePresignUpload(event: JwtEvent) {
  const auth = requireClient(event);
  const client = await getClientForCognitoSub(auth.sub);
  const body = parseJsonBody<UploadBody>(event.body);
  const requestId = requiredString(body.requestId, "Request ID");
  const filename = requiredString(body.filename, "Filename");
  const mimeType = requiredString(body.mimeType, "MIME type");
  const sizeBytes = Number(body.sizeBytes);
  const bucket = process.env.REQUEST_UPLOAD_BUCKET;
  if (!bucket) throw badRequest("Request upload bucket is not configured.");

  const db = await getDatabase();
  const [request] = await db
    .select({ id: workRequests.id })
    .from(workRequests)
    .where(and(eq(workRequests.id, requestId), eq(workRequests.clientId, client.id)))
    .limit(1);

  if (!request) throw forbidden("Request does not belong to this client.");

  const upload = await createRequestAttachmentPost({
    bucket,
    clientId: client.id,
    requestId,
    filename,
    mimeType,
    sizeBytes,
  });

  const [attachment] = await db
    .insert(requestAttachments)
    .values({
      id: upload.attachmentId,
      requestId,
      clientId: client.id,
      s3Key: upload.key,
      filename,
      mimeType,
      sizeBytes,
    })
    .returning();

  return json({ attachment, upload: upload.post });
}

async function handleAdminClients(event: JwtEvent) {
  await requireAdmin(event);
  const db = await getDatabase();

  return json({ clients: await db.select().from(clients).orderBy(desc(clients.updatedAt)) });
}

async function handleCreateAdminClient(event: JwtEvent) {
  await requireAdmin(event);
  const body = parseJsonBody<CreateClientBody>(event.body);
  const db = await getDatabase();

  const [client] = await db
    .insert(clients)
    .values({
      businessName: requiredString(body.businessName, "Business name"),
      contactName: requiredString(body.contactName, "Contact name"),
      email: requiredString(body.email, "Email"),
      phone: body.phone ? String(body.phone).trim() : null,
      accessStatus: "invited",
    })
    .returning();

  return json({ client }, 201);
}

async function handleAdminClientDetail(event: JwtEvent, clientId: string) {
  await requireAdmin(event);
  const db = await getDatabase();
  const [client] = await db.select().from(clients).where(eq(clients.id, clientId)).limit(1);
  if (!client) throw notFound("Client not found.");

  const clientRetainers = await db.select().from(retainers).where(eq(retainers.clientId, clientId));
  const clientRequests = await db.select().from(workRequests).where(eq(workRequests.clientId, clientId));

  return json({ client, retainers: clientRetainers, requests: clientRequests });
}

async function handlePatchAdminClient(event: JwtEvent, clientId: string) {
  await requireAdmin(event);
  const body = parseJsonBody<PatchClientBody>(event.body);
  const updates: Partial<typeof clients.$inferInsert> = {};

  if (body.businessName !== undefined) updates.businessName = requiredString(body.businessName, "Business name");
  if (body.contactName !== undefined) updates.contactName = requiredString(body.contactName, "Contact name");
  if (body.email !== undefined) updates.email = requiredString(body.email, "Email").toLowerCase();
  if (body.phone !== undefined) updates.phone = body.phone ? String(body.phone).trim() : null;
  if (body.accessStatus !== undefined) updates.accessStatus = body.accessStatus;

  if (Object.keys(updates).length === 0) {
    throw badRequest("At least one client field is required.");
  }

  const db = await getDatabase();
  const [client] = await db
    .update(clients)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(clients.id, clientId))
    .returning();

  if (!client) throw notFound("Client not found.");
  return json({ client });
}

async function handleInviteClient(event: JwtEvent, clientId: string) {
  await requireAdmin(event);
  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  if (!userPoolId) throw badRequest("COGNITO_USER_POOL_ID is not configured.");

  const db = await getDatabase();
  const [client] = await db.select().from(clients).where(eq(clients.id, clientId)).limit(1);
  if (!client) throw notFound("Client not found.");

  const cognito = new CognitoIdentityProviderClient({});
  const created = await cognito.send(
    new AdminCreateUserCommand({
      UserPoolId: userPoolId,
      Username: client.email,
      UserAttributes: [
        { Name: "email", Value: client.email },
        { Name: "email_verified", Value: "true" },
      ],
      DesiredDeliveryMediums: ["EMAIL"],
    })
  );

  await cognito.send(
    new AdminAddUserToGroupCommand({
      UserPoolId: userPoolId,
      Username: client.email,
      GroupName: "client",
    })
  );

  const cognitoSub = created.User?.Attributes?.find((attribute) => attribute.Name === "sub")?.Value;
  const [updated] = await db
    .update(clients)
    .set({
      cognitoUserId: cognitoSub || client.cognitoUserId,
      accessStatus: "invited",
      updatedAt: new Date(),
    })
    .where(eq(clients.id, clientId))
    .returning();

  return json({ client: updated });
}

async function handleCreateRetainer(event: JwtEvent, clientId: string) {
  await requireAdmin(event);
  const body = parseJsonBody<CreateRetainerBody>(event.body);
  const db = await getDatabase();

  const [client] = await db.select({ id: clients.id }).from(clients).where(eq(clients.id, clientId)).limit(1);
  if (!client) throw notFound("Client not found.");

  const [retainer] = await db
    .insert(retainers)
    .values({
      clientId,
      packageCategory: requiredString(body.packageCategory, "Package category"),
      monthlyAmountCents: positiveCents(body.monthlyAmountCents, "Monthly amount"),
      setupFeeCents: body.setupFeeCents ? Number(body.setupFeeCents) : 0,
      terms: body.terms ? String(body.terms) : null,
    })
    .returning();

  return json({ retainer }, 201);
}

async function ensureStripeCustomer(client: typeof clients.$inferSelect) {
  if (client.stripeCustomerId) return client.stripeCustomerId;

  const stripe = await getStripe();
  const customer = await stripe.customers.create({
    email: client.email,
    name: client.businessName,
    metadata: { clientId: client.id },
  });

  const db = await getDatabase();
  await db
    .update(clients)
    .set({ stripeCustomerId: customer.id, updatedAt: new Date() })
    .where(eq(clients.id, client.id));

  return customer.id;
}

async function handleCreateCheckout(event: JwtEvent, retainerId: string) {
  await requireAdmin(event);
  const db = await getDatabase();
  const [retainer] = await db.select().from(retainers).where(eq(retainers.id, retainerId)).limit(1);
  if (!retainer) throw notFound("Retainer not found.");

  const [client] = await db.select().from(clients).where(eq(clients.id, retainer.clientId)).limit(1);
  if (!client) throw notFound("Client not found.");

  const customerId = await ensureStripeCustomer(client);
  const stripe = await getStripe();
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: retainer.monthlyAmountCents,
        recurring: { interval: "month" as const },
        product_data: {
          name: `${retainer.packageCategory} retainer`,
          metadata: { clientId: client.id, retainerId: retainer.id },
        },
      },
    },
  ];

  if (retainer.setupFeeCents > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: retainer.setupFeeCents,
        product_data: {
          name: `${retainer.packageCategory} setup fee`,
          metadata: { clientId: client.id, retainerId: retainer.id },
        },
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: lineItems,
    success_url: process.env.STRIPE_CHECKOUT_SUCCESS_URL || "https://barbaro.tech/portal/billing/",
    cancel_url: process.env.STRIPE_CHECKOUT_CANCEL_URL || "https://barbaro.tech/portal/billing/",
    metadata: {
      clientId: client.id,
      retainerId: retainer.id,
    },
    subscription_data: {
      metadata: {
        clientId: client.id,
        retainerId: retainer.id,
      },
    },
  });

  const [updated] = await db
    .update(retainers)
    .set({
      quoteStatus: "sent",
      billingStatus: "checkout_created",
      stripeCheckoutSessionId: session.id,
      updatedAt: new Date(),
    })
    .where(eq(retainers.id, retainer.id))
    .returning();

  return json({ retainer: updated, checkoutUrl: session.url });
}

async function handleAdminRequests(event: JwtEvent) {
  await requireAdmin(event);
  const db = await getDatabase();
  return json({ requests: await db.select().from(workRequests).orderBy(desc(workRequests.updatedAt)) });
}

async function handlePatchRequest(event: JwtEvent, requestId: string) {
  await requireAdmin(event);
  const body = parseJsonBody<PatchRequestBody>(event.body);
  const db = await getDatabase();

  const [request] = await db
    .update(workRequests)
    .set({
      status: body.status,
      priority: body.priority,
      scopeType: body.scopeType,
      nextStep: body.nextStep,
      clientVisibleNote: body.clientVisibleNote,
      internalAdminNote: body.internalAdminNote,
      targetResponseAt: body.targetResponseAt ? new Date(body.targetResponseAt) : undefined,
      lastUpdatedBy: "BarbaroTech",
      updatedAt: new Date(),
    })
    .where(eq(workRequests.id, requestId))
    .returning();

  if (!request) throw notFound("Request not found.");
  return json({ request });
}

async function handleAdminBilling(event: JwtEvent) {
  await requireAdmin(event);
  const db = await getDatabase();
  return json({
    clients: await db.select().from(clients),
    retainers: await db.select().from(retainers).orderBy(desc(retainers.updatedAt)),
  });
}

function subscriptionStatusToBillingStatus(status: string) {
  if (status === "active" || status === "trialing") return "active";
  if (status === "past_due") return "past_due";
  if (status === "unpaid") return "unpaid";
  if (status === "canceled") return "canceled";
  if (status === "incomplete" || status === "incomplete_expired") return "incomplete";
  return "pending_payment";
}

async function handleStripeWebhook(event: APIGatewayProxyEventV2) {
  const signature = event.headers["stripe-signature"] || event.headers["Stripe-Signature"];
  const webhookSecret = await getStripeWebhookSecret();
  if (!signature || !webhookSecret) throw badRequest("Stripe webhook signature is not configured.");

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : event.body || "";

  const stripe = await getStripe();
  const stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  const db = await getDatabase();

  const inserted = await db
    .insert(webhookEvents)
    .values({
      stripeEventId: stripeEvent.id,
      eventType: stripeEvent.type,
      status: "processing",
    })
    .onConflictDoNothing({ target: webhookEvents.stripeEventId })
    .returning();

  if (inserted.length === 0) {
    return json({ received: true, duplicate: true });
  }

  try {
    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object;
      const retainerId = session.metadata?.retainerId;
      const subscriptionId =
        typeof session.subscription === "string" ? session.subscription : session.subscription?.id;

      if (retainerId) {
        await db
          .update(retainers)
          .set({
            quoteStatus: "accepted",
            billingStatus: session.payment_status === "paid" ? "active" : "pending_payment",
            stripeCheckoutSessionId: session.id,
            stripeSubscriptionId: subscriptionId || null,
            updatedAt: new Date(),
          })
          .where(eq(retainers.id, retainerId));
      }
    }

    if (stripeEvent.type === "customer.subscription.updated" || stripeEvent.type === "customer.subscription.deleted") {
      const subscription = stripeEvent.data.object;
      const retainerId = subscription.metadata?.retainerId;
      const billingStatus =
        stripeEvent.type === "customer.subscription.deleted"
          ? "canceled"
          : subscriptionStatusToBillingStatus(subscription.status);

      if (retainerId) {
        await db
          .update(retainers)
          .set({
            billingStatus,
            stripeSubscriptionId: subscription.id,
            updatedAt: new Date(),
          })
          .where(eq(retainers.id, retainerId));
      }
    }

    if (stripeEvent.type === "invoice.payment_succeeded" || stripeEvent.type === "invoice.payment_failed") {
      const invoice = stripeEvent.data.object;
      const invoiceSubscription = invoice.parent?.subscription_details?.subscription;
      const subscriptionId =
        typeof invoiceSubscription === "string" ? invoiceSubscription : invoiceSubscription?.id;

      if (subscriptionId) {
        await db
          .update(retainers)
          .set({
            billingStatus: stripeEvent.type === "invoice.payment_succeeded" ? "active" : "past_due",
            updatedAt: new Date(),
          })
          .where(eq(retainers.stripeSubscriptionId, subscriptionId));
      }
    }

    await db
      .update(webhookEvents)
      .set({ status: "processed", processedAt: new Date(), updatedAt: new Date() })
      .where(eq(webhookEvents.stripeEventId, stripeEvent.id));

    return json({ received: true });
  } catch (error) {
    await db
      .update(webhookEvents)
      .set({
        status: "failed",
        error: error instanceof Error ? error.message : "Webhook processing failed.",
        processedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(webhookEvents.stripeEventId, stripeEvent.id));
    throw error;
  }
}

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    const key = routeKey(event);

    if (key === "POST /contact") return await handleContact(event);
    if (key === "POST /call-request") return await handleCallRequest(event);
    if (key === "POST /stripe/webhook") return await handleStripeWebhook(event);
    if (key === "GET /me") return await handleMe(event as JwtEvent);
    if (key === "GET /portal/summary") return await handlePortalSummary(event as JwtEvent);
    if (key === "GET /portal/retainers") return await handlePortalRetainers(event as JwtEvent);
    if (key === "POST /portal/billing/portal-session") return await handleCreatePortalSession(event as JwtEvent);
    if (key === "GET /portal/requests") return await handlePortalRequests(event as JwtEvent);
    if (key === "POST /portal/requests") return await handleCreatePortalRequest(event as JwtEvent);
    if (key === "POST /portal/uploads/presign") return await handlePresignUpload(event as JwtEvent);
    if (key === "GET /admin/clients") return await handleAdminClients(event as JwtEvent);
    if (key === "POST /admin/clients") return await handleCreateAdminClient(event as JwtEvent);
    if (key === "GET /admin/requests") return await handleAdminRequests(event as JwtEvent);
    if (key === "GET /admin/billing") return await handleAdminBilling(event as JwtEvent);

    if (key.startsWith("GET /admin/clients/")) {
      return await handleAdminClientDetail(event as JwtEvent, getPathPart(event, "/admin/clients/"));
    }

    if (key.startsWith("PATCH /admin/clients/")) {
      return await handlePatchAdminClient(event as JwtEvent, getPathPart(event, "/admin/clients/"));
    }

    if (key.startsWith("POST /admin/clients/") && key.endsWith("/invite")) {
      return await handleInviteClient(event as JwtEvent, getPathPart(event, "/admin/clients/"));
    }

    if (key.startsWith("POST /admin/clients/") && key.endsWith("/retainers")) {
      return await handleCreateRetainer(event as JwtEvent, getPathPart(event, "/admin/clients/"));
    }

    if (key.startsWith("POST /admin/retainers/") && key.endsWith("/checkout")) {
      return await handleCreateCheckout(event as JwtEvent, getPathPart(event, "/admin/retainers/"));
    }

    if (key.startsWith("PATCH /admin/requests/")) {
      return await handlePatchRequest(event as JwtEvent, getPathPart(event, "/admin/requests/"));
    }

    return notFound("API route not found.");
  } catch (error) {
    if (isResult(error)) return error;
    console.error("PORTAL API ERROR", error);
    return json({ error: "Internal server error." }, 500);
  }
}
