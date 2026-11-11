import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { PageBanner } from "@/components/layout/page-banner";
import { SocialLinks } from "@/components/layout/social-links";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us | Deli Ecommerce",
  description: "Get in touch with Deli Bangladesh.",
};

const details = [
  { label: "Address", value: site.address },
  { label: "Phone", value: site.phone, href: site.phoneHref },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
];

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&t=k&z=16&output=embed`;

export default function ContactPage() {
  return (
    <main className="flex-1">
      <PageBanner
        title="Contact Us"
        crumb="Contact Us"
        image="/images/contact-banner.jpg"
      />

      <div className="mx-auto w-full max-w-[1750px] px-4 sm:px-[50px]">
        <div className="grid gap-12 py-12 sm:px-[19px] lg:grid-cols-[1064fr_517fr] lg:gap-[30px] lg:pb-[100px] lg:pt-[100px]">
          <section aria-labelledby="contact-form-heading">
            <h2
              id="contact-form-heading"
              className="text-[24px] font-semibold tracking-[-0.01em] text-black lg:text-[28px]"
            >
              We are just a message away
            </h2>
            <div className="mt-6 lg:mt-[40px]">
              <ContactForm />
            </div>
          </section>

          <address className="not-italic">
            <dl>
              {details.map((d) => (
                <div
                  key={d.label}
                  className="border-b border-[#c7c7c7] pb-[30px] pt-[30px] first:pt-0"
                >
                  <dt className="text-[22px] font-medium leading-tight text-black">
                    {d.label}
                  </dt>
                  <dd className="mt-3 text-[16px] text-[#46474a]">
                    {d.href ? (
                      <a
                        href={d.href}
                        className="transition hover:text-neutral-950"
                      >
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <SocialLinks className="mt-[30px] gap-[22px]" />
          </address>
        </div>

        <div className="pb-12 sm:px-[19px] lg:pb-[100px]">
          <iframe
            title={`Map showing ${site.mapQuery}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[360px] w-full border-0 lg:h-[515px]"
          />
        </div>
      </div>
    </main>
  );
}
