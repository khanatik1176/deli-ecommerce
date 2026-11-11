"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { X } from "lucide-react";
import {
  CART_NOTE_KEY,
  useCart,
  type CartLine,
} from "@/components/cart/cart-context";
import {
  QuantityStepper,
  ShippingProgress,
} from "@/components/cart/cart-parts";
import { ProductImage } from "@/components/product/product-image";
import { formatPrice } from "@/lib/products";

const BRAND = "Deli";

const field =
  "block w-full border border-neutral-300 bg-white px-5 text-[16px] text-neutral-900 outline-none transition placeholder:text-neutral-500 hover:border-neutral-400 focus:border-brand focus:ring-3 focus:ring-brand/15";

function ProductInfo({ line }: { line: CartLine }) {
  const { product } = line;
  return (
    <div className="flex gap-6">
      <Link href={`/products/${product.slug}`} className="w-[90px] shrink-0">
        <ProductImage product={product} sizes="90px" />
      </Link>
      <div className="min-w-0 pt-2.5">
        <Link
          href={`/products/${product.slug}`}
          className="text-[15px] text-[#1c2a4b] transition hover:text-brand sm:text-[16px]"
        >
          {product.name}
        </Link>
        {product.pack && (
          <p className="mt-2 text-[15px] text-neutral-700">{product.pack}</p>
        )}
        <p className="mt-2 text-[15px] text-neutral-700">{BRAND}</p>
      </div>
    </div>
  );
}

function RemoveButton({ line }: { line: CartLine }) {
  const { remove } = useCart();
  return (
    <button
      type="button"
      onClick={() => remove(line.product.slug)}
      aria-label={`Remove ${line.product.name}`}
      className="rounded p-1 text-neutral-900 transition hover:bg-neutral-100"
    >
      <X className="size-[18px]" strokeWidth={1.75} />
    </button>
  );
}

function CartTable({ lines }: { lines: CartLine[] }) {
  const { setQty } = useCart();
  const cell = "border-l border-neutral-200 px-4 text-center align-middle";
  return (
    <table className="mt-9 hidden w-full border-collapse border border-neutral-200 md:table">
      <caption className="sr-only">Items in your cart</caption>
      <thead>
        <tr className="h-[44px] text-[15px] font-semibold uppercase text-neutral-950">
          <th scope="col" className="px-5 text-left">
            Product
          </th>
          <th scope="col" className={`${cell} w-[144px]`}>
            Price
          </th>
          <th scope="col" className={`${cell} w-[144px]`}>
            Quantity
          </th>
          <th scope="col" className={`${cell} w-[95px] text-left`}>
            Total
          </th>
          <th scope="col" className={`${cell} w-[45px]`}>
            <span className="sr-only">Remove</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {lines.map((line) => (
          <tr key={line.product.slug} className="border-t border-neutral-200">
            <td className="px-5 py-5">
              <ProductInfo line={line} />
            </td>
            <td className={`${cell} text-[17px] text-neutral-800`}>
              {formatPrice(line.product.price)}
            </td>
            <td className={cell}>
              <QuantityStepper
                size="md"
                name={line.product.name}
                qty={line.qty}
                onChange={(n) => setQty(line.product.slug, n)}
              />
            </td>
            <td
              className={`${cell} text-right text-[17px] leading-[22px] text-neutral-800`}
            >
              {formatPrice(line.product.price * line.qty)}
            </td>
            <td className={cell}>
              <RemoveButton line={line} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Stacked cards for small screens, where a 5-column table doesn't fit. */
function CartList({ lines }: { lines: CartLine[] }) {
  const { setQty } = useCart();
  return (
    <ul className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200 md:hidden">
      {lines.map((line) => (
        <li key={line.product.slug} className="py-5">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <ProductInfo line={line} />
            </div>
            <RemoveButton line={line} />
          </div>
          <div className="mt-4 flex items-center justify-between pl-[114px]">
            <QuantityStepper
              name={line.product.name}
              qty={line.qty}
              onChange={(n) => setQty(line.product.slug, n)}
            />
            <p className="text-[16px] text-neutral-800">
              {formatPrice(line.product.price * line.qty)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function OrderNotes() {
  const id = useId();
  const [note, setNote] = useState("");
  // Keep the note across reloads until checkout reads it.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read from storage
      setNote(localStorage.getItem(CART_NOTE_KEY) ?? "");
    } catch {}
  }, []);
  return (
    <div className="w-full max-w-[618px]">
      <label
        htmlFor={`${id}-note`}
        className="text-[16px] font-semibold text-neutral-900"
      >
        Additional Comments
      </label>
      <textarea
        id={`${id}-note`}
        value={note}
        maxLength={500}
        onChange={(e) => {
          setNote(e.target.value);
          try {
            localStorage.setItem(CART_NOTE_KEY, e.target.value);
          } catch {}
        }}
        placeholder="Special instruction for seller..."
        className={`${field} mt-3.5 h-[98px] resize-y py-5`}
      />

      <label
        htmlFor={`${id}-coupon`}
        className="mt-11 block text-[16px] text-neutral-900"
      >
        Coupon Code
      </label>
      <input
        id={`${id}-coupon`}
        name="coupon"
        autoComplete="off"
        placeholder="Enter Coupon Code"
        aria-describedby={`${id}-coupon-hint`}
        className={`${field} mt-2.5 h-[52px]`}
      />
      <p id={`${id}-coupon-hint`} className="mt-4 text-[15px] text-neutral-800">
        Coupon code will work on checkout page
      </p>
    </div>
  );
}

function OrderSummary({ subtotal }: { subtotal: number }) {
  return (
    <aside
      aria-labelledby="order-summary-heading"
      className="w-full lg:w-[400px] lg:shrink-0"
    >
      <h2
        id="order-summary-heading"
        className="border-b-2 border-neutral-900 pb-3.5 text-[16px] font-semibold uppercase text-neutral-950"
      >
        Order Summary
      </h2>
      <dl>
        <div className="flex items-center justify-between border-b border-neutral-200 py-4">
          <dt className="text-[16px] text-neutral-800">Subtotal</dt>
          <dd className="text-[18px] text-neutral-900">
            {formatPrice(subtotal)}
          </dd>
        </div>
        <div className="flex items-center justify-between border-b border-neutral-200 py-4">
          <dt className="text-[16px] text-neutral-800">Total:</dt>
          <dd className="text-[18px] font-semibold text-neutral-950">
            {formatPrice(subtotal)}
          </dd>
        </div>
      </dl>
      <p className="mt-7 text-[15px] text-neutral-800">
        Tax included and shipping calculated at checkout
      </p>
      <Link
        href="/checkout"
        className="mt-3 flex h-12 w-full items-center justify-center rounded-full bg-[#111] text-[15px] font-semibold text-white transition hover:bg-black"
      >
        Proceed To Checkout
      </Link>
      <Link
        href="/"
        className="mt-4 flex h-12 w-full items-center justify-center rounded-full border border-neutral-900 text-[15px] font-medium text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
      >
        Continue shopping
      </Link>
    </aside>
  );
}

export function CartPage() {
  const { ready, lines, subtotal } = useCart();

  return (
    <div className="mx-auto w-full max-w-[1750px] px-4 pb-16 pt-6 sm:px-[50px] lg:pb-[100px]">
      <div className="sm:px-[19px]">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-[16px] text-neutral-800">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Your cart</li>
          </ol>
        </nav>
        <h1 className="mt-6 text-[26px] font-semibold uppercase text-neutral-950 sm:text-[28px]">
          Your cart
        </h1>

        {!ready ? (
          <div
            className="mt-10 h-40 animate-pulse rounded bg-neutral-100"
            aria-label="Loading cart"
          />
        ) : lines.length === 0 ? (
          <div className="mt-10 border border-neutral-200 px-6 py-16 text-center">
            <p className="text-[18px] text-neutral-800">
              Your cart is currently empty.
            </p>
            <Link
              href="/"
              className="mx-auto mt-6 flex h-12 w-full max-w-[280px] items-center justify-center rounded-full border border-neutral-900 text-[15px] font-medium text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <ShippingProgress subtotal={subtotal} className="mt-3" />
            <CartTable lines={lines} />
            <CartList lines={lines} />
            <div className="mt-12 flex flex-col justify-between gap-12 lg:flex-row lg:gap-10">
              <OrderNotes />
              <OrderSummary subtotal={subtotal} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
