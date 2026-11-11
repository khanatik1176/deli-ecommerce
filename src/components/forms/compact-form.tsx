"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

/** Pieces shared by the placeholder-style forms (Service Claim, DCP). */

export const COUNTRIES = [
  { code: "BD", dial: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "IN", dial: "+91", flag: "🇮🇳", name: "India" },
  { code: "NP", dial: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "LK", dial: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "AE", dial: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "SA", dial: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "MY", dial: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "SG", dial: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "US", dial: "+1", flag: "🇺🇸", name: "United States" },
] as const;

export type Country = (typeof COUNTRIES)[number];

/** Normalises a national phone number; returns undefined if it's not plausible. */
export const nationalNumber = (value: string) => {
  const digits = value.replace(/[\s-]/g, "");
  return /^\d{6,12}$/.test(digits) ? digits : undefined;
};

export const compactBox =
  "h-12 w-full rounded-md border border-neutral-300 bg-white px-4 text-[15px] text-neutral-900 outline-none transition placeholder:text-neutral-500 hover:border-neutral-400 focus:border-brand focus:ring-3 focus:ring-brand/15 aria-[invalid=true]:border-brand";

export const ErrorText = ({
  id,
  children,
}: {
  id: string;
  children?: string;
}) =>
  children ? (
    <p id={id} className="mt-1.5 text-[13px] text-brand">
      {children}
    </p>
  ) : null;

/** Bangladesh flag (emoji flags don't render on Windows). */
function BdFlag() {
  return (
    <svg
      viewBox="0 0 20 12"
      className="h-[18px] w-[28px] rounded-[2px]"
      aria-hidden="true"
    >
      <rect width="20" height="12" fill="#006a4e" />
      <circle cx="9" cy="6" r="3.6" fill="#f42a41" />
    </svg>
  );
}

/** Country-code picker plus a "Phone" box showing the dial code. Posts as `phone`. */
export function PhoneField({
  id,
  country,
  onCountryChange,
  error,
  onInput,
}: {
  id: string;
  country: Country;
  onCountryChange: (country: Country) => void;
  error?: string;
  onInput?: () => void;
}) {
  return (
    <div>
      <div className="flex gap-1.5">
        <div className="relative w-[92px] shrink-0">
          <label htmlFor={`${id}-country`} className="sr-only">
            Country code
          </label>
          <select
            id={`${id}-country`}
            value={country.code}
            onChange={(e) =>
              onCountryChange(
                COUNTRIES.find((c) => c.code === e.target.value) ??
                  COUNTRIES[0],
              )
            }
            className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name} ({c.dial})
              </option>
            ))}
          </select>
          <div
            aria-hidden="true"
            className="flex h-12 items-center justify-between rounded-md border border-neutral-300 px-4 transition peer-hover:border-neutral-400 peer-focus-visible:border-brand peer-focus-visible:ring-3 peer-focus-visible:ring-brand/15"
          >
            {country.code === "BD" ? (
              <BdFlag />
            ) : (
              <span className="text-[20px] leading-none">{country.flag}</span>
            )}
            <ChevronDown
              className="size-4 fill-neutral-700 text-neutral-700"
              strokeWidth={0}
            />
          </div>
        </div>
        <div
          className={`relative flex h-12 min-w-0 flex-1 flex-col justify-center rounded-md border px-4 transition focus-within:border-brand focus-within:ring-3 focus-within:ring-brand/15 ${
            error
              ? "border-brand"
              : "border-neutral-300 hover:border-neutral-400"
          }`}
        >
          <label
            htmlFor={id}
            className="text-[11px] leading-none text-neutral-500"
          >
            Phone
          </label>
          <div className="mt-1 flex items-center gap-1 text-[15px] leading-tight text-neutral-900">
            <span aria-hidden="true">{country.dial}</span>
            <input
              id={id}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              aria-label={`Phone number, ${country.name} ${country.dial} (required)`}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              onChange={onInput}
              className="min-w-0 flex-1 bg-transparent outline-none"
            />
          </div>
        </div>
      </div>
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}

/** Full-width dark Submit button with the privacy/terms note underneath. */
export function CompactSubmit({ submitting }: { submitting: boolean }) {
  return (
    <div className="pt-2.5">
      <button
        type="submit"
        disabled={submitting}
        className="flex h-[45px] w-full items-center justify-center rounded-md bg-[#202020] text-[15px] font-semibold text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-neutral-400 disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit"}
      </button>
      <p className="mt-4 text-center text-[12px] text-neutral-700">
        View our{" "}
        <Link
          href="/privacy-policy"
          className="underline-offset-2 hover:underline"
        >
          privacy policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="underline-offset-2 hover:underline">
          terms of service
        </Link>
        .
      </p>
    </div>
  );
}
