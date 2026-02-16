import { analyticsData } from "@/lib/analytics";
import { vendors } from "@/lib/vendors";

export default function AnalyticsPage() {
    const { monthlyRevenue, topCategories, vendorPerformance } = analyticsData;
    const maxRev = Math.max(...monthlyRevenue.map(m => m.revenue));

    return (
        <div>
            <div className="section-header"><h2>Marketplace Analytics</h2><p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>Real-time marketplace intelligence</p></div>

            <div className="dashboard-grid">
                <div className="stat-card"><div className="stat-label">GMV</div><div className="stat-value">${(analyticsData.gmv / 1000).toFixed(0)}k</div><div className="stat-change positive">+{analyticsData.gmvGrowth}%</div></div>
                <div className="stat-card"><div className="stat-label">Commission Earned</div><div className="stat-value">${(analyticsData.commissionEarned / 1000).toFixed(1)}k</div><div className="stat-change positive">+{analyticsData.commissionGrowth}%</div></div>
                <div className="stat-card"><div className="stat-label">Avg Order Value</div><div className="stat-value">${analyticsData.avgOrderValue}</div><div className="stat-change positive">+12.4%</div></div>
                <div className="stat-card"><div className="stat-label">Conversion Rate</div><div className="stat-value">{analyticsData.conversionRate}%</div><div className="stat-change positive">+0.6%</div></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
                <div className="panel">
                    <div className="panel-header"><h4 className="panel-title">Monthly Revenue Trend</h4></div>
                    <div className="bar-chart">
                        {monthlyRevenue.map(m => (
                            <div key={m.month} className="bar" style={{ height: `${(m.revenue / maxRev) * 100}%` }}>
                                <div className="bar-label">{m.month}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: "center", marginTop: "2.5rem", fontSize: "0.72rem", color: "var(--text-muted)" }}>Revenue by Month (2024)</div>
                </div>
                <div className="panel">
                    <div className="panel-header"><h4 className="panel-title">Revenue by Category</h4></div>
                    {topCategories.map(c => (
                        <div key={c.name} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.5rem 0", borderBottom: "1px solid var(--border)" }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: "0.82rem", fontWeight: 500, marginBottom: "0.3rem" }}>{c.name}</div>
                                <div style={{ height: "4px", background: "var(--bg-surface)", borderRadius: "2px", overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${c.percentage * 3.5}%`, background: "linear-gradient(90deg, var(--gold-dark), var(--gold))", borderRadius: "2px" }} />
                                </div>
                            </div>
                            <div style={{ fontSize: "0.78rem", fontWeight: 600, minWidth: "50px", textAlign: "right" }}>${(c.revenue / 1000).toFixed(1)}k</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="panel" style={{ marginTop: "1.5rem" }}>
                <div className="panel-header"><h4 className="panel-title">Vendor Revenue Comparison</h4></div>
                <table className="data-table">
                    <thead><tr><th>Vendor</th><th>Revenue</th><th>Orders</th><th>AOV</th><th>Rating</th></tr></thead>
                    <tbody>
                        {vendorPerformance.map(v => (
                            <tr key={v.name}>
                                <td style={{ fontWeight: 500 }}>{v.name}</td>
                                <td>${(v.revenue / 1000).toFixed(1)}k</td>
                                <td>{v.orders}</td>
                                <td>${(v.revenue / v.orders).toFixed(2)}</td>
                                <td style={{ color: "var(--gold)" }}>★ {v.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="panel" style={{ marginTop: "1.5rem" }}>
                <div className="panel-header"><h4 className="panel-title">Vendor Payout Overview</h4></div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
                    {vendors.map(v => (
                        <div key={v.id} style={{ padding: "1.25rem", background: "var(--bg-surface)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                                <span className="vendor-logo" style={{ width: "28px", height: "28px" }}>
                                    <img src={v.logo} alt={v.name} />
                                </span>
                                <span style={{ fontSize: "0.82rem", fontWeight: 500 }}>{v.name}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                                <span>Total Payouts</span>
                                <span style={{ color: "var(--gold)", fontWeight: 600 }}>${v.payoutHistory.reduce((s, p) => s + p.amount, 0).toLocaleString()}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
                                <span>Commission Rate</span>
                                <span style={{ fontWeight: 500 }}>{v.commissionTier}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
