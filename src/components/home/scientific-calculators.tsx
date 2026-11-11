import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { scientificCalculators } from "@/data/products";

export function ScientificCalculators() {
  return (
    <section
      aria-labelledby="scientific-calculators-heading"
      className="py-12 lg:py-[60px]"
    >
      <div className="mx-auto w-full max-w-[1750px] px-4 sm:px-[50px]">
        <div className="grid items-start gap-12 sm:px-[19px] lg:grid-cols-2 lg:gap-[30px]">
          {/* Products */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2
                id="scientific-calculators-heading"
                className="text-[24px] font-semibold text-black lg:text-[28px]"
              >
                Scientific Calculators
              </h2>
              <Link
                href="/collections/scientific-calculator"
                className="shrink-0 text-[16px] font-medium text-neutral-950 underline underline-offset-4 transition hover:text-brand"
              >
                View all
              </Link>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 lg:mt-[56px] lg:gap-y-16 lg:px-[30px]">
              {scientificCalculators.map((product) => (
                <li key={product.slug}>
                  <ProductCard
                    product={product}
                    sizes="(min-width: 1536px) 345px, (min-width: 1024px) 20vw, 50vw"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Banner */}
          <Link
            href="/collections/calculators"
            className="group relative block aspect-[360/517] overflow-hidden rounded-lg bg-[#f6c4b4]"
          >
            <Image
              src="/images/cal-banner.webp"
              alt="Pastel Deli desktop calculators"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-x-0 top-0 px-6 pt-7 text-[#051e41] sm:px-[35px] sm:pt-[33px]">
              <p className="text-[16px] font-medium sm:text-[20px]">
                Keep counting with
              </p>
              <p className="mt-1 text-[36px] font-medium leading-tight tracking-[-0.03em] sm:text-[42px] 2xl:text-[48px]">
                Deli Calculators
              </p>
              <span className="mt-4 inline-flex h-9 items-center rounded-full border border-[#515152] bg-white px-4 text-[14px] text-neutral-950 transition hover:bg-neutral-950 hover:text-white sm:mt-5 sm:text-[15px]">
                Shop Now
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
