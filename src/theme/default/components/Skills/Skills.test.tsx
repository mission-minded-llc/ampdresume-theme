import { fireEvent, render, screen } from "@testing-library/react";
import { javascriptSkill, reactSkill, sampleSkills } from "./testUtils";

import { SkillForUser } from "@/types";
import { Skills } from "./Skills";

describe("Skills", () => {
  beforeAll(() => {
    // Mock the date to 2024 for consistent testing
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2024, 0, 1)); // January 1, 2024
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders the Skills component with experience layout by default", () => {
    render(<Skills skillType="user" skillsForUser={sampleSkills} />);

    // Check if title is rendered
    expect(screen.getByText("Skills")).toBeInTheDocument();

    // Check if both layout buttons are rendered
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Cloud")).toBeInTheDocument();

    // Check if skills are rendered in experience layout
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();

    // Check if years are displayed correctly (with mocked 2024 date)
    expect(screen.getByText("5 years:")).toBeInTheDocument(); // 2019 to 2024
    expect(screen.getByText("6 years:")).toBeInTheDocument(); // 2018 to 2024
  });

  it("toggles between experience and cloud layouts", () => {
    render(<Skills skillType="user" skillsForUser={[reactSkill, javascriptSkill]} />);

    // Initially in experience layout
    const cloudButton = screen.getByText("Cloud");
    const experienceButton = screen.getByText("Experience");

    // Switch to cloud layout
    fireEvent.click(cloudButton);
    expect(cloudButton).toHaveClass("MuiButton-colorPrimary");
    expect(experienceButton).toHaveClass("MuiButton-colorSecondary");

    // Switch back to experience layout
    fireEvent.click(experienceButton);
    expect(experienceButton).toHaveClass("MuiButton-colorPrimary");
    expect(cloudButton).toHaveClass("MuiButton-colorSecondary");
  });

  it("returns null when skillsForUser is not provided", () => {
    const { container } = render(
      <Skills skillType="user" skillsForUser={undefined as unknown as SkillForUser[]} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("handles invalid button clicks", () => {
    render(<Skills skillType="user" skillsForUser={[reactSkill, javascriptSkill]} />);

    // Create a fake click event with an invalid target
    const fakeEvent = {
      target: document.createElement("span"),
    };

    const experienceButton = screen.getByText("Experience");
    fireEvent.click(experienceButton, fakeEvent);

    // Layout should remain in experience mode
    expect(experienceButton).toHaveClass("MuiButton-colorPrimary");
  });
});
