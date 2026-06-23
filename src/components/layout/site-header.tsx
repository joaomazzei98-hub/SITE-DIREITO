"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { mainNavigation, siteConfig } from "@/data/site";
import { practiceAreas } from "@/data/practice-areas";
import { createWhatsAppUrl } from "@/utils/whatsapp";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isPracticePath = practiceAreas.some((area) => pathname === `/${area.slug}`);

  return (
    <header className="sticky top-0 z-50 border-b border-petrol/10 bg-ivory/90 backdrop-blur-xl">
      <div className="container-px mx-auto flex max-w-7xl items-center justify-between py-4">
        <Link href="/" className="group flex flex-col" aria-label={siteConfig.name}>
          <span className="font-serif text-xl font-semibold leading-none text-petrol">
            Mazzei & Fleming
          </span>
          <span className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-gold">
            Advocacia
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {mainNavigation.map((item) => {
            const isAreasItem = item.href === "/#areas";
            const isCurrent =
              item.href === pathname || (isAreasItem && (pathname === "/" || isPracticePath));

            if (isAreasItem) {
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    aria-haspopup="menu"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-petrol transition hover:opacity-75"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="text-[0.65rem] transition group-hover:rotate-180"
                    >
                      ▾
                    </span>
                  </Link>

                  <div
                    className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                  >
                    <div
                      role="menu"
                      className="rounded-3xl border border-petrol/10 bg-ivory p-3 shadow-soft"
                    >
                      {practiceAreas.map((area) => (
                        <Link
                          key={area.slug}
                          href={`/${area.slug}`}
                          role="menuitem"
                          className="block rounded-2xl px-4 py-3 text-sm font-medium text-petrol transition hover:bg-petrol/5 focus:bg-petrol/5 focus:outline-none"
                        >
                          {area.title}
                        </Link>
                      ))}
                      <Link
                        href="/#areas"
                        role="menuitem"
                        className="mt-1 block rounded-2xl border border-gold/35 px-4 py-3 text-sm font-semibold text-petrol transition hover:bg-gold/10 focus:bg-gold/10 focus:outline-none"
                      >
                        Ver todas as áreas
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className="text-sm font-medium text-petrol transition hover:opacity-75"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={createWhatsAppUrl()}
            className="rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-petrol transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
            target="_blank"
            rel="noreferrer"
          >
            Falar no WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-petrol/15 text-petrol lg:hidden"
          aria-label="Abrir menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-petrol/10 bg-ivory lg:hidden">
          <nav className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-4">
            {mainNavigation.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-2xl px-3 py-3 text-base font-medium text-petrol hover:bg-petrol/5"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                {item.href === "/#areas" ? (
                  <div className="ml-3 border-l border-petrol/10 pl-3">
                    {practiceAreas.map((area) => (
                      <Link
                        key={area.slug}
                        href={`/${area.slug}`}
                        className="block rounded-2xl px-3 py-2 text-sm font-medium text-petrol hover:bg-petrol/5"
                        onClick={() => setIsOpen(false)}
                      >
                        {area.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <a
              href={createWhatsAppUrl()}
              className="mt-3 rounded-full bg-[#25D366] px-5 py-3 text-center text-sm font-semibold text-petrol"
              target="_blank"
              rel="noreferrer"
            >
              Falar no WhatsApp
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
