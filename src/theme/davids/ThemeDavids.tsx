"use client";

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
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { QRGenerator } from "./components/QRGenerator";
import { SkillsSection } from "./components/SkillsSection";
import { Summary } from "./components/Summary";
import { WorkExperienceSection } from "./components/WorkExperience";
import { usePathname } from "next/navigation";

// Theme color constants
const COLORS = {
  navyBlue: "#0d47a1",
  lightBlue: "#bbdefb",
  darkNavy: "#0a1929",
  darkSlate: "#1e293b",
  brightBlue: "#60a5fa",
  lightBlueHover: "#90caf9",
  lightBlueBg: "#e3f2fd",
  lightText: "#ADD8E6",
  darkNavyDarker: "#08306b",
  darkBlue: "#1e40af",
  darkBlueHover: "#1d4ed8",
  darkBlueBorder: "#3b82f6",
} as const;

// Social platform configurations
const SOCIAL_PLATFORMS = {
  "github.com": {
    icon: "mdi:github",
    url: (ref: string) => `https://github.com/${ref}`,
  },
  "linkedin.com": {
    icon: "devicon:linkedin",
    url: (ref: string) => `https://www.linkedin.com/in/${ref}`,
  },
  "x.com": {
    icon: "ri:twitter-x-fill",
    url: (ref: string) => `https://x.com/${ref}`,
  },
  "twitter.com": {
    icon: "ri:twitter-x-fill",
    url: (ref: string) => `https://x.com/${ref}`,
  },
} as const;

export const ThemeDavids = ({
  themeAppearance,
  user,
  socials,
  skillsForUser,
  companies,
  education,
}: {
  themeAppearance: ThemeAppearance;
  user: User;
  socials: Social[];
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: EducationType[];
}) => {
  const [active, setActive] = useState<number>(0);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  // Computed theme colors
  const themeColors = {
    text: themeAppearance === "dark" ? COLORS.lightText : COLORS.navyBlue,
    background: themeAppearance === "dark" ? COLORS.darkNavy : COLORS.navyBlue,
    paper: themeAppearance === "dark" ? COLORS.darkSlate : COLORS.lightBlue,
    primary: themeAppearance === "dark" ? COLORS.brightBlue : COLORS.navyBlue,
    buttonBg: themeAppearance === "dark" ? COLORS.darkBlue : COLORS.lightBlue,
    buttonHover: themeAppearance === "dark" ? COLORS.darkBlueHover : COLORS.lightBlueHover,
    buttonBorder: themeAppearance === "dark" ? COLORS.darkBlueBorder : COLORS.navyBlue,
    hoverBg: themeAppearance === "dark" ? "transparent" : COLORS.lightBlueBg,
  };

  const pathname = usePathname();
  const pdfUrl = `${pathname}/pdf`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const sections: { label: string; render: React.ReactElement | null }[] = [
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
        default: themeColors.background,
        paper: themeColors.paper,
      },
      primary: {
        main: themeColors.primary,
        dark: themeAppearance === "dark" ? COLORS.brightBlue : COLORS.darkNavyDarker,
        light: themeAppearance === "dark" ? COLORS.brightBlue : COLORS.lightBlue,
        contrastText: themeAppearance === "dark" ? "#ffffff" : "#000000",
      },
      secondary: {
        main: themeAppearance === "dark" ? COLORS.brightBlue : "#1565c0",
      },
      text: {
        primary: themeColors.text,
        secondary: themeColors.text,
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
            backgroundColor: themeColors.buttonBg,
            borderColor: themeColors.buttonBorder,
            "&:hover": {
              backgroundColor: themeColors.buttonHover,
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: themeColors.text,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: `${themeColors.text} !important`,
            "&:hover": {
              backgroundColor: themeColors.hoverBg,
              color: `${themeColors.text} !important`,
            },
            "&:focus": {
              backgroundColor: themeColors.hoverBg,
              color: `${themeColors.text} !important`,
            },
            "&:active": {
              backgroundColor:
                themeAppearance === "dark" ? "rgba(255, 255, 255, 0.05)" : COLORS.lightBlue,
              color: `${themeColors.text} !important`,
            },
            "&.Mui-focusVisible": {
              backgroundColor: themeColors.hoverBg,
              color: `${themeColors.text} !important`,
            },
            "& .MuiSvgIcon-root": {
              color: `${themeColors.text} !important`,
            },
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
            {socials?.map((social) => {
              const platform = social.platform.toLowerCase();
              const platformConfig = SOCIAL_PLATFORMS[platform as keyof typeof SOCIAL_PLATFORMS];

              const icon = platformConfig?.icon ?? getSocialIcon(social);
              const url = platformConfig?.url(social.ref) ?? generateSocialUrl(social);

              return (
                <a href={url} key={social.id} target="_blank" rel="noopener noreferrer">
                  <Icon icon={icon} width="30" height="30" color={themeColors.text} />
                </a>
              );
            })}
            <Typography
              component="span"
              sx={{
                color: themeAppearance === "dark" ? "#ADD8E6" : "#0d47a1",
              }}
            >
              <Icon
                icon="catppuccin:pdf"
                width="24"
                height="24"
                color={themeAppearance === "dark" ? "#ADD8E6" : "#0d47a1"}
              />
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                View PDF
              </a>
            </Typography>
          </Box>
        </Box>

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
          <IconButton
            onClick={() => cycle(-1)}
            aria-label="Previous section"
            sx={{
              color: themeAppearance === "dark" ? "#ADD8E6" : "#0d47a1",
              "& .MuiSvgIcon-root": {
                color: themeAppearance === "dark" ? "#ADD8E6" : "#0d47a1",
              },
            }}
          >
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
              <Tab
                key={s.label}
                label={s.label}
                value={idx}
                sx={{
                  color: themeAppearance === "dark" ? "#ADD8E6" : "#0d47a1",
                  "&.Mui-selected": {
                    color: themeAppearance === "dark" ? "#ADD8E6" : "#0d47a1",
                  },
                  "&:hover": {
                    color: themeAppearance === "dark" ? "#ADD8E6" : "#0d47a1",
                  },
                }}
              />
            ))}
          </Tabs>
          <IconButton
            onClick={() => cycle(1)}
            aria-label="Next section"
            sx={{
              color: themeAppearance === "dark" ? "#ADD8E6" : "#0d47a1",
              "& .MuiSvgIcon-root": {
                color: themeAppearance === "dark" ? "#ADD8E6" : "#0d47a1",
              },
            }}
          >
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
