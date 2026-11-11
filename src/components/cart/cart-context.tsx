"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

export const FREE_SHIPPING_FROM = 1500;
const MAX_QTY = 99;
const STORAGE_KEY = "deli-cart";
/** Order note typed on the cart page, read at checkout. */
export const CART_NOTE_KEY = "deli-cart-note";

type StoredLine = { slug: string; qty: number };
export type CartLine = { product: Product; qty: number };

type CartContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** False until the saved cart has been read from storage. */
  ready: boolean;
  lines: CartLine[];
  /** Total quantity across all lines. */
  count: number;
  subtotal: number;
  add: (product: Product, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  /** Empties the cart (e.g. after an order is placed). */
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const bySlug = new Map(products.map((p) => [p.slug, p]));

function load(): StoredLine[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(raw)) return [];
    return raw.filter(
      (l): l is StoredLine =>
        typeof l?.slug === "string" &&
        bySlug.has(l.slug) &&
        Number.isInteger(l.qty) &&
        l.qty > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [stored, setStored] = useState<StoredLine[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Read the saved cart after mount (localStorage isn't available during SSR).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from storage
    setStored(load());
    setLoaded(true);
    // Keep tabs in sync.
    const onStorage = (e: StorageEvent) =>
      e.key === STORAGE_KEY && setStored(load());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // Storage may be full or blocked; the cart still works for this visit.
    }
  }, [stored, loaded]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const add = useCallback((product: Product, qty = 1) => {
    setStored((lines) => {
      const existing = lines.find((l) => l.slug === product.slug);
      if (existing)
        return lines.map((l) =>
          l.slug === product.slug
            ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) }
            : l,
        );
      return [...lines, { slug: product.slug, qty: Math.min(MAX_QTY, qty) }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setStored((lines) =>
      qty < 1
        ? lines.filter((l) => l.slug !== slug)
        : lines.map((l) =>
            l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, qty) } : l,
          ),
    );
  }, []);

  const remove = useCallback(
    (slug: string) =>
      setStored((lines) => lines.filter((l) => l.slug !== slug)),
    [],
  );

  const clear = useCallback(() => setStored([]), []);

  const value = useMemo(() => {
    const lines = stored
      .map((l) => ({ product: bySlug.get(l.slug)!, qty: l.qty }))
      .filter((l) => l.product);
    return {
      isOpen,
      open,
      close,
      ready: loaded,
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      add,
      setQty,
      remove,
      clear,
    };
  }, [stored, loaded, isOpen, open, close, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
