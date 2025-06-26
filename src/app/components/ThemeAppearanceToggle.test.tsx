import { fireEvent, render, screen } from "@testing-library/react";

import { ThemeAppearance } from "@/types";
import { ThemeAppearanceContext } from "./ThemeContext";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useIsResumePage } from "@/hooks/useIsResumePage";

// Mock the Icon component since we can't test the actual icons in jsdom
jest.mock("@iconify/react", () => ({
  Icon: ({ icon }: { icon: string }) => <span data-testid={`icon-${icon}`} />,
}));

// Mock the custom hooks
jest.mock("@/hooks/useIsDesktop");
jest.mock("@/hooks/useIsResumePage");

describe("ThemeAppearanceToggle", () => {
  const mockSetThemeAppearance = jest.fn();

  const renderWithContext = (themeAppearance: ThemeAppearance = "light") => {
    return render(
      <ThemeAppearanceContext.Provider
        value={{ themeAppearance, setThemeAppearance: mockSetThemeAppearance }}
      >
        <ThemeAppearanceToggle />
      </ThemeAppearanceContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useIsDesktop as jest.Mock).mockReturnValue(true);
    (useIsResumePage as jest.Mock).mockReturnValue(false);
  });

  it("renders with sun and moon icons", () => {
    renderWithContext();
    expect(screen.getByTestId("icon-solar:sun-bold")).toBeInTheDocument();
    expect(screen.getByTestId("icon-solar:moon-bold")).toBeInTheDocument();
  });

  it("toggles theme appearance when switch is clicked", () => {
    const { rerender } = renderWithContext("light");
    const switchElement = screen.getByRole("checkbox");

    // Initial state (light theme)
    expect(switchElement).not.toBeChecked();

    // Click to toggle
    fireEvent.click(switchElement);
    expect(mockSetThemeAppearance).toHaveBeenCalledWith("dark");

    // Render with dark theme
    rerender(
      <ThemeAppearanceContext.Provider
        value={{ themeAppearance: "dark", setThemeAppearance: mockSetThemeAppearance }}
      >
        <ThemeAppearanceToggle />
      </ThemeAppearanceContext.Provider>,
    );
    expect(switchElement).toBeChecked();

    // Click to toggle back
    fireEvent.click(switchElement);
    expect(mockSetThemeAppearance).toHaveBeenCalledWith("light");
  });

  it("applies correct styles based on resume page status", () => {
    // Not on resume page
    (useIsResumePage as jest.Mock).mockReturnValue(false);
    const { container, rerender } = renderWithContext();
    const box = container.querySelector('[class*="MuiBox-root"]');
    expect(box).toHaveStyle({ marginRight: "1em" });

    // On resume page
    (useIsResumePage as jest.Mock).mockReturnValue(true);
    rerender(
      <ThemeAppearanceContext.Provider
        value={{ themeAppearance: "light", setThemeAppearance: mockSetThemeAppearance }}
      >
        <ThemeAppearanceToggle />
      </ThemeAppearanceContext.Provider>,
    );
  });

  it("applies correct styles based on screen size", () => {
    // Desktop view
    (useIsDesktop as jest.Mock).mockReturnValue(true);
    const { container, rerender } = renderWithContext();
    const box = container.querySelector('[class*="MuiBox-root"]');
    expect(box).toHaveStyle({ marginRight: "1em" });

    // Mobile view
    (useIsDesktop as jest.Mock).mockReturnValue(false);
    rerender(
      <ThemeAppearanceContext.Provider
        value={{ themeAppearance: "light", setThemeAppearance: mockSetThemeAppearance }}
      >
        <ThemeAppearanceToggle />
      </ThemeAppearanceContext.Provider>,
    );
    expect(box).toHaveStyle({ marginRight: 0 });
  });
});
