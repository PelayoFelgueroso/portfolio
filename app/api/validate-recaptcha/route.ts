export async function POST(req: Request) {
  const body = await req.json();
  const token = body.token;

  if (!token) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing token" }),
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

  const verifyRes = await fetch(url, { method: "POST" });
  const result = await verifyRes.json();

  if (!result.success || result.score < 0.8) {
    return new Response(
      JSON.stringify({ success: false, score: result.score }),
      {
        status: 403,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  return new Response(JSON.stringify({ success: true, score: result.score }), {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
