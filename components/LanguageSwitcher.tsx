"use client";

import { useState, useRef, useEffect } from "react";
import { supportedLanguages, t } from "@/lib/i18n";
import { ChevronDown, Sparkles } from "lucide-react";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [comingSoonVisible, setComingSoonVisible] = useState(false);
  const [comingSoonLang, setComingSoonLang] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageClick = (code: string) => {
    if (code === "en") {
      setSelectedLang(code);
      setIsOpen(false);
      return;
    }
    setComingSoonLang(code);
    setComingSoonVisible(true);
    setIsOpen(false);
    setTimeout(() => {
      setComingSoonVisible(false);
      setComingSoonLang(null);
    }, 2500);
  };

  const selectedName = supportedLanguages.find((l) => l.code === selectedLang)?.name ?? "English";

  return (
    <>
      <div className="lang-switcher" ref={dropdownRef}>
        <button
          type="button"
          className="lang-switcher-trigger"
          onClick={() => setIsOpen((o) => !o)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Select language"
        >
          <span className="lang-switcher-text">{selectedName}</span>
          <ChevronDown
            size={14}
            className="lang-switcher-chevron"
            style={{ transform: isOpen ? "rotate(180deg)" : undefined }}
          />
        </button>
        {isOpen && (
          <div className="lang-switcher-dropdown" role="listbox">
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={selectedLang === lang.code}
                className={`lang-switcher-option ${selectedLang === lang.code ? "is-selected" : ""}`}
                onClick={() => handleLanguageClick(lang.code)}
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Coming Soon toast */}
      {comingSoonVisible && (
        <div className="lang-coming-soon-toast">
          <div className="lang-coming-soon-content">
            <div className="lang-coming-soon-icon">
              <Sparkles size={18} />
            </div>
            <span>{comingSoonLang ? t("comingSoon", comingSoonLang) : "Coming soon"}</span>
          </div>
        </div>
      )}
    </>
  );
}
