"use client";

import { useActionState } from "react";

import { enrollTotp, verifyTotp } from "./actions";

export function TotpEnrollment() {
  const [state, enroll, pending] = useActionState(enrollTotp, {});
  if (!state.id || !state.secret)
    return (
      <form action={enroll} className="space-y-2">
        <button type="submit" disabled={pending} className="min-h-11 underline">
          Configurar autenticador
        </button>
        {state.error && <p role="alert">{state.error}</p>}
      </form>
    );
  return (
    <form action={verifyTotp} className="space-y-3">
      <p>
        Adicione uma conta baseada em tempo no aplicativo autenticador e insira este
        código de configuração.
      </p>
      <p className="break-all rounded border border-petrol/20 bg-white p-2 font-mono">
        {state.secret}
      </p>
      <input type="hidden" name="factor" value={state.id} />
      <label className="block">
        Código de 6 dígitos
        <input
          required
          name="code"
          inputMode="numeric"
          pattern="[0-9]{6}"
          autoComplete="one-time-code"
          className="mt-1 block rounded"
        />
      </label>
      <button type="submit" className="min-h-11 underline">
        Verificar
      </button>
    </form>
  );
}
