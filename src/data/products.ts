export type Product = {
  name: string;
  slug: string;
  /** Path under /public. Products without one render a placeholder. */
  image?: string;
  /** Width/height of a non-square image, e.g. "570/658". Defaults to square. */
  imageAspect?: string;
  /** Lowest price in BDT. */
  price: number;
  /** Pack size shown in the cart, e.g. "6 Pcs". */
  pack?: string;
  /** Multiple variants: the price is shown as "From Tk …". */
  hasVariants?: boolean;
};

// Mock catalog: replace with API data once the backend is available.
export const products: Product[] = [
  {
    name: "Flickwell Ballpen-0.7mm-BK | Super smooth | Comfortable grip",
    slug: "flickwell-ballpen-0-7mm-bk",
    pack: "6 Pcs",
    image: "/images/EQ100-BK_1_785x.webp",
    price: 60,
    hasVariants: true,
  },
  {
    name: "Pulsar Ballpen-0.7-BK | Fast writing | Long-lasting ink | Smooth",
    slug: "pulsar-ballpen-0-7-bk",
    image: "/images/5_099c73e0-7cb0-4691-b75d-58b504884374_785x.webp",
    price: 60,
    hasVariants: true,
  },
  {
    name: "Scribe Pencil -2B-Tri-White | Durable | Dark Lines",
    slug: "scribe-pencil-2b-tri-white",
    image: "/images/EC062-2B_6_785x.webp",
    price: 50,
    hasVariants: true,
  },
  {
    name: "Flickwell Ballpen-0.7-BK | Ultra-smooth | Low Viscosity",
    slug: "flickwell-ballpen-0-7-bk",
    image: "/images/EQ120-BK_2_785x.webp",
    price: 30,
    hasVariants: true,
  },
  {
    name: "Deli Ballpen-0.7-BLACK | Extra Smooth | Long-lasting",
    slug: "deli-ballpen-0-7-black",
    image: "/images/ballp5.webp",
    price: 60,
    hasVariants: true,
  },
  {
    name: "Every Ballpen-0.7-BK | Ergonomic design | Smooth writing | Long-lasting Ink",
    slug: "every-ballpen-0-7-bk",
    image: "/images/ballp3.webp",
    price: 60,
    hasVariants: true,
  },
  {
    name: "Xtream Ballpen-0.7-BL | Sleek design | 0.7mm precise tip | Ergonomic design",
    slug: "xtream-ballpen-0-7-bl",
    price: 60,
    hasVariants: true,
  },
  {
    name: "Deli Ballpen-0.7-Blue | Extra Smooth | Long-lasting",
    slug: "deli-ballpen-0-7-blue",
    price: 60,
    hasVariants: true,
  },
  {
    name: "Arrow Ballpen-0.7mm-BK | Ergonomic design | Smooth writing",
    slug: "arrow-ballpen-0-7mm-bk",
    price: 330,
  },
  {
    name: "Every Ballpen-0.7-RD | Ergonomic design | Smooth writing | Long-lasting Ink",
    slug: "every-ballpen-0-7-rd",
    price: 60,
    hasVariants: true,
  },
  // Bestsellers
  {
    name: "Max Gel pen-0.5- EG62-BK | Ultra fine 0.5mm tip",
    slug: "max-gel-pen-0-5-eg62-bk",
    image: "/images/bp3.webp",
    price: 30,
    hasVariants: true,
  },
  {
    name: "Max Gel Pen-0.5-BK | Precise | Smooth | 1600m of extended writing",
    slug: "max-gel-pen-0-5-bk",
    image: "/images/bp4.webp",
    price: 50,
    hasVariants: true,
  },
  {
    name: "Scribe Pencil -2B-Hex-Blue | Durable | Dark | Safe | Poplar Wood",
    slug: "scribe-pencil-2b-hex-blue",
    image: "/images/bs4.webp",
    price: 50,
    hasVariants: true,
  },
  {
    name: "Scribe Pencil -2B-Tri-White | Durable | Dark | Safe",
    slug: "scribe-pencil-2b-tri-white-safe",
    image: "/images/bs5.webp",
    price: 50,
    hasVariants: true,
  },
  {
    name: "Deli Roller Pen-0.5-SF855-BK | 4X more Ink | Smudge-free | Smooth Writing",
    slug: "deli-roller-pen-0-5-sf855-bk",
    pack: "1 Pcs",
    image: "/images/bs6.webp",
    price: 50,
    hasVariants: true,
  },
  {
    name: "Deli Sharpener-Crocodile | Crocodile shaped | Sharp blade | Kid-friendly",
    slug: "deli-sharpener-crocodile",
    image: "/images/bs7.webp",
    price: 50,
  },
  {
    name: "(V1) Deli Exam Gel Pen-0.5-V1-BK | Ergonomic design | Quick-drying Ink",
    slug: "v1-deli-exam-gel-pen-0-5-v1-bk",
    image: "/images/bp7.webp",
    price: 100,
    hasVariants: true,
  },
  // Scientific calculators
  {
    name: "Scientific Calculator-417F-BK | 417 Functions | Dot Matrix display | 3 year warranty",
    slug: "scientific-calculator-417f-bk",
    image: "/images/cal1.webp",
    price: 2250,
  },
  {
    name: "Scientific Calculator-300F | 300 Functions | 2 Line display | 3 year warranty | Wear resistant",
    slug: "scientific-calculator-300f",
    image: "/images/cal2.webp",
    price: 950,
  },
  {
    name: "Scientific Calculator-82ES | HD dot matrix screen | 280 functions | 3 years warranty",
    slug: "scientific-calculator-82es",
    image: "/images/cal3.webp",
    price: 1950,
  },
  {
    name: "Scientific Calculator-240F-BK | 240 Scientific Functions | 3 year warranty | Complex math calculations",
    slug: "scientific-calculator-240f-bk",
    image: "/images/cal4.webp",
    price: 1050,
  },
  // Calculators
  {
    name: "Portable Calculator - Dark Grey-12 | Large display | Dual power",
    slug: "portable-calculator-dark-grey-12",
    image: "/images/calc1.webp",
    price: 350,
  },
  {
    name: "Desktop Calculator-M-12-Silver | 1,000,000+ Button Life | Clear display",
    slug: "desktop-calculator-m-12-silver",
    image: "/images/calc3.webp",
    price: 650,
  },
  {
    name: "Desktop Calculator-12-White | 1,000,000+ button life | 145° tilted display",
    slug: "desktop-calculator-12-white",
    image: "/images/calc4.webp",
    price: 450,
  },
  {
    name: "Desktop Calculator-12 | Premium Build quality | 1,000,000+ Button Life",
    slug: "desktop-calculator-12-premium",
    image: "/images/calc6.webp",
    price: 950,
  },
  {
    name: "Desktop Calculator-12-Black | 1,000,000+ button life | 145° tilted display",
    slug: "desktop-calculator-12-black",
    image: "/images/calc7.webp",
    price: 550,
  },
  // Kids favorites
  {
    name: "Traound Highlighter-6pcs | Multicolor",
    slug: "traound-highlighter-6pcs",
    image: "/images/kid2.webp",
    price: 240,
  },
  {
    name: "Deli Ice-cream Eraser - Smudge free superior erasing",
    slug: "deli-ice-cream-eraser",
    image: "/images/kid3.webp",
    price: 70,
  },
  {
    name: "Rotary Pencil Sharpener | Reliable | durable | kid-friendly",
    slug: "rotary-pencil-sharpener",
    image: "/images/kid4.webp",
    price: 450,
  },
  {
    name: "Portable Calculator-Green-12 | Large display | Dual power",
    slug: "portable-calculator-green-12",
    image: "/images/kid6.webp",
    price: 350,
  },
  {
    name: "Portable Calculator- Blue-12 | Large display | Dual power",
    slug: "portable-calculator-blue-12",
    image: "/images/kid7.webp",
    price: 350,
  },
  {
    name: "Rotary Sharpener-Blue | Durable | Reliable | Efficient",
    slug: "rotary-sharpener-blue",
    image: "/images/kid8.webp",
    price: 350,
  },
  // Ball pens
  {
    name: "Deli Ballpen-0.7-Black | Sleek design | Smooth writing | Long-lasting",
    slug: "deli-ballpen-0-7-black-sleek",
    image: "/images/ballp4.webp",
    price: 60,
    hasVariants: true,
  },
  {
    name: "Deli Ballpoint pen-0.7mm-BK | Smooth and effortless writing | Pastel body",
    slug: "deli-ballpoint-pen-0-7mm-bk",
    image: "/images/ballp6.webp",
    price: 60,
    hasVariants: true,
  },
  {
    name: "Flickwell Ballpen-0.7-Blue | Super smooth | Comfortable grip",
    slug: "flickwell-ballpen-0-7-blue",
    image: "/images/ballp7.webp",
    price: 60,
    hasVariants: true,
  },
  // Graphite pencils
  {
    name: "Srcibe Pencil-Tri-2B-Neon | Durable | Smooth | Vibrant",
    slug: "scribe-pencil-tri-2b-neon",
    image: "/images/gp5.webp",
    price: 48,
    hasVariants: true,
  },
  {
    name: "Deli Pencil-Hex-2B-Green | Soft-wood | Smooth drawing | Break resistant",
    slug: "deli-pencil-hex-2b-green",
    image: "/images/gp6.webp",
    price: 75,
    hasVariants: true,
  },
  {
    name: "Scribe Pencil -2B-Tri-Black | High quality graphite | Durable | Easy to sharpen",
    slug: "scribe-pencil-2b-tri-black",
    image: "/images/gp7.webp",
    price: 50,
    hasVariants: true,
  },
  {
    name: "Deli Pencil - 4B-Black | Smudge-free | Smooth",
    slug: "deli-pencil-4b-black",
    image: "/images/gp1.webp",
    price: 20,
    hasVariants: true,
  },
  {
    name: "iSelect Pencil-HB-Hex-Colorful barrel - 10 Pcs Pack | Strong lead | Free eraser & sharpener",
    slug: "iselect-pencil-hb-hex-colorful",
    image: "/images/gp2.webp",
    price: 100,
  },
  // Coloring products
  {
    name: "Colorun Colored Pencil-Full-12 | High Quality | Vibrant | Safe | 12 Colors",
    slug: "colorun-colored-pencil-full-12",
    image: "/images/cp7.webp",
    price: 150,
  },
  {
    name: "Color wow Oil Pastel-24 | Smooth | Non-Toxic | Smudge-free",
    slug: "color-wow-oil-pastel-24",
    image: "/images/cp4.webp",
    price: 230,
  },
  {
    name: "Colorun Dual Colored Pencil-12 | Double ended design | Non-toxic",
    slug: "colorun-dual-colored-pencil-12",
    image: "/images/cp2.webp",
    price: 220,
  },
  {
    name: "Colorun Colored Pencil-tin-24 | Vibrant | Safe | Free sharpener | 24 Colors",
    slug: "colorun-colored-pencil-tin-24",
    image: "/images/cp3.webp",
    imageAspect: "570/658",
    price: 375,
  },
  {
    name: "ColorKids Oil Pastel-Plastic | 12 Color palette | Smooth | Eco-friendly",
    slug: "colorkids-oil-pastel-plastic-12",
    image: "/images/cp1.webp",
    price: 150,
  },
  {
    name: "Deli Erasable Colored Pencil Tin | Vibrant | Erasable | Non toxic | 12 Colors",
    slug: "deli-erasable-colored-pencil-tin",
    image: "/images/cp5.webp",
    price: 200,
  },
  {
    name: "Colorkids Oil Pastel-Plastic | 24 Color palette | Smooth | Eco-friendly",
    slug: "colorkids-oil-pastel-plastic-24",
    image: "/images/cp6.webp",
    price: 400,
  },
  // Eraser, sharpeners & more
  {
    name: "iSelect Assorted Sharpeners-48pcs | Smooth sharpening | Colorful",
    slug: "iselect-assorted-sharpeners-48pcs",
    image: "/images/es13.webp",
    price: 50,
  },
  {
    name: "Deli Compass - Durable Zinc Alloy Material | Safe Tip Cap",
    slug: "deli-compass-zinc-alloy",
    image: "/images/es1.webp",
    price: 150,
  },
  {
    name: "iSelect Correction tape-5mm*8m | Smooth correction | Clean finish",
    slug: "iselect-correction-tape-5mm-8m",
    image: "/images/es2.webp",
    price: 80,
  },
  {
    name: "iSelect pencil sharpeners - Transparent-72pcs | Energetic colors",
    slug: "iselect-pencil-sharpeners-transparent-72pcs",
    image: "/images/es3.webp",
    price: 50,
  },
  {
    name: "iSelect Eraser-small-white | Dust-free | PVC free | Precise",
    slug: "iselect-eraser-small-white",
    image: "/images/es4.webp",
    price: 50,
  },
  {
    name: "Deli Rotary pencil Sharpener -8mm-PK | Pink color | Anti lead breakage",
    slug: "deli-rotary-pencil-sharpener-8mm-pk",
    image: "/images/es5.webp",
    price: 200,
  },
  {
    name: "Deli Exam Eraser-Black | Dust-free | Easy cleaning",
    slug: "deli-exam-eraser-black",
    image: "/images/es7.webp",
    price: 20,
  },
  {
    name: "Exam Eraser Black | Dust Free | Anti Smudge",
    slug: "exam-eraser-black",
    image: "/images/es6.webp",
    price: 30,
  },
  {
    name: "iSelect Eraser-Medium | Dust-free | PVC free | Precise",
    slug: "iselect-eraser-medium",
    image: "/images/es10.webp",
    price: 50,
  },
  {
    name: "iSelect Eraser - Colored | Dust-free | PVC free | Precise | Neon colors",
    slug: "iselect-eraser-colored",
    image: "/images/es11.webp",
    price: 50,
  },
  {
    name: "iSelect Correction tape-5mm*5m | Smooth correction | Clean finish",
    slug: "iselect-correction-tape-5mm-5m",
    image: "/images/es12.webp",
    price: 80,
  },
  // Desktop solutions
  {
    name: "Mini Stapler with Staples | Handy | 50,000+ Stapling | Integrated staple remover",
    slug: "mini-stapler-with-staples",
    image: "/images/ds7.webp",
    price: 120,
  },
  {
    name: "Staple Remover-BK | Safe | Compact | Easy staple removing",
    slug: "staple-remover-bk",
    image: "/images/ds1.webp",
    price: 70,
  },
  {
    name: "Staple Remover-Silver | Safe | Easy staple removing",
    slug: "staple-remover-silver",
    image: "/images/ds2.webp",
    price: 80,
  },
  {
    name: "Punch-Regular-White | Lock system | Smooth paper punching",
    slug: "punch-regular-white",
    image: "/images/ds3.webp",
    price: 250,
  },
  {
    name: "Exceed Stapler-W-12 | Sleek | Durable | 50,000+ Stapling",
    slug: "exceed-stapler-w-12",
    image: "/images/ds4.webp",
    price: 250,
  },
  {
    name: "Exceed Stapler-BK-12 | Sleek | Low staple indicator | 50,000+ Stapling",
    slug: "exceed-stapler-bk-12",
    image: "/images/ds5.webp",
    price: 250,
  },
  {
    name: "Exceed Stapler-BL-12 | Sleek | Durable | 50,000+ Stapling",
    slug: "exceed-stapler-bl-12",
    image: "/images/ds6.webp",
    price: 250,
  },
  // Business pens
  {
    name: "Matte Arris Gel Pen-0.7-BK | Smooth | Elegant | Reliable",
    slug: "matte-arris-gel-pen-0-7-bk",
    image: "/images/bp1.webp",
    price: 70,
    hasVariants: true,
  },
  {
    name: "Deli Multicolor Gel Pen-0.7 | Colorful smooth writing | 4 colors in one",
    slug: "deli-multicolor-gel-pen-0-7",
    image: "/images/bp2.webp",
    price: 70,
    hasVariants: true,
  },
  {
    name: "Deli SMOS Gel pen-0.5mm-BK | Faux leather grip | Smudge free writing",
    slug: "deli-smos-gel-pen-0-5mm-bk",
    image: "/images/bp5.webp",
    price: 80,
    hasVariants: true,
  },
  {
    name: "Scrivin BallPen-0.5-BK | Elegant | Reliable | Effortless",
    slug: "scrivin-ballpen-0-5-bk",
    image: "/images/bp6.webp",
    price: 30,
    hasVariants: true,
  },
  // Office consumables
  {
    name: "Glue Stick - 20gm | Super sticky | Non-toxic | Washable",
    slug: "glue-stick-20gm",
    image: "/images/oc5.webp",
    price: 65,
  },
  {
    name: "Super Glue-3g | Fast-Dry | Super strong",
    slug: "super-glue-3g",
    image: "/images/oc7.webp",
    price: 30,
  },
  {
    name: "Paper Clips-Regular | Colorful | Durable",
    slug: "paper-clips-regular",
    image: "/images/oc1.webp",
    price: 75,
  },
  {
    name: "iselect Staples - 12 | For large staplers | smooth stapling | 1000 pcs",
    slug: "iselect-staples-12",
    image: "/images/oc2.webp",
    price: 25,
  },
  {
    name: "Stickup Liquid Glue - 30ml | Super sticky | Quick-dry | Odorless",
    slug: "stickup-liquid-glue-30ml",
    image: "/images/oc3.webp",
    price: 25,
  },
  {
    name: "White Glue - 40ml | Washable | Smooth and Safe",
    slug: "white-glue-40ml",
    image: "/images/oc4.webp",
    price: 45,
  },
  {
    name: "Glue Stick - 15gm | Super sticky | Non-toxic | Washable",
    slug: "glue-stick-15gm",
    image: "/images/oc6.webp",
    price: 50,
  },
  // Markers & highlighters
  {
    name: "iSelect Highlighter-1.4mm-YL | Yellow neon color | Chiesel tip | 12 pcs",
    slug: "iselect-highlighter-1-4mm-yl",
    image: "/images/mh6.webp",
    price: 25,
  },
  {
    name: "Accent Highlighter-Yellow | Bright | Smooth | Non-toxic",
    slug: "accent-highlighter-yellow",
    image: "/images/mh7.webp",
    price: 40,
  },
  {
    name: "Accent Highlighter-Orange | Bright Color | Smooth | Non-toxic",
    slug: "accent-highlighter-orange",
    image: "/images/mh2.webp",
    price: 40,
  },
  {
    name: "Whiteboard Marker-LQ-Big-BK | Long-lasting marker life | Easy to erase",
    slug: "whiteboard-marker-lq-big-bk",
    image: "/images/mh3.webp",
    price: 100,
  },
  {
    name: "iSelect Permanent marker-2.0mm-BK | Black ink | Bullet-tip | Smooth writing",
    slug: "iselect-permanent-marker-2-0mm-bk",
    image: "/images/mh4.webp",
    price: 25,
  },
  {
    name: "iSelect Highlighter-1.4mm-BL | Blue neon color | Chiesel tip | 12 pcs",
    slug: "iselect-highlighter-1-4mm-bl",
    image: "/images/mh5.webp",
    price: 25,
  },
];

const popularSlugs = [
  "flickwell-ballpen-0-7mm-bk",
  "pulsar-ballpen-0-7-bk",
  "scribe-pencil-2b-tri-white",
  "flickwell-ballpen-0-7-bk",
];

export const popularProducts = popularSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => Boolean(p));

const bestsellerSlugs = [
  "max-gel-pen-0-5-eg62-bk",
  "max-gel-pen-0-5-bk",
  "scribe-pencil-2b-hex-blue",
  "scribe-pencil-2b-tri-white-safe",
  "deli-roller-pen-0-5-sf855-bk",
  "deli-sharpener-crocodile",
  "v1-deli-exam-gel-pen-0-5-v1-bk",
];

export const bestsellers = bestsellerSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => Boolean(p));

const scientificCalculatorSlugs = [
  "scientific-calculator-417f-bk",
  "scientific-calculator-300f",
  "scientific-calculator-82es",
  "scientific-calculator-240f-bk",
];

export const scientificCalculators = scientificCalculatorSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => Boolean(p));

// The 417F and 300F are the same products as in Scientific Calculators.
const calculatorSlugs = [
  "portable-calculator-dark-grey-12",
  "scientific-calculator-300f",
  "desktop-calculator-m-12-silver",
  "desktop-calculator-12-white",
  "scientific-calculator-417f-bk",
  "desktop-calculator-12-premium",
  "desktop-calculator-12-black",
];

export const calculators = calculatorSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => Boolean(p));

// The crocodile sharpener and dark-grey portable calculator are existing products.
const kidsFavoriteSlugs = [
  "deli-sharpener-crocodile",
  "traound-highlighter-6pcs",
  "deli-ice-cream-eraser",
  "rotary-pencil-sharpener",
  "portable-calculator-dark-grey-12",
  "portable-calculator-green-12",
  "portable-calculator-blue-12",
  "rotary-sharpener-blue",
];

export const kidsFavorites = kidsFavoriteSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => Boolean(p));

const ballPenSlugs = [
  "every-ballpen-0-7-bk",
  "deli-ballpen-0-7-black-sleek",
  "deli-ballpen-0-7-black",
  "deli-ballpoint-pen-0-7mm-bk",
  "flickwell-ballpen-0-7-blue",
  "flickwell-ballpen-0-7mm-bk",
  "pulsar-ballpen-0-7-bk",
];

export const ballPens = ballPenSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => Boolean(p));

// Hex-Blue and Tri-White are the same products as in Bestsellers.
const graphitePencilSlugs = [
  "scribe-pencil-2b-hex-blue",
  "scribe-pencil-2b-tri-white-safe",
  "scribe-pencil-tri-2b-neon",
  "deli-pencil-hex-2b-green",
  "scribe-pencil-2b-tri-black",
  "deli-pencil-4b-black",
  "iselect-pencil-hb-hex-colorful",
];

export const graphitePencils = graphitePencilSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => Boolean(p));

const coloringProductSlugs = [
  "colorun-colored-pencil-full-12",
  "color-wow-oil-pastel-24",
  "colorun-dual-colored-pencil-12",
  "colorun-colored-pencil-tin-24",
  "colorkids-oil-pastel-plastic-12",
  "deli-erasable-colored-pencil-tin",
  "colorkids-oil-pastel-plastic-24",
];

export const coloringProducts = coloringProductSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => Boolean(p));

// Crocodile sharpener, ice-cream eraser and rotary sharpener are existing products.
const eraserSharpenerSlugs = [
  "iselect-assorted-sharpeners-48pcs",
  "deli-compass-zinc-alloy",
  "iselect-correction-tape-5mm-8m",
  "iselect-pencil-sharpeners-transparent-72pcs",
  "iselect-eraser-small-white",
  "deli-rotary-pencil-sharpener-8mm-pk",
  "deli-exam-eraser-black",
  "exam-eraser-black",
  "deli-sharpener-crocodile",
  "deli-ice-cream-eraser",
  "iselect-eraser-medium",
  "iselect-eraser-colored",
  "rotary-pencil-sharpener",
  "iselect-correction-tape-5mm-5m",
];

export const erasersAndSharpeners = eraserSharpenerSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => Boolean(p));

const desktopSolutionSlugs = [
  "mini-stapler-with-staples",
  "staple-remover-bk",
  "staple-remover-silver",
  "punch-regular-white",
  "exceed-stapler-w-12",
  "exceed-stapler-bk-12",
  "exceed-stapler-bl-12",
];

export const desktopSolutions = desktopSolutionSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => Boolean(p));

// V1 Exam and the two Max gel pens are the same products as in Bestsellers.
const businessPenSlugs = [
  "v1-deli-exam-gel-pen-0-5-v1-bk",
  "matte-arris-gel-pen-0-7-bk",
  "deli-multicolor-gel-pen-0-7",
  "max-gel-pen-0-5-eg62-bk",
  "max-gel-pen-0-5-bk",
  "deli-smos-gel-pen-0-5mm-bk",
  "scrivin-ballpen-0-5-bk",
];

export const businessPens = businessPenSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => Boolean(p));

const officeConsumableSlugs = [
  "glue-stick-20gm",
  "super-glue-3g",
  "paper-clips-regular",
  "iselect-staples-12",
  "stickup-liquid-glue-30ml",
  "white-glue-40ml",
  "glue-stick-15gm",
];

export const officeConsumables = officeConsumableSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => Boolean(p));

// The Traound highlighter is the same product as in Kids Favorites.
const markerHighlighterSlugs = [
  "iselect-highlighter-1-4mm-yl",
  "accent-highlighter-yellow",
  "traound-highlighter-6pcs",
  "accent-highlighter-orange",
  "whiteboard-marker-lq-big-bk",
  "iselect-permanent-marker-2-0mm-bk",
  "iselect-highlighter-1-4mm-bl",
];

export const markersAndHighlighters = markerHighlighterSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => Boolean(p));
