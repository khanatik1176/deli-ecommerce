import Image from "next/image";
import Link from "next/link";

type Tile = {
  title: string;
  href: string;
  image: string;
  /** Rendered `sizes` for next/image at the widest layout. */
  sizes: string;
  titleClassName: string;
  buttonLabel?: string;
  /** Distance from the top of the tile to the title. */
  contentClassName?: string;
};

const tiles = {
  coloring: {
    title: "Coloring Products",
    href: "/collections/coloring-products",
    image: "/images/Show1.webp",
    sizes: "(min-width: 1024px) 42vw, 100vw",
    titleClassName:
      "max-w-[260px] text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-[#051e41] lg:max-w-[300px] lg:text-[46px] 2xl:max-w-[320px] 2xl:text-[54px]",
    buttonLabel: "shop now",
    contentClassName: "pt-8 2xl:pt-[45px]",
  },
  business: {
    title: "Business Pens",
    href: "/collections/business-pens",
    image: "/images/Show2.avif",
    sizes: "(min-width: 1024px) 33vw, 100vw",
    titleClassName: "text-[24px] font-bold text-[#111] 2xl:text-[28px]",
  },
  desktop: {
    title: "Desktop Tools",
    href: "/collections/desktop-solutions",
    image: "/images/show3.avif",
    sizes: "(min-width: 1024px) 16vw, 50vw",
    titleClassName:
      "max-w-[120px] text-[20px] font-bold leading-[1.25] text-[#051e41] 2xl:text-[24px]",
  },
  adhesives: {
    title: "Adhesives",
    href: "/collections/adhesives",
    image: "/images/show4.avif",
    sizes: "(min-width: 1024px) 16vw, 50vw",
    titleClassName: "text-[20px] font-bold text-[#051e41] 2xl:text-[24px]",
  },
  school: {
    title: "School Stationery",
    href: "/collections/school-stationery",
    image: "/images/show5.webp",
    sizes: "(min-width: 1024px) 25vw, 100vw",
    titleClassName:
      "max-w-[160px] text-[24px] font-bold leading-[1.1] text-[#051e41] 2xl:text-[28px]",
  },
} satisfies Record<string, Tile>;

function ShowcaseTile({
  tile,
  className = "",
}: {
  tile: Tile;
  className?: string;
}) {
  return (
    <Link
      href={tile.href}
      className={`group relative block overflow-hidden rounded-lg bg-neutral-100 ${className}`}
    >
      <Image
        src={tile.image}
        alt=""
        fill
        sizes={tile.sizes}
        className="object-cover transition duration-700 ease-out group-hover:scale-105"
      />
      <div
        className={`absolute inset-x-0 top-0 flex flex-col items-center px-4 text-center ${
          tile.contentClassName ?? "pt-6"
        }`}
      >
        <h3 className={tile.titleClassName}>{tile.title}</h3>
        <span className="mt-2.5 flex h-[34px] items-center rounded-full border border-[#515152] bg-white px-4 text-[14px] text-neutral-950 transition hover:bg-neutral-950 hover:text-white 2xl:text-[15px]">
          {tile.buttonLabel ?? "Shop Now"}
        </span>
      </div>
    </Link>
  );
}

export function Showcase() {
  return (
    <section
      aria-label="Shop by collection"
      className="pb-12 pt-14 lg:pb-[75px]"
    >
      <div className="mx-auto w-full max-w-[1750px] px-4 sm:px-[50px]">
        <div className="sm:px-[19px]">
          <div className="grid gap-4 sm:grid-cols-2 lg:aspect-[1612/771] lg:grid-cols-[658fr_521fr_385fr] lg:grid-rows-[490fr_257fr] lg:gap-6">
            <ShowcaseTile
              tile={tiles.coloring}
              className="aspect-[4/5] sm:aspect-auto sm:min-h-[480px] lg:row-span-2 lg:min-h-0"
            />
            <ShowcaseTile
              tile={tiles.school}
              className="aspect-[4/5] sm:aspect-auto sm:min-h-[480px] lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:min-h-0"
            />
            <ShowcaseTile
              tile={tiles.business}
              className="aspect-[521/490] lg:col-start-2 lg:row-start-1 lg:aspect-auto"
            />
            <div className="grid grid-cols-2 gap-4 lg:col-start-2 lg:row-start-2 lg:gap-6">
              <ShowcaseTile
                tile={tiles.desktop}
                className="aspect-[248/257] sm:aspect-auto"
              />
              <ShowcaseTile
                tile={tiles.adhesives}
                className="aspect-[248/257] sm:aspect-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
