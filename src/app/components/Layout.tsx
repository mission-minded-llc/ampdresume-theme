"use client";

import { Box, Container, ThemeProvider } from "@mui/material";
import React, { useContext } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeAppearanceContext } from "./ThemeContext";
import { createTheme } from "@mui/material/styles";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);

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
        default: themeAppearance === "dark" ? "#151515" : "#fff",
        paper: themeAppearance === "dark" ? "#000" : "#eee",
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

  return (
    <AppRouterCacheProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <Container
              sx={(theme) => ({
                backgroundColor: theme.palette.background.default,
                width: "100%",
              })}
            >
              <CssBaseline />
              {children}
            </Container>
            <Footer />
          </Box>
        </ThemeProvider>
      </LocalizationProvider>
    </AppRouterCacheProvider>
  );
};
