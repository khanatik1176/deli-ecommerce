import Link from "next/link";
import { ProductImage } from "@/components/product/product-image";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/products";

export function SearchProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <Link href={`/products/${product.slug}`} className="group block text-center">
      <ProductImage
        product={product}
        priority={priority}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <h2 className="mt-8 px-2 text-[15px] leading-5 text-neutral-700 transition group-hover:text-neutral-950 sm:text-[16px]">
        {product.name}
      </h2>
      <p className="mt-3.5 text-[16px] font-semibold text-neutral-950">
        {product.hasVariants && "From "}
        {formatPrice(product.price)}
      </p>
    </Link>
  );
}
