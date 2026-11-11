"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useId, useRef, useState } from "react";
import { Search } from "lucide-react";
import { ProductImage } from "@/components/product/product-image";
import { popularProducts } from "@/data/products";
import { searchUrl, toTrendingQuery, trendingSearches } from "@/data/search";
import { formatPrice } from "@/lib/products";

type Props = { className?: string };

export function SearchBar(props: Props) {
  // Reading the URL needs a Suspense boundary; the fallback is the same bar, empty.
  return (
    <Suspense fallback={<SearchBarView {...props} initialQuery="" />}>
      <SearchBarWithQuery {...props} />
    </Suspense>
  );
}

function SearchBarWithQuery(props: Props) {
  const pathname = usePathname();
  const q = useSearchParams().get("q") ?? "";
  const initialQuery = pathname === "/search" ? q : "";
  // Remount when the query in the URL changes so the input reflects it.
  return (
    <SearchBarView key={initialQuery} {...props} initialQuery={initialQuery} />
  );
}

function SearchBarView({
  className = "",
  initialQuery,
}: Props & { initialQuery: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Stop the native "clear on Escape" of search inputs, which would reopen the panel.
        e.preventDefault();
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const typed = query.trim().toLowerCase();
  const terms = typed
    ? trendingSearches.filter((t) => t.includes(typed))
    : trendingSearches;
  const products = typed
    ? popularProducts.filter((p) => p.name.toLowerCase().includes(typed))
    : popularProducts;

  const search = (value: string) => {
    const q = value.trim();
    if (!q) return;
    setQuery(q);
    setOpen(false);
    inputRef.current?.blur();
    router.push(searchUrl(q));
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          search(query);
        }}
        className="flex h-12 items-center rounded-full bg-white pl-5 pr-1"
      >
        <input
          ref={inputRef}
          type="search"
          name="q"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search products..."
          aria-label="Search products"
          role="combobox"
          aria-expanded={open}
          aria-controls={panelId}
          autoComplete="off"
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-neutral-800 placeholder:text-neutral-500 outline-none [&::-webkit-search-cancel-button]:appearance-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-neutral-900 transition hover:brightness-95"
        >
          <Search className="size-5" strokeWidth={2.25} />
        </button>
      </form>

      <div
        id={panelId}
        hidden={!open}
        className="absolute left-0 top-full z-50 mt-[5px] w-full bg-white p-4 text-neutral-900 shadow-[0_8px_30px_rgba(0,0,0,0.15)] lg:left-[15px] lg:w-[560px] 2xl:w-[800px]"
      >
        {terms.length > 0 && (
          <section>
            <h2 className="border-b border-neutral-200 pb-3 text-[15px] font-semibold uppercase">
              Trending Now
            </h2>
            <ul className="flex flex-wrap gap-2.5 pt-3.5">
              {terms.map((term) => (
                <li key={term}>
                  <button
                    type="button"
                    onClick={() => search(toTrendingQuery(term))}
                    className="flex h-10 items-center gap-2 bg-[#f3f3f3] px-2.5 text-[16px] text-neutral-500 transition hover:bg-neutral-200 hover:text-neutral-800"
                  >
                    <Search className="size-[18px]" strokeWidth={1.75} />
                    {term}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {products.length > 0 && (
          <section className={terms.length > 0 ? "mt-[30px]" : ""}>
            <h2 className="border-b border-neutral-200 pb-3 text-[15px] font-semibold uppercase">
              Popular Products
            </h2>
            <ul className="grid grid-cols-2 gap-5 pt-4 sm:grid-cols-4">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={() => setOpen(false)}
                    className="group block text-center"
                  >
                    <ProductImage product={product} sizes="180px" />
                    <p className="mt-5 line-clamp-2 px-1 text-[14px] leading-5 text-neutral-700 group-hover:text-neutral-900 2xl:text-[15px]">
                      {product.name}
                    </p>
                    <p className="mt-2 whitespace-nowrap text-[14px] font-semibold 2xl:text-[16px]">
                      {product.hasVariants && <>From&nbsp; </>}
                      {formatPrice(product.price)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {terms.length === 0 && products.length === 0 && (
          <button
            type="button"
            onClick={() => search(query)}
            className="flex w-full items-center gap-2 py-2 text-left text-[15px] text-neutral-700 hover:text-neutral-900"
          >
            <Search className="size-[18px] shrink-0" strokeWidth={1.75} />
            Search for &ldquo;{query.trim()}&rdquo;
          </button>
        )}
      </div>
    </div>
  );
}
