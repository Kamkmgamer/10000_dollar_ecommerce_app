"use client";

import { useState } from "react";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import {
    Package,
    User,
    MapPin,
    CreditCard,
    Heart,
    Bell,
    Settings,
    LogOut,
    Plus,
    Trash2,
    Edit2,
} from "lucide-react";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    imageUrl: string;
}

interface Order {
    id: string;
    createdAt: Date;
    items: any[];
    total: number;
    status: string;
}

interface AccountContentProps {
    user: User;
    orders: Order[];
}

export default function AccountContent({ user, orders }: AccountContentProps) {
    const [activeTab, setActiveTab] = useState("Orders");

    const tabs = [
        { id: "Orders", icon: <Package size={18} />, label: "Orders" },
        { id: "Profile", icon: <User size={18} />, label: "Profile" },
        { id: "Addresses", icon: <MapPin size={18} />, label: "Addresses" },
        { id: "Payment", icon: <CreditCard size={18} />, label: "Payment" },
        { id: "Wishlist", icon: <Heart size={18} />, label: "Wishlist" },
        { id: "Notifications", icon: <Bell size={18} />, label: "Notifications" },
        { id: "Settings", icon: <Settings size={18} />, label: "Settings" },
    ];

    return (
        <div>
            <div className="section-header">
                <h2>My Account</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                    Manage your orders, profile, and preferences
                </p>
            </div>

            <div className="account-grid">
                {/* Sidebar Navigation */}
                <nav className="account-nav">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={activeTab === tab.id ? "active" : ""}
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.8rem",
                                padding: "0.8rem 1rem",
                                border: "none",
                                cursor: "pointer",
                                textAlign: "left",
                                fontSize: "0.9rem",
                                color: activeTab === tab.id ? "var(--gold)" : "var(--text-muted)",
                                borderRadius: "var(--radius-sm)",
                                transition: "all var(--transition-fast)",
                                borderLeft: activeTab === tab.id ? "2px solid var(--gold)" : "2px solid transparent",
                                background: activeTab === tab.id ? "var(--gold-bg)" : "transparent"
                            }}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}

                    <div style={{ height: "1px", background: "var(--border)", margin: "1rem 0" }} />

                    <SignOutButton>
                        <button
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.8rem",
                                padding: "0.8rem 1rem",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                textAlign: "left",
                                fontSize: "0.9rem",
                                color: "var(--ruby)",
                                borderRadius: "var(--radius-sm)",
                                transition: "all var(--transition-fast)"
                            }}
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </SignOutButton>
                </nav>

                {/* Main Content Area */}
                <div style={{ minHeight: "600px" }}>
                    {activeTab === "Orders" && (
                        <div className="panel animate-fade-in">
                            <div className="panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h4 className="panel-title">Order History</h4>
                                <button className="btn btn-sm btn-secondary">Download All Invoices</button>
                            </div>
                            <table className="data-table">
                                <thead><tr><th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
                                <tbody>
                                    {orders.map(o => (
                                        <tr key={o.id}>
                                            <td style={{ fontWeight: 500 }}>{o.id}</td>
                                            <td style={{ color: "var(--text-muted)" }}>{o.createdAt.toLocaleDateString()}</td>
                                            <td>{o.items.length} item{o.items.length > 1 ? "s" : ""}</td>
                                            <td style={{ fontWeight: 600 }}>${o.total.toFixed(2)}</td>
                                            <td>
                                                <span className={`status-badge ${o.status === "delivered" ? "status-active" : o.status === "pending" ? "status-pending" : "status-active"}`}>
                                                    {o.status}
                                                </span>
                                            </td>
                                            <td>
                                                <Link href={`/order/${o.id}`} style={{ fontSize: "0.8rem", textDecoration: "underline", color: "var(--gold)" }}>View</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "Profile" && (
                        <div className="panel animate-fade-in">
                            <div className="panel-header">
                                <h4 className="panel-title">Personal Information</h4>
                                {user.imageUrl && (
                                    <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <img 
                                            src={user.imageUrl} 
                                            alt={user.fullName}
                                            style={{ 
                                                width: "80px", 
                                                height: "80px", 
                                                borderRadius: "50%", 
                                                objectFit: "cover",
                                                border: "2px solid var(--gold)"
                                            }} 
                                        />
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>{user.fullName}</div>
                                            <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{user.email}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
                                <div className="form-group">
                                    <label className="form-label">First Name</label>
                                    <input className="form-input" value={user.firstName || ""} disabled style={{ background: "var(--bg-secondary)", cursor: "not-allowed" }} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Last Name</label>
                                    <input className="form-input" value={user.lastName || ""} disabled style={{ background: "var(--bg-secondary)", cursor: "not-allowed" }} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <input className="form-input" value={user.email || ""} disabled style={{ background: "var(--bg-secondary)", cursor: "not-allowed" }} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input className="form-input" value={user.phoneNumber || ""} disabled style={{ background: "var(--bg-secondary)", cursor: "not-allowed" }} />
                                </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: "2rem" }}>
                                <label className="form-label">Bio (Optional)</label>
                                <textarea className="form-input" rows={4} placeholder="Tell us about yourself..." />
                            </div>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                                Profile information is managed through your Clerk account. To update your details, please use the UserButton in the header.
                            </p>
                            <button className="btn" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>Save Changes</button>
                        </div>
                    )}

                    {activeTab === "Addresses" && (
                        <div className="panel animate-fade-in">
                            <div className="panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h4 className="panel-title">Saved Addresses</h4>
                                <button className="btn btn-sm"><Plus size={14} /> Add New</button>
                            </div>
                            <div style={{ display: "grid", gap: "1rem" }}>
                                <div style={{ border: "1px solid var(--gold)", background: "var(--gold-bg)", padding: "1.5rem", borderRadius: "var(--radius-md)", position: "relative" }}>
                                    <div style={{ position: "absolute", top: "1rem", right: "1rem", display: "flex", gap: "0.5rem" }}>
                                        <button className="btn-icon-sm" style={{ background: "transparent", border: "none", color: "var(--gold)", cursor: "pointer" }}><Edit2 size={14} /></button>
                                    </div>
                                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--gold)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Default</div>
                                    <div style={{ fontWeight: 600, marginBottom: "0.2rem" }}>{user.fullName}</div>
                                    <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                                        123 Luxury Lane, Apt 4B<br />
                                        Beverly Hills, CA 90210<br />
                                        United States
                                    </div>
                                </div>
                                <div style={{ border: "1px solid var(--border)", padding: "1.5rem", borderRadius: "var(--radius-md)", position: "relative" }}>
                                    <div style={{ position: "absolute", top: "1rem", right: "1rem", display: "flex", gap: "0.5rem" }}>
                                        <button className="btn-icon-sm" style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><Edit2 size={14} /></button>
                                        <button className="btn-icon-sm" style={{ background: "transparent", border: "none", color: "var(--ruby)", cursor: "pointer" }}><Trash2 size={14} /></button>
                                    </div>
                                    <div style={{ fontWeight: 600, marginBottom: "0.2rem" }}>Office</div>
                                    <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                                        456 Business Blvd, Suite 200<br />
                                        Los Angeles, CA 90012<br />
                                        United States
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "Payment" && (
                        <div className="panel animate-fade-in">
                            <div className="panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h4 className="panel-title">Payment Methods</h4>
                                <button className="btn btn-sm"><Plus size={14} /> Add New</button>
                            </div>
                            <div style={{ display: "grid", gap: "1rem" }}>
                                <div style={{
                                    border: "1px solid var(--border)",
                                    padding: "1.5rem",
                                    borderRadius: "var(--radius-md)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1.5rem",
                                    background: "linear-gradient(135deg, #1a1a20 0%, #0e0e12 100%)"
                                }}>
                                    <div style={{ width: "50px", height: "32px", background: "#fff", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontStyle: "italic", fontWeight: 900, fontSize: "1rem", color: "#1a1a7f" }}>
                                        VISA
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                            <span style={{ fontWeight: 500 }}>•••• •••• •••• 4242</span>
                                            <span className="status-badge status-active">Default</span>
                                        </div>
                                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Expires 12/28</div>
                                    </div>
                                    <button style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><Trash2 size={16} /></button>
                                </div>
                                <div style={{
                                    border: "1px solid var(--border)",
                                    padding: "1.5rem",
                                    borderRadius: "var(--radius-md)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1.5rem"
                                }}>
                                    <div style={{ width: "50px", height: "32px", background: "#333", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", color: "#fff" }}>
                                        Master
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                            <span style={{ fontWeight: 500 }}>•••• •••• •••• 8888</span>
                                        </div>
                                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Expires 09/26</div>
                                    </div>
                                    <button style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><Trash2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "Wishlist" && (
                        <div className="panel animate-fade-in">
                            <div className="panel-header"><h4 className="panel-title">My Wishlist</h4></div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="product-card" style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}>
                                        <div style={{ height: "200px", background: "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                                            Product Image
                                        </div>
                                        <div style={{ padding: "1rem" }}>
                                            <div style={{ fontSize: "0.9rem", fontWeight: 500, marginBottom: "0.5rem" }}>Luxury Item {i}</div>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <span style={{ color: "var(--gold)" }}>$1,200.00</span>
                                                <button className="btn btn-sm btn-outline-gold">Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "Notifications" && (
                        <div className="panel animate-fade-in">
                            <div className="panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h4 className="panel-title">Notifications</h4>
                                <button className="btn-sm" style={{ background: "transparent", border: "none", color: "var(--gold)", cursor: "pointer", textDecoration: "underline" }}>Mark all as read</button>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {[
                                    { title: "Order Shipped", desc: "Your order #10234 has been shipped and is on its way.", time: "2 hours ago", unread: true },
                                    { title: "Price Drop Alert", desc: "An item in your wishlist is now on sale!", time: "1 day ago", unread: true },
                                    { title: "New Login", desc: `New login detected from ${user.email}.`, time: "3 days ago", unread: false },
                                    { title: "Review Request", desc: "How did you like your purchase of 'Gold Signet Ring'?", time: "1 week ago", unread: false }
                                ].map((n, i) => (
                                    <div key={i} style={{
                                        padding: "1.2rem",
                                        borderBottom: i < 3 ? "1px solid var(--border)" : "none",
                                        background: n.unread ? "rgba(212, 168, 83, 0.03)" : "transparent",
                                        display: "flex",
                                        gap: "1rem"
                                    }}>
                                        <div style={{
                                            width: "8px",
                                            height: "8px",
                                            borderRadius: "50%",
                                            background: n.unread ? "var(--gold)" : "transparent",
                                            marginTop: "0.4rem"
                                        }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 500, marginBottom: "0.2rem", color: n.unread ? "var(--text-primary)" : "var(--text-secondary)" }}>{n.title}</div>
                                            <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.4rem" }}>{n.desc}</div>
                                            <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>{n.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "Settings" && (
                        <div className="panel animate-fade-in">
                            <div className="panel-header"><h4 className="panel-title">Account Settings</h4></div>

                            <div style={{ marginBottom: "2.5rem" }}>
                                <h5 style={{ fontSize: "0.95rem", marginBottom: "1rem", color: "var(--text-primary)" }}>Email Preferences</h5>
                                <div style={{ display: "grid", gap: "1rem" }}>
                                    {["Order updates and tracking", "New arrivals and collections", "Exclusive offers and promotions", "Account activity alerts"].map((label, i) => (
                                        <label key={i} style={{ display: "flex", alignItems: "center", gap: "0.8rem", cursor: "pointer" }}>
                                            <input type="checkbox" defaultChecked={i !== 2} style={{ accentColor: "var(--gold)" }} />
                                            <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: "2.5rem" }}>
                                <h5 style={{ fontSize: "0.95rem", marginBottom: "1rem", color: "var(--text-primary)" }}>Security</h5>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", marginBottom: "1rem" }}>
                                    <div>
                                        <div style={{ fontWeight: 500, fontSize: "0.9rem" }}>Password</div>
                                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Managed through Clerk</div>
                                    </div>
                                    <button className="btn btn-sm btn-secondary" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>Update</button>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
                                    <div>
                                        <div style={{ fontWeight: 500, fontSize: "0.9rem" }}>Two-Factor Authentication</div>
                                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Add an extra layer of security</div>
                                    </div>
                                    <button className="btn btn-sm btn-outline-gold">Enable</button>
                                </div>
                            </div>

                            <div>
                                <h5 style={{ fontSize: "0.95rem", marginBottom: "1rem", color: "var(--ruby)" }}>Danger Zone</h5>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                                    Account deletion is managed through your Clerk account settings.
                                </p>
                                <button className="btn btn-sm" style={{ background: "rgba(192, 57, 43, 0.1)", color: "var(--ruby)", border: "1px solid rgba(192, 57, 43, 0.2)", opacity: 0.5, cursor: "not-allowed" }} disabled>Delete Account</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
