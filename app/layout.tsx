import type { Metadata } from "next";
import Link from "next/link";
import { ClerkProvider, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";
import Cart from "@/components/Cart";
import MobileMenu from "@/components/MobileMenu";
import NotificationBell from "@/components/NotificationBell";
import SearchBar from "@/components/SearchBar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Newsletter from "@/components/NewsletterForm";
import FreeShippingToast from "@/components/FreeShippingToast";

export const metadata: Metadata = {
  title: "Nexus Market | Enterprise Marketplace Platform",
  description: "The premier multi-vendor marketplace. AI-powered recommendations, global vendors, enterprise-grade commerce.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <CartProvider>
            <WishlistProvider>
            <header className="site-header">
              <div className="header-inner">
                <MobileMenu />
                <nav className="nav-left">
                  <Link href="/">Shop</Link>
                  <Link href="/wishlist">Wishlist</Link>
                  <Link href="/search">Vendors</Link>
                </nav>
                <p className="site-title">
                  <Link href="/">Nexus Market</Link>
                </p>
                <nav className="nav">
                  <div className="nav-desktop-links">
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button className="btn btn-sm">Sign In</button>
                      </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <Link href="/account">Account</Link>
                      <Link href="/admin">Admin</Link>
                      <Link href="/analytics">Analytics</Link>
                      <Link href="/vendor/dashboard">Vendor Hub</Link>
                    </SignedIn>
                  </div>
                  <SearchBar />
                  <NotificationBell />
                  <LanguageSwitcher />
                  <Cart />
                </nav>
              </div>
            </header>
            <main className="main-content">{children}</main>
            <footer className="footer">
              <div className="footer-content">
                {/* Newsletter Section */}
                <div className="newsletter-section">
                  <div className="newsletter-text">
                    <h4>Stay in the Loop</h4>
                    <p>New vendors, curated drops, and AI-picked favorites — delivered weekly.</p>
                  </div>
                  <Newsletter />
                </div>

                <div className="footer-grid">
                  <div className="footer-col footer-brand">
                    <p className="brand-name">Nexus Market</p>
                    <p>The premier multi-vendor marketplace connecting artisans, designers, and established brands with discerning global shoppers. AI-powered discovery meets enterprise-grade commerce.</p>
                    <div className="footer-social">
                      <a href="https://instagram.com/khalil_0017" aria-label="Instagram" className="social-link" target="_blank" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg></a>
                      <a href="https://twitter.com/kamkmgamer" aria-label="Twitter" className="social-link" target="_blank" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 4s-1.1.5-2 .6A3.5 3.5 0 0021.4 3s-1.5.9-2.3 1.1A3.5 3.5 0 0012 7.5v1A8.4 8.4 0 013 4s-4 9 5 13a9.2 9.2 0 01-5.5 1.5c9 5 20 0 20-11.5 0-.3 0-.5 0-.8A5.7 5.7 0 0022 4z" /></svg></a>
                      <a href="https://facebook.com/kamkm2" aria-label="Facebook" className="social-link" target="_blank" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg></a>
                    </div>
                  </div>
                  <div className="footer-col">
                    <h5>Shop</h5>
                    <nav className="footer-links">
                      <Link href="/">All Products</Link>
                      <Link href="/category/tops">Tops</Link>
                      <Link href="/category/outerwear">Outerwear</Link>
                      <Link href="/category/accessories">Accessories</Link>
                      <Link href="/category/home">Home</Link>
                      <Link href="/category/jewelry">Jewelry</Link>
                    </nav>
                  </div>
                  <div className="footer-col">
                    <h5>Vendors</h5>
                    <nav className="footer-links">
                      <Link href="/vendor/heritage-denim">Heritage Denim Co.</Link>
                      <Link href="/vendor/woven-atelier">Woven Atelier</Link>
                      <Link href="/vendor/conscious-basics">Conscious Basics</Link>
                      <Link href="/vendor/morning-rituals">Morning Rituals</Link>
                      <Link href="/vendor/maison-terre">Maison Terre</Link>
                      <Link href="/vendor/aurum-collective">Aurum Collective</Link>
                    </nav>
                  </div>
                  <div className="footer-col">
                    <h5>Account</h5>
                    <nav className="footer-links">
                      <Link href="/account">My Account</Link>
                      <Link href="/wishlist">Wishlist</Link>
                      <Link href="/cart">Shopping Cart</Link>
                      <Link href="/checkout">Checkout</Link>
                    </nav>
                  </div>
                  <div className="footer-col">
                    <h5>Support</h5>
                    <nav className="footer-links">
                      <a href="mailto:khalil@khalil.mageed.net">khalil@khalil.mageed.net</a>
                      <a href="tel:+201500405567">+20 150 040 5567</a>
                      <span style={{ color: "var(--text-light)", fontSize: "0.82rem" }}>Mon – Fri, 9am – 6pm EST</span>
                    </nav>
                  </div>
                </div>
                <div className="footer-bottom">
                  <p>© 2026 Nexus Market. All rights reserved.</p>
                  <p><a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Shipping</a> · <a href="#">Returns</a> · <a href="#">Vendor Agreement</a></p>
                </div>
              </div>
            </footer>
            <FreeShippingToast />
            </WishlistProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
