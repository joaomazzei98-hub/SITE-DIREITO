import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Mapeia os elementos do Markdown para os tokens visuais do projeto. Sem
 * isso o texto do artigo sairia com o estilo padrão do navegador, e sem
 * precisar do plugin de tipografia do Tailwind.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-12 font-serif text-2xl leading-tight text-petrol sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-serif text-xl leading-tight text-petrol sm:text-2xl">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mt-5 text-base leading-8 text-graphite/80">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-8 text-graphite/80">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-base leading-8 text-graphite/80">
        {children}
      </ol>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-petrol">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-gold pl-5 text-base leading-8 text-graphite/70">
        {children}
      </blockquote>
    ),
    a: ({ href = "", children }) => (
      <Link
        href={href}
        className="font-semibold text-petrol underline decoration-gold/60 underline-offset-4 transition hover:text-gold"
      >
        {children}
      </Link>
    ),
    ...components
  };
}
