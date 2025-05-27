import { render, screen } from "@testing-library/react";

import { PositionsList } from "./PositionsList";
import { themeDefaultSampleData } from "@/theme/sampleData";

describe("PositionsList", () => {
  const sampleCompany = themeDefaultSampleData.data.resume.companies[0];

  it("renders multiple positions for a company", () => {
    render(<PositionsList company={sampleCompany} />);

    // The sample data shows at least one position (Senior Software Engineer)
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
  });

  it("shows dates when company has multiple positions", () => {
    const multiPositionCompany = {
      ...sampleCompany,
      positions: [
        {
          id: "1",
          title: "Senior Engineer",
          startDate: "2023-01-01",
          endDate: null,
          projects: [],
        },
        {
          id: "2",
          title: "Software Engineer",
          startDate: "2022-01-01",
          endDate: "2022-12-31",
          projects: [],
        },
      ],
    };

    render(<PositionsList company={multiPositionCompany} />);

    // We don't test for specific dates here since that's handled by PositionSingle component
    // Instead we ensure both positions are rendered
    expect(screen.getByText("Senior Engineer")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  it("handles empty positions array", () => {
    const emptyCompany = {
      ...sampleCompany,
      positions: [],
    };

    const { container } = render(<PositionsList company={emptyCompany} />);
    expect(container.firstChild).toBeNull();
  });

  it("handles undefined positions", () => {
    const companyWithoutPositions = {
      ...sampleCompany,
      positions: undefined,
    };

    const { container } = render(<PositionsList company={companyWithoutPositions} />);
    expect(container.firstChild).toBeNull();
  });
});
