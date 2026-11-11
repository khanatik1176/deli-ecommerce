import type { Metadata } from "next";
import { Checkout } from "@/components/checkout/checkout";

export const metadata: Metadata = {
  title: "Checkout | Deli",
  robots: { index: false },
};

export default function CheckoutPage() {
  return <Checkout />;
}
