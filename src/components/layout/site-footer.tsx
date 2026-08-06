import Link from "next/link";

import {
  footerNavigation,
  lawyers,
  officeAddress,
  officeHours,
  siteConfig
} from "@/data/site";
import { createWhatsAppUrl } from "@/utils/whatsapp";

export function SiteFooter() {
  return (
    <footer className="bg-petrol text-ivory">
      <div className="container-px mx-auto grid max-w-7xl gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-serif text-2xl font-semibold">{siteConfig.name}</p>
          <p className="text-ivory/72 mt-4 max-w-md text-sm leading-6">
            Advocacia com foco em Direito Imobiliário e atuação estratégica para pessoas,
            famílias e patrimônios em toda São Paulo.
          </p>
          <address className="mt-5 border-l-2 border-gold pl-3 text-sm not-italic leading-6 text-ivory">
            {officeAddress.street}
            <br />
            {officeAddress.city} - {officeAddress.region}, CEP {officeAddress.postalCode}
            <br />
            <span className="text-ivory/72">{officeHours.display}</span>
          </address>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Navegação
          </h2>
          <ul className="text-ivory/72 mt-2 text-sm">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center transition hover:text-gold"
                >
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
          <div className="text-ivory/72 mt-4 space-y-3 text-sm">
            <p>{siteConfig.phoneDisplay}</p>
            <p>{siteConfig.phoneSecondaryDisplay}</p>
            <p>{siteConfig.email}</p>
            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-gold/50 px-4 py-2 font-semibold text-ivory transition hover:bg-gold/10"
            >
              Iniciar conversa
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-px text-ivory/58 mx-auto flex max-w-7xl flex-col gap-3 py-5 text-xs md:flex-row md:items-start md:justify-between">
          <div className="space-y-1.5">
            <p className="text-gold">
              {siteConfig.name} Sociedade de Advogados
              {lawyers.map((lawyer) => (
                <span key={lawyer.name} className="text-ivory/72 block font-normal">
                  {lawyer.jobTitle} {lawyer.name}
                </span>
              ))}
            </p>
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos
              reservados.
            </p>
          </div>
          <p className="max-w-xs leading-5 md:text-right">
            Conteúdo informativo. A atuação profissional depende de análise do caso.
          </p>
        </div>
      </div>
    </footer>
  );
}
