"use client";

import { track } from "@vercel/analytics";
import type { ReactNode } from "react";

import {
  buttonBase,
  buttonVariants,
  type ButtonVariant
} from "@/components/ui/button-styles";

/**
 * Cada lugar do site que leva ao WhatsApp. O valor vai como propriedade do
 * evento, então dá para saber qual botão realmente traz cliente.
 */
export type WhatsAppOrigin =
  | "header"
  | "menu-mobile"
  | "hero"
  | "cta"
  | "problemas"
  | "rodape"
  | "flutuante"
  | "formulario-contato";

type WhatsAppLinkProps = {
  href: string;
  origem: WhatsAppOrigin;
  children: ReactNode;
  className?: string;
  /** Quando definido, aplica o mesmo visual do `ButtonLink`. */
  variant?: ButtonVariant;
  "aria-label"?: string;
};

export function WhatsAppLink({
  href,
  origem,
  children,
  className = "",
  variant,
  ...rest
}: WhatsAppLinkProps) {
  const classes = variant
    ? `${buttonBase} ${buttonVariants[variant]} ${className}`
    : className;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={classes}
      onClick={() => track("whatsapp_click", { origem })}
      {...rest}
    >
      {children}
    </a>
  );
}
