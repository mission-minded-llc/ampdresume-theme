import { render, screen } from "@testing-library/react";

import { RichTextBlock } from "./RichTextBlock";

describe("RichTextBlock", () => {
  it("should render null when content is null", () => {
    const { container } = render(<RichTextBlock content={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render plain text content when parsing fails", () => {
    const content = "Hello World";
    render(<RichTextBlock content={content} />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("should render HTML content when valid", () => {
    const content = "<p>Hello <strong>World</strong></p>";
    render(<RichTextBlock content={content} />);
    expect(screen.getByText("World")).toHaveStyle("font-weight: bold");
  });

  it("should render images with correct styles", () => {
    const content = '<img src="test.jpg" alt="test" />';
    const { container } = render(<RichTextBlock content={content} />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveStyle({
      maxWidth: "100%",
      height: "auto",
    });
  });
});
