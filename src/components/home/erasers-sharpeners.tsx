import { ProductCarouselSection } from "@/components/home/product-carousel-section";
import { erasersAndSharpeners } from "@/data/products";

export function ErasersSharpeners() {
  return (
    <ProductCarouselSection
      id="erasers-sharpeners"
      title="Eraser - Sharpeners & More"
      label="Erasers and sharpeners"
      viewAllHref="/collections/eraser-sharpeners"
      products={erasersAndSharpeners}
    />
  );
}
