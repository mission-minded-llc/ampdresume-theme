import Page, { generateMetadata } from "./page";
import { themeDefinitions, titleSuffix } from "@/constants";

import { ThemeName } from "@/types";
import { render } from "@testing-library/react";

// Mock the PDFView component since we don't need to test its implementation
jest.mock("../PDFView", () => ({
  PDFView: ({ themeName }: { themeName: ThemeName }) => (
    <div data-testid="pdf-view">PDF View for {themeName}</div>
  ),
}));

describe("PDF Theme Page", () => {
  const mockParams = Promise.resolve({ themeName: "default" as ThemeName });

  describe("Page component", () => {
    it("renders PDFView with correct theme name", async () => {
      const { getByTestId } = render(await Page({ params: mockParams }));
      const pdfView = getByTestId("pdf-view");
      expect(pdfView).toHaveTextContent("PDF View for default");
    });
  });

  describe("generateMetadata", () => {
    it("generates correct metadata for default theme", async () => {
      const metadata = await generateMetadata({ params: mockParams });

      expect(metadata).toEqual({
        title: `PDF Theme: default ${titleSuffix}`,
        description: "This is the default theme for Amp'd Resume.",
        authors: themeDefinitions.default.authors.map((author) => ({
          name: author.name,
          url: author.gitHubUrl || author.linkedInUrl || "",
        })),
        openGraph: {
          title: `PDF Theme: default ${titleSuffix}`,
          description: "This is the default theme for Amp'd Resume.",
          images: [],
        },
      });
    });

    it("generates correct metadata for custom theme with author", async () => {
      const customThemeParams = Promise.resolve({ themeName: "davids" as ThemeName });
      const metadata = await generateMetadata({ params: customThemeParams });

      expect(metadata).toEqual({
        title: `PDF Theme: davids ${titleSuffix}`,
        description: "This is the davids theme for Amp'd Resume.",
        authors: [
          {
            name: themeDefinitions.davids.authors[0].name,
            url: themeDefinitions.davids.authors[0].gitHubUrl,
          },
        ],
        openGraph: {
          title: `PDF Theme: davids ${titleSuffix}`,
          description: "This is the davids theme for Amp'd Resume.",
          images: [],
        },
      });
    });
  });
});
