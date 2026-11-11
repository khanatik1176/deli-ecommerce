import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Item = number | "ellipsis";

/** e.g. page 1 of 37 -> [1, 2, 3, …, 37]; page 10 -> [1, …, 9, 10, 11, …, 37]. */
function pageItems(page: number, totalPages: number): Item[] {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const pages = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  if (page <= 3) [2, 3].forEach((p) => pages.add(p));
  if (page >= totalPages - 2) [totalPages - 2, totalPages - 1].forEach((p) => pages.add(p));
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  const items: Item[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) items.push("ellipsis");
    items.push(p);
  });
  return items;
}

const box =
  "flex size-10 items-center justify-center border border-neutral-950 text-[16px] text-neutral-950";

export function Pagination({
  page,
  totalPages,
  hrefFor,
}: {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex justify-center">
      <ul className="flex flex-wrap items-center justify-center gap-2.5">
        {page > 1 && (
          <li>
            <Link href={hrefFor(page - 1)} aria-label="Previous page" className={`${box} hover:bg-neutral-100`}>
              <ChevronLeft className="size-4" strokeWidth={1.75} />
            </Link>
          </li>
        )}
        {pageItems(page, totalPages).map((item, i) =>
          item === "ellipsis" ? (
            <li key={`e${i}`} aria-hidden="true" className={box}>
              &hellip;
            </li>
          ) : (
            <li key={item}>
              {item === page ? (
                <span aria-current="page" className={`${box} bg-neutral-950 text-white`}>
                  {item}
                </span>
              ) : (
                <Link href={hrefFor(item)} className={`${box} hover:bg-neutral-100`}>
                  {item}
                </Link>
              )}
            </li>
          ),
        )}
        {page < totalPages && (
          <li>
            <Link href={hrefFor(page + 1)} aria-label="Next page" className={`${box} hover:bg-neutral-100`}>
              <ChevronRight className="size-4" strokeWidth={1.75} />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
