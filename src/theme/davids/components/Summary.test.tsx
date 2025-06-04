import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import { Summary } from "./Summary";
import { themeDefaultSampleData } from "@/theme/sampleData";

// Helper function to render with theme
const renderWithTheme = (component: React.ReactElement, mode: "light" | "dark" = "light") => {
  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("Summary Component", () => {
  const sampleUser = themeDefaultSampleData.data.resume.user;

  describe("Rendering Conditions", () => {
    it("should render nothing when no user is provided", () => {
      const { container } = renderWithTheme(<Summary />);
      expect(container.firstChild).toBeNull();
    });

    it("should render nothing when user has no summary", () => {
      const userWithoutSummary = { ...sampleUser, summary: undefined };
      const { container } = renderWithTheme(<Summary user={userWithoutSummary} />);
      expect(container.firstChild).toBeNull();
    });

    it("should render nothing when user summary is only whitespace", () => {
      const userWithWhitespaceSummary = { ...sampleUser, summary: "   " };
      const { container } = renderWithTheme(<Summary user={userWithWhitespaceSummary} />);
      expect(container.firstChild).toBeNull();
    });

    it("should render summary when user has valid summary text", () => {
      const userWithSummary = {
        ...sampleUser,
        summary:
          "Experienced software engineer with 5+ years in full-stack development specializing in modern web technologies and scalable solutions.",
      };
      renderWithTheme(<Summary user={userWithSummary} />);

      expect(screen.getByText("Summary")).toBeInTheDocument();
      expect(screen.getByText(userWithSummary.summary)).toBeInTheDocument();
    });
  });

  describe("Content Display", () => {
    const userWithSummary = {
      ...sampleUser,
      summary:
        "Experienced software engineer with 5+ years in full-stack development specializing in modern web technologies and scalable solutions.",
    };

    it("should display the summary heading", () => {
      renderWithTheme(<Summary user={userWithSummary} />);

      const heading = screen.getByRole("heading", { name: "Summary" });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H2");
    });

    it("should display the full summary text when under 2500 characters", () => {
      renderWithTheme(<Summary user={userWithSummary} />);

      expect(screen.getByText(userWithSummary.summary)).toBeInTheDocument();
    });

    it("should truncate summary text when over 2500 characters", () => {
      const userWithLongSummary = { ...sampleUser, summary: "A".repeat(3000) };
      renderWithTheme(<Summary user={userWithLongSummary} />);

      // Instead of checking for exact text, let's verify the length
      const summaryElement = screen.getByText(/^A+$/); // matches any string of only 'A's
      expect(summaryElement.textContent?.length).toBeLessThanOrEqual(2500);

      // Verify the original long text is not present
      expect(screen.queryByText("A".repeat(3000))).not.toBeInTheDocument();
    });

    it("should display the full summary when exactly 2500 characters", () => {
      const userWithBoundarySummary = { ...sampleUser, summary: "A".repeat(2500) };
      renderWithTheme(<Summary user={userWithBoundarySummary} />);

      const expectedText = "A".repeat(2500);
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });

  describe("Styling and Theme", () => {
    const userWithSummary = {
      ...sampleUser,
      summary:
        "Experienced software engineer with 5+ years in full-stack development specializing in modern web technologies and scalable solutions.",
    };

    it("should apply correct color for light theme", () => {
      renderWithTheme(<Summary user={userWithSummary} />, "light");

      const summaryText = screen.getByText(userWithSummary.summary);
      const computedStyle = window.getComputedStyle(summaryText);

      // Light theme should use #6b7280 (grey color)
      expect(computedStyle.color).toBe("rgb(107, 114, 128)");
    });

    it("should apply correct color for dark theme", () => {
      renderWithTheme(<Summary user={userWithSummary} />, "dark");

      const summaryText = screen.getByText(userWithSummary.summary);
      const computedStyle = window.getComputedStyle(summaryText);

      // Dark theme should use #94a3b8 (grey color)
      expect(computedStyle.color).toBe("rgb(148, 163, 184)");
    });
  });

  describe("Accessibility", () => {
    const userWithSummary = {
      ...sampleUser,
      summary:
        "Experienced software engineer with 5+ years in full-stack development specializing in modern web technologies and scalable solutions.",
    };

    it("should have proper heading hierarchy", () => {
      renderWithTheme(<Summary user={userWithSummary} />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Summary");
    });

    it("should have accessible text content", () => {
      renderWithTheme(<Summary user={userWithSummary} />);

      const summaryText = screen.getByText(userWithSummary.summary);
      expect(summaryText).toBeInTheDocument();
      expect(summaryText.tagName).toBe("P"); // Typography with variant="body1" renders as p
    });
  });
});
