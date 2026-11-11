import type { Metadata } from "next";
import { CartPage } from "@/components/cart/cart-page";

export const metadata: Metadata = {
  title: "Your Cart | Deli Ecommerce",
};

export default function Page() {
  return (
    <main className="flex-1">
      <CartPage />
    </main>
  );
}
