import { render, screen } from "@testing-library/react";

import { ThemeDefaultPDF } from "./ThemeDefaultPDF";
import { themeDefaultSampleData } from "../sampleData";

describe("ThemeDefaultPDF", () => {
  const mockData = themeDefaultSampleData.data.resume;

  it("renders all sections with sample data", () => {
    render(
      <ThemeDefaultPDF
        user={mockData.user}
        skillsForUser={mockData.skillsForUser}
        companies={mockData.companies}
        education={mockData.education}
      />,
    );

    // Check if user's name is rendered in the header
    if (mockData.user.name) {
      expect(screen.getByText(mockData.user.name)).toBeInTheDocument();
    }

    // Check if user's title is rendered
    if (mockData.user.title) {
      expect(screen.getByText(mockData.user.title)).toBeInTheDocument();
    }

    // Check if skills section is rendered
    mockData.skillsForUser.forEach((skillForUser) => {
      // Use a regex to match the skill name with or without a trailing comma
      const elements = screen.getAllByText(new RegExp(`^${skillForUser.skill.name}[,]?$`));
      expect(elements.length).toBeGreaterThan(0);
    });

    // Check if work experience section is rendered
    mockData.companies.forEach((company) => {
      expect(screen.getByText(company.name)).toBeInTheDocument();
    });

    // Check if education section is rendered
    mockData.education.forEach((edu) => {
      expect(screen.getByText(edu.school)).toBeInTheDocument();
    });
  });

  it("respects showSkillsInWorkExperience theme option", () => {
    // First render with skills shown
    const { rerender } = render(
      <ThemeDefaultPDF
        user={mockData.user}
        skillsForUser={mockData.skillsForUser}
        companies={mockData.companies}
        education={mockData.education}
        themeOptions={{ showSkillsInWorkExperience: true }}
      />,
    );

    // Get initial count of a skill that appears in work experience
    const skillName = mockData.skillsForUser[0].skill.name;
    const initialSkillCount = screen.getAllByText(new RegExp(`^${skillName}[,]?$`)).length;

    // Rerender with skills hidden
    rerender(
      <ThemeDefaultPDF
        user={mockData.user}
        skillsForUser={mockData.skillsForUser}
        companies={mockData.companies}
        education={mockData.education}
        themeOptions={{ showSkillsInWorkExperience: false }}
      />,
    );

    // Should find fewer instances of the skill when hidden from work experience
    const hiddenSkillCount = screen.getAllByText(new RegExp(`^${skillName}[,]?$`)).length;
    expect(hiddenSkillCount).toBeLessThan(initialSkillCount);
  });
});
