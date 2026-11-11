"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";

function CategoryIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      aria-hidden="true"
    >
      <circle cx="5.5" cy="5.5" r="3.25" />
      <circle cx="14.5" cy="5.5" r="3.25" />
      <circle cx="5.5" cy="14.5" r="3.25" />
      <circle cx="14.5" cy="14.5" r="3.25" />
    </svg>
  );
}

export function CategoryMenu({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={compact ? "Categories" : undefined}
        onClick={() => setOpen((o) => !o)}
        className={
          compact
            ? "flex size-12 shrink-0 items-center justify-center rounded-full border border-white"
            : "flex h-11 items-center gap-2.5 rounded-full border border-white px-6 text-[15px] font-semibold uppercase tracking-[0.08em] transition hover:bg-white/10"
        }
      >
        <CategoryIcon className="size-[18px]" />
        {!compact && "Category"}
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute left-0 top-full z-50 mt-3 w-[290px] bg-white py-5 text-[#333] shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
      >
        <ul>
          {categories.map((category) => (
            <li key={category.slug} className="group/item relative">
              <Link
                href={`/collections/${category.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-2 py-2.5 pl-[68px] pr-7 text-[14px] font-semibold uppercase leading-5 tracking-[0.08em] transition hover:text-highlight group-hover/item:text-highlight group-focus-within/item:text-highlight"
              >
                <span className="max-w-[156px]">{category.name}</span>
                {category.hasSubmenu && (
                  <ChevronRight
                    className="size-4 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                )}
              </Link>

              {category.subcategories && category.subcategories.length > 0 && (
                <ul className="invisible absolute left-full top-0 w-[250px] bg-white py-4 opacity-0 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition group-focus-within/item:visible group-focus-within/item:opacity-100 group-hover/item:visible group-hover/item:opacity-100">
                  {category.subcategories.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/collections/${sub.slug}`}
                        onClick={() => setOpen(false)}
                        className="block py-[7px] pl-5 pr-6 text-[14px] font-semibold leading-[19px] text-[#46474a] transition hover:text-highlight"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
