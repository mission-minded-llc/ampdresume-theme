"use client";

import { Box } from "@mui/material";
import React from "react";
import { SkillForUser } from "@/types";
import { SkillItem } from "./SkillItem";

export const SkillsCloud = ({ skills }: { skills: SkillForUser[] }) => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "5px",
      alignItems: "center",
    }}
  >
    {skills.map((skill) =>
      skill?.skill?.name ? <SkillItem key={`skill-${skill.skill.name}`} skill={skill} /> : null,
    )}
  </Box>
);
