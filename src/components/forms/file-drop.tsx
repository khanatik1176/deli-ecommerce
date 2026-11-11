"use client";

import { useRef, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/** Returns an error message, or undefined if the file is acceptable. */
export function checkFile(
  file: File,
  accept: string[],
  maxMb: number,
  typeMessage: string,
) {
  const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
  if (!accept.includes(ext)) return typeMessage;
  if (file.size > maxMb * 1024 * 1024)
    return `File must be ${maxMb} MB or smaller.`;
}

/**
 * Click-or-drop single file picker. Controlled: the parent owns `file` and
 * `error`. `id` is put on the focusable button so errors can focus it.
 */
export function FileDrop({
  id,
  file,
  error,
  accept,
  prompt,
  help,
  onPick,
  onRemove,
}: {
  id: string;
  file: File | null;
  error?: string;
  accept: string[];
  /** e.g. "Upload required product list" (shown in red) */
  prompt: string;
  /** e.g. "PDF or image · up to 10 MB" */
  help: string;
  onPick: (file: File) => void;
  onRemove: () => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <>
      <input
        ref={input}
        type="file"
        accept={accept.join(",")}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
        }}
      />
      {file ? (
        <div
          className={`flex items-center gap-3 rounded-md border px-3.5 py-3 ${
            error ? "border-brand" : "border-neutral-300"
          }`}
        >
          <FileText
            className="size-5 shrink-0 text-neutral-500"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] text-neutral-900">{file.name}</p>
            <p className="text-[12px] text-neutral-500">
              {formatSize(file.size)}
            </p>
          </div>
          <button
            type="button"
            id={id}
            onClick={() => {
              if (input.current) input.current.value = "";
              onRemove();
            }}
            aria-label={`Remove ${file.name}`}
            className="rounded p-1 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          id={id}
          onClick={() => input.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files?.[0];
            if (f) onPick(f);
          }}
          aria-describedby={`${id}-help`}
          className={`flex w-full flex-col items-center gap-1.5 rounded-md border border-dashed px-4 py-6 text-center transition focus-visible:border-brand focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand/15 ${
            error
              ? "border-brand"
              : dragging
                ? "border-brand bg-brand/5"
                : "border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50"
          }`}
        >
          <UploadCloud
            className="size-6 text-neutral-500"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="text-[14px] text-neutral-800">
            <span className="font-medium text-brand">{prompt}</span> or drag and
            drop
          </span>
          <span id={`${id}-help`} className="text-[12px] text-neutral-500">
            {help}
          </span>
        </button>
      )}
      {error && <p className="mt-1.5 text-[13px] text-brand">{error}</p>}
    </>
  );
}
