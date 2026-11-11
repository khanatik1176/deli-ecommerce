export type HomeCategory = {
  name: string;
  slug: string;
  image: string;
  /** Number of products; omit if unknown. */
  itemCount?: number;
};

export const homeCategories: HomeCategory[] = [
  { name: "Marker & Highlighter", slug: "marker-and-highlighter", image: "/images/cat1.webp", itemCount: 26 },
  { name: "Business Pens", slug: "business-pens", image: "/images/cat2.webp", itemCount: 21 },
  { name: "Premium Pens", slug: "premium-pens", image: "/images/cat3.webp", itemCount: 21 },
  { name: "Gift Packs", slug: "gift-packs", image: "/images/cat4.webp" },
  { name: "School Stationery", slug: "school-stationery", image: "/images/cat5.webp", itemCount: 32 },
  { name: "Office Supplies", slug: "office-supplies", image: "/images/cat6.webp", itemCount: 74 },
  { name: "Coloring Products", slug: "coloring-products", image: "/images/cat7.avif", itemCount: 18 },
  { name: "Calculators", slug: "calculators", image: "/images/cat8.avif", itemCount: 15 },
  { name: "Ball Pen", slug: "ball-pen", image: "/images/cat9.avif", itemCount: 11 },
  { name: "Adhesives", slug: "adhesives", image: "/images/cat10.webp", itemCount: 10 },
];
