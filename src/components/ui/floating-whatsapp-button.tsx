import { siteConfig } from "@/data/site";
import { createWhatsAppUrl } from "@/utils/whatsapp";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={createWhatsAppUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label={`Falar com a ${siteConfig.name} pelo WhatsApp`}
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-40 inline-flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 sm:bottom-6 sm:right-6 sm:px-5 lg:hidden"
    >
      <span className="flex h-2.5 w-2.5 rounded-full bg-white" aria-hidden="true" />
      WhatsApp
    </a>
  );
}
