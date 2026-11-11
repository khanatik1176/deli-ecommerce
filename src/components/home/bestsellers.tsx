import { ProductCarouselSection } from "@/components/home/product-carousel-section";
import { bestsellers } from "@/data/products";

export function Bestsellers() {
  return (
    <ProductCarouselSection
      id="bestsellers"
      title="Checkout our Bestsellers"
      label="Bestsellers"
      viewAllHref="/collections/bestsellers"
      products={bestsellers}
      className="py-12 lg:py-[10px]"
    />
  );
}
