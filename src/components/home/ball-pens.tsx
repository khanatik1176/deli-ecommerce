import { ProductCarouselSection } from "@/components/home/product-carousel-section";
import { ballPens } from "@/data/products";

/** `id` must be unique on the page when the section is shown more than once. */
export function BallPens({ id = "ball-pens" }: { id?: string }) {
  return (
    <ProductCarouselSection
      id={id}
      title="Ball Pens"
      label="Ball pens"
      viewAllHref="/collections/ball-pens"
      products={ballPens}
    />
  );
}
