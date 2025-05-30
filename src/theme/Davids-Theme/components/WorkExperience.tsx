import { Box, useTheme } from "@mui/material";
import { Company } from "@/types";

interface WorkExperienceSectionProps {
  companies: Company[];
}

export const WorkExperienceSection = ({ companies }: WorkExperienceSectionProps) => {
  const theme = useTheme();
  
  return (
    <Box component="section">
      <Box component="h2" sx={{ fontWeight: "bold", fontSize: "1.5rem", mt: 4, mb: 2 }}>
        Work Experience
      </Box>
      {companies.map((company) => (
        <Box key={`company-${company.id}`} sx={{ mt: 0 }}>
          <Box component="h3" sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", pt: 2 }}>
            {company.name}
            <Box component="div" sx={{ fontWeight: "normal", fontSize: "1rem", mt: 1 }}>
              {company?.location ? `${company.location}, ` : ""}
              {company?.startDate ? new Date(Number(company.startDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : ""}
              {" to "}
              {company?.endDate ? new Date(Number(company.endDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : "Present"}
            </Box>
          </Box>
          {company.positions?.map((position) => (
            <Box key={`position-${position.id}`} sx={{ mt: 2, mb: 2, textAlign: "center" }}>
              <Box component="h4" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>{position.title}</Box>
              <Box sx={{ fontSize: "0.95rem", color: theme.palette.text.secondary, mb: 1 }}>
                {position?.startDate ? new Date(Number(position.startDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : ""}
                {" to "}
                {position?.endDate ? new Date(Number(position.endDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : "Present"}
              </Box>
              {position.projects?.map((project) => (
                <Box key={`project-${project.id}`} sx={{ mb: 2, textAlign: "left", borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#475569' : '#e0e0e0'}`, pb: 1 }}>
                  <Box sx={{ fontWeight: "bold" }}>{project.name}</Box>
                  {project.description && <Box sx={{ fontStyle: "italic", mb: 0.5 }}>{project.description}</Box>}
                  {Array.isArray(project.skillsForProject) && project.skillsForProject.length > 0 && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                      {project.skillsForProject.map((skillForProject) => (
                        <Box key={skillForProject.id} sx={{ display: "inline-block", background: theme.palette.primary.light, color: theme.palette.primary.contrastText, borderRadius: 2, px: 1, py: 0.5, fontSize: "0.9rem", mr: 1, mb: 1 }}>
                          {skillForProject.skillForUser?.skill?.name}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}; 