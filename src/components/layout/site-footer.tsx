import Link from "next/link";

import { footerNavigation, siteConfig } from "@/data/site";
import { createWhatsAppUrl } from "@/utils/whatsapp";

export function SiteFooter() {
  return (
    <footer className="bg-petrol text-ivory">
      <div className="container-px mx-auto grid max-w-7xl gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-serif text-2xl font-semibold">Mazzei & Fleming</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-ivory/72">
            Advocacia contemporânea, acolhedora e estratégica para pessoas e famílias
            em São Paulo - Zona Norte.
          </p>
          <p className="mt-5 text-sm text-ivory/72">{siteConfig.location}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Navegação
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-ivory/72">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Atendimento
          </h2>
          <div className="mt-4 space-y-3 text-sm text-ivory/72">
            <p>{siteConfig.phoneDisplay}</p>
            <p>{siteConfig.email}</p>
            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-gold/50 px-4 py-2 font-semibold text-ivory transition hover:bg-gold/10"
            >
              Iniciar conversa
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-px mx-auto flex max-w-7xl flex-col gap-3 py-5 text-xs text-ivory/58 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos
            reservados.
          </p>
          <p>Conteúdo informativo. A atuação profissional depende de análise do caso.</p>
        </div>
      </div>
    </footer>
  );
}
