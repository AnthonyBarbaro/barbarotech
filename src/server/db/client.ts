import { drizzle } from "drizzle-orm/postgres-js";
import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import postgres from "postgres";
import * as schema from "./schema";

type DatabaseClient = {
  sql: postgres.Sql;
  db: ReturnType<typeof drizzle<typeof schema>>;
};

let cached: DatabaseClient | undefined;
let cachedDatabaseUrl: string | undefined;

async function resolveDatabaseUrl() {
  if (cachedDatabaseUrl) return cachedDatabaseUrl;
  if (process.env.DATABASE_URL) {
    cachedDatabaseUrl = process.env.DATABASE_URL;
    return cachedDatabaseUrl;
  }

  if (process.env.DATABASE_SECRET_ID) {
    const client = new SecretsManagerClient({});
    const response = await client.send(
      new GetSecretValueCommand({ SecretId: process.env.DATABASE_SECRET_ID })
    );
    const secret = response.SecretString || "";

    try {
      const parsed = JSON.parse(secret) as { DATABASE_URL?: string; url?: string };
      cachedDatabaseUrl = parsed.DATABASE_URL || parsed.url || secret;
    } catch {
      cachedDatabaseUrl = secret;
    }

    return cachedDatabaseUrl;
  }

  if (process.env.DATABASE_SSM_PARAMETER_NAME) {
    const client = new SSMClient({});
    const response = await client.send(
      new GetParameterCommand({
        Name: process.env.DATABASE_SSM_PARAMETER_NAME,
        WithDecryption: true,
      })
    );

    cachedDatabaseUrl = response.Parameter?.Value;
    if (cachedDatabaseUrl) return cachedDatabaseUrl;
  }

  throw new Error("DATABASE_URL, DATABASE_SECRET_ID, or DATABASE_SSM_PARAMETER_NAME is required.");
}

export async function getDatabase(databaseUrl?: string) {
  const resolvedDatabaseUrl = databaseUrl || (await resolveDatabaseUrl());

  if (!cached) {
    const sql = postgres(resolvedDatabaseUrl, {
      max: Number(process.env.DATABASE_POOL_SIZE || 1),
      idle_timeout: Number(process.env.DATABASE_IDLE_TIMEOUT_SECONDS || 20),
      connect_timeout: Number(process.env.DATABASE_CONNECT_TIMEOUT_SECONDS || 10),
      prepare: false,
    });

    cached = {
      sql,
      db: drizzle(sql, { schema }),
    };
  }

  return cached.db;
}
