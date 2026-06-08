import { WhatsAppLeadForm } from "@/components/forms/whatsapp-lead-form";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contato",
  description:
    "Entre em contato com a Mazzei e Fleming Advocacia pelo WhatsApp. Atendimento em São Paulo - Zona Norte.",
  path: "/contato"
});

export default function ContatoPage() {
  return (
    <section className="bg-paper-grain py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-start">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
            Contato
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-tight text-petrol sm:text-6xl">
            Fale com a Mazzei e Fleming Advocacia.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite/78">
            Conte brevemente sua necessidade e escolha o assunto principal para
            iniciar uma conversa pelo WhatsApp.
          </p>
          <div className="mt-8 rounded-3xl border border-petrol/10 bg-white/60 p-6 text-sm leading-7 text-graphite/75">
            <p>
              <strong className="text-petrol">WhatsApp:</strong>{" "}
              {siteConfig.phoneDisplay}
            </p>
            <p>
              <strong className="text-petrol">E-mail:</strong> {siteConfig.email}
            </p>
            <p>
              <strong className="text-petrol">Localização:</strong>{" "}
              {siteConfig.location}
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <WhatsAppLeadForm />
        </FadeIn>
      </Container>
    </section>
  );
}
