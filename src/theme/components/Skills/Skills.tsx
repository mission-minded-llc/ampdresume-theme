"use client";

import { Box, Button } from "@mui/material";
import React, { MouseEvent, useState } from "react";
import { SkillForUser, SkillType } from "@/types";

import { ResumeTitle } from "../ResumeTitle";
import { SkillsCloud } from "./SkillsCloud";
import { SkillsExperience } from "./SkillsExperience";

interface SkillsContext {
  skillType: SkillType;
}

export const SkillsContext = React.createContext<SkillsContext>({
  skillType: "user",
});

export const SkillsContextProvider = ({
  skillType,
  children,
}: {
  skillType: SkillType;
  children: React.ReactNode;
}) => <SkillsContext.Provider value={{ skillType }}>{children}</SkillsContext.Provider>;

export const Skills = ({
  skillType,
  skillsForUser,
}: {
  skillType: SkillType;
  skillsForUser: SkillForUser[];
}) => {
  const [skillsLayout, setSkillsLayout] = useState<"experience" | "cloud">("experience");

  const toggleSkillsLayout = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target;

    if (!(target instanceof HTMLButtonElement)) return;

    const layout = target.dataset.layout;

    if (!layout || (layout !== "experience" && layout !== "cloud")) return;

    setSkillsLayout(layout);
  };

  if (!skillsForUser) return null;

  return (
    <SkillsContextProvider skillType={skillType}>
      <ResumeTitle>Skills</ResumeTitle>
      <Box>
        Group by:{" "}
        <Button
          data-active={skillsLayout === "experience"}
          data-layout="experience"
          onClick={toggleSkillsLayout}
          color={skillsLayout === "experience" ? "primary" : "secondary"}
        >
          Experience
        </Button>{" "}
        |{" "}
        <Button
          data-active={skillsLayout === "cloud"}
          data-layout="cloud"
          onClick={toggleSkillsLayout}
          color={skillsLayout === "cloud" ? "primary" : "secondary"}
        >
          Cloud
        </Button>
      </Box>
      {skillsLayout === "experience" ? (
        <SkillsExperience skills={skillsForUser} />
      ) : (
        <SkillsCloud skills={skillsForUser} />
      )}
    </SkillsContextProvider>
  );
};
