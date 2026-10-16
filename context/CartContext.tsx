"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_ZONE_DELIVERY_FEE } from "@/lib/site";

export type CartItem = {
  id: string;
  vendor: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
  category: string;
};

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "item-1",
    vendor: "Sultan's Dine — Gulshan 2",
    name: "Kacchi Platter (Basmati Special)",
    variant: "Served with Borhani & Jorda",
    price: 499,
    qty: 2,
    category: "Food",
  },
  {
    id: "item-2",
    vendor: "Kawran Bazar Fresh Fishery",
    name: "Padma River Ilish (1.2 kg Fresh Cut)",
    variant: "Curry Cut & Cleaned",
    price: 1450,
    qty: 1,
    category: "Bazaar",
  },
  {
    id: "item-3",
    vendor: "Mudir Dokan Express — Banani",
    name: "Chinigura Rice & Radhuni Mustard Oil",
    variant: "2kg Rice + 500ml Oil Combo",
    price: 360,
    qty: 1,
    category: "Grocery",
  },
];

type AddItemInput = {
  id?: string;
  vendor?: string;
  name: string;
  variant?: string;
  price?: number;
  category?: string;
  qty?: number;
};

interface CartContextType {
  items: CartItem[];
  addItem: (item: AddItemInput) => void;
  addToCart: (item: any) => void;
  updateQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  vat: number;
  deliveryFee: number;
  total: number;
  toastMessage: string | null;
  clearToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "elara_cart_items_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore storage errors in private browsing/sandboxes
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persist changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage quota or restriction fallback
    }
  }, [items, isLoaded]);

  const showToast = (message: string) => {
    setToastMessage(message);
    const timer = setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3000);
    return () => clearTimeout(timer);
  };

  const addItem = (itemInput: AddItemInput) => {
    const itemId = itemInput.id || `custom-${itemInput.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
    const qtyToAdd = itemInput.qty || 1;
    const price = itemInput.price ?? 250;
    const vendor = itemInput.vendor || "Elara Partner";
    const variant = itemInput.variant || "Standard Serving";
    const category = itemInput.category || "General";

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemId || i.name === itemInput.name);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + qtyToAdd,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: itemId,
            name: itemInput.name,
            vendor,
            variant,
            price,
            qty: qtyToAdd,
            category,
          },
        ];
      }
    });

    showToast(`Added ${itemInput.name} to Basket`);
  };

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const addToCart = (item: any) => {
    addItem({
      id: item.id,
      vendor: item.merchantName || item.vendor,
      name: item.name,
      variant: item.variant,
      price: item.priceBDT ?? item.price,
      category: item.category,
      qty: item.qty || 1,
    });
  };

  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = Math.round(subtotal * 0.05); // 5% NBR VAT
  const deliveryFee = items.length > 0 ? DEFAULT_ZONE_DELIVERY_FEE : 0;
  const total = subtotal + vat + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        totalCount,
        subtotal,
        vat,
        deliveryFee,
        total,
        toastMessage,
        clearToast: () => setToastMessage(null),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
