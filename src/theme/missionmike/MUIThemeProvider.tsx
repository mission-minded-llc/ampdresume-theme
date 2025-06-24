import { ThemeProvider, createTheme } from "@mui/material";

import React from "react";
import { ThemeAppearance } from "@/types";

/**
 * Since this theme uses React MUI, we need to wrap the entire theme in a ThemeProvider.
 * Child components can then use the theme.
 *
 * @param {React.ReactNode} children
 * @returns {React.ReactNode}
 */
export const MUIThemeProvider = ({
  children,
  themeAppearance = "light",
}: {
  children: React.ReactNode;
  themeAppearance?: ThemeAppearance;
}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: themeAppearance === "dark" ? "#eee" : "#333",
        light: themeAppearance === "dark" ? "#333" : "#eee",
      },
      secondary: {
        main: themeAppearance === "dark" ? "#cf75ff" : "#690e9c",
        light: themeAppearance === "dark" ? "#690e9c" : "#cf75ff",
      },
      background: {
        default: themeAppearance === "dark" ? "purple" : "#fff",
        paper: themeAppearance === "dark" ? "purple" : "#eee",
      },
      mode: themeAppearance,
    },
    typography: {
      fontSize: 16,
      fontFamily: "var(--font-geist-sans), Arial, sans-serif",
      h1: {
        fontFamily: "var(--font-geist-mono), monospace",
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
