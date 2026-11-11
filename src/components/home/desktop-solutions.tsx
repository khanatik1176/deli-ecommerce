import { ProductCarouselSection } from "@/components/home/product-carousel-section";
import { desktopSolutions } from "@/data/products";

export function DesktopSolutions() {
  return (
    <ProductCarouselSection
      id="desktop-solutions"
      title="Desktop Solutions"
      label="Desktop solutions"
      viewAllHref="/collections/desktop-solutions"
      products={desktopSolutions}
    />
  );
}
