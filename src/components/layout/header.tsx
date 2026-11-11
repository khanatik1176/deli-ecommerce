import Image from "next/image";
import Link from "next/link";
import { CategoryMenu } from "@/components/layout/category-menu";
import { HeaderIcons, navLinks } from "@/components/layout/header-parts";
import { SearchBar } from "@/components/layout/search-bar";
import { StickyHeader } from "@/components/layout/sticky-header";

export function Header() {
  return (
    <>
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

            <HeaderIcons className="3xl:-mr-7" />
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
      <StickyHeader />
    </>
  );
}
