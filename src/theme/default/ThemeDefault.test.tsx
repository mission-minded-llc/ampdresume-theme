import { render, screen } from "@testing-library/react";

import { ThemeAppearance } from "@/types";
import { ThemeDefault } from "./ThemeDefault";
import { themeDefaultSampleData } from "../sampleData";

describe("ThemeDefault", () => {
  const mockProps = {
    themeAppearance: "light" as ThemeAppearance,
    user: themeDefaultSampleData.data.resume.user,
    socials: themeDefaultSampleData.data.resume.socials,
    skillsForUser: themeDefaultSampleData.data.resume.skillsForUser,
    companies: themeDefaultSampleData.data.resume.companies,
    education: themeDefaultSampleData.data.resume.education || [],
  };

  it("renders all main sections when data is provided", () => {
    render(<ThemeDefault {...mockProps} />);

    // Check if user name is rendered
    const userName = mockProps.user.name;
    if (userName) {
      expect(screen.getByRole("heading", { name: new RegExp(userName, "i") })).toBeInTheDocument();
    }

    // Check if skills section is rendered
    expect(screen.getByRole("heading", { name: /skills/i })).toBeInTheDocument();
    expect(screen.getAllByText("CSS").length).toBeGreaterThan(0);
    expect(screen.getAllByText("JavaScript").length).toBeGreaterThan(0);

    // Check if work experience section is rendered
    const companyHeading = screen.getByRole("heading", {
      name: new RegExp(`${mockProps.companies[0].name}.*${mockProps.companies[0].location}`, "i"),
    });
    expect(companyHeading).toBeInTheDocument();

    // Check if social links are rendered by checking their href attributes
    mockProps.socials.forEach((social) => {
      if (social.platform === "github") {
        expect(
          screen.getByText("", { selector: `a[href="https://github.com/${social.ref}"]` }),
        ).toBeInTheDocument();
      } else if (social.platform === "linkedin") {
        expect(
          screen.getByText("", { selector: `a[href="https://www.linkedin.com/in/${social.ref}"]` }),
        ).toBeInTheDocument();
      }
    });
  });

  it("does not render optional sections when data is empty", () => {
    const propsWithEmptyData = {
      ...mockProps,
      skillsForUser: [],
      companies: [],
      education: [],
    };

    render(<ThemeDefault {...propsWithEmptyData} />);

    // Skills section should not be rendered
    expect(screen.queryByRole("heading", { name: /skills/i })).not.toBeInTheDocument();
    expect(screen.queryByText("CSS")).not.toBeInTheDocument();

    // Work experience section should not be rendered
    expect(screen.queryByText("Dataflow Systems")).not.toBeInTheDocument();
  });
});
