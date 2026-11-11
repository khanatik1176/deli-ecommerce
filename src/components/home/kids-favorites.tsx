import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { kidsFavorites } from "@/data/products";

export function KidsFavorites() {
  return (
    <section aria-labelledby="kids-favorites-heading" className="py-12 lg:py-[60px]">
      <div className="mx-auto w-full max-w-[1750px] px-4 sm:px-[50px]">
        {/* Banner is one third of the content width (517px of 1612px); the
            product block is 791px, matching the design. */}
        <div className="grid gap-12 sm:px-[19px] lg:max-w-[83%] lg:grid-cols-[517fr_791fr] lg:gap-[30px]">
          {/* Banner: stretches to the height of the product grid on desktop */}
          <Link
            href="/collections/kids-favorites"
            className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-[#f3d9b5] lg:aspect-auto lg:min-h-[600px]"
          >
            <Image
              src="/images/kid-banner.webp"
              alt="Child playing with colourful foam blocks"
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-x-0 top-0 px-6 pt-8 text-[#051e41] sm:px-[35px] sm:pt-[38px]">
              <p className="text-[36px] font-medium leading-tight tracking-[-0.03em] sm:text-[42px] 2xl:text-[48px]">
                Kids Favorites
              </p>
              <span className="mt-4 inline-flex h-10 items-center rounded-full border border-[#515152] bg-white px-4 text-[14px] text-neutral-950 transition hover:bg-neutral-950 hover:text-white sm:mt-5 sm:text-[15px]">
                Shop Now
              </span>
            </div>
          </Link>

          {/* Products */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2
                id="kids-favorites-heading"
                className="text-[24px] font-semibold text-black lg:text-[28px]"
              >
                Kids Favorites
              </h2>
              <Link
                href="/collections/kids-favorites"
                className="shrink-0 text-[16px] font-medium text-neutral-950 underline underline-offset-4 transition hover:text-brand"
              >
                View all
              </Link>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 sm:gap-x-[30px] lg:mt-[50px] lg:gap-y-[50px] lg:px-[15px]">
              {kidsFavorites.map((product) => (
                <li key={product.slug}>
                  <ProductCard
                    product={product}
                    sizes="(min-width: 1536px) 224px, (min-width: 1024px) 14vw, (min-width: 640px) 33vw, 50vw"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
