import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { createTestDatabase } from "./fixtures/database";

test("Migração de atendimento em PostgreSQL descartável", async (t) => {
  const db = await createTestDatabase();
  t.after(() => db.close());
  const id = randomUUID();
  const staff = randomUUID();
  const lawyer = randomUUID();
  const administrator = randomUUID();
  const submit =
    "select public.chatbot_submit_intake($1, $2, $3, $4, $5, $6, $7, $8, $9)";
  const values = [
    id,
    "Exemplo",
    "teste@example.invalid",
    "civil",
    "Este é um resumo fictício para teste.",
    "email",
    "regular",
    "atendimento-v1",
    "a".repeat(43)
  ];

  await t.test(
    "Anon e usuário autenticado comum não leem registros nem escrevem via RPC",
    async () => {
      for (const role of ["anon", "authenticated"]) {
        await db.exec("set role " + role);
        await assert.rejects(
          db.query("select * from public.chatbot_intakes"),
          /permission denied/
        );
        await assert.rejects(db.query(submit, values), /permission denied/);
        await db.exec("reset role");
      }
    }
  );

  await t.test(
    "Reenvios do mesmo pedido geram um único conjunto de registros",
    async () => {
      await db.exec("set role service_role");
      await db.query(submit, values);
      await db.query(submit, values);
      assert.equal(
        (await db.query("select * from public.chatbot_intakes")).rows.length,
        1
      );
      assert.equal((await db.query("select * from public.chatbot_leads")).rows.length, 1);
      assert.equal(
        (await db.query("select * from public.chatbot_delivery_attempts")).rows.length,
        1
      );
      await db.exec("reset role");
      assert.equal(
        (await db.query("select * from public.chatbot_consent_events")).rows.length,
        1
      );
    }
  );

  await t.test("Falha no evento de confirmação reverte dados e notificação", async () => {
    const broken = [randomUUID(), ...values.slice(1, 8), "digest-invalido"];
    await db.exec("set role service_role");
    await assert.rejects(db.query(submit, broken), /check constraint/);
    assert.equal((await db.query("select * from public.chatbot_leads")).rows.length, 1);
    assert.equal((await db.query("select * from public.chatbot_intakes")).rows.length, 1);
    assert.equal(
      (await db.query("select * from public.chatbot_delivery_attempts")).rows.length,
      1
    );
    await db.exec("reset role");
  });

  await t.test(
    "Atendente não pode atribuir e advogado só atualiza seu pedido",
    async () => {
      await db.query("insert into auth.users values ($1),($2),($3)", [
        staff,
        lawyer,
        administrator
      ]);
      await db.query(
        "insert into public.chatbot_admin_profiles(user_id,display_name,role) values ($1,'Equipe','atendente'),($2,'Advogado','advogado'),($3,'Admin','administrador')",
        [staff, lawyer, administrator]
      );
      await db.exec("set role service_role");
      const update = async (
        actor: string,
        change: boolean,
        assignee: string | null,
        status = "em_analise"
      ) =>
        (
          await db.query<{ result: boolean }>(
            "select public.chatbot_update_intake($1,$2,$3,$4,$5) as result",
            [actor, id, status, change, assignee]
          )
        ).rows[0].result;
      assert.equal(await update(staff, true, lawyer), false);
      assert.equal(await update(lawyer, false, null), false);
      assert.equal(await update(administrator, true, lawyer), true);
      assert.equal(await update(lawyer, false, null, "concluido"), true);
      assert.equal(
        (await db.query("select * from public.chatbot_audit_logs")).rows.length,
        2
      );
      await db.exec("reset role");
    }
  );

  await t.test(
    "Limite de orçamento é aplicado sem consumir os outros contadores em falha",
    async () => {
      const expires = "2099-01-01T00:00:00Z";
      const budgets = [
        { bucket: "origem", maximum: 1, expires },
        { bucket: "dia", maximum: 3, expires }
      ];
      await db.exec("set role service_role");
      const consume = async () =>
        (
          await db.query<{ allowed: boolean }>(
            "select public.chatbot_consume_budget($1) as allowed",
            [JSON.stringify(budgets)]
          )
        ).rows[0].allowed;
      assert.equal(await consume(), true);
      assert.equal(await consume(), false);
      assert.equal(
        (
          await db.query<{ consumed: number }>(
            "select consumed from public.chatbot_rate_limits where bucket='dia'"
          )
        ).rows[0].consumed,
        1
      );
      await db.exec("reset role");
    }
  );

  await t.test(
    "Busca só devolve fonte aprovada e dentro da data de revisão",
    async () => {
      const rows = (
        await db.query<{ id: string }>(
          "insert into public.chatbot_knowledge_sources(institution,title,url,kind,version,status,checked_on,review_until) values " +
            "('Exemplo','Revisada','https://example.invalid/a','institucional','1','approved',current_date,current_date+30)," +
            "('Exemplo','Rascunho','https://example.invalid/b','institucional','1','draft',null,null)," +
            "('Exemplo','Vencida','https://example.invalid/c','institucional','1','approved',current_date-30,current_date-1) returning id"
        )
      ).rows;
      for (const source of rows) {
        await db.query(
          "insert into public.chatbot_knowledge_documents(source_id,area,excerpt) values ($1,'imobiliario','Material sintético de teste sobre aluguel.')",
          [source.id]
        );
      }
      const found = await db.query<{ title: string }>(
        "select title from public.chatbot_search_knowledge('aluguel','imobiliario')"
      );
      assert.deepEqual(found.rows, [{ title: "Revisada" }]);
    }
  );

  await t.test("A fila entrega o mesmo trabalho a um só processador", async () => {
    await db.exec("set role service_role");
    assert.deepEqual((await db.query("select public.chatbot_claim_email() as id")).rows, [
      { id }
    ]);
    assert.deepEqual((await db.query("select public.chatbot_claim_email() as id")).rows, [
      { id: null }
    ]);
    await db.exec("reset role");
  });

  await t.test(
    "Só administrador ativo pode publicar e retirar uma nota institucional",
    async () => {
      const insert =
        "select public.chatbot_add_institutional_note($1,'civil','Nota de teste','https://www.flemingbatista.com.br/sobre','Trecho institucional sintético para teste.','atendimento',current_date+30) as id";
      await db.exec("set role service_role");
      assert.equal(
        (await db.query<{ id: string | null }>(insert, [lawyer])).rows[0].id,
        null
      );
      const source = (await db.query<{ id: string }>(insert, [administrator])).rows[0].id;
      assert.ok(source);
      const withdraw =
        "select public.chatbot_withdraw_institutional_note($1,$2) as removed";
      assert.equal(
        (await db.query<{ removed: boolean }>(withdraw, [staff, source])).rows[0].removed,
        false
      );
      assert.equal(
        (await db.query<{ removed: boolean }>(withdraw, [administrator, source])).rows[0]
          .removed,
        true
      );
      assert.equal(
        (
          await db.query<{ status: string }>(
            "select status from public.chatbot_knowledge_sources where id=$1",
            [source]
          )
        ).rows[0].status,
        "withdrawn"
      );
      await db.exec("reset role");
    }
  );

  await t.test(
    "Cidadania pode ser usada na busca e no registro de atendimento",
    async () => {
      const citizenshipIntakeId = randomUUID();
      await db.exec("set role service_role");
      try {
        const found = await db.query(
          "select title from public.chatbot_search_knowledge('cidadania portuguesa','cidadania')"
        );
        assert.deepEqual(found.rows, []);
        const citizenshipIntake = [...values];
        citizenshipIntake[0] = citizenshipIntakeId;
        citizenshipIntake[3] = "cidadania";
        await db.query(submit, citizenshipIntake);
        const result = await db.query(
          "select area from public.chatbot_intakes where id=$1",
          [citizenshipIntakeId]
        );
        assert.deepEqual(result.rows, [{ area: "cidadania" }]);
      } finally {
        await db.exec("reset role");
      }
    }
  );
});
