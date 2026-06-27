import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

const faqs = [
  {
    question: "Quando devo procurar orientação para regularizar um imóvel?",
    answer:
      "O ideal é buscar orientação quando houver ausência de escritura, matrícula desatualizada, contrato informal, divergência documental ou antes de comprar, vender ou transferir um imóvel."
  },
  {
    question: "O escritório revisa contrato de compra, venda ou locação?",
    answer:
      "Sim. A análise pode envolver documentos do imóvel, dados das partes, cláusulas de pagamento, garantias, multas, prazos e riscos da operação."
  },
  {
    question: "É possível resolver inventário de forma extrajudicial?",
    answer:
      "Em muitos casos, sim. O inventário pode ser feito em cartório quando há consenso entre os herdeiros, documentação adequada e observância dos requisitos legais."
  },
  {
    question: "Direito Civil inclui cobrança e indenização?",
    answer:
      "Sim. Demandas civis podem envolver contratos, obrigações, cobranças, dívidas, responsabilidade civil e análise de danos materiais ou morais."
  },
  {
    question: "Como saber se tenho direito à revisão da aposentadoria?",
    answer:
      "É necessário analisar carta de concessão, CNIS, histórico de contribuições e cálculos do benefício para identificar eventuais vínculos, salários ou períodos não considerados."
  },
  {
    question: "Quem pode solicitar LOAS?",
    answer:
      "O BPC/LOAS pode ser solicitado por pessoa idosa ou pessoa com deficiência que cumpra os requisitos legais de renda, vulnerabilidade social e documentação exigida."
  },
  {
    question: "Como funciona o processo de cidadania italiana?",
    answer:
      "O processo começa com análise da linha familiar, levantamento de certidões, verificação de divergências em documentos e definição da estratégia mais adequada para o reconhecimento."
  },
  {
    question: "Como funciona o processo de cidadania portuguesa?",
    answer:
      "A análise considera o vínculo familiar, a geração, documentos brasileiros e portugueses necessários e a hipótese legal aplicável ao pedido de nacionalidade."
  },
  {
    question: "O atendimento pode ser online?",
    answer:
      "Sim. O primeiro contato pode ser feito pelo WhatsApp, e a continuidade do atendimento pode ocorrer online ou presencialmente, conforme a necessidade do caso."
  }
];

export function FaqSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Perguntas frequentes"
          title="Dúvidas comuns antes do primeiro contato."
          description="Respostas iniciais para ajudar você a entender quando vale buscar orientação jurídica e quais informações podem ser importantes."
        />

        <div className="mt-12 grid gap-4">
          {faqs.map((item) => (
            <FadeIn key={item.question}>
              <details className="group rounded-[1.4rem] border border-petrol/10 bg-ivory p-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-serif text-xl leading-tight text-petrol marker:hidden sm:text-2xl">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/55 font-sans text-base text-gold transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="text-graphite/72 mt-4 max-w-4xl text-sm leading-6 sm:text-base sm:leading-7">
                  {item.answer}
                </p>
              </details>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
