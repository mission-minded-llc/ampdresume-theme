"use client";

import React, { SetStateAction, createContext, useEffect, useState } from "react";

import { ThemeAppearance } from "@/types";

interface ThemeAppearanceProviderProps {
  themeAppearance: ThemeAppearance;
  setThemeAppearance: React.Dispatch<SetStateAction<ThemeAppearance>>;
}

export const ThemeAppearanceContext = createContext<ThemeAppearanceProviderProps>({
  themeAppearance: "light",
  setThemeAppearance: () => {},
});

export const ThemeAppearanceProvider = ({ children }: { children?: React.ReactNode }) => {
  const [themeAppearance, setThemeAppearance] = useState<ThemeAppearance>("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleMediaQueryChange = (e: { matches: boolean }) => {
      setThemeAppearance(e.matches ? "dark" : "light");
    };

    // Detect the current appearance settings immediately.
    if (mediaQuery.matches) {
      handleMediaQueryChange({ matches: mediaQuery.matches });
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <ThemeAppearanceContext.Provider value={{ themeAppearance, setThemeAppearance }}>
      {children}
    </ThemeAppearanceContext.Provider>
  );
};
