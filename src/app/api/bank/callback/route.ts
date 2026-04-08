import { NextRequest } from "next/server";

const BASE_URL = process.env.OPENBANKING_USE_TEST === "true"
  ? "https://testapi.openbanking.or.kr"
  : "https://openapi.openbanking.or.kr";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return Response.json({ error, message: searchParams.get("error_description") }, { status: 400 });
  }

  if (!code) {
    return Response.json({ error: "no authorization code" }, { status: 400 });
  }

  const clientId = process.env.OPENBANKING_CLIENT_ID!;
  const clientSecret = process.env.OPENBANKING_CLIENT_SECRET!;
  const redirectUri = process.env.OPENBANKING_REDIRECT_URI!;

  const tokenRes = await fetch(`${BASE_URL}/oauth/2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenRes.json();

  return Response.json({
    message: "Token received. Save these to .env.local",
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expires_in: tokenData.expires_in,
    user_seq_no: tokenData.user_seq_no,
    scope: tokenData.scope,
    state,
  });
}
