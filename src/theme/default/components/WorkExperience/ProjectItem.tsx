import { Box } from "@mui/material";
import { Project } from "@/types";
import { SkillItem } from "@/theme/components/Skills/SkillItem";
import { SkillsContextProvider } from "@/theme/components/Skills/Skills";

/**
 * This contains the top-level project description and skill tags. It can
 * be used as standalone, or within the Accordion.
 */
export const ProjectItem = ({ project }: { project: Project }) => (
  <Box
    sx={(theme) => ({
      position: "relative",
      width: "100%",
      textAlign: "left",
      display: "grid",
      gridTemplateColumns: project?.skillsForProject?.length > 0 ? "60% 1fr" : "1fr",
      alignItems: "center",
      gap: 4,
      padding: 2,
      fontSize: "1rem",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
        gap: "10px",
        padding: "10px 0",
      },
      borderBottom: "1px solid",
      borderBottomColor: theme.palette.divider,
    })}
  >
    <Box>{project.name}</Box>
    {project?.skillsForProject?.length > 0 ? (
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "4px",
          "@media screen and (max-width: 600px)": {
            paddingBottom: "16px",
            borderBottom: "1px solid lightgray",
          },
        }}
      >
        <SkillsContextProvider skillType="project">
          {project.skillsForProject.map((skillForProject) => (
            <SkillItem
              key={`skill-${skillForProject.skillForUser.skill.name}`}
              skill={skillForProject}
            />
          ))}
        </SkillsContextProvider>
      </Box>
    ) : null}
  </Box>
);
