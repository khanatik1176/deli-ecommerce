import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/page-banner";
import { ServiceClaimForm } from "@/components/service-claim/service-claim-form";
import { calculators, scientificCalculators } from "@/data/products";

export const metadata: Metadata = {
  title: "Calculator Service Claim | Deli Ecommerce",
  description: "Register your Deli calculator for service and warranty claims.",
};

// Model suggestions, e.g. "Scientific Calculator-82ES".
const models = [
  ...new Set(
    [...scientificCalculators, ...calculators].map((p) =>
      p.name.split("|")[0].trim(),
    ),
  ),
];

export default function ServiceClaimPage() {
  return (
    <main className="flex-1">
      <PageBanner
        title="Deli Calculator Service"
        kicker="Register your calculator for easy service claim"
        image="/images/serviceclaim.webp"
        align="left"
        className="h-[220px] sm:h-[315px]"
      />

      <section
        aria-labelledby="service-claim-heading"
        className="px-4 pb-16 pt-8 lg:pb-[50px] lg:pt-[25px]"
      >
        <div className="mx-auto max-w-[600px] text-center">
          <h2
            id="service-claim-heading"
            className="text-[22px] font-bold text-neutral-900"
          >
            Calculator Service Registration
          </h2>
          <p className="mt-1.5 text-[14px] text-neutral-800">
            Complete the form to register for calculator service &amp; warranty
            claim
          </p>
        </div>
        <div className="mx-auto mt-9 w-full max-w-[448px]">
          <ServiceClaimForm models={models} />
        </div>
      </section>
    </main>
  );
}
