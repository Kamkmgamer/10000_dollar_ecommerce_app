export const translations: Record<string, Record<string, string>> = {
    en: { shop: "Shop", vendors: "Vendors", cart: "Cart", search: "Search", account: "Account", admin: "Admin", analytics: "Analytics", wishlist: "Wishlist", checkout: "Checkout", addToCart: "Add to Cart", exploreCollection: "Explore Collection", viewDashboard: "View Dashboard", aiPicks: "AI Picks", language: "Language", comingSoon: "Coming soon" },
    es: { shop: "Tienda", vendors: "Vendedores", cart: "Carrito", search: "Buscar", account: "Cuenta", admin: "Admin", analytics: "Analítica", wishlist: "Favoritos", checkout: "Pagar", addToCart: "Añadir al Carrito", exploreCollection: "Explorar Colección", viewDashboard: "Ver Panel", aiPicks: "Selección IA", language: "Idioma", comingSoon: "Próximamente" },
    fr: { shop: "Boutique", vendors: "Vendeurs", cart: "Panier", search: "Rechercher", account: "Compte", admin: "Admin", analytics: "Analytique", wishlist: "Favoris", checkout: "Paiement", addToCart: "Ajouter au Panier", exploreCollection: "Explorer la Collection", viewDashboard: "Voir le Tableau", aiPicks: "Sélection IA", language: "Langue", comingSoon: "Bientôt disponible" },
    ar: { shop: "تسوق", vendors: "البائعون", cart: "السلة", search: "بحث", account: "الحساب", admin: "الإدارة", analytics: "التحليلات", wishlist: "المفضلة", checkout: "الدفع", addToCart: "أضف للسلة", exploreCollection: "استكشف المجموعة", viewDashboard: "عرض اللوحة", aiPicks: "اختيارات الذكاء", language: "اللغة", comingSoon: "قريباً" },
};

export function t(key: string, lang = "en") { return translations[lang]?.[key] ?? translations.en[key] ?? key; }
export const supportedLanguages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "ar", name: "العربية" },
];
