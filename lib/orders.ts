export interface Order {
    id: string;
    customerId: string;
    customerName: string;
    items: { productId: number; productName: string; vendorId: string; vendorName: string; quantity: number; price: number }[];
    subtotal: number;
    marketplaceFee: number;
    total: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    createdAt: Date;
}

export const orders: Order[] = [
    { id: "NX-10001", customerId: "c1", customerName: "Sarah Chen", items: [{ productId: 1, productName: "Vintage Denim Jacket", vendorId: "v1", vendorName: "Heritage Denim Co.", quantity: 1, price: 89.99 }, { productId: 13, productName: "Hand-Poured Soap Bar", vendorId: "v5", vendorName: "Maison Terre", quantity: 2, price: 12 }], subtotal: 113.99, marketplaceFee: 5.70, total: 119.69, status: "delivered", createdAt: new Date("2024-06-18") },
    { id: "NX-10002", customerId: "c2", customerName: "Marcus Webb", items: [{ productId: 7, productName: "Leather Crossbody Bag", vendorId: "v1", vendorName: "Heritage Denim Co.", quantity: 1, price: 145 }], subtotal: 145, marketplaceFee: 7.25, total: 152.25, status: "shipped", createdAt: new Date("2024-06-19") },
    { id: "NX-10003", customerId: "c3", customerName: "Élise Dupont", items: [{ productId: 23, productName: "Gold Signet Ring", vendorId: "v6", vendorName: "Aurum Collective", quantity: 1, price: 128 }, { productId: 10, productName: "Silk Blend Scarf", vendorId: "v2", vendorName: "Woven Atelier", quantity: 1, price: 68 }], subtotal: 196, marketplaceFee: 9.80, total: 205.80, status: "processing", createdAt: new Date("2024-06-20") },
    { id: "NX-10004", customerId: "c4", customerName: "James Okafor", items: [{ productId: 25, productName: "Wool Overcoat", vendorId: "v6", vendorName: "Aurum Collective", quantity: 1, price: 320 }], subtotal: 320, marketplaceFee: 16.00, total: 336.00, status: "pending", createdAt: new Date("2024-06-20") },
    { id: "NX-10005", customerId: "c5", customerName: "Aiko Tanaka", items: [{ productId: 4, productName: "Ceramic Pour-Over Set", vendorId: "v4", vendorName: "Morning Rituals", quantity: 1, price: 65 }, { productId: 17, productName: "Japanese Tea Set", vendorId: "v5", vendorName: "Maison Terre", quantity: 1, price: 85 }], subtotal: 150, marketplaceFee: 7.50, total: 157.50, status: "delivered", createdAt: new Date("2024-06-17") },
    { id: "NX-10006", customerId: "c6", customerName: "Priya Sharma", items: [{ productId: 16, productName: "Merino Wool Sweater", vendorId: "v1", vendorName: "Heritage Denim Co.", quantity: 2, price: 98 }], subtotal: 196, marketplaceFee: 9.80, total: 205.80, status: "shipped", createdAt: new Date("2024-06-19") },
    { id: "NX-10007", customerId: "c7", customerName: "Oliver Grant", items: [{ productId: 22, productName: "Alpaca Wool Throw", vendorId: "v2", vendorName: "Woven Atelier", quantity: 1, price: 180 }], subtotal: 180, marketplaceFee: 9.00, total: 189.00, status: "delivered", createdAt: new Date("2024-06-16") },
    { id: "NX-10008", customerId: "c8", customerName: "Fatima Al-Hassan", items: [{ productId: 9, productName: "Stone Washed Bedding Set", vendorId: "v5", vendorName: "Maison Terre", quantity: 1, price: 220 }], subtotal: 220, marketplaceFee: 11.00, total: 231.00, status: "processing", createdAt: new Date("2024-06-20") },
];

export function getRecentOrders(n = 5) { return [...orders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, n); }
export function getOrdersByVendor(vid: string) { return orders.filter(o => o.items.some(i => i.vendorId === vid)); }
export function getTotalRevenue() { return orders.reduce((s, o) => s + o.total, 0); }
export function getTotalMarketplaceFees() { return orders.reduce((s, o) => s + o.marketplaceFee, 0); }
