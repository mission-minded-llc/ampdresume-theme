import { render, screen } from "@testing-library/react";

import { ResumeView } from "./ResumeView";
import { ThemeAppearanceContext } from "@/app/components/ThemeContext";
import { ThemeName } from "@/types";
import { themeDefaultSampleData } from "@/theme/sampleData";

// Mock the ThemeDefault component
jest.mock("@/theme", () => ({
  ThemeDefault: jest.fn(
    ({ themeAppearance, user, socials, skillsForUser, companies, education }) => (
      <div data-testid="theme-default">
        <div data-testid="theme-appearance">{themeAppearance}</div>
        <div data-testid="user-name">{user.name}</div>
        <div data-testid="socials-count">{socials.length}</div>
        <div data-testid="skills-count">{skillsForUser.length}</div>
        <div data-testid="companies-count">{companies.length}</div>
        <div data-testid="education-count">{education.length}</div>
      </div>
    ),
  ),
}));

describe("ResumeView", () => {
  const mockThemeAppearance = "light";
  const defaultProps = {
    themeName: "default" as const,
  };

  const renderComponent = (props = defaultProps) => {
    return render(
      <ThemeAppearanceContext.Provider
        value={{
          themeAppearance: mockThemeAppearance,
          setThemeAppearance: jest.fn(),
        }}
      >
        <ResumeView {...props} />
      </ThemeAppearanceContext.Provider>,
    );
  };

  it("should render ThemeDefault component with correct props", () => {
    renderComponent();

    expect(screen.getByTestId("theme-default")).toBeInTheDocument();
    expect(screen.getByTestId("theme-appearance")).toHaveTextContent(mockThemeAppearance || "");
    expect(screen.getByTestId("user-name")).toHaveTextContent(
      themeDefaultSampleData.data.resume.user.name || "",
    );
    expect(screen.getByTestId("socials-count")).toHaveTextContent(
      String(themeDefaultSampleData.data.resume.socials.length),
    );
    expect(screen.getByTestId("skills-count")).toHaveTextContent(
      String(themeDefaultSampleData.data.resume.skillsForUser.length),
    );
    expect(screen.getByTestId("companies-count")).toHaveTextContent(
      String(themeDefaultSampleData.data.resume.companies.length),
    );
    expect(screen.getByTestId("education-count")).toHaveTextContent(
      String(themeDefaultSampleData.data.resume.education.length),
    );
  });

  it("should render ThemeDefault component for unknown theme name", () => {
    renderComponent({ themeName: "unknown" as ThemeName });

    expect(screen.getByTestId("theme-default")).toBeInTheDocument();
  });
});
