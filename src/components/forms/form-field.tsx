import type { ReactNode } from "react";

/** Shared text input / textarea styling (thin border, red focus ring). */
export const inputClass =
  "block w-full rounded-md border border-neutral-300 bg-white px-3.5 text-[15px] text-neutral-900 outline-none transition placeholder:text-neutral-400 hover:border-neutral-400 focus:border-brand focus:ring-3 focus:ring-brand/15 aria-[invalid=true]:border-brand";

/** Label above a control, with required/optional marker and error or hint below. */
export function FormField({
  id,
  label,
  required,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-baseline gap-1 text-[14px] font-medium text-neutral-800"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-brand">
            *
          </span>
        )}
        {optional && (
          <span className="font-normal text-neutral-400">(optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-brand">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-neutral-500">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
