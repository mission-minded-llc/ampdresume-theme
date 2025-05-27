import { render, screen } from "@testing-library/react";

import { Company } from "@/types";
import { WorkExperience } from "./WorkExperience";
import { themeDefaultSampleData } from "@/theme/sampleData";

// Mock the child components
jest.mock("./PositionsList", () => ({
  PositionsList: ({ company }: { company: Company }) => (
    <div data-testid={`positions-list-${company.id}`}>
      {company.positions?.map((position) => <div key={position.id}>{position.title}</div>)}
    </div>
  ),
}));

jest.mock("../ResumeTitle", () => ({
  ResumeTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
}));

describe("WorkExperience", () => {
  const companies = themeDefaultSampleData.data.resume.companies;

  it("renders work experience section with companies", () => {
    render(<WorkExperience companies={companies} />);

    // Check if section title is rendered
    expect(screen.getByText("Work Experience")).toBeInTheDocument();

    // Check if company names are rendered
    expect(screen.getByText("Dataflow Systems")).toBeInTheDocument();
    expect(screen.getByText("CloudScale Technologies")).toBeInTheDocument();
    expect(screen.getByText("TechStart Inc.")).toBeInTheDocument();

    // Check if locations are rendered
    expect(screen.getByText(/San Francisco, CA/)).toBeInTheDocument();
    expect(screen.getByText(/Seattle, WA/)).toBeInTheDocument();
    expect(screen.getByText(/Austin, TX/)).toBeInTheDocument();

    // Check if dates are rendered correctly
    expect(screen.getByText(/January 2024 to Present/)).toBeInTheDocument();
    expect(screen.getByText(/January 2023 to January 2024/)).toBeInTheDocument();
    expect(screen.getByText(/January 2022 to January 2023/)).toBeInTheDocument();

    // Check if positions lists are rendered
    companies.forEach((company) => {
      expect(screen.getByTestId(`positions-list-${company.id}`)).toBeInTheDocument();
    });
  });

  it("renders empty state when no companies provided", () => {
    render(<WorkExperience companies={[]} />);

    // Should still render the section title
    expect(screen.getByText("Work Experience")).toBeInTheDocument();

    // But no company details
    expect(screen.queryByText("Dataflow Systems")).not.toBeInTheDocument();
  });
});
