import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import Stripe from "stripe";

let cached: Stripe | undefined;
let cachedSecretKey: string | undefined;
let cachedWebhookSecret: string | undefined;

async function readSecretValue({
  envValue,
  secretId,
  parameterName,
  jsonKey,
}: {
  envValue?: string;
  secretId?: string;
  parameterName?: string;
  jsonKey: string;
}) {
  if (envValue) return envValue;

  if (secretId) {
    const client = new SecretsManagerClient({});
    const response = await client.send(new GetSecretValueCommand({ SecretId: secretId }));
    const value = response.SecretString || "";

    try {
      const parsed = JSON.parse(value) as Record<string, string | undefined>;
      return parsed[jsonKey] || value;
    } catch {
      return value;
    }
  }

  if (parameterName) {
    const client = new SSMClient({});
    const response = await client.send(
      new GetParameterCommand({
        Name: parameterName,
        WithDecryption: true,
      })
    );
    return response.Parameter?.Value || "";
  }

  return "";
}

export async function getStripeSecretKey() {
  if (!cachedSecretKey) {
    cachedSecretKey = await readSecretValue({
      envValue: process.env.STRIPE_SECRET_KEY,
      secretId: process.env.STRIPE_SECRET_ID,
      parameterName: process.env.STRIPE_SECRET_KEY_SSM_PARAMETER_NAME,
      jsonKey: "STRIPE_SECRET_KEY",
    });
  }

  if (!cachedSecretKey) throw new Error("STRIPE_SECRET_KEY or STRIPE_SECRET_ID is required.");
  return cachedSecretKey;
}

export async function getStripeWebhookSecret() {
  if (!cachedWebhookSecret) {
    cachedWebhookSecret = await readSecretValue({
      envValue: process.env.STRIPE_WEBHOOK_SECRET,
      secretId: process.env.STRIPE_WEBHOOK_SECRET_ID || process.env.STRIPE_SECRET_ID,
      parameterName: process.env.STRIPE_WEBHOOK_SECRET_SSM_PARAMETER_NAME,
      jsonKey: "STRIPE_WEBHOOK_SECRET",
    });
  }

  if (!cachedWebhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET is required.");
  return cachedWebhookSecret;
}

export async function getStripe() {
  const secretKey = await getStripeSecretKey();

  if (!cached) {
    cached = new Stripe(secretKey);
  }

  return cached;
}
