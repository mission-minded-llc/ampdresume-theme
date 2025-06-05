import { render, screen } from "@testing-library/react";

import { Education } from "./Education";
import type { Education as EducationType } from "@/types";
import { formatLongDate } from "@/lib/format";
import { themeDefaultSampleData } from "@/theme/sampleData";

describe("Education Component", () => {
  const sampleEducation = themeDefaultSampleData.data.resume.education;

  it("renders education section title", () => {
    render(<Education education={sampleEducation} />);
    expect(screen.getByText("Education")).toBeInTheDocument();
  });

  it("groups education by school", () => {
    render(<Education education={sampleEducation} />);

    // Should show the school
    expect(screen.getByText("University of California, Berkeley")).toBeInTheDocument();

    // Should show the degree
    expect(screen.getByText(/B.S. Computer Science/)).toBeInTheDocument();
  });

  it("formats dates correctly", () => {
    render(<Education education={sampleEducation} />);

    sampleEducation.forEach((edu) => {
      const formattedDate = formatLongDate(edu.dateAwarded);
      expect(screen.getByText(new RegExp(formattedDate))).toBeInTheDocument();
    });
  });

  it("handles empty education array", () => {
    render(<Education education={[]} />);
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
  });

  it("handles education entries without school name", () => {
    const invalidEducation: EducationType[] = [
      {
        id: "4",
        school: "",
        degree: "Invalid Degree",
        dateAwarded: "2023-05-15",
      },
    ];

    render(<Education education={invalidEducation} />);
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.queryByText("Invalid Degree")).not.toBeInTheDocument();
  });
});
