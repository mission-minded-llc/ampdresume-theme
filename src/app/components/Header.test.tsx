import { render, screen } from "@testing-library/react";

import { Header } from "./Header";
import { useIsDesktop } from "@/hooks/useIsDesktop";

// Mock the custom hooks and components
jest.mock("@/hooks/useIsDesktop");
jest.mock("./ThemeAppearanceToggle", () => ({
  ThemeAppearanceToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));
jest.mock("./NavPrimary", () => ({
  NavPrimary: () => <div data-testid="nav-primary">Navigation</div>,
}));

describe("Header", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("renders the header with navigation", () => {
    (useIsDesktop as jest.Mock).mockReturnValue(true);
    render(<Header />);

    expect(screen.getByTestId("nav-primary")).toBeInTheDocument();
  });

  it("shows theme toggle on desktop view", () => {
    (useIsDesktop as jest.Mock).mockReturnValue(true);
    render(<Header />);

    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  it("hides theme toggle on mobile view", () => {
    (useIsDesktop as jest.Mock).mockReturnValue(false);
    render(<Header />);

    expect(screen.queryByTestId("theme-toggle")).not.toBeInTheDocument();
  });

  it("renders with correct layout based on screen size", () => {
    // Test desktop view
    (useIsDesktop as jest.Mock).mockReturnValue(true);
    const { container, rerender } = render(<Header />);

    const header = container.querySelector("header");
    expect(header).toHaveStyle({ paddingRight: "16px" }); // 2 * 8px (theme spacing)

    // Test mobile view
    (useIsDesktop as jest.Mock).mockReturnValue(false);
    rerender(<Header />);
    expect(header).toHaveStyle({ paddingRight: "0px" });
  });

  it("applies correct responsive styles", () => {
    (useIsDesktop as jest.Mock).mockReturnValue(true);
    const { container } = render(<Header />);

    const header = container.querySelector("header");
    expect(header).toHaveStyle({
      position: "sticky",
      top: "0",
      left: "0",
      width: "100vw",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    });
  });
});
