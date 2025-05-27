"use client";

import { Company, Education as EducationType, SkillForUser, User } from "@/types";

import { Box } from "@mui/material";
import { Education } from "./components/pdf/Education";
import { Header } from "./components/pdf/Header";
import { MUIThemeProvider } from "./MUIThemeProvider";
import { Skills } from "./components/pdf/Skills";
import { WorkExperience } from "./components/pdf/WorkExperience";

interface ThemeDefaultPDFOptions {
  showSkillsInWorkExperience: boolean;
}

const defaultThemeOptions: ThemeDefaultPDFOptions = {
  showSkillsInWorkExperience: true,
};

interface PDFViewProps {
  user: User;
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: EducationType[];
  themeOptions?: ThemeDefaultPDFOptions;
}

export const ThemeDefaultPDF = ({
  user,
  skillsForUser,
  companies,
  education,
  themeOptions = defaultThemeOptions,
}: PDFViewProps) => {
  const options = { ...defaultThemeOptions, ...themeOptions };

  return (
    <MUIThemeProvider>
      <Box
        sx={{
          padding: 0,
          lineHeight: 1.5,
          fontFamily: "Arial",
          color: "#000",
          letterSpacing: 0,
        }}
      >
        <Header user={user} />
        <Skills skillsForUser={skillsForUser} />
        <WorkExperience companies={companies} showSkills={options.showSkillsInWorkExperience} />
        <Education education={education} />
      </Box>
    </MUIThemeProvider>
  );
};
