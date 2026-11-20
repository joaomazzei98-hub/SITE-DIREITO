import Link from "next/link";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { createMetadata } from "@/lib/metadata";
import { chatbotMode } from "@/server/chat/settings";

export const metadata = createMetadata({
  title: "Política de Privacidade",
  description:
    "Política de privacidade da Fleming & Batista, com informações sobre contato, dados e canais de atendimento.",
  path: "/politica-de-privacidade"
});

export default function PoliticaDePrivacidadePage() {
  return (
    <section className="bg-paper-grain py-20 sm:py-24">
      <Container>
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
            Privacidade
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-tight text-petrol sm:text-5xl lg:text-6xl">
            Política de Privacidade
          </h1>
          <div className="mt-8 space-y-6 rounded-3xl border border-petrol/10 bg-white/75 p-6 text-sm leading-7 text-graphite/75">
            <div className="space-y-2">
              <h2 className="font-semibold text-petrol">Responsável e contato</h2>
              <p>
                A Fleming &amp; Batista é responsável pelo tratamento dos dados recebidos
                para orientação inicial e atendimento. Use os canais da{" "}
                <Link href="/contato" className="text-petrol underline">
                  página de contato
                </Link>{" "}
                para esclarecer o uso dos seus dados, pedir acesso ou correção e solicitar
                exclusão ou revogação de autorização, quando aplicável. A equipe poderá
                precisar confirmar sua identidade por um canal adequado.
              </p>
            </div>
            {chatbotMode() === "live" && (
              <div id="assistente-virtual" className="space-y-2">
                <h2 className="font-semibold text-petrol">Assistente virtual</h2>
                <p>
                  O assistente automatizado oferece informações gerais e ajuda a localizar
                  atendimento. A pergunta atual e até quatro trocas recentes de perguntas
                  e respostas são enviadas à OpenAI para identificar o assunto e redigir a
                  resposta com as fontes disponíveis. Números de documentos, telefones e
                  e-mails reconhecíveis são removidos antes desse envio. Essa filtragem é
                  limitada e não torna o texto anônimo.
                </p>
                <p>
                  Não envie nomes completos, cópias de documentos, senhas, dados médicos,
                  bancários ou de terceiros. O histórico fica na memória da janela do chat
                  e é descartado ao fechá-la ou recarregar a página. O site não grava esse
                  histórico em seu banco. A sessão usa um cookie necessário para
                  segurança, com expiração após 30 minutos sem atividade e duração máxima
                  de duas horas.
                </p>
                <p>
                  Solicitamos à API da OpenAI que não armazene a resposta como histórico
                  consultável. Isso não equivale a retenção zero pelo provedor. Podem
                  existir registros de segurança, prevenção de abuso e processamento,
                  conforme os controles da conta e a{" "}
                  <a
                    href="https://developers.openai.com/api/docs/guides/your-data"
                    target="_blank"
                    rel="noreferrer"
                    className="text-petrol underline"
                  >
                    documentação de tratamento de dados da OpenAI
                  </a>
                  .
                </p>
              </div>
            )}
            <div className="space-y-2">
              <h2 className="font-semibold text-petrol">Pedidos de atendimento</h2>
              <p>
                Os canais de contato recebem os dados que você decidir compartilhar.
                Quando o formulário do assistente estiver disponível, ele pedirá primeiro
                nome, contato, área jurídica, canal escolhido e um resumo escrito por
                você. É possível revisar e editar antes da confirmação. O formulário não
                envia o histórico completo da conversa à equipe nem usa a IA para analisar
                os dados de contato.
              </p>
              <p>
                Após a confirmação, o pedido, o protocolo e o registro da autorização
                ficam no banco Supabase para a equipe acompanhar a solicitação. O acesso
                depende das permissões da equipe. Se a notificação por e-mail estiver
                habilitada, o Resend recebe uma notificação com acesso ao painel, sem o
                resumo ou contato do visitante no corpo da mensagem.
              </p>
              <p>
                Ao abrir o WhatsApp ou outro canal externo, aplicam-se também as regras
                desse serviço. Gerar ou abrir um link não confirma entrega, contratação ou
                atendimento em prazo determinado. O chat não monitora emergências.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="font-semibold text-petrol">Guarda e exclusão</h2>
              <p>
                Os pedidos confirmados permanecem guardados para acompanhamento do
                atendimento e das obrigações aplicáveis. Ainda não há exclusão automática
                desses pedidos. Solicitações de exclusão são avaliadas pela equipe,
                inclusive quanto à necessidade de conservar informações para cumprir
                obrigações legais ou exercer direitos. Dados em cópias de segurança e
                registros dos provedores seguem também os respectivos ciclos de guarda.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="font-semibold text-petrol">Provedores e segurança</h2>
              <p>
                A hospedagem e os registros técnicos usam a Vercel. O assistente integrado
                usa OpenAI e Supabase. Os serviços habilitados podem tratar dados fora do
                Brasil, conforme a infraestrutura e as condições de cada provedor. O site
                usa registros técnicos de segurança e funcionamento. As métricas da IA
                registram etapa, modelo, duração e quantidade de tokens, sem o texto da
                pergunta ou da resposta nos registros da aplicação.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="font-semibold text-petrol">Audiência e desempenho</h2>
              <p>
                O site usa Vercel Analytics e Speed Insights para acompanhar visitas e
                desempenho. A medição não usa cookies de rastreamento. Também registramos
                a origem do clique em links de WhatsApp, sem o conteúdo da conversa. As
                páginas administrativas são excluídas dessas métricas. O cookie de sessão
                do assistente tem finalidade de funcionamento e segurança.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
