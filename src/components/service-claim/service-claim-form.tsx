"use client";

import { useId, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  COUNTRIES,
  CompactSubmit,
  compactBox,
  type Country,
  ErrorText,
  nationalNumber,
  PhoneField,
} from "@/components/forms/compact-form";
import { checkFile, FileDrop } from "@/components/forms/file-drop";

const MAX_FILE_MB = 10;
const ACCEPTED = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".pdf"];

type Field =
  "firstName" | "email" | "phone" | "model" | "date" | "shop" | "receipt";
type Errors = Partial<Record<Field, string>>;

function checkDate(mm: string, dd: string, yyyy: string): string | undefined {
  if (!mm || !dd || !yyyy) return "Enter the full purchase date.";
  const m = Number(mm),
    d = Number(dd),
    y = Number(yyyy);
  const date = new Date(y, m - 1, d);
  const real =
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d;
  if (!real || yyyy.length !== 4) return "Enter a valid date (MM / DD / YYYY).";
  if (date > new Date()) return "Purchase date can't be in the future.";
  if (y < 2000) return "Enter a valid purchase year.";
}

export function ServiceClaimForm({ models }: { models: string[] }) {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const [errors, setErrors] = useState<Errors>({});
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const clear = (f: Field) =>
    errors[f] && setErrors((e) => ({ ...e, [f]: undefined }));
  const a11y = (f: Field) => ({
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? id(`${f}-error`) : undefined,
  });

  const pickReceipt = (file: File) => {
    setReceipt(file);
    setErrors((e) => ({
      ...e,
      receipt: checkFile(
        file,
        ACCEPTED,
        MAX_FILE_MB,
        "Upload a photo (JPG, PNG, HEIC) or PDF.",
      ),
    }));
  };

  /** Keep only digits; jump to the next date box once this one is full. */
  const dateInput =
    (max: number, nextId?: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, max);
      clear("date");
      if (nextId && e.target.value.length === max)
        document.getElementById(nextId)?.focus();
    };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {};

    if (!get("firstName")) next.firstName = "Enter your first name.";
    const email = get("email");
    if (!email) next.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address.";
    const phoneRaw = get("phone");
    const phone = nationalNumber(phoneRaw);
    if (!phoneRaw) next.phone = "Enter your phone number.";
    else if (!phone) next.phone = "Enter a valid phone number.";
    if (!get("model")) next.model = "Enter your calculator model.";
    const dateError = checkDate(get("month"), get("day"), get("year"));
    if (dateError) next.date = dateError;
    if (!get("shop")) next.shop = "Enter the shop you bought it from.";
    if (!receipt)
      next.receipt = "Upload your purchase receipt or warranty card.";
    else {
      const fileError = checkFile(
        receipt,
        ACCEPTED,
        MAX_FILE_MB,
        "Upload a photo (JPG, PNG, HEIC) or PDF.",
      );
      if (fileError) next.receipt = fileError;
    }

    setErrors(next);
    const first = (Object.keys(next) as Field[])[0];
    if (first) {
      document
        .getElementById(first === "date" ? id("month") : id(first))
        ?.focus();
      return;
    }

    setStatus("submitting");
    data.set("phone", `${country.dial}${phone}`);
    data.set(
      "purchaseDate",
      `${get("year")}-${get("month").padStart(2, "0")}-${get("day").padStart(2, "0")}`,
    );
    data.set("receipt", receipt as File);
    // TODO: send to the backend once an endpoint exists, e.g.
    // await api.post("/service-claims", data, { headers: { "Content-Type": "multipart/form-data" } });
    await new Promise((r) => setTimeout(r, 500));
    form.reset();
    setReceipt(null);
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div
        role="status"
        className="rounded-lg border border-neutral-200 px-6 py-12 text-center"
      >
        <CheckCircle2
          className="mx-auto size-12 text-green-600"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h3 className="mt-4 text-[20px] font-semibold text-neutral-950">
          Registration received
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-[15px] text-neutral-600">
          Your calculator is registered for service &amp; warranty. We&apos;ll
          contact you if we need anything else.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[15px] font-medium text-brand underline underline-offset-4 hover:text-brand-dark"
        >
          Register another calculator
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-2.5">
      <div>
        <label htmlFor={id("firstName")} className="sr-only">
          First name (required)
        </label>
        <input
          id={id("firstName")}
          name="firstName"
          autoComplete="given-name"
          placeholder="First name"
          onChange={() => clear("firstName")}
          {...a11y("firstName")}
          className={compactBox}
        />
        <ErrorText id={id("firstName-error")}>{errors.firstName}</ErrorText>
      </div>

      <div>
        <label htmlFor={id("email")} className="sr-only">
          Email (required)
        </label>
        <input
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          onChange={() => clear("email")}
          {...a11y("email")}
          className={compactBox}
        />
        <ErrorText id={id("email-error")}>{errors.email}</ErrorText>
      </div>

      <PhoneField
        id={id("phone")}
        country={country}
        onCountryChange={setCountry}
        error={errors.phone}
        onInput={() => clear("phone")}
      />

      <div>
        <label htmlFor={id("model")} className="sr-only">
          Calculator model (required)
        </label>
        <input
          id={id("model")}
          name="model"
          list={id("models")}
          placeholder="Calculator Model"
          onChange={() => clear("model")}
          {...a11y("model")}
          className={compactBox}
        />
        <datalist id={id("models")}>
          {models.map((m) => (
            <option key={m} value={m} />
          ))}
        </datalist>
        <ErrorText id={id("model-error")}>{errors.model}</ErrorText>
      </div>

      <fieldset aria-describedby={errors.date ? id("date-error") : undefined}>
        <legend className="mb-1.5 pt-1 text-[15px] text-neutral-900">
          Purchase Date
        </legend>
        <div className="grid grid-cols-[1fr_1fr_1.95fr] gap-1.5">
          <div>
            <label htmlFor={id("month")} className="sr-only">
              Month
            </label>
            <input
              id={id("month")}
              name="month"
              inputMode="numeric"
              autoComplete="off"
              placeholder="MM"
              onChange={dateInput(2, id("day"))}
              aria-invalid={errors.date ? true : undefined}
              className={compactBox}
            />
          </div>
          <div>
            <label htmlFor={id("day")} className="sr-only">
              Day
            </label>
            <input
              id={id("day")}
              name="day"
              inputMode="numeric"
              autoComplete="off"
              placeholder="DD"
              onChange={dateInput(2, id("year"))}
              aria-invalid={errors.date ? true : undefined}
              className={compactBox}
            />
          </div>
          <div>
            <label htmlFor={id("year")} className="sr-only">
              Year
            </label>
            <input
              id={id("year")}
              name="year"
              inputMode="numeric"
              autoComplete="off"
              placeholder="YYYY"
              onChange={dateInput(4)}
              aria-invalid={errors.date ? true : undefined}
              className={compactBox}
            />
          </div>
        </div>
        <ErrorText id={id("date-error")}>{errors.date}</ErrorText>
      </fieldset>

      <div>
        <label htmlFor={id("shop")} className="sr-only">
          Shop name (required)
        </label>
        <input
          id={id("shop")}
          name="shop"
          placeholder="Shop Name"
          onChange={() => clear("shop")}
          {...a11y("shop")}
          className={compactBox}
        />
        <ErrorText id={id("shop-error")}>{errors.shop}</ErrorText>
      </div>

      <div className="pt-1.5">
        <p className="mb-2 text-[15px] text-neutral-900">
          Purchase Receipt / Warranty Card Image
        </p>
        <FileDrop
          id={id("receipt")}
          file={receipt}
          error={errors.receipt}
          accept={ACCEPTED}
          prompt="Add file"
          help={`Photo or PDF · up to ${MAX_FILE_MB} MB`}
          onPick={pickReceipt}
          onRemove={() => {
            setReceipt(null);
            setErrors((e) => ({ ...e, receipt: undefined }));
          }}
        />
      </div>

      <CompactSubmit submitting={status === "submitting"} />
    </form>
  );
}
