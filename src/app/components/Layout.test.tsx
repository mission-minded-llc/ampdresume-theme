import { render, screen } from "@testing-library/react";

import { Layout } from "./Layout";
import React from "react";
import { ThemeAppearanceContext } from "./ThemeContext";

// Mock the Header and Footer components
jest.mock("./Header", () => ({
  Header: () => <div data-testid="mock-header">Header</div>,
}));

jest.mock("./Footer", () => ({
  Footer: () => <div data-testid="mock-footer">Footer</div>,
}));

describe("Layout", () => {
  const renderWithTheme = (themeAppearance: "light" | "dark") => {
    return render(
      <ThemeAppearanceContext.Provider value={{ themeAppearance, setThemeAppearance: jest.fn() }}>
        <Layout>
          <div data-testid="test-children">Test Content</div>
        </Layout>
      </ThemeAppearanceContext.Provider>,
    );
  };

  it("renders without crashing", () => {
    renderWithTheme("light");
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
    expect(screen.getByTestId("test-children")).toBeInTheDocument();
  });

  it("applies correct theme based on context - light mode", () => {
    renderWithTheme("light");
    const container = screen.getByTestId("test-children").parentElement;
    expect(container).toHaveStyle({ backgroundColor: "#fff" });
  });

  it("applies correct theme based on context - dark mode", () => {
    renderWithTheme("dark");
    const container = screen.getByTestId("test-children").parentElement;
    expect(container).toHaveStyle({ backgroundColor: "#151515" });
  });

  it("maintains proper layout structure", () => {
    renderWithTheme("light");
    const header = screen.getByTestId("mock-header");
    const footer = screen.getByTestId("mock-footer");
    const content = screen.getByTestId("test-children");

    expect(header).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});
