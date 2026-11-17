import { createClient } from "@supabase/supabase-js";

import { databaseSettings } from "./settings";

export function serviceDatabase() {
  const settings = databaseSettings();
  if (!settings) throw new Error("Database unavailable");
  return createClient(settings.url, settings.secret, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
    global: {
      fetch: (input, options) =>
        fetch(input, {
          ...options,
          cache: "no-store",
          signal: options?.signal
            ? AbortSignal.any([options.signal, AbortSignal.timeout(8000)])
            : AbortSignal.timeout(8000)
        })
    }
  });
}
