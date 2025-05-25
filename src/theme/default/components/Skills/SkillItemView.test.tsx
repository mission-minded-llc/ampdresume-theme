import { ThemeProvider, createTheme } from "@mui/material";
import { render, screen } from "@testing-library/react";

import { SkillForUser } from "@/types";
import { SkillItemView } from "./SkillItemView";
import sampleData from "../../../sampleData.json";

const theme = createTheme();

describe("SkillItemView", () => {
  const sampleSkill = sampleData.data.resume.skillsForUser[0] as SkillForUser; // CSS skill

  const renderWithTheme = (skill: SkillForUser) => {
    return render(
      <ThemeProvider theme={theme}>
        <SkillItemView skill={skill} />
      </ThemeProvider>,
    );
  };

  it("should render skill description when provided", () => {
    renderWithTheme(sampleSkill);
    expect(screen.getByText(sampleSkill.description!)).toBeInTheDocument();
  });

  it("should not render anything when description is missing", () => {
    const skillWithoutDescription = {
      ...sampleSkill,
      description: null,
    };
    const { container } = renderWithTheme(skillWithoutDescription);
    expect(container.firstChild).toBeNull();
  });

  it("should render with correct CSS class", () => {
    renderWithTheme(sampleSkill);
    expect(screen.getByText(sampleSkill.description!).parentElement).toHaveClass(
      "skillDescription",
    );
  });
});
