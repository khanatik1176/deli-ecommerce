"use client";

import { usePathname } from "next/navigation";
import { NewsletterBand } from "@/components/layout/newsletter-band";

/** The newsletter band shows on the home page; other pages get a plain rule. */
export function FooterTop() {
  return usePathname() === "/" ? (
    <NewsletterBand />
  ) : (
    <div className="border-t border-neutral-200" />
  );
}
