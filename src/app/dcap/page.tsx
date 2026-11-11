import type { Metadata } from "next";
import Image from "next/image";
import { DcapForm } from "@/components/dcap/dcap-form";
import { PageBanner } from "@/components/layout/page-banner";

export const metadata: Metadata = {
  title: "Deli Campus Ambassador Program (DCAP) | Deli Ecommerce",
  description:
    "Apply to become a Deli Campus Ambassador at your school, college or university.",
};

export default function DcapPage() {
  return (
    <main className="flex-1">
      <PageBanner
        title="Deli Campus Ambassador Program (DCAP)"
        kicker="Fill out the form to join"
        image="/images/dcap.webp"
        className="h-[260px] sm:h-[360px]"
        titleClassName="mx-auto max-w-[560px]"
      />

      <section
        aria-labelledby="dcap-heading"
        className="px-4 pb-12 pt-12 lg:pb-[50px] lg:pt-[65px]"
      >
        <div className="mx-auto w-full max-w-[660px]">
          <div className="text-center">
            <h2
              id="dcap-heading"
              className="text-[24px] font-medium tracking-[-0.01em] text-neutral-950 sm:text-[28px]"
            >
              Become a proud Deli Campus Ambassador
            </h2>
            <p className="mt-2 text-[15px] text-neutral-600 sm:text-[16px]">
              Submit the application by filling in this form.
            </p>
          </div>
          <div className="mt-8">
            <DcapForm />
          </div>
        </div>
      </section>

      {/* The photo stays pinned briefly while this section scrolls past. */}
      <section
        aria-labelledby="dcap-superstar-heading"
        className="mx-auto w-full max-w-[1750px] px-4 pb-16 sm:px-[50px] lg:pb-[80px]"
      >
        <div className="grid gap-10 sm:px-[19px] lg:grid-cols-2 lg:gap-[30px]">
          <div className="relative">
            <div className="lg:sticky lg:top-8">
              <Image
                src="/images/dcap-model.webp"
                alt="Graduate in cap and gown with the words “Enjoy Exciting Benefits!”"
                width={470}
                height={801}
                sizes="(min-width: 1024px) 470px, 100vw"
                className="mx-auto h-auto w-full max-w-[470px] lg:mx-0"
              />
            </div>
          </div>
          <div className="flex items-center lg:min-h-[1060px] lg:pl-[21px]">
            <div className="max-w-[560px]">
              <h2
                id="dcap-superstar-heading"
                className="text-[28px] font-semibold tracking-[-0.03em] text-black sm:text-[38px]"
              >
                Be the Deli Campus Superstar
              </h2>
              <p className="mt-6 text-[16px] leading-[25px] text-[#46474a] lg:mt-9">
                The Campus Ambassador Program is a premium initiative designed
                to foster strategic collaboration between educational
                institutions and corporate organizations, enabling mutual growth
                and long-term value creation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
