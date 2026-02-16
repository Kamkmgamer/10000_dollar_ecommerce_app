"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CheckoutPage() {
    const { items, total } = useCart();
    const tax = total * 0.08;
    const shipping = total > 100 ? 0 : 9.99;
    const grandTotal = total + tax + shipping;

    return (
        <div>
            <div className="section-header"><h2>Checkout</h2></div>
            {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                    <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Your cart is empty</p>
                    <Link href="/" className="btn">Continue Shopping</Link>
                </div>
            ) : (
                <div className="checkout-grid">
                    <div>
                        <div className="panel">
                            <div className="panel-header"><h4 className="panel-title">Shipping Information</h4></div>
                            <div className="form-row"><div className="form-group"><label className="form-label">First Name</label><input className="form-input" /></div><div className="form-group"><label className="form-label">Last Name</label><input className="form-input" /></div></div>
                            <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" /></div>
                            <div className="form-group"><label className="form-label">Address</label><input className="form-input" /></div>
                            <div className="form-row"><div className="form-group"><label className="form-label">City</label><input className="form-input" /></div><div className="form-group"><label className="form-label">ZIP Code</label><input className="form-input" /></div></div>
                        </div>
                        <div className="panel">
                            <div className="panel-header"><h4 className="panel-title">Payment (Stripe Connect)</h4></div>
                            <div className="form-group"><label className="form-label">Card Number</label><input className="form-input" placeholder="4242 4242 4242 4242" /></div>
                            <div className="form-row"><div className="form-group"><label className="form-label">Expiry</label><input className="form-input" placeholder="MM/YY" /></div><div className="form-group"><label className="form-label">CVC</label><input className="form-input" placeholder="123" /></div></div>
                            <div style={{ padding: "0.85rem", background: "var(--gold-bg)", border: "1px solid var(--border-gold)", borderRadius: "var(--radius-sm)", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                                <strong style={{ color: "var(--gold)" }}>Stripe Connect</strong> — Payments are split automatically across vendors
                            </div>
                        </div>
                    </div>
                    <div className="order-summary-panel">
                        <h4 className="panel-title" style={{ marginBottom: "1.25rem" }}>Order Summary</h4>
                        {items.map(item => (
                            <div key={item.variantId} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid var(--border)", fontSize: "0.82rem" }}>
                                <div><div style={{ fontWeight: 500 }}>{item.name}</div><div style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>{item.variant} · Qty: {item.quantity}</div><div style={{ color: "var(--gold)", fontSize: "0.65rem" }}>◆ {item.vendorName}</div></div>
                                <div style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        ))}
                        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.82rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-muted)" }}>Subtotal</span><span>${total.toFixed(2)}</span></div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-muted)" }}>Tax</span><span>${tax.toFixed(2)}</span></div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-muted)" }}>Shipping</span><span>{shipping === 0 ? <span style={{ color: "var(--emerald)" }}>Free</span> : `$${shipping.toFixed(2)}`}</span></div>
                            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: "0.75rem", marginTop: "0.5rem", fontWeight: 600, fontSize: "1rem" }}><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
                        </div>
                        <button className="btn" style={{ width: "100%", marginTop: "1.25rem" }}>Place Order</button>
                    </div>
                </div>
            )}
        </div>
    );
}
