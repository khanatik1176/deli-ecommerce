import Link from "next/link";
import { ProductActions } from "@/components/product/product-actions";
import { ProductImage } from "@/components/product/product-image";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/products";

/**
 * Product card: image with hover actions, two-line title and price.
 * `priceTone="sale"` shows the price in red (e.g. Bestsellers).
 */
export function ProductCard({
  product,
  sizes,
  priceTone = "default",
  tabbable = true,
}: {
  product: Product;
  sizes: string;
  priceTone?: "default" | "sale";
  tabbable?: boolean;
}) {
  return (
    <div className="group group/card relative">
      <Link
        href={`/products/${product.slug}`}
        tabIndex={tabbable ? undefined : -1}
        className="block text-center"
      >
        <ProductImage product={product} sizes={sizes} />
        <h3 className="mt-6 line-clamp-2 min-h-10 text-[14px] leading-5 text-[#46474a] transition group-hover/card:text-neutral-950 sm:text-[16px]">
          {product.name}
        </h3>
        <p
          className={`mt-4 text-[15px] font-semibold sm:text-[16px] ${
            priceTone === "sale" ? "text-[#e12800]" : "text-[#46474a]"
          }`}
        >
          {product.hasVariants && "From "}
          {formatPrice(product.price)}
        </p>
      </Link>
      <ProductActions product={product} tabbable={tabbable} />
    </div>
  );
}
