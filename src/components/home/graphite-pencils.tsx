import { ProductCarouselSection } from "@/components/home/product-carousel-section";
import { graphitePencils } from "@/data/products";

export function GraphitePencils() {
  return (
    <ProductCarouselSection
      id="graphite-pencils"
      title="Graphite Pencils"
      label="Graphite pencils"
      viewAllHref="/collections/graphite-pencils"
      products={graphitePencils}
    />
  );
}
