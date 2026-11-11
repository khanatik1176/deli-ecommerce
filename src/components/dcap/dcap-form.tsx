"use client";

import { useId, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { FormField, inputClass } from "@/components/forms/form-field";

type Field = "name" | "email" | "institution" | "phone" | "reason";
type Errors = Partial<Record<Field, string>>;

const MAX_REASON = 1000;

function validate(data: FormData): Errors {
  const get = (k: string) => String(data.get(k) ?? "").trim();
  const errors: Errors = {};
  if (!get("name")) errors.name = "Enter your name.";
  const email = get("email");
  if (!email) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address.";
  if (!get("institution"))
    errors.institution = "Enter your school, college or university.";
  const phone = get("phone");
  if (!phone) errors.phone = "Enter a phone number.";
  else if (!/^\+?[\d\s-]{7,16}$/.test(phone))
    errors.phone = "Enter a valid phone number.";
  if (!get("reason")) errors.reason = "Tell us why you'd like to join.";
  return errors;
}

export function DcapForm() {
  const uid = useId();
  const id = (f: Field) => `${uid}-${f}`;
  const [errors, setErrors] = useState<Errors>({});
  const [reasonLength, setReasonLength] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const fieldProps = (f: Field) => ({
    id: id(f),
    name: f,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `${id(f)}-error` : undefined,
    onChange: () => errors[f] && setErrors((e) => ({ ...e, [f]: undefined })),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next = validate(data);
    setErrors(next);
    const first = (Object.keys(next) as Field[])[0];
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }
    setStatus("submitting");
    // TODO: send to the backend once an endpoint exists, e.g.
    // await api.post("/dcap-applications", Object.fromEntries(data));
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
          Application submitted
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-[15px] text-neutral-600">
          Thanks for applying to the Deli Campus Ambassador Program. We&apos;ll
          review your application and get in touch.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[15px] font-medium text-brand underline underline-offset-4 hover:text-brand-dark"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id={id("name")} label="Name" required error={errors.name}>
          <input
            {...fieldProps("name")}
            type="text"
            autoComplete="name"
            placeholder="Full name"
            className={`${inputClass} h-11`}
          />
        </FormField>
        <FormField id={id("email")} label="Email" required error={errors.email}>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            placeholder="Enter email address"
            className={`${inputClass} h-11`}
          />
        </FormField>
      </div>

      <FormField
        id={id("institution")}
        label="Institution Name"
        required
        error={errors.institution}
      >
        <input
          {...fieldProps("institution")}
          type="text"
          autoComplete="organization"
          placeholder="School / College / University"
          className={`${inputClass} h-11`}
        />
      </FormField>

      <FormField
        id={id("phone")}
        label="Phone Number"
        required
        error={errors.phone}
      >
        <input
          {...fieldProps("phone")}
          type="tel"
          autoComplete="tel"
          placeholder="+880 1XXX-XXXXXX"
          className={`${inputClass} h-11`}
        />
      </FormField>

      <FormField
        id={id("reason")}
        label="Tell Us Why You Want To Be A Deli Campus Ambassador"
        required
        error={errors.reason}
        hint={
          <span className="flex justify-end">
            {reasonLength}/{MAX_REASON}
          </span>
        }
      >
        <textarea
          {...fieldProps("reason")}
          aria-describedby={
            errors.reason ? `${id("reason")}-error` : `${id("reason")}-hint`
          }
          rows={5}
          maxLength={MAX_REASON}
          onChange={(e) => {
            setReasonLength(e.target.value.length);
            if (errors.reason) setErrors((x) => ({ ...x, reason: undefined }));
          }}
          className={`${inputClass} min-h-[110px] resize-y py-3`}
        />
      </FormField>

      <p className="pt-3 text-[16px] leading-[30px] text-[#46474a]">
        Become the face of Deli Group on your campus—join the Deli Ambassador
        Program, unlock exclusive rewards, lead exciting opportunities, and
        become the key connector of your institution&rsquo;s student community
        with the Deli network.
      </p>

      <div className="flex justify-center pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex h-[49px] items-center justify-center bg-black px-[25px] text-[16px] font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-neutral-400 disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting…" : "Submit"}
        </button>
      </div>
    </form>
  );
}
