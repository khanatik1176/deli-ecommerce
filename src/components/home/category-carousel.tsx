"use client";

import Image from "next/image";
import Link from "next/link";
import { LoopRow } from "@/components/ui/loop-row";
import { homeCategories } from "@/data/home-categories";

export function CategoryCarousel({
  id = "categories",
  title = "Categories",
  kicker,
  className = "py-12 lg:py-[60px]",
}: {
  id?: string;
  title?: string;
  /** Small uppercase line shown above the title. */
  kicker?: string;
  className?: string;
} = {}) {
  const headingId = `${id}-heading`;
  return (
    <section aria-labelledby={headingId} className={className}>
      <div className="mx-auto w-full max-w-[1750px] px-4 sm:px-[50px]">
        {kicker && (
          <p className="mb-2 px-[15px] text-[16px] uppercase text-neutral-950 sm:text-[20px] lg:mb-3 2xl:text-[22px]">
            {kicker}
          </p>
        )}
        <h2
          id={headingId}
          className="px-[15px] text-[24px] font-semibold text-neutral-950 lg:text-[30px]"
        >
          {title}
        </h2>

        <div className="mt-8 lg:mt-[38px]">
          <LoopRow
            items={homeCategories}
            label="Categories"
            getKey={(c) => c.slug}
            visibleClassName="[--visible:2] sm:[--visible:3] md:[--visible:4] lg:[--visible:5] xl:[--visible:6] 2xl:[--visible:7] 3xl:[--visible:8]"
            clones={8}
            autoplayMs={3500}
            // Centre of the circle: circle = slot width minus padding, max 175px.
            arrowTop="calc(min(175px, 100cqw / var(--visible) - 31px) / 2)"
            renderItem={(category, { isClone }) => (
              <Link
                href={`/collections/${category.slug}`}
                tabIndex={isClone ? -1 : undefined}
                className="group block text-center"
              >
                <div className="relative mx-auto aspect-square w-full max-w-[175px] overflow-hidden rounded-full bg-[#efecec]">
                  <Image
                    src={category.image}
                    alt={isClone ? "" : category.name}
                    fill
                    sizes="175px"
                    className="object-contain p-[9%] transition duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-5 text-[14px] font-medium text-neutral-800 transition group-hover:text-neutral-950 sm:text-[16px]">
                  {category.name}
                </h3>
                <p className="mt-2 min-h-5 text-[13px] text-neutral-500">
                  {category.itemCount !== undefined &&
                    `${category.itemCount} items`}
                </p>
              </Link>
            )}
          />
        </div>

        <div className="mt-10 flex justify-end px-[15px] lg:mt-[45px]">
          <Link
            href="/collections"
            className="flex h-[46px] items-center rounded-full border border-neutral-900 px-[30px] text-[16px] font-medium text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
