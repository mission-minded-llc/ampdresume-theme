import RootLayout from "./layout";
import { render } from "@testing-library/react";

// Mock the next/font/local module
jest.mock("next/font/local", () => ({
  __esModule: true,
  default: () => ({
    variable: "mocked-font-class",
  }),
}));

// Mock the GoogleTagManager component
jest.mock("@next/third-parties/google", () => ({
  GoogleTagManager: jest.fn(() => null),
}));

// Mock the ThemeAppearanceProvider component
jest.mock("./components/ThemeContext", () => ({
  ThemeAppearanceProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the Layout component
jest.mock("./components/Layout", () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  ),
}));

describe("RootLayout", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("renders the layout with children", () => {
    const { container, getByTestId } = render(
      <RootLayout>
        <div data-testid="child">Test Child</div>
      </RootLayout>,
    );

    // Check if the html element has the correct language
    expect(container.querySelector("html")).toHaveAttribute("lang", "en");

    // Check if the body has the font classes
    expect(container.querySelector("body")).toHaveClass("mocked-font-class", "mocked-font-class");

    // Check if the layout component is rendered
    expect(getByTestId("layout")).toBeInTheDocument();

    // Check if children are rendered
    expect(getByTestId("child")).toBeInTheDocument();
    expect(getByTestId("child")).toHaveTextContent("Test Child");
  });

  it("renders GoogleTagManager when GTM_ID is present", () => {
    process.env.GTM_ID = "GTM-TEST";
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );

    // Check if meta viewport tag is present
    const metaViewport = container.querySelector('meta[name="viewport"]');
    expect(metaViewport).toHaveAttribute("content", "initial-scale=1, width=device-width");
  });

  it("does not render GoogleTagManager when GTM_ID is not present", () => {
    process.env.GTM_ID = undefined;
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );

    // Check if meta viewport tag is still present
    const metaViewport = container.querySelector('meta[name="viewport"]');
    expect(metaViewport).toHaveAttribute("content", "initial-scale=1, width=device-width");
  });
});
