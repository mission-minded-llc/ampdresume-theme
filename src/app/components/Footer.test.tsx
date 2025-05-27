import { render, screen } from "@testing-library/react";

import { Footer } from "./Footer";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useIsResumePage } from "@/hooks/useIsResumePage";

// Mock the custom hooks
jest.mock("@/hooks/useIsDesktop");
jest.mock("@/hooks/useIsResumePage");

describe("Footer", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("renders the footer with correct content", () => {
    (useIsDesktop as jest.Mock).mockReturnValue(true);
    (useIsResumePage as jest.Mock).mockReturnValue(false);

    render(<Footer />);

    // Check if main links and content are present
    expect(screen.getByText("ampdresume.com")).toBeInTheDocument();
    expect(screen.getByText(/Amp'd Resume\. All rights reserved\./)).toBeInTheDocument();

    // Check if current year is included in the copyright text
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it("renders with correct layout based on screen size", () => {
    // Test desktop view
    (useIsDesktop as jest.Mock).mockReturnValue(true);
    (useIsResumePage as jest.Mock).mockReturnValue(false);

    const { container, rerender } = render(<Footer />);
    const flexBox = container.querySelector('[class*="MuiBox-root"]');
    expect(flexBox).toBeInTheDocument();

    // Test mobile view
    (useIsDesktop as jest.Mock).mockReturnValue(false);
    rerender(<Footer />);
    expect(flexBox).toBeInTheDocument();
  });

  it("has fixed position when on resume page", () => {
    (useIsDesktop as jest.Mock).mockReturnValue(true);
    (useIsResumePage as jest.Mock).mockReturnValue(true);

    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toHaveStyle({ position: "fixed" });
  });

  it("has relative position when not on resume page", () => {
    (useIsDesktop as jest.Mock).mockReturnValue(true);
    (useIsResumePage as jest.Mock).mockReturnValue(false);

    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toHaveStyle({ position: "relative" });
  });
});
