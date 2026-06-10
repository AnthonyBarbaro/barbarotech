import { eq } from "drizzle-orm";
import { getDatabase } from "@/server/db/client";
import { clients } from "@/server/db/schema";
import { notFound } from "./http";

export async function getClientForCognitoSub(cognitoSub: string) {
  const db = await getDatabase();
  const [client] = await db
    .select()
    .from(clients)
    .where(eq(clients.cognitoUserId, cognitoSub))
    .limit(1);

  if (!client) {
    throw notFound("No client profile is linked to this portal user.");
  }

  return client;
}
