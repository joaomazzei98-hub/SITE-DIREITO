import { siteConfig } from "@/data/site";

export function createWhatsAppUrl(message?: string) {
  const text =
    message ??
    `Olá, encontrei o site da ${siteConfig.name} e gostaria de agendar uma conversa.`;

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
