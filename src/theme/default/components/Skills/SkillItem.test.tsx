import { SkillForProject, SkillForUser } from "@/types";
import { ThemeProvider, createTheme } from "@mui/material";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";

import { SkillItem } from "./SkillItem";
import { SkillsContext } from "./Skills";
import sampleData from "../../../sampleData.json";

// Mock the Iconify Icon component
jest.mock("@iconify/react", () => ({
  Icon: ({ icon }: { icon: string }) => (
    <span data-testid="mocked-icon" data-icon={icon}>
      {icon}
    </span>
  ),
}));

const theme = createTheme();

describe("SkillItem", () => {
  const sampleUserSkill = sampleData.data.resume.skillsForUser[0] as SkillForUser; // CSS skill
  const sampleProjectSkill = sampleData.data.resume.companies[0].positions[0].projects[0]
    .skillsForProject[0] as SkillForProject; // TypeScript skill

  const renderWithTheme = (
    skill: SkillForUser | SkillForProject,
    skillType: "user" | "project" = "user",
  ) => {
    return render(
      <ThemeProvider theme={theme}>
        <SkillsContext.Provider value={{ skillType }}>
          <SkillItem skill={skill} />
        </SkillsContext.Provider>
      </ThemeProvider>,
    );
  };

  describe("User Skill", () => {
    it("should render skill name correctly", () => {
      renderWithTheme(sampleUserSkill);
      expect(screen.getByText("CSS")).toBeInTheDocument();
    });

    it("should render skill icon when available", () => {
      renderWithTheme(sampleUserSkill);
      const iconElement = screen.getByTestId("mocked-icon");
      expect(iconElement).toBeInTheDocument();
      expect(iconElement).toHaveAttribute("data-icon", "logos:css-3");
    });

    it("should open dialog when clicked", () => {
      renderWithTheme(sampleUserSkill);
      const button = screen.getByText("CSS");
      fireEvent.click(button);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      if (sampleUserSkill.description) {
        expect(screen.getByText(sampleUserSkill.description)).toBeInTheDocument();
      }
    });

    it("should close dialog when close button is clicked", async () => {
      renderWithTheme(sampleUserSkill);
      const button = screen.getByText("CSS");
      fireEvent.click(button);
      const closeButton = screen.getByRole("button", { name: /close/i });
      fireEvent.click(closeButton);
      await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    });
  });

  describe("Project Skill", () => {
    it("should render project skill name correctly", () => {
      renderWithTheme(sampleProjectSkill, "project");
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });

    it("should render project skill description in dialog", () => {
      renderWithTheme(sampleProjectSkill, "project");
      const button = screen.getByText("TypeScript");
      fireEvent.click(button);

      if (sampleProjectSkill.description) {
        expect(screen.getByText(sampleProjectSkill.description)).toBeInTheDocument();
      }
    });
  });

  describe("Button Styling", () => {
    it("should be disabled when no description is provided", () => {
      const skillWithoutDescription = {
        ...sampleUserSkill,
        description: null,
      };
      renderWithTheme(skillWithoutDescription);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("should have correct border color when description is present", () => {
      renderWithTheme(sampleUserSkill);
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ borderColor: "lawngreen" });
    });
  });
});
