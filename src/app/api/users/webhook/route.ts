import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "#/db";
import { users } from "#/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const CLERK_SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!CLERK_SIGNING_SECRET) {
    throw new Error(
      "Error: Please add CLERK_SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(CLERK_SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook: ", err);
    return new Response("Error: Verification error", {
      status: 400
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const data = evt.data;

    // Check if user ID is present
    if (!data.id) {
      return new Response("Error: No user ID found", {
        status: 400
      });
    }
    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.clerkId, data.id)
    });

    if (existingUser) {
      return new Response("User already exists", { status: 200 });
    }

    // Check if email is present
    if (!data.email_addresses || data.email_addresses.length === 0) {
      return new Response("Error: No email address found", {
        status: 400
      });
    }

    // Insert user into database
    await db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
      email: data.email_addresses[0].email_address,
      imageUrl: data.image_url,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    });
  }

  if (eventType === "user.deleted") {
    const data = evt.data;
    if (!data.id) {
      return new Response("Error: No user ID found", {
        status: 400
      });
    }

    // Delete user from database
    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  if (eventType === "user.updated") {
    const data = evt.data;

    if (!data.id) {
      return new Response("Error: No user ID found", {
        status: 400
      });
    }

    // Update user in database
    await db
      .update(users)
      .set({
        name: `${data.first_name}${data.last_name ? ` ${data.last_name}` : ""}`,
        imageUrl: data.image_url,
        updatedAt: new Date(data.updated_at)
      })
      .where(eq(users.clerkId, data.id));
  }

  return new Response("Webhook received", { status: 200 });
}
