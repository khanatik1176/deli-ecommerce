import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/layout/page-banner";

export const metadata: Metadata = {
  title: "About Us | Deli Ecommerce",
  description:
    "Deli Bangladesh, a joint venture between ACI Group and Deli Group, makes school and office essentials for everyday progress.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageBanner
        title="About us"
        crumb="About us"
        image="/images/aboutus.webp"
        className="h-[220px] sm:h-[322px]"
      />

      <section
        aria-labelledby="about-heading"
        className="mx-auto w-full max-w-[1750px] px-4 py-12 sm:px-[50px] lg:pb-[100px] lg:pt-[100px]"
      >
        <div className="grid items-center gap-10 sm:px-[19px] lg:grid-cols-2 lg:gap-[30px]">
          <Image
            src="/images/aboutdeli-banner1.webp"
            alt="A team working together at a table with laptops, charts and stationery"
            width={1880}
            height={1253}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full"
          />
          <div className="mx-auto max-w-[560px] text-center">
            <h2
              id="about-heading"
              className="text-[28px] font-medium tracking-[-0.03em] text-black sm:text-[38px]"
            >
              About Deli Bangladesh
            </h2>
            <div className="mt-6 space-y-5 text-[15px] leading-[30px] text-neutral-800 sm:text-[16px]">
              <p>
                Deli Bangladesh, a joint venture between ACI Group and Deli
                Group, is driven by a simple belief—every great journey of
                learning and achievement begins with the right tools. From a
                child&rsquo;s first strokes of color that spark imagination and
                creativity, to the essential instruments that support focus,
                organization, and productivity in modern workplaces, our
                products are designed to be part of everyday progress.
              </p>
              <p>
                We are committed to empowering students, professionals, and
                creators across Bangladesh by delivering innovative, reliable,
                and thoughtfully crafted school and office solutions that
                inspire ideas, nurture potential, and enable success at every
                stage of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Image
        src="/images/deli-bottom.webp"
        alt="Aerial view of the Deli Group headquarters tower and factory campus beside a river"
        width={1920}
        height={622}
        sizes="100vw"
        className="mb-12 block h-auto w-full lg:mb-[10px]"
      />
    </main>
  );
}
