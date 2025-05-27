import Page, { generateMetadata } from "./page";
import { render, screen } from "@testing-library/react";
import { themeAuthor, titleSuffix } from "@/constants";

import { ThemeName } from "@/types";

// Mock the ResumeView component since we're only testing the page component
jest.mock("./ResumeView", () => ({
  ResumeView: ({ themeName }: { themeName: string }) => (
    <div data-testid="resume-view">Theme: {themeName}</div>
  ),
}));

describe("Theme Page", () => {
  const themeName = "default" as ThemeName;
  const params = Promise.resolve({ themeName });

  describe("generateMetadata", () => {
    it("should generate correct metadata for a theme", async () => {
      const metadata = await generateMetadata({ params });

      expect(metadata.title).toBe(`Theme: ${themeName} ${titleSuffix}`);
      expect(metadata.description).toBe(`This is the ${themeName} theme for OpenResume.`);
      expect(Array.isArray(metadata.authors) && metadata.authors[0]?.name).toBe(
        themeAuthor?.default,
      );
      expect(metadata.openGraph).toEqual({
        title: `Theme: ${themeName} ${titleSuffix}`,
        description: `This is the ${themeName} theme for OpenResume.`,
        images: [],
      });
    });

    it("should use theme-specific author when available", async () => {
      const customThemeName = "modern" as ThemeName;
      const customParams = Promise.resolve({ themeName: customThemeName });
      const metadata = await generateMetadata({ params: customParams });

      const expectedAuthor = themeAuthor?.[customThemeName] || themeAuthor?.default;
      expect(Array.isArray(metadata.authors) && metadata.authors[0]?.name).toBe(expectedAuthor);
    });
  });

  describe("Page component", () => {
    it("should render ResumeView with correct theme name", async () => {
      render(await Page({ params }));

      const resumeView = screen.getByTestId("resume-view");
      expect(resumeView).toHaveTextContent(`Theme: ${themeName}`);
    });
  });
});
