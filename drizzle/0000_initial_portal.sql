CREATE EXTENSION IF NOT EXISTS pgcrypto;--> statement-breakpoint
CREATE TYPE "public"."client_access_status" AS ENUM('invited', 'active', 'disabled');--> statement-breakpoint
CREATE TYPE "public"."request_scope_type" AS ENUM('Included in retainer', 'Needs approval', 'Out of scope', 'Quoted separately');--> statement-breakpoint
CREATE TYPE "public"."request_status" AS ENUM('New', 'Reviewing', 'Approved', 'In Progress', 'Waiting', 'Done');--> statement-breakpoint
CREATE TYPE "public"."retainer_billing_status" AS ENUM('draft', 'checkout_created', 'pending_payment', 'incomplete', 'active', 'past_due', 'unpaid', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."retainer_quote_status" AS ENUM('draft', 'sent', 'accepted', 'expired', 'void');--> statement-breakpoint
CREATE TYPE "public"."webhook_processing_status" AS ENUM('processing', 'processed', 'failed', 'ignored');--> statement-breakpoint
CREATE TABLE "clients" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid()::text NOT NULL,
	"business_name" text NOT NULL,
	"contact_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"access_status" "client_access_status" DEFAULT 'invited' NOT NULL,
	"cognito_user_id" text,
	"stripe_customer_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "request_attachments" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid()::text NOT NULL,
	"request_id" text NOT NULL,
	"client_id" text NOT NULL,
	"s3_key" text NOT NULL,
	"filename" text NOT NULL,
	"mime_type" text NOT NULL,
	"size_bytes" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "retainers" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid()::text NOT NULL,
	"client_id" text NOT NULL,
	"package_category" text NOT NULL,
	"quote_status" "retainer_quote_status" DEFAULT 'draft' NOT NULL,
	"billing_status" "retainer_billing_status" DEFAULT 'draft' NOT NULL,
	"monthly_amount_cents" integer NOT NULL,
	"setup_fee_cents" integer DEFAULT 0 NOT NULL,
	"terms" text,
	"stripe_checkout_session_id" text,
	"stripe_subscription_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "webhook_events" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid()::text NOT NULL,
	"stripe_event_id" text NOT NULL,
	"event_type" text NOT NULL,
	"processed_at" timestamp with time zone,
	"status" "webhook_processing_status" DEFAULT 'processing' NOT NULL,
	"error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "work_requests" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid()::text NOT NULL,
	"client_id" text NOT NULL,
	"retainer_id" text,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" "request_status" DEFAULT 'New' NOT NULL,
	"priority" text DEFAULT 'Normal' NOT NULL,
	"scope_type" "request_scope_type" DEFAULT 'Needs approval' NOT NULL,
	"next_step" text DEFAULT 'BarbaroTech is reviewing scope.' NOT NULL,
	"client_visible_note" text,
	"internal_admin_note" text,
	"last_updated_by" text DEFAULT 'BarbaroTech' NOT NULL,
	"target_response_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "request_attachments" ADD CONSTRAINT "request_attachments_request_id_work_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."work_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request_attachments" ADD CONSTRAINT "request_attachments_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retainers" ADD CONSTRAINT "retainers_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work_requests" ADD CONSTRAINT "work_requests_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work_requests" ADD CONSTRAINT "work_requests_retainer_id_retainers_id_fk" FOREIGN KEY ("retainer_id") REFERENCES "public"."retainers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "clients_cognito_user_id_unique" ON "clients" USING btree ("cognito_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "clients_stripe_customer_id_unique" ON "clients" USING btree ("stripe_customer_id");--> statement-breakpoint
CREATE INDEX "clients_access_status_idx" ON "clients" USING btree ("access_status");--> statement-breakpoint
CREATE INDEX "request_attachments_request_id_idx" ON "request_attachments" USING btree ("request_id");--> statement-breakpoint
CREATE INDEX "retainers_client_id_idx" ON "retainers" USING btree ("client_id");--> statement-breakpoint
CREATE INDEX "retainers_billing_status_idx" ON "retainers" USING btree ("billing_status");--> statement-breakpoint
CREATE INDEX "retainers_stripe_subscription_id_idx" ON "retainers" USING btree ("stripe_subscription_id");--> statement-breakpoint
CREATE UNIQUE INDEX "webhook_events_stripe_event_id_unique" ON "webhook_events" USING btree ("stripe_event_id");--> statement-breakpoint
CREATE INDEX "work_requests_client_id_idx" ON "work_requests" USING btree ("client_id");--> statement-breakpoint
CREATE INDEX "work_requests_status_idx" ON "work_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "work_requests_updated_at_idx" ON "work_requests" USING btree ("updated_at");
