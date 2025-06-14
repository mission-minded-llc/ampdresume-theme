import Page, { generateMetadata } from "./page";
import { render, screen } from "@testing-library/react";

import { ThemeName } from "@/types";
import { themeDefinitions } from "@/theme";
import { titleSuffix } from "@/constants";

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
      expect(metadata.description).toBe(themeDefinitions[themeName].description);
      expect(Array.isArray(metadata.authors) && metadata.authors[0]?.name).toBe(
        themeDefinitions.default.authors[0].name,
      );
      expect(metadata.openGraph).toEqual({
        title: `Theme: ${themeName} ${titleSuffix}`,
        description: themeDefinitions[themeName].description,
        images: [],
      });
    });

    it("should use theme-specific author when available", async () => {
      const customThemeName = "modern" as ThemeName;
      const customParams = Promise.resolve({ themeName: customThemeName });
      const metadata = await generateMetadata({ params: customParams });

      const expectedAuthor =
        themeDefinitions[customThemeName as ThemeName]?.authors[0].name ||
        themeDefinitions.default.authors[0].name;
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
