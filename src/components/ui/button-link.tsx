import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import {
  buttonBase,
  buttonVariants,
  type ButtonVariant
} from "@/components/ui/button-styles";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
};

export function ButtonLink({
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
      {...props}
    />
  );
}
