"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getVendorBySlug } from "@/lib/vendors";
import { getProductsByVendor } from "@/lib/products";

export default function VendorPage() {
    const params = useParams();
    const slug = params.slug as string;

    if (slug === "dashboard") {
        return <VendorDashboard />;
    }

    const vendor = getVendorBySlug(slug);
    if (!vendor) return <div style={{ textAlign: "center", padding: "6rem 2rem" }}><h2>Vendor Not Found</h2><Link href="/" className="btn" style={{ marginTop: "1rem" }}>Back to Shop</Link></div>;

    const vendorProducts = getProductsByVendor(vendor.id);

    return (
        <div>
            <div style={{ marginBottom: "3rem", padding: "3rem 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
                    <div className="vendor-logo" style={{ width: "72px", height: "72px" }}>
                        <img src={vendor.logo} alt={vendor.name} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>{vendor.name}</h1>
                        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                            <span style={{ color: "var(--gold)" }}>★ {vendor.rating}</span>
                            <span>{vendor.productCount} products</span>
                            <span className="status-badge status-active">Verified</span>
                            <span>Joined {vendor.joinedDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                        </div>
                    </div>
                </div>
                <p style={{ color: "var(--text-secondary)", maxWidth: "700px", lineHeight: 1.8, fontSize: "0.95rem" }}>{vendor.description}</p>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>{vendor.categories.map(c => <span key={c} className="category-btn active" style={{ cursor: "default" }}>{c}</span>)}</div>
            </div>
            <div className="vendor-stats" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "2rem", marginBottom: "2rem", justifyContent: "flex-start", gap: "3rem" }}>
                <div className="vendor-stat"><span className="vendor-stat-value">${(vendor.totalSales / 1000).toFixed(1)}k</span><span className="vendor-stat-label">Total Sales</span></div>
                <div className="vendor-stat"><span className="vendor-stat-value">{vendor.commissionTier}%</span><span className="vendor-stat-label">Commission</span></div>
                <div className="vendor-stat"><span className="vendor-stat-value">{vendorProducts.length}</span><span className="vendor-stat-label">Products</span></div>
            </div>
            <div className="section-header"><h2>Products</h2></div>
            <div className="product-grid">
                {vendorProducts.map(p => {
                    const price = Math.min(...p.variants.map(v => v.price));
                    return (
                        <article key={p.id} className="product-card">
                            <Link href={`/product/${p.id}`}><div className="product-card-img-wrap"><img src={p.image} alt={p.name} />{p.new && <span className="product-badge badge-new">New</span>}{p.bestselling && <span className="product-badge badge-best">Best Seller</span>}</div></Link>
                            <div className="product-card-content">
                                <span className="product-category">{p.category}</span>
                                <h3><Link href={`/product/${p.id}`}>{p.name}</Link></h3>
                                <div className="product-meta-row"><p className="product-price">${price.toFixed(2)}</p><div className="product-rating">★ {p.rating}</div></div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

function VendorDashboard() {
    const { vendors } = require("@/lib/vendors");
    const vendor = vendors[0];
    return (
        <div>
            <div className="section-header"><h2>Vendor Hub</h2><p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>Manage your storefront</p></div>
            <div className="dashboard-grid">
                <div className="stat-card"><div className="stat-label">Your Revenue</div><div className="stat-value">${(vendor.totalSales / 1000).toFixed(1)}k</div><div className="stat-change positive">+18% this month</div></div>
                <div className="stat-card"><div className="stat-label">Commission</div><div className="stat-value">{vendor.commissionTier}%</div><div className="stat-change" style={{ color: "var(--text-muted)" }}>Standard tier</div></div>
                <div className="stat-card"><div className="stat-label">Active Listings</div><div className="stat-value">{vendor.productCount}</div><div className="stat-change positive">All live</div></div>
                <div className="stat-card"><div className="stat-label">Rating</div><div className="stat-value" style={{ color: "var(--gold)" }}>★ {vendor.rating}</div><div className="stat-change positive">Top rated</div></div>
            </div>
            <div className="panel">
                <div className="panel-header"><h4 className="panel-title">Payout History</h4></div>
                <table className="data-table">
                    <thead><tr><th>Month</th><th>Amount</th></tr></thead>
                    <tbody>{vendor.payoutHistory.map((p: { month: string; amount: number }) => <tr key={p.month}><td>{p.month} 2024</td><td style={{ color: "var(--gold)", fontWeight: 600 }}>${p.amount.toLocaleString()}</td></tr>)}</tbody>
                </table>
            </div>
        </div>
    );
}
