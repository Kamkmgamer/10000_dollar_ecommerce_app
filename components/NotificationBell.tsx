"use client";
import { useState } from "react";
import { notifications, getUnreadCount } from "@/lib/notifications";

export default function NotificationBell() {
    const [open, setOpen] = useState(false);
    const unread = getUnreadCount();

    return (
        <div className="notification-bell" onClick={() => setOpen(!open)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>
            {unread > 0 && <span className="notification-dot" />}
            {open && (
                <div className="notification-panel">
                    <div className="notification-header">Notifications ({unread} new)</div>
                    {notifications.map(n => (
                        <div key={n.id} className="notification-item" style={{ opacity: n.read ? 0.6 : 1 }}>
                            <div className="notification-item-title">{n.title}</div>
                            <div className="notification-item-desc">{n.description}</div>
                            <div className="notification-item-time">{n.time}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
