import { siteConfig } from "@/data/site";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;

export function legalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.name,
    url: siteUrl,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    areaServed: {
      "@type": "City",
      name: "São Paulo"
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR"
    },
    priceRange: "$$",
    knowsAbout: [
      "Direito Imobiliário",
      "Contratos imobiliários",
      "Regularização de imóveis",
      "Compra e venda de imóveis",
      "Locação de imóveis",
      "Usucapião",
      "Direito Civil",
      "Família e Sucessões",
      "Direito Previdenciário",
      "Direito Trabalhista",
      "Cidadania Italiana",
      "Cidadania Portuguesa"
    ]
  };
}
