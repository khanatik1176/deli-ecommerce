import { ProductCarouselSection } from "@/components/home/product-carousel-section";
import { businessPens } from "@/data/products";

export function BusinessPens() {
  return (
    <ProductCarouselSection
      id="business-pens"
      title="Business Pens"
      label="Business pens"
      viewAllHref="/collections/business-pens"
      products={businessPens}
    />
  );
}
