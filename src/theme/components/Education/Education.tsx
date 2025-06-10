import { Box, Typography } from "@mui/material";

import type { Education as EducationType } from "@/types";
import React from "react";
import { ResumeTitle } from "@/theme/components/ResumeTitle/ResumeTitle";
import { formatLongDate } from "@/lib/format";

export const Education = ({ education }: { education: EducationType[] }) => {
  const educationGroupedBySchool: { [key: string]: EducationType[] } = {};

  education.map((edu) => {
    if (!edu?.school) return;

    educationGroupedBySchool[edu.school] = educationGroupedBySchool[edu.school]
      ? [...educationGroupedBySchool[edu.school], edu]
      : [edu];
  });

  return (
    <Box
      component="section"
      sx={{
        marginTop: "30px",
        "@media screen and (max-width: 600px)": {
          marginTop: "16px",
          paddingTop: 0,
        },
      }}
    >
      <ResumeTitle>Education</ResumeTitle>
      {Object.keys(educationGroupedBySchool).map((school) => (
        <React.Fragment key={`education-${school}`}>
          <Typography component="h3" variant="h5">
            {school}
          </Typography>
          {educationGroupedBySchool[school].map((edu) => (
            <Typography
              component="h4"
              variant="h6"
              key={`education-${edu.id}`}
              sx={{ fontWeight: "bold", mt: 1 }}
            >
              {edu.degree}
              <Typography component="span" variant="h6" sx={{ fontWeight: "normal" }}>
                {" "}
                &mdash; {formatLongDate(edu?.dateAwarded)}
              </Typography>
            </Typography>
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};
