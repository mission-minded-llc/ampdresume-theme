import { fireEvent, render, screen } from "@testing-library/react";

import { PDFView } from "./PDFView";
import html2pdf from "html2pdf.js";
import { themeDefaultSampleData } from "@/theme/sampleData";

// Mock html2pdf
jest.mock("html2pdf.js", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    outputPdf: jest.fn().mockReturnThis(),
    then: jest.fn((callback) => callback("mock-pdf-url")),
  })),
}));

// Mock window.open
const mockWindowOpen = jest.fn();
window.open = mockWindowOpen;

describe("PDFView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with Generate PDF button", () => {
    render(<PDFView themeName="default" />);
    expect(screen.getByText("Generate PDF")).toBeInTheDocument();
  });

  it("renders the default theme template", () => {
    render(<PDFView themeName="default" />);
    // Check for some content from the default theme template
    expect(screen.getByText(themeDefaultSampleData.data.resume.user.name!)).toBeInTheDocument();
  });

  it("generates PDF when clicking the Generate PDF button", () => {
    render(<PDFView themeName="default" />);
    const generateButton = screen.getByText("Generate PDF");

    fireEvent.click(generateButton);

    expect(html2pdf).toHaveBeenCalled();
    expect(mockWindowOpen).toHaveBeenCalledWith("mock-pdf-url", "_blank");
  });

  it("handles different theme names correctly", () => {
    render(<PDFView themeName="default" />);
    // Even with a non-default theme name, it should fall back to default theme
    expect(screen.getByText(themeDefaultSampleData.data.resume.user.name!)).toBeInTheDocument();
  });
});
