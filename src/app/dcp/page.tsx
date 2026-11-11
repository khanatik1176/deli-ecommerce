import type { Metadata } from "next";
import Image from "next/image";
import { DcpForm } from "@/components/dcp/dcp-form";
import { PageBanner } from "@/components/layout/page-banner";

export const metadata: Metadata = {
  title: "Deli Creators Program (DCP) | Deli Ecommerce",
  description:
    "Sign up for the Deli Creators Program and join the Deli Creators Hub.",
};

const benefits = [
  {
    icon: "/images/grow.png",
    title: "Grow your career locally & globally",
    text: "Deli offers exciting benefits to it's creator community - lucrative incentives, content based promotional support, exciting collaborations",
  },
  {
    icon: "/images/receive.webp",
    title: "Receive exciting gifts & goodies",
    text: "As a DCP member - you are always first to receive world class products before anyone else",
  },
  {
    icon: "/images/join.webp",
    title: "Join exciting Deli Events",
    text: "DCP members are always there in the exclusive Deli events as key participants",
  },
];

export default function DcpPage() {
  return (
    <main className="flex-1">
      <PageBanner
        title="Deli Creators Program (DCP)"
        kicker="Fill out to join the Deli Creators Hub"
        image="/images/dcp.webp"
        className="h-[240px] sm:h-[309px]"
      />

      <section
        aria-labelledby="dcp-heading"
        className="px-4 pb-12 pt-8 lg:pb-[50px] lg:pt-[25px]"
      >
        <div className="mx-auto max-w-[600px] text-center">
          <h2
            id="dcp-heading"
            className="text-[22px] font-bold text-neutral-900"
          >
            Deli Creators Program
          </h2>
          <p className="mt-1.5 text-[14px] text-neutral-800">
            Complete the form to sign up.
          </p>
        </div>
        <div className="mx-auto mt-9 w-full max-w-[448px]">
          <DcpForm />
        </div>
      </section>

      <section
        aria-labelledby="dcp-why-heading"
        className="mx-auto w-full max-w-[1750px] px-4 pb-16 sm:px-[50px] lg:pb-[80px]"
      >
        <div className="grid items-start gap-10 sm:px-[16px] lg:grid-cols-[791fr_821fr] lg:gap-[30px]">
          <Image
            src="/images/deli-creator.webp"
            alt="Hands holding a phone surrounded by social media reactions, with the words “Be the voice of Deli”"
            width={430}
            height={301}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-auto w-full"
          />
          <div className="lg:pt-[33px]">
            <h2
              id="dcp-why-heading"
              className="text-[28px] font-medium uppercase leading-tight tracking-[-0.04em] text-black sm:text-[38px]"
            >
              Why become a Deli Creator
            </h2>
            <ul className="mt-8 space-y-8 lg:mt-[45px] lg:space-y-[30px]">
              {benefits.map((b) => (
                <li key={b.title} className="flex gap-[30px] sm:pl-[10px]">
                  <Image
                    src={b.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="mt-1 size-10 shrink-0 object-cover"
                  />
                  <div className="max-w-[430px]">
                    <h3 className="text-[18px] font-medium text-black sm:text-[19px]">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[30px] text-[#46474a] sm:text-[15px]">
                      {b.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
