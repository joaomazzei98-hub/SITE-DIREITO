import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="bg-paper-grain py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
            Página não encontrada
          </p>
          <h1 className="mt-5 font-serif text-5xl text-petrol">
            Este caminho não existe.
          </h1>
          <p className="mt-5 text-graphite/75">
            Volte para a página inicial ou entre em contato pelo WhatsApp.
          </p>
          <ButtonLink href="/" className="mt-8">
            Voltar ao início
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
