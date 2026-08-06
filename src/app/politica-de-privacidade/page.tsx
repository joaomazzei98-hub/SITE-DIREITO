import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { createMetadata } from "@/lib/metadata";

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
            <p>
              Este site utiliza as informações enviadas voluntariamente pelo usuário
              apenas para viabilizar contato e atendimento inicial pelos canais indicados.
            </p>
            <p>
              No momento, o site prioriza contato via WhatsApp. Ao iniciar uma conversa, o
              usuário passa a utilizar a plataforma do WhatsApp, sujeita às suas próprias
              políticas.
            </p>
            <p>
              O site utiliza medição de audiência da Vercel para acompanhar volume de
              visitas, páginas mais acessadas e desempenho de carregamento. A medição é
              anônima e agregada: não usa cookies, não cria identificador de usuário e não
              permite identificar quem visitou o site. Por isso não há banner de
              consentimento.
            </p>
            <p>
              Também é registrado, de forma anônima, em qual ponto do site o visitante
              clicou para iniciar a conversa no WhatsApp. O registro guarda apenas a
              origem do clique, nunca o conteúdo da conversa.
            </p>
            <p>
              Caso sejam adicionados pixels de anúncios ou formulários com armazenamento,
              esta política será atualizada para refletir os novos fluxos de tratamento de
              dados.
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
