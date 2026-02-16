"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProductById, getProductsByVendor } from "@/lib/products";
import { getVendorById } from "@/lib/vendors";
import { useCart } from "@/lib/cart";
import VariantSelector from "@/components/VariantSelector";
import WishlistToggle from "@/components/WishlistToggle";
import { useState } from "react";
import type { ProductVariant } from "@/lib/products";
import { Star, ShieldCheck, Lock, RotateCcw, Tag, Sparkles } from "lucide-react";

export default function ProductPage() {
    const params = useParams();
    const id = Number(params.id);
    const product = getProductById(id);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const { addItem } = useCart();

    if (!product) return <div style={{ textAlign: "center", padding: "6rem 2rem" }}><h2>Product Not Found</h2><Link href="/" className="btn" style={{ marginTop: "1rem" }}>Back to Shop</Link></div>;

    const vendor = getVendorById(product.vendorId);
    const relatedProducts = getProductsByVendor(product.vendorId).filter(p => p.id !== product.id).slice(0, 4);
    const activeVariant = selectedVariant || product.variants[0];

    const handleAddToCart = () => {
        if (!activeVariant) return;
        addItem({ productId: product.id, variantId: activeVariant.id, name: product.name, variant: activeVariant.name, price: activeVariant.price, quantity: 1, image: product.image, vendorId: product.vendorId, vendorName: product.vendorName });
    };

    return (
        <div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "2rem" }}>
                <Link href="/" style={{ color: "var(--text-muted)" }}>Home</Link>
                <span className="breadcrumb-separator">›</span>
                <Link href={`/category/${product.category.toLowerCase()}`} style={{ color: "var(--text-muted)" }}>{product.category}</Link>
                <span className="breadcrumb-separator">›</span>
                <span style={{ color: "var(--text-primary)" }}>{product.name}</span>
            </div>
            <div className="product-detail">
                <div className="product-gallery">
                    <div className="product-gallery-main"><img src={product.image} alt={product.name} /></div>
                </div>
                <div className="product-info">
                    <Link href={`/vendor/${vendor?.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                        <div className="vendor-logo" style={{ width: "28px", height: "28px" }}>
                            {vendor && <img src={vendor.logo} alt={vendor.name} />}
                        </div>
                        <span style={{ fontSize: "0.72rem", color: "var(--gold)", display: "flex", alignItems: "center", gap: "0.25rem" }}>{product.vendorName} · <Star size={12} fill="currentColor" /> {vendor?.rating}</span>
                    </Link>
                    <h1>{product.name}</h1>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                        <span style={{ fontSize: "1.5rem", fontWeight: 600 }}>${activeVariant.price.toFixed(2)}</span>
                        {activeVariant.compareAtPrice && <span style={{ color: "var(--text-muted)", textDecoration: "line-through" }}>${activeVariant.compareAtPrice.toFixed(2)}</span>}
                        <span className="product-rating" style={{ fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.25rem" }}><Star size={14} fill="currentColor" /> {product.rating} ({product.reviews} reviews)</span>
                    </div>
                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1.5rem" }}>{product.description}</p>
                    <VariantSelector options={product.variantOptions} variants={product.variants} onSelect={setSelectedVariant} />
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                        <button className="btn btn-lg" style={{ flex: 1 }} onClick={handleAddToCart}>Add to Cart — ${activeVariant.price.toFixed(2)}</button>
                        <WishlistToggle productId={product.id} />
                    </div>
                    <div className="ai-score-box" style={{ marginTop: "1.5rem" }}>
                        <strong style={{ color: "var(--gold)", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}><Sparkles size={14} /> AI Score: {(product.aiScore * 100).toFixed(0)}%</strong> — Highly recommended based on marketplace trends
                    </div>
                    <div className="product-trust-bar">
                        <div className="product-trust-item"><span><ShieldCheck size={16} /></span> Free Shipping</div>
                        <div className="product-trust-item"><span><Lock size={16} /></span> Secure Payment</div>
                        <div className="product-trust-item"><span><RotateCcw size={16} /></span> Easy Returns</div>
                    </div>
                    <div style={{ marginTop: "1.25rem", display: "flex", gap: "2rem" }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.25rem" }}><Tag size={12} /> SKU: {activeVariant.sku}</div>
                        <div style={{ fontSize: "0.72rem", color: activeVariant.stock > 10 ? "var(--emerald)" : "var(--ruby)" }}>{activeVariant.stock > 10 ? `${activeVariant.stock} in stock` : `Only ${activeVariant.stock} left`}</div>
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <section className="editorial-section">
                    <div className="section-header"><h2>More from {product.vendorName}</h2></div>
                    <div className="product-grid">
                        {relatedProducts.map(p => {
                            const price = Math.min(...p.variants.map(v => v.price));
                            return (
                                <article key={p.id} className="product-card">
                                    <Link href={`/product/${p.id}`}>
                                        <div className="product-card-img-wrap">
                                            <img src={p.image} alt={p.name} />
                                            <div className="product-card-overlay">
                                                <span className="btn btn-sm">Quick View</span>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="product-card-content">
                                        <span className="product-category">{p.category}</span>
                                        <h3><Link href={`/product/${p.id}`}>{p.name}</Link></h3>
                                        <p className="product-price">${price.toFixed(2)}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
