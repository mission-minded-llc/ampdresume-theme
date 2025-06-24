import { render, screen } from "@testing-library/react";

import { Project } from "@/types";
import { Projects } from "./Projects";
import { themeDefaultSampleData } from "@/theme/sampleData";

// Mock the child components
jest.mock("./ProjectAccordion", () => ({
  ProjectAccordion: ({ project }: { project: Project }) => (
    <div data-testid={`project-accordion-${project.id}`}>{project.name}</div>
  ),
}));

jest.mock("./ProjectItem", () => ({
  ProjectItem: ({ project }: { project: Project }) => (
    <div data-testid={`project-item-${project.id}`}>{project.name}</div>
  ),
}));

describe("Projects", () => {
  // Get sample projects from the sample data and ensure it's defined
  const company = themeDefaultSampleData.data.resume.companies[0];
  const position = company?.positions?.[0];
  const sampleProjects = position?.projects ?? [];

  beforeEach(() => {
    // Verify we have sample data to work with
    expect(sampleProjects.length).toBeGreaterThan(0);
  });

  it("renders ProjectAccordion for projects with descriptions", () => {
    render(<Projects projects={sampleProjects} />);

    // The first project in sample data has a description
    const projectWithDescription = sampleProjects[0];
    expect(
      screen.getByTestId(`project-accordion-${projectWithDescription.id}`),
    ).toBeInTheDocument();
    expect(screen.getByText(projectWithDescription.name)).toBeInTheDocument();
  });

  it("renders ProjectItem for projects without descriptions", () => {
    // Create a modified project without description
    const projectsWithoutDescription = [
      {
        ...sampleProjects[0],
        description: null,
      },
    ];

    render(<Projects projects={projectsWithoutDescription} />);

    expect(
      screen.getByTestId(`project-item-${projectsWithoutDescription[0].id}`),
    ).toBeInTheDocument();
    expect(screen.getByText(projectsWithoutDescription[0].name)).toBeInTheDocument();
  });

  it("renders multiple projects correctly", () => {
    // Mix of projects with and without descriptions
    const mixedProjects = [
      { ...sampleProjects[0] }, // with description
      { ...sampleProjects[0], id: "unique-test-id", description: null }, // without description
    ];

    render(<Projects projects={mixedProjects} />);

    // First project should be in an accordion
    expect(screen.getByTestId(`project-accordion-${mixedProjects[0].id}`)).toBeInTheDocument();

    // Second project should be a regular item
    expect(screen.getByTestId(`project-item-${mixedProjects[1].id}`)).toBeInTheDocument();
  });

  it("handles empty projects array", () => {
    const { container } = render(<Projects projects={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
