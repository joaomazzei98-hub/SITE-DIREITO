import type { NavItem } from "@/types/navigation";

export const siteConfig = {
  name: "Flemming & Batista",
  domain: "mazzei-fleming.vercel.app",
  url: "https://mazzei-fleming.vercel.app",
  locale: "pt_BR",
  location: "São Paulo - Zona Norte",
  phoneDisplay: "+55 11 97350-8868",
  whatsappNumber: "5511973508868",
  email: "contato@flemmingbatista.com.br",
  description:
    "Escritório de advocacia em São Paulo - Zona Norte, com foco em Direito Imobiliário e atuação em Direito Civil, Família e Sucessões, Previdenciário, Trabalhista e Cidadania Europeia."
} as const;

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
