import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/cart/cart-context";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Deli",
  description: "Deli ecommerce storefront",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
