import { products, type Product } from "@/data/products";

export const SEARCH_PAGE_SIZE = 6;

const priceFormat = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** 2250 -> "Tk 2,250.00" */
export const formatPrice = (amount: number) => `Tk ${priceFormat.format(amount)}`;

/** 190 -> "৳190.00" (checkout uses the taka sign). */
export const formatTaka = (amount: number) => `৳${priceFormat.format(amount)}`;

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Matches products whose name contains every term in the query.
 * Hyphens and spaces separate terms, and a trailing "*" is treated as a
 * wildcard, so "ball-pen*" matches "Deli Ballpen-0.7-BLACK".
 */
function matches(product: Product, query: string) {
  const terms = query.split(/[\s-]+/).map(normalize).filter(Boolean);
  if (terms.length === 0) return false;
  const name = normalize(product.name);
  return terms.every((term) => name.includes(term));
}

export type SearchResult = {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
};

// Mock implementation over the local catalog. When the backend is ready,
// replace the body with e.g. `(await api.get("/products/search", { params })).data`.
export async function searchProducts({
  q,
  page = 1,
  pageSize = SEARCH_PAGE_SIZE,
}: {
  q: string;
  page?: number;
  pageSize?: number;
}): Promise<SearchResult> {
  const all = products.filter((p) => matches(p, q));
  const totalPages = Math.max(1, Math.ceil(all.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  return {
    items: all.slice(start, start + pageSize),
    total: all.length,
    page: current,
    totalPages,
  };
}
