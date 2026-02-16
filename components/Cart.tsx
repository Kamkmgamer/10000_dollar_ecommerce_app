"use client";
import { useCart } from "@/lib/cart";
import Link from "next/link";

export default function Cart() {
    const { items, removeItem, updateQuantity, total, count, isOpen, setIsOpen } = useCart();

    return (
        <>
            <button className="cart-icon" onClick={() => setIsOpen(true)} aria-label="Open cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" /></svg>
                {count > 0 && <span className="cart-count">{count}</span>}
            </button>
            {isOpen && (
                <>
                    <div className="cart-overlay" onClick={() => setIsOpen(false)} />
                    <div className="cart-sidebar">
                        <div className="cart-header">
                            <h3>Your Cart ({count})</h3>
                            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
                        </div>
                        <div className="cart-items">
                            {items.length === 0 && <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "3rem 0" }}>Your cart is empty</p>}
                            {items.map((item) => (
                                <div key={item.variantId} className="cart-item">
                                    <img src={item.image} alt={item.name} className="cart-item-img" />
                                    <div className="cart-item-info">
                                        <div className="cart-item-name">{item.name}</div>
                                        <div className="cart-item-variant">{item.variant}</div>
                                        <div className="cart-item-vendor">◆ {item.vendorName}</div>
                                        <div className="cart-item-price">${item.price.toFixed(2)}</div>
                                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "0.4rem" }}>
                                            <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>−</button>
                                            <span style={{ fontSize: "0.82rem", minWidth: "1.5rem", textAlign: "center" }}>{item.quantity}</span>
                                            <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                    <button className="cart-item-remove" onClick={() => removeItem(item.variantId)}>✕</button>
                                </div>
                            ))}
                        </div>
                        {items.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-total">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <Link href="/checkout" className="btn" style={{ width: "100%", textAlign: "center" }} onClick={() => setIsOpen(false)}>Checkout</Link>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}
