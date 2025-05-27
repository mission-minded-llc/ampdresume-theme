import { ThemeProvider, createTheme } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";

import { Project } from "@/types";
import { ProjectAccordion } from "./ProjectAccordion";
import sampleData from "../../../sampleData.json";

const theme = createTheme();

describe("ProjectAccordion", () => {
  const renderWithTheme = (project: Project) => {
    return render(
      <ThemeProvider theme={theme}>
        <ProjectAccordion project={project} />
      </ThemeProvider>,
    );
  };

  // Using real sample data from the project
  const sampleProject = sampleData.data.resume.companies[0].positions[0].projects[0];

  const getAccordionButton = () => {
    return screen.getByRole("button", {
      name: new RegExp(sampleProject.name),
    });
  };

  it("should render project name in collapsed state", () => {
    renderWithTheme(sampleProject);
    expect(
      screen.getByText(
        "Transformed monolithic architecture into scalable microservices for business-critical applications",
      ),
    ).toBeInTheDocument();
  });

  it("should expand and show description when clicked", () => {
    renderWithTheme(sampleProject);

    // Find and click the accordion summary
    const accordionSummary = getAccordionButton();
    fireEvent.click(accordionSummary);

    // Check if the description is now visible
    expect(
      screen.getByText(
        /Spearheaded a transformative initiative to decompose a monolithic application into a robust microservices architecture/,
      ),
    ).toBeInTheDocument();
  });

  it("should remain expanded when dialog or button is clicked", () => {
    renderWithTheme(sampleProject);

    // First expand the accordion
    const accordionSummary = getAccordionButton();
    fireEvent.click(accordionSummary);

    // Simulate a button click inside the accordion
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });

    const button = document.createElement("button");
    button.className = "MuiButton-root";
    Object.defineProperty(event, "target", { value: button });

    fireEvent(accordionSummary, event);

    // Description should still be visible
    expect(
      screen.getByText(
        /Spearheaded a transformative initiative to decompose a monolithic application into a robust microservices architecture/,
      ),
    ).toBeInTheDocument();
  });

  it("should handle projects without description", () => {
    const projectWithoutDescription = {
      ...sampleProject,
      description: null,
    };

    renderWithTheme(projectWithoutDescription);

    // Expand the accordion
    const accordionSummary = getAccordionButton();
    fireEvent.click(accordionSummary);

    // The accordion details should still render without errors
    const accordionDetails = screen.getByRole("region");
    expect(accordionDetails).toBeInTheDocument();
  });
});
