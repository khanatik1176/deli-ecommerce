import Link from "next/link";
import { Heart, User } from "lucide-react";
import { CartButton } from "@/components/cart/cart-button";

export const navLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "RFQ", href: "/rfq" },
  { label: "Service Claim", href: "/service-claim" },
  { label: "DCAP", href: "/dcap" },
  { label: "DCP", href: "/dcp" },
  { label: "About Us", href: "/about" },
];

/** Account, wishlist and cart icons (shared by the main and sticky headers). */
export function HeaderIcons({
  className = "",
  tabbable = true,
}: {
  className?: string;
  tabbable?: boolean;
}) {
  const tab = tabbable ? undefined : -1;
  return (
    <div
      className={`flex items-center justify-end gap-5 lg:gap-[26px] ${className}`}
    >
      <Link
        href="/account"
        aria-label="Account"
        tabIndex={tab}
        className="hover:opacity-80"
      >
        <User className="size-[26px]" strokeWidth={1.75} />
      </Link>
      <Link
        href="/wishlist"
        aria-label="Wishlist"
        tabIndex={tab}
        className="hover:opacity-80"
      >
        <Heart className="size-[26px]" strokeWidth={1.75} />
      </Link>
      <CartButton />
    </div>
  );
}
