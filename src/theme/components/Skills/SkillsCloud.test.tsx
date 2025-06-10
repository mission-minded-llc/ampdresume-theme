import { createInvalidSkill, javascriptSkill, reactSkill } from "./testUtils";
import { render, screen } from "@testing-library/react";

import { SkillForUser } from "@/types";
import { SkillsCloud } from "./SkillsCloud";

describe("SkillsCloud", () => {
  it("renders all skills in a cloud layout", () => {
    render(<SkillsCloud skills={[reactSkill, javascriptSkill]} />);

    // Check if all skills are rendered
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("handles empty skills array", () => {
    const { container } = render(<SkillsCloud skills={[]} />);

    // The Box component should be rendered but empty
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild?.childNodes.length).toBe(0);
  });

  it("handles skills with missing names", () => {
    const skillsWithMissingName: SkillForUser[] = [
      createInvalidSkill(),
      reactSkill,
      javascriptSkill,
    ];

    render(<SkillsCloud skills={skillsWithMissingName} />);

    // Should only render skills with valid names
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.queryByTestId("skill-")).not.toBeInTheDocument();
  });

  it("handles null or undefined skill objects", () => {
    const skillsWithNull = [null, undefined, reactSkill, javascriptSkill].filter(
      (skill): skill is SkillForUser => skill !== null && skill !== undefined,
    );

    render(<SkillsCloud skills={skillsWithNull} />);

    // Should only render valid skills
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });
});
