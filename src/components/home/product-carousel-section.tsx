"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { LoopRow } from "@/components/ui/loop-row";
import type { Product } from "@/data/products";

/** Home-page section: heading, "View all" link and an endless 6-up product carousel. */
export function ProductCarouselSection({
  id,
  title,
  label,
  viewAllHref,
  products,
  className = "py-12 lg:pb-[60px]",
  autoplayMs = 4000,
}: {
  id: string;
  title: string;
  /** Accessible name of the carousel, also used in the arrow labels. */
  label: string;
  viewAllHref: string;
  products: Product[];
  className?: string;
  autoplayMs?: number;
}) {
  const headingId = `${id}-heading`;
  return (
    <section aria-labelledby={headingId} className={className}>
      <div className="mx-auto w-full max-w-[1750px] px-4 sm:px-[50px]">
        <div className="flex items-center justify-between gap-4 px-[15px]">
          <h2
            id={headingId}
            className="text-[24px] font-semibold text-neutral-950 lg:text-[30px]"
          >
            {title}
          </h2>
          <Link
            href={viewAllHref}
            className="shrink-0 text-[16px] font-medium text-neutral-950 underline underline-offset-4 transition hover:text-brand"
          >
            View all
          </Link>
        </div>

        <div className="mt-10 lg:mt-12">
          <LoopRow
            items={products}
            label={label}
            getKey={(p) => p.slug}
            visibleClassName="[--visible:2] md:[--visible:3] lg:[--visible:4] xl:[--visible:5] 2xl:[--visible:6]"
            clones={6}
            autoplayMs={autoplayMs}
            itemClassName="px-2 sm:px-[17px]"
            // Centre of the product card (image + two-line title + price).
            arrowTop="calc((100cqw / var(--visible) - 34px + 130px) / 2)"
            renderItem={(product, { isClone }) => (
              <ProductCard
                product={product}
                priceTone="sale"
                tabbable={!isClone}
                sizes="(min-width: 1536px) 240px, (min-width: 1024px) 25vw, 50vw"
              />
            )}
          />
        </div>
      </div>
    </section>
  );
}
