import { lawyers, officeAddress, officeHours, siteConfig } from "@/data/site";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function legalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.name,
    legalName: `${siteConfig.name} Sociedade de Advogados`,
    url: siteUrl,
    telephone: [siteConfig.phoneDisplay, siteConfig.phoneSecondaryDisplay],
    email: siteConfig.email,
    areaServed: {
      "@type": "City",
      name: "São Paulo"
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: officeAddress.street,
      addressLocality: officeAddress.city,
      addressRegion: officeAddress.region,
      postalCode: officeAddress.postalCode,
      addressCountry: officeAddress.country
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...officeHours.days],
        opens: officeHours.opens,
        closes: officeHours.closes
      }
    ],
    employee: lawyers.map((lawyer) => ({
      "@type": "Person",
      name: lawyer.name,
      jobTitle: lawyer.jobTitle
    })),
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

type FaqEntry = {
  question: string;
  answer: string;
};

export function faqPageSchema(faqs: readonly FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

type BreadcrumbEntry = {
  name: string;
  path: string;
};

export function breadcrumbSchema(trail: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path)
    }))
  };
}
