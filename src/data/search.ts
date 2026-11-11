export const trendingSearches = [
  "pencil",
  "ball pen",
  "flickwell",
  "scientific calculator",
  "cutter blade",
  "anti cutter",
  "color pencil",
  "crocodile sharpener",
  "highlighter set",
];

/** "ball pen" -> "ball-pen*", the query format trending chips search with. */
export const toTrendingQuery = (term: string) =>
  `${term.trim().toLowerCase().replace(/\s+/g, "-")}*`;

/** URL of the search results page for a query. */
export const searchUrl = (q: string, page?: number) => {
  const params = new URLSearchParams({ q, type: "product" });
  if (page && page > 1) params.set("page", String(page));
  // Keep "*" readable in the address bar (it is a valid query character).
  return `/search?${params.toString().replace(/%2A/g, "*")}`;
};
