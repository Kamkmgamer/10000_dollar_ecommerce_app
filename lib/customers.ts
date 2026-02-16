export interface Customer {
    id: string;
    name: string;
    email: string;
    segment: "VIP" | "Regular" | "New" | "At Risk";
    ltv: number;
    orders: number;
    lastOrder: Date;
    joinedAt: Date;
}

export const customers: Customer[] = [
    { id: "c1", name: "Sarah Chen", email: "sarah@example.com", segment: "VIP", ltv: 2340, orders: 18, lastOrder: new Date("2024-06-18"), joinedAt: new Date("2023-08-10") },
    { id: "c2", name: "Marcus Webb", email: "marcus@example.com", segment: "Regular", ltv: 890, orders: 7, lastOrder: new Date("2024-06-19"), joinedAt: new Date("2023-11-22") },
    { id: "c3", name: "Élise Dupont", email: "elise@example.com", segment: "VIP", ltv: 3120, orders: 24, lastOrder: new Date("2024-06-20"), joinedAt: new Date("2023-07-05") },
    { id: "c4", name: "James Okafor", email: "james@example.com", segment: "New", ltv: 320, orders: 1, lastOrder: new Date("2024-06-20"), joinedAt: new Date("2024-06-18") },
    { id: "c5", name: "Aiko Tanaka", email: "aiko@example.com", segment: "Regular", ltv: 1150, orders: 9, lastOrder: new Date("2024-06-17"), joinedAt: new Date("2023-10-15") },
    { id: "c6", name: "Priya Sharma", email: "priya@example.com", segment: "VIP", ltv: 2780, orders: 21, lastOrder: new Date("2024-06-19"), joinedAt: new Date("2023-06-30") },
    { id: "c7", name: "Oliver Grant", email: "oliver@example.com", segment: "At Risk", ltv: 540, orders: 4, lastOrder: new Date("2024-04-12"), joinedAt: new Date("2023-12-01") },
    { id: "c8", name: "Fatima Al-Hassan", email: "fatima@example.com", segment: "Regular", ltv: 980, orders: 8, lastOrder: new Date("2024-06-20"), joinedAt: new Date("2023-09-18") },
];

export function getCustomersBySegment(seg: string) { return customers.filter(c => c.segment === seg); }
export function getSegmentCounts() {
    const counts: Record<string, number> = {};
    customers.forEach(c => { counts[c.segment] = (counts[c.segment] || 0) + 1; });
    return counts;
}
