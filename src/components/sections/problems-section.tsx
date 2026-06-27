import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site";
import { createWhatsAppUrl } from "@/utils/whatsapp";

const problems = [
  {
    title: "Imóvel sem escritura ou matrícula regularizada",
    description:
      "Organize documentos, entenda pendências e avalie o caminho jurídico para regularizar o imóvel.",
    message: `Olá, encontrei o site da ${siteConfig.name} e preciso de orientação sobre imóvel sem escritura ou matrícula regularizada.`
  },
  {
    title: "Contrato de compra, venda ou locação",
    description:
      "Revise cláusulas, documentos, garantias e riscos antes de assinar ou encerrar uma negociação imobiliária.",
    message: `Olá, encontrei o site da ${siteConfig.name} e gostaria de orientação sobre contrato de compra, venda ou locação de imóvel.`
  },
  {
    title: "Posse, usucapião ou conflito com imóvel",
    description:
      "Avalie documentos, histórico de ocupação, notificações e caminhos possíveis para proteger seus direitos.",
    message: `Olá, encontrei o site da ${siteConfig.name} e preciso de orientação sobre posse, usucapião ou conflito envolvendo imóvel.`
  },
  {
    title: "Inventário ou partilha de bens",
    description:
      "Receba orientação para conduzir a divisão de bens com segurança e reduzir conflitos familiares.",
    message: `Olá, encontrei o site da ${siteConfig.name} e gostaria de orientação sobre inventário ou partilha de bens.`
  },
  {
    title: "Contrato civil, cobrança ou indenização",
    description:
      "Entenda direitos, provas e alternativas quando uma obrigação civil não foi cumprida ou causou prejuízo.",
    message: `Olá, encontrei o site da ${siteConfig.name} e gostaria de orientação sobre Direito Civil.`
  },
  {
    title: "Aposentadoria, LOAS ou pensão por morte",
    description:
      "Analise requisitos, documentos e possibilidades antes de fazer ou revisar um pedido previdenciário.",
    message: `Olá, encontrei o site da ${siteConfig.name} e preciso de ajuda com aposentadoria, LOAS ou pensão por morte.`
  },
  {
    title: "Verbas trabalhistas e rescisão",
    description:
      "Confira direitos, pagamentos e alternativas quando houver dúvidas sobre a saída do emprego.",
    message: `Olá, encontrei o site da ${siteConfig.name} e gostaria de orientação sobre verbas trabalhistas e rescisão.`
  },
  {
    title: "Cidadania italiana ou portuguesa",
    description:
      "Entenda a linha familiar, documentos necessários, possíveis retificações e a estratégia do processo.",
    message: `Olá, encontrei o site da ${siteConfig.name} e quero orientação sobre cidadania italiana ou portuguesa.`
  }
];

export function ProblemsSection() {
  return (
    <section className="bg-paper-grain py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Situações comuns"
          title="Problemas com imóveis merecem atenção antes de virarem urgência."
          description="Contratos, regularização, posse e locação concentram riscos importantes. Quando o caso envolve outras áreas, o atendimento segue com a mesma análise responsável."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <FadeIn key={problem.title}>
              <article className="flex h-full flex-col rounded-[1.6rem] border border-petrol/10 bg-white/75 p-6 shadow-sm">
                <span className="mb-5 block h-1 w-10 rounded-full bg-gold" />
                <h3 className="font-serif text-2xl leading-tight text-petrol">
                  {problem.title}
                </h3>
                <p className="text-graphite/72 mt-4 flex-1 text-sm leading-6">
                  {problem.description}
                </p>
                <a
                  href={createWhatsAppUrl(problem.message)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Falar pelo WhatsApp sobre ${problem.title}`}
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-gold/55 px-4 py-2 text-sm font-semibold text-petrol transition hover:-translate-y-0.5 hover:bg-gold/10 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                >
                  Conversar sobre isso
                </a>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
