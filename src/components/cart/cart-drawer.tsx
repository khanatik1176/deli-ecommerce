"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import {
  FREE_SHIPPING_FROM,
  useCart,
  type CartLine,
} from "@/components/cart/cart-context";
import {
  QuantityStepper,
  ShippingProgress,
} from "@/components/cart/cart-parts";
import { ProductImage } from "@/components/product/product-image";
import { formatPrice } from "@/lib/products";

/** Filled cart glyph matching the design's empty-state illustration. */
function EmptyCartIcon() {
  return (
    <svg
      viewBox="0 0 140 130"
      className="h-[128px] w-[136px]"
      aria-hidden="true"
    >
      <path
        d="M6 8h16l24 88h70l10-52H30"
        fill="none"
        stroke="#7f7f7f"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="52" cy="119" r="9" fill="#7f7f7f" />
      <circle cx="110" cy="119" r="9" fill="#7f7f7f" />
    </svg>
  );
}

function LineItem({ line }: { line: CartLine }) {
  const { setQty, remove, close } = useCart();
  const { product, qty } = line;
  return (
    <li className="flex gap-5 py-5">
      <Link
        href={`/products/${product.slug}`}
        onClick={close}
        className="w-20 shrink-0"
      >
        <ProductImage product={product} sizes="80px" />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-3">
          <Link
            href={`/products/${product.slug}`}
            onClick={close}
            className="flex-1 text-[15px] leading-[20px] text-neutral-800 hover:text-neutral-950"
          >
            {product.name}
          </Link>
          <button
            type="button"
            onClick={() => remove(product.slug)}
            aria-label={`Remove ${product.name}`}
            className="-mt-0.5 rounded p-0.5 text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
          >
            <X className="size-[18px]" strokeWidth={1.5} />
          </button>
        </div>
        <p className="mt-2.5 text-[15px] text-neutral-800">
          {formatPrice(product.price * qty)}
        </p>
        <QuantityStepper
          className="mt-4"
          name={product.name}
          qty={qty}
          onChange={(n) => setQty(product.slug, n)}
        />
      </div>
    </li>
  );
}

export function CartDrawer() {
  const { isOpen, close, count, lines, subtotal } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus, Escape, focus trap, scroll lock and focus return while open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href], input",
      );
      const first = items[0],
        last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      previous?.focus();
    };
  }, [isOpen, close]);

  const empty = lines.length === 0;

  return (
    <div inert={!isOpen} aria-hidden={!isOpen} className="fixed inset-0 z-50">
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[500px] flex-col bg-white text-neutral-900 shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between px-6 pt-7 sm:px-[35px] sm:pt-[30px]">
          <div>
            <h2 id="cart-drawer-title" className="text-[20px] font-semibold">
              Shopping Cart
            </h2>
            <p className="mt-3 text-[16px] text-neutral-500">
              {count} {count === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="-mr-1 rounded p-1 text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
          >
            <X className="size-[22px]" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 sm:px-[35px]">
          {empty ? (
            <>
              <p className="mt-6 text-[16px] text-neutral-700">
                Free shipping for all orders over{" "}
                {formatPrice(FREE_SHIPPING_FROM)}!
              </p>
              <div className="mt-[52px] flex flex-col items-center text-center">
                <EmptyCartIcon />
                <p className="mt-3 text-[16px] text-neutral-700">
                  Your cart is empty
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 flex h-12 w-full items-center justify-center rounded-full border border-neutral-900 text-[15px] font-medium text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          ) : (
            <>
              <ShippingProgress subtotal={subtotal} />
              <ul className="mt-2 divide-y divide-neutral-200">
                {lines.map((line) => (
                  <LineItem key={line.product.slug} line={line} />
                ))}
              </ul>
            </>
          )}
        </div>

        {!empty && (
          <div className="border-t border-neutral-200 px-6 pb-6 pt-5 shadow-[0_-6px_16px_rgba(0,0,0,0.04)] sm:px-[35px]">
            <dl className="space-y-4">
              <div className="flex items-center justify-between text-[16px]">
                <dt className="text-neutral-700">Subtotal</dt>
                <dd className="text-neutral-800">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[16px] text-neutral-800">Total:</dt>
                <dd className="text-[20px] text-neutral-800">
                  {formatPrice(subtotal)}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-[15px] text-neutral-500">
              Tax included and shipping calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={close}
              className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-black text-[15px] font-semibold text-white transition hover:bg-neutral-800"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={close}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-full border border-neutral-900 text-[15px] font-medium text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
