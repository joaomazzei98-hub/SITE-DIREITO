import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { z } from "zod";

import { serviceDatabase } from "./database";
import { databaseSettings } from "./settings";

const profileSchema = z.object({
  user_id: z.uuid(),
  display_name: z.string(),
  role: z.enum(["atendente", "advogado", "administrador"])
});

export const adminStatuses = {
  novo: "Novo",
  em_analise: "Em análise",
  aguardando_retorno: "Aguardando retorno",
  concluido: "Concluído",
  arquivado: "Arquivado",
  cancelado: "Cancelado"
} as const;

export const adminStatusSchema = z.enum([
  "novo",
  "em_analise",
  "aguardando_retorno",
  "concluido",
  "arquivado",
  "cancelado"
]);

export function adminEnabled() {
  return (
    process.env.CHATBOT_ADMIN_ENABLED === "1" &&
    Boolean(databaseSettings()) &&
    Boolean(process.env.SUPABASE_PUBLISHABLE_KEY)
  );
}

export async function staffAuth() {
  const url = databaseSettings()?.url;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!adminEnabled() || !url || !key) throw new Error("Admin unavailable");
  const jar = await cookies();
  return createServerClient(url, key, {
    cookieOptions: {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
    },
    cookies: {
      getAll: () => jar.getAll(),
      setAll: (changes) => {
        try {
          for (const { name, value, options } of changes) jar.set(name, value, options);
        } catch {
          // Server Components cannot persist a refreshed cookie.
        }
      }
    },
    global: { fetch: (input, options) => fetch(input, { ...options, cache: "no-store" }) }
  });
}

export async function staffState(auth: Awaited<ReturnType<typeof staffAuth>>) {
  const {
    data: { user }
  } = await auth.auth.getUser();
  if (!user) return { state: "login" } as const;
  const { data, error } = await serviceDatabase()
    .from("chatbot_admin_profiles")
    .select("user_id, display_name, role")
    .eq("user_id", user.id)
    .eq("active", true)
    .maybeSingle();
  if (error) throw new Error("Admin unavailable");
  const result = profileSchema.safeParse(data);
  if (!result.success) return { state: "denied" } as const;
  const profile = result.data;
  const assurance = await auth.auth.mfa.getAuthenticatorAssuranceLevel();
  if (assurance.error) throw new Error("Admin unavailable");
  if (assurance.data.currentLevel === "aal2") return { state: "ready", profile } as const;
  if (assurance.data.nextLevel === "aal2" || profile.role === "administrador") {
    return { state: "mfa", profile } as const;
  }
  return { state: "ready", profile } as const;
}
