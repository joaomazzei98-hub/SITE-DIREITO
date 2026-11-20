import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { format, resolveConfig } from "prettier";

import { legalAreas } from "../src/lib/chat/contracts";
import {
  basicFaq,
  basicFaqCheckedOn,
  basicFaqReviewUntil
} from "../src/server/chat/basic-knowledge";

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[char]!
  );

const heading = `Respostas gerais do Assistente virtual da Fleming & Batista para revisão jurídica do escritório antes da publicação em produção. Conferência original das fontes em ${basicFaqCheckedOn}, com revisão prevista até ${basicFaqReviewUntil}. A revisão técnica da sprint 3 não constitui aprovação jurídica institucional.\n\n`;
const faqMarkdown = (faq: (typeof basicFaq)[number], level: string) =>
  `${level} ${faq.question}\n\n${faq.excerpt} [${faq.title}](${faq.url})\n\n**Encaminhar ao atendimento humano quando** ${faq.reviewWhen}\n`;

const groups = Object.entries(legalAreas).map(([area, name]) => ({
  area,
  name,
  faqs: basicFaq.filter((faq) => faq.area === area)
}));

const realEstate =
  "# FAQ de Direito Imobiliário\n\n" +
  heading +
  groups[0].faqs.map((faq) => faqMarkdown(faq, "##")).join("\n");
const practice =
  "# FAQ das demais áreas\n\n" +
  heading +
  "Cidadania Europeia cobre os procedimentos italianos e portugueses. Direito do Consumidor permanece no escopo do chat.\n\n" +
  groups
    .slice(1)
    .map(
      (group) =>
        `## ${group.name}\n\n` +
        group.faqs.map((faq) => faqMarkdown(faq, "###")).join("\n")
    )
    .join("\n");

const report = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Sprint 3 — revisão do Assistente virtual</title>
<style>
:root{color-scheme:light;font:16px/1.65 system-ui,sans-serif;color:#16313e;background:#f7f4ed}*{box-sizing:border-box}body{margin:0}main{max-width:1000px;margin:auto;padding:32px 20px 80px}h1,h2,h3{line-height:1.3}h1{font-family:Georgia,serif;font-size:clamp(28px,5vw,42px)}h2{margin-top:40px}h3{font-size:18px}a{color:#16313e;text-underline-offset:3px;overflow-wrap:anywhere}p{margin:12px 0}.notice{padding:18px 22px;background:#fff;border-left:4px solid #b8985f;border-radius:8px}nav{display:flex;flex-wrap:wrap;gap:12px;margin:24px 0}nav a{background:#fff;padding:8px 12px;border:1px solid #ded8cb;border-radius:6px}article{padding:16px 24px;margin:16px 0;background:#fff;border:1px solid #e2ddd2;border-radius:10px;break-inside:avoid}article small{color:#62747c}article .handoff{padding-top:12px;border-top:1px solid #eee7da}table{width:100%;border-collapse:collapse;background:#fff}td,th{text-align:left;vertical-align:top;padding:12px;border:1px solid #ddd6c8}li{margin:8px 0}section{scroll-margin-top:20px}@media(max-width:500px){td,th{padding:7px;font-size:13px}article{padding:14px}}@media print{nav{display:none}body{background:white}main{padding:0}a{color:#000}article{border-color:#aaa}h2{break-after:avoid}}
</style></head><body><main>
<p>FLEMING &amp; BATISTA · ASSISTENTE VIRTUAL</p><h1>Sprint 3 · Conteúdo e privacidade</h1>
<div class="notice"><strong>Versão para revisão do escritório · 19/11/2026</strong><p>Este documento reúne as ${basicFaq.length} respostas do catálogo nas sete áreas. A aprovação jurídica do conteúdo e das decisões de privacidade ainda deve ser registrada pelo responsável. A autorização de deploy da prévia não substitui essa aprovação.</p><p>Conferência original das fontes em ${basicFaqCheckedOn}. Validade técnica até ${basicFaqReviewUntil}. As datas não foram prorrogadas nesta sprint.</p></div>
<nav aria-label="Seções"><a href="#criterios">Critérios</a><a href="#privacidade">Dados e retenção</a>${groups.map((g) => `<a href="#${g.area}">${escape(g.name)} (${g.faqs.length})</a>`).join("")}</nav>
<section id="criterios"><h2>Critérios de resposta e encaminhamento</h2><ol>
<li>Escolha de área abre uma pergunta sobre a dúvida, sem encaminhamento obrigatório.</li>
<li>Definições, listas de documentos e procedimentos gerais são respondidos primeiro, com fonte disponível. O cliente prepara os documentos fora do chat.</li>
<li>Análise de documento, cálculo, conclusão sobre direito individual ou escolha de estratégia exigem avaliação da equipe. O assistente explica a parte geral fundamentada antes de oferecer Atendimento humano.</li>
<li>Ausência, vencimento ou insuficiência de fonte implica encaminhamento sem inventar resposta. Pedidos de situações fictícias não são atendidos.</li>
<li>Prazo ou audiência iminente recebem orientação de atendimento prioritário. O chat não calcula ou suspende prazos e não garante resposta a tempo.</li>
<li>Perigo físico imediato recebe orientação para buscar local seguro e serviços oficiais de emergência. O chat não aciona socorro nem monitora emergências.</li></ol>
<p>As respostas abaixo são resumos disponíveis ao modelo. A redação exibida pode variar. A referência e a condição de encaminhamento acompanham cada item para conferência.</p></section>
<section id="privacidade"><h2>Dados e retenção para decisão do escritório</h2>
<p>A política pública foi corrigida para descrever a pergunta e até quatro trocas enviadas à OpenAI, os limites da filtragem, a sessão, os pedidos confirmados, provedores e o canal de direitos do titular. Não se afirma anonimização completa ou retenção zero. A política continua informando que não há exclusão automática de pedidos.</p>
<table><thead><tr><th>Conjunto</th><th>Funcionamento atual</th><th>Proposta / decisão pendente</th></tr></thead><tbody>
<tr><td>Conversa</td><td>Memória do componente no navegador. Descartada ao fechar o chat ou recarregar. Até quatro trocas seguem em cada chamada. Sem tabela de histórico.</td><td>Manter. Filtragem de identificadores não remove todos os nomes ou relatos sensíveis.</td></tr>
<tr><td>Sessão</td><td>Cookie HttpOnly, SameSite Strict, HTTPS fora de desenvolvimento. 30 minutos de inatividade, máximo de duas horas.</td><td>Manter. Expirar sessão não apaga pedidos confirmados nem registros dos provedores.</td></tr>
<tr><td>Pedido sem contratação</td><td>Nome, contato, área, resumo, canal e protocolo guardados após confirmação. Sem rotina de exclusão.</td><td>Proposta solicitada pelo usuário: excluir 90 dias após o encerramento, somente sem contratação e sem obrigação de conservação ou litígio. Ainda não implementada.</td></tr>
<tr><td>Autorização e auditoria</td><td>Versão do aviso, resumo criptográfico e data. Auditoria de status e atribuição. A exclusão do pedido não basta para eliminar todos os vínculos.</td><td>Definir fundamento e prazo próprio para prova de autorização e auditoria, inclusive se a guarda acompanhará os 90 dias ou houver necessidade distinta.</td></tr>
<tr><td>Pedido contratado</td><td>O sistema ainda não possui marcador confiável de contratação nem data imutável de encerramento.</td><td>Separar dos pedidos sem contratação e adotar a política de arquivos profissionais aprovada pelo escritório.</td></tr>
<tr><td>Provedores e backups</td><td>OpenAI recebe requisições com store=false. Hospedagem Vercel e dados Supabase. Resend somente quando e-mail habilitado.</td><td>Confirmar contratos, transferências internacionais, configurações reais de retenção e ciclo de backups antes de produção. Exclusão no banco ativo não significa eliminação instantânea nos provedores.</td></tr>
</tbody></table>
<h3>Implementação futura da proposta de 90 dias</h3><p>Antes de ativar a limpeza, registrar encerramento sem depender de updated_at, situação de contratação e bloqueio de conservação. Prever reabertura do pedido, fila de mensagens e eventos pendentes, registros de autorização e auditoria, relatório sem dados pessoais e reaplicação das exclusões após restauração de backup. Começar com simulação de candidatos e testes em banco descartável. Nenhum dado foi apagado nesta sprint.</p>
<h3>Pontos que precisam do responsável</h3><ul><li>Nome e data da aprovação jurídica das 95 respostas e dos critérios acima.</li><li>Fundamentos do tratamento, responsáveis por pedidos de titulares, conservação excepcional, prazos de auditoria e backups e condições dos provedores.</li><li>Revisão das condições de família e sucessões na Resolução CNJ 35 e suas alterações, incluindo 571/2024 e 695/2026. Os resumos não condicionam o inventário ao recolhimento prévio de ITCMD.</li><li>Revisão frequente de cidadania italiana e portuguesa, sem prometer elegibilidade, prazo ou lista documental definitiva.</li></ul>
<p>Referências para a revisão de privacidade: <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm">LGPD, especialmente arts. 6, 7, 9, 15, 16, 18 e 33</a>, <a href="https://developers.openai.com/api/docs/guides/your-data">dados na API OpenAI</a> e <a href="https://supabase.com/docs/guides/platform/backups">backups Supabase</a>. Os 90 dias são uma proposta operacional, não um prazo geral imposto pela LGPD.</p></section>
${groups.map((g) => `<section id="${g.area}"><h2>${escape(g.name)} · ${g.faqs.length} respostas</h2>${g.faqs.map((f) => `<article><small>FAQ #${f.number} · Aprovação jurídica pendente</small><h3>${escape(f.question)}</h3><p>${escape(f.excerpt)}</p><p><a href="${escape(f.url)}" target="_blank" rel="noreferrer">${escape(f.title)}</a></p><p class="handoff"><strong>Encaminhar quando</strong> ${escape(f.reviewWhen)}</p></article>`).join("\n")}</section>`).join("\n")}
</main></body></html>\n`;

async function main() {
  const files = {
    "faq-imobiliario.md": realEstate,
    "faq-demais-areas.md": practice,
    "revisao-sprint3.html": report
  };
  for (const [name, content] of Object.entries(files)) {
    const target = fileURLToPath(new URL("../docs/chatbot/" + name, import.meta.url));
    const formatted = await format(content, {
      ...(await resolveConfig(target)),
      filepath: target
    });
    if (process.argv.includes("--check")) {
      const current = await readFile(target, "utf8");
      if (current.replace(/\r\n/g, "\n") !== formatted.replace(/\r\n/g, "\n")) {
        throw new Error("Documento desatualizado. Execute npm run review:chatbot.");
      }
    } else {
      await writeFile(target, formatted, "utf8");
    }
  }
  console.log(
    `${basicFaq.length} respostas em ${groups.length} áreas. Documentos ${process.argv.includes("--check") ? "conferidos" : "gerados"}.`
  );
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Falha ao gerar revisão.");
  process.exitCode = 1;
});
