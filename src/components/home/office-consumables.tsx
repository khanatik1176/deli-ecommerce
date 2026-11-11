import { ProductCarouselSection } from "@/components/home/product-carousel-section";
import { officeConsumables } from "@/data/products";

export function OfficeConsumables() {
  return (
    <ProductCarouselSection
      id="office-consumables"
      title="Office Consumables"
      label="Office consumables"
      viewAllHref="/collections/consumables"
      products={officeConsumables}
    />
  );
}
