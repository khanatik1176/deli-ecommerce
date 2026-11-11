"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "done";

const field =
  "h-[52px] w-full rounded-full border border-[#e6e6e6] bg-[#f2f2f2] px-5 text-[16px] text-neutral-900 outline-none transition placeholder:text-[#808080] focus:border-neutral-400 focus:bg-white aria-[invalid=true]:border-brand";

const fields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    autoComplete: "family-name",
  },
  { name: "email", label: "Your Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Your Phone", type: "tel", autoComplete: "tel" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<Set<string>>(new Set());

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const invalidEls = [...form.elements].filter(
      (el): el is HTMLInputElement | HTMLTextAreaElement =>
        (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) &&
        !el.checkValidity(),
    );
    setInvalid(new Set(invalidEls.map((el) => el.name)));
    if (invalidEls.length > 0) {
      invalidEls[0].focus();
      return;
    }
    setStatus("submitting");
    // TODO: send to the backend once an endpoint exists, e.g.
    // await api.post("/contact", Object.fromEntries(new FormData(form)));
    await new Promise((r) => setTimeout(r, 400));
    form.reset();
    setStatus("done");
  };

  const clear = (name: string) => {
    if (status === "done") setStatus("idle");
    if (invalid.has(name)) {
      const next = new Set(invalid);
      next.delete(name);
      setInvalid(next);
    }
  };

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby="contact-status">
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-[30px]">
        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={`contact-${f.name}`} className="sr-only">
              {f.label} (required)
            </label>
            <input
              id={`contact-${f.name}`}
              name={f.name}
              type={f.type}
              required
              autoComplete={f.autoComplete}
              placeholder={`${f.label}*`}
              aria-invalid={invalid.has(f.name) || undefined}
              onChange={() => clear(f.name)}
              className={field}
            />
          </div>
        ))}
      </div>

      <label htmlFor="contact-message" className="sr-only">
        Your message
      </label>
      <textarea
        id="contact-message"
        name="message"
        rows={5}
        placeholder="Your Message Here..."
        onChange={() => clear("message")}
        className="mt-5 block h-[142px] w-full resize-y rounded-lg border border-[#e6e6e6] bg-[#f2f2f2] px-5 py-[18px] text-[16px] text-neutral-900 outline-none transition placeholder:text-[#808080] focus:border-neutral-400 focus:bg-white sm:mt-[30px]"
      />

      <div className="mt-[30px] flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex h-12 items-center rounded-full border border-neutral-900 px-[30px] text-[16px] font-medium text-neutral-950 transition hover:bg-neutral-950 hover:text-white disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Message"}
        </button>
        <p id="contact-status" role="status" className="text-[15px]">
          {invalid.size > 0 && (
            <span className="text-brand">
              Please fill in all required fields with valid details.
            </span>
          )}
          {status === "done" && (
            <span className="text-green-700">
              Thanks! Your message has been sent.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
