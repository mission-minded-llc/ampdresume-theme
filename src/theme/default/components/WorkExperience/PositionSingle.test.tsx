import { render, screen } from "@testing-library/react";

import { PositionSingle } from "./PositionSingle";
import { themeDefaultSampleData } from "@/theme/sampleData";

// Mock the useIsDesktop hook
jest.mock("@/hooks/useIsDesktop", () => ({
  useIsDesktop: () => true,
}));

describe("PositionSingle", () => {
  const sampleCompany = themeDefaultSampleData.data.resume.companies[0];
  if (!sampleCompany || !sampleCompany.positions?.[0]) {
    throw new Error("Sample data is missing required company or position data");
  }
  const samplePosition = sampleCompany.positions[0];

  it("renders position title and company details correctly", () => {
    render(<PositionSingle position={samplePosition} company={sampleCompany} showDates={true} />);

    // Check if position title is rendered
    expect(screen.getByText(samplePosition.title)).toBeInTheDocument();

    // Check if company name is rendered (initially hidden, shown when sticky)
    expect(screen.getByText(sampleCompany.name)).toBeInTheDocument();
  });

  it("renders dates when showDates is true", () => {
    render(<PositionSingle position={samplePosition} company={sampleCompany} showDates={true} />);

    // Since the sample position has a start date but no end date, it should show "Present"
    expect(screen.getByText(/to Present/)).toBeInTheDocument();
  });

  it("does not render dates when showDates is false", () => {
    render(<PositionSingle position={samplePosition} company={sampleCompany} showDates={false} />);

    // Verify that dates are not rendered
    expect(screen.queryByText(/to Present/)).not.toBeInTheDocument();
  });

  it("renders projects when they exist", () => {
    if (!samplePosition.projects?.[0]) {
      throw new Error("Sample data is missing required project data");
    }

    render(<PositionSingle position={samplePosition} company={sampleCompany} showDates={true} />);

    // Check if the first project is rendered
    expect(screen.getByText(samplePosition.projects[0].name)).toBeInTheDocument();
  });
});
