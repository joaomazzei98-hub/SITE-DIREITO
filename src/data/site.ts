import type { NavItem } from "@/types/navigation";

export const siteConfig = {
  name: "Mazzei e Fleming Advocacia",
  domain: "mazzeiefleming.com.br",
  url: "https://mazzeiefleming.com.br",
  locale: "pt_BR",
  location: "São Paulo - Zona Norte",
  phoneDisplay: "+55 11 97350-8868",
  whatsappNumber: "5511973508868",
  email: "contato@mazzeiefleming.com.br",
  description:
    "Escritório de advocacia em São Paulo - Zona Norte, com atuação em Direito Imobiliário, Previdenciário, Trabalhista e Cidadania Europeia."
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
  { label: "Previdenciário", href: "/previdenciario" },
  { label: "Trabalhista", href: "/trabalhista" },
  { label: "Cidadania Europeia", href: "/cidadania-europeia" },
  { label: "Política de Privacidade", href: "/politica-de-privacidade" }
];
