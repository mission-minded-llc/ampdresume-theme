import { Project } from "@/types";
import { ProjectAccordion } from "./ProjectAccordion";
import { ProjectItem } from "./ProjectItem";

/**
 * This is the primary Projects component, which renders as list of all projects.
 * These can be contained in an Accordion component, or as a standalone list item.
 */
export const Projects = ({ projects }: { projects: Project[] }) =>
  projects.map((project) => {
    // If the project contains a block description, we'll
    // use an Accordion component to render it.
    if (project?.description)
      return <ProjectAccordion key={`project-${project.id}`} project={project} />;

    // Otherwise, show the project overview and skills only.
    return <ProjectItem key={`project-${project.id}`} project={project} />;
  });
