import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/** Full-width image banner with a centred text block over its left side. */
export function PromoBanner({
  id,
  href,
  image,
  imageAlt,
  imagePosition = "30% center",
  fallbackColor,
  kicker,
  title,
  description,
}: {
  id: string;
  href: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for the photo when it is cropped. */
  imagePosition?: string;
  /** Shown while the image loads. */
  fallbackColor: string;
  kicker: string;
  title: string;
  description: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section aria-labelledby={headingId} className="py-6 lg:py-[40px]">
      <Link
        href={href}
        style={{ backgroundColor: fallbackColor }}
        className="group relative flex min-h-[300px] w-full items-center overflow-hidden sm:min-h-[340px] xl:aspect-[1920/390] xl:min-h-0"
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          style={{ objectPosition: imagePosition }}
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
        />
        {/* Soft wash behind the text so it stays readable on smaller screens,
            where the busier parts of the photo sit under it. */}
        <div aria-hidden="true" className="absolute inset-0 bg-white/45 xl:bg-transparent" />
        <div className="relative w-full px-6 text-center xl:w-[42%] xl:px-0">
          <p className="text-[16px] text-black sm:text-[20px]">{kicker}</p>
          <h2
            id={headingId}
            className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.02em] text-black sm:text-[34px] lg:mt-[22px] 2xl:text-[40px]"
          >
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] text-[14px] leading-6 text-[#46474a] sm:text-[16px] lg:mt-[22px]">
            {description}
          </p>
        </div>
      </Link>
    </section>
  );
}
