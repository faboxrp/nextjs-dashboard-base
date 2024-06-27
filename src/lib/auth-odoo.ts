import serverFetch from "@/utils/server-fetch";

export async function authenticateWithOdoo(username: string, password: string) {
  const response = await serverFetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/web/session/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        db: process.env.NEXT_PUBLIC_DBNAME,
        login: username,
        password: password,
      },
      id: null,
    }),
  });

  const data = await response.json();

  if (response.ok && data.result && data.result.uid) {
    const sessionId = response.headers.get("set-cookie")?.match(/session_id=([^;]+);/)?.[1];
    return {
      id: data.result.uid,
      partner_id: data.result.partner_id,
      name: data.result.name,
      username: username,
      email: data.result.email || "",
      avatar: "/assets/img/avatars/8.jpg", // Modifica esto según tu necesidad
      session_id: sessionId, // Añadir session_id
    };
  } else {
    throw new Error("Authentication failed");
  }
}
