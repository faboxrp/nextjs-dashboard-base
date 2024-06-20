import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookies = req.cookies.get("next-auth.session-token");
  const session_id = cookies?.value;

  if (!session_id) {
    return NextResponse.json({ error: "No session ID found" }, { status: 400 });
  }

  try {
    const response = await fetch("http://rayapim.site/web/session/destroy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session_id=${session_id}`,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {},
        id: null,
      }),
    });

    if (response.ok) {
      const res = NextResponse.json({ message: "Logged out from Backend successfully" });
      res.cookies.set("session_id", "", { maxAge: 0, path: "/" });
      return res;
    } else {
      return NextResponse.json({ error: "Failed to log out from Backend" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error logging out from Backend" }, { status: 500 });
  }
}
