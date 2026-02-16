"use client";
import Link from "next/link";
import { useWishlist } from "@/lib/wishlist";
import { products } from "@/lib/products";

export default function WishlistPage() {
    const { items, toggle } = useWishlist();
    const wishlistProducts = products.filter(p => items.includes(p.id));

    return (
        <div>
            <div className="section-header"><h2>Wishlist</h2><p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>{items.length} saved items</p></div>
            {wishlistProducts.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                    <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Your wishlist is empty</p>
                    <Link href="/" className="btn">Explore Products</Link>
                </div>
            ) : (
                <div className="product-grid">
                    {wishlistProducts.map(p => {
                        const price = Math.min(...p.variants.map(v => v.price));
                        return (
                            <article key={p.id} className="product-card">
                                <Link href={`/product/${p.id}`}><div className="product-card-img-wrap"><img src={p.image} alt={p.name} /></div></Link>
                                <div className="product-card-content">
                                    <span className="product-category">{p.category}</span>
                                    <h3><Link href={`/product/${p.id}`}>{p.name}</Link></h3>
                                    <div className="product-meta-row">
                                        <p className="product-price">${price.toFixed(2)}</p>
                                        <button onClick={() => toggle(p.id)} style={{ background: "none", border: "none", color: "var(--ruby)", cursor: "pointer", fontSize: "1rem" }}>♥</button>
                                    </div>
                                    <div className="product-vendor"><span className="product-vendor-dot" />{p.vendorName}</div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
