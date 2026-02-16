
import { getProductsByCategory, categories } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return categories.map((category) => ({
        slug: category.slug, // Use existing slugs from category data
    }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Find category (case-insensitive search by slug or name for robustness)
    const category = categories.find(
        (c) => c.slug.toLowerCase() === slug.toLowerCase() ||
            c.name.toLowerCase() === slug.toLowerCase()
    );

    if (!category) {
        notFound();
    }

    const products = getProductsByCategory(category.name);

    return (
        <div className="container" style={{ padding: "2rem var(--container-padding)" }}>
            <div style={{ marginBottom: "3rem", textAlign: "center" }}>
                <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{category.name}</h1>
                <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
                    {category.description}
                </p>
            </div>

            <ProductGrid
                products={products}
                categories={[]} // Empty because we are hiding the filter
                title={`${category.name} Collection`}
                showCategoryFilter={false}
            />
        </div>
    );
}
