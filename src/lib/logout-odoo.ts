import serverFetch from "@/utils/server-fetch";

export async function logoutFromOdoo(session_id: string) {
  const response = await serverFetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/web/session/destroy`, {
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
    return true;
  } else {
    throw new Error("Failed to log out from Backend");
  }
}
