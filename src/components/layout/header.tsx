import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, User } from "lucide-react";
import { CategoryMenu } from "@/components/layout/category-menu";
import { SearchBar } from "@/components/layout/search-bar";

const navLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "RFQ", href: "/rfq" },
  { label: "Service Claim", href: "/service-claim" },
  { label: "DCAP", href: "/dcap" },
  { label: "DCP", href: "/dcp" },
  { label: "About Us", href: "/about" },
];

export function Header() {
  return (
    <header className="bg-brand text-white">
      <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-3">
        {/* Top row */}
        <div className="grid h-[76px] grid-cols-[1fr_auto] items-center gap-4 lg:h-[92px] lg:grid-cols-[1fr_auto_1fr]">
          <Link href="/" aria-label="Deli home" className="w-fit">
            <Image
              src="/logo/Deli_logo_white_2_170x.webp"
              alt="Deli"
              width={150}
              height={50}
              priority
              className="-ml-3 h-auto w-[120px] lg:w-[170px] 3xl:-ml-[27px] 3xl:w-[204px]"
            />
          </Link>

          <div className="hidden items-center gap-6 lg:flex xl:gap-[50px]">
            <CategoryMenu />
            <SearchBar className="w-[645px] max-w-[38vw]" />
          </div>

          <div className="flex items-center justify-end gap-5 lg:gap-[26px] 3xl:-mr-7">
            <Link
              href="/account"
              aria-label="Account"
              className="hover:opacity-80"
            >
              <User className="size-[26px]" strokeWidth={1.75} />
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hover:opacity-80"
            >
              <Heart className="size-[26px]" strokeWidth={1.75} />
            </Link>
            <Link
              href="/cart"
              aria-label="Cart, 0 items"
              className="relative hover:opacity-80"
            >
              <ShoppingCart className="size-[26px]" strokeWidth={1.75} />
              <span className="absolute -right-1.5 -top-2 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold leading-none text-neutral-900">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile search + category */}
        <div className="flex items-center gap-3 pb-3 lg:hidden">
          <CategoryMenu compact />
          <SearchBar className="flex-1" />
        </div>

        {/* Nav row */}
        <nav aria-label="Main" className="no-scrollbar overflow-x-auto">
          <ul className="flex h-12 w-max min-w-full items-center justify-center gap-8 text-[14px] font-semibold uppercase tracking-[0.07em] lg:h-[60px] lg:gap-11">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="whitespace-nowrap transition hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
