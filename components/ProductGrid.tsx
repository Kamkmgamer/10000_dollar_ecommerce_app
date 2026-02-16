"use client";
import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";

interface Props {
    products: Product[];
    categories: string[];
    title: string;
    showCategoryFilter?: boolean;
}

export default function ProductGrid({ products, categories, title, showCategoryFilter = true }: Props) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");
    const [searchQuery, setSearchQuery] = useState("");

    let filtered = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);
    if (searchQuery) { const q = searchQuery.toLowerCase(); filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t => t.includes(q))); }

    const sorted = [...filtered];
    if (sortBy === "price-asc") sorted.sort((a, b) => Math.min(...a.variants.map(v => v.price)) - Math.min(...b.variants.map(v => v.price)));
    if (sortBy === "price-desc") sorted.sort((a, b) => Math.min(...b.variants.map(v => v.price)) - Math.min(...a.variants.map(v => v.price)));
    if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sortBy === "ai-score") sorted.sort((a, b) => b.aiScore - a.aiScore);

    return (
        <>
            <div className="section-header">
                <div>
                    <h2>{title}</h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>{sorted.length} Products</p>
                </div>
            </div>
            <div className="filters-row">
                <input type="text" className="search-input" placeholder="Search products…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                {showCategoryFilter && (
                    <div className="category-filter">
                        <button className={`category-btn ${activeCategory === "All" ? "active" : ""}`} onClick={() => setActiveCategory("All")}>All</button>
                        {categories.map(c => (
                            <button key={c} className={`category-btn ${activeCategory === c ? "active" : ""}`} onClick={() => setActiveCategory(c)}>{c}</button>
                        ))}
                    </div>
                )}
                <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="default">Sort by</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="ai-score">AI Recommended</option>
                </select>
            </div>
            <div className="product-grid">
                {sorted.map((product, i) => {
                    const minPrice = Math.min(...product.variants.map(v => v.price));
                    const maxPrice = Math.max(...product.variants.map(v => v.price));
                    return (
                        <article key={product.id} className="product-card animate-fade-in-up" style={{ animationDelay: `${(i % 8) * 0.06}s` }}>
                            <Link href={`/product/${product.id}`}>
                                <div className="product-card-img-wrap">
                                    <img src={product.image} alt={product.name} />
                                    {product.new && <span className="product-badge badge-new">New</span>}
                                    {product.bestselling && <span className="product-badge badge-best">Best Seller</span>}
                                </div>
                            </Link>
                            <div className="product-card-content">
                                <span className="product-category">{product.category}</span>
                                <h3><Link href={`/product/${product.id}`}>{product.name}</Link></h3>
                                <div className="product-meta-row">
                                    <p className="product-price">${minPrice.toFixed(2)}{maxPrice > minPrice && <span className="price-range"> — ${maxPrice.toFixed(2)}</span>}</p>
                                    <div className="product-rating">★ {product.rating}</div>
                                </div>
                                <div className="product-vendor"><span className="product-vendor-dot" />{product.vendorName}</div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </>
    );
}
