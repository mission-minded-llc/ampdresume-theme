import "./SkillItemView.css";

import { Box } from "@mui/material";
import { RichTextBlock } from "../../default/components/RichTextBlock";
import { SkillForUser } from "@/types";

export const SkillItemView = ({ skill }: { skill: SkillForUser }) => {
  if (!skill?.description) return null;

  return (
    <Box className="skillDescription">
      <RichTextBlock content={skill.description} />
    </Box>
  );
};
