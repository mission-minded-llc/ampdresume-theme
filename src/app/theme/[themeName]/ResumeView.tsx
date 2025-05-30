"use client";

import { ThemeAppearanceContext } from "@/app/components/ThemeContext";
import { ThemeDefault, ThemeDavidsTheme } from "@/theme";
import { ThemeName } from "@/types";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { themeDavidsSampleData } from "@/theme/Davids-Theme/sampleData";
import { useContext } from "react";

export const ResumeView = ({ themeName }: { themeName: ThemeName }) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);

  switch (themeName) {
    case "davids-theme":
      return (
        <ThemeDavidsTheme
          user={themeDavidsSampleData.data.resume.user}
          socials={themeDavidsSampleData.data.resume.socials}
          skillsForUser={themeDavidsSampleData.data.resume.skillsForUser}
          companies={themeDavidsSampleData.data.resume.companies}
          education={themeDavidsSampleData.data.resume.education}
        />
      );
    case "default":
    default:
      return (
        <ThemeDefault
          themeAppearance={themeAppearance}
          user={themeDefaultSampleData.data.resume.user}
          socials={themeDefaultSampleData.data.resume.socials}
          skillsForUser={themeDefaultSampleData.data.resume.skillsForUser}
          companies={themeDefaultSampleData.data.resume.companies}
          education={themeDefaultSampleData.data.resume.education}
        />
      );
  }
};
