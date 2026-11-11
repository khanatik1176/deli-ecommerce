import type { Metadata } from "next";
import { CategoryCarousel } from "@/components/home/category-carousel";
import { PageBanner } from "@/components/layout/page-banner";
import { RfqForm } from "@/components/rfq/rfq-form";

export const metadata: Metadata = {
  title: "RFQ | Deli Ecommerce",
  description:
    "Request a quotation for institutional and bulk orders from Deli Bangladesh.",
};

export default function RfqPage() {
  return (
    <main className="flex-1">
      <PageBanner title="RFQ" crumb="RFQ" image="/images/rfq-banner.jpg" />

      <CategoryCarousel
        id="rfq-categories"
        kicker="Get exciting price benefits in institutional orders"
        title="Explore Categories"
        className="pb-12 pt-8 lg:pb-[60px] lg:pt-[35px]"
      />

      <section
        aria-labelledby="rfq-heading"
        className="px-4 pb-16 pt-6 lg:pb-[100px] lg:pt-[30px]"
      >
        <div className="mx-auto w-full max-w-[660px]">
          <div className="text-center">
            <h2
              id="rfq-heading"
              className="text-[24px] font-medium tracking-[-0.01em] text-neutral-950 sm:text-[28px]"
            >
              Institutional Requirement / RFQ
            </h2>
            <p className="mt-2 text-[15px] text-neutral-600 sm:text-[16px]">
              Submit your requirement below &amp; we will get back to you
              shortly
            </p>
          </div>
          <div className="mt-10">
            <RfqForm />
          </div>
        </div>
      </section>
    </main>
  );
}
