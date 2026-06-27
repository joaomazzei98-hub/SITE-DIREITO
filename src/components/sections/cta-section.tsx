import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { createWhatsAppUrl } from "@/utils/whatsapp";

type CtaSectionProps = {
  title?: string;
  description?: string;
};

export function CtaSection({
  title = "Precisa de orientação jurídica?",
  description = "Envie uma mensagem pelo WhatsApp e conte brevemente o seu caso. O atendimento começa com escuta, clareza e direcionamento responsável."
}: CtaSectionProps) {
  return (
    <section className="bg-ivory py-16 sm:py-20">
      <Container>
        <div className="overflow-hidden rounded-[2rem] bg-petrol px-6 py-10 text-ivory shadow-soft sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
              Atendimento jurídico
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
              {title}
            </h2>
            <p className="text-ivory/72 mt-4 max-w-2xl text-sm leading-6 sm:text-base">
              {description}
            </p>
          </div>
          <ButtonLink
            href={createWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            className="mt-8 lg:mt-0"
          >
            Falar com o escritório
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
