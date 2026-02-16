"use client";
import { useState } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function MobileMenu() {
    const [open, setOpen] = useState(false);
    
    const authMenuItems = [
        { label: "Account", href: "/account" },
        { label: "Admin", href: "/admin" },
        { label: "Analytics", href: "/analytics" },
        { label: "Vendor Hub", href: "/vendor/dashboard" },
    ];

    return (
        <>
            <button className="mobile-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu" style={{ opacity: open ? 0 : 1, transition: "opacity 0.2s" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
            </button>
            {open && (
                <>
                    <div className="cart-overlay" onClick={() => setOpen(false)} />
                    <div className="mobile-menu-drawer">
                        <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "1.2rem", alignSelf: "flex-end" }}>✕</button>
                        <Link href="/" onClick={() => setOpen(false)}>Shop</Link>
                        <Link href="/wishlist" onClick={() => setOpen(false)}>Wishlist</Link>
                        <Link href="/search" onClick={() => setOpen(false)}>Vendors</Link>
                        
                        <div className="mobile-nav-footer" style={{ marginTop: "auto", paddingTop: "2rem", borderTop: "1px solid var(--border-color)" }}>
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="btn btn-sm" style={{ width: "100%" }}>Sign In</button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <div className="mobile-auth-section">
                                    {authMenuItems.map((item) => (
                                        <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="mobile-admin-link" style={{ display: "block", padding: "0.5rem 0" }}>
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </SignedIn>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
