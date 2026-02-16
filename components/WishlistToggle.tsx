"use client";
import { useWishlist } from "@/lib/wishlist";

export default function WishlistToggle({ productId }: { productId: number }) {
    const { toggle, has } = useWishlist();
    const active = has(productId);
    return (
        <button onClick={() => toggle(productId)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.6rem 0.8rem", cursor: "pointer", color: active ? "var(--ruby)" : "var(--text-muted)", transition: "all 0.2s", fontSize: "1rem" }} aria-label={active ? "Remove from wishlist" : "Add to wishlist"}>
            {active ? "♥" : "♡"}
        </button>
    );
}
