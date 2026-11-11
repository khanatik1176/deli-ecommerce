"use client";

import { Minus, Plus, Truck } from "lucide-react";
import { FREE_SHIPPING_FROM } from "@/components/cart/cart-context";
import { formatPrice } from "@/lib/products";

/** Striped progress bar with a truck marker and the free-shipping message. */
export function ShippingProgress({
  subtotal,
  className = "mt-5",
}: {
  subtotal: number;
  className?: string;
}) {
  const remaining = Math.max(0, FREE_SHIPPING_FROM - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100);
  return (
    <div className={className}>
      <div
        role="progressbar"
        aria-label="Progress towards free shipping"
        aria-valuemin={0}
        aria-valuemax={FREE_SHIPPING_FROM}
        aria-valuenow={Math.min(subtotal, FREE_SHIPPING_FROM)}
        className="relative mx-[18px] h-2.5 rounded-full bg-neutral-200"
      >
        <div
          className="absolute inset-y-0 -left-[18px] rounded-full bg-[repeating-linear-gradient(135deg,#111_0_6px,#3a3a3a_6px_12px)] transition-[width] duration-500"
          style={{ width: `calc(${pct}% + 18px)` }}
        />
        <span
          aria-hidden="true"
          className="absolute top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white transition-[left] duration-500"
          style={{ left: `${pct}%` }}
        >
          <Truck className="size-[18px]" strokeWidth={1.75} />
        </span>
      </div>
      <p className="mt-4 text-[15px] leading-[28px] text-neutral-900 sm:text-[16px]">
        {remaining > 0 ? (
          <>
            Almost there, add{" "}
            <strong className="font-semibold">{formatPrice(remaining)}</strong>{" "}
            more to get FREE SHIPPING!
          </>
        ) : (
          <>Congratulations! You&apos;ve got FREE SHIPPING!</>
        )}
      </p>
    </div>
  );
}

/** Rounded − qty + control. Going below 1 asks the parent to remove the line. */
export function QuantityStepper({
  name,
  qty,
  onChange,
  className = "",
  size = "sm",
}: {
  name: string;
  qty: number;
  onChange: (qty: number) => void;
  className?: string;
  size?: "sm" | "md";
}) {
  const h = size === "md" ? "h-[42px]" : "h-[38px]";
  const w = size === "md" ? "w-10" : "w-9";
  return (
    <div
      role="group"
      aria-label={`Quantity of ${name}`}
      className={`inline-flex ${h} items-center rounded-full border border-neutral-300 ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        aria-label={qty === 1 ? `Remove ${name}` : "Decrease quantity"}
        className={`flex h-full ${w} items-center justify-center rounded-l-full text-neutral-700 hover:text-neutral-950`}
      >
        <Minus className="size-4" strokeWidth={1.5} />
      </button>
      <span
        aria-live="polite"
        className="w-6 text-center text-[15px] tabular-nums"
      >
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        disabled={qty >= 99}
        aria-label="Increase quantity"
        className={`flex h-full ${w} items-center justify-center rounded-r-full text-neutral-700 hover:text-neutral-950 disabled:opacity-40`}
      >
        <Plus className="size-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}
