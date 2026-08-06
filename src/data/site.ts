import type { NavItem } from "@/types/navigation";

export const siteConfig = {
  name: "Fleming & Batista",
  domain: "mazzei-fleming.vercel.app",
  url: "https://mazzei-fleming.vercel.app",
  locale: "pt_BR",
  location: "São Paulo - SP",
  phoneDisplay: "+55 11 97350-8868",
  phoneSecondaryDisplay: "+55 11 97131-5468",
  whatsappNumber: "5511973508868",
  email: "contato@flemmingbatista.com.br",
  description:
    "Escritório de advocacia em São Paulo, com foco em Direito Imobiliário e atuação em Direito Civil, Família e Sucessões, Previdenciário, Trabalhista e Cidadania Europeia."
} as const;

export const officeAddress = {
  street: "Av. Tucuruvi, 873 - Sala 5",
  city: "São Paulo",
  region: "SP",
  postalCode: "02305-002",
  country: "BR"
} as const;

export const officeHours = {
  display: "Segunda a sexta, 14h às 19h30",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "14:00",
  closes: "19:30"
} as const;

/**
 * Advogados responsáveis. Novos nomes entram aqui e aparecem no rodapé, na
 * página Sobre e no schema automaticamente.
 *
 * `oabRegion` e `oabNumber` não são exibidos hoje: o escritório pediu a
 * retirada do número em 2026-08-06. Os dados ficam aqui para que voltar a
 * mostrar seja apenas usar `formatOab` nos pontos de exibição.
 */
export const lawyers = [
  {
    name: "Ivani Mazzei Batista",
    jobTitle: "Advogada",
    oabRegion: "SP",
    oabNumber: "255.429"
  }
] as const;

export function formatOab(lawyer: (typeof lawyers)[number]) {
  return `OAB/${lawyer.oabRegion} ${lawyer.oabNumber}`;
}

export const mainNavigation: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Áreas de atuação", href: "/#areas" },
  { label: "Sobre", href: "/sobre" },
  { label: "FAQ", href: "/faq" },
  { label: "Contato", href: "/contato" }
];

export const footerNavigation: NavItem[] = [
  { label: "Direito Imobiliário", href: "/direito-imobiliario" },
  { label: "Direito Civil", href: "/direito-civil" },
  { label: "Família e Sucessões", href: "/familia-e-sucessoes" },
  { label: "Previdenciário", href: "/previdenciario" },
  { label: "Trabalhista", href: "/trabalhista" },
  { label: "Cidadania Europeia", href: "/cidadania-europeia" },
  { label: "Política de Privacidade", href: "/politica-de-privacidade" }
];
