"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { PracticeArea } from "@/types/navigation";

type PracticeAreasCarouselProps = {
  areas: PracticeArea[];
};

export function PracticeAreasCarousel({ areas }: PracticeAreasCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(areas.length > 1);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const updateState = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-area-card]"));

      if (cards.length === 0) {
        return;
      }

      const trackLeft = track.getBoundingClientRect().left;
      const nextIndex = cards.reduce((closestIndex, card, index) => {
        const cardLeft = track.scrollLeft + card.getBoundingClientRect().left - trackLeft;
        const closestCard = cards[closestIndex];
        const closestLeft =
          track.scrollLeft + closestCard.getBoundingClientRect().left - trackLeft;

        return Math.abs(cardLeft - track.scrollLeft) <
          Math.abs(closestLeft - track.scrollLeft)
          ? index
          : closestIndex;
      }, 0);

      setActiveIndex(nextIndex);
      setCanScrollBack(track.scrollLeft > 4);
      setCanScrollForward(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
    };

    updateState();
    track.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);

    return () => {
      track.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [areas.length]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>("[data-area-card]")[index];

    if (!track || !card) {
      return;
    }

    track.scrollTo({
      left:
        track.scrollLeft +
        card.getBoundingClientRect().left -
        track.getBoundingClientRect().left,
      behavior: "smooth"
    });
  };

  const scrollByCard = (direction: -1 | 1) => {
    const nextIndex = Math.min(Math.max(activeIndex + direction, 0), areas.length - 1);
    scrollToIndex(nextIndex);
  };

  return (
    <div className="mt-10">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-serif text-3xl leading-tight text-petrol">Outras áreas</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Área anterior"
            title="Área anterior"
            disabled={!canScrollBack}
            onClick={() => scrollByCard(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-petrol/15 text-2xl leading-none text-petrol transition hover:-translate-y-0.5 hover:border-gold hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-35"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Próxima área"
            title="Próxima área"
            disabled={!canScrollForward}
            onClick={() => scrollByCard(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-petrol/15 text-2xl leading-none text-petrol transition hover:-translate-y-0.5 hover:border-gold hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-35"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        aria-label="Outras áreas de atuação"
      >
        {areas.map((area) => (
          <Link
            key={area.slug}
            data-area-card
            href={`/${area.slug}`}
            className="group flex h-[23rem] min-w-[min(82vw,21rem)] snap-start flex-col rounded-[1.6rem] border border-petrol/10 bg-white/70 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft sm:min-w-[21rem] lg:min-w-[22rem]"
          >
            <span className="mb-6 h-1 w-12 rounded-full bg-gold transition group-hover:w-16" />
            <h4 className="font-serif text-3xl leading-tight text-petrol">
              {area.title}
            </h4>
            <p className="text-graphite/72 mt-5 flex-1 overflow-hidden text-base leading-7">
              {area.description}
            </p>
            <span className="mt-6 text-sm font-semibold text-petrol transition group-hover:text-gold">
              Saiba mais
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {areas.map((area, index) => (
          <button
            key={area.slug}
            type="button"
            aria-label={`Ir para ${area.title}`}
            onClick={() => scrollToIndex(index)}
            className={`h-2.5 rounded-full transition ${
              activeIndex === index
                ? "w-8 bg-gold"
                : "w-2.5 bg-petrol/20 hover:bg-gold/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
