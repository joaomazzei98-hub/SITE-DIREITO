/**
 * Classes compartilhadas entre `ButtonLink` (server) e `WhatsAppLink`
 * (client), para que os dois tenham exatamente a mesma aparência.
 */
export const buttonBase =
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2";

export const buttonVariants = {
  primary: "bg-gold text-petrol shadow-soft hover:-translate-y-0.5 hover:bg-[#d4b77f]",
  secondary:
    "border border-gold/55 bg-transparent text-ivory hover:-translate-y-0.5 hover:bg-gold/10",
  ghost: "text-petrol underline-offset-4 hover:text-gold"
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
