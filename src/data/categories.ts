export type Subcategory = { name: string; slug: string };

export type Category = {
  name: string;
  slug: string;
  /** Sub-categories shown in a flyout on hover. */
  subcategories?: Subcategory[];
  /** Whether the item shows a chevron (has, or will have, a submenu). */
  hasSubmenu?: boolean;
};

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const subs = (...names: string[]): Subcategory[] =>
  names.map((name) => ({ name, slug: slugify(name) }));

export const categories: Category[] = [
  {
    name: "Desktop Solutions",
    slug: "desktop-solutions",
    hasSubmenu: true,
    subcategories: subs(
      "Punch",
      "Stapler",
      "Staple Remover",
      "Tape Dispenser",
      "Calculator",
      "Adhesives",
      "Stationery Set",
    ),
  },
  {
    name: "Consumables",
    slug: "consumables",
    hasSubmenu: true,
    subcategories: subs(
      "Binder Clip",
      "Super Glue",
      "White Glue",
      "Sticky Notes",
      "Staples",
      "Glue Stick",
      "Office Pin",
      "Markers & Highlighters",
      "Liquid Glue",
      "Paper Clips",
      "Cutter Blade",
    ),
  },
  {
    name: "School Products",
    slug: "school-products",
    hasSubmenu: true,
    subcategories: subs(
      "Color Pencils",
      "Eraser",
      "Markers",
      "Highlighter",
      "Calculators",
      "Oil Pastel",
      "Pencil",
      "White Glue",
      "Anti-Cutter",
      "Glue Stick",
      "Long running Pens",
      "Scientific Calculator",
      "Sharpener",
    ),
  },
  {
    name: "Coloring Products",
    slug: "coloring-products",
    hasSubmenu: true,
    subcategories: subs("Color Pencils", "Oil Pastel", "Markers & Highlighters"),
  },
  {
    name: "Cutting Tools",
    slug: "cutting-tools",
    hasSubmenu: true,
    subcategories: subs("Anti-Cutter", "Cutter Blade", "Scissors"),
  },
  {
    name: "Writing Solutions",
    slug: "writing-solutions",
    hasSubmenu: true,
    subcategories: subs(
      "Ball Pens",
      "Business Pens",
      "Highlighter",
      "Markers",
      "Pencil",
      "Long running Pens",
      "Gel Pens",
    ),
  },
  { name: "Numbering Machines", slug: "numbering-machines" },
  { name: "iSelect Range", slug: "iselect-range" },
];
