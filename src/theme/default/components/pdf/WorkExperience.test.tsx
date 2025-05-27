import { render, screen } from "@testing-library/react";

import { WorkExperience } from "./WorkExperience";
import { themeDefaultSampleData } from "@/theme/sampleData";

describe("WorkExperience", () => {
  const companies = themeDefaultSampleData.data.resume.companies;

  it("renders work experience section with company details", () => {
    render(<WorkExperience companies={companies} showSkills={false} />);

    // Check if section title is rendered
    expect(screen.getByText("Work Experience")).toBeInTheDocument();

    // Check if company name is rendered
    expect(screen.getByText("Dataflow Systems")).toBeInTheDocument();

    // Check if company location is rendered
    expect(screen.getByText("- San Francisco, CA")).toBeInTheDocument();

    // Check if position title is rendered
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();

    // Check if project details are rendered
    expect(
      screen.getByText(/Transformed monolithic architecture into scalable microservices/),
    ).toBeInTheDocument();
  });

  it("shows skills when showSkills is true", () => {
    render(<WorkExperience companies={companies} showSkills={true} />);

    const firstProject = screen.getByTestId("company-0-position-0-project-0");
    expect(firstProject).toHaveTextContent("TypeScript, Node.js");
  });

  it("hides skills when showSkills is false", () => {
    render(<WorkExperience companies={companies} showSkills={false} />);
    const firstProject = screen.getByTestId("company-0-position-0-project-0");
    expect(firstProject).not.toHaveTextContent("TypeScript, Node.js");
  });

  it("handles empty companies array", () => {
    render(<WorkExperience companies={[]} showSkills={false} />);

    // Should still render the section title
    expect(screen.getByText("Work Experience")).toBeInTheDocument();

    // But no company details
    expect(screen.queryByText("Dataflow Systems")).not.toBeInTheDocument();
  });
});
