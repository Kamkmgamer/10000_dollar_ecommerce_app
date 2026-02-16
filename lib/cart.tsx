"use client";
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface CartItem {
    productId: number;
    variantId: string;
    name: string;
    variant: string;
    price: number;
    quantity: number;
    image: string;
    vendorId: string;
    vendorName: string;
}

interface CartCtx {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (variantId: string) => void;
    updateQuantity: (variantId: string, qty: number) => void;
    clearCart: () => void;
    total: number;
    count: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartCtx | null>(null);
export function useCart() { const c = useContext(CartContext); if (!c) throw new Error("useCart outside CartProvider"); return c; }

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const addItem = useCallback((item: CartItem) => {
        setItems(prev => {
            const existing = prev.find(i => i.variantId === item.variantId);
            if (existing) return prev.map(i => i.variantId === item.variantId ? { ...i, quantity: i.quantity + item.quantity } : i);
            return [...prev, item];
        });
        setIsOpen(true);
    }, []);

    const removeItem = useCallback((variantId: string) => {
        setItems(prev => prev.filter(i => i.variantId !== variantId));
    }, []);

    const updateQuantity = useCallback((variantId: string, qty: number) => {
        if (qty <= 0) { removeItem(variantId); return; }
        setItems(prev => prev.map(i => i.variantId === variantId ? { ...i, quantity: qty } : i));
    }, [removeItem]);

    const clearCart = useCallback(() => setItems([]), []);
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const count = items.reduce((s, i) => s + i.quantity, 0);

    return <CartContext.Provider value={ { items, addItem, removeItem, updateQuantity, clearCart, total, count, isOpen, setIsOpen } }> { children } </CartContext.Provider>;
}
