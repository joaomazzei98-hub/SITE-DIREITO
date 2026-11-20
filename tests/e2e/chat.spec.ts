import { expect, test, type Page } from "@playwright/test";
import { legalAreas, noticeVersion } from "../../src/lib/chat/contracts";

async function openChat(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Assistente virtual" }).click();
  return page.getByRole("dialog", { name: "Assistente virtual" });
}

test("Mostra o aviso antes de iniciar a sessão", async ({ page }) => {
  const dialog = await openChat(page);
  await expect(
    dialog.getByRole("link", { name: "Política de privacidade", exact: false })
  ).toBeVisible();
  await expect(dialog.getByLabel("Sua pergunta")).toHaveCount(0);
  await dialog.getByRole("button", { name: "Iniciar conversa" }).click();
  await expect(dialog.getByLabel("Sua pergunta")).toBeVisible();
  await expect(dialog.getByText("Demonstração local.", { exact: false })).toBeVisible();
});

test("A política permanece acessível sem apagar a conversa", async ({
  page,
  context
}) => {
  const dialog = await openChat(page);
  await dialog.getByRole("button", { name: "Iniciar conversa" }).click();
  await dialog.getByLabel("Sua pergunta").fill("Tenho uma dúvida sobre aluguel");
  const link = dialog.getByRole("link", {
    name: "Política de privacidade",
    exact: false
  });
  const popup = context.waitForEvent("page");
  await link.click();
  const privacy = await popup;
  await expect(privacy).toHaveURL(/\/politica-de-privacidade$/);
  await expect(privacy.getByRole("heading", { name: "Guarda e exclusão" })).toBeVisible();
  await expect(privacy.getByRole("link", { name: "página de contato" })).toBeVisible();
  await privacy.close();
  await expect(dialog.getByLabel("Sua pergunta")).toHaveValue(
    "Tenho uma dúvida sobre aluguel"
  );
});

test("Os botões de área iniciam a conversa antes de oferecer atendimento humano", async ({
  page
}) => {
  const dialog = await openChat(page);
  await dialog.getByRole("button", { name: "Iniciar conversa" }).click();
  for (const label of Object.values(legalAreas)) {
    await dialog.getByRole("button", { name: label, exact: true }).click();
    await expect(dialog.getByRole("log")).toContainText("Qual é a sua dúvida?");
    await expect(
      dialog.getByRole("link", { name: "Atendimento humano", exact: true })
    ).toHaveCount(0);
    await expect(
      dialog.getByRole("button", { name: "Atendimento humano", exact: true })
    ).toHaveCount(0);
    await dialog.getByRole("button", { name: "Fechar", exact: true }).click();
    await page.getByRole("button", { name: "Assistente virtual", exact: true }).click();
    await dialog.getByRole("button", { name: "Iniciar conversa", exact: true }).click();
  }
});

test("Processa a pergunta e mostra a resposta real da API de demonstração", async ({
  page
}) => {
  const dialog = await openChat(page);
  await dialog.getByRole("button", { name: "Iniciar conversa" }).click();
  await dialog.getByLabel("Sua pergunta").fill("Tenho dúvida sobre escritura de imóvel.");
  await dialog.getByRole("button", { name: "Enviar", exact: true }).click();
  await expect(dialog.getByRole("log")).toContainText(
    "O assunto parece envolver Direito Imobiliário"
  );
  await expect(dialog.getByRole("link", { name: "Contato do escritório" })).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Pedir atendimento" })).toHaveCount(0);
  await dialog.getByRole("link", { name: "Atendimento humano", exact: true }).click();
  await expect(page).toHaveURL(/\/contato$/);
});

test("Permite fechar com Escape e devolve o foco", async ({ page }) => {
  const dialog = await openChat(page);
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Assistente virtual" })).toBeFocused();
});

test("Falha na resposta oferece um caminho para atendimento humano", async ({ page }) => {
  await page.route("**/api/chat", (route) =>
    route.fulfill({
      status: 503,
      json: { error: "Não foi possível responder agora. Selecione Atendimento humano." }
    })
  );
  const dialog = await openChat(page);
  await dialog.getByRole("button", { name: "Iniciar conversa" }).click();
  await dialog.getByLabel("Sua pergunta").fill("Tenho uma dúvida sobre aluguel.");
  await dialog.getByRole("button", { name: "Enviar", exact: true }).click();
  const alert = dialog.getByRole("alert");
  await expect(alert).toContainText("Não foi possível responder");
  await alert.getByRole("link", { name: "Atendimento humano", exact: true }).click();
  await expect(page).toHaveURL(/\/contato$/);
});

test("Cabe em tela estreita sem cobrir o botão de WhatsApp fechado", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/");
  const launch = page.getByRole("button", { name: "Assistente virtual" });
  const whatsapp = page.getByRole("link", {
    name: "Falar com a Fleming & Batista pelo WhatsApp"
  });
  const [left, right] = await Promise.all([launch.boundingBox(), whatsapp.boundingBox()]);
  expect(left).not.toBeNull();
  expect(right).not.toBeNull();
  expect(left!.x + left!.width).toBeLessThanOrEqual(right!.x);
  await launch.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  expect((await dialog.boundingBox())!.width).toBeLessThanOrEqual(320);
});

test("Bloqueia origem externa e chamadas sem sessão", async ({ request, baseURL }) => {
  expect(
    (
      await request.post("/api/chat/session", {
        headers: { Origin: "https://example.invalid" }
      })
    ).status()
  ).toBe(403);
  expect(
    (
      await request.post("/api/chat", {
        headers: { Origin: baseURL! },
        data: { message: "Olá" }
      })
    ).status()
  ).toBe(401);
});

test("Rejeita anexo e corpo excessivo", async ({ request, baseURL }) => {
  const headers = { Origin: baseURL! };
  expect((await request.post("/api/chat/session", { headers })).status()).toBe(200);
  expect(
    (
      await request.post("/api/chat", {
        headers,
        data: { message: "Olá", attachments: [] }
      })
    ).status()
  ).toBe(400);
  expect(
    (
      await request.post("/api/chat", { headers, data: { message: "x".repeat(25_000) } })
    ).status()
  ).toBe(400);
});

test("Demonstração mantém painel, registros e e-mail bloqueados", async ({
  request,
  baseURL
}) => {
  expect((await request.get("/admin")).status()).toBe(404);
  expect((await request.get("/api/internal/chat-delivery")).status()).toBe(404);
  expect(
    (
      await request.post("/api/intakes", { headers: { Origin: baseURL! }, data: {} })
    ).status()
  ).toBe(503);
});

test("Atendimento só por WhatsApp exige revisão e confirmação antes de mostrar o link", async ({
  page
}) => {
  let confirmed = 0;
  await page.route("**/api/chat/session", (route) =>
    route.fulfill({ json: { demo: true, channels: ["whatsapp"] } })
  );
  await page.route("**/api/intakes", async (route) => {
    const body = route.request().postDataJSON();
    if (body.action === "preview") {
      await route.fulfill({
        json: { draft: body.draft, receipt: "synthetic-review-receipt" }
      });
    } else {
      expect(body.confirmation.confirmed).toBe(true);
      expect(body.confirmation.noticeVersion).toBe(noticeVersion);
      expect(body.confirmation.draft.channel).toBe("whatsapp");
      confirmed++;
      await route.fulfill({
        json: {
          message:
            "Solicitação registrada. Abra o WhatsApp e envie a mensagem quando quiser.",
          whatsappUrl: "https://wa.me/5511000000000?text=Protocolo%3A%20teste"
        }
      });
    }
  });
  const dialog = await openChat(page);
  await dialog.getByRole("button", { name: "Iniciar conversa", exact: true }).click();
  await dialog.getByRole("button", { name: "Pedir atendimento", exact: true }).click();
  await expect(dialog.getByRole("combobox", { name: "Canal", exact: true })).toHaveValue(
    "whatsapp"
  );
  await expect(dialog.getByRole("option", { name: "E-mail", exact: true })).toHaveCount(
    0
  );
  await dialog.getByLabel("Primeiro nome", { exact: true }).fill("Visitante");
  await dialog
    .getByLabel("Seu telefone com DDD", { exact: true })
    .fill("(11) 00000-0000");
  await dialog
    .getByLabel("Resumo para o escritório", { exact: true })
    .fill("Desejo atendimento para revisar uma locação.");
  await dialog.getByRole("button", { name: "Revisar pedido", exact: true }).click();
  await expect(
    dialog.getByRole("heading", { name: "Confira seu pedido", exact: true })
  ).toBeVisible();
  expect(confirmed).toBe(0);
  await expect(
    dialog.getByRole("link", { name: "Abrir WhatsApp", exact: true })
  ).toHaveCount(0);
  await expect(
    dialog.getByRole("button", { name: "Confirmar solicitação", exact: true })
  ).toBeDisabled();
  await dialog.getByRole("checkbox").check();
  await dialog
    .getByRole("button", { name: "Confirmar solicitação", exact: true })
    .click();
  await expect(
    dialog.getByRole("link", { name: "Abrir WhatsApp", exact: true })
  ).toHaveAttribute("href", "https://wa.me/5511000000000?text=Protocolo%3A%20teste");
  expect(confirmed).toBe(1);
});
