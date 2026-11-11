import { ProductCarouselSection } from "@/components/home/product-carousel-section";
import { calculators } from "@/data/products";

export function Calculators() {
  return (
    <ProductCarouselSection
      id="calculators"
      title="Calculators"
      label="Calculators"
      viewAllHref="/collections/calculators"
      products={calculators}
    />
  );
}
