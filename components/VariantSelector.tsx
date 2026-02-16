"use client";
import { useState } from "react";
import type { VariantOption, ProductVariant } from "@/lib/products";

export default function VariantSelector({ options, variants, onSelect }: { options: VariantOption[]; variants: ProductVariant[]; onSelect: (v: ProductVariant) => void }) {
    const [selected, setSelected] = useState<Record<string, string>>({});

    const handleSelect = (optName: string, val: string) => {
        const next = { ...selected, [optName]: val };
        setSelected(next);
        const match = variants.find(v => Object.entries(next).every(([k, val]) => v.attributes[k.toLowerCase()] === val));
        if (match) onSelect(match);
    };

    return (
        <div>
            {options.map(opt => (
                <div key={opt.name} className="variant-selector">
                    <div className="variant-label">{opt.name}</div>
                    <div className="variant-options">
                        {opt.values.map(val => (
                            <button key={val} className={`variant-option ${selected[opt.name] === val ? "active" : ""}`} onClick={() => handleSelect(opt.name, val)}>{val}</button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
