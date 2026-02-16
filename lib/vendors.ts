export interface Vendor {
    id: string;
    name: string;
    slug: string;
    description: string;
    logo: string;
    rating: number;
    productCount: number;
    totalSales: number;
    commissionTier: number;
    joinedDate: Date;
    verified: boolean;
    categories: string[];
    payoutHistory: { month: string; amount: number }[];
}

export const vendors: Vendor[] = [
    {
        id: "v1", name: "Heritage Denim Co.", slug: "heritage-denim",
        description: "Premium denim and leather goods, handcrafted with century-old techniques. Each piece carries the weight of tradition and the promise of longevity.",
        logo: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=100&h=100&fit=crop&crop=center", rating: 4.8, productCount: 5, totalSales: 45200, commissionTier: 12, joinedDate: new Date("2023-06-15"), verified: true,
        categories: ["Outerwear", "Accessories", "Footwear", "Tops"],
        payoutHistory: [{ month: "Jan", amount: 4200 }, { month: "Feb", amount: 3800 }, { month: "Mar", amount: 5100 }, { month: "Apr", amount: 4600 }, { month: "May", amount: 5800 }, { month: "Jun", amount: 6200 }],
    },
    {
        id: "v2", name: "Woven Atelier", slug: "woven-atelier",
        description: "Artisan weaving studio specializing in natural materials. From seagrass totes to alpaca throws, every piece tells a story of craft.",
        logo: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=100&h=100&fit=crop&crop=center", rating: 4.9, productCount: 4, totalSales: 32100, commissionTier: 15, joinedDate: new Date("2023-08-01"), verified: true,
        categories: ["Accessories", "Bottoms", "Home", "Footwear"],
        payoutHistory: [{ month: "Jan", amount: 2800 }, { month: "Feb", amount: 3200 }, { month: "Mar", amount: 3600 }, { month: "Apr", amount: 4100 }, { month: "May", amount: 3900 }, { month: "Jun", amount: 4500 }],
    },
    {
        id: "v3", name: "Conscious Basics", slug: "conscious-basics",
        description: "Sustainable essentials for the modern wardrobe. Organic cotton, merino wool, and cashmere — sourced ethically, priced fairly.",
        logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&crop=center", rating: 4.7, productCount: 4, totalSales: 28900, commissionTier: 10, joinedDate: new Date("2023-09-20"), verified: true,
        categories: ["Tops", "Outerwear", "Accessories"],
        payoutHistory: [{ month: "Jan", amount: 2400 }, { month: "Feb", amount: 2600 }, { month: "Mar", amount: 3100 }, { month: "Apr", amount: 2900 }, { month: "May", amount: 3400 }, { month: "Jun", amount: 3800 }],
    },
    {
        id: "v4", name: "Morning Rituals", slug: "morning-rituals",
        description: "Home goods for intentional living. Ceramics, kitchen essentials, and décor crafted for the everyday rituals that matter most.",
        logo: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=100&h=100&fit=crop&crop=center", rating: 4.8, productCount: 4, totalSales: 19800, commissionTier: 12, joinedDate: new Date("2023-11-10"), verified: true,
        categories: ["Home"],
        payoutHistory: [{ month: "Jan", amount: 1800 }, { month: "Feb", amount: 2100 }, { month: "Mar", amount: 2400 }, { month: "Apr", amount: 2200 }, { month: "May", amount: 2800 }, { month: "Jun", amount: 3100 }],
    },
    {
        id: "v5", name: "Maison Terre", slug: "maison-terre",
        description: "French-inspired natural beauty and home. Cold-process soaps, body oils, bedding, and tea sets rooted in timeless artisanship.",
        logo: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=100&h=100&fit=crop&crop=center", rating: 4.9, productCount: 4, totalSales: 24500, commissionTier: 14, joinedDate: new Date("2023-10-05"), verified: true,
        categories: ["Body Care", "Home"],
        payoutHistory: [{ month: "Jan", amount: 2200 }, { month: "Feb", amount: 2500 }, { month: "Mar", amount: 2800 }, { month: "Apr", amount: 3100 }, { month: "May", amount: 3400 }, { month: "Jun", amount: 3900 }],
    },
    {
        id: "v6", name: "Aurum Collective", slug: "aurum-collective",
        description: "Fine jewelry and elevated outerwear for the discerning collector. Gold, sterling silver, and wool-cashmere — nothing less.",
        logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop&crop=center", rating: 4.9, productCount: 3, totalSales: 18700, commissionTier: 18, joinedDate: new Date("2024-01-15"), verified: true,
        categories: ["Jewelry", "Outerwear"],
        payoutHistory: [{ month: "Jan", amount: 1200 }, { month: "Feb", amount: 1800 }, { month: "Mar", amount: 2400 }, { month: "Apr", amount: 2800 }, { month: "May", amount: 3200 }, { month: "Jun", amount: 3600 }],
    },
];

export function getVendorById(id: string) { return vendors.find(v => v.id === id); }
export function getVendorBySlug(slug: string) { return vendors.find(v => v.slug === slug); }
export function getAllVendors() { return vendors; }
export function getTopVendors(n = 3) { return [...vendors].sort((a, b) => b.totalSales - a.totalSales).slice(0, n); }
