"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState, type ReactNode } from "react";
import { CheckCircle2, ChevronDown, CircleHelp, ImageIcon } from "lucide-react";
import {
  CART_NOTE_KEY,
  useCart,
  type CartLine,
} from "@/components/cart/cart-context";
import { formatTaka } from "@/lib/products";

const SAVED_INFO_KEY = "deli-checkout-info";

const SHIPPING = [
  {
    id: "inside-dhaka",
    label: "Cash on Delivery (Inside Dhaka)",
    price: 80,
    days: [5, 6] as const,
  },
  {
    id: "outside-dhaka",
    label: "Cash On Delivery (Outside Dhaka)",
    price: 120,
    days: [7, 9] as const,
    note: "Cash On Delivery",
  },
];
type ShippingId = (typeof SHIPPING)[number]["id"];

type Field =
  | "email"
  | "lastName"
  | "address"
  | "city"
  | "phone"
  | "billLastName"
  | "billAddress"
  | "billCity";
type Errors = Partial<Record<Field, string>>;

const SAVED_FIELDS = [
  "email",
  "firstName",
  "lastName",
  "company",
  "address",
  "city",
  "postalCode",
  "phone",
] as const;
type SavedInfo = Partial<Record<(typeof SAVED_FIELDS)[number], string>>;

const BLUE = "#1a5bd0";

// ---------------------------------------------------------------------------
// Small building blocks

const control =
  "peer h-[50px] w-full rounded-[5px] border bg-white px-3 pb-1.5 pt-[18px] text-[14px] text-[#1a1a1a] outline-none transition placeholder-transparent focus:border-[#1a5bd0] focus:ring-1 focus:ring-[#1a5bd0]";

/** Text input whose label sits inside the box and shrinks once there's a value. */
function FloatingInput({
  id,
  label,
  error,
  help,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  help?: string;
}) {
  return (
    <div className={className}>
      <div className="relative">
        <input
          id={id}
          placeholder=" "
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${control} ${help ? "pr-10" : ""} ${
            error ? "border-[#dd1d1d]" : "border-[#dedede]"
          }`}
          {...props}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-3 top-[7px] text-[12px] text-[#707070] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[14px] peer-focus:top-[7px] peer-focus:translate-y-0 peer-focus:text-[12px]"
        >
          {label}
        </label>
        {help && <HelpTip text={help} />}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-[#dd1d1d]">
          {error}
        </p>
      )}
    </div>
  );
}

function HelpTip({ text }: { text: string }) {
  return (
    <span className="group absolute right-3 top-1/2 -translate-y-1/2">
      <button
        type="button"
        aria-label={text}
        className="flex rounded-full text-[#707070] outline-none focus-visible:ring-2 focus-visible:ring-[#1a5bd0]"
      >
        <CircleHelp className="size-[18px]" strokeWidth={1.5} />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full right-[-6px] z-10 mb-2 w-[220px] rounded-md bg-[#1a1a1a] px-3 py-2 text-[12px] leading-snug text-white opacity-0 transition group-focus-within:opacity-100 group-hover:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}

function CountrySelect({ id }: { id: string }) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        defaultValue="BD"
        autoComplete="country"
        className={`${control} appearance-none border-[#dedede] pr-9`}
      >
        <option value="BD">Bangladesh</option>
      </select>
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-[7px] text-[12px] text-[#707070]"
      >
        Country/Region
      </label>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#707070]"
        aria-hidden="true"
      />
    </div>
  );
}

/** Bordered list of radio rows; the selected row gets a tinted, blue-outlined background. */
function RadioGroup<T extends string>({
  name,
  value,
  onChange,
  legend,
  options,
}: {
  name: string;
  value: T;
  onChange: (v: T) => void;
  legend: string;
  options: {
    value: T;
    title: ReactNode;
    detail?: ReactNode;
    aside?: ReactNode;
  }[];
}) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="overflow-hidden rounded-[5px] border border-[#dedede]">
        {options.map((o, i) => {
          const selected = o.value === value;
          return (
            <label
              key={o.value}
              className={`relative flex cursor-pointer gap-3 px-4 py-4 transition ${i > 0 ? "border-t border-[#dedede]" : ""} ${
                selected
                  ? "z-10 bg-[#f0f5ff] outline outline-1 -outline-offset-1 outline-[#1a5bd0]"
                  : "hover:bg-neutral-50"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={selected}
                onChange={() => onChange(o.value)}
                className="mt-0.5 size-[18px] shrink-0 accent-[#1a5bd0]"
              />
              <span className="flex-1 text-[14px] leading-[19px]">
                <span className="block font-medium">{o.title}</span>
                {o.detail && <span className="block">{o.detail}</span>}
              </span>
              {o.aside && (
                <span className="text-[14px] font-medium">{o.aside}</span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

// ---------------------------------------------------------------------------
// Order summary

function SummaryLine({ line }: { line: CartLine }) {
  const { product, qty } = line;
  return (
    <li className="flex items-center gap-3.5">
      <div className="relative size-16 shrink-0">
        <div className="size-full overflow-hidden rounded-lg border border-[#dedede] bg-white">
          {product.image ? (
            <Image
              src={product.image}
              alt=""
              width={64}
              height={64}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-neutral-300">
              <ImageIcon className="size-6" strokeWidth={1.25} />
            </div>
          )}
        </div>
        <span className="absolute -right-2 -top-2 flex min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[12px] font-semibold leading-5 text-white">
          {qty}
          <span className="sr-only"> × </span>
        </span>
      </div>
      <div className="min-w-0 flex-1 self-start pt-0.5">
        <p className="text-[14px] leading-[19px]">{product.name}</p>
        {product.pack && (
          <p className="text-[12px] text-[#707070]">{product.pack}</p>
        )}
      </div>
      <p className="self-start pt-0.5 text-[14px]">
        {formatTaka(product.price * qty)}
      </p>
    </li>
  );
}

function DiscountForm() {
  const id = useId();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: validate against the backend once discounts exist.
        setError("Enter a valid discount code or gift card");
      }}
    >
      <div className="flex gap-3">
        <FloatingInput
          id={`${id}-code`}
          label="Discount code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(undefined);
          }}
          autoComplete="off"
          className="flex-1"
          error={error}
        />
        <button
          type="submit"
          disabled={!code.trim()}
          className="h-[50px] shrink-0 rounded-[5px] border border-[#dedede] bg-[#f5f5f5] px-4 text-[14px] font-semibold text-[#1a1a1a] transition enabled:hover:bg-[#ebebeb] disabled:text-[#9a9a9a]"
        >
          Apply
        </button>
      </div>
    </form>
  );
}

function OrderSummary({
  lines,
  subtotal,
  shipping,
  count,
  showDiscount = true,
}: {
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  count: number;
  showDiscount?: boolean;
}) {
  return (
    <div>
      <ul className="space-y-4">
        {lines.map((l) => (
          <SummaryLine key={l.product.slug} line={l} />
        ))}
      </ul>
      {showDiscount && (
        <div className="mt-5">
          <DiscountForm />
        </div>
      )}
      <dl className="mt-6 space-y-2 text-[14px]">
        <div className="flex justify-between">
          <dt>
            Subtotal · {count} {count === 1 ? "item" : "items"}
          </dt>
          <dd>{formatTaka(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="flex items-center gap-1">
            Shipping
            <CircleHelp
              className="size-3.5 text-[#707070]"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </dt>
          <dd>{formatTaka(shipping)}</dd>
        </div>
        <div className="flex items-baseline justify-between pt-3">
          <dt className="text-[19px] font-semibold">Total</dt>
          <dd className="flex items-baseline gap-2">
            <span className="text-[12px] text-[#707070]">BDT</span>
            <span className="text-[19px] font-semibold">
              {formatTaka(subtotal + shipping)}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Loading skeleton: mirrors the real layout so nothing jumps when the cart loads.

const Bone = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-[5px] bg-neutral-200/70 ${className}`} />
);
const FieldBone = ({ className = "" }: { className?: string }) => (
  <div
    className={`h-[50px] rounded-[5px] border border-[#ececec] bg-neutral-50 ${className}`}
  />
);

function CheckoutFormSkeleton() {
  return (
    <div role="status" aria-label="Loading checkout" className="animate-pulse">
      {/* Contact */}
      <div className="flex items-center justify-between">
        <Bone className="h-6 w-24" />
        <Bone className="h-4 w-12" />
      </div>
      <FieldBone className="mt-3.5" />

      {/* Delivery */}
      <Bone className="mt-10 h-6 w-28" />
      <div className="mt-3.5 space-y-3">
        <FieldBone />
        <div className="grid gap-3 sm:grid-cols-2">
          <FieldBone />
          <FieldBone />
        </div>
        <FieldBone />
        <FieldBone />
        <div className="grid gap-3 sm:grid-cols-2">
          <FieldBone />
          <FieldBone />
        </div>
        <FieldBone />
        <div className="flex items-center gap-2.5 pt-0.5">
          <Bone className="size-[18px]" />
          <Bone className="h-4 w-56" />
        </div>
      </div>

      {/* Shipping method */}
      <Bone className="mt-8 h-5 w-36" />
      <div className="mt-3.5 overflow-hidden rounded-[5px] border border-[#ececec]">
        {[0, 1].map((i) => (
          <div
            key={i}
            className={`flex gap-3 px-4 py-4 ${i ? "border-t border-[#ececec]" : ""}`}
          >
            <Bone className="size-[18px] rounded-full" />
            <div className="flex-1 space-y-2">
              <Bone className="h-4 w-56 max-w-full" />
              <Bone className="h-4 w-36" />
              {i === 1 && <Bone className="h-4 w-28" />}
            </div>
            <Bone className="h-4 w-14" />
          </div>
        ))}
      </div>

      {/* Payment */}
      <Bone className="mt-10 h-6 w-24" />
      <Bone className="mt-2 h-4 w-60 max-w-full" />
      <div className="mt-3.5 h-[108px] rounded-[5px] border border-[#ececec] bg-neutral-50" />

      {/* Billing */}
      <Bone className="mt-10 h-5 w-32" />
      <div className="mt-3.5 h-[104px] rounded-[5px] border border-[#ececec] bg-neutral-50" />

      <Bone className="mt-10 h-[56px] w-full" />
      <div className="mt-16 pt-4">
        <Bone className="h-4 w-32" />
      </div>
      <span className="sr-only">Loading checkout…</span>
    </div>
  );
}

function SummarySkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      {/* Small screens: the collapsed summary bar */}
      <div className="flex items-center justify-between lg:hidden">
        <Bone className="h-4 w-40" />
        <Bone className="h-5 w-20" />
      </div>
      <div className="hidden lg:block">
        <ul className="space-y-4">
          {[0, 1].map((i) => (
            <li key={i} className="flex items-center gap-3.5">
              <Bone className="size-16 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Bone className="h-4 w-full" />
                <Bone className="h-4 w-2/3" />
                <Bone className="h-3 w-10" />
              </div>
              <Bone className="h-4 w-14 self-start" />
            </li>
          ))}
        </ul>
        <div className="mt-5 flex gap-3">
          <div className="h-[50px] flex-1 rounded-[5px] border border-[#e3e3e3] bg-white/70" />
          <Bone className="h-[50px] w-[74px]" />
        </div>
        <div className="mt-6 space-y-3">
          <div className="flex justify-between">
            <Bone className="h-4 w-28" />
            <Bone className="h-4 w-16" />
          </div>
          <div className="flex justify-between">
            <Bone className="h-4 w-20" />
            <Bone className="h-4 w-14" />
          </div>
          <div className="flex items-center justify-between pt-3">
            <Bone className="h-6 w-16" />
            <Bone className="h-6 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

/** "Mon, Nov 16–Tue, Nov 17" for a delivery window starting `from` days from now. */
function deliveryWindow([from, to]: readonly [number, number]) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const day = (n: number) => fmt.format(new Date(Date.now() + n * 86_400_000));
  return `${day(from)}–${day(to)}`;
}

function validate(data: FormData, differentBilling: boolean): Errors {
  const get = (k: string) => String(data.get(k) ?? "").trim();
  const errors: Errors = {};
  const email = get("email");
  if (!email) errors.email = "Enter an email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email";
  if (!get("lastName")) errors.lastName = "Enter a last name";
  if (!get("address")) errors.address = "Enter an address";
  if (!get("city")) errors.city = "Enter a city";
  const phone = get("phone").replace(/[\s-]/g, "");
  if (!phone) errors.phone = "Enter a phone number";
  else if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(phone))
    errors.phone = "Enter a valid Bangladeshi phone number";
  if (differentBilling) {
    if (!get("billLastName")) errors.billLastName = "Enter a last name";
    if (!get("billAddress")) errors.billAddress = "Enter an address";
    if (!get("billCity")) errors.billCity = "Enter a city";
  }
  return errors;
}

type Placed = {
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  count: number;
  name: string;
  email: string;
};

export function Checkout() {
  const { ready, lines, subtotal, count, clear } = useCart();
  const id = useId();
  const f = (name: string) => `${id}-${name}`;
  const [errors, setErrors] = useState<Errors>({});
  const [shippingId, setShippingId] = useState<ShippingId>("inside-dhaka");
  const [billing, setBilling] = useState<"same" | "different">("same");
  const [saveInfo, setSaveInfo] = useState(false);
  const [saved, setSaved] = useState<SavedInfo>({});
  const [windows, setWindows] = useState<Record<string, string>>({});
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [placed, setPlaced] = useState<Placed | null>(null);

  // Browser-only work after mount: saved details and date-based delivery estimates.
  useEffect(() => {
    try {
      const info = JSON.parse(localStorage.getItem(SAVED_INFO_KEY) ?? "null");
      if (info && typeof info === "object") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read from storage
        setSaved(info);
        setSaveInfo(true);
      }
    } catch {}
    setWindows(
      Object.fromEntries(SHIPPING.map((s) => [s.id, deliveryWindow(s.days)])),
    );
  }, []);

  const shipping = SHIPPING.find((s) => s.id === shippingId)!;
  const clearError = (k: Field) =>
    errors[k] && setErrors((e) => ({ ...e, [k]: undefined }));
  const input = (
    name:
      | Field
      | "firstName"
      | "company"
      | "postalCode"
      | "billFirstName"
      | "billPostalCode"
      | "billPhone",
    label: string,
    extra: Partial<React.ComponentProps<typeof FloatingInput>> = {},
  ) => (
    <FloatingInput
      id={f(name)}
      name={name}
      label={label}
      defaultValue={(saved as Record<string, string>)[name]}
      error={errors[name as Field]}
      onChange={() => clearError(name as Field)}
      {...extra}
    />
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = validate(data, billing === "different");
    setErrors(next);
    const first = (Object.keys(next) as Field[])[0];
    if (first) {
      document.getElementById(f(first))?.focus();
      return;
    }

    try {
      if (saveInfo) {
        const info = Object.fromEntries(
          SAVED_FIELDS.map((k) => [k, String(data.get(k) ?? "")]),
        );
        localStorage.setItem(SAVED_INFO_KEY, JSON.stringify(info));
      } else {
        localStorage.removeItem(SAVED_INFO_KEY);
      }
    } catch {}

    setStatus("submitting");
    let note = "";
    try {
      note = localStorage.getItem(CART_NOTE_KEY) ?? "";
    } catch {}
    const order = {
      ...Object.fromEntries(data),
      shippingMethod: shipping.id,
      billingSameAsShipping: billing === "same",
      note,
      items: lines.map((l) => ({ slug: l.product.slug, qty: l.qty })),
    };
    // TODO: send to the backend once an endpoint exists, e.g.
    // await api.post("/orders", order);
    void order;
    await new Promise((r) => setTimeout(r, 600));

    setPlaced({
      lines,
      subtotal,
      count,
      shipping: shipping.price,
      name: String(data.get("firstName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
    });
    clear();
    try {
      localStorage.removeItem(CART_NOTE_KEY);
    } catch {}
    setStatus("idle");
    window.scrollTo({ top: 0 });
  };

  // ----- states that replace the form
  const shell = (left: ReactNode, right: ReactNode) => (
    <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,calc(50%+50px))_minmax(0,1fr)]">
      <div className="px-5 pb-12 pt-8 lg:flex lg:justify-end lg:pr-10 lg:pt-10">
        <div className="w-full lg:max-w-[500px]">{left}</div>
      </div>
      <aside
        aria-label="Order summary"
        className="order-first border-b border-[#dedede] bg-[#f5f5f5] px-5 py-6 lg:order-none lg:border-b-0 lg:border-l lg:pl-10 lg:pt-10"
      >
        <div className="w-full lg:sticky lg:top-10 lg:max-w-[400px]">
          {right}
        </div>
      </aside>
    </div>
  );

  if (placed) {
    return shell(
      <div role="status">
        <CheckCircle2
          className="size-12"
          style={{ color: BLUE }}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h1 className="mt-4 text-[24px] font-semibold">
          Thank you{placed.name ? `, ${placed.name}` : ""}!
        </h1>
        <p className="mt-2 text-[15px] text-[#4a4a4a]">
          Your order has been received. We&apos;ll call you to confirm before
          delivery, and you&apos;ll pay in cash when it arrives.
        </p>
        {placed.email && (
          <p className="mt-2 text-[15px] text-[#4a4a4a]">
            Order updates will be sent to{" "}
            <strong className="font-medium text-[#1a1a1a]">
              {placed.email}
            </strong>
            .
          </p>
        )}
        <Link
          href="/"
          className="mt-8 flex h-[52px] w-full items-center justify-center rounded-[5px] text-[16px] font-semibold text-white transition hover:brightness-110 sm:w-auto sm:px-8"
          style={{ backgroundColor: BLUE }}
        >
          Continue shopping
        </Link>
      </div>,
      <OrderSummary {...placed} showDiscount={false} />,
    );
  }

  if (!ready) {
    return shell(<CheckoutFormSkeleton />, <SummarySkeleton />);
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[500px] px-5 py-20 text-center">
        <h1 className="text-[22px] font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-[15px] text-[#4a4a4a]">
          Add some products before checking out.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-[50px] items-center justify-center rounded-[5px] px-8 text-[15px] font-semibold text-white"
          style={{ backgroundColor: BLUE }}
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const summary = (
    <OrderSummary
      lines={lines}
      subtotal={subtotal}
      shipping={shipping.price}
      count={count}
    />
  );

  return shell(
    // Remount once saved details load so the inputs pick them up as defaults.
    <form
      key={Object.keys(saved).length ? "saved" : "blank"}
      noValidate
      onSubmit={onSubmit}
    >
      <h1 className="sr-only">Checkout</h1>

      <section aria-labelledby={f("contact-h")}>
        <div className="flex items-baseline justify-between">
          <h2 id={f("contact-h")} className="text-[21px] font-semibold">
            Contact
          </h2>
          <Link
            href="/account"
            className="text-[14px] underline underline-offset-2"
            style={{ color: BLUE }}
          >
            Sign in
          </Link>
        </div>
        <div className="mt-3.5">
          {input("email", "Email", {
            type: "email",
            autoComplete: "email",
            help: "In case we need to contact you about your order",
          })}
        </div>
      </section>

      <section aria-labelledby={f("delivery-h")} className="mt-10">
        <h2 id={f("delivery-h")} className="text-[21px] font-semibold">
          Delivery
        </h2>
        <div className="mt-3.5 space-y-3">
          <CountrySelect id={f("country")} />
          <div className="grid gap-3 sm:grid-cols-2">
            {input("firstName", "First name (optional)", {
              autoComplete: "given-name",
            })}
            {input("lastName", "Last name", { autoComplete: "family-name" })}
          </div>
          {input("company", "Company (optional)", {
            autoComplete: "organization",
          })}
          {input("address", "Address", { autoComplete: "street-address" })}
          <div className="grid gap-3 sm:grid-cols-2">
            {input("city", "City", { autoComplete: "address-level2" })}
            {input("postalCode", "Postal code (optional)", {
              autoComplete: "postal-code",
              inputMode: "numeric",
            })}
          </div>
          {input("phone", "Phone", {
            type: "tel",
            autoComplete: "tel",
            help: "In case we need to contact you about your order",
          })}
          <label className="flex cursor-pointer items-center gap-2.5 pt-0.5 text-[14px]">
            <input
              type="checkbox"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
              className="size-[18px] rounded accent-[#1a5bd0]"
            />
            Save this information for next time
          </label>
        </div>
      </section>

      <section aria-labelledby={f("ship-h")} className="mt-8">
        <h2 id={f("ship-h")} className="mb-3.5 text-[17px] font-semibold">
          Shipping method
        </h2>
        <RadioGroup
          name="shippingMethod"
          legend="Shipping method"
          value={shippingId}
          onChange={setShippingId}
          options={SHIPPING.map((s) => ({
            value: s.id,
            title: s.label,
            detail: (
              <>
                {windows[s.id] && (
                  <span className="block">{windows[s.id]}</span>
                )}
                {s.note && <span className="block">{s.note}</span>}
              </>
            ),
            aside: formatTaka(s.price),
          }))}
        />
      </section>

      <section aria-labelledby={f("pay-h")} className="mt-10">
        <h2 id={f("pay-h")} className="text-[21px] font-semibold">
          Payment
        </h2>
        <p className="mt-1 text-[14px] text-[#707070]">
          All transactions are secure and encrypted.
        </p>
        <div className="mt-3.5 overflow-hidden rounded-[5px] border border-[#1a5bd0]">
          <p className="bg-[#f0f5ff] px-4 py-4 text-[14px] font-medium">
            Cash on Delivery (COD)
          </p>
          <p className="border-t border-[#dedede] bg-[#f5f5f5] px-4 py-4 text-center text-[14px]">
            Pay in cash after receiving products
          </p>
        </div>
      </section>

      <section aria-labelledby={f("bill-h")} className="mt-10">
        <h2 id={f("bill-h")} className="mb-3.5 text-[17px] font-semibold">
          Billing address
        </h2>
        <RadioGroup
          name="billing"
          legend="Billing address"
          value={billing}
          onChange={setBilling}
          options={[
            { value: "same", title: "Same as shipping address" },
            { value: "different", title: "Use a different billing address" },
          ]}
        />
        {billing === "different" && (
          <div className="mt-3 space-y-3 rounded-[5px] bg-[#f5f5f5] p-4">
            <CountrySelect id={f("billCountry")} />
            <div className="grid gap-3 sm:grid-cols-2">
              {input("billFirstName", "First name (optional)", {
                autoComplete: "billing given-name",
              })}
              {input("billLastName", "Last name", {
                autoComplete: "billing family-name",
              })}
            </div>
            {input("billAddress", "Address", {
              autoComplete: "billing street-address",
            })}
            <div className="grid gap-3 sm:grid-cols-2">
              {input("billCity", "City", {
                autoComplete: "billing address-level2",
              })}
              {input("billPostalCode", "Postal code (optional)", {
                autoComplete: "billing postal-code",
              })}
            </div>
            {input("billPhone", "Phone (optional)", {
              type: "tel",
              autoComplete: "billing tel",
            })}
          </div>
        )}
      </section>

      {/* Small screens: show the total right above the button. */}
      <div className="mt-8 lg:hidden">
        <h2 className="mb-3 text-[17px] font-semibold">Order summary</h2>
        <OrderSummary
          lines={lines}
          subtotal={subtotal}
          shipping={shipping.price}
          count={count}
          showDiscount={false}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-10 flex h-[56px] w-full items-center justify-center rounded-[5px] text-[17px] font-semibold text-white transition hover:brightness-110 disabled:opacity-70"
        style={{ backgroundColor: BLUE }}
      >
        {status === "submitting" ? "Processing…" : "Complete order"}
      </button>

      <div className="mt-16 border-t border-[#dedede] pt-4 lg:border-0">
        <Link
          href="/terms"
          className="text-[14px] underline underline-offset-2"
          style={{ color: BLUE }}
        >
          Terms and policies
        </Link>
      </div>
    </form>,
    <>
      {/* Small screens: collapsible summary bar at the top. */}
      <button
        type="button"
        onClick={() => setSummaryOpen((o) => !o)}
        aria-expanded={summaryOpen}
        className="flex w-full items-center justify-between text-[14px] lg:hidden"
      >
        <span className="flex items-center gap-1.5" style={{ color: BLUE }}>
          {summaryOpen ? "Hide" : "Show"} order summary
          <ChevronDown
            className={`size-4 transition ${summaryOpen ? "rotate-180" : ""}`}
          />
        </span>
        <span className="text-[17px] font-semibold">
          {formatTaka(subtotal + shipping.price)}
        </span>
      </button>
      <div
        className={`${summaryOpen ? "mt-5 block" : "hidden"} lg:mt-0 lg:block`}
      >
        {summary}
      </div>
    </>,
  );
}
