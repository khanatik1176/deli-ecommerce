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

type Field =
  | "firstName"
  | "email"
  | "phone"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "reason";
type Errors = Partial<Record<Field, string>>;

const MAX_REASON = 1000;
const SOCIALS = ["facebook", "instagram", "tiktok"] as const;

/** A URL on the given domain, or (when allowed) an @handle. */
function checkSocial(value: string, domain: string, allowHandle: boolean) {
  if (!value) return;
  if (allowHandle && /^@?[A-Za-z0-9._]{2,30}$/.test(value)) return;
  try {
    const url = new URL(
      /^https?:\/\//i.test(value) ? value : `https://${value}`,
    );
    if (url.hostname === domain || url.hostname.endsWith(`.${domain}`)) return;
  } catch {}
  return allowHandle
    ? `Enter your ${domain} link or @handle.`
    : `Enter a valid ${domain} page link.`;
}

export function DcpForm() {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const [errors, setErrors] = useState<Errors>({});
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [reasonLength, setReasonLength] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const clear = (...fields: Field[]) =>
    setErrors((e) => {
      if (!fields.some((f) => e[f])) return e;
      const next = { ...e };
      fields.forEach((f) => delete next[f]);
      return next;
    });

  const textField = (
    f: Field,
    placeholder: string,
    label: string,
    extra: object = {},
  ) => (
    <div>
      <label htmlFor={id(f)} className="sr-only">
        {label}
      </label>
      <input
        id={id(f)}
        name={f}
        placeholder={placeholder}
        aria-invalid={errors[f] ? true : undefined}
        aria-describedby={errors[f] ? id(`${f}-error`) : undefined}
        // Editing any social link clears the "add at least one" error on all three.
        onChange={() =>
          clear(...((SOCIALS as readonly string[]).includes(f) ? SOCIALS : [f]))
        }
        className={compactBox}
        {...extra}
      />
      <ErrorText id={id(`${f}-error`)}>{errors[f]}</ErrorText>
    </div>
  );

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

    if (SOCIALS.every((s) => !get(s))) {
      next.facebook =
        "Add at least one of your Facebook, Instagram or TikTok profiles.";
    } else {
      const fb = checkSocial(get("facebook"), "facebook.com", false);
      const ig = checkSocial(get("instagram"), "instagram.com", true);
      const tt = checkSocial(get("tiktok"), "tiktok.com", true);
      if (fb) next.facebook = fb;
      if (ig) next.instagram = ig;
      if (tt) next.tiktok = tt;
    }
    if (!get("reason"))
      next.reason = "Tell us why you'd be a great Deli Creator.";

    setErrors(next);
    const first = (Object.keys(next) as Field[])[0];
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }

    setStatus("submitting");
    data.set("phone", `${country.dial}${phone}`);
    // TODO: send to the backend once an endpoint exists, e.g.
    // await api.post("/dcp-applications", Object.fromEntries(data));
    await new Promise((r) => setTimeout(r, 500));
    form.reset();
    setReasonLength(0);
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
          You&apos;re signed up
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-[15px] text-neutral-600">
          Thanks for joining the Deli Creators Hub. Our team will review your
          profiles and get in touch.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[15px] font-medium text-brand underline underline-offset-4 hover:text-brand-dark"
        >
          Submit another sign-up
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-2.5">
      {textField("firstName", "First name", "First name (required)", {
        autoComplete: "given-name",
      })}
      {textField("email", "Email", "Email (required)", {
        type: "email",
        autoComplete: "email",
      })}
      <PhoneField
        id={id("phone")}
        country={country}
        onCountryChange={setCountry}
        error={errors.phone}
        onInput={() => clear("phone")}
      />
      {textField("facebook", "Facebook Page Link", "Facebook page link", {
        type: "url",
        inputMode: "url",
      })}
      {textField(
        "instagram",
        "Instagram Handle / Link",
        "Instagram handle or link",
        { autoCapitalize: "none" },
      )}
      {textField("tiktok", "Tiktok Handle / Link", "TikTok handle or link", {
        autoCapitalize: "none",
      })}
      <p className="text-[12px] text-neutral-500">
        Add at least one social profile.
      </p>

      <div>
        <label htmlFor={id("reason")} className="sr-only">
          Tell us why you are the future Deli Creator (required)
        </label>
        <textarea
          id={id("reason")}
          name="reason"
          rows={3}
          maxLength={MAX_REASON}
          placeholder="Tell us why you are the future Deli Creator"
          aria-invalid={errors.reason ? true : undefined}
          aria-describedby={errors.reason ? id("reason-error") : undefined}
          onChange={(e) => {
            setReasonLength(e.target.value.length);
            clear("reason");
          }}
          className={`${compactBox} h-auto min-h-[92px] resize-y py-3`}
        />
        <ErrorText id={id("reason-error")}>{errors.reason}</ErrorText>
        {!errors.reason && reasonLength > 0 && (
          <p className="mt-1 text-right text-[12px] text-neutral-500">
            {reasonLength}/{MAX_REASON}
          </p>
        )}
      </div>

      <CompactSubmit submitting={status === "submitting"} />
    </form>
  );
}
