"use client";
import { useState } from "react";
import Link from "next/link";
import { searchProducts } from "@/lib/products";

export default function SearchBar() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const results = query.length > 1 ? searchProducts(query).slice(0, 6) : [];

    return (
        <>
            <button onClick={() => setOpen(true)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "0.25rem", transition: "color 0.2s" }} aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            </button>
            {open && (
                <div className="search-overlay" onClick={() => setOpen(false)}>
                    <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                        <input type="text" placeholder="Search products, vendors, categories…" value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
                        {results.length > 0 && (
                            <div className="search-results">
                                {results.map(p => (
                                    <Link key={p.id} href={`/product/${p.id}`} className="search-result-item" onClick={() => setOpen(false)}>
                                        <img src={p.image} alt={p.name} className="search-result-img" />
                                        <div>
                                            <div style={{ fontSize: "0.88rem", fontWeight: 500 }}>{p.name}</div>
                                            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{p.category} · {p.vendorName}</div>
                                        </div>
                                        <div style={{ marginLeft: "auto", fontWeight: 600, fontSize: "0.85rem" }}>${Math.min(...p.variants.map(v => v.price)).toFixed(2)}</div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
