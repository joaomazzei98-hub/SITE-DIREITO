"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { areaSchema } from "@/lib/chat/contracts";
import {
  adminEnabled,
  adminStatusSchema,
  staffAuth,
  staffState
} from "@/server/chat/admin";
import { serviceDatabase } from "@/server/chat/database";
import { sameOrigin } from "@/server/chat/http";
import { consumeBudget } from "@/server/chat/limits";
import { signingSecret } from "@/server/chat/session";

async function allowedAction(limited = false) {
  if (!adminEnabled()) return false;
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  if (!origin) return false;
  const host = requestHeaders.get("host");
  const expected = process.env.CHATBOT_SITE_ORIGIN ?? "http://" + host;
  try {
    const request = new Request(expected, { headers: requestHeaders });
    if (!sameOrigin(request)) return false;
    if (!limited) return true;
    const secret = signingSecret();
    return Boolean(secret && (await consumeBudget("login", request, secret)));
  } catch {
    return false;
  }
}

export async function signIn(form: FormData) {
  if (!(await allowedAction(true))) redirect("/admin?estado=indisponivel");
  const credentials = z
    .object({ email: z.email().max(150), password: z.string().min(1).max(200) })
    .safeParse({ email: form.get("email"), password: form.get("password") });
  if (!credentials.success) redirect("/admin?estado=login");
  const auth = await staffAuth();
  const { error } = await auth.auth.signInWithPassword(credentials.data);
  redirect(error ? "/admin?estado=login" : "/admin");
}

export async function signOut() {
  if (await allowedAction()) {
    const auth = await staffAuth();
    await auth.auth.signOut({ scope: "local" });
  }
  redirect("/admin");
}

type Enrollment = { id?: string; secret?: string; error?: string };

export async function enrollTotp(): Promise<Enrollment> {
  if (!(await allowedAction(true)))
    return { error: "Autenticação temporariamente indisponível." };
  const auth = await staffAuth();
  const state = await staffState(auth);
  if (state.state !== "mfa") return { error: "Acesso negado." };
  const factors = await auth.auth.mfa.listFactors();
  if (factors.error || factors.data.all.some((item) => item.status === "verified"))
    return { error: "Use o autenticador já configurado." };
  for (const factor of factors.data.all.filter(
    (item) => item.status === "unverified" && item.factor_type === "totp"
  )) {
    const removed = await auth.auth.mfa.unenroll({ factorId: factor.id });
    if (removed.error)
      return { error: "Não foi possível renovar o código de configuração." };
  }
  const enrollment = await auth.auth.mfa.enroll({
    factorType: "totp",
    issuer: "Fleming & Batista"
  });
  if (enrollment.error) return { error: "Não foi possível configurar o autenticador." };
  return { id: enrollment.data.id, secret: enrollment.data.totp.secret };
}

export async function verifyTotp(form: FormData) {
  if (!(await allowedAction(true))) redirect("/admin?estado=indisponivel");
  const input = z
    .object({ factorId: z.uuid(), code: z.string().regex(/^\d{6}$/) })
    .safeParse({ factorId: form.get("factor"), code: form.get("code") });
  if (!input.success) redirect("/admin?estado=mfa");
  const auth = await staffAuth();
  if ((await staffState(auth)).state !== "mfa") redirect("/admin");
  const result = await auth.auth.mfa.challengeAndVerify(input.data);
  redirect(result.error ? "/admin?estado=mfa" : "/admin");
}

export async function updateIntake(form: FormData) {
  if (!(await allowedAction())) redirect("/admin?estado=indisponivel");
  const auth = await staffAuth();
  const state = await staffState(auth);
  if (state.state !== "ready") redirect("/admin");
  const input = z
    .object({
      id: z.uuid(),
      status: adminStatusSchema,
      assignee: z.union([z.uuid(), z.literal("")]).nullable()
    })
    .safeParse({
      id: form.get("id"),
      status: form.get("status"),
      assignee: form.get("assignee")
    });
  if (!input.success) redirect("/admin?estado=atualizacao");
  const result = await serviceDatabase().rpc("chatbot_update_intake", {
    actor_id: state.profile.user_id,
    request_id: input.data.id,
    next_status: input.data.status,
    change_assignee: input.data.assignee !== null,
    next_assignee: input.data.assignee || null
  });
  redirect(
    result.error || result.data !== true
      ? "/admin?estado=atualizacao"
      : "/admin?estado=salvo"
  );
}

async function institutionalAdministrator() {
  if (!(await allowedAction())) redirect("/admin?estado=indisponivel");
  const state = await staffState(await staffAuth());
  if (state.state !== "ready" || state.profile.role !== "administrador")
    redirect("/admin");
  return state.profile.user_id;
}

const institutionalUrl = z
  .url({ protocol: /^https$/, hostname: /^(?:www\.)?flemingbatista\.com\.br$/ })
  .max(400)
  .refine((value) => {
    const url = new URL(value);
    return !url.username && !url.password && !url.port && !url.search && !url.hash;
  });

export async function addInstitutionalNote(form: FormData) {
  const actor = await institutionalAdministrator();
  const data = z
    .object({
      area: areaSchema,
      title: z.string().trim().min(2).max(250),
      url: institutionalUrl,
      excerpt: z.string().trim().min(20).max(1400),
      keywords: z.string().trim().max(250),
      review: z.iso.date(),
      approved: z.literal("on")
    })
    .safeParse(Object.fromEntries(form));
  if (!data.success) redirect("/admin?estado=fonte_invalida");
  const result = await serviceDatabase().rpc("chatbot_add_institutional_note", {
    actor_id: actor,
    selected_area: data.data.area,
    source_title: data.data.title,
    source_url: data.data.url,
    approved_excerpt: data.data.excerpt,
    search_keywords: data.data.keywords,
    expires_on: data.data.review
  });
  redirect(
    result.error || !result.data
      ? "/admin?estado=fonte_invalida"
      : "/admin?estado=fonte_salva"
  );
}

export async function withdrawInstitutionalNote(form: FormData) {
  const actor = await institutionalAdministrator();
  const id = z.uuid().safeParse(form.get("sourceId"));
  if (!id.success) redirect("/admin?estado=fonte_invalida");
  const result = await serviceDatabase().rpc("chatbot_withdraw_institutional_note", {
    actor_id: actor,
    source_id: id.data
  });
  redirect(
    result.error || result.data !== true
      ? "/admin?estado=fonte_invalida"
      : "/admin?estado=fonte_retirada"
  );
}
