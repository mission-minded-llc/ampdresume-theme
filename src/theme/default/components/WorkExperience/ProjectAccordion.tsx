import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { SyntheticEvent, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Project } from "@/types";
import { ProjectItem } from "./ProjectItem";
import { RichTextBlock } from "@/theme/components/RichTextBlock";

export const ProjectAccordion = ({ project }: { project: Project }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (event: SyntheticEvent, isExpanded: boolean) => {
    const target = event.target as HTMLElement;
    const isButtonClick = target.closest(".MuiButton-root");
    const isDialogClick = target.closest(".MuiDialog-root");

    if (isButtonClick || isDialogClick) {
      setExpanded(true); // Ensure the accordion remains open.
      return;
    }

    setExpanded(isExpanded);
  };

  return (
    <Accordion
      slotProps={{ heading: { component: "span" } }}
      onChange={handleAccordionChange}
      expanded={expanded}
      sx={{
        boxShadow: "none",
        padding: 0,
        mt: 0,
        mb: 0,
        backgroundColor: "transparent",
        borderTop: "2px solid transparent",
        borderBottom: "2px solid transparent",
        "&::before": {
          display: "none",
        },
        "&.Mui-expanded": {
          margin: 0,
        },
        "& div.MuiButtonBase-root": {
          padding: 0,
        },
        "& .MuiAccordionSummary-expandIconWrapper": {
          position: "absolute",
          right: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          fontFamily: "geistSans, Arial, sans-serif",
          margin: "0 !important",
          "& .Mui-expanded": {
            margin: "0 !important",
          },
          ".MuiAccordionSummary-content": {
            margin: "0 !important",
          },
        }}
      >
        <ProjectItem project={project} />
      </AccordionSummary>
      <AccordionDetails
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.light,
          padding: "1rem 2rem",
          mt: 0,
          "@media screen and (max-width: $breakpoint_mobile)": {
            padding: "1rem !important",
          },
          textAlign: "left",
          fontSize: "1rem",
        })}
      >
        <RichTextBlock content={project?.description} />
      </AccordionDetails>
    </Accordion>
  );
};
