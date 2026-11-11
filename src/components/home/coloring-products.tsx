import { ProductCarouselSection } from "@/components/home/product-carousel-section";
import { coloringProducts } from "@/data/products";

export function ColoringProducts() {
  return (
    <ProductCarouselSection
      id="coloring-products"
      title="Coloring Products"
      label="Coloring products"
      viewAllHref="/collections/coloring-products"
      products={coloringProducts}
    />
  );
}
