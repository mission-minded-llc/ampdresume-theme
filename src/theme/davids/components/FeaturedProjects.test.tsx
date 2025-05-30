import { ThemeProvider, createTheme } from "@mui/material";
import { render, screen } from "@testing-library/react";

import { FeaturedProject } from "@/types";
import { FeaturedProjects } from "./FeaturedProjects";

// TODO: Use the sample data for this after it's added to the sample data file.
const sampleProjects: FeaturedProject[] = [
  {
    name: "NextGen Platform Migration",
    techStack: "Kubernetes, AWS, TypeScript",
    description: [
      "Led migration of legacy systems to a scalable cloud-native platform",
      "Implemented CI/CD pipelines for automated deployments",
    ],
    metrics: "Reduced deployment time by 60%",
    links: [
      { label: "GitHub", url: "https://github.com/test/project" },
      { label: "Demo", url: "https://demo.test.com" },
    ],
    skillsForProject: [
      {
        id: "1",
        description: "Implemented cloud infrastructure",
        skillForUser: {
          id: "1",
          userId: "1",
          skill: { id: "1", name: "AWS", icon: null },
          icon: null,
          description: "Cloud infrastructure expert",
          yearStarted: 2016,
          totalYears: 8,
        },
      },
    ],
  },
];

// Mock the theme
const theme = createTheme();

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("FeaturedProjects", () => {
  it("renders project name and tech stack", () => {
    renderWithTheme(<FeaturedProjects projects={sampleProjects} />);

    expect(screen.getByText("NextGen Platform Migration")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes, AWS, TypeScript")).toBeInTheDocument();
  });

  it("renders project description points", () => {
    renderWithTheme(<FeaturedProjects projects={sampleProjects} />);

    expect(
      screen.getByText("Led migration of legacy systems to a scalable cloud-native platform"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Implemented CI/CD pipelines for automated deployments"),
    ).toBeInTheDocument();
  });

  it("renders project metrics if provided", () => {
    renderWithTheme(<FeaturedProjects projects={sampleProjects} />);

    expect(screen.getByText("Reduced deployment time by 60%")).toBeInTheDocument();
  });

  it("renders project links if provided", () => {
    renderWithTheme(<FeaturedProjects projects={sampleProjects} />);

    const githubLink = screen.getByText("GitHub");
    const demoLink = screen.getByText("Demo");

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/test/project");
    expect(demoLink).toBeInTheDocument();
    expect(demoLink).toHaveAttribute("href", "https://demo.test.com");
  });

  it("renders project skills if provided", () => {
    renderWithTheme(<FeaturedProjects projects={sampleProjects} />);

    expect(screen.getByText("AWS")).toBeInTheDocument();
  });

  it("handles empty projects array", () => {
    renderWithTheme(<FeaturedProjects projects={[]} />);

    const container = screen.getByTestId("featured-projects");
    expect(container).toBeEmptyDOMElement();
  });
});
