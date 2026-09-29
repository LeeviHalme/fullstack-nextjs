import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    username?: string;
    name?: string;
    password?: string;
  } | null;

  const username = body?.username?.trim();
  const name = body?.name?.trim();
  const password = body?.password;

  if (!username || !name || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existingUser = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.username, username),
  });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  const createdUser = await db.query.users.findFirst({
    where: eq(users.username, username),
    columns: {
      id: true,
      username: true,
      name: true,
    },
  });

  return NextResponse.json(createdUser, { status: 201 });
}
