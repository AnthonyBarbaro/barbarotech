"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "barbarotech-theme";
const THEME_EVENT = "barbarotech-theme-change";

function getDocumentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const syncTheme = () => setTheme(getDocumentTheme());
    syncTheme();
    window.addEventListener(THEME_EVENT, syncTheme);
    return () => window.removeEventListener(THEME_EVENT, syncTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = getDocumentTheme() === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The theme still changes for this session when storage is unavailable.
    }
    setTheme(nextTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      className={`portfolio-theme-toggle ${className}`.trim()}
      onClick={toggleTheme}
      role="switch"
      aria-checked={theme === "dark"}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <span className="portfolio-theme-track" aria-hidden="true">
        <span className="portfolio-theme-glyph">☼</span>
        <span className="portfolio-theme-glyph">◐</span>
        <span className="portfolio-theme-knob" />
      </span>
      <span className="sr-only">{theme} mode</span>
    </button>
  );
}
