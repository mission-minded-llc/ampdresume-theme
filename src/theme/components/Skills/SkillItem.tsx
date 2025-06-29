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
        sx={(theme) => {
          const color = theme.palette.mode === "dark" ? "#fff" : theme.palette.primary.main;
          const backgroundColor =
            theme.palette.mode === "dark" ? "#333" : theme.palette.primary.light;

          return {
            padding: "2px 10px !important",
            color,
            backgroundColor,
            boxShadow: `2px 2px 3px 0px ${theme.palette.primary.dark}`,
            "&.Mui-disabled": {
              color,
              backgroundColor,
              borderColor: "transparent !important",
              boxShadow: "none !important",
            },
            textTransform: "none",
            gap: "8px",
            borderColor: skill?.description ? "lawngreen" : theme.palette.primary.dark,
          };
        }}
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
