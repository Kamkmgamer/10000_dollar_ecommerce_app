import Link from "next/link";
import { vendors } from "@/lib/vendors";

export default function SearchPage() {
    return (
        <div>
            <div className="section-header"><h2>Browse Vendors</h2><p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>{vendors.length} verified vendors</p></div>
            <div className="vendor-grid">
                {vendors.map(v => (
                    <Link href={`/vendor/${v.slug}`} key={v.id} className="vendor-card">
                        <div className="vendor-card-header">
                            <div className="vendor-logo">
                                <img src={v.logo} alt={v.name} />
                            </div>
                            <div className="vendor-card-info">
                                <h3>{v.name}</h3>
                                <span>★ {v.rating} · {v.productCount} products</span>
                            </div>
                        </div>
                        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "0 0 0.75rem", lineHeight: 1.65 }}>{v.description.slice(0, 130)}…</p>
                        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>{v.categories.map(c => <span key={c} style={{ padding: "0.2rem 0.55rem", fontSize: "0.62rem", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-full)", color: "var(--text-muted)" }}>{c}</span>)}</div>
                        <div className="vendor-stats">
                            <div className="vendor-stat"><span className="vendor-stat-value">${(v.totalSales / 1000).toFixed(1)}k</span><span className="vendor-stat-label">Sales</span></div>
                            <div className="vendor-stat"><span className="vendor-stat-value">{v.commissionTier}%</span><span className="vendor-stat-label">Commission</span></div>
                            <div className="vendor-stat"><span className="vendor-stat-value">{new Date().getFullYear() - v.joinedDate.getFullYear() || 1}yr</span><span className="vendor-stat-label">Member</span></div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
