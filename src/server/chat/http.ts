import { NextResponse } from "next/server";

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" }
  });
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const configuredOrigin = process.env.CHATBOT_SITE_ORIGIN;
  if (configuredOrigin) return origin === configuredOrigin;
  if (process.env.NODE_ENV === "development")
    return origin === new URL(request.url).origin;
  if (process.env.VERCEL === "1" && process.env.VERCEL_ENV === "preview") {
    return [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL].some(
      (hostname) => Boolean(hostname) && origin === "https://" + hostname
    );
  }
  return false;
}

export async function boundedBody(request: Request, maxBytes: number) {
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !== "application/json" ||
    Number(request.headers.get("content-length")) > maxBytes ||
    !request.body
  ) {
    return null;
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let size = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } catch {
    await reader.cancel().catch(() => {});
    return null;
  } finally {
    reader.releaseLock();
  }
}

export async function boundedJson(request: Request, maxBytes: number): Promise<unknown> {
  const text = await boundedBody(request, maxBytes);
  if (text === null) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
