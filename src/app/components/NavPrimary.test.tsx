import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { NavPrimary } from "./NavPrimary";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";

// Mock the theme nav items
jest.mock("@/theme/themeNavItems", () => ({
  themeNavItems: [
    { text: "Theme 1", href: "/theme1", icon: <div>Icon1</div> },
    { text: "Theme 2", href: "/theme2", icon: <div>Icon2</div> },
  ],
}));

// Mock the ThemeAppearanceToggle component
jest.mock("./ThemeAppearanceToggle", () => ({
  ThemeAppearanceToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

describe("NavPrimary", () => {
  const theme = createTheme();
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it("renders the menu button initially", () => {
    renderWithTheme(<NavPrimary />);
    const menuButton = screen.getByLabelText("menu");
    expect(menuButton).toBeInTheDocument();
  });

  it("opens the drawer when menu button is clicked", () => {
    renderWithTheme(<NavPrimary />);
    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);

    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("closes the drawer when close button is clicked", async () => {
    renderWithTheme(<NavPrimary />);

    // Open the drawer
    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);

    // Click close button
    const closeButton = screen.getByLabelText("close");
    fireEvent.click(closeButton);

    // Wait for the drawer to close
    await waitFor(() => {
      expect(screen.queryByText("Menu")).not.toBeInTheDocument();
    });
  });

  it("renders theme navigation items", () => {
    renderWithTheme(<NavPrimary />);

    // Open the drawer
    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);

    // Check if theme items are rendered
    expect(screen.getByText("Theme 1")).toBeInTheDocument();
    expect(screen.getByText("Theme 2")).toBeInTheDocument();
  });

  it("renders the theme toggle", () => {
    renderWithTheme(<NavPrimary />);

    // Open the drawer
    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);

    // Check if theme toggle is present
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  it("closes drawer when a navigation item is clicked", async () => {
    renderWithTheme(<NavPrimary />);

    // Open the drawer
    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);

    // Click a navigation item
    const themeLink = screen.getByText("Theme 1");
    fireEvent.click(themeLink);

    // Wait for the drawer to close
    await waitFor(() => {
      expect(screen.queryByText("Menu")).not.toBeInTheDocument();
    });
  });
});
