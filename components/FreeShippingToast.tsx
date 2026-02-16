"use client";

import { useEffect, useState } from "react";
import { X, Truck } from "lucide-react";

export default function FreeShippingToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the toast before
    const dismissed = localStorage.getItem("freeShippingToastDismissed");
    if (!dismissed) {
      // Show toast after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("freeShippingToastDismissed", "true");
    
    // Reset after 24 hours (optional)
    setTimeout(() => {
      localStorage.removeItem("freeShippingToastDismissed");
    }, 24 * 60 * 60 * 1000);
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div className={`free-shipping-toast ${isVisible ? "toast-visible" : ""}`}>
      <div className="toast-content">
        <div className="toast-icon">
          <Truck size={20} />
        </div>
        <div className="toast-text">
          <div className="toast-title">Free Shipping</div>
          <div className="toast-message">on orders over $100</div>
        </div>
        <button 
          className="toast-close" 
          onClick={handleDismiss}
          aria-label="Dismiss notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
