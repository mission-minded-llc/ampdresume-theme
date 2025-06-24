import { ThemeDefinition, ThemeName } from "@/types";

import { ThemeDavids } from "./davids/ThemeDavids";
import { ThemeDefault } from "./default/ThemeDefault";
import { ThemeDefaultPDF } from "./default/ThemeDefaultPDF";
import { ThemeMissionMike } from "./missionmike/ThemeMissionMike";
import { ThemeMissionMikePDF } from "./missionmike/ThemeMissionMikePDF";

// Using named exports here, because we want to be able to import the themes directly.
export { ThemeDavids, ThemeDefault, ThemeDefaultPDF };

export const themeDefinitions: Record<ThemeName, ThemeDefinition> = {
  default: {
    name: "Classic",
    published: true,
    webComponent: ThemeDefault,
    pdfComponent: ThemeDefaultPDF,
    description: "The default theme for Amp'd Resume. Single-page resume with expanding sections.",
    iconifyIcon: "fluent-emoji-flat:high-voltage",
    authors: [
      {
        name: "Michael R. Dinerstein",
        gitHubUrl: "https://github.com/missionmike",
        linkedInUrl: "https://www.linkedin.com/in/michaeldinerstein/",
      },
    ],
  },
  davids: {
    name: "David's Theme",
    published: false,
    webComponent: ThemeDavids,
    pdfComponent: null,
    description: "The theme by David Schurer. Multi-page resume with a QR code to share.",
    iconifyIcon: "fluent-emoji-flat:memo",
    authors: [
      {
        name: "David Schurer",
        gitHubUrl: "https://github.com/davidschurer",
        linkedInUrl: "https://www.linkedin.com/in/david-schurer/",
      },
    ],
  },
  missionmike: {
    name: "Mission Mike",
    published: true,
    webComponent: ThemeMissionMike,
    pdfComponent: ThemeMissionMikePDF,
    description: "The theme by Mission Mike. A modern, minimalistic theme.",
    iconifyIcon: "fluent-color:design-ideas-24",
    authors: [
      {
        name: "Michael R. Dinerstein",
        gitHubUrl: "https://github.com/missionmike",
        linkedInUrl: "https://www.linkedin.com/in/michaeldinerstein/",
      },
    ],
  },
};
