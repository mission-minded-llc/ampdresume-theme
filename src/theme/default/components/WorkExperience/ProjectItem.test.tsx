import { ThemeProvider, createTheme } from "@mui/material";
import { render, screen } from "@testing-library/react";

import { Project } from "@/types";
import { ProjectItem } from "./ProjectItem";
import sampleData from "../../../sampleData.json";

const theme = createTheme();

describe("ProjectItem", () => {
  const renderWithTheme = (project: Project) => {
    return render(
      <ThemeProvider theme={theme}>
        <ProjectItem project={project} />
      </ThemeProvider>,
    );
  };

  // Using real sample data from the project
  const projectWithSkills = sampleData.data.resume.companies[0].positions[0].projects[0];
  const projectWithoutSkills = {
    id: "test-project-no-skills",
    name: "Project Without Skills",
    description: null,
    sortIndex: 0,
    skillsForProject: [],
  };

  it("should render project name correctly", () => {
    renderWithTheme(projectWithSkills);
    expect(
      screen.getByText(
        "Transformed monolithic architecture into scalable microservices for business-critical applications",
      ),
    ).toBeInTheDocument();
  });

  it("should render skills when they are provided", () => {
    renderWithTheme(projectWithSkills);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("should use single column layout when no skills are provided", () => {
    const { container } = renderWithTheme(projectWithoutSkills);
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveStyle({
      gridTemplateColumns: "1fr",
    });
  });

  it("should use two column layout when skills are provided", () => {
    const { container } = renderWithTheme(projectWithSkills);
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveStyle({
      gridTemplateColumns: "60% 1fr",
    });
  });
});
