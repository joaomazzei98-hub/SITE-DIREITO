import { z } from "zod";

export async function chatPost(url: string, body: unknown, signal?: AbortSignal) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal
  });
  const data: unknown = await response.json();
  if (!response.ok) {
    const error = z.object({ error: z.string().max(240) }).safeParse(data);
    throw new Error(error.success ? error.data.error : "O serviço está indisponível.");
  }
  return data;
}
