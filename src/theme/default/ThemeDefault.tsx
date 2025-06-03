import { Company, Education as EducationType, SkillForUser, Social, User } from "@/types";

import { Box } from "@mui/material";
import { Education } from "@/theme/components/Education/Education";
import { MUIThemeProvider } from "./MUIThemeProvider";
import { ResumeHeading } from "./components/ResumeHeading";
import { Skills } from "@/theme/components/Skills/Skills";
import { ThemeAppearance } from "@/types";
import { WorkExperience } from "./components/WorkExperience/WorkExperience";

export const ThemeDefault = ({
  themeAppearance,
  user,
  socials,
  skillsForUser,
  companies,
  education,
}: {
  themeAppearance: ThemeAppearance;
  user: User;
  socials: Social[];
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: EducationType[];
}) => (
  <MUIThemeProvider themeAppearance={themeAppearance}>
    <Box
      component="main"
      sx={{
        position: "relative",
        display: "block",
        maxWidth: "1024px",
        margin: "0 auto",
        paddingBottom: "100px",
      }}
    >
      <ResumeHeading user={user} socials={socials} />

      {skillsForUser?.length ? <Skills skillType="user" skillsForUser={skillsForUser} /> : null}
      {companies?.length ? <WorkExperience companies={companies} /> : null}
      {education?.length ? <Education education={education} /> : null}
    </Box>
  </MUIThemeProvider>
);
