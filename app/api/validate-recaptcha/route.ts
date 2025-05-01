import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const token = body.token;

  if (!token) {
    return NextResponse.json({ success: false, error: "Missing token" }, { status: 400 });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

  const verifyRes = await fetch(url, {
    method: "POST",
  });

  const result = await verifyRes.json();

  if (!result.success || result.score < 0.8) {
    return NextResponse.json({ success: false, score: result.score }, { status: 403 });
  }

  return NextResponse.json({ success: true, score: result.score });
}