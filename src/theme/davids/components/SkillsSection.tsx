import {
  Box,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { SkillForUser } from "@/types";
import { Skills } from "@/theme/components/Skills/Skills";

interface SkillsSectionProps {
  skillsForUser: SkillForUser[];
}

export const SkillsSection = ({ skillsForUser }: SkillsSectionProps) => {
  const theme = useTheme();
  const [skillFilter, setSkillFilter] = useState("");
  const [filterType, setFilterType] = useState<"skill" | "years">("skill");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (type?: "skill" | "years") => {
    if (type) setFilterType(type);
    setAnchorEl(null);
  };

  const filteredSkillsForUser = useMemo(() => {
    if (!skillFilter.trim()) return skillsForUser;
    const filter = skillFilter.trim().toLowerCase();
    return skillsForUser.filter((s) => {
      if (filterType === "skill") {
        return s.skill.name.toLowerCase().includes(filter);
      } else {
        let years = s.totalYears;
        if (years == null && s.yearStarted != null) {
          years = new Date().getFullYear() - s.yearStarted;
        }
        const filterNum = Number(filter);
        return !isNaN(filterNum) && years != null && years >= filterNum;
      }
    });
  }, [skillFilter, skillsForUser, filterType]);

  return (
    <Box>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={filterType === "skill" ? "Enter Skill" : "Enter Years of Experience"}
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleDropdownClick} edge="end">
                  <ArrowDropDownIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            background: theme.palette.background.paper,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.mode === "dark" ? "#475569" : "#d1d5db",
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleDropdownClose()}>
          <MenuItem onClick={() => handleDropdownClose("skill")}>Skill</MenuItem>
          <MenuItem onClick={() => handleDropdownClose("years")}>Years of Experience</MenuItem>
        </Menu>
      </Box>
      <Skills skillType="user" skillsForUser={filteredSkillsForUser} />
    </Box>
  );
};
