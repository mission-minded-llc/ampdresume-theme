import { Box, Typography } from "@mui/material";
import { Section, SectionTitle, fontSize } from "./styled";

import React from "react";
import { SkillForUser } from "@/types";
import { groupSkillsForUserByYearExperience } from "@/util/structure";

export const Skills = ({ skillsForUser }: { skillsForUser: SkillForUser[] }) => {
  const skillsForUserBySkill = groupSkillsForUserByYearExperience(skillsForUser);

  return (
    <Section>
      <SectionTitle>Skills</SectionTitle>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gridTemplateRows: "auto",
          width: "100%",
          gap: "1px",
          mb: 3,
        }}
      >
        {skillsForUserBySkill.map((skillsExperience) => {
          const totalYears = skillsExperience[0];
          const skillsList = skillsExperience[1];

          return (
            <React.Fragment key={`skill-group-${skillsExperience[0]}`}>
              <Box
                sx={{
                  fontWeight: "bold",
                  textAlign: "right",
                  pr: 1,
                  fontSize: fontSize.body,
                }}
              >
                {totalYears ? `${totalYears} year${parseInt(totalYears, 10) > 1 ? "s" : ""}:` : ""}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                {skillsList.map((skill, index) => (
                  <Typography
                    key={`skill-${skill.skill.name}`}
                    sx={{ fontSize: fontSize.body, lineHeight: 1, color: "maroon" }}
                  >
                    {skill.skill.name}
                    {index < skillsList.length - 1 ? "," : ""}
                  </Typography>
                ))}
              </Box>
            </React.Fragment>
          );
        })}
      </Box>
    </Section>
  );
};
