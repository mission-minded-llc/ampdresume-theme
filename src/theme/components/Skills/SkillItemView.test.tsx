import { ThemeProvider, createTheme } from "@mui/material";
import { render, screen } from "@testing-library/react";

import { SkillForUser } from "@/types";
import { SkillItemView } from "./SkillItemView";
import { reactSkill } from "./testUtils";

const theme = createTheme();

describe("SkillItemView", () => {
  const renderWithTheme = (skill: SkillForUser) => {
    return render(
      <ThemeProvider theme={theme}>
        <SkillItemView skill={skill} />
      </ThemeProvider>,
    );
  };

  it("should render skill description when provided", () => {
    renderWithTheme(reactSkill);
    expect(screen.getByText(reactSkill.description!)).toBeInTheDocument();
  });

  it("should not render anything when description is missing", () => {
    const skillWithoutDescription = {
      ...reactSkill,
      description: null,
    };
    const { container } = renderWithTheme(skillWithoutDescription);
    expect(container.firstChild).toBeNull();
  });

  it("should render with correct CSS class", () => {
    renderWithTheme(reactSkill);
    expect(screen.getByText(reactSkill.description!).parentElement).toHaveClass("skillDescription");
  });
});
