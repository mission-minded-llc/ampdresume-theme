import { render, screen } from "@testing-library/react";

import { SkillForUser } from "@/types";
import { SkillsExperience } from "./SkillsExperience";

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
    description: "Building responsive UIs",
    yearStarted: 2019,
    totalYears: null,
  },
  {
    id: "2",
    userId: "user1",
    skill: {
      id: "skill2",
      name: "TypeScript",
      icon: "devicon:typescript",
    },
    icon: null,
    description: "Type-safe development",
    yearStarted: 2020,
    totalYears: null,
  },
  {
    id: "3",
    userId: "user1",
    skill: {
      id: "skill3",
      name: "Python",
      icon: "devicon:python",
    },
    icon: null,
    description: "Backend development",
    yearStarted: null,
    totalYears: 5,
  },
];

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
    render(<SkillsExperience skills={mockSkills} />);

    // Check if skills are rendered
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();

    // Check if years are displayed correctly (with mocked 2024 date)
    expect(screen.getByText("5 years:")).toBeInTheDocument(); // From totalYears override
    expect(screen.getByText("4 years:")).toBeInTheDocument(); // 2020 to 2024
    expect(screen.getByText("5 years:")).toBeInTheDocument(); // 2019 to 2024
  });

  it("handles skills with no year started but with totalYears specified", () => {
    const skillsWithNoYear: SkillForUser[] = [
      {
        id: "4",
        userId: "user1",
        skill: {
          id: "skill4",
          name: "Docker",
          icon: "devicon:docker",
        },
        icon: null,
        description: "Containerization",
        yearStarted: null,
        totalYears: 3,
      },
    ];

    render(<SkillsExperience skills={skillsWithNoYear} />);

    expect(screen.getByText("Docker")).toBeInTheDocument();
    expect(screen.getByText("3 years:")).toBeInTheDocument();
  });

  it("handles empty skills array", () => {
    const { container } = render(<SkillsExperience skills={[]} />);

    // The component should render an empty grid
    const grid = container.firstChild;
    expect(grid).toBeEmptyDOMElement();
  });

  it("displays singular 'year' for 1 year of experience", () => {
    const oneYearSkill: SkillForUser[] = [
      {
        id: "5",
        userId: "user1",
        skill: {
          id: "skill5",
          name: "AWS",
          icon: "devicon:aws",
        },
        icon: null,
        description: "Cloud services",
        yearStarted: null,
        totalYears: 1,
      },
    ];

    render(<SkillsExperience skills={oneYearSkill} />);

    expect(screen.getByText("1 year:")).toBeInTheDocument();
    expect(screen.getByText("AWS")).toBeInTheDocument();
  });
});
