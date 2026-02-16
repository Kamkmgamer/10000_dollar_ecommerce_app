import Link from "next/link";
import { products, categories, getFeaturedProducts, getNewProducts, getBestsellingProducts, getAIRecommendations } from "@/lib/products";
import { vendors } from "@/lib/vendors";
import ProductGrid from "@/components/ProductGrid";
import { ShieldCheck, Zap, Sparkles, Globe, Lock, Star, TrendingUp } from "lucide-react";

export default function Home() {
  const featured = getFeaturedProducts();
  const aiPicks = getAIRecommendations(4);
  const allCategories = categories;

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="hero">
        {/* Floating orbs */}
        <div className="hero-orb hero-orb--gold" />
        <div className="hero-orb hero-orb--purple" />
        <div className="hero-orb hero-orb--emerald" />

        {/* Orbiting particles */}
        <div className="hero-orbit">
          <div className="hero-orbit-dot" />
          <div className="hero-orbit-dot" />
        </div>

        <div className="hero-eyebrow">Enterprise Marketplace</div>
        <h1>Where Artisans<br /><span className="hero-accent">Meet the World</span></h1>
        <p>AI-curated collections from verified global vendors. Enterprise-grade commerce with the soul of an artisan market.</p>
        <div className="hero-actions">
          <Link href="#products" className="btn">Explore Collection</Link>
          <Link href="/admin" className="btn btn-secondary">Marketplace Dashboard</Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="hero-stat-value">{vendors.length}</div><div className="hero-stat-label">Verified Vendors</div></div>
          <div className="hero-stat"><div className="hero-stat-value">{products.length}+</div><div className="hero-stat-label">Curated Products</div></div>
          <div className="hero-stat"><div className="hero-stat-value">4.8</div><div className="hero-stat-label">Average Rating</div></div>
          <div className="hero-stat"><div className="hero-stat-value">4</div><div className="hero-stat-label">Languages</div></div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-text">Scroll</span>
        </div>
      </section>

      {/* ─── TRUST BANNER ─── */}
      <div className="trust-banner">
        <div className="trust-item"><span><ShieldCheck size={20} strokeWidth={1.5} /></span>Verified Vendors</div>
        <div className="trust-item"><span><Zap size={20} strokeWidth={1.5} /></span>Edge-Fast Loading</div>
        <div className="trust-item"><span><Sparkles size={20} strokeWidth={1.5} /></span>AI Curated</div>
        <div className="trust-item"><span><Globe size={20} strokeWidth={1.5} /></span>Global Shipping</div>
        <div className="trust-item"><span><Lock size={20} strokeWidth={1.5} /></span>Stripe Connect</div>
      </div>

      {/* ─── VENDOR MARQUEE ─── */}
      <div className="vendor-marquee">
        <div className="vendor-marquee-track">
          {[...vendors, ...vendors].map((v, i) => (
            <Link href={`/vendor/${v.slug}`} key={`${v.id}-${i}`} className="vendor-marquee-item">
              <div className="vendor-avatar">
                <img src={v.logo} alt={v.name} />
              </div>
              {v.name} <span style={{ margin: "0 0.3rem" }}>·</span> <Star size={12} fill="currentColor" /> {v.rating}
            </Link>
          ))}
        </div>
      </div>

      {/* ─── AI RECOMMENDATIONS ─── */}
      <section className="ai-section">
        <div className="ai-section-header">
          <div className="ai-icon"><Sparkles size={18} /></div>
          <h3>AI-Powered Picks</h3>
          <span>Personalized</span>
        </div>
        <div className="product-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", position: "relative", zIndex: 1 }}>
          {aiPicks.map((product, i) => {
            const minPrice = Math.min(...product.variants.map(v => v.price));
            return (
              <article key={product.id} className="product-card animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <Link href={`/product/${product.id}`}>
                  <div className="product-card-img-wrap">
                    <img src={product.image} alt={product.name} />
                    <span className="product-badge" style={{ background: "var(--gold)", color: "#000" }}>AI Score: {(product.aiScore * 100).toFixed(0)}%</span>
                    <div className="product-card-overlay">
                      <span className="btn btn-sm">Quick View</span>
                    </div>
                  </div>
                </Link>
                <div className="product-card-content">
                  <span className="product-category">{product.category}</span>
                  <h3><Link href={`/product/${product.id}`}>{product.name}</Link></h3>
                  <div className="product-meta-row">
                    <p className="product-price">${minPrice.toFixed(2)}</p>
                    <div className="product-rating"><Star size={12} fill="currentColor" /> {product.rating}</div>
                  </div>
                  <div className="product-vendor"><span className="product-vendor-dot" />{product.vendorName}</div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ─── CATEGORY SHOWCASE ─── */}
      <section className="category-showcase">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>{allCategories.length} Collections</p>
        </div>
        <div className="category-grid">
          {allCategories.slice(0, 4).map((cat, i) => (
            <Link href={`/category/${cat.slug}`} key={cat.id} className="category-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="category-card-img"><img src={cat.image} alt={cat.name} /></div>
              <div className="category-card-content">
                <h3>{cat.name}</h3>
                <span>{cat.productCount} Products</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      {featured.length > 0 && (
        <section className="editorial-section">
          <div className="section-header">
            <div>
              <h2>Editor&apos;s Picks</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: 0, fontStyle: "italic" }}>Hand-selected by our curators and AI</p>
            </div>
            <Link href="/?featured=true" className="btn btn-secondary btn-sm">View All</Link>
          </div>
          <div className="product-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {featured.slice(0, 4).map((product, i) => {
              const minPrice = Math.min(...product.variants.map(v => v.price));
              const maxPrice = Math.max(...product.variants.map(v => v.price));
              return (
                <article key={product.id} className="product-card animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                  <Link href={`/product/${product.id}`}>
                    <div className="product-card-img-wrap">
                      <img src={product.image} alt={product.name} />
                      {product.new && <span className="product-badge badge-new">New</span>}
                      {product.bestselling && <span className="product-badge badge-best">Best Seller</span>}
                      <div className="product-card-overlay">
                        <span className="btn btn-sm">Quick View</span>
                      </div>
                    </div>
                  </Link>
                  <div className="product-card-content">
                    <span className="product-category">{product.category}</span>
                    <h3><Link href={`/product/${product.id}`}>{product.name}</Link></h3>
                    <div className="product-meta-row">
                      <p className="product-price">${minPrice.toFixed(2)}{maxPrice > minPrice && <span className="price-range"> — ${maxPrice.toFixed(2)}</span>}</p>
                      <div className="product-rating"><Star size={12} fill="currentColor" /> {product.rating}</div>
                    </div>
                    <div className="product-vendor"><span className="product-vendor-dot" />{product.vendorName}</div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── EDITORIAL BANNER ─── */}
      <section className="editorial-banner">
        <div className="editorial-banner-content">
          <span className="editorial-eyebrow">Our Philosophy</span>
          <h2>A Marketplace<br />Built on Trust</h2>
          <p>Every vendor is verified. Every product is curated. Our AI learns what you love, and our global network delivers it to your door — fast.</p>
        </div>
      </section>

      {/* ─── FULL COLLECTION ─── */}
      <section id="products" className="editorial-section">
        <ProductGrid products={products} categories={categories.map(c => c.name)} title="Full Marketplace" />
      </section>

      {/* ─── VENDOR SPOTLIGHT ─── */}
      <section className="editorial-section">
        <div className="section-header">
          <h2>Featured Vendors</h2>
          <Link href="/search" className="btn btn-secondary btn-sm">All Vendors</Link>
        </div>
        <div className="vendor-grid">
          {vendors.slice(0, 3).map(v => (
            <Link href={`/vendor/${v.slug}`} key={v.id} className="vendor-card">
              <div className="vendor-card-header">
                <div className="vendor-logo">
                  <img src={v.logo} alt={v.name} />
                </div>
                <div className="vendor-card-info">
                  <h3>{v.name}</h3>
                  <span><Star size={10} fill="currentColor" /> {v.rating} · {v.productCount} products</span>
                </div>
              </div>
              {v.verified && <span className="vendor-verified">Verified Vendor</span>}
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "0.5rem 0 0", lineHeight: 1.65 }}>{v.description.slice(0, 120)}…</p>
              <div className="vendor-stats">
                <div className="vendor-stat"><span className="vendor-stat-value">${(v.totalSales / 1000).toFixed(1)}k</span><span className="vendor-stat-label">Sales</span></div>
                <div className="vendor-stat"><span className="vendor-stat-value">{v.commissionTier}%</span><span className="vendor-stat-label">Commission</span></div>
                <div className="vendor-stat"><span className="vendor-stat-value">{v.categories.length}</span><span className="vendor-stat-label">Categories</span></div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
