export interface ProductVariant {
    id: string;
    name: string;
    sku: string;
    price: number;
    compareAtPrice?: number;
    stock: number;
    attributes: Record<string, string>;
}

export interface VariantOption {
    name: string;
    values: string[];
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    image: string;
    images: string[];
    category: string;
    subcategory?: string;
    brand?: string;
    tags: string[];
    rating: number;
    reviews: number;
    variants: ProductVariant[];
    variantOptions: VariantOption[];
    featured: boolean;
    new: boolean;
    bestselling: boolean;
    vendorId: string;
    vendorName: string;
    commission: number;
    aiScore: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    productCount: number;
}

export const categories: Category[] = [
    { id: "tops", name: "Tops", slug: "tops", description: "Premium tops and shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", productCount: 4 },
    { id: "outerwear", name: "Outerwear", slug: "outerwear", description: "Jackets and coats for every season", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop", productCount: 3 },
    { id: "bottoms", name: "Bottoms", slug: "bottoms", description: "Trousers, jeans, and shorts", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop", productCount: 2 },
    { id: "accessories", name: "Accessories", slug: "accessories", description: "Bags, belts, and more", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop", productCount: 6 },
    { id: "footwear", name: "Footwear", slug: "footwear", description: "Shoes and boots", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=300&fit=crop", productCount: 3 },
    { id: "home", name: "Home", slug: "home", description: "Home decor and essentials", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop", productCount: 8 },
    { id: "body-care", name: "Body Care", slug: "body-care", description: "Natural skincare and body products", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop", productCount: 3 },
    { id: "jewelry", name: "Jewelry", slug: "jewelry", description: "Handcrafted fine jewelry", image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400&h=300&fit=crop", productCount: 2 },
];

function genVariants(base: number, sizes: string[], colors: string[]): ProductVariant[] {
    const v: ProductVariant[] = [];
    let c = 1000;
    for (const s of sizes) for (const cl of colors) {
        const p = Math.round((base + (Math.random() * 20 - 10)) * 100) / 100;
        v.push({ id: `v-${c}`, name: `${s} / ${cl}`, sku: `NX-${c++}`, price: p, compareAtPrice: Math.random() > 0.7 ? Math.round((base + 25) * 100) / 100 : undefined, stock: Math.floor(Math.random() * 50) + 5, attributes: { size: s, color: cl } });
    }
    return v;
}

export const products: Product[] = [
    {
        id: 1, name: "Vintage Denim Jacket", slug: "vintage-denim-jacket",
        description: "Classic vintage denim jacket with a modern fit. Features distressed details and comfortable stretch denim.",
        shortDescription: "Classic vintage denim with modern fit",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop", "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=750&fit=crop"],
        category: "Outerwear", brand: "Heritage Denim Co.", tags: ["vintage", "denim", "casual"],
        rating: 4.8, reviews: 124,
        variants: genVariants(89.99, ["XS", "S", "M", "L", "XL"], ["Vintage Wash", "Dark Indigo", "Light Stone"]),
        variantOptions: [{ name: "Size", values: ["XS", "S", "M", "L", "XL"] }, { name: "Color", values: ["Vintage Wash", "Dark Indigo", "Light Stone"] }],
        featured: true, new: false, bestselling: true,
        vendorId: "v1", vendorName: "Heritage Denim Co.", commission: 12, aiScore: 0.94,
        createdAt: new Date("2024-01-15"), updatedAt: new Date("2024-06-20"),
    },
    {
        id: 2, name: "Handwoven Market Tote", slug: "handwoven-market-tote",
        description: "Artisan-crafted market tote made from natural seagrass with cotton lining.",
        shortDescription: "Artisan seagrass tote with cotton lining",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=750&fit=crop"],
        category: "Accessories", brand: "Woven Studio", tags: ["handmade", "sustainable", "artisan"],
        rating: 4.9, reviews: 89,
        variants: [{ id: "v-2001", name: "Natural", sku: "NX-2001", price: 48, stock: 23, attributes: { color: "Natural" } }, { id: "v-2002", name: "Whitewash", sku: "NX-2002", price: 52, stock: 15, attributes: { color: "Whitewash" } }],
        variantOptions: [{ name: "Color", values: ["Natural", "Whitewash"] }],
        featured: true, new: false, bestselling: false,
        vendorId: "v2", vendorName: "Woven Atelier", commission: 15, aiScore: 0.88,
        createdAt: new Date("2024-02-01"), updatedAt: new Date("2024-05-15"),
    },
    {
        id: 3, name: "Organic Cotton T-Shirt", slug: "organic-cotton-t-shirt",
        description: "Premium organic cotton t-shirt with a relaxed fit. Pre-washed for extra softness.",
        shortDescription: "Premium organic cotton, relaxed fit",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop"],
        category: "Tops", brand: "Conscious Basics", tags: ["organic", "cotton", "basics"],
        rating: 4.7, reviews: 256,
        variants: genVariants(34.99, ["XS", "S", "M", "L", "XL"], ["Off-White", "Clay", "Sage", "Charcoal"]),
        variantOptions: [{ name: "Size", values: ["XS", "S", "M", "L", "XL"] }, { name: "Color", values: ["Off-White", "Clay", "Sage", "Charcoal"] }],
        featured: false, new: false, bestselling: true,
        vendorId: "v3", vendorName: "Conscious Basics", commission: 10, aiScore: 0.91,
        createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01"),
    },
    {
        id: 4, name: "Ceramic Pour-Over Set", slug: "ceramic-pour-over-set",
        description: "Handmade ceramic pour-over coffee set with matching carafe and reusable steel filter.",
        shortDescription: "Handmade ceramic coffee brewing set",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=750&fit=crop"],
        category: "Home", brand: "Morning Rituals", tags: ["ceramic", "coffee", "handmade"],
        rating: 4.9, reviews: 67,
        variants: [{ id: "v-4001", name: "Cream", sku: "NX-4001", price: 65, stock: 18, attributes: { color: "Cream" } }, { id: "v-4002", name: "Speckled Grey", sku: "NX-4002", price: 68, stock: 12, attributes: { color: "Speckled Grey" } }, { id: "v-4003", name: "Matte Black", sku: "NX-4003", price: 70, stock: 8, attributes: { color: "Matte Black" } }],
        variantOptions: [{ name: "Color", values: ["Cream", "Speckled Grey", "Matte Black"] }],
        featured: true, new: true, bestselling: false,
        vendorId: "v4", vendorName: "Morning Rituals", commission: 12, aiScore: 0.96,
        createdAt: new Date("2024-03-01"), updatedAt: new Date("2024-06-15"),
    },
    {
        id: 5, name: "Linen Blend Trousers", slug: "linen-blend-trousers",
        description: "Breathable linen-cotton blend trousers with relaxed fit and drawstring waist.",
        shortDescription: "Breathable linen-cotton blend",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop"],
        category: "Bottoms", brand: "Summer House", tags: ["linen", "summer", "relaxed"],
        rating: 4.6, reviews: 98,
        variants: genVariants(78, ["28", "30", "32", "34", "36"], ["Natural", "Sand", "Navy"]),
        variantOptions: [{ name: "Size", values: ["28", "30", "32", "34", "36"] }, { name: "Color", values: ["Natural", "Sand", "Navy"] }],
        featured: false, new: false, bestselling: false,
        vendorId: "v2", vendorName: "Woven Atelier", commission: 15, aiScore: 0.79,
        createdAt: new Date("2024-02-15"), updatedAt: new Date("2024-05-20"),
    },
    {
        id: 6, name: "Beeswax Candle Set", slug: "beeswax-candle-set",
        description: "Set of 3 hand-poured beeswax candles in glass vessels. Natural honey scent, 40hr burn.",
        shortDescription: "Set of 3 natural beeswax candles",
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=750&fit=crop"],
        category: "Home", brand: "Hive & Harvest", tags: ["beeswax", "natural", "gift"],
        rating: 4.8, reviews: 143,
        variants: [{ id: "v-6001", name: "Classic Set", sku: "NX-6001", price: 42, stock: 67, attributes: { set: "Classic" } }, { id: "v-6002", name: "Gift Box", sku: "NX-6002", price: 55, stock: 34, attributes: { set: "Gift Box" } }],
        variantOptions: [{ name: "Set", values: ["Classic Set", "Gift Box"] }],
        featured: false, new: false, bestselling: true,
        vendorId: "v4", vendorName: "Morning Rituals", commission: 12, aiScore: 0.87,
        createdAt: new Date("2024-01-20"), updatedAt: new Date("2024-04-10"),
    },
    {
        id: 7, name: "Leather Crossbody Bag", slug: "leather-crossbody-bag",
        description: "Full-grain leather crossbody bag with adjustable strap and brass hardware.",
        shortDescription: "Full-grain leather, brass hardware",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop"],
        category: "Accessories", brand: "Saddle & Stitch", tags: ["leather", "handcrafted", "classic"],
        rating: 4.9, reviews: 201,
        variants: [{ id: "v-7001", name: "Cognac", sku: "NX-7001", price: 145, stock: 12, attributes: { color: "Cognac" } }, { id: "v-7002", name: "Black", sku: "NX-7002", price: 145, stock: 18, attributes: { color: "Black" } }, { id: "v-7003", name: "Tan", sku: "NX-7003", price: 149, stock: 8, attributes: { color: "Tan" } }],
        variantOptions: [{ name: "Color", values: ["Cognac", "Black", "Tan"] }],
        featured: true, new: false, bestselling: true,
        vendorId: "v1", vendorName: "Heritage Denim Co.", commission: 12, aiScore: 0.95,
        createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01"),
    },
    {
        id: 8, name: "Wool Blend Cardigan", slug: "wool-blend-cardigan",
        description: "Cozy wool-cotton blend cardigan with mother-of-pearl buttons and hand-knit cuff details.",
        shortDescription: "Wool-cotton blend, mother-of-pearl buttons",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=750&fit=crop"],
        category: "Outerwear", brand: "Knit Studio", tags: ["wool", "cozy", "handcrafted"],
        rating: 4.7, reviews: 78,
        variants: genVariants(125, ["XS", "S", "M", "L", "XL"], ["Oatmeal", "Heather Grey", "Forest"]),
        variantOptions: [{ name: "Size", values: ["XS", "S", "M", "L", "XL"] }, { name: "Color", values: ["Oatmeal", "Heather Grey", "Forest"] }],
        featured: false, new: true, bestselling: false,
        vendorId: "v3", vendorName: "Conscious Basics", commission: 10, aiScore: 0.82,
        createdAt: new Date("2024-04-01"), updatedAt: new Date("2024-06-20"),
    },
    {
        id: 9, name: "Stone Washed Bedding Set", slug: "stone-washed-bedding-set",
        description: "100% linen bedding set. Includes duvet cover and two pillowcases.",
        shortDescription: "100% linen, queen size set",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=750&fit=crop"],
        category: "Home", brand: "Rest & Renew", tags: ["linen", "bedding", "luxury"],
        rating: 4.9, reviews: 45,
        variants: [{ id: "v-9001", name: "Queen / Natural", sku: "NX-9001", price: 220, stock: 8, attributes: { size: "Queen", color: "Natural" } }, { id: "v-9002", name: "Queen / White", sku: "NX-9002", price: 220, stock: 5, attributes: { size: "Queen", color: "White" } }, { id: "v-9003", name: "King / Natural", sku: "NX-9003", price: 280, stock: 4, attributes: { size: "King", color: "Natural" } }],
        variantOptions: [{ name: "Size", values: ["Queen", "King"] }, { name: "Color", values: ["Natural", "White"] }],
        featured: false, new: false, bestselling: false,
        vendorId: "v5", vendorName: "Maison Terre", commission: 14, aiScore: 0.76,
        createdAt: new Date("2024-02-01"), updatedAt: new Date("2024-05-01"),
    },
    {
        id: 10, name: "Silk Blend Scarf", slug: "silk-blend-scarf",
        description: "Luxurious silk-modal blend scarf with hand-rolled edges and botanical print.",
        shortDescription: "Silk-modal blend, botanical print",
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=750&fit=crop"],
        category: "Accessories", brand: "Silk Road", tags: ["silk", "botanical", "elegant"],
        rating: 4.8, reviews: 112,
        variants: [{ id: "v-10001", name: "Rose Garden", sku: "NX-10001", price: 68, stock: 41, attributes: { pattern: "Rose Garden" } }, { id: "v-10002", name: "Midnight Fern", sku: "NX-10002", price: 68, stock: 23, attributes: { pattern: "Midnight Fern" } }],
        variantOptions: [{ name: "Pattern", values: ["Rose Garden", "Midnight Fern"] }],
        featured: false, new: false, bestselling: false,
        vendorId: "v2", vendorName: "Woven Atelier", commission: 15, aiScore: 0.83,
        createdAt: new Date("2024-03-15"), updatedAt: new Date("2024-05-15"),
    },
    {
        id: 11, name: "Bamboo Kitchen Set", slug: "bamboo-kitchen-set",
        description: "Complete bamboo kitchen utensil set. Naturally antibacterial and eco-friendly.",
        shortDescription: "Complete bamboo utensil collection",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=750&fit=crop"],
        category: "Home", brand: "Green Kitchen", tags: ["bamboo", "eco-friendly", "kitchen"],
        rating: 4.6, reviews: 89,
        variants: [{ id: "v-11001", name: "4-Piece", sku: "NX-11001", price: 38, stock: 52, attributes: { set: "4-Piece" } }, { id: "v-11002", name: "8-Piece", sku: "NX-11002", price: 58, stock: 28, attributes: { set: "8-Piece" } }],
        variantOptions: [{ name: "Set", values: ["4-Piece", "8-Piece"] }],
        featured: false, new: false, bestselling: false,
        vendorId: "v4", vendorName: "Morning Rituals", commission: 12, aiScore: 0.72,
        createdAt: new Date("2024-01-15"), updatedAt: new Date("2024-04-15"),
    },
    {
        id: 12, name: "Canvas Sneakers", slug: "canvas-sneakers",
        description: "Classic canvas sneakers with natural rubber soles and memory foam insole.",
        shortDescription: "Classic canvas with memory foam",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=750&fit=crop"],
        category: "Footwear", brand: "Grounded", tags: ["canvas", "comfortable", "everyday"],
        rating: 4.5, reviews: 234,
        variants: genVariants(72, ["7", "8", "9", "10", "11"], ["Off-White", "Natural Grey", "Navy"]),
        variantOptions: [{ name: "Size", values: ["7", "8", "9", "10", "11"] }, { name: "Color", values: ["Off-White", "Natural Grey", "Navy"] }],
        featured: false, new: false, bestselling: true,
        vendorId: "v1", vendorName: "Heritage Denim Co.", commission: 12, aiScore: 0.85,
        createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01"),
    },
    {
        id: 13, name: "Hand-Poured Soap Bar", slug: "hand-poured-soap-bar",
        description: "Cold-process soap bar made with olive oil and shea butter. Scented with natural lavender.",
        shortDescription: "Natural lavender, cold-process",
        image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=600&h=750&fit=crop"],
        category: "Body Care", brand: "Botanica", tags: ["natural", "lavender", "handmade"],
        rating: 4.9, reviews: 312,
        variants: [{ id: "v-13001", name: "Lavender", sku: "NX-13001", price: 12, stock: 156, attributes: { scent: "Lavender" } }, { id: "v-13002", name: "Eucalyptus", sku: "NX-13002", price: 12, stock: 89, attributes: { scent: "Eucalyptus" } }, { id: "v-13003", name: "Unscented", sku: "NX-13003", price: 10, stock: 67, attributes: { scent: "Unscented" } }],
        variantOptions: [{ name: "Scent", values: ["Lavender", "Eucalyptus", "Unscented"] }],
        featured: false, new: false, bestselling: true,
        vendorId: "v5", vendorName: "Maison Terre", commission: 14, aiScore: 0.90,
        createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-05-01"),
    },
    {
        id: 14, name: "Cashmere Beanie", slug: "cashmere-beanie",
        description: "100% pure cashmere beanie in a relaxed fit. Hand-knit in small batches.",
        shortDescription: "100% cashmere, hand-knit",
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&h=750&fit=crop"],
        category: "Accessories", brand: "Highland Knits", tags: ["cashmere", "luxury", "winter"],
        rating: 4.8, reviews: 156,
        variants: [{ id: "v-14001", name: "Oatmeal", sku: "NX-14001", price: 55, stock: 28, attributes: { color: "Oatmeal" } }, { id: "v-14002", name: "Charcoal", sku: "NX-14002", price: 55, stock: 34, attributes: { color: "Charcoal" } }, { id: "v-14003", name: "Blush", sku: "NX-14003", price: 55, stock: 15, attributes: { color: "Blush" } }],
        variantOptions: [{ name: "Color", values: ["Oatmeal", "Charcoal", "Blush"] }],
        featured: true, new: false, bestselling: false,
        vendorId: "v3", vendorName: "Conscious Basics", commission: 10, aiScore: 0.86,
        createdAt: new Date("2024-02-01"), updatedAt: new Date("2024-05-01"),
    },
    {
        id: 15, name: "Recycled Glass Vase", slug: "recycled-glass-vase",
        description: "Handblown vase from 100% recycled glass. Unique blue-green tint.",
        shortDescription: "100% recycled handblown glass",
        image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=750&fit=crop"],
        category: "Home", brand: "Reclaimed Beauty", tags: ["recycled", "glass", "artisan"],
        rating: 4.7, reviews: 67,
        variants: [{ id: "v-15001", name: "Small", sku: "NX-15001", price: 45, stock: 19, attributes: { size: "Small" } }, { id: "v-15002", name: "Medium", sku: "NX-15002", price: 58, stock: 12, attributes: { size: "Medium" } }, { id: "v-15003", name: "Large", sku: "NX-15003", price: 72, stock: 6, attributes: { size: "Large" } }],
        variantOptions: [{ name: "Size", values: ["Small", "Medium", "Large"] }],
        featured: false, new: false, bestselling: false,
        vendorId: "v4", vendorName: "Morning Rituals", commission: 12, aiScore: 0.74,
        createdAt: new Date("2024-03-01"), updatedAt: new Date("2024-05-15"),
    },
    {
        id: 16, name: "Merino Wool Sweater", slug: "merino-wool-sweater",
        description: "Ultra-soft merino wool sweater, temperature-regulating and moisture-wicking.",
        shortDescription: "Ultra-soft merino, relaxed fit",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=750&fit=crop"],
        category: "Tops", brand: "Wool & Wire", tags: ["merino", "wool", "versatile"],
        rating: 4.8, reviews: 189,
        variants: genVariants(98, ["XS", "S", "M", "L", "XL"], ["Ivory", "Dusty Rose", "Navy", "Camel"]),
        variantOptions: [{ name: "Size", values: ["XS", "S", "M", "L", "XL"] }, { name: "Color", values: ["Ivory", "Dusty Rose", "Navy", "Camel"] }],
        featured: false, new: true, bestselling: true,
        vendorId: "v1", vendorName: "Heritage Denim Co.", commission: 12, aiScore: 0.92,
        createdAt: new Date("2024-04-01"), updatedAt: new Date("2024-06-15"),
    },
    {
        id: 17, name: "Japanese Tea Set", slug: "japanese-tea-set",
        description: "Traditional Japanese-inspired tea set with four cups and teapot. Hand-glazed.",
        shortDescription: "Hand-glazed ceramic, 6 pieces",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=750&fit=crop"],
        category: "Home", brand: "Tea Ceremony", tags: ["japanese", "ceramic", "tea"],
        rating: 4.9, reviews: 56,
        variants: [{ id: "v-17001", name: "White", sku: "NX-17001", price: 85, stock: 15, attributes: { color: "White" } }, { id: "v-17002", name: "Celadon", sku: "NX-17002", price: 88, stock: 9, attributes: { color: "Celadon" } }],
        variantOptions: [{ name: "Color", values: ["White", "Celadon"] }],
        featured: false, new: false, bestselling: false,
        vendorId: "v5", vendorName: "Maison Terre", commission: 14, aiScore: 0.81,
        createdAt: new Date("2024-02-15"), updatedAt: new Date("2024-05-01"),
    },
    {
        id: 18, name: "Leather Belt", slug: "leather-belt",
        description: "Full-grain leather belt with solid brass buckle. Hand-stitched edges.",
        shortDescription: "Full-grain leather, brass buckle",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop"],
        category: "Accessories", brand: "Saddle & Stitch", tags: ["leather", "handcrafted", "classic"],
        rating: 4.7, reviews: 145,
        variants: [{ id: "v-18001", name: "32 / Cognac", sku: "NX-18001", price: 58, stock: 20, attributes: { size: "32", color: "Cognac" } }, { id: "v-18002", name: "34 / Cognac", sku: "NX-18002", price: 58, stock: 18, attributes: { size: "34", color: "Cognac" } }, { id: "v-18003", name: "34 / Black", sku: "NX-18003", price: 58, stock: 22, attributes: { size: "34", color: "Black" } }],
        variantOptions: [{ name: "Size", values: ["32", "34"] }, { name: "Color", values: ["Cognac", "Black"] }],
        featured: false, new: false, bestselling: false,
        vendorId: "v1", vendorName: "Heritage Denim Co.", commission: 12, aiScore: 0.78,
        createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-04-01"),
    },
    {
        id: 19, name: "Organic Body Oil", slug: "organic-body-oil",
        description: "Nourishing body oil with jojoba, almond, and vitamin E. Light citrus scent.",
        shortDescription: "Jojoba & almond blend, citrus scent",
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=750&fit=crop"],
        category: "Body Care", brand: "Botanica", tags: ["organic", "nourishing", "natural"],
        rating: 4.8, reviews: 178,
        variants: [{ id: "v-19001", name: "4 oz", sku: "NX-19001", price: 32, stock: 89, attributes: { size: "4 oz" } }, { id: "v-19002", name: "8 oz", sku: "NX-19002", price: 52, stock: 45, attributes: { size: "8 oz" } }],
        variantOptions: [{ name: "Size", values: ["4 oz", "8 oz"] }],
        featured: false, new: false, bestselling: false,
        vendorId: "v5", vendorName: "Maison Terre", commission: 14, aiScore: 0.80,
        createdAt: new Date("2024-02-01"), updatedAt: new Date("2024-05-01"),
    },
    {
        id: 20, name: "Suede Ankle Boots", slug: "suede-ankle-boots",
        description: "Handcrafted suede ankle boots with leather sole and memory foam insole.",
        shortDescription: "Handcrafted suede, memory foam",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=750&fit=crop"],
        category: "Footwear", brand: "Grounded", tags: ["suede", "handcrafted", "comfortable"],
        rating: 4.8, reviews: 167,
        variants: genVariants(165, ["7", "8", "9", "10"], ["Tan", "Black", "Grey"]),
        variantOptions: [{ name: "Size", values: ["7", "8", "9", "10"] }, { name: "Color", values: ["Tan", "Black", "Grey"] }],
        featured: true, new: false, bestselling: false,
        vendorId: "v2", vendorName: "Woven Atelier", commission: 15, aiScore: 0.89,
        createdAt: new Date("2024-01-15"), updatedAt: new Date("2024-05-01"),
    },
    {
        id: 21, name: "Linen Shirt", slug: "linen-shirt",
        description: "Relaxed linen shirt with mother-of-pearl buttons. Breathable and lightweight.",
        shortDescription: "Relaxed linen, mother-of-pearl buttons",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop"],
        category: "Tops", brand: "Summer House", tags: ["linen", "breathable", "summer"],
        rating: 4.7, reviews: 198,
        variants: genVariants(68, ["S", "M", "L", "XL"], ["White", "Sky Blue", "Sand"]),
        variantOptions: [{ name: "Size", values: ["S", "M", "L", "XL"] }, { name: "Color", values: ["White", "Sky Blue", "Sand"] }],
        featured: false, new: false, bestselling: true,
        vendorId: "v3", vendorName: "Conscious Basics", commission: 10, aiScore: 0.88,
        createdAt: new Date("2024-03-01"), updatedAt: new Date("2024-06-01"),
    },
    {
        id: 22, name: "Alpaca Wool Throw", slug: "alpaca-wool-throw",
        description: "Ultra-soft alpaca wool throw blanket. Hand-loomed by artisans.",
        shortDescription: "Hand-loomed alpaca wool blanket",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=750&fit=crop"],
        category: "Home", brand: "Andean Artisans", tags: ["alpaca", "luxury", "handmade"],
        rating: 4.9, reviews: 45,
        variants: [{ id: "v-22001", name: "Throw / Natural", sku: "NX-22001", price: 180, stock: 9, attributes: { size: "Throw", color: "Natural" } }, { id: "v-22002", name: "Throw / Charcoal", sku: "NX-22002", price: 180, stock: 6, attributes: { size: "Throw", color: "Charcoal" } }, { id: "v-22003", name: "Large / Natural", sku: "NX-22003", price: 280, stock: 4, attributes: { size: "Large", color: "Natural" } }],
        variantOptions: [{ name: "Size", values: ["Throw", "Large"] }, { name: "Color", values: ["Natural", "Charcoal"] }],
        featured: true, new: false, bestselling: false,
        vendorId: "v2", vendorName: "Woven Atelier", commission: 15, aiScore: 0.91,
        createdAt: new Date("2024-03-01"), updatedAt: new Date("2024-05-01"),
    },
    {
        id: 23, name: "Gold Signet Ring", slug: "gold-signet-ring",
        description: "14k gold-plated signet ring with brushed matte finish. Minimalist unisex design.",
        shortDescription: "14k gold-plated, matte finish",
        image: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=600&h=750&fit=crop"],
        category: "Jewelry", brand: "Aurum", tags: ["gold", "minimalist", "unisex"],
        rating: 4.9, reviews: 89,
        variants: [{ id: "v-23001", name: "Size 6", sku: "NX-23001", price: 128, stock: 14, attributes: { size: "6" } }, { id: "v-23002", name: "Size 7", sku: "NX-23002", price: 128, stock: 18, attributes: { size: "7" } }, { id: "v-23003", name: "Size 8", sku: "NX-23003", price: 128, stock: 10, attributes: { size: "8" } }],
        variantOptions: [{ name: "Size", values: ["6", "7", "8"] }],
        featured: true, new: true, bestselling: false,
        vendorId: "v6", vendorName: "Aurum Collective", commission: 18, aiScore: 0.97,
        createdAt: new Date("2024-05-01"), updatedAt: new Date("2024-06-20"),
    },
    {
        id: 24, name: "Sterling Silver Cuff", slug: "sterling-silver-cuff",
        description: "Hand-hammered sterling silver cuff bracelet. Adjustable fit.",
        shortDescription: "Sterling silver, hand-hammered",
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=750&fit=crop"],
        category: "Jewelry", brand: "Aurum", tags: ["silver", "handcrafted", "minimal"],
        rating: 4.8, reviews: 67,
        variants: [{ id: "v-24001", name: "Standard", sku: "NX-24001", price: 95, stock: 22, attributes: { size: "Standard" } }],
        variantOptions: [{ name: "Size", values: ["Standard"] }],
        featured: false, new: true, bestselling: false,
        vendorId: "v6", vendorName: "Aurum Collective", commission: 18, aiScore: 0.84,
        createdAt: new Date("2024-05-15"), updatedAt: new Date("2024-06-20"),
    },
    {
        id: 25, name: "Wool Overcoat", slug: "wool-overcoat",
        description: "Tailored wool-cashmere blend overcoat with satin lining. Classic silhouette.",
        shortDescription: "Wool-cashmere blend, satin lined",
        image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=750&fit=crop",
        images: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=750&fit=crop"],
        category: "Outerwear", brand: "Maison Noir", tags: ["wool", "cashmere", "tailored"],
        rating: 4.9, reviews: 34,
        variants: genVariants(320, ["S", "M", "L", "XL"], ["Charcoal", "Camel", "Black"]),
        variantOptions: [{ name: "Size", values: ["S", "M", "L", "XL"] }, { name: "Color", values: ["Charcoal", "Camel", "Black"] }],
        featured: true, new: true, bestselling: false,
        vendorId: "v6", vendorName: "Aurum Collective", commission: 18, aiScore: 0.98,
        createdAt: new Date("2024-06-01"), updatedAt: new Date("2024-06-20"),
    },
];

export function getProductById(id: number) { return products.find((p) => p.id === id); }
export function getProductBySlug(slug: string) { return products.find((p) => p.slug === slug); }
export function getProductsByCategory(cat: string) { return products.filter((p) => p.category.toLowerCase() === cat.toLowerCase()); }
export function getProductsByVendor(vid: string) { return products.filter((p) => p.vendorId === vid); }
export function getFeaturedProducts() { return products.filter((p) => p.featured); }
export function getNewProducts() { return products.filter((p) => p.new); }
export function getBestsellingProducts() { return products.filter((p) => p.bestselling); }
export function getAIRecommendations(n = 6) { return [...products].sort((a, b) => b.aiScore - a.aiScore).slice(0, n); }
export function getCategories() { return [...new Set(products.map((p) => p.category))]; }
export function searchProducts(query: string) {
    const q = query.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)) || p.vendorName.toLowerCase().includes(q));
}
export function sortProducts(list: Product[], by: string) {
    const s = [...list];
    switch (by) {
        case "price-asc": return s.sort((a, b) => Math.min(...a.variants.map(v => v.price)) - Math.min(...b.variants.map(v => v.price)));
        case "price-desc": return s.sort((a, b) => Math.min(...b.variants.map(v => v.price)) - Math.min(...a.variants.map(v => v.price)));
        case "rating": return s.sort((a, b) => b.rating - a.rating);
        case "newest": return s.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        case "ai-score": return s.sort((a, b) => b.aiScore - a.aiScore);
        default: return s;
    }
}
