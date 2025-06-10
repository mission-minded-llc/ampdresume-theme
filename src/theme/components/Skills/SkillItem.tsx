import { Box, Dialog, DialogContent } from "@mui/material";
import React, { useContext, useState } from "react";
import { SkillForProject, SkillForUser } from "@/types";

import Button from "@mui/material/Button";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { Icon } from "@iconify/react";
import { SkillItemView } from "./SkillItemView";
import { SkillsContext } from "./Skills";

export const SkillItem = ({ skill }: { skill: SkillForUser | SkillForProject }) => {
  const { skillType } = useContext(SkillsContext);
  const [isOpen, setIsOpen] = useState(false);

  const projectSkill = skill as SkillForProject;
  const skillData =
    skillType === "project"
      ? { ...projectSkill.skillForUser, description: projectSkill.description }
      : (skill as SkillForUser);

  const SkillIcon = () =>
    skillData?.icon ? (
      <Icon icon={skillData.icon} />
    ) : skillData?.skill?.icon ? (
      <Icon icon={skillData.skill.icon} />
    ) : null;

  return (
    <React.Fragment>
      <Button
        disabled={!skill?.description}
        component="div"
        variant="outlined"
        color="primary"
        onClick={() => setIsOpen(true)}
        sx={(theme) => ({
          padding: "2px 10px !important",
          color: theme.palette.mode === "dark" ? "#0a1929" : theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
          boxShadow: `2px 2px 3px 0px ${theme.palette.primary.dark}`,
          "&.Mui-disabled": {
            color: theme.palette.primary.main,
            borderColor: "transparent",
            boxShadow: "none",
          },
          textTransform: "none",
          gap: "8px",
          borderColor: skill?.description ? "lawngreen" : theme.palette.primary.dark,
        })}
      >
        {skillData?.icon ? (
          <Icon icon={skillData.icon} />
        ) : skillData?.skill?.icon ? (
          <Icon icon={skillData.skill.icon} />
        ) : null}
        {skillData.skill.name}
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onTransitionExited={() => setIsOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <CustomDialogTitle closeHandler={() => setIsOpen(false)}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
            <SkillIcon />
            {skillData.skill.name}
          </Box>
        </CustomDialogTitle>
        <DialogContent>
          <SkillItemView skill={skillData} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
