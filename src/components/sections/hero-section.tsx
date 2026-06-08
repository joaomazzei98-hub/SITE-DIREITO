import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { createWhatsAppUrl } from "@/utils/whatsapp";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-paper-grain">
      <div className="absolute right-[-8rem] top-16 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <Container className="grid min-h-[calc(100svh-76px)] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <FadeIn>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-gold">
            Advocacia em São Paulo - Zona Norte
          </p>
          <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] text-petrol sm:text-6xl lg:text-7xl">
            Soluções jurídicas com precisão técnica e cuidado humano.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-graphite/78">
            Atuação em Direito Imobiliário, Previdenciário, Trabalhista e
            Cidadania Europeia, com atendimento próximo e orientação clara para
            decisões importantes.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={createWhatsAppUrl()} target="_blank" rel="noreferrer">
              Agendar pelo WhatsApp
            </ButtonLink>
            <ButtonLink href="/#areas" variant="ghost">
              Conhecer áreas de atuação
            </ButtonLink>
          </div>
        </FadeIn>

        <FadeIn className="lg:justify-self-end">
          <div className="relative rounded-[2rem] bg-petrol p-7 text-ivory shadow-soft">
            <div className="absolute -left-5 top-10 h-20 w-1 rounded-full bg-gold" />
            <p className="text-sm uppercase tracking-[0.26em] text-gold">
              Atendimento estratégico
            </p>
            <h2 className="mt-6 font-serif text-3xl leading-tight">
              Um escritório preparado para orientar cada etapa com sobriedade,
              clareza e responsabilidade.
            </h2>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
