import { render, screen } from "@testing-library/react";

import { SkillForUser } from "@/types";
import { SkillsCloud } from "./SkillsCloud";

const mockSkills: SkillForUser[] = [
  {
    id: "1",
    userId: "user1",
    skill: {
      id: "skill1",
      name: "React",
      icon: "devicon:react",
    },
    icon: null,
    description: "Building responsive, accessible component-based UIs",
    yearStarted: 2019,
    totalYears: null,
  },
  {
    id: "2",
    userId: "user1",
    skill: {
      id: "skill2",
      name: "JavaScript",
      icon: "logos:javascript",
    },
    icon: null,
    description: "Modern ES6+ JavaScript",
    yearStarted: 2018,
    totalYears: null,
  },
];

describe("SkillsCloud", () => {
  it("renders all skills in a cloud layout", () => {
    render(<SkillsCloud skills={mockSkills} />);

    // Check if all skills are rendered
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("handles empty skills array", () => {
    const { container } = render(<SkillsCloud skills={[]} />);

    // The Box component should be rendered but empty
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild?.childNodes.length).toBe(0);
  });

  it("handles skills with missing names", () => {
    const skillsWithMissingName: SkillForUser[] = [
      {
        id: "3",
        userId: "user1",
        skill: {
          id: "skill3",
          name: "", // Empty name
          icon: "devicon:typescript",
        },
        icon: null,
        description: "TypeScript development",
        yearStarted: 2020,
        totalYears: null,
      },
      ...mockSkills,
    ];

    render(<SkillsCloud skills={skillsWithMissingName} />);

    // Should only render skills with valid names
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.queryByTestId("skill-")).not.toBeInTheDocument();
  });

  it("handles null or undefined skill objects", () => {
    const skillsWithNull = [null, undefined, ...mockSkills].filter(
      (skill): skill is SkillForUser => skill !== null && skill !== undefined,
    );

    render(<SkillsCloud skills={skillsWithNull} />);

    // Should only render valid skills
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });
});
