export interface Notification {
    id: string;
    type: "order" | "vendor" | "stock" | "system";
    title: string;
    description: string;
    time: string;
    read: boolean;
}

export const notifications: Notification[] = [
    { id: "n1", type: "order", title: "New Order #NX-10004", description: "James Okafor placed a $336 order", time: "2 min ago", read: false },
    { id: "n2", type: "vendor", title: "Vendor Application", description: "New vendor 'Nordic Ceramics' applied", time: "15 min ago", read: false },
    { id: "n3", type: "stock", title: "Low Stock Alert", description: "King / Natural Bedding Set — 4 remaining", time: "1 hr ago", read: false },
    { id: "n4", type: "order", title: "Order Delivered", description: "#NX-10005 confirmed delivered to Aiko Tanaka", time: "3 hr ago", read: true },
    { id: "n5", type: "system", title: "Monthly Report Ready", description: "June marketplace performance report available", time: "5 hr ago", read: true },
    { id: "n6", type: "order", title: "New Order #NX-10003", description: "Élise Dupont placed a $205.80 order", time: "8 hr ago", read: true },
];

export function getUnreadCount() { return notifications.filter(n => !n.read).length; }
