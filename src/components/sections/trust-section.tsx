import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

const principles = [
  "Comunicação clara e responsável",
  "Estratégia jurídica orientada ao caso concreto",
  "Atendimento humano, discreto e acolhedor"
];

export function TrustSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="Princípios"
          title="Seriedade jurídica com escuta, clareza e acompanhamento próximo."
          description="Você recebe orientação responsável para entender riscos, caminhos possíveis e próximos passos antes de tomar decisões importantes."
        />

        <div className="grid gap-4">
          {principles.map((principle, index) => (
            <FadeIn key={principle}>
              <div className="rounded-3xl border border-petrol/10 bg-ivory p-6">
                <span className="font-serif text-4xl text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-lg font-medium text-petrol">{principle}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
