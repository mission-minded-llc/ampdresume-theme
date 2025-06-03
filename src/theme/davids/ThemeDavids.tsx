import {
  Box,
  Fade,
  IconButton,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import {
  Company,
  Education as EducationType,
  SkillForUser,
  Social,
  ThemeAppearance,
  User,
} from "@/types";
import { generateSocialUrl, getSocialIcon } from "@/util/social";
import { useEffect, useState } from "react";

import { Education } from "@/theme/components/Education/Education";
import { Icon } from "@iconify/react";
import { MuiLink } from "@/components/MuiLink";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { QRGenerator } from "./components/QRGenerator";
import { SkillsSection } from "./components/SkillsSection";
import { WorkExperienceSection } from "./components/WorkExperience";
import { usePathname } from "next/navigation";
import { Summary } from "./components/Summary";

export const ThemeDavids = ({
  themeAppearance = "light",
  user,
  socials = [],
  skillsForUser = [],
  companies = [],
  education = [],
}: {
  themeAppearance?: ThemeAppearance;
  user?: User;
  socials?: Social[];
  skillsForUser?: SkillForUser[];
  companies?: Company[];
  education?: EducationType[];
}) => {
  const [active, setActive] = useState<number>(0);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  const pathname = usePathname();
  const pdfUrl = `${pathname}/pdf`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const sections: { label: string; render: JSX.Element | null }[] = [
    {
      label: "Skills",
      render: skillsForUser?.length ? <SkillsSection skillsForUser={skillsForUser} /> : null,
    },
    {
      label: "Work Experience",
      render: companies?.length ? <WorkExperienceSection companies={companies} /> : null,
    },
    {
      label: "Education",
      render: education?.length ? <Education education={education} /> : null,
    },
    // Commented out until backend support is ready for featured projects and certifications.
    // {
    //   label: "Projects",
    //   render: projects?.length ? <ProjectsSection projects={projects} /> : null,
    // },
    // {
    //   label: "Certifications",
    //   render: certifications?.length ? <CertificationsSection certifications={certifications} /> : null,
    // },
  ].filter((section) => section.render !== null);

  const cycle = (delta: number) => {
    setActive((prev) => (prev + delta + sections.length) % sections.length);
  };

  /**
   * Navy theme with dark mode support.
   */
  const navyTheme = createTheme({
    palette: {
      mode: themeAppearance,
      background: {
        default: themeAppearance === "dark" ? "#0a1929" : "#0d47a1", // dark navy vs light blue
        paper: themeAppearance === "dark" ? "#1e293b" : "#bbdefb", // dark slate vs light blue
      },
      primary: {
        main: themeAppearance === "dark" ? "#3b82f6" : "#0d47a1", // bright blue vs navy
        dark: themeAppearance === "dark" ? "#1e40af" : "#08306b",
        light: themeAppearance === "dark" ? "#60a5fa" : "#bbdefb", // skill pill background
        contrastText: themeAppearance === "dark" ? "#ffffff" : "#000000",
      },
      secondary: {
        main: themeAppearance === "dark" ? "#06b6d4" : "#1565c0",
      },
      text: {
        primary: themeAppearance === "dark" ? "#f8fafc" : "#000000",
        secondary: themeAppearance === "dark" ? "#94a3b8" : "#1a237e",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
          outlinedPrimary: {
            color: themeAppearance === "dark" ? "#ffffff" : "#000000",
            backgroundColor: themeAppearance === "dark" ? "#1e40af" : "#bbdefb",
            borderColor: themeAppearance === "dark" ? "#3b82f6" : "#0d47a1",
            "&:hover": {
              backgroundColor: themeAppearance === "dark" ? "#1d4ed8" : "#90caf9",
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: themeAppearance === "dark" ? "#3b82f6" : "#0d47a1",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: themeAppearance === "dark" ? "#94a3b8" : "#1a237e",
            "&.Mui-selected": {
              color: themeAppearance === "dark" ? "#3b82f6" : "#0d47a1",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: themeAppearance === "dark" ? "#94a3b8" : "#1a237e",
            "&:hover": {
              backgroundColor: themeAppearance === "dark" ? "#334155" : "#e3f2fd",
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h4: {
            color: themeAppearance === "dark" ? "#ffffff" : "#000000",
          },
          h2: {
            color: themeAppearance === "dark" ? "#ffffff" : "#000000",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={navyTheme}>
      <Box
        component="main"
        sx={{
          position: "relative",
          display: "block",
          maxWidth: "1024px",
          margin: "0 auto",
          paddingBottom: "100px",
        }}
      >
        {/* Resume Heading with social icons */}
        <Box sx={{ textAlign: "center", mt: 8, mb: 0 }}>
          
          <Box component="h1" sx={{ fontSize: "2.5rem", fontWeight: "bold" }}>
            {user?.name}
          </Box>
          <Box component="span" sx={{ display: "block", fontSize: "1.5rem", mt: 1, pt: 1 }}>
            {user?.title}
          </Box>


          
          <Box component="span" sx={{ fontSize: "1rem" }}>
            {user?.displayEmail}
            {user?.displayEmail && user?.location ? (
              <Box
                component="span"
                sx={{
                  margin: "0 1rem",
                  fontSize: "2rem",
                  fontWeight: "lighter",
                  opacity: 0.5,
                  display: "inline",
                }}
              >
                |
              </Box>
            ) : null}
            {user?.location}
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2, gap: 2 }}
          >
            {socials?.map((social) => (
              <MuiLink href={generateSocialUrl(social)} key={social.id} target="_blank">
                <Icon icon={getSocialIcon(social)} width="30" height="30" />
              </MuiLink>
            ))}
            <Typography component="div" sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Icon icon="catppuccin:pdf" width="24" height="24" />
              <MuiLink href={pdfUrl} target="_blank">
                View PDF
              </MuiLink>
            </Typography>
          </Box>
        </Box>

        {/* Summary Section - NEW */}
        <Summary user={user} />

        {/* Tabs & Nav buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <IconButton onClick={() => cycle(-1)} aria-label="Previous section">
            <NavigateBeforeIcon />
          </IconButton>
          <Tabs
            value={active}
            onChange={(_, v) => setActive(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mx: 2 }}
          >
            {sections.map((s, idx) => (
              <Tab key={s.label} label={s.label} value={idx} />
            ))}
          </Tabs>
          <IconButton onClick={() => cycle(1)} aria-label="Next section">
            <NavigateNextIcon />
          </IconButton>
        </Box>

        {/* Cross-fade content */}
        <Fade in key={active} timeout={500} unmountOnExit mountOnEnter>
          <Box sx={{ mt: 4 }}>{sections[active].render}</Box>
        </Fade>

        <QRGenerator url={currentUrl} user={user} />
      </Box>
    </ThemeProvider>
  );
};
