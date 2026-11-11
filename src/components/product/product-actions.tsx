"use client";

import { Heart, Search, ShoppingCart, type LucideIcon } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import type { Product } from "@/data/products";

type Action = {
  label: string;
  icon: LucideIcon;
  /** Omit until the feature exists. */
  onClick?: (product: Product) => void;
};

/**
 * Hover actions stacked at the top-right of a product image. Place inside a
 * `relative group/card` element; they slide in when the card is hovered or
 * focused, and each shows its label as a tooltip on the left.
 */
export function ProductActions({
  product,
  tabbable = true,
}: {
  product: Product;
  tabbable?: boolean;
}) {
  const { add } = useCart();
  // TODO: connect wishlist and quick view once those exist.
  const actions: Action[] = [
    { label: "Add to Wishlist", icon: Heart },
    { label: "Quick View", icon: Search },
    { label: "Add to cart", icon: ShoppingCart, onClick: (p) => add(p) },
  ];
  return (
    <ul className="absolute right-2.5 top-[18px] flex flex-col gap-3.5">
      {actions.map(({ label, icon: Icon, onClick }, i) => (
        <li
          key={label}
          style={{ transitionDelay: `${i * 60}ms` }}
          className="translate-x-3 opacity-0 transition duration-300 group-hover/card:translate-x-0 group-hover/card:opacity-100 group-focus-within/card:translate-x-0 group-focus-within/card:opacity-100 [@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100"
        >
          <button
            type="button"
            aria-label={`${label}: ${product.name}`}
            tabIndex={tabbable ? undefined : -1}
            onClick={() => onClick?.(product)}
            className="group/action relative flex size-8 items-center justify-center border border-neutral-200 bg-white text-neutral-900 shadow-sm transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white focus-visible:border-neutral-950 focus-visible:bg-neutral-950 focus-visible:text-white focus-visible:outline-none sm:size-10"
          >
            <Icon
              className="size-4 sm:size-5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-full top-1/2 mr-2.5 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-sm bg-neutral-950 px-2.5 py-1.5 text-[12px] font-medium leading-none text-white opacity-0 transition duration-200 group-hover/action:translate-x-0 group-hover/action:opacity-100 group-focus-visible/action:translate-x-0 group-focus-visible/action:opacity-100"
            >
              {label}
              {/* Arrow pointing at the button. */}
              <span className="absolute left-full top-1/2 -translate-y-1/2 border-y-[5px] border-l-[5px] border-y-transparent border-l-neutral-950" />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
