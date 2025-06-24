import { Box, Divider, Typography } from "@mui/material";
import { Section, SectionSubtitle, SectionTitle, fontSize } from "./styled";

import { Company } from "@/types";
import { formatLongDate } from "@/lib/format";

interface SectionWorkExperienceProps {
  companies: Company[];
  showSkills: boolean;
}

export const WorkExperience = ({ companies, showSkills }: SectionWorkExperienceProps) => {
  return (
    <Section>
      <SectionTitle>Work Experience</SectionTitle>
      {companies.map((company, companyIndex) => (
        <Box key={company.id} sx={{ mb: 2 }} data-testid={`company-${companyIndex}`}>
          <SectionSubtitle>
            {company.name}
            <span style={{ fontWeight: "normal" }}>
              {company?.location ? ` - ${company.location}` : ""}
            </span>
          </SectionSubtitle>
          <Divider />
          {company?.positions?.map((position, positionIndex) => {
            return (
              <Box
                key={position.id}
                sx={{ mb: 2 }}
                data-testid={`company-${companyIndex}-position-${positionIndex}`}
              >
                <SectionSubtitle>
                  {position.title}
                  <Typography component="span" variant="body2" sx={{ fontSize: fontSize.subtitle }}>
                    {" "}
                    &mdash; {formatLongDate(position.startDate)} to{" "}
                    {position?.endDate ? formatLongDate(position.endDate) : "present"}
                  </Typography>
                </SectionSubtitle>
                {position?.projects?.map((project, projectIndex) => {
                  return (
                    <Typography
                      key={project.id}
                      data-testid={`company-${companyIndex}-position-${positionIndex}-project-${projectIndex}`}
                      sx={{
                        pl: 2,
                        fontSize: fontSize.body,
                        mt: projectIndex === 0 ? 0.5 : 0.1,
                        "&:before": {
                          content: '"\\2022"',
                          paddingRight: "0.5em",
                          position: "absolute",
                          marginTop: "-0.1em",
                          marginLeft: "-0.5em",
                        },
                      }}
                    >
                      {project.name}{" "}
                      {showSkills && project.skillsForProject.length > 0 ? (
                        <>
                          {project.skillsForProject.map((skill, skillIndex) => (
                            <Typography
                              key={skill.skillForUser.skill.name}
                              component="span"
                              sx={{
                                fontSize: fontSize.body,
                                color: "maroon",
                              }}
                            >
                              {skill.skillForUser.skill.name}
                              {skillIndex < project.skillsForProject.length - 1 ? ", " : ""}
                            </Typography>
                          ))}
                        </>
                      ) : null}
                    </Typography>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      ))}
    </Section>
  );
};
