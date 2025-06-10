import { Box, useTheme } from "@mui/material";

import { FeaturedProject } from "@/types";
import { RichTextBlock } from "@/theme/default/components/RichTextBlock";

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
}

export const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  const theme = useTheme();

  return (
    <Box data-testid="featured-projects">
      {projects.map((proj) => {
        const skillsForFeaturedProject = Array.isArray(proj.skillsForFeaturedProject)
          ? proj.skillsForFeaturedProject
          : [];
        const safeProj = { ...proj, skillsForFeaturedProject };
        return (
          <Box key={safeProj.name} sx={{ mb: 3 }}>
            <Box component="h3" sx={{ fontWeight: "bold", mb: 0.5 }}>
              {safeProj.name}
            </Box>
            <RichTextBlock content={safeProj?.description} />
            {safeProj.links && safeProj.links.length > 0 && (
              <Box sx={{ mt: 0.5 }}>
                {safeProj.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginRight: 8,
                      color: theme.palette.primary.main,
                      textDecoration: "underline",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </Box>
            )}
            {safeProj.skillsForFeaturedProject.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {safeProj.skillsForFeaturedProject.map((skillForFeaturedProject) => (
                  <Box
                    key={skillForFeaturedProject.id}
                    sx={{
                      display: "inline-block",
                      background: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                      borderRadius: 2,
                      px: 1,
                      py: 0.5,
                      fontSize: "0.9rem",
                      mr: 1,
                      mb: 1,
                    }}
                  >
                    {skillForFeaturedProject.skillForUser?.skill?.name}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
