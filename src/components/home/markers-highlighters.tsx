import { ProductCarouselSection } from "@/components/home/product-carousel-section";
import { markersAndHighlighters } from "@/data/products";

export function MarkersHighlighters() {
  return (
    <ProductCarouselSection
      id="markers-highlighters"
      title="Markers & Highlighters"
      label="Markers and highlighters"
      viewAllHref="/collections/markers-and-highlighters"
      products={markersAndHighlighters}
    />
  );
}
