import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-gold text-petrol shadow-soft hover:-translate-y-0.5 hover:bg-[#d4b77f]",
  secondary:
    "border border-gold/55 bg-transparent text-ivory hover:-translate-y-0.5 hover:bg-gold/10",
  ghost: "text-petrol underline-offset-4 hover:text-gold"
};

export function ButtonLink({
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
