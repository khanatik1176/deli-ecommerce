import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { Product } from "@/data/products";

export function ProductImage({
  product,
  sizes,
  priority = false,
}: {
  product: Product;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div
      className="relative aspect-square w-full overflow-hidden"
      style={product.imageAspect ? { aspectRatio: product.imageAspect } : undefined}
    >
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-neutral-100 text-neutral-300">
          <ImageIcon className="size-12" strokeWidth={1.25} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
