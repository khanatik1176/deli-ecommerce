"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeaderIcons, navLinks } from "@/components/layout/header-parts";

/** Show the compact bar once the page has scrolled past roughly the full header. */
const SHOW_AFTER = 220;

export function StickyHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 top-0 z-40 bg-brand text-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto grid h-[60px] w-full max-w-[1920px] grid-cols-[auto_1fr_auto] items-center gap-6 px-4 sm:px-[50px]">
        <Link href="/" aria-label="Deli home" className="w-fit">
          <Image
            src="/logo/Deli_logo_white_2_170x.webp"
            alt="Deli"
            width={150}
            height={50}
            className="h-auto w-[92px]"
          />
        </Link>

        <nav
          aria-label="Main (sticky)"
          className="no-scrollbar hidden overflow-x-auto md:block"
        >
          <ul className="flex w-max min-w-full items-center justify-center gap-8 text-[14px] font-semibold uppercase tracking-[0.07em] lg:gap-11">
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

        <HeaderIcons className="col-start-3" />
      </div>
    </div>
  );
}
