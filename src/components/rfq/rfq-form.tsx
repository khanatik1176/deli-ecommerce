"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { checkFile, FileDrop } from "@/components/forms/file-drop";
import { FormField, inputClass as input } from "@/components/forms/form-field";

const MAX_FILE_MB = 10;
const ACCEPTED = [
  ".pdf",
  ".xls",
  ".xlsx",
  ".csv",
  ".doc",
  ".docx",
  ".png",
  ".jpg",
  ".jpeg",
];
const MAX_MESSAGE = 1000;

type Field = "name" | "email" | "company" | "phone" | "requirement" | "file";
type Errors = Partial<Record<Field, string>>;

const validateFile = (file: File) =>
  checkFile(
    file,
    ACCEPTED,
    MAX_FILE_MB,
    "Upload a PDF, Excel, CSV, Word or image file.",
  );

function validate(data: FormData, file: File | null): Errors {
  const errors: Errors = {};
  const get = (k: string) => String(data.get(k) ?? "").trim();
  if (!get("name")) errors.name = "Enter your full name.";
  const email = get("email");
  if (!email) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address.";
  const phone = get("phone");
  if (!phone) errors.phone = "Enter a phone number.";
  else if (!/^\+?[\d\s-]{7,16}$/.test(phone))
    errors.phone = "Enter a valid phone number.";
  if (!get("requirement")) errors.requirement = "Tell us what you need.";
  if (file) {
    const fileError = validateFile(file);
    if (fileError) errors.file = fileError;
  }
  return errors;
}

export function RfqForm() {
  const uid = useId();
  const id = (f: Field) => `${uid}-${f}`;
  const [errors, setErrors] = useState<Errors>({});
  const [file, setFile] = useState<File | null>(null);
  const [messageLength, setMessageLength] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const fieldProps = (f: Field) => ({
    id: id(f),
    name: f,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `${id(f)}-error` : undefined,
    onChange: () => errors[f] && setErrors((e) => ({ ...e, [f]: undefined })),
  });

  const pickFile = (next: File) => {
    setFile(next);
    setErrors((e) => ({ ...e, file: validateFile(next) }));
  };

  const removeFile = () => {
    setFile(null);
    setErrors((e) => ({ ...e, file: undefined }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next = validate(data, file);
    setErrors(next);
    const first = (Object.keys(next) as Field[])[0];
    if (first) {
      document
        .getElementById(first === "file" ? `${id("file")}-button` : id(first))
        ?.focus();
      return;
    }
    setStatus("submitting");
    if (file) data.set("file", file);
    // TODO: send to the backend once an endpoint exists, e.g.
    // await api.post("/rfq", data, { headers: { "Content-Type": "multipart/form-data" } });
    await new Promise((r) => setTimeout(r, 500));
    form.reset();
    setFile(null);
    setMessageLength(0);
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
          Requirement received
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-[15px] text-neutral-600">
          Thanks for reaching out. Our institutional sales team will get back to
          you within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[15px] font-medium text-brand underline underline-offset-4 hover:text-brand-dark"
        >
          Submit another requirement
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      <FormField id={id("name")} label="Name" required error={errors.name}>
        <input
          {...fieldProps("name")}
          type="text"
          autoComplete="name"
          placeholder="Full name"
          className={`${input} h-11`}
        />
      </FormField>

      <FormField id={id("email")} label="Email" required error={errors.email}>
        <input
          {...fieldProps("email")}
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          className={`${input} h-11`}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id={id("company")}
          label="Company"
          optional
          error={errors.company}
        >
          <input
            {...fieldProps("company")}
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            className={`${input} h-11`}
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
            className={`${input} h-11`}
          />
        </FormField>
      </div>

      <FormField
        id={id("requirement")}
        label="Describe Your Requirement"
        required
        error={errors.requirement}
        hint={
          <span className="flex justify-between gap-4">
            <span>Products, quantities and delivery timeline.</span>
            <span aria-live="polite">
              {messageLength}/{MAX_MESSAGE}
            </span>
          </span>
        }
      >
        <textarea
          {...fieldProps("requirement")}
          aria-describedby={
            errors.requirement
              ? `${id("requirement")}-error`
              : `${id("requirement")}-hint`
          }
          rows={5}
          maxLength={MAX_MESSAGE}
          placeholder="e.g. 500 × Max Gel Pen 0.5mm (black), 200 × Scribe 2B pencils, delivery by 15 Dec"
          onChange={(e) => {
            setMessageLength(e.target.value.length);
            if (errors.requirement)
              setErrors((x) => ({ ...x, requirement: undefined }));
          }}
          className={`${input} min-h-[120px] resize-y py-3`}
        />
      </FormField>

      <div>
        <p className="mb-1.5 flex items-baseline gap-1 text-[14px] font-medium text-neutral-800">
          RFQ <span className="font-normal text-neutral-400">(optional)</span>
        </p>
        <FileDrop
          id={`${id("file")}-button`}
          file={file}
          error={errors.file}
          accept={ACCEPTED}
          prompt="Upload required product list"
          help={`PDF, Excel, CSV, Word or image · up to ${MAX_FILE_MB} MB`}
          onPick={pickFile}
          onRemove={removeFile}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex h-12 w-full items-center justify-center rounded-md bg-brand text-[16px] font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand/30 disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting…" : "Submit Requirement"}
        </button>
        <p className="mt-4 text-center text-[15px] text-neutral-600">
          Already have an account?{" "}
          <Link
            href="/account"
            className="font-medium text-brand underline underline-offset-4 hover:text-brand-dark"
          >
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
}
