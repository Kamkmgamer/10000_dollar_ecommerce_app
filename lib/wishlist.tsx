"use client";
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface WishlistCtx {
    items: number[];
    toggle: (id: number) => void;
    has: (id: number) => boolean;
    count: number;
}

const WishlistContext = createContext<WishlistCtx | null>(null);
export function useWishlist() { const c = useContext(WishlistContext); if (!c) throw new Error("useWishlist outside WishlistProvider"); return c; }

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<number[]>([]);
    const toggle = useCallback((id: number) => setItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]), []);
    const has = useCallback((id: number) => items.includes(id), [items]);
    return <WishlistContext.Provider value={ { items, toggle, has, count: items.length } }> { children } </WishlistContext.Provider>;
}
