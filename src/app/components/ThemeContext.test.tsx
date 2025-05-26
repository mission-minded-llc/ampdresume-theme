import { ThemeAppearanceContext, ThemeAppearanceProvider } from "./ThemeContext";
import { act, render } from "@testing-library/react";

import React from "react";

// Setup matchMedia mock
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("ThemeAppearanceProvider", () => {
  let matchMediaMock: jest.SpyInstance;

  beforeEach(() => {
    // Mock matchMedia for each test
    matchMediaMock = jest.spyOn(window, "matchMedia");
  });

  afterEach(() => {
    matchMediaMock.mockRestore();
  });

  it("should initialize with light theme by default", () => {
    // Mock matchMedia to return light theme preference
    matchMediaMock.mockImplementation(() => ({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const TestComponent = () => {
      const { themeAppearance } = React.useContext(ThemeAppearanceContext);
      return <div data-testid="theme">{themeAppearance}</div>;
    };

    const { getByTestId } = render(
      <ThemeAppearanceProvider>
        <TestComponent />
      </ThemeAppearanceProvider>,
    );

    expect(getByTestId("theme").textContent).toBe("light");
  });

  it("should switch to dark theme when system preference is dark", () => {
    // Mock matchMedia to return dark theme preference
    matchMediaMock.mockImplementation(() => ({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const TestComponent = () => {
      const { themeAppearance } = React.useContext(ThemeAppearanceContext);
      return <div data-testid="theme">{themeAppearance}</div>;
    };

    const { getByTestId } = render(
      <ThemeAppearanceProvider>
        <TestComponent />
      </ThemeAppearanceProvider>,
    );

    expect(getByTestId("theme").textContent).toBe("dark");
  });

  it("should respond to system theme changes", () => {
    let mediaQueryCallback: ((e: { matches: boolean }) => void) | null = null;

    // Mock matchMedia with event listener handling
    matchMediaMock.mockImplementation(() => ({
      matches: false,
      addEventListener: (_: string, callback: (e: { matches: boolean }) => void) => {
        mediaQueryCallback = callback;
      },
      removeEventListener: jest.fn(),
    }));

    const TestComponent = () => {
      const { themeAppearance } = React.useContext(ThemeAppearanceContext);
      return <div data-testid="theme">{themeAppearance}</div>;
    };

    const { getByTestId } = render(
      <ThemeAppearanceProvider>
        <TestComponent />
      </ThemeAppearanceProvider>,
    );

    expect(getByTestId("theme").textContent).toBe("light");

    // Simulate system theme change to dark
    act(() => {
      if (mediaQueryCallback) {
        mediaQueryCallback({ matches: true });
      }
    });

    expect(getByTestId("theme").textContent).toBe("dark");
  });
});
