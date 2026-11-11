"use client";

import { useId, useState } from "react";
import { Mail } from "lucide-react";

type Status = "idle" | "submitting" | "done" | "error";

export function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const messageId = useId();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    // TODO: send to the backend once an endpoint exists, e.g.
    // await api.post("/newsletter", { email });
    await new Promise((r) => setTimeout(r, 400));
    setStatus("done");
    setEmail("");
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="mt-6 bg-brand text-white lg:mt-[66px]"
    >
      <div className="mx-auto w-full max-w-[1750px] px-4 sm:px-[50px]">
        <div className="flex flex-col gap-6 py-8 sm:px-[19px] lg:min-h-[130px] lg:flex-row lg:items-center lg:justify-between lg:py-0">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-[25px]">
            <h2
              id="newsletter-heading"
              className="text-[22px] font-semibold leading-tight tracking-[-0.01em] sm:text-[24px] 2xl:text-[27px]"
            >
              Want Deli Products for your organization?
            </h2>
            <span
              aria-hidden="true"
              className="hidden h-[34px] w-px bg-white lg:block"
            />
            <p className="text-[15px] font-medium sm:text-[16px]">
              Share your email &amp; we will reach back to you
            </p>
          </div>

          <div className="relative w-full lg:w-[516px] lg:shrink-0">
            <form
              noValidate
              onSubmit={onSubmit}
              className="flex h-[50px] items-center rounded-md bg-white pl-4 pr-5"
            >
              <label htmlFor={`${messageId}-email`} className="sr-only">
                Email address
              </label>
              <input
                id={`${messageId}-email`}
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="Enter your email"
                autoComplete="email"
                aria-invalid={status === "error" || undefined}
                aria-describedby={messageId}
                className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-neutral-900 outline-none placeholder:text-[#6c6c73] sm:text-[20px]"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex shrink-0 items-center gap-2 text-[15px] font-semibold text-brand transition hover:text-brand-dark disabled:opacity-60"
              >
                <Mail className="size-4" strokeWidth={2} aria-hidden="true" />
                {status === "submitting" ? "Sending…" : "Subscribe"}
              </button>
            </form>
            <p
              id={messageId}
              role="status"
              className="mt-2 min-h-5 text-[14px] lg:absolute lg:mt-1"
            >
              {status === "error" && "Please enter a valid email address."}
              {status === "done" && "Thanks! We'll get back to you soon."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
