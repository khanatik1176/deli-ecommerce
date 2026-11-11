import type { Metadata } from "next";
import { Suspense } from "react";
import { Pagination } from "@/components/search/pagination";
import { SearchBanner } from "@/components/search/search-banner";
import { SearchProductCard } from "@/components/search/search-product-card";
import { searchUrl } from "@/data/search";
import { searchProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Search | Deli Ecommerce",
};

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <main className="flex-1">
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function SearchResults({
  searchParams,
}: {
  searchParams: PageProps<"/search">["searchParams"];
}) {
  const params = await searchParams;
  const q = first(params.q)?.trim() ?? "";
  const page = Number.parseInt(first(params.page) ?? "1", 10) || 1;

  if (!q) {
    return (
      <>
        <SearchBanner title="Search our store" />
        <p className="px-4 py-24 text-center text-neutral-600">
          Type a product name in the search bar above to get started.
        </p>
      </>
    );
  }

  const result = await searchProducts({ q, page });
  const title = `${result.total} ${result.total === 1 ? "result" : "results"} found for “${q}”`;

  return (
    <>
      <SearchBanner title={title} />
      <div className="mx-auto w-full max-w-[1640px] px-4 pb-24 pt-12 sm:px-[30px] lg:pb-[100px] lg:pt-[110px]">
        {result.items.length > 0 ? (
          <>
            <ul className="grid grid-cols-1 gap-x-14 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-[75px]">
              {result.items.map((product, i) => (
                <li key={product.slug}>
                  <SearchProductCard product={product} priority={i < 3} />
                </li>
              ))}
            </ul>
            <div className="mt-16 lg:mt-[72px]">
              <Pagination
                page={result.page}
                totalPages={result.totalPages}
                hrefFor={(p) => searchUrl(q, p)}
              />
            </div>
          </>
        ) : (
          <p className="text-center text-[16px] text-neutral-600">
            No products matched your search. Try a different keyword.
          </p>
        )}
      </div>
    </>
  );
}

function SearchSkeleton() {
  return (
    <>
      <SearchBanner title="Searching…" />
      <div className="mx-auto w-full max-w-[1640px] px-4 pb-24 pt-12 sm:px-[30px] lg:pt-[110px]">
        <ul className="grid grid-cols-1 gap-x-14 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <li key={i} className="animate-pulse">
              <div className="aspect-square w-full bg-neutral-100" />
              <div className="mx-auto mt-8 h-4 w-3/4 bg-neutral-100" />
              <div className="mx-auto mt-4 h-4 w-1/4 bg-neutral-100" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
