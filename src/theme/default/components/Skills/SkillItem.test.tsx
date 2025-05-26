import { SkillForProject, SkillForUser } from "@/types";
import { ThemeProvider, createTheme } from "@mui/material";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";

import { SkillItem } from "./SkillItem";
import { SkillsContext } from "./Skills";
import { reactSkill } from "./testUtils";

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
  const sampleProjectSkill: SkillForProject = {
    id: "project-skill-1",
    description: "Used TypeScript for type-safe development",
    skillForUser: {
      id: "user-skill-1",
      userId: "user1",
      skill: {
        id: "skill1",
        name: "TypeScript",
        icon: "devicon:typescript",
      },
      icon: null,
      description: "TypeScript development",
      yearStarted: 2020,
      totalYears: null,
    },
  };

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
      renderWithTheme(reactSkill);
      expect(screen.getByText("React")).toBeInTheDocument();
    });

    it("should render skill icon when available", () => {
      renderWithTheme(reactSkill);
      const iconElement = screen.getByTestId("mocked-icon");
      expect(iconElement).toBeInTheDocument();
      expect(iconElement).toHaveAttribute("data-icon", "devicon:react");
    });

    it("should open dialog when clicked", () => {
      renderWithTheme(reactSkill);
      const button = screen.getByText("React");
      fireEvent.click(button);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      if (reactSkill.description) {
        expect(screen.getByText(reactSkill.description)).toBeInTheDocument();
      }
    });

    it("should close dialog when close button is clicked", async () => {
      renderWithTheme(reactSkill);
      const button = screen.getByText("React");
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
        ...reactSkill,
        description: null,
      };
      renderWithTheme(skillWithoutDescription);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("should have correct border color when description is present", () => {
      renderWithTheme(reactSkill);
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ borderColor: "lawngreen" });
    });
  });
});
