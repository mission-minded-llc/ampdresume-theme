import { Section, SectionSubtitle, SectionTitle } from "./styled";

import { Education as EducationType } from "@/types";
import React from "react";
import { Typography } from "@mui/material";
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
    <Section>
      <SectionTitle>Education</SectionTitle>
      {Object.keys(educationGroupedBySchool).map((school) => (
        <React.Fragment key={`education-${school}`}>
          <SectionSubtitle>{school}</SectionSubtitle>
          {educationGroupedBySchool[school].map((edu) => (
            <Typography
              key={`education-${edu.id}`}
              sx={{ fontSize: 14, fontWeight: "bold", mt: 1 }}
            >
              {edu.degree}
              <Typography component="span" sx={{ fontSize: 14, fontWeight: "normal" }}>
                {" "}
                &mdash; {formatLongDate(edu?.dateAwarded)}
              </Typography>
            </Typography>
          ))}
        </React.Fragment>
      ))}
    </Section>
  );
};
