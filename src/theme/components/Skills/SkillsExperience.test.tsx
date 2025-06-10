import { javascriptSkill, reactSkill } from "./testUtils";
import { render, screen } from "@testing-library/react";

import { SkillForUser } from "@/types";
import { SkillsExperience } from "./SkillsExperience";

describe("SkillsExperience", () => {
  beforeAll(() => {
    // Mock the date to 2024 for consistent testing
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2024, 0, 1)); // January 1, 2024
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders skills grouped by years of experience", () => {
    render(<SkillsExperience skills={[reactSkill, javascriptSkill]} />);

    // Check if skills are rendered
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();

    // Check if years are displayed correctly (with mocked 2024 date)
    expect(screen.getByText("5 years:")).toBeInTheDocument(); // 2019 to 2024
    expect(screen.getByText("6 years:")).toBeInTheDocument(); // 2018 to 2024
  });

  it("handles skills with no year started but with totalYears specified", () => {
    const skillWithTotalYears: SkillForUser = {
      ...reactSkill,
      yearStarted: null,
      totalYears: 3,
    };

    render(<SkillsExperience skills={[skillWithTotalYears]} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("3 years:")).toBeInTheDocument();
  });

  it("handles empty skills array", () => {
    const { container } = render(<SkillsExperience skills={[]} />);

    // The component should render an empty grid
    const grid = container.firstChild;
    expect(grid).toBeEmptyDOMElement();
  });

  it("displays singular 'year' for 1 year of experience", () => {
    const oneYearSkill: SkillForUser = {
      ...reactSkill,
      yearStarted: null,
      totalYears: 1,
    };

    render(<SkillsExperience skills={[oneYearSkill]} />);

    expect(screen.getByText("1 year:")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });
});
