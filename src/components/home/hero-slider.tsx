"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; alt: string; href: string };

const slides: Slide[] = [
  {
    src: "/images/Office_Tools-1920x790-03.webp",
    alt: "Deli office tools: calculators, staplers, tape dispensers and more",
    href: "/collections/office-tools",
  },
  {
    src: "/images/Kids-Creativity-1920x790-02.webp",
    alt: "Kids education and creative crafts",
    href: "/collections/kids-creativity",
  },
  {
    src: "/images/Kids-Creativity-1920x790-04.webp",
    alt: "Capypets stationery collection",
    href: "/collections/kids-creativity",
  },
];

const AUTOPLAY_MS = 7000;
const FADE_MS = 1000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Slides are stacked and crossfade, so wrapping from the last slide to the
  // first is just another fade: the carousel never visibly rewinds.
  const go = useCallback(
    (dir: 1 | -1) =>
      setCurrent((i) => (i + dir + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, go, current]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative aspect-[1920/790] w-full overflow-hidden bg-neutral-100"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => {
        const active = i === current;
        return (
          <div
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={!active}
            // `inert` keeps hidden slides' links out of the tab order and away from clicks.
            inert={!active}
            className={`absolute inset-0 transition-opacity ease-in-out ${
              active ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            <Link
              href={slide.href}
              className="absolute left-[17.35%] top-1/2 flex h-8 -translate-y-1/2 items-center rounded-full border border-neutral-900 bg-white px-4 text-xs font-medium text-neutral-900 transition hover:bg-neutral-900 hover:text-white sm:h-10 sm:px-7 sm:text-sm lg:h-12 lg:px-9 lg:text-[15px]"
            >
              Shop Now
            </Link>
          </div>
        );
      })}

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 z-20 flex size-[26px] -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-800 shadow-sm transition hover:bg-neutral-100 sm:left-[15px]"
      >
        <ChevronLeft className="size-4" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 z-20 flex size-[26px] -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-800 shadow-sm transition hover:bg-neutral-100 sm:right-[15px]"
      >
        <ChevronRight className="size-4" strokeWidth={1.75} />
      </button>
    </section>
  );
}
