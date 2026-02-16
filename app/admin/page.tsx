import Link from "next/link";
import { vendors } from "@/lib/vendors";
import { orders, getRecentOrders, getTotalRevenue, getTotalMarketplaceFees } from "@/lib/orders";
import { products } from "@/lib/products";
import { customers } from "@/lib/customers";
import { notifications, getUnreadCount } from "@/lib/notifications";
import { Activity, Star, ShieldCheck } from "lucide-react";

export default function AdminPage() {
    const recent = getRecentOrders(5);
    const revenue = getTotalRevenue();
    const fees = getTotalMarketplaceFees();
    const lowStock = products.flatMap(p => p.variants.filter(v => v.stock < 10).map(v => ({ product: p.name, variant: v.name, stock: v.stock, sku: v.sku }))).slice(0, 6);

    return (
        <div>
            <div className="section-header">
                <div>
                    <h2>Admin Dashboard</h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0, display: "flex", alignItems: "center", gap: "0.4rem" }}>Marketplace Operations · <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", color: "var(--emerald)" }}><Activity size={14} /> Real-time</span></p>
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                    <Link href="/analytics" className="btn btn-secondary btn-sm">Full Analytics</Link>
                    <Link href="/vendor/dashboard" className="btn btn-sm">Vendor Hub</Link>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="stat-card">
                    <div className="stat-live-dot" />
                    <div className="stat-label">Gross Revenue</div>
                    <div className="stat-value">${(revenue / 1000).toFixed(1)}k</div>
                    <div className="stat-change positive">+23.5% vs last month</div>
                </div>
                <div className="stat-card">
                    <div className="stat-live-dot" />
                    <div className="stat-label">Marketplace Fees</div>
                    <div className="stat-value">${fees.toFixed(0)}</div>
                    <div className="stat-change positive">+28.1%</div>
                </div>
                <div className="stat-card">
                    <div className="stat-live-dot" />
                    <div className="stat-label">Active Vendors</div>
                    <div className="stat-value">{vendors.length}</div>
                    <div className="stat-change positive">+50%</div>
                </div>
                <div className="stat-card">
                    <div className="stat-live-dot" />
                    <div className="stat-label">Total Orders</div>
                    <div className="stat-value">{orders.length}</div>
                    <div className="stat-change positive">+18.2%</div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "1.5rem" }}>
                <div className="panel">
                    <div className="panel-header"><h4 className="panel-title">Recent Orders</h4></div>
                    <table className="data-table">
                        <thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
                        <tbody>
                            {recent.map(o => (
                                <tr key={o.id}>
                                    <td style={{ fontWeight: 500 }}>{o.id}</td>
                                    <td>{o.customerName}</td>
                                    <td>${o.total.toFixed(2)}</td>
                                    <td><span className={`status-badge ${o.status === "delivered" ? "status-active" : o.status === "pending" ? "status-pending" : o.status === "cancelled" ? "status-inactive" : "status-active"}`}>{o.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className="panel">
                        <div className="panel-header"><h4 className="panel-title">Notifications ({getUnreadCount()})</h4></div>
                        {notifications.slice(0, 4).map(n => (
                            <div key={n.id} style={{ padding: "0.65rem 0", borderBottom: "1px solid var(--border)", opacity: n.read ? 0.6 : 1 }}>
                                <div style={{ fontSize: "0.78rem", fontWeight: 500 }}>{n.title}</div>
                                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{n.description}</div>
                                <div style={{ fontSize: "0.58rem", color: "var(--text-light)", marginTop: "0.15rem" }}>{n.time}</div>
                            </div>
                        ))}
                    </div>
                    <div className="panel">
                        <div className="panel-header"><h4 className="panel-title">Low Stock Alerts</h4></div>
                        {lowStock.map((s, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--border)", fontSize: "0.78rem" }}>
                                <div><div style={{ fontWeight: 500 }}>{s.product}</div><div style={{ color: "var(--text-muted)", fontSize: "0.68rem" }}>{s.variant}</div></div>
                                <span style={{ color: s.stock < 5 ? "var(--ruby)" : "var(--gold)", fontWeight: 600, fontSize: "0.82rem" }}>{s.stock}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="panel" style={{ marginTop: "1.5rem" }}>
                <div className="panel-header"><h4 className="panel-title">Vendor Performance</h4></div>
                <table className="data-table">
                    <thead><tr><th>Vendor</th><th>Products</th><th>Sales</th><th>Commission</th><th>Rating</th><th>Status</th></tr></thead>
                    <tbody>
                        {vendors.map(v => (
                            <tr key={v.id}>
                                <td><Link href={`/vendor/${v.slug}`} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontWeight: 500 }}><span className="vendor-logo" style={{ width: "30px", height: "30px" }}><img src={v.logo} alt={v.name} /></span>{v.name}</Link></td>
                                <td>{v.productCount}</td>
                                <td>${(v.totalSales / 1000).toFixed(1)}k</td>
                                <td>{v.commissionTier}%</td>
                                <td style={{ color: "var(--gold)", display: "flex", alignItems: "center", gap: "0.25rem" }}><Star size={14} fill="currentColor" /> {v.rating}</td>
                                <td><span className="status-badge status-active" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>{v.verified ? <><ShieldCheck size={12} /> Verified</> : "Pending"}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="panel" style={{ marginTop: "1.5rem" }}>
                <div className="panel-header"><h4 className="panel-title">Customer Segments</h4></div>
                <table className="data-table">
                    <thead><tr><th>Customer</th><th>Segment</th><th>LTV</th><th>Orders</th><th>Last Order</th></tr></thead>
                    <tbody>
                        {customers.map(c => (
                            <tr key={c.id}>
                                <td style={{ fontWeight: 500 }}>{c.name}</td>
                                <td><span className={`status-badge ${c.segment === "VIP" ? "status-active" : c.segment === "At Risk" ? "status-inactive" : "status-pending"}`}>{c.segment}</span></td>
                                <td>${c.ltv.toLocaleString()}</td>
                                <td>{c.orders}</td>
                                <td style={{ color: "var(--text-muted)" }}>{c.lastOrder.toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
