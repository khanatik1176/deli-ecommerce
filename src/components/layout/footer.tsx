import Link from "next/link";
import { FooterTop } from "@/components/layout/footer-top";
import { SocialLinks } from "@/components/layout/social-links";
import { site } from "@/data/site";

const columns = [
  {
    title: "Office Essentials",
    links: [
      { label: "Numbering Machines", href: "/collections/numbering-machines" },
      { label: "Desktop Items", href: "/collections/desktop-solutions" },
      { label: "Cutting Solutions", href: "/collections/cutting-tools" },
      { label: "Office Consumables", href: "/collections/consumables" },
    ],
  },
  {
    title: "School Items",
    links: [
      { label: "Pencils", href: "/collections/pencil" },
      { label: "Coloring Products", href: "/collections/coloring-products" },
      { label: "Student Essentials", href: "/collections/school-products" },
      { label: "Ball Pens", href: "/collections/ball-pens" },
    ],
  },
  {
    title: "Connect with Us",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "RFQ", href: "/rfq" },
      { label: "Service Claim", href: "/service-claim" },
      { label: "DCAP", href: "/dcap" },
      { label: "DCP", href: "/dcp" },
      { label: "About Us", href: "/about" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="text-neutral-600">
      <FooterTop />
      <div className="mx-auto w-full max-w-[1750px] px-4 sm:px-[50px]">
        <div className="grid gap-10 py-12 sm:grid-cols-2 sm:px-[19px] lg:grid-cols-[27.17%_27.17%_27.17%_1fr] lg:gap-0 lg:pb-[57px] lg:pt-[60px]">
          <div className="space-y-[18px] text-[16px]">
            <p>
              Phone :{" "}
              <a href={site.phoneHref} className="hover:text-neutral-950">
                {site.phone}
              </a>
            </p>
            <p>
              Mail :{" "}
              <a
                href={`mailto:${site.email}`}
                className="hover:text-neutral-950"
              >
                {site.email}
              </a>
            </p>
            <SocialLinks className="pt-3" />
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-[20px] font-semibold leading-tight text-neutral-950">
                {col.title}
              </h2>
              <ul className="mt-[22px] space-y-[18px] text-[16px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition hover:text-neutral-950"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200">
        <p className="mx-auto w-full max-w-[1750px] px-4 py-6 text-[14px] sm:px-[69px] lg:pb-[30px] lg:pt-[28px]">
          &copy; Deli Bangladesh All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
