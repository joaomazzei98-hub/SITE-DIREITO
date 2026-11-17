"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";

function isAdminPath(path: string) {
  return path === "/admin" || path.startsWith("/admin/");
}

function omitAdminEvents<T extends { url: string }>(event: T): T | null {
  try {
    const url = new URL(event.url, window.location.origin);
    return isAdminPath(url.pathname) ? null : event;
  } catch {
    return null;
  }
}

export function PublicMetrics() {
  const pathname = usePathname();
  if (isAdminPath(pathname)) return null;
  return (
    <>
      <Analytics beforeSend={omitAdminEvents} />
      <SpeedInsights beforeSend={omitAdminEvents} />
    </>
  );
}
