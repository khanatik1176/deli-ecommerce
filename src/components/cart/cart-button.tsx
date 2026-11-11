"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";

export function CartButton() {
  const { open, isOpen, count } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      className="relative hover:opacity-80"
    >
      <ShoppingCart className="size-[26px]" strokeWidth={1.75} />
      <span className="absolute -right-1.5 -top-2 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold leading-none text-neutral-900">
        {count}
      </span>
    </button>
  );
}
