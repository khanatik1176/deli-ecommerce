import Link from "next/link";
import type { ReactNode } from "react";
import { ShoppingBag } from "lucide-react";

/** Distraction-free checkout frame: logo and a link back to the cart, no site nav or footer. */
export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-[#1a1a1a] [font-family:-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]">
      <header className="border-b border-[#dedede]">
        <div className="mx-auto flex h-[64px] w-full max-w-[980px] items-center justify-between px-5 lg:h-[72px] lg:px-0">
          <Link href="/" aria-label="Deli home">
            {/* The logo file is white; mask it so it renders in brand red. */}
            <span
              aria-hidden="true"
              className="block h-[25px] w-[63px] bg-brand [mask:url(/logo/Deli_logo_white_2_170x.webp)_center/contain_no-repeat]"
            />
          </Link>
          <Link
            href="/cart"
            aria-label="Back to cart"
            className="rounded p-1 text-[#1a5bd0] transition hover:bg-[#1a5bd0]/10"
          >
            <ShoppingBag className="size-6" strokeWidth={1.75} />
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
