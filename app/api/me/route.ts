/*
Create an API route at app/api/me/route.ts that returns user's information as JSON. The route only accept requests authenticated with the API token. If the request includes an Authorization: Bearer <token> header and the token matches a user in the database, return that user's information:
*/

import { NextRequest, NextResponse } from "next/server";
import { getUserByApiToken } from "@/app/services/users";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new NextResponse(null, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const user = await getUserByApiToken(token);

  if (!user) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.json(user);
}
