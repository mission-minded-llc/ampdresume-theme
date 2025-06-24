"use client";

import { ThemeDavids, ThemeDefault } from "@/theme";

import { ThemeAppearanceContext } from "@/app/components/ThemeContext";
import { ThemeMissionMike } from "@/theme/missionmike/ThemeMissionMike";
import { ThemeName } from "@/types";
import { themeDavidsSampleData } from "@/theme/davids/sampleData";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { useContext } from "react";

export const ResumeView = ({ themeName }: { themeName: ThemeName }) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);

  switch (themeName) {
    case "davids":
      return (
        <ThemeDavids
          themeAppearance={themeAppearance}
          user={themeDavidsSampleData.data.resume.user}
          socials={themeDavidsSampleData.data.resume.socials}
          skillsForUser={themeDavidsSampleData.data.resume.skillsForUser}
          companies={themeDavidsSampleData.data.resume.companies}
          education={themeDavidsSampleData.data.resume.education}
        />
      );
    case "missionmike":
      return (
        <ThemeMissionMike
          themeAppearance={themeAppearance}
          user={themeDefaultSampleData.data.resume.user}
          socials={themeDefaultSampleData.data.resume.socials}
          skillsForUser={themeDefaultSampleData.data.resume.skillsForUser}
          companies={themeDefaultSampleData.data.resume.companies}
          education={themeDefaultSampleData.data.resume.education}
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
