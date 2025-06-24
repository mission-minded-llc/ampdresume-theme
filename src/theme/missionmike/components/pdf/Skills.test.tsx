import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { Skills } from "./Skills";
import { themeDefaultSampleData } from "@/theme/sampleData";

describe("Skills", () => {
  const sampleSkills = themeDefaultSampleData.data.resume.skillsForUser;

  it("renders skills section title", () => {
    render(<Skills skillsForUser={sampleSkills} />);
    expect(screen.getByText("Skills")).toBeInTheDocument();
  });

  it("groups skills by years of experience", () => {
    render(<Skills skillsForUser={sampleSkills} />);

    // Get current year to calculate years of experience
    const currentYear = new Date().getFullYear();

    // Find skills with different years of experience
    const reactReduxSkill = sampleSkills.find((s) => s.skill.name === "React Redux");
    if (!reactReduxSkill) throw new Error("React Redux skill not found in sample data");
    const reactReduxYears = currentYear - (reactReduxSkill.yearStarted as number);
    const cssSkill = sampleSkills.find((s) => s.skill.name === "CSS");
    if (!cssSkill) throw new Error("CSS skill not found in sample data");
    const cssYears = currentYear - (cssSkill.yearStarted as number);

    // Check for React's experience
    expect(screen.getByText(`${reactReduxYears} years:`)).toBeInTheDocument();
    expect(screen.getByText(/React Redux/)).toBeInTheDocument();

    // Check for TypeScript's experience
    expect(screen.getByText(`${cssYears} years:`)).toBeInTheDocument();
    expect(screen.getByText(/CSS/)).toBeInTheDocument();
  });

  it("handles empty skills array", () => {
    render(<Skills skillsForUser={[]} />);
    expect(screen.getByText("Skills")).toBeInTheDocument();
    // Should still render the section title but no skills
  });

  it("renders skills in maroon color", () => {
    render(<Skills skillsForUser={sampleSkills} />);
    const skillElements = screen.getAllByText(/React|TypeScript|Python/);

    skillElements.forEach((element) => {
      expect(element).toHaveStyle({ color: "rgb(128, 0, 0)" });
    });
  });

  it("adds comma after each skill except the last one in a group", () => {
    render(<Skills skillsForUser={sampleSkills} />);

    // Get current year to find skills from the same year
    const currentYear = new Date().getFullYear();
    const sameYearSkills = sampleSkills
      .filter((s) => s.yearStarted === currentYear)
      .map((s) => s.skill.name);

    if (sameYearSkills.length > 1) {
      // First skill in the group should have a comma
      expect(screen.getByText(`${sameYearSkills[0]},`)).toBeInTheDocument();

      // Last skill in the group should not have a comma
      const lastSkill = sameYearSkills[sameYearSkills.length - 1];
      expect(screen.getByText(lastSkill)).toBeInTheDocument();
      expect(screen.queryByText(`${lastSkill},`)).not.toBeInTheDocument();
    }
  });
});
